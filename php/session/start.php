<?php
session_start();
if(isset($_SESSION['s_name'])){
    echo "name".$_SESSION['s_name']."입니다.<br>";
}else{
    echo "정확하지 않습니다.<br>";
}
if(isset($_SESSION['s_age'])){
    echo "지속시간".$_SESSION['s_age']."입니다.<br>";
}else{
    echo "권한시간이 없습니다.<br>";
}
?>
<a href="delete.php">세션삭제</a>