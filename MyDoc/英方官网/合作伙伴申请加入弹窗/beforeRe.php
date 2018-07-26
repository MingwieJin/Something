<?php
session_start();
$codeT = $_POST['codeT'];
$codeP =  $_SESSION['authcode'];
$codeU = $_SESSION['authcodeVrisUsed'];
$codeS = $_POST['codeS'];
$codeP1 =  $_SESSION['authcode1'];

if ($_SESSION['authcodeVirsDate'] == date("YmdHi") || $_SESSION['authcodeRe1Date'] == date("YmdHi") || $_SESSION['authcodeSpeachDate'] == date("YmdHi")){
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

else if($codeS){
	if ($codeS==$codeP1) {
		echo 1;
		exit();
	}
}

else{
	echo 0;
	exit();
}
?>