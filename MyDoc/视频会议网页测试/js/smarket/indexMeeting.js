/**
 * Created by xuyanru on 2016/4/6.
 */
window.voteRecode = {
    //问卷记录
    recode:function(){
        return $.cookie("voteRecode");
    },
    //存在记录
    recodeExist :function(qid){
        if(!this.recode()){
            $.cookie("voteRecode",[],{ expires: 7, path: '/' });
            return false;
        }
        var voteRecodeArray = this.recode();
        for(var i in voteRecodeArray){
            if(voteRecodeArray[i].qid == qid){
                return true;
            }
        }
        return false;
    },
    //是否提交过
    isSubmitted:function(qid){
        var voteRecodeArray = this.recode();
        for(var i in voteRecodeArray){
            if(voteRecodeArray[i].qid == qid && voteRecodeArray[i].submitted){
                return true;
            }
        }
        return false;
    },
    //存储提交记录
    saveRecode:function(qid,submitted){
        var voteRecodeArray = this.recode();
        if(!this.recodeExist(qid)) {
            voteRecodeArray.push({
                qid: qid,
                submitted: submitted
            });
        }
        else{
            var voteRecodeArray = this.recode();
            for(var i in voteRecodeArray){
                if(voteRecodeArray[i].qid == qid){
                    voteRecodeArray[i].submitted = submitted;
                }
            }
        }
        $.cookie("voteRecode",voteRecodeArray,{ expires: 7, path: '/' });
    }
};
/*可拖拽div*/
function move(element, event) {
    var x = parseInt(element.style.left);
    var y = parseInt(element.style.top);

    var deltaX = event.clientX - x;
    var deltaY = event.clientY - y;
    //添加临时事件
    if (document.addEventListener) {//2级DOM
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) {//IE5+
        document.attachEvent("onmousemove", moveHandler);
        document.attachEvent("onmouseup", upHandler);
    } else {//IE4
        var oldonmousemove = document.onmousemove;
        var oldonmouseup = document.onmouseup;
        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }
    //我们处理该事件,不让其他元素见到它
    if (event.preventDefault) {//2级DOM
        event.preventDefault();
    } else {//IE
        event.returnValue = false;
    }

    //鼠标移动事件
    function moveHandler(e) {
        if (!e) {//IE
            e = window.event;
        }

        element.style.left = (e.clientX - deltaX) + "px";
        element.style.top = (e.clientY - deltaY) + "px";
        if (e.stopPropagation) {//2级DOM
            e.stopPropagation();
        } else {//IE
            e.cancelBubble = true;
        }
    }
    //鼠标按键弹起
    function upHandler(e) {
        if (!e) {
            e = window.event;
        }
        if (document.removeEventListener) {//2级DOM
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent) {//IE5+
            document.detachEvent("onmouseup", upHandler);
            document.detachEvent("onmousemove", moveHandler);
        } else {//IE4
            document.onmouseup = oldonmouseup;
            document.onmousemove = oldonmousemove;
        }
        if (e.stopPropagation) {//2级DOM
            e.stopPropagation();
        } else {//IE
            e.cancelBubble = true;
        }
    }
}
$(document).on("click", "#btnLuckerClose", function () {
    $("#divVMLuckerList").hide();
});
$(document).on("click", "#showLuckyDrawRoster", function () {
    //$("#divVMLuckerList").show();
    meetingSetting.onLuckyDrawList({time:1});
});
function getNewAnswerOfMe() {
    var $newAnswerTips = $("div#tab-2 p");
    $newAnswerTips.addClass("message-prompt");
    $newAnswerTips.click(function(){
        $(this).removeClass("message-prompt");
    });
}
/*滚动条JS样式开始*/
//$('#tab-a11').niceScroll({
//    cursoropacitymin:0,
//    horizrailenabled:false,
//    cursorcolor:"#dedede",
//    cursorborder:"none",
//    cursorwidth:3
//});
//$('#winning-prize-list').niceScroll({
//    touchbehavior:true,
//    cursoropacitymin:0,
//    horizrailenabled:false,
//    cursorcolor:"#45a6ff",
//    cursorborder:"none",
//    cursorwidth:3
//});

