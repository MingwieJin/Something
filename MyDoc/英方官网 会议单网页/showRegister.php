<?php
session_start();
if (isset($_SESSION['user']) && !empty($_SESSION['user'])) {
    echo "登录成功：".$_SESSION['user']. "   ";
    echo "<a href='logout.php'>退出登录</a><br>";
    echo "<br>";
    
}else{
    echo "你还没有登录，<a href='login.php'>请登录</a><br>";
}

?>

<html>
<meta charset="utf-8" />
<body>


<?php
require('../wp-config.php' );
$servername = "localhost";
$username = "root";
$password = "newinfo2";
$dbname = "info2";

 if (isset($_SESSION['user']) && !empty($_SESSION['user'])) { 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
$sql = "SELECT * FROM fenghui0225 where fenghui_location='广州'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["fenghui_id"]. "<br>";
        echo "地点：" . $row["fenghui_location"]. "<br>";
        echo "姓名: " . $row["fenghui_name"]."<br>";
        echo "公司: " . $row["fenghui_company"]."<br>";
        echo "职位: " . $row["fenghui_position"]. "<br>";
        echo "邮箱: " . $row["fenghui_email"]. "<br>";
        echo "电话: " . $row["fenghui_phone"]."<br>";
        echo "申请时间: " . $row["submission_date"]. "<br>";
        echo "<br>";
    }
} else {
    echo "0 结果";
}

$conn->close();
}
?>


</body>
</html>