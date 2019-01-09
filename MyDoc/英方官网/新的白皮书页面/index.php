<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
		<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>		
				<!--轮播用-->
		<link rel="stylesheet" href="css/owl.carousel.min.css">
	    <link rel="stylesheet" href="css/owl.theme.default.min.css">	
	    <script src="js/owl.carousel.js"></script>

		
<style>	
*{margin:0px; padding:0px; font-family:'微软雅黑'; }
body { margin:0px;padding:0px;}
.clear{clear:both}
/*banner*/
.paper_banner{
	width:100%;
}
.paper_banner img{
	width:100%;
	height: auto;
}
/*banner*/
/*推荐序*/
.paper_container{
	width:100%;
	background: #F4F7FE;
}
.paper_preface{
	width:100%;
	max-width:1052px;
	margin:auto;
	padding: 60px 0 48px 0;
}
.pre_title{
	font-size: 30px;
	color:#666;
	text-align: center;
}
.title_sub{
	height:2px;
	background: transparent;
	border-bottom: 4px solid #2dd1f4;
	width:64px;
	margin:10px auto 30px auto;
}
.pre_row{
	padding:0 11px;
}
.pre_row_inner{
	background: #fff;
	border-radius: 3px;	
	padding: 12px 20px 20px 20px ;
	moz-box-shadow:0px 0px 10px #c1c1c1; 
	-webkit-box-shadow:0px 0px 10px #c1c1c1; 
	box-shadow:0px 0px 10px #c1c1c1;
}
.pre_img{
	text-align: center;
	margin-bottom: 10px;
}
.pre_img_sub{
	font-size: 12px;
	color:#666;
	text-align: center;
	line-height: 20px;
	/*margin: 10px 0 0 0;*/
}
.pre_content_title{
	font-size: 16px;
	color:#333;
	text-align: center;
	margin: 20px auto;
}
.pre_content_word{
	font-size: 14px;
	color:#666;	
	line-height: 24px;
}
.pre_content_button{
	margin-top: 24px;
	text-align: center;
}
.pre_content_button a, .pre_content_button img{ display: block;}
.pre_content_button img{margin: auto;}
/*推荐序结束*/
/*推荐语*/
.paper_suggestion{
	width:100%;
	max-width:1304px;
	margin:auto;
	padding: 60px 0 48px 0;	
}
.slide-item{
	padding: 15px 15px;
}
.carousel_row{
	border-left:8px solid #2dd1f4;
	padding: 20px; 
	margin: 20px 0;
	background: #fff;
	moz-box-shadow:0px 0px 10px #c1c1c1; 
	-webkit-box-shadow:0px 0px 10px #c1c1c1; 
	box-shadow:0px 0px 10px #c1c1c1;
}
.sugg_content{
	font-size: 14px;
	color:#666;
	line-height: 24px;
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.sugg_sub_content{
	margin-top: 20px;
	text-align: right;
	font-size: 14px;
	color:#333;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.owl-controls{
	display: none;
}
.sugg_controller{
	text-align: center;
}
.owl-next1, .owl-prev1{
	display: inline-block;
	cursor: pointer;
	margin: 0px 30px 20px 30px;
}
.sugg_button img{
	display: block;
	margin: auto;
}
/*.carousel_outer{
	background-color: #425BB8;
	background-size:1052px 600px;
	background-position:center;
}*/
/*.carousel_outer{
	position:relative;
}
.sugg_container{
	position: absolute;
}
.bg_bule{
	width:80%;
	height:80%;
	background: #425BB8;
}*/
.sug_outer{
	background: url(img/blue.png) no-repeat center;
}
/*推荐语结束*/
/*内容简介开始*/
.paper_introduction{
	width:100%;
	max-width:984px;
	margin:auto;
	padding: 60px 0 48px 0;	
}
.btn-dropdown{
	font-size: 16px;
	color: #666;
	margin: 15px 0;
}
.btn-downcontent{
	font-size:14px;
	color:#666;
}
.btn-downcontent li{
	margin: 10px 0 10px 20px;
	list-style-type:none;
}
.btn-downcontent{
	margin: 20px auto;
}
.caret{
	margin-right: 5px;
	-webkit-transform: rotate(0deg);
	-ms-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	transform: rotate(0deg);	
	-webkit-transition: all 0.4s ease;
	-o-transition: all 0.4s ease;
	transition: all 0.4s ease;
}
.intro_container .collapsed .caret {
	-webkit-transform: rotate(-90deg);
	-ms-transform: rotate(-90deg);
	-o-transform: rotate(-90deg);
	transform: rotate(-90deg);
}
/*内容简介结束*/
/*底部弹窗banner*/
.bottom-banner{
	position:relative;
}
.bottom_content{
	position:absolute;
	width:600px;
	top:50%;
	left:50%;
	-webkit-transform:translate(-50%,-50%);
	transform: translate(-50%, -50%);
}
.bottom_bg{
	width:100%;
	height:auto;
}
.bottom_content img{
	display: block;
	margin:auto;
	cursor: pointer;
	margin-top: 20px;
}
.bottom_words{
	color:#fff;
	text-align: center;
	font-size: 40px;
	margin-top: 35px;
}


/*底部弹窗banner结束*/
/*弹窗*/
 select{
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: #F6F7FB url(img/list_icon.png) no-repeat scroll right center !important;
    text-indent: 5px; 
    color:#555;
 }
#hidebackground-paper { 
	position:absolute;left:0px;top:0px;
	background-color:#000;
	width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
	filter:alpha(opacity=60);  /*设置透明度为60%*/
	opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
	display:none; 
	/*display: block;*/
	height:1000px;
	
	z-Index:10011;
}
#hidebox-paper{ 
	position:fixed;
	width:450px;
	height:auto;
	top: 5%;
	left: 0px;
	right: 0px;
	margin-left: auto;
	margin-right: auto;
	background-color:#fff;
	display:none;
	/*display: block;*/
	cursor:pointer;
	z-Index:10012;
	text-align: center;
	border-radius:10px;
	border: 5px;
}
.paper-box-banner{
	width:100%;
}
.paper-box-banner img{
	width:100%;
	height:auto;
	border-top-left-radius: 5px;
	border-top-right-radius:5px;
}
#hidebox-paper  .sub-privacy-close {
	display: block;
	position:absolute;
	top:20px;
	right:20px;
	width:20px;
	height:20px;
	text-indent:-9999px;
	background: url(img/close1.png) no-repeat 0 0;
	background-size:100% 100%;
}
.paper-content{
	margin: 20px auto;
}
.input-form-row p, .input-form-row input, .input-form-row select{
    display:inline;
    font-size: 18px;
    color:#666;
}
.inputtype{
	border:1px solid #E0E0E0; 
	border-radius:3px; 
	margin:10px auto;
	padding-left: 10px;
	background:#F6F7FB;
	width:180px;
	height:30px;
	}