//视频切换功能
var width;
var height;
var left;
var doctop;
var flagfull = false;
//用户列表
var sino_doc = $("[data-component='doc']");
//PPT
var sino_video = $("[data-component='video']");
function PPTScreen(num) {
    if (num == 1) {
        //隐藏具体层
        $("[data-part='screen']").removeClass();
        $("[data-part='bombox']").removeClass("bombox");
        //弹出框
        $("[data-part='bombox']").css("position", "");
        $("body").eq(0).css("overflow", "hidden");
        width = sino_doc.css("width");
        height = sino_doc.css("height");
        left = sino_doc.css("left");
        doctop = sino_doc.css("top");
        sino_doc.css({
            "position": 'fixed',
            "width": $(window).width(),
            "height": $(window).height(),
            "left": 0,
            "top": 0,
            "z-index": 9998
        });
        $("#MinPPT").removeClass();
        $("#MinPPT").addClass("fullscreen-show");
        flagfull = true;
    } else {
        //显示层
        $("[data-part='bombox']").addClass("bombox");
        //系统 中奖
        $.each($("[data-part='screen']"), function (i) {
            $(this).addClass($(this).attr("id"));
        });
        $("body").eq(0).css("overflow", "");
        sino_doc.css("position", "absolute");
        sino_doc.css("z-index", "0");
        sino_doc.css({
            'top': doctop,
            'left': left,
            'width': width,
            'height': height
        });
        $("#MinPPT").removeClass();
        $("#MinPPT").addClass("fullscreen-hidden");
        flagfull = false;
    }
}
function VideoScreen(num) {
    if (num == 1) {
        //隐藏具体层
        $("[data-part='screen']").removeClass();
        $("[data-part='bombox']").removeClass("bombox");
        //if ($("#stripBox").css("display") == "block") {
        //    showStripBox = true;
        //    $("#stripBox").hide();
        //}
        //弹出框
        $("[data-part='bombox']").css("position", "");
        $("body").eq(0).css("overflow", "hidden");
        width = sino_video.css("width");
        height = sino_video.css("height");
        left = sino_video.css("left");
        doctop = sino_video.css("top");
        sino_video.css({
            "position": 'fixed',
            "width": $(window).width(),
            "height": $(window).height(),
            "left": 0,
            "top": 0,
            "z-index": 9998
        });
        $("#MinVideo").removeClass();
        $("#MinVideo").addClass("fullscreen-show");
        flagfull = true;
    } else {
        //显示层
        $("[data-part='bombox']").addClass("bombox");
        //系统 中奖
        $.each($("[data-part='screen']"), function (i) {
            $(this).addClass($(this).attr("id"));
        });
        //if (showStripBox)
        //    $("#stripBox").show();
        $("body").eq(0).css("overflow", "");
        sino_video.css("position", "absolute");
        sino_video.css("z-index", "0");
        sino_video.css({
            'top': doctop,
            'left': left,
            'width': width,
            'height': height
        });
        $("#MinVideo").removeClass();
        $("#MinVideo").addClass("fullscreen-hidden");
        flagfull = false;
    }
}

//切换窗口
var flag = false;
//true:PPT小的，VIDEO是大的，反之
window.changeWindows = function() {
    if (flag) {
        sino_video.animate({
            right: "0px",
            width: "752px",
            height: "423px"
        }, 500, function () {
        });
        sino_doc.animate({
            right: "0px",
            width: "416px",
            height: "234px"
        }, 500, function () {
        });
        flag = false;
    } else {
        sino_video.animate({
            right: "-438px",
            width: "416px",
            height: "234px"
        }, 500, function () {
        });
        sino_doc.animate({
            right: "438px",
            width: "752px",
            height: "423px"
        }, 500, function () {
        });
        flag = true;
    }
}
/**
 * Created by Administrator on 2015/8/4.
 */
