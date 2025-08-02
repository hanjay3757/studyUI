<?php
/**
 * 세션 관리 통합 파일
 * 기존 파일들 통합:
 * - ini.php: 세션 설정 정보
 * - session.php: 세션 생성
 * - start.php: 세션 확인
 * - delete.php: 세션 삭제
 */

// 세션 시작
session_start();

// 세션 설정 정보 (ini.php에서 가져옴)
// 참고: 실제 설정은 xampp\php\php.ini에서 변경
// session.gc_maxlifetime 설정 확인 가능
// phpinfo(); 로 상세 설정 확인 가능

// 액션 처리
$action = $_GET['action'] ?? '';

switch($action) {
    case 'create':
        // 세션 생성 (session.php에서 가져옴)
        $_SESSION['s_name'] = 'id';
        $_SESSION['s_age'] = 'age';
        $message = "세션이 생성되었습니다";
        break;
        
    case 'delete':
        // 세션 삭제 (delete.php에서 가져옴)
        // session_unset(); // 모든 세션 변수 삭제
        // session_destroy(); // 세션 완전 삭제
        unset($_SESSION["s_age"]); // 특정 세션 변수만 삭제
        $message = "세션이 삭제되었습니다";
        break;
        
    case 'check':
    default:
        // 세션 확인 (start.php에서 가져옴)
        $message = "";
        if(isset($_SESSION['s_name'])){
            $message .= "name: " . $_SESSION['s_name'] . "입니다.<br>";
        } else {
            $message .= "정확하지 않습니다.<br>";
        }
        if(isset($_SESSION['s_age'])){
            $message .= "지속시간: " . $_SESSION['s_age'] . "입니다.<br>";
        } else {
            $message .= "권한시간이 없습니다.<br>";
        }
        break;
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>세션 관리</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .nav-links {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        .nav-links a {
            display: inline-block;
            margin: 5px 10px 5px 0;
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .nav-links a:hover {
            background-color: #0056b3;
        }
        .nav-links a.delete {
            background-color: #dc3545;
        }
        .nav-links a.delete:hover {
            background-color: #c82333;
        }
        .message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            background-color: #e9ecef;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>세션 관리 시스템</h1>
        
        <?php if (!empty($message)): ?>
            <div class="message">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>
        
        <div class="nav-links">
            <a href="?action=create">세션 생성</a>
            <a href="?action=check">세션 확인</a>
            <a href="?action=delete" class="delete">세션 삭제</a>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <h3>사용법:</h3>
            <ul>
                <li><strong>세션 생성:</strong> 기본 세션 변수들을 생성합니다</li>
                <li><strong>세션 확인:</strong> 현재 세션 상태를 확인합니다</li>
                <li><strong>세션 삭제:</strong> 특정 세션 변수를 삭제합니다</li>
            </ul>
        </div>
    </div>
</body>
</html> 