.error-input{
	border:1px solid red;
}
.error-input::-webkit-input-placeholder{ /*WebKit browsers*/
color: red;
}
.error-input::-moz-input-placeholder{ /*Mozilla Firefox*/
color: red;
}
.error-input::-ms-input-placeholder{ /*Internet Explorer*/ 
color: red;
}
.code-img{
    font-size: 14px;
    color:#666;	
}
#inputsubmit{
height:36px; 
width:150px; 
margin:10px auto; 
background:#3C54A6; 
color:#fff; 
font-size:18px; 
border: none;
border-radius:20px;
}
#captcha1_img{
	transform:scale(0.8);
}
/*弹窗结束*/

</style>		
</head>

<body>
<!--banner-->
<div class="paper_banner">
	<img src="img/banner.png"/>
</div>
<!--banner-->
<!--推荐序-->
<div class="paper_container">
	<div class="paper_preface">
		<div class="pre_title">推荐序</div>
		<div class="title_sub"></div>
		<div class="pre_row_container">
			<div class="pre_row col-md-4 col-sm-6">
				<div class="pre_row_inner">
					<div class="pre_img"><img src="img/re2.png"/></div>
					<div class="pre_img_sub">黄建华</div>
					<div class="pre_img_sub">华东理工大学计算机技术研究所信息安全研究室主任</div>
					<div class="pre_content_title">打造信息系统的“诺亚方舟”</div>
					<div class="pre_content_word">现代信息和网络技术的发展和普及对社会的产业结构、生产活动方式、管理决策等诸方面产生了深远的影响，云计算、大数据、区块链和人工智能等信息产业成为推动中国经济增长的强大引擎，“互联网 +”已成为创新驱动下的互联网发展新业态，推动经济形态不断地发生演变，从而带动社会经济实体的生命力，为改革、创新、发展提供广阔的网络平台。</div>
					<div class="pre_content_button"><a href="javascript:void(0);"><img src="img/button1.png"/></a></div>
				</div>
			</div>
			
						<div class="pre_row col-md-4 col-sm-6">
				<div class="pre_row_inner">
					<div class="pre_img"><img src="img/re1.png"/></div>
					<div class="pre_img_sub">胡军擎</div>
					<div class="pre_img_sub">上海英方软件股份有限公司 CEO</div>
					<div class="pre_content_title">让世界早有准备！</div>
					<div class="pre_content_word">当今世界，以互联网产业化、工业智能化和工业一体化为代表的第四次工业革命已经悄然到来。在这个进程中，全新的技术革命带来数据信息瞬息万变的交汇、管理和利用，并普惠社会的方方面面。<br>中国是这场技术革命的参与者和引领者之一，中国政府从“互联网 +”到“中国制造2025”，与时俱进地指明了未来发展的方向。</div>
					<div class="pre_content_button"><a href="javascript:void(0);"><img src="img/button1.png"/></a></div>
				</div>
			</div>
			
						<div class="pre_row col-md-4 col-sm-6">
				<div class="pre_row_inner">
					<div class="pre_img"><img src="img/re3.png"/></div>
					<div class="pre_img_sub">于天</div>
					<div class="pre_img_sub">国际灾难恢复协会中国分会总裁</div>
					<div class="pre_content_title">未雨绸缪，有备无患</div>
					<div class="pre_content_word">现代信息和网络技术的发展和普及对社会的产业结构、生产活动方式、管理决策等诸方面产生了深远的影响，云计算、大数据、区块链和人工智能等信息产业成为推动中国经济增长的强大引擎，“互联网 +”已成为创新驱动下的互联网发展新业态，推动经济形态不断地发生演变，从而带动社会经济实体的生命力，为改革、创新、发展提供广阔的网络平台。</div>
					<div class="pre_content_button"><a href="javascript:void(0);"><img src="img/button1.png"/></a></div>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</div>
