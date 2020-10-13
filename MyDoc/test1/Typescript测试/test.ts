/****使用 reference 和 path 引入 jquery.d.ts 文件使用 jquery$就不会报错.**/
/// <reference path="plugin/jquery.d.ts" />
/***返回 void 值***/
function setTableRowHtml1():void{
var userName:string="";
$("tr").each(function(){
userName=$(this).find("td:eq(1)").html();
});
alert(userName);
}
/***返回 string 一个值***/
function setTableRowHtml2():string{
var userName:string="";
$("tr").each(function(){
	userName=$(this).find("td:eq(1)").html();
});
return userName;
}
//---jquery 执行.
$(function(){
//setTableRowHtml1();
var userName=setTableRowHtml2();
alert(userName);
});