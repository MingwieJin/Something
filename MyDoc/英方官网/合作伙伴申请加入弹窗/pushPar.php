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
if ($_SESSION['authcodeRe1Date'] == date("YmdHi")){
    echo "too quick";
	exit();
}
 $_SESSION['authcodeRe1Date'] = date("YmdHi");

if ($Passcode=="info2_key") {
$con = mysql_connect("localhost","root","XXXXXXXX");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("info2", $con);
 
$sql="INSERT INTO partnerReg (companyname, companysource, country, province, city, phone, email, website, will)
VALUES
('$_POST[companyname]','$_POST[companysource]','$_POST[country]','$_POST[province]','$_POST[city]','$_POST[phone]','$_POST[email]','$_POST[website]','$_POST[will]')";
 
if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";

//发送邮件
			$to = "jinmw@info2soft.com";
			$subject = "合作伙伴报名";
			$message = "
			<html>
			<head>
			<title>合作伙伴报名详情</title>
			</head>
			<body>
			<p>或作伙伴信息:</p>
			<table>
			<tr>
			<td width=70px;>公司名称</td>
			<td>".$_POST[companyname]."</td>
			</tr>
			<tr>
			<td>母公司名称</td>
			<td>".$_POST[companysource]."</td>
			</tr>
			<tr>
			<td>国家</td>
			<td>".$_POST[country]."</td>
			</tr>
			<tr>
			<td>省份</td>
			<td>".$_POST[province]."</td>
			</tr>
			<tr>
			<td>城市</td>
			<td>".$_POST[city]."</td>
			</tr>
			<tr>
			<td>电话</td>
			<td>".$_POST[phone]."</td>
			</tr>
                        <tr>
			<td>邮件</td>
			<td>".$_POST[email]."</td>
			</tr>
                        <tr>
			<td>网站</td>
			<td>".$_POST[website]."</td>
			</tr>
                        <tr>
			<td>合作意愿</td>
			<td>".$_POST[will]."</td>
			</tr>
			</table>
			</body>
			</html>
			";

			// 当发送 HTML 电子邮件时，请始终设置 content-type
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";

			// 更多报头
			$headers .= 'From: <928062736@qq.com>' . "\r\n";
//			$headers .= 'Cc: chengq@info2soft.com' . "\r\n";
//			$headers .= 'Cc: jinmw@info2soft.com' . "\r\n";

			mail($to,$subject,$message,$headers);
//发送邮件结束

mysql_close($con);
} 
else {
     echo "wrong passcode";
	exit();
}

?>