<!--推荐序结束-->

<!--推荐语-->
<div class="sug_outer">
<div class="paper_suggestion">
	<div class="pre_title">推荐语</div>
	<div class="title_sub"></div>
	<div class="carousel_outer">
		<div class="sugg_container">
			<div class="owl-carousel" id="owl-carousel">
		            <div class="slide-item">
						<div class="carousel_row">
							<div class="sugg_content">这是我第三次收到英方所编著的灾备行业白皮书，也是第一次正式向大家推荐这本白皮书。与其说是白皮书，不如说这是一本灾备行业的解决方案指南，白皮书中关于灾备业务的设计、执行、演练等内容，不仅是对灾备行业，对其他的IT业务同样具有指导作用，此外，这本白皮书对已经制定了云端战略的企业以及像Oracle这样的云计算公司而言，也都是一本非常实用的书。</div>
							<div class="sugg_sub_content">——Oracle ISV&OEM事业部中国区总经理 李奔</div>
						</div>
						
						<div class="carousel_row">
							<div class="sugg_content">《2019中国灾备行业白皮书》是英方研究院编著的一本灾备行业基础性科普读物。全书分为灾备知识及技术概述、灾备行业合规性要求、灾备业务实施及服务质量评价、企业上云与云灾备、重点行业灾备建设特点及方案分析和灾备行业发展趋势六大部分。本白皮书从理论知识出发，结合具体典型案例，详细介绍了政府、企事业单位等行业信息化灾备面临的问题，并提出相应的解决方案及未来发展趋势，这样对知识的理解和实际应用有机结合为一体，能更好的帮助政府，企事业单位，个人了解灾备技术发展现状和相关应用。本白皮书也可以作为云灾备技术服务的建设方和服务方提供技术参考和理论支撑。</div>
							<div class="sugg_sub_content">——贵州大学副教授、公共大数据国家重点实验室办公室主任 陈玉玲</div>
						</div>
		            </div>
		            <div class="slide-item">
						<div class="carousel_row">
							<div class="sugg_content">2016年51CTO作为独家发布平台第一次参与了英方这本白皮书的发布，并见证了英方及整个灾备行业这些年的发展。英方本次白皮书的发布，通过详实的解决方案和项目案例，进一步展现了不同行业目前的发展和未来的趋势。无疑，这是一本技术性的白皮书，也是一份有洞察性的白皮书，是整个灾备行业发展的重要路标。</div>
							<div class="sugg_sub_content">——51CTO传媒总裁 熊平</div>
						</div>
						
						<div class="carousel_row">
							<div class="sugg_content">应英方之邀，为“2019年中国灾备行业白皮书”撰写一个推荐语。本着负责任的态度，仔细阅读了白皮书，其中，企业上云和行业解决方案带来了惊喜，也抓住了当今行业的热点和市场的核心。<br>毫无疑问，云计算的趋势不可阻挡，不论你是否喜欢和接受，云计算都是你必须要面对的问题。表面看来，企业上云，云化和灾备并不是一个维度的问题，二者之间的关系也不能够简化为云计算系统的灾备问题，更不能够简单理解为传统容灾保护技术的云化问题。<br>在云的环境中，数据保护，安全性、可靠性、稳定性的问题并没有随着云化而自然消失；在云环境中，仍然需要备份和容灾技术应用，其中，核心的还是数据的问题。而其中复制技术的应用是关键，这也是英方最擅长的技术。以这个技术作为保障，结合行业管理的需要和行业需求的特征，针对性行业解决方案真正做到了有的放矢，具有行业指导和借鉴的意义。<br>作为数十位专家心血的结晶，“2019年中国灾备行业白皮书”在专业性、知识性以及行业前瞻性方面具有代表性，也是行业用户、业内从业者不可或缺的有益的指南。更为难能可贵的是，灾备的问题已经不仅仅是备份、容灾的应用问题，实质也是数据的使用和管理问题，不管是数据备份、容灾到云，还是云计算应用的本地化保护问题，何尝不是混合云的应用和方法问题呢？至少是一个可以落地的开始。</div>
							<div class="sugg_sub_content">——存储在线（Dostor）总编宋家雨</div>
						</div>
		            </div>
		            <div class="slide-item">
						<div class="carousel_row">
							<div class="sugg_content">和英方是老朋友了，当得知由英方编写的《2019中国灾备技术白皮书》即将发布，所以送上真诚的祝福。满满97页的干货，对于做文字工作的我来说，完全可以体会这其中包含多少辛劳，编写者要熬过多少个漫漫长夜。这样一本饱含诚意，兼具专业与实用性的白皮书，一定可以让灾备行业的专业人士受益匪浅，同时也是想对灾备行业有全盘性了解的人的理想选择。<br>从2016开始，英方已经连续第三年编写中国灾备技术白皮书，不仅内容越来越充实，而且具有前瞻性，这得益于英方多年的技术积累和实践经验的总结。从最早推出云灾备概念和服务开始，英方的专注与创新总能带来惊喜。就在前不久，英方发布了数据统一管理平台（i2UP），进一步扩展了灾备的外延，明确了“灾备将成为重要的数据管理平台”这一趋势。这与数据驱动业务的大方向完全吻合。<br>在数字化、智能化大行其道的今天，安全、业务连续性比以往任何时候都更重要。未雨绸缪，让世界早有准备，这不仅是灾备存在和持续发展的重要意义，也是英方的价值所在。</div>
							<div class="sugg_sub_content">——《网络安全和信息化》杂志总编助理郭涛</div>
						</div>
						
						<div class="carousel_row">
							<div class="sugg_content">有幸拿到这份白皮书的抢鲜版，一口气读完108页的干货，这让我对灾备行业拥有了更全面的认知。<br>从基本概念到行业标准，再到技术流派、前瞻趋势，最可贵的是多个主流行业的灾备落地实践，涵盖了金融、政府、电信、医卫、教育、制造业……，这是一副灾备技术的全景图。<br>现阶段，灾备建设在整个IT建设中，往往变成“意识上重视、执行中忽视”的环节。IT事故虽是小概率事件，但一旦被“锅”砸中，就成为100%的灾难。随着IT技术成为企业生产力、数据成为企业核心资产，灾备的重要性会越来越凸显。<br>这个世界没有侥幸，我们能做的，就是“让世界早有准备”！</div>
							<div class="sugg_sub_content">——小黑羊</div>
						</div>
		            </div>
		            <div class="slide-item">
						<div class="carousel_row">
							<div class="sugg_content">处于客户时代下的数字商业需要可靠、可预测的技术基础架构，而Disaster Recovery不仅是实现这一目标的关键支柱，也日益成为企业架构数据管理的重要考量。包括云原生、机器学习、边缘计算、区块链等新兴科技的快速发展不仅推动着灾备市场的持续演进，而且为企业技术决策者和实践者带来了新的挑战。此份白皮书从不同视角探讨了中国灾备行业的发展趋势与行业实践，是普及灾备知识、推广灾备理念的有益探索。</div>
							<div class="sugg_sub_content">——Forrester 企业架构首席分析师 Charlie Dai</div>
						</div>
						
						<div class="carousel_row">
							<div class="sugg_content">9.11之后，云计算之前，灾备已成为企业IT的必修课。如果说9.11促使有足够实力的企业接受了两地三中心的理念，那么云计算基础设施普遍追求的局部三点或多点布局、全球范围分布，则让相当一部分用户误以为灾备不再是需要自己操心的事情。然而，从物理断网到人为失误，云计算提供商的故障时有发生。所以，无论是出于业务连续性还是合理利用资源的考虑，都促使企业采用多云及混合云的部署方案，并构建一套行之有效的灾备体系。《2019中国灾备行业白皮书》可谓生逢其时，希望它能帮助广大企业免受业务中断或数据丢失之苦。</div>
							<div class="sugg_sub_content">——企示录 张广彬</div>
						</div>
		            </div>	            
			</div>
		</div>	
		<div class="sugg_controller">
			<div class="owl-prev1"><img src="img/arrow-left.png"/></div>
			<div class="owl-next1"><img src="img/arrow-right.png"/></div>		
		</div>
		<div class="sugg_button"><img src="img/button2.png"/></div>
	</div>
