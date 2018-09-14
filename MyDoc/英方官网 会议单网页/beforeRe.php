<?php
session_start();
$codeT = $_POST['codeT'];
$codeP =  $_SESSION['authcode'];
$codeS = $_POST['codeS'];
$codeP1 =  $_SESSION['authcode1'];
if($codeT){
	if ($codeT==$codeP) {
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
	echo -1;
}
?>