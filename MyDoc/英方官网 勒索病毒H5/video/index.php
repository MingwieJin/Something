<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>information2 software</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Styles -->
        <link rel="stylesheet" href="./plyr.css">
        <link rel="stylesheet" href="./video.css">

    </head>
    <body>

		<section>
			<video class="js-player" controls >
				<!-- Video files -->
				<source src="cdpvswannacry.mp4" type="video/mp4">
				<!--<source src="http://oss.info2soft.com/video/info2soft.mp4" type="video/mp4">-->
				<!-- <source src="http://7u2jcs.com1.z0.glb.clouddn.com/info2soft.mp4" type="video/mp4">
				<source src="http://www.info2soft.com/wp-content/uploads/video/info2soft_.mp4" type="video/mp4">
				<source src="http://oss.info2soft.com/video/info2soft.mp4" type="video/mp4">
				<source src="http://oss.info2soft.com/video/info2soft_hd.mp4" type="video/mp4">
				<source src="http://assets.info2soft.com/wp-content/uploads/video/info2soft_.mp4" type="video/mp4"> -->
				
				<!-- Fallback for browsers that don't support the <video> element -->
				<a href="http://www.info2soft.com" download>refresh</a>
			</video>

		</section>

        <!-- Plyr core script -->
        <script src="./plyr.js"></script>
		<script>
		var options = {'autoplay':true};
		plyr.setup('.js-player', options);
		function reSizeParentIframe() {
			var realHeight = 0;
			if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Mozilla") > 0 || navigator.userAgent.indexOf("Safari") > 0 || navigator.userAgent.indexOf("Chrome") > 0) { // Mozilla, Safari,Chrome, ...  
				// realHeight = window.document.documentElement.offsetHeight; 
				realHeight = window.document.body.clientHeight; 
			} else if (navigator.userAgent.indexOf("MSIE") > 0) { // IE  
				var bodyScrollHeight = window.document.body.scrollHeight + 21; //取得body的scrollHeight  
				var elementScrollHeight = window.document.documentElement.scrollHeight + 1; //取得documentElement的scrollHeight  
				realHeight = Math.max(bodyScrollHeight, elementScrollHeight); //取当中比较大的一个  
			} else {//其他浏览器  
				realHeight = window.document.body.scrollHeight + window.document.body.clientHeight + 1;
			}
			if (realHeight < 180) {
				realHeight = 180;
			}
			parent.document.getElementById('video_box').style.height = realHeight+"px";
		}
		window.onload=function(){
			reSizeParentIframe();
		};
		window.onresize = function(){
			reSizeParentIframe();
		};
		</script>
		
        <!-- Rangetouch to fix <input type="range"> on touch devices (see https://rangetouch.com) -->
        <script src="./rangetouch.js" async></script>

    </body>
</html>