</div>
</div>
<!--推荐语结束-->
<!--内容简介开始-->
<div class="paper_container">
	<div class="paper_introduction">
		<div class="pre_title">内容简介</div>
		<div class="title_sub"></div>
		<div class="intro_container">
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu1"><span class="caret"></span>第一章  灾备知识与技术概述</div>
				<div id="list-menu1" class="collapse btn-downcontent">
					<li>1.1灾备定义与演进</li>
					<li>1.2灾备的重要性</li>
					<li>1.3信息灾备发生方式</li>
					<li>1.4信息知识及技术</li>
					<li>1.5灾备的三个等级</li>
					<li>1.6灾备技术概述</li>
				</div>
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu2"><span class="caret"></span>第二章  灾备行业合规性要求</div>
				<div id="list-menu2" class="collapse btn-downcontent">
					<li>2.1灾备定义与演进</li>
				</div>
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu3"><span class="caret"></span>第三章  灾备业务实施及服务质量评价</div>
				<div id="list-menu3" class="collapse btn-downcontent">
					<li>3.1灾备定义与演进</li>
				</div>
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu4"><span class="caret"></span>第四章  企业上云与云灾备</div>
				<div id="list-menu4" class="collapse btn-downcontent">
					<li>4.1灾备定义与演进</li>
				</div>
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu5"><span class="caret"></span>第五章  重点行业灾备建设特点及方案分析</div>
				<div id="list-menu5" class="collapse btn-downcontent">
					<li>5.1灾备定义与演进</li>
				</div>
			<div class="btn-dropdown collapsed" data-toggle="collapse" data-target="#list-menu6"><span class="caret"></span>第六章  灾备行业发展趋势</div>
				<div id="list-menu6" class="collapse btn-downcontent">
					<li>6.1灾备定义与演进</li>
				</div>

		</div>
	</div>
