<?php
/**
 * 데이터베이스 연결 설정 파일
 * 
 * 이 파일은 MySQL 데이터베이스와의 연결을 관리합니다.
 * 보안을 위해 실제 프로덕션에서는 환경변수나 별도 설정 파일을 사용해야 합니다.
 */

// 데이터베이스 연결 정보
$host = 'localhost';      // 데이터베이스 호스트
$dbname = 'user_system';  // 데이터베이스 이름
$username = 'root';       // 데이터베이스 사용자명
$password = '';           // 데이터베이스 비밀번호

try {
    // PDO를 사용한 데이터베이스 연결
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // 에러 모드 설정 (개발 환경에서는 예외 발생, 프로덕션에서는 로그 기록)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 기본 인코딩 설정
    $pdo->exec("SET NAMES utf8");
    
} catch(PDOException $e) {
    // 연결 실패 시 에러 메시지 출력 (프로덕션에서는 로그 파일에 기록)
    die("데이터베이스 연결 실패: " . $e->getMessage());
}
?> 