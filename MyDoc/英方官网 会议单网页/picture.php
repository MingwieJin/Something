<?php
// session有效
session_start();
// 声明一个sessoin
session_register("sessionCode");
header("Cache-Control: no-cache, must-revalidate");
// 声明图像大小
$img_height=70;
$img_width=25;
$authnum='';
// 验证码内容
$ychar="0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
$list=explode(",",$ychar);
for($i=0;$i<4;$i++){
    $randnum=rand(0,35);
    $authnum.=$list[$randnum];
}
// 将每次生成的验证码保存在session中
$_SESSION["sessionCode"] = $authnum;
// 生成一个基本大小图像
$aimg = imagecreate($img_height,$img_width);
// 图像填充颜色
imagecolorallocate($aimg, 255,255,255);
$black = imagecolorallocate($aimg, 0,0,0);
 
for ($i=1; $i<=100; $i++) {    imagestring($aimg,1,mt_rand(1,$img_height),mt_rand(1,$img_width),"@",imagecolorallocate($aimg,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255)));
}
 
//为了区别于背景，这里的颜色不超过200，上面的不小于200
for ($i=0;$i<strlen($authnum);$i++){
    imagestring($aimg, mt_rand(3,5),$i*$img_height/4+mt_rand(2,7),mt_rand(1,$img_width/2-2), $authnum[$i],imagecolorallocate($aimg,mt_rand(0,100),mt_rand(0,150),mt_rand(0,200)));
}
imagerectangle($aimg,0,0,$img_height-1,$img_width-1,$black);//画一个矩形
Header("Content-type: image/PNG");
ImagePNG($aimg);                    //生成png格式
ImageDestroy($aimg);
?>