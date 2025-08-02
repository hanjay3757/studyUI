<?php
/**
 * JWT 관리 통합 파일
 * 기존 파일들 통합:
 * - JWT.php: JWT 클래스 (토큰 생성, 검증, 디코딩)
 * - refresh_token.php: 토큰 갱신 API
 */

require_once 'config.php';

/**
 * JWT (JSON Web Token) 헬퍼 클래스
 * 
 * 이 클래스는 JWT 토큰의 생성, 검증, 디코딩을 담당합니다.
 * 보안을 위해 HS256 알고리즘을 사용합니다.
 */
class JWT {
    private static $secret_key = 'your-secret-key-here-change-in-production';
    private static $algorithm = 'HS256';
    private static $expiration_time = 3600; // 1시간
    
    /**
     * JWT 토큰 생성
     * 
     * @param array $payload 토큰에 포함할 데이터
     * @param int $expiration 만료 시간 (초)
     * @return string 생성된 JWT 토큰
     */
    public static function generate($payload, $expiration = null) {
        $header = [
            'typ' => 'JWT',
            'alg' => self::$algorithm
        ];
        
        $payload['iat'] = time(); // 발급 시간
        $payload['exp'] = time() + ($expiration ?? self::$expiration_time); // 만료 시간
        $payload['nbf'] = time(); // 사용 가능 시작 시간
        
        $header_encoded = self::base64url_encode(json_encode($header));
        $payload_encoded = self::base64url_encode(json_encode($payload));
        
        $signature = hash_hmac('sha256', 
            $header_encoded . '.' . $payload_encoded, 
            self::$secret_key, 
            true
        );
        
        $signature_encoded = self::base64url_encode($signature);
        
        return $header_encoded . '.' . $payload_encoded . '.' . $signature_encoded;
    }
    
    /**
     * JWT 토큰 검증
     * 
     * @param string $token 검증할 JWT 토큰
     * @return array|false 검증 성공 시 페이로드, 실패 시 false
     */
    public static function verify($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return false;
        }
        
        list($header_encoded, $payload_encoded, $signature_encoded) = $parts;
        
        // 서명 검증
        $signature = self::base64url_decode($signature_encoded);
        $expected_signature = hash_hmac('sha256', 
            $header_encoded . '.' . $payload_encoded, 
            self::$secret_key, 
            true
        );
        
        if (!hash_equals($signature, $expected_signature)) {
            return false;
        }
        
        // 페이로드 디코딩
        $payload = json_decode(self::base64url_decode($payload_encoded), true);
        
        if (!$payload) {
            return false;
        }
        
        // 만료 시간 검증
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }
        
        // 사용 가능 시작 시간 검증
        if (isset($payload['nbf']) && $payload['nbf'] > time()) {
            return false;
        }
        
        return $payload;
    }
    
    /**
     * JWT 토큰에서 페이로드 추출 (검증 없이)
     * 
     * @param string $token JWT 토큰
     * @return array|false 페이로드 또는 false
     */
    public static function decode($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return false;
        }
        
        $payload_encoded = $parts[1];
        $payload = json_decode(self::base64url_decode($payload_encoded), true);
        
        return $payload ?: false;
    }
    
    /**
     * Base64URL 인코딩
     */
    private static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    /**
     * Base64URL 디코딩
     */
    private static function base64url_decode($data) {
        $base64 = strtr($data, '-_', '+/');
        $base64 = str_pad($base64, strlen($base64) % 4, '=', STR_PAD_RIGHT);
        return base64_decode($base64);
    }
    
    /**
     * 액세스 토큰 생성
     * 
     * @param int $user_id 사용자 ID
     * @param string $username 사용자명
     * @return string 액세스 토큰
     */
    public static function generateAccessToken($user_id, $username) {
        return self::generate([
            'user_id' => $user_id,
            'username' => $username,
            'type' => 'access'
        ], 3600); // 1시간
    }
    
    /**
     * 리프레시 토큰 생성
     * 
     * @param int $user_id 사용자 ID
     * @return string 리프레시 토큰
     */
    public static function generateRefreshToken($user_id) {
        return self::generate([
            'user_id' => $user_id,
            'type' => 'refresh'
        ], 7 * 24 * 3600); // 7일
    }
    
    /**
     * 토큰에서 사용자 정보 추출
     * 
     * @param string $token JWT 토큰
     * @return array|false 사용자 정보 또는 false
     */
    public static function getUserFromToken($token) {
        $payload = self::verify($token);
        
        if (!$payload || !isset($payload['user_id'])) {
            return false;
        }
        
        return [
            'user_id' => $payload['user_id'],
            'username' => $payload['username'] ?? null
        ];
    }
}