$(function(){
    $('.content').mCustomScrollbar();
    // meetingSocket.init(); //由demandinit_controller.js 控制
    //通过“回车”提交信息
    $("#sendQuestion").click(function () {
        meetingSocket.submitMsg();
    });
    $("#askContent").keypress(function(event){
        if (event.which == 13) {
            if(typeof $("#askContent").attr("disabled") == "undefined") {//未禁言
                $("#sendQuestion").click();
            }
            event.preventDefault();
        }
    });
    $("span.online-pro").click(function(){
        $("#divUserList").show();
    });
    $("a#closeUserList").click(function(){
        $("#divUserList").hide();
    });
    var point = $("#userNumber").offset();
    $(".pop-radio-close").click(function(){
        $(".pop-radio-bg").css("display","none");
    });
    window.getPlayheadTime = function(){//获取播放时长
        channel.send("playheadTime", {});
    };
    window.videoPlay = function(){//视频播放
        channel.send("play", {});
    };
    window.videoPause = function(){//视频暂停
        channel.send("pause", {});
    };
    /*选项卡开始*/
    $('p.tab-nav:visible').each(function(i){
        $(this).click(function(){
            $('p.tab-nav').removeClass("active");
            $('p.tab-nav').eq(i).addClass("active");
            $('div.m-tab div.tab-b').hide();
            $('div.m-tab div.tab-b').eq(i).show();
        });
    });
    $('#resourceShow').click(function(){
        resDownloadFileVM.visible(true);
    });
    //主屏切换按钮
    $('.icon-switch').click(function(){
        var className = $('[data-component="doc"]').attr('class');
        $('[data-component="doc"]').attr('class', $('[data-component="video"]').attr('class'));
        $('[data-component="video"]').attr('class', className);
    });
});

var screenW = screen.width;
var screenH = screen.height;
//全部问答
$("#btnQuestions").click(function () {
    var $divQuestions = $("#divQuestions");
    meetingSocket.allQaList();
    var ht = parseInt($divQuestions.css("height")) / 1.5;
    var marTop = getScrollTop() - ht;
    var marLeft = parseInt($divQuestions.css("width")) / 2;
    $divQuestions.css({
        "display": "block",
        "position": "absolute",
        "top": screenH / 2 + "px",
        "left": screenW / 2 + "px",
        "margin": marTop + "px 0 0 -" + marLeft + "px"
    });
    document.getElementById('ulAllQA').scrollTop = document.getElementById('ulAllQA').scrollHeight;
    meetingSocket.submitUserLogs('allQA', { desc: "查看在线全部问答" });
});

//中奖用户列表
$("#btnLuckerList").click(function(){
    var $divLuckerList = $("#divLuckerList");
    $divLuckerList.show();
    var ht = parseInt($divLuckerList.css("height")) / 1.5;
    var marTop = getScrollTop() - ht;
    var marLeft = parseInt($divLuckerList.css("width")) / 2;
    $divLuckerList.css({
        "display": "block",
        "position": "absolute",
        "top": screenH / 2 + "px",
        "left": screenW / 2 + "px",
        "margin": marTop + "px 0 0 -" + marLeft + "px"
    });
});

