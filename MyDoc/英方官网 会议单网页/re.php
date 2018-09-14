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
$codeT = $_POST['codeT'];
$codeP =  $_SESSION['authcode'];
if ($codeT==$codeP && $codeT!="") {
require('../wp-config.php' );	
$con = mysql_connect("localhost","root","newinfo2");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("my_db", $con);
 
$sql="INSERT INTO fenghui0225 (fenghui_location, fenghui_name , fenghui_company, fenghui_position,  fenghui_email, fenghui_phone)
VALUES
('$_POST[location]','$_POST[name]','$_POST[company]','$_POST[position]','$_POST[email]','$_POST[phone]')";
 
if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";
 
mysql_close($con);
} 
else {
	exit();
}

?>