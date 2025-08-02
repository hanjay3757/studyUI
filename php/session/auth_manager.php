<?php
/**
 
 * - login.php: 로그인 처리
 * - logout.php: 로그아웃 처리
 * - register.php: 회원가입 처리
 */

session_start();
require_once 'functions.php';

// 이미 로그인된 사용자는 메인페이지로 리다이렉트 (로그인/회원가입 페이지 접근 시)
if (is_logged_in() && !isset($_GET['action'])) {
    header("Location: main.php");
    exit();
}

$errors = [];
$success_message = '';
$action = $_GET['action'] ?? '';

// 액션 처리
switch($action) {
    case 'login':
        handle_login();
        break;
    case 'logout':
        handle_logout();
        break;
    case 'register':
        handle_register();
        break;
    default:
        // 기본 페이지는 로그인 페이지
        show_login_page();
        break;
}

/**
 * 로그인 처리
 */
function handle_login() {
    global $errors, $success_message;
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header("Location: auth_manager.php");
        exit();
    }
    
    // 입력 데이터 정리
    $username = sanitize_input($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    // 입력 데이터 검증
    if (empty($username)) {
        $errors[] = "사용자명을 입력해주세요.";
    }
    
    if (empty($password)) {
        $errors[] = "비밀번호를 입력해주세요.";
    }
    
    // 로그인 처리
    if (empty($errors)) {
        try {
            global $pdo;
            
            // 사용자 정보 조회 (사용자명 또는 이메일로 로그인 가능)
            $stmt = $pdo->prepare("SELECT id, username, email, password, full_name, is_active FROM users WHERE (username = ? OR email = ?) AND is_active = 1");
            $stmt->execute([$username, $username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && password_verify($password, $user['password'])) {
                // JWT 토큰 생성
                $tokens = generate_tokens($user['id'], $user['username']);
                
                // 마지막 로그인 시간 업데이트
                $stmt = $pdo->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?");
                $stmt->execute([$user['id']]);
                
                // 세션에도 저장 (하위 호환성)
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['full_name'] = $user['full_name'];
                
                // 토큰을 쿠키에 저장 (HttpOnly, Secure 설정)
                setcookie('access_token', $tokens['access_token'], [
                    'expires' => time() + 3600, // 1시간
                    'path' => '/',
                    'httponly' => true,
                    'secure' => isset($_SERVER['HTTPS']),
                    'samesite' => 'Strict'
                ]);
                
                setcookie('refresh_token', $tokens['refresh_token'], [
                    'expires' => time() + (7 * 24 * 3600), // 7일
                    'path' => '/',
                    'httponly' => true,
                    'secure' => isset($_SERVER['HTTPS']),
                    'samesite' => 'Strict'
                ]);
                
                // 로그인 성공 후 메인페이지로 리다이렉트
                header("Location: main.php");
                exit();
                
            } else {
                // 로그인 실패
                $errors[] = "사용자명 또는 비밀번호가 올바르지 않습니다.";
            }
            
        } catch (PDOException $e) {
            error_log("로그인 실패: " . $e->getMessage());
            $errors[] = "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
    }
    
    // 로그인 실패 시 로그인 페이지 표시
    show_login_page();
}

/**
 * 로그아웃 처리
 */
function handle_logout() {
    // 리프레시 토큰 가져오기
    $refresh_token = $_COOKIE['refresh_token'] ?? '';
    
    if (!empty($refresh_token)) {
        // 토큰 무효화
        revoke_token($refresh_token);
    }
    
    // 세션 데이터 정리
    session_unset();
    
    // 세션 쿠키 삭제
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    // JWT 토큰 쿠키 삭제
    setcookie('access_token', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']),
        'samesite' => 'Strict'
    ]);
    
    setcookie('refresh_token', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']),
        'samesite' => 'Strict'
    ]);
    
    // 세션 완전 삭제
    session_destroy();
    
    // 로그인 페이지로 리다이렉트
    header("Location: auth_manager.php?message=logged_out");
    exit();
}

/**
 * 회원가입 처리
 */
