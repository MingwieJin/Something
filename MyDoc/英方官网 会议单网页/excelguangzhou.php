<?php
		
header('Content-type: text/html; charset=utf-8');
header("Content-type:application/vnd.ms-excel");
header("Content-Disposition:filename=registerGZ.xls");

require('../wp-config.php' );
$conn = mysqli_connect("localhost","root","newinfo2");
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysqli_select_db($conn,"info2");
mysqli_set_charset($conn,'utf8');
$sql = "SELECT * FROM fenghui0225 where fenghui_location='石家庄'";
$result = mysqli_query($conn,$sql);
echo "ID号\t地点\t姓名\t公司\t职位\t邮箱\t电话\t时间\t\n";
while ($row = mysqli_fetch_array($result)){
    echo $row[0]."\t".$row[1]."\t".$row[2]."\t".$row[3]."\t".$row[4]."\t".$row[5]."\t".$row[6]."\t".$row[7]."\t".$row[8]."\t\n";
}
?>


