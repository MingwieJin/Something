<?php
session_start();
$codeT = $_POST['codeT'];
$codeP =  $_SESSION['authcode'];
$codeU = $_SESSION['authcodeVrisUsed'];

if ($_SESSION['authcodeVirsDate'] == date("YmdHi")){
	echo -1;
	exit();
}

if($codeT){
	if ($codeT==$codeP && $codeT != $codeU) {
		$_SESSION['authcodeVrisUsed'] = $codeT;
		echo 1;
		exit();
	}
}

else{
	echo -1;
}
?>