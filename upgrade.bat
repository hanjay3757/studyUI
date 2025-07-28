@echo off
chcp 65001 >nul

:: 관리자 권한 확인
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 관리자 권한이 필요합니다. UAC 창이 뜨면 '예'를 눌러주세요.
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo 전체 프로그램을 최신 버전으로 업데이트합니다...
winget upgrade --all
echo 업데이트가 완료되었습니다.
pause