function InitVideoAndPPT(obj)
{
    var uid = 0;
    var userName = "";
    if(obj) {
        uid = obj.userid + 1000000000;
        userName = obj.username;
    }
    else{
        uid = parseInt(new Date().getTime().toString().substr(5)) + 1000000000;
        userName = uid;
    }
    var _bar=true;
    if(!$.cookie('videoFocus' + window.instanceId)){
        $.cookie('videoFocus' + window.instanceId,'');
    }
    meetingSetting.videoSetFocus(videoIndex);
    var video = "<gs:video-vod site=\"i.sinobasedm.com\" ownerid=\"" + window.videoList[window.videoIndex] + "\" uid=\"" + uid + "\" uname=\"" + userName + "\" authcode=\"\" group=\"sinobase\"  completed=\"LiveDuration\"  bar=\"true\" py=\"1\" />";
    try {
        if (_bar != undefined && !_bar) {
            var video = "<gs:video-vod site=\"i.sinobasedm.com\" ownerid=\"" + window.videoList[window.videoIndex] + "\" uid=\"" + uid + "\" uname=\"" + userName + "\" authcode=\"\" group=\"sinobase\" bar=\"false\"/>";
        }
    } catch (ex) {
    }
    var doc = "<gs:doc site=\"i.sinobasedm.com\" ownerid=\"" + window.videoList[window.videoIndex] + "\" group=\"sinobase\" fullscreen=\"true\"/>";
    $("[data-component='video']").html(video);
    $("[data-component='doc']").html(doc);
    setTimeout(function(){
        $.getScript('../js/gssdk.js',function(){

            channel = GS.createChannel("sinobase");
            channel.bind("onPlay", function (event) {
                ////console.log('onPlay');
                if(!pauseFlag && !seekFlag) {//刚开始播放时
                    var playheadTime = $.cookie('playheadTime' + window.instanceId);
                    if (playheadTime) {
                        if(playheadTime['videoId'] == window.videoFocus) {
                            channel.send("seek", {
                                'timestamp': playheadTime['time']
                            });
                        }else{
                            $.cookie('playheadTime' + window.instanceId,null,{path:'/'});
                        }
                    }else if(window.trailFlag) {
                        meetingSetting.trailerOver('您的试看时间已经结束，请登录！', window.trailerTime * 1000);
                    }
                }
                else {
                    setTimeout(function () {//因为在onPlay后马上获取playheadTime，只能获得跳转之前的播放进度，所以延迟500毫秒或更多
                        window.getPlayheadTime();
                    }, 500);
                }
            });
            channel.bind("onPause", function (event) {
                ////console.log('onPause');
                pauseFlag = true;
                window.clearInterval(window.timelineInterval);//停止时间轴
            });
            channel.bind("onSeekCompleted", function (event) {
                ////console.log('onSeekCompleted');
                seekFlag = true;
                window.clearInterval(window.timelineInterval);//停止时间轴
                //if (event.data.timestamp) {
                //    timelineRagenBegin = new Date((new Date()).getTime() - parseInt(event.data.timestamp));
                //}
            });
            channel.bind("onPlayheadTime", function (event) {
                ////console.log('onPlayheadTime');
                var playheadTime = parseInt(event.data['playheadTime']);
                $.cookie('playheadTime'+ window.instanceId ,{
                    videoId:window.videoFocus,
                    time:playheadTime
                },{path:'/'});//记录播放到的时间
                if(seekFlag || pauseFlag) {//如果是在跳转或停止进行中
                    timelineRagenBegin = new Date((new Date()).getTime() - playheadTime);
                    seekFlag = false;
                    pauseFlag = false;
                    if(window.trailFlag){
                        if(playheadTime > window.trailerTime * 1000){
                            meetingSetting.trailerOver('您的试看时间已经结束，请登录！',3000);
                        }
                        else{
                            meetingSetting.trailerOver('您的试看时间已经结束，请登录！',window.trailerTime * 1000 - playheadTime);
                        }
                    }
                }
                if(window.timelineInterval) {//时间轴循环重新开始
                    clearInterval(window.timelineInterval);
                }
                window.timelineInterval = window.setInterval(TimeLinePoll, 1000);
            });
            channel.bind("onStop", function (event) {
                var videoListElmt = $('.swiper-slide').children('div');
                var lastIndex = videoListElmt.length - 1;
                if(window.videoIndex != lastIndex) {
                    $(videoListElmt[window.videoIndex + 1]).click();
                }
                var timeVar = {
                    content: 'timelineend',
                    time: (parseInt(timelineRagenBegin.getTime() / 1000))
                };
                TimeLineAdapter(timeVar);
            });
            channel.bind("onChapter", function (event) {
                if(event && event.data) {
                    meetingSetting.chapterAddList(event.data.list);
                }
            });
        });
    },1000)
}

