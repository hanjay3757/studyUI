<?php
//세팅확인
if(isset($_COOKIE['ck_Name'])){

    
    echo '이름은 : '. $_COOKIE['ck_Name'].'입니다';
}else{
    echo 'No Cookie';
}
    ?>
<a href="delete.php">쿠키 지우기</a>