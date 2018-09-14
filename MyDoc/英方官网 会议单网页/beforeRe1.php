<?php
session_start();
$codeT = $_POST['codeS'];
$codeP =  $_SESSION['authcode1'];
if ($codeT==$codeP) {
	echo 1;
}
else{
	echo -1;
?>