//-----------投票----------------------------//
//投票
function setVoteBox() {
    var $divVote = $("#divVote");
    var ht = parseInt($divVote.css("height")) / 1.5;
    var marTop = getScrollTop() - ht;
    var marLeft = parseInt($divVote.css("width")) / 2;
    $divVote.css({
        "position": "absolute",
        "top": screenH / 2 + "px",
        "left": screenW / 2 + "px",
        "margin": marTop + "px 0 0 -" + marLeft + "px"
    });
    $(".voteQuestion .votebutton").remove();
    $(".voteQuestion").append("<li class='votebutton' style='text-align:center;padding-top:10px;'><button style='margin:2px;' onclick='submitVoteInfo()'>提交</button></li>");
    if (voteVM.Votes()[0].skip == "false" || voteVM.Votes()[0].skip)//如果问卷禁止跳过
    {
        $divVote.find("a:eq(0)").hide();
    }
    else {
        $divVote.find("a:eq(0)").show();
    }
    $divVote.show();
}
function closeVote()
{
    $("#divVote").hide();
}
function submitVoteInfo() {
    var isNull = false;
    var voteData = voteVM.Votes()[0];
    for (var i = 0, max = voteData.questions.length; i < max; i++) {
        if (isNull)
            break;
        switch (voteData.questions[i].type) {
            case "multi": case "single":
            for (var j = 0, max2 = voteData.questions[i].items.length; j < max2; j++) {
                if (voteData.questions[i].items[j].selected == "true" || voteData.questions[i].items[j].selected) {
                    break;
                }
                if ((j + 1) == voteData.questions[i].items.length && (voteData.questions[i].items[j].selected == "false" || voteData.questions[i].items[j].selected==false)) {
                    isNull = true;
                }
            }
            break;
            case "text":
                if ($.trim(voteData.questions[i].text).length <= 0 && $.trim(voteData.questions[i].text).length <= 0) {
                    isNull = true;
                }
                break;
        }
    }
    if (isNull) {
        alert("请您完全填写所有问题。");
        return;
    }
    $("#divVote").hide();
    alert("非常感谢您对本次投票的积极参与！");
    meetingSocket.submitVote(voteData);
}

//毫秒数转时间格式（HH：mm）
function switchQAShortTime(time) {
    /*var d = new Date(time);
     //22:49
     return  ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);*/
    if (typeof(time) == "string") {
        return time;
    }
    var d = new Date(parseInt(time/1000) * 1000);
    var h = "";
    var m = "";
    if(d.getHours()+1<10){
        h = ("0" + d.getHours()).slice(-2);
    }else{
        h =  (d.getHours()+"").slice(-2);
    }
    if(d.getMinutes()<10){
        m = ("0" + d.getMinutes()).slice(-2);
    }else{
        m =  (d.getMinutes()+"").slice(-2);
    }
    return  h + ":" + m;

}
//----------------------------------------------------//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝会议时间轴＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
var timelineRangeIndex;
var timelineRagenBegin;
var timelineDurations;
var timelinePosition;
var timelineDifference;
var timelinePointWidth;
var timelineLoaded = false;
var timelineLastStamp;
var timelineInitWidth = 0;

var $timeline;
var $timelineBar;
var $timelinePoints;