function handle_register() {
    global $errors, $success_message;
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        show_register_page();
        return;
    }
    
    // 입력 데이터 정리
    $username = sanitize_input($_POST['username'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $full_name = sanitize_input($_POST['full_name'] ?? '');
    
    // 입력 데이터 검증
    if (empty($username)) {
        $errors[] = "사용자명을 입력해주세요.";
    } elseif (strlen($username) < 3 || strlen($username) > 50) {
        $errors[] = "사용자명은 3자 이상 50자 이하여야 합니다.";
    } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        $errors[] = "사용자명은 영문자, 숫자, 언더스코어만 사용 가능합니다.";
    }
    
    if (empty($email)) {
        $errors[] = "이메일을 입력해주세요.";
    } elseif (!is_valid_email($email)) {
        $errors[] = "유효한 이메일 주소를 입력해주세요.";
    }
    
    if (empty($password)) {
        $errors[] = "비밀번호를 입력해주세요.";
    } else {
        $password_errors = validate_password($password);
        $errors = array_merge($errors, $password_errors);
    }
    
    if ($password !== $confirm_password) {
        $errors[] = "비밀번호가 일치하지 않습니다.";
    }
    
    if (empty($full_name)) {
        $errors[] = "이름을 입력해주세요.";
    }
    
    // 중복 확인
    if (empty($errors)) {
        try {
            global $pdo;
            
            // 사용자명 중복 확인
            $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
            $stmt->execute([$username]);
            if ($stmt->fetch()) {
                $errors[] = "이미 사용 중인 사용자명입니다.";
            }
            
            // 이메일 중복 확인
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                $errors[] = "이미 사용 중인 이메일입니다.";
            }
            
        } catch (PDOException $e) {
            error_log("중복 확인 실패: " . $e->getMessage());
            $errors[] = "시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
    }
    
    // 회원가입 처리
    if (empty($errors)) {
        try {
            // 비밀번호 해싱 (보안 강화)
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // 사용자 정보 저장
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
            $stmt->execute([$username, $email, $hashed_password, $full_name]);
            
            $success_message = "회원가입이 완료되었습니다. 로그인해주세요.";
            
        } catch (PDOException $e) {
            error_log("회원가입 실패: " . $e->getMessage());
            $errors[] = "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
    }
    
    show_register_page();
}

/**
 * 로그인 페이지 표시
 */
function show_login_page() {
    global $errors, $success_message;
    
    // URL 파라미터로 전달된 메시지 처리
    if (isset($_GET['error'])) {
        switch ($_GET['error']) {
            case 'login_required':
                $errors[] = "로그인이 필요한 페이지입니다.";
                break;
            case 'token_expired':
                $errors[] = "세션이 만료되었습니다. 다시 로그인해주세요.";
                break;
        }
    }
    
    if (isset($_GET['message'])) {
        switch ($_GET['message']) {
            case 'logged_out':
                $success_message = "로그아웃되었습니다.";
                break;
            case 'registered':
                $success_message = "회원가입이 완료되었습니다. 로그인해주세요.";
                break;
        }
    }
    
    $username = $_POST['username'] ?? '';
    $csrf_token = generate_csrf_token();
    
    include 'templates/login_form.php';
}

/**
 * 회원가입 페이지 표시
 */
function show_register_page() {
    global $errors, $success_message;
    
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $full_name = $_POST['full_name'] ?? '';
    $csrf_token = generate_csrf_token();
    
    include 'templates/register_form.php';
}

// 템플릿 파일이 없으면 인라인으로 표시
if (!file_exists('templates/login_form.php')) {
    show_inline_login_form();
}

if (!file_exists('templates/register_form.php')) {
    show_inline_register_form();
}

/**
 * 인라인 로그인 폼 표시
 */
function show_inline_login_form() {
    global $errors, $success_message, $username, $csrf_token;
    ?>
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>로그인</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <h2 class="text-center mb-4">
                                <i class="fas fa-sign-in-alt text-primary"></i> 로그인
                            </h2>
                            
                            <?php if (!empty($errors)): ?>
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <?php foreach ($errors as $error): ?>
                                            <li><?php echo htmlspecialchars($error); ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($success_message)): ?>
                                <div class="alert alert-success">
                                    <?php echo htmlspecialchars($success_message); ?>
                                </div>
                            <?php endif; ?>
                            
                            <form method="POST" action="?action=login">
                                <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                                
                                <div class="mb-3">
                                    <label for="username" class="form-label">사용자명 또는 이메일</label>
                                    <input type="text" class="form-control" id="username" name="username" 
                                           value="<?php echo htmlspecialchars($username); ?>" required>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="password" class="form-label">비밀번호</label>
                                    <input type="password" class="form-control" id="password" name="password" required>
                                </div>
                                
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-sign-in-alt me-2"></i>로그인
                                    </button>
                                </div>
                            </form>
                            
                            <div class="text-center mt-3">
                                <p class="mb-0">계정이 없으신가요? 
                                    <a href="?action=register" class="text-decoration-none">회원가입</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    <?php
}

/**
 * 인라인 회원가입 폼 표시
 */
function show_inline_register_form() {
    global $errors, $success_message, $username, $email, $full_name, $csrf_token;
    ?>
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>회원가입</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 col-lg-6">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <h2 class="text-center mb-4">
                                <i class="fas fa-user-plus text-primary"></i> 회원가입
                            </h2>
                            
                            <?php if (!empty($errors)): ?>
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <?php foreach ($errors as $error): ?>
                                            <li><?php echo htmlspecialchars($error); ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                            
                            <?php if (!empty($success_message)): ?>
                                <div class="alert alert-success">
                                    <?php echo htmlspecialchars($success_message); ?>
                                </div>
                            <?php endif; ?>
                            
                            <form method="POST" action="?action=register">
                                <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="username" class="form-label">사용자명</label>
                                        <input type="text" class="form-control" id="username" name="username" 
                                               value="<?php echo htmlspecialchars($username); ?>" required>
                                        <div class="form-text">3-50자, 영문자, 숫자, 언더스코어만 사용 가능</div>
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <label for="email" class="form-label">이메일</label>
                                        <input type="email" class="form-control" id="email" name="email" 
                                               value="<?php echo htmlspecialchars($email); ?>" required>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="full_name" class="form-label">이름</label>
                                    <input type="text" class="form-control" id="full_name" name="full_name" 
                                           value="<?php echo htmlspecialchars($full_name); ?>" required>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="password" class="form-label">비밀번호</label>
                                        <input type="password" class="form-control" id="password" name="password" required>
                                        <div class="form-text">최소 8자, 대소문자, 숫자 포함</div>
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <label for="confirm_password" class="form-label">비밀번호 확인</label>
                                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                                    </div>
                                </div>
                                
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-user-plus me-2"></i>회원가입
                                    </button>
                                </div>
                            </form>
                            
                            <div class="text-center mt-3">
                                <p class="mb-0">이미 계정이 있으신가요? 
                                    <a href="auth_manager.php" class="text-decoration-none">로그인</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    <?php
}
?> 