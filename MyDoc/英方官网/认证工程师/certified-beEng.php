<?php
	date_default_timezone_set("Asia/Shanghai");
	//处理提交的信息
	if( isset($_POST['name']) && $_POST['email'] !="foo-bar@example.com" && $_POST['name'] !="ZAP" && $_POST['name'] !="9999999999") {	
		require_once("db.php");
		$engReg = new DB;
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
                if(isset($_POST['field'])){
		$dataArray = array( 
				'name' => $_POST['name'], 
				'company' => $_POST['company'], 
				'positions' => $_POST['positions'], 
                                'field' => $_POST['field'], 
				'phone' => $_POST['phone'], 
				'email' => $_POST['email'], 
				'submission_date' => date('Y-m-d H:i:s')
			);                    
                }
                else{
		$dataArray = array( 
				'name' => $_POST['name'], 
				'company' => $_POST['company'], 
				'positions' => $_POST['positions'], 
				'phone' => $_POST['phone'], 
				'email' => $_POST['email'], 
				'submission_date' => date('Y-m-d H:i:s')
			);
                }
		$engReg->insert("table_name",$dataArray);
                $_SESSION['authcodeDate'] = date("YmdHi");
                $_SESSION['authcodeUsed'] = $_POST['codeT'];

		if ($engReg->insert_id() != 0) 
		{

			$to = "jin@163.com";
                        if(isset($_POST['field'])){
                             $subject = "英方认证讲师报名"; 
                        }
                        else{
                           $subject = "英方认证工程师报名"; 
                        }
			$message = "
			<html>
			<head>
			<title>英方认证工程师报名</title>
			</head>
			<body>
			<p>报名详情:</p>
			<table>
			<tr>
			<td width=20%>姓名：</td>
			<td>".$_POST['name']."</td>
			</tr>
			<tr>
			<td>公司：</td>
			<td>".$_POST['company']."</td>
			</tr>
			<tr>
			<td>职位：</td>
			<td>".$_POST['positions']."</td>
			</tr>
			<tr>
			<td>手机：</td>
			<td>".$_POST['phone']."</td>
			</tr>
			<tr>
			<td>邮箱：</td>
			<td>".$_POST['email']."</td>
			</tr>";
                                
                        $message2 ="
			<tr>
                        <td>验证码：</td>
			<td>".$_POST['codeT']."</td>
			</tr>
			</table>
			</body>
			</html>
			";
                        if(isset($_POST['field'])){
                             $message3 ="<tr><td>擅长领域：</td><td>".$_POST['field']."</td></tr>";
                             $message = $message.$message3.$message2;
                        }
                        else{$message = $message.$message2;}
                        

			// 当发送 HTML 电子邮件时，请始终设置 content-type
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";

			// 更多报头
			$headers .= 'From: 英方官网用户<noreply@qq.com>' . "\r\n";



			mail($to,$subject,$message,$headers);
                        echo 1;
                }
                else{
//                链接数据库错误，发送失败
                  echo -2;
                }
        }

?>