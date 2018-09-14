<html>
<meta charset="utf-8" />
<body>

<?php
session_start();
if (isset($_POST['user'])) {
    $user = $_POST['user'];
    $password = $_POST['password'];
    if ($user == 'admin' && $password == 'info2soft') {//验证正确
        $_SESSION['user'] = $user;
        //跳转到首页
        header('location:showRegister.php');
    }else{
        echo "<script>alert('登录失败，用户名或密码不正确');</script>";
        exit();
    }
}
?>
<form method="POST">
    用户名: <input type="text" name="user"><br />
    密码: <input type="text" name="password"><br />
    <input type="submit" value="提交">
</form>

</body>
</html>