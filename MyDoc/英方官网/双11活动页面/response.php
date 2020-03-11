<?php
	date_default_timezone_set("Asia/Shanghai");
	//处理提交的信息
	if( isset($_POST['name']) && $_POST['email'] !="foo-bar@example.com" && $_POST['name'] !="ZAP" && $_POST['name'] !="9999999999") {	
		require_once("db.php");
		$jzl_db = new DB;
                session_start();
                if ($_SESSION['authcodeDate'] == date("YmdHi")){
//                  提交过于频繁
                    echo -1;
                    exit();
                }	
               if ($_POST['codeT']== ""|| !isset($_POST['codeT']) || $_POST['codeT'] != $_SESSION['authcode'] || $_POST['codeT'] == $_SESSION['authcodeUsed']){
//                  验证码错误
                    echo -3;
                    exit();
                }
			$dataArray = array( 
				'name' => $_POST['name'], 
				'company' => $_POST['company'], 
				'position' => $_POST['positions'], 
				'phone' => $_POST['phone'], 
				'email' => $_POST['email'], 
				'submission_date' => date('Y-m-d H:i:s')
			);

				$jzl_db->insert("doubleEleven",$dataArray);
                $_SESSION['authcodeDate'] = date("YmdHi");
                $_SESSION['authcodeUsed1'] = $_POST['codeT'];

		if ( $jzl_db->insert_id() != 0) 
		{

//			$to = "jinmw@info2soft.com";
            $to = "liul@info2soft.com";
			$subject = "双11活动报名";
			$message = "
			<html>
			<head>
			<title>双11活动报名</title>
			</head>
			<body>
			<p>双11活动报名详情:</p>
			<table>
			<tr>
			<td width=15%>姓名</td>
			<td>".$_POST['name']."</td>
			</tr>
			<tr>
			<td>公司</td>
			<td>".$_POST['company']."</td>
			</tr>
			<tr>
			<td>职位</td>
			<td>".$_POST['positions']."</td>
			</tr>
			<tr>
			<td>手机</td>
			<td>".$_POST['phone']."</td>
			</tr>
			<tr>
			<td>邮箱</td>
			<td>".$_POST['email']."</td>
			</tr>
			<tr>
            <td>验证码</td>
			<td>".$_POST['codeT']."</td>
			</tr>
			</table>
			</body>
			</html>
			";

			// 当发送 HTML 电子邮件时，请始终设置 content-type
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";

			// 更多报头
			$headers .= 'From: <noreply@qq.com>' . "\r\n";
			$headers .= 'Cc: wenrj@info2soft.com' . "\r\n";
			$headers .= 'Cc: chengq@info2soft.com' . "\r\n";
			$headers .= 'Cc: jinmw@info2soft.com' . "\r\n";



			mail($to,$subject,$message,$headers);
                        echo 1;
                }
                else{
//                链接数据库错误，发送失败
                  echo -2;
                }
        }

?>