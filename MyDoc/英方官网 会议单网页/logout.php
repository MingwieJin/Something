<html>
<meta charset="utf-8" />
<body>

<?php
session_start();
if (isset($_POST['user'])) {
    $user = $_POST['user'];
    $password = $_POST['password'];
    if ($user == 'admin' && $password == 'admin') {//验证正确
  		unset($_SESSION['user']);
        //跳转到首页
        header('location:showRegister.php');
    }else{
        echo "<script>alert('登录失败，用户名或密码不正确');</script>";
        exit();
    }
}
?>
<form method="POST">
<input type="text" name="user" value="admin" style="display: none;">
<input type="text" name="password" value="admin"style="display: none;">
    <input type="submit" value="返回">
</form>

</body>
</html>
