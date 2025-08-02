<?php
/**
 * 메인페이지
 * 
 * 이 페이지는 로그인된 사용자만 접근할 수 있는 메인 페이지입니다.
 * 사용자 정보 표시, 로그아웃 기능 등을 포함합니다.
 */

session_start();
require_once 'functions.php';

// 로그인 필요
require_login();

// 현재 사용자 정보 가져오기
$user = get_current_user();

// 로그아웃 처리
if (isset($_GET['logout'])) {
    // CSRF 토큰 검증
    if (verify_csrf_token($_GET['csrf_token'] ?? '')) {
        // 세션 삭제
        session_unset();
        session_destroy();
        
        // 로그인 페이지로 리다이렉트
        header("Location: login.php?message=logged_out");
        exit();
    }
}

$csrf_token = generate_csrf_token();
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>메인페이지 - <?php echo htmlspecialchars($user['full_name']); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .navbar-brand {
            font-weight: bold;
        }
        .welcome-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 0;
            margin-bottom: 30px;
        }
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .feature-icon {
            font-size: 2.5rem;
            color: #007bff;
            margin-bottom: 1rem;
        }
        .user-info-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
    </style>
</head>
<body>
    <!-- 네비게이션 바 -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="main.php">
                <i class="fas fa-home me-2"></i>홈페이지
            </a>
            
            <div class="navbar-nav ms-auto">
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i><?php echo htmlspecialchars($user['full_name']); ?>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="fas fa-user-edit me-2"></i>프로필</a></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>설정</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item text-danger" href="auth_manager.php?action=logout">
                                <i class="fas fa-sign-out-alt me-2"></i>로그아웃
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <!-- 환영 섹션 -->
    <section class="welcome-section">
        <div class="container text-center">
            <h1 class="display-4 mb-3">환영합니다, <?php echo htmlspecialchars($user['full_name']); ?>님!</h1>
            <p class="lead">오늘도 좋은 하루 되세요.</p>
            <p class="mb-0">
                <small>
                    마지막 로그인: 
                    <?php 
                    if ($user['last_login']) {
                        echo date('Y년 m월 d일 H:i', strtotime($user['last_login']));
                    } else {
                        echo "첫 로그인";
                    }
                    ?>
                </small>
            </p>
        </div>
    </section>

    <!-- 메인 콘텐츠 -->
    <div class="container">
        <div class="row">
            <!-- 사용자 정보 카드 -->
            <div class="col-lg-4 mb-4">
                <div class="card user-info-card">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-user-circle" style="font-size: 4rem;"></i>
                        </div>
                        <h5 class="card-title"><?php echo htmlspecialchars($user['full_name']); ?></h5>
                        <p class="card-text">
                            <strong>사용자명:</strong> <?php echo htmlspecialchars($user['username']); ?><br>
                            <strong>이메일:</strong> <?php echo htmlspecialchars($user['email']); ?><br>
                            <strong>가입일:</strong> <?php echo date('Y년 m월 d일', strtotime($user['created_at'])); ?>
                        </p>
                    </div>
                </div>
            </div>

            <!-- 기능 카드들 -->
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <h5 class="card-title">게시판</h5>
                                <p class="card-text">커뮤니티 게시판에서 다양한 이야기를 나누어보세요.</p>
                                <a href="#" class="btn btn-primary">게시판 보기</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <h5 class="card-title">문서 관리</h5>
                                <p class="card-text">중요한 문서들을 안전하게 관리하고 공유하세요.</p>
                                <a href="#" class="btn btn-primary">문서 관리</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <h5 class="card-title">통계</h5>
                                <p class="card-text">사용 통계와 분석 결과를 확인해보세요.</p>
                                <a href="#" class="btn btn-primary">통계 보기</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-cog"></i>
                                </div>
                                <h5 class="card-title">설정</h5>
                                <p class="card-text">계정 설정과 개인정보를 관리하세요.</p>
                                <a href="#" class="btn btn-primary">설정</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 최근 활동 섹션 -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-history me-2"></i>최근 활동</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>로그인 정보</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-clock me-2"></i>현재 로그인: <?php echo date('Y년 m월 d일 H:i:s'); ?></li>
                                    <li><i class="fas fa-calendar me-2"></i>가입일: <?php echo date('Y년 m월 d일', strtotime($user['created_at'])); ?></li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>시스템 정보</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-server me-2"></i>서버 시간: <?php echo date('Y년 m월 d일 H:i:s'); ?></li>
                                    <li><i class="fas fa-globe me-2"></i>PHP 버전: <?php echo PHP_VERSION; ?></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 푸터 -->
    <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
            <p class="mb-0">&copy; 2024 사용자 관리 시스템. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="token_manager.js"></script>
</body>
</html> 