//var timelineInterval;
var seekFlag = false;   //视频跳转
var pauseFlag = false;  //视频暂停
var timelineTimeout;
var timePointShowIndex = 0;
//加载
function TimeLineLoad() {
    try {
        timelineLoaded = true;
        //timelineDifference = 0;
        timelineRangeIndex = -1;
        timelineRagenBegin = new Date();
        timelineDurations = [];
        timelinePosition = [];
        timelinePointWidth = 18;
        timelineLastStamp = 0;
        $timeline = $('#TimeLine');
        if($timeline.is(':hidden')){
            return;
        }
        $timelineBar = $timeline.find('.bar');
        $timelinePoints = $timeline.find('.point');
        timelineInitWidth = $timeline.width();
        $timelinePopClose = $timelinePoints.find('.meeting-theme a.pop-close');
        if ($timeline.length == 0) {
            Console("TimeLine初始化失败，没有找到TimeLine");
            return;
        } else {
            //默认走动的时间轴
            TimeLineCalculate();
        }

        if ($timelinePoints.length < 1) {
            Console("TimeLine初始化失败，没有找到一个以上的Point");
        }
        if ($timelineBar.length == 0) {
            Console("TimeLine初始化失败，没有找到bar");
        } else {
            //默认走动的时间轴
            TimeLineCalculate();
            window.timelineInterval = window.setInterval(TimeLinePoll, 1000);

            //初始化Point的位置
            $timeline.show();
            $timelinePoints.each(function (i, item) {
                //$(item).hide();
                if(i != 0 && i < $timelinePoints.length - 1) {
                    $(item).css('left', ((timelinePosition[i] - timelinePointWidth / 2) / timelineInitWidth * 100 + '%'));
                    //$(item).css('left', ((timelinePosition[i] - timelinePointWidth / 2) + 'px'));
                }
                $(item).children("div.subject-now").hide();
            });
            $timelinePopClose.click(function(){
                $(this).closest('div.subject-now').hide();
            });
            $("div.point span").hover(function(){
                if($(this).hasClass("green-round")) {
                    $(this).next("div.subject-now").show();
                    timePointShowIndex = $(this).closest('div.point').index();
                    clearTimeout(timelineTimeout);
                }
            },function(){
                var _this = this;
                timelineTimeout = setTimeout(function(){
                    $(_this).next("div.subject-now").hide();
                },300);
            });
            $("div.subject-now").mouseenter(function(){
                var newIndex = $(this).closest('div.point').index();
                if(newIndex == timePointShowIndex){
                    timePointShowIndex = newIndex;
                    clearTimeout(timelineTimeout);
                }
            });
            $("div.subject-now").mouseleave(function(){
                var _this = this;
                timelineTimeout = setTimeout(function(){
                    $(_this).hide();
                },300);
            });
        }
    } catch (e) {
        Console('TimeLine 启动失败，原因为' + e.message);
    }
}

//计算时段
function TimeLineCalculate() {
    timelineDifference = 0;
    var totalDuration = 0;
    $timelinePoints.each(function (index, item) {
        if (index < $timelinePoints.length - 1) {
            var duration = Number($(item).attr('data-duration'));
            if (isNaN(duration))
                duration = 0;

            timelineDurations.push(duration);
            totalDuration = totalDuration + duration;
        }
    });
    var barBeging = Number($timeline.attr('data-barbeging'));
    var barEnd = Number($timeline.attr('data-barend'));
    timelinePointWidth = Number($timeline.attr('data-pointwidth'));
    if (isNaN(barBeging))
        barBeging = 0;
    if (isNaN(barEnd))
        barEnd = $timeline.width();
    if (isNaN(timelinePointWidth))
        timelinePointWidth = 0;

    var barLength = barEnd - barBeging - timelinePointWidth * (timelineDurations.length) / 2;
    timelinePosition.push(barBeging);
    for (var j = 0; j < timelineDurations.length - 1; j++) {
        var setpWidth = (barLength * timelineDurations[j]) / totalDuration;
        timelinePosition.push(timelinePosition[j] + setpWidth + timelinePointWidth / 2);
    }
    timelinePosition.push(barEnd);
}

