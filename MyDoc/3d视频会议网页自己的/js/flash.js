(function () {
    window.onload = function () {
        var isIE = /*@cc_on!@*/0;      //是否IE浏览器
        if(isIE){
            try{
                var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            }
            catch(e){
                // alert('没有安装Flash，视频可能无法正常播放');
                $("div[name='video1']").html("<span style='color:red;'>没有安装Flash，视频无法正常播放</span>");
            }
        }
        else {
            try{
                var swf2 = navigator.plugins['Shockwave Flash'];
                if(swf2 == undefined){
                    // alert('没有安装Flash，视频可能无法正常播放');
                    $("div[name='video1']").html("<span style='color:red;'>没有安装Flash，视频无法正常播放</span>");
                }
            }
            catch(e){
                // alert('没有安装Flash，视频可能无法正常播放');
                $("div[name='video1']").html("<span style='color:red;'>没有安装Flash，视频无法正常播放</span>");
            }
        }
    };

})();