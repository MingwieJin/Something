<!--<html>
<meta charset="utf-8" />
<body>

Welcome <?php echo $_POST["name"]; ?><br>
you meeting location: <?php echo $_POST["location"]; ?><br>
you company: <?php echo $_POST["company"]; ?><br>
you position: <?php echo $_POST["position"]; ?><br>
Your email: <?php echo $_POST["email"]; ?><br>
you phone: <?php echo $_POST["phone"]; ?>

</body>
</html>-->


<!--//<?PHP
//require('../wp-config.php' );	
//if($_POST[re]) {//如果检查到有register这个提交动作
//  $sql ="insert into users (name,company) values ('$_POST[name]','$_POST[company]')";//写好SQL插入语句
//  $sth = $db -> prepare($sql);
//  $sth -> execute();//这两句是PDO数据库的操作方法，不同的语言不同，就是执行刚才那条SQL语句啦
//?>-->


<?php
	
session_start();
$Passcode = $_POST['PassCode'];
//if ($_SESSION['authcodeRe1Date'] == date("YmdHi")){
//    echo "too quick";
//	exit();
//}
 $_SESSION['authcodeRe1Date'] = date("YmdHi");

if ($Passcode=="info2_key") {
$con = mysql_connect("localhost","root","XXXXXXX");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("info2", $con);
 
$sql="INSERT INTO partnerReg (companyname, companysource, country, province, city, phone, email, website, zipcode, fax, will)
VALUES
('$_POST[companyname]','$_POST[companysource]','$_POST[country]','$_POST[province]','$_POST[city]','$_POST[phone]','$_POST[email]','$_POST[website]','$_POST[zipcode]','$_POST[fax]','$_POST[will]')";
 
if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";
 
mysql_close($con);
} 
else {
     echo "wrong passcode";
	exit();
}

?>