//前进
function TimeLineMove(second) {
    if (second == undefined)
        second = 0;
    var rangeLength = timelinePosition[timelineRangeIndex] - timelinePosition[timelineRangeIndex - 1] - timelinePointWidth / 2;
    var currentLength = timelinePosition[timelineRangeIndex - 1] + timelinePointWidth / 2 + second * rangeLength / (timelineDurations[timelineRangeIndex - 1] * 60);

    if (currentLength >= timelinePosition[timelineRangeIndex]) {
        currentLength = timelinePosition[timelineRangeIndex];
    }

    $timelineBar.css('width', (currentLength / timelineInitWidth * 100).toString() + '%');
}

//轮询器
function TimeLinePoll() {
    if (timelineRangeIndex == -1 || timelineRangeIndex == 999) {
        return;
    }
    var referTimeRange = getTimeRange((new Date()).getTime() - timelineRagenBegin.getTime());//当前播放时间点所属范围
    if (timelineRangeIndex != referTimeRange) {
        var timeVar = {
            content: 'timeline' + referTimeRange,
            time: (parseInt(timelineRagenBegin.getTime() / 1000))
        };
        TimeLineAdapter(timeVar);
        timelineDifference = 0;
        for (var i = 0; i < referTimeRange-1; i++)
        {
            timelineDifference += timelineDurations[i] * 60000;
        }
    }
    var span = (new Date()).getTime() - timelineRagenBegin.getTime() - timelineDifference;
    var leaveSecond = Math.floor(span / (1000));
    if (leaveSecond >= 0) {
        TimeLineMove(leaveSecond);
    }
}

function getTimeRange(playTime)
{
    try {
        var referTime = 0;
        for (var i = 0, max = timelineDurations.length; i < max; i++) {
            referTime = referTime + (timelineDurations[i] * 60000);
            if (referTime > playTime)
                return ++i;
        }
    }
    catch (e)
    {
        ////console.log(e.toString());
    }
}

//开始
//function TimeLineStart(rangeIndex, time) {
function TimeLineStart(rangeIndex, time) {
    if ($timelineBar.length > 0) {
        if (rangeIndex == undefined)
            rangeIndex = 1;
        if (time != undefined) {
            this.timelineRagenBegin = new Date(time * 1000);
        } else {
            this.timelineRagenBegin = new Date();
        }
        this.timelineRangeIndex = rangeIndex;
        TimeLineMove();
        $timelinePoints.each(function (i) {
            if (i < rangeIndex) {
                $(this).children("span").removeClass("gray-round").addClass("green-round");
            } else{
                $(this).children("span").removeClass("green-round").addClass("gray-round");
            }
            if(i == (rangeIndex - 1)){
                var $thisPop = $(this).children("div.subject-now");
                $thisPop.show();
                meetingSetting.timeLinePop(rangeIndex - 1);
            }
            else{
                var $thatPop = $(this).children("div.subject-now");
                $thatPop.hide();
                //$(this).children("div").removeClass("subject-now").addClass("subject-history");
            }
        });
    }
    TimeLineCallBack(rangeIndex);
}

//初始化
function TimeLineInit() {
    if ($timelineBar.length > 0) {
        this.timelineRangeIndex = -1;
        $timelineBar.css('width', (timelinePosition[0] / timelineInitWidth * 100 + '%'));
        $timelinePoints.hide();
    }
    TimeLineCallBack(0);
}

//function TimeLineCallBack(intdex) {
function TimeLineCallBack() {
    try {
        TimeLineStart_CallBack(intdex);
    } catch (e) {

    }
}