</div>
<!--内容简介结束-->

<!--底部弹窗banner-->
<div class="bottom-banner">
	<img class="bottom_bg" src="img/free.png"/>
	<div class="bottom_content">
		<img onClick="showPaper();" src="img/free_button.png"/>
		<div class="bottom_words">2019中国灾备行业白皮书</div>
	</div>
</div>
<!--底部弹窗banner结束-->
<!--弹窗部分-->
<div id="hidebackground-paper"></div>
<div id="hidebox-paper">
	<div class="paper-box-banner"><img src="img/paper_bk.png"/></div>
	
	<a href="javascript:void(0);" onClick="hidePaper();" class="sub-privacy-close"></a>
	
    <div class="paper-content">
        <form method="post" action="response.php" name="form" id="paper-form" onsubmit = "return checkPar();" target="iframe_display">
            <div class="input-form-row"><p>姓&nbsp;&nbsp;&nbsp;名：<span style="color:red;">*</span></p>
                <input type="text" id="u_name" name="u_name" class="inputtype" datatype="*" nullmsg="请填写您的姓名">
            </div>
            <div class="input-form-row"><p>公&nbsp;&nbsp;&nbsp;司：<span style="color:red;">*</span></p>
                <input type="text" id="u_company" name="u_company" class="inputtype" datatype="*" nullmsg="请填写您的公司名称">
            </div>
            <div class="input-form-row"><p>职&nbsp;&nbsp;&nbsp;位：<span style="color:red;">*</span></p>
                <input type="text" id="u_post" name="u_post" class="inputtype" datatype="*" nullmsg="请填写您的职位">
            </div>
            <div class="input-form-row"><p>电&nbsp;&nbsp;&nbsp;话：<span style="color:red;">*</span></p>
                <input type="tel" id="u_tel" name="u_tel" class="inputtype" datatype="m" nullmsg="请填写您的手机号码" errormsg="您填写的手机号码格式不正确！">
            </div>
            <div class="input-form-row"><p>邮&nbsp;&nbsp;&nbsp;箱：<span style="color:red;">*</span></p>
                <input type="email" id="u_email" name="u_email" class="inputtype" datatype="e" nullmsg="请填写您的电子邮箱" errormsg="您填写的邮箱格式不正确！">
            </div>
            <div class="input-form-row"><p class="input-form-selw">用&nbsp;&nbsp;&nbsp;途：<span style="color:red;">*</span></p>
                <select class="inputtype"  name="u_target">
                       <option value="学习了解">学习了解</option>
                       <option value="有合作意向">有合作意向</option>
                </select>
            </div>
            <div class="input-form-row"><p class="input-form-code">验证码：<span style="color:red;">*</span></p>
                <input type="text" id="codeT" name="codeT" class="inputtype" datatype="*" nullmsg="验证码不能为空">
            </div>
            <div class="code-img">
	            <p>验证码: <img id="captcha1_img" border='1' src='./captcha.php?r=echo rand(); ?>' style="width:150px; height:50px" />
	   				<a id="changecode" href="javascript:void(0);" onclick="document.getElementById('captcha1_img').src='./captcha.php?r='+Math.random()">换一个?</a>
	             </p>
             </div>
