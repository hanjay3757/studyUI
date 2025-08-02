<?php
/**
 * 인덱스 페이지
 * 
 * 이 페이지는 사이트의 메인 진입점입니다.
 * 로그인 상태에 따라 적절한 페이지로 리다이렉트합니다.
 */

session_start();
require_once 'functions.php';

// 로그인된 사용자는 메인페이지로, 그렇지 않으면 로그인 페이지로
if (is_logged_in()) {
    header("Location: main.php");
    exit();
} else {
    header("Location: auth_manager.php");
    exit();
}
?> 