//结束
function TimeLineEnd() {
    if ($timelineBar.length > 0) {
        this.timelineRangeIndex = 999;
        $timelineBar.css('width', (timelinePosition[timelinePosition.length - 1] / timelineInitWidth * 100 + '%'));
        $("div.point:last").children("span").removeClass("gray-round").addClass("green-round");
        var $thisPop = $("div.point:last").children("div.subject-now");
        $thisPop.show();
    }
    TimeLineCallBack(-1);
}

//接口命令适配器
function TimeLineAdapter(data) {
    try {
        if (data.content.toLowerCase() == "timelineinit") {
            TimeLineInit();
        } else if (data.content.toLowerCase() == "timelineend") {
            TimeLineEnd();
        } else {
            var nowIndex = parseInt(data.content.substring(8));
            TimeLineStart(nowIndex, data.time);
            //$("#agendaVM li").removeClass("tab-b-li");
            //$("#agendaVM li:eq(" + (nowIndex-1) + ")").addClass("tab-b-li");
            timelineLastStamp = data.time;
        }
    } catch (e) {
        Console('TimeLineAdapter,触发失败，原因为:' + e.message);
    }
}

function Console(message) {
    try {
        //console.log(message);
    } catch (e) {

    }
}
//判断是否被禁言
function setGag(isGag)
{
    if (typeof(isGag) != "undefined") {
        if(isGag==true || isGag=="true") {
            $("#sendQuestion").attr("disabled","disabled");
            $("#sendQuestion").css({"background-color":"#ddd"});
            alert("您已被管理员设置禁言！");
        } else if(isGag==false || isGag=="false")
        {
            $("#sendQuestion").removeAttr("disabled");
            $("#sendQuestion").css({"background-color":"#064cb0"});
        }
    }
}
//优选网络信息
function NetSettings(data) {
    var $ulAllNet = $("#ulAllNet");
    $ulAllNet.html("");
    for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].selected == "true") {
            $ulAllNet.append("<li><input type='radio' name='rad_netSetting' value='" + data.list[i].label + "' checked>" + data.list[i].label + "</li>");
        }
        else {
            $ulAllNet.append("<li><input type='radio' name='rad_netSetting' value='" + data.list[i].label + "'>" + data.list[i].label + "</li>");
        }
    }
    $ulAllNet.append("<li><button  id=\"btn_submitNetSettings\" style='height:25px;width:70px' onclick=\"submitSelectNetSetting()\">提交</button></li>");
    var $divNetSettings = $("#divNetSettings");
    var ht = parseInt($divNetSettings.css("height")) / 1.5;
    var marTop = getScrollTop() - ht;
    var marLeft = parseInt($divNetSettings.css("width")) / 2;
    $divNetSettings.css({
        "display": "block",
        "position": "absolute",
        "top": screenH / 2 + "px",
        "left": screenW / 2 + "px",
        "margin": marTop + "px 0 0 -" + marLeft + "px"
    });
    document.getElementById('ulAllNet').scrollTop = document.getElementById('ulAllNet').scrollHeight;
}
function submitSelectNetSetting() {
    var val = $("input[name='rad_netSetting']:checked").val();
    $("#divNetSettings").hide();
    meetingSocket.submitUserLogs('selectNetSetting', { desc: "用户优选网络："+val });
    submitNetChoice(val);
}
$("#changeWindows").click(function () {
    meetingSocket.submitUserLogs('changeWindows', { desc: "用户切换窗口" });
    changeWindows();
});
function receiveMessage(e) {
    if((e["data"]["data"] && e["data"]["data"] == "closeVote") || (e["data"]["body"]["result"].toString() == '0' && e["data"]["cmd"] == 'webinar.event.interaction.pollResult')){
        meetingSetting.onCloseVote();
        meetingSetting.onVoteSubmitted();
    }
}
if(window.addEventListener){
    window.addEventListener("message", receiveMessage, false);//fire,chrome
}
else{
    window.attachEvent('onmessage', receiveMessage);//ie
}