/**
 * JWT 토큰 관리 함수들
 */

/**
 * 액세스 토큰과 리프레시 토큰 생성
 * 
 * @param int $user_id 사용자 ID
 * @param string $username 사용자명
 * @return array 토큰 배열
 */
function generate_tokens($user_id, $username) {
    global $pdo;
    
    $access_token = JWT::generateAccessToken($user_id, $username);
    $refresh_token = JWT::generateRefreshToken($user_id);
    
    // 리프레시 토큰을 데이터베이스에 저장
    $stmt = $pdo->prepare("
        INSERT INTO user_tokens (user_id, refresh_token, ip_address, user_agent, expires_at) 
        VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    ");
    
    $stmt->execute([
        $user_id,
        $refresh_token,
        $_SERVER['REMOTE_ADDR'] ?? '',
        $_SERVER['HTTP_USER_AGENT'] ?? ''
    ]);
    
    return [
        'access_token' => $access_token,
        'refresh_token' => $refresh_token
    ];
}

/**
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
 * 
 * @param string $refresh_token 리프레시 토큰
 * @return array|false 새로운 토큰 또는 false
 */
function refresh_access_token($refresh_token) {
    global $pdo;
    
    // 리프레시 토큰 검증
    $payload = JWT::verify($refresh_token);
    if (!$payload || $payload['type'] !== 'refresh') {
        return false;
    }
    
    // 데이터베이스에서 토큰 확인
    $stmt = $pdo->prepare("
        SELECT user_id, is_revoked, expires_at 
        FROM user_tokens 
        WHERE refresh_token = ? AND is_revoked = FALSE
    ");
    $stmt->execute([$refresh_token]);
    $token_record = $stmt->fetch();
    
    if (!$token_record || strtotime($token_record['expires_at']) < time()) {
        return false;
    }
    
    // 사용자 정보 가져오기
    $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->execute([$token_record['user_id']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        return false;
    }
    
    // 새로운 액세스 토큰 생성
    $new_access_token = JWT::generateAccessToken($token_record['user_id'], $user['username']);
    
    return [
        'access_token' => $new_access_token,
        'refresh_token' => $refresh_token
    ];
}

/**
 * 리프레시 토큰 무효화
 * 
 * @param string $refresh_token 무효화할 리프레시 토큰
 * @return bool 성공 여부
 */
function revoke_token($refresh_token) {
    global $pdo;
    
    $stmt = $pdo->prepare("UPDATE user_tokens SET is_revoked = TRUE WHERE refresh_token = ?");
    return $stmt->execute([$refresh_token]);
}

/**
 * 토큰 갱신 API 엔드포인트
 * 
 * 이 부분은 refresh_token.php에서 가져온 API 로직입니다.
 * POST 요청으로 리프레시 토큰을 받아 새로운 액세스 토큰을 반환합니다.
 */
function handle_token_refresh_api() {
    // API 요청인지 확인
    if (!isset($_GET['action']) || $_GET['action'] !== 'refresh') {
        return;
    }
    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    
    // POST 요청만 허용
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit();
    }
    
    // 요청 본문 읽기
    $input = json_decode(file_get_contents('php://input'), true);
    $refresh_token = $input['refresh_token'] ?? '';
    
    if (empty($refresh_token)) {
        http_response_code(400);
        echo json_encode(['error' => 'Refresh token is required']);
        exit();
    }
    
    // 토큰 갱신 시도
    $new_tokens = refresh_access_token($refresh_token);
    
    if ($new_tokens) {
        // 새 토큰을 쿠키에 설정
        setcookie('access_token', $new_tokens['access_token'], [
            'expires' => time() + 3600, // 1시간
            'path' => '/',
            'httponly' => true,
            'secure' => isset($_SERVER['HTTPS']),
            'samesite' => 'Strict'
        ]);
        
        echo json_encode([
            'success' => true,
            'access_token' => $new_tokens['access_token'],
            'expires_in' => 3600
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired refresh token']);
    }
    
    exit();
}

// API 요청 처리
handle_token_refresh_api();
?> 