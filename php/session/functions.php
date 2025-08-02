<?php
/**
 * 공통 함수 파일
 * 
 * 이 파일은 애플리케이션 전체에서 사용되는 공통 함수들을 정의합니다.
 * 보안, 유효성 검사, 세션 관리 등의 기능을 포함합니다.
 */

require_once 'config.php';
require_once 'JWT_Manager.php';

/**
 * 입력 데이터 정리 및 보안 처리
 * 
 * @param string $data 정리할 데이터
 * @return string 정리된 데이터
 */
function sanitize_input($data) {
    $data = trim($data);                    // 앞뒤 공백 제거
    $data = stripslashes($data);            // 백슬래시 제거
    $data = htmlspecialchars($data);        // HTML 특수문자 변환
    return $data;
}

/**
 * 이메일 유효성 검사
 * 
 * @param string $email 검사할 이메일
 * @return bool 유효성 여부
 */
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * 비밀번호 강도 검사
 * 
 * @param string $password 검사할 비밀번호
 * @return array 검사 결과
 */
function validate_password($password) {
    $errors = [];
    
    if (strlen($password) < 8) {
        $errors[] = "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "비밀번호는 최소 하나의 대문자를 포함해야 합니다.";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "비밀번호는 최소 하나의 소문자를 포함해야 합니다.";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "비밀번호는 최소 하나의 숫자를 포함해야 합니다.";
    }
    
    return $errors;
}

/**
 * JWT 토큰에서 사용자 정보 가져오기
 * 
 * @return array|false 사용자 정보 또는 false
 */
function get_user_from_token() {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (empty($auth_header) || !preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
        return false;
    }
    
    $token = $matches[1];
    return JWT::getUserFromToken($token);
}

/**
 * 사용자 로그인 상태 확인 (JWT 기반)
 * 
 * @return bool 로그인 상태
 */
function is_logged_in() {
    // JWT 토큰 확인
    $user = get_user_from_token();
    if ($user) {
        return true;
    }
    
    // 세션 기반 확인 (하위 호환성)
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * 로그인 필요 페이지 접근 제한
 */
function require_login() {
    if (!is_logged_in()) {
        header("Location: auth_manager.php?error=login_required");
        exit();
    }
}

/**
 * 로그인된 사용자 정보 가져오기 (JWT 기반)
 * 
 * @return array|null 사용자 정보 또는 null
 */
function get_current_user() {
    global $pdo;
    
    // JWT 토큰에서 사용자 정보 가져오기
    $token_user = get_user_from_token();
    if ($token_user) {
        try {
            $stmt = $pdo->prepare("SELECT id, username, email, full_name, created_at, last_login FROM users WHERE id = ? AND is_active = 1");
            $stmt->execute([$token_user['user_id']]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("사용자 정보 조회 실패: " . $e->getMessage());
            return null;
        }
    }
    
    // 세션 기반 확인 (하위 호환성)
    if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        try {
            $stmt = $pdo->prepare("SELECT id, username, email, full_name, created_at, last_login FROM users WHERE id = ? AND is_active = 1");
            $stmt->execute([$_SESSION['user_id']]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("사용자 정보 조회 실패: " . $e->getMessage());
            return null;
        }
    }
    
    return null;
}

/**
 * JWT 토큰 생성 (로그인용)
 * 
 * @param int $user_id 사용자 ID
 * @param string $username 사용자명
 * @return array 액세스 토큰과 리프레시 토큰
 */
function generate_tokens($user_id, $username) {
    global $pdo;
    
    $access_token = JWT::generateAccessToken($user_id, $username);
    $refresh_token = JWT::generateRefreshToken($user_id);
    
    // 리프레시 토큰을 데이터베이스에 저장
    try {
        $stmt = $pdo->prepare("INSERT INTO user_tokens (user_id, refresh_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))");
        $stmt->execute([
            $user_id,
            $refresh_token,
            $_SERVER['REMOTE_ADDR'] ?? '',
            $_SERVER['HTTP_USER_AGENT'] ?? ''
        ]);
    } catch (PDOException $e) {
        error_log("리프레시 토큰 저장 실패: " . $e->getMessage());
    }
    
    return [
        'access_token' => $access_token,
        'refresh_token' => $refresh_token
    ];
}

/**
 * 리프레시 토큰으로 새 액세스 토큰 생성
 * 
 * @param string $refresh_token 리프레시 토큰
 * @return array|false 새 토큰 또는 false
 */
function refresh_access_token($refresh_token) {
    global $pdo;
    
    // 리프레시 토큰 검증
    $payload = JWT::verify($refresh_token);
    if (!$payload || $payload['type'] !== 'refresh') {
        return false;
    }
    
    // 데이터베이스에서 토큰 확인
    try {
        $stmt = $pdo->prepare("SELECT user_id, is_revoked, expires_at FROM user_tokens WHERE refresh_token = ? AND is_revoked = FALSE AND expires_at > NOW()");
        $stmt->execute([$refresh_token]);
        $token_record = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$token_record) {
            return false;
        }
        
        // 사용자 정보 가져오기
        $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ? AND is_active = 1");
        $stmt->execute([$token_record['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            return false;
        }
        
        // 새 액세스 토큰 생성
        $new_access_token = JWT::generateAccessToken($token_record['user_id'], $user['username']);
        
        return [
            'access_token' => $new_access_token,
            'refresh_token' => $refresh_token
        ];
        
    } catch (PDOException $e) {
        error_log("토큰 갱신 실패: " . $e->getMessage());
        return false;
    }
}

/**
 * 토큰 무효화 (로그아웃)
 * 
 * @param string $refresh_token 리프레시 토큰
 * @return bool 성공 여부
 */
function revoke_token($refresh_token) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("UPDATE user_tokens SET is_revoked = TRUE WHERE refresh_token = ?");
        $stmt->execute([$refresh_token]);
        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        error_log("토큰 무효화 실패: " . $e->getMessage());
        return false;
    }
}

/**
 * CSRF 토큰 생성 (하위 호환성)
 * 
 * @return string CSRF 토큰
 */
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * CSRF 토큰 검증 (하위 호환성)
 * 
 * @param string $token 검증할 토큰
 * @return bool 검증 결과
 */
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * 에러 메시지 표시
 * 
 * @param string $message 에러 메시지
 */
function show_error($message) {
    echo '<div class="alert alert-danger">' . htmlspecialchars($message) . '</div>';
}

/**
 * 성공 메시지 표시
 * 
 * @param string $message 성공 메시지
 */
function show_success($message) {
    echo '<div class="alert alert-success">' . htmlspecialchars($message) . '</div>';
}
?> 