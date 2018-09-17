/**
 * Created by axel on 2016/1/20.
 */
//socket url
window.socketUrl =  window.configs.webinarbInteractUrl;//"ws://dev.webinarbinteract.smarket.net.cn/";
//socket instance
window.socket = new Object({});
//webinar ID
window.webinarId = 0;
//socket head info
window.cookObj = new Object({
    webinarId:0,
    userid:0,
    username:'',
    useremail:'',
    clientType:'',
    isGag:'',
    role:'',
    company:null
    //webcastid:''
});
//会议播放时间
window.liveDurationTime = 0;
//user info
window.userInfo = new Object({});
//instance ID
window.instanceId = 0;//$.queryString("instanceId");
//tenant ID
window.tenantId = 0;
//template config ID
window.configId = 0;
window.userCookie = new Object({});
window.loginUrl = "";
window.memberSchemaId = 0;
window.videoItems = [];
window.videoList = [];//点播视频列表
window.videoIndex = 0;//当前播放视频索引
window.videoFocus = '';//当前播放视频id
window.videoTotalLong = 0;
window.isRegistration = false;//已经报名
window.needLogin = true;//需要登录
window.trailer = false;//可以试看
window.trailerTime = 0;//试看时长
window.trailFlag = false;
window.kickTimeOut = null;
window.eventInfo = {};
//init
(function() {
    //window.webinarId = smarket.urlParams["webinarId"];
    //window.userCookie = new Object({//dev
    //    unique: 'email',
    //    uniqueType: '1',
    //    memberId: '1',
    //    session: '000_test_use_only_create_by_jack'
    //});
    //window.userCookie = $.cookie("smarketMember");
    //if (typeof userCookie == "string") {
    //    userCookie = JSON.parse(userCookie);
    //}
})();