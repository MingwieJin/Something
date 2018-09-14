<!--<html>
<meta charset="utf-8" />
<body>

Welcome <?php echo $_POST["M-lecturer"]; ?><br>
you meeting location: <?php echo $_POST["location1"]; ?><br>
you topic: <?php echo $_POST["M-topic"]; ?><br>
you company: <?php echo $_POST["M-company"]; ?><br>
you position: <?php echo $_POST["M-position"]; ?><br>
you applyer: <?php echo $_POST["M-applyer"]; ?><br>
you applyer position: <?php echo $_POST["M-applyerP"]; ?><br>
you phone: <?php echo $_POST["M-phone"]; ?><br>
you email: <?php echo $_POST["M-email"]; ?><br>





</body>
</html>-->



<?php
	session_start();
$codeT = $_POST['codeS'];
$codeP =  $_SESSION['authcode1'];
if ($codeT==$codeP && $codeT!="") {	
	
require('../wp-config.php' );	
$con = mysql_connect("localhost","root","newinfo2");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("my_db", $con);
 
$sql="INSERT INTO yanjiang0226 (location, company, topic, lecturer, position, applyer, appposition, phone, email)
VALUES
('$_POST[location1]','$_POST[Mcompany]','$_POST[Mtopic]','$_POST[Mlecturer]','$_POST[Mposition]','$_POST[Mapplyer]','$_POST[MapplyerP]','$_POST[Mphone]','$_POST[Memail]')";
 
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