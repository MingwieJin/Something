<?php
		
header('Content-type: text/html; charset=utf-8');
header("Content-type:application/vnd.ms-excel");
header("Content-Disposition:filename=speach.xls");

require('../wp-config.php' );
$conn = mysqli_connect("localhost","root","newinfo2");
if (!$conn)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysqli_select_db($conn,"info2");
mysqli_set_charset($conn,'utf8');
$sql = "SELECT * FROM yanjiang0226";
$result = mysqli_query($conn,$sql);
echo "ID号\t地点\t公司\t演讲题目\t演讲者姓名\t演讲者职位\t申请人姓名\t申请人职位\t电话\t邮箱\t时间\t\n";
while ($row = mysqli_fetch_array($result)){
    echo $row[0]."\t".$row[1]."\t".$row[2]."\t".$row[3]."\t".$row[4]."\t".$row[5]."\t".$row[6]."\t".$row[7]."\t".$row[8]."\t".$row[9]."\t".$row[10]."\t".$row[11]."\t\n";
}
?>