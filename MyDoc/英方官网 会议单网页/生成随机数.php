<html>
<meta charset="utf-8" />
<body>
111111
<?php  
	
$str="QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
$str='Share'.substr(str_shuffle($str),5,8).date("Ymd");
echo $str;
?>

</body>
</html>