<!--            <p>请输入验证码:<input id="codeT" type="text" name='codeS' value=''/></p>-->
            <input type="submit" name="submit" id="inputsubmit" value="提交" >
        </form>
    </div>	
    
</div>
<iframe id="iframe_display" name="iframe_display" style="display: none;"></iframe>  	
<!--弹窗部分结束-->
		
		
<script>
$(function(){
    var owl = $('#owl-carousel');
        owl.owlCarousel({
        items: 3,
        loop: true,
//      margin: 10,
        nav: true,
        autoplay: true,
        mouseDrag:true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed:1000,
	    responsive: {
	        0: {
	            items: 1,
	           },
	        700: {
	            items: 1,
	            },
	       1000: {
	            items: 3,
	            },
	       1200: {
	            items: 3,
	        }
	    }
		});			
		$('.owl-next1').on('click', function() {
	            owl.trigger('next.owl');
		});
		$('.owl-prev1').on('click', function() {
	            owl.trigger('prev.owl');
		})
}); 
	
//弹窗用
function showPaper()  //显示隐藏层和弹出层
{
	var hidebg=document.getElementById("hidebackground-paper");
	hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
	hidebg.style.display="block";  //显示隐藏层
   	document.getElementById("hidebox-paper").style.display="block";  //显示弹出层
}
function hidePaper()  //去除隐藏层和弹出层
{
   document.getElementById("hidebackground-paper").style.display="none";
   document.getElementById("hidebox-paper").style.display="none";
}

 function checkPar(){
// 	var flag = false; 
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	var name = $("#u_name").val();
	var company = $("#u_company").val();
	var positions = $("#u_post").val();
	var phone = $("#u_tel").val();
	var email = $("#u_email").val();
    var codeT = $("#codeT").val();
		if (name == ""){
			$("#u_name").addClass("error-input");
			$("#u_name").attr('placeholder','请输入姓名')
			return false;
		}
		else if (company == ""){
			$("#u_company").addClass("error-input");
			$("#u_company").attr('placeholder','请输入公司')
			return false;
		}
		else if (positions == ""){
			$("#u_post").addClass("error-input");
			$("#u_post").attr('placeholder','请输入职位')
			return false;
		}
		else if (phone == ""){
			$("#u_tel").addClass("error-input");
			$("#u_tel").attr('placeholder','请输入电话')
			return false;
		}
		else if(!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(phone))){ 
			$("#u_tel").addClass("error-input");
			$("#u_tel").val("");
			$("#u_tel").attr('placeholder','电话格式不对')
			return false;
		}
		else if (email == ""){
			$("#u_email").addClass("error-input");
			$("#u_email").attr('placeholder','请输入邮箱')
			return false;
		}
        else if(!reg.test(email)){
			$("#u_email").addClass("error-input");
			$("#u_email").val("");
			$("#u_email").attr('placeholder','邮箱格式不对')
            return false;
    	}
        else if (codeT == ""){
			$("#codeT").addClass("error-input");
			$("#codeT").attr('placeholder','请输入验证码')
			return false;
		}
		else{
//			$.ajax( {    
//		    url:"beforeRe.php",// 跳转到 action    
//		    data:{   
//		    		codeT: $("#codeT").val()
//		    },
//		      type:"POST",     
//		    	cache:false, 
//              async:false,  // 设置同步方式   
//		    dataType:'text',    
//		    success:function(data) {  
//		    	if(data=="1"){
//				$("#changecode").click();
//                	flag = true;
//                	return flag;
//		    	}
//				else{
//					$("#codeT").addClass("error-input");
//					$("#codeT").val("");
//					$("#codeT").attr('placeholder','输入验证码错误')
//					$("#changecode").click();
//
//				}
//		     },    
//		     error : function(XMLHttpRequest, textStatus, errorThrown) {
//                  alert("网络连接错误")
//                  return flag;
// 			} 
//			});
			return true;
	}

}
 
 $('#iframe_display').load(function(){
    var text=$(this).contents().find("body").text();
       // 根据后台返回值处理结果
//  var j=$.parseJSON(text);
    if(text == 1) {
        alert('提交成功');
        $("#changecode").click();
        window.location.href="http://www.info2soft.com/pdf/web/viewer.php";
//      location.href='BookResourceList.jsp'
    } 
    else if (text == -1){
        alert('提交过于频繁');
        $("#changecode").click();
    }
	else if (text == -3){
        alert('验证码错误');
        $("#changecode").click();
    }
	else if(text == -2){
		 alert('无法连接数据库，发送邮件失败');
	}
});
</script>

</body>
</html>
