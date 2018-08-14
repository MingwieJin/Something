window.config = {
    //租户Id
    "tenantId": "722",
    //模块ID
    "moduleId": "26",
    //文章栏目ID
    "articleCategoryId": "101262",
    //体系ID
    "schemaId": "481",
    //资料库ID
    "folderId":"1009615",
    //约定加密串加密串
    "encrypt":"BJSN-201806260001-439",
    //游戏去第三方跳转地址
    "activeUrl":"http://megalaunch-veritas.smarket.net.cn/app_pc/view/game_landing.html?key=",
    //登录地址
    "loginUrl":"http://f.smarket.net.cn/s/template/5bacc9c0a9719eaff9c4c1c51fd9fb0b/html/login.html?memberId=679&trackId=2:463&configId=92382",
    //cookie配置相关配置
    "cookie": {
        "json": true,
        //cookie前缀
        "flag": {
            "member": "smarketMember",
            "openId": "openIdVeritas",
            "customForm": "smarketCustomFormVeritas"
        }
    },
    pcurl:"http://i-veritas.smarket.net.cn/app_pc",
    // pcurl:'http://p-uat.smarket.net.cn/veritas/app_pc',
    wapurl:"http://i-veritas.smarket.net.cn/app_wap",
    //需要中转的接口
    proxyInterfaces: [
        '/seminar/bigScreen/forBigScreenWall/checkIn'
    ],
    cacheSettings: {
        interfaces: [
            '/article/getDetail',
            '/webinar/open/getWebinarListAdvanced',
            '/articleCategory/getList',
            '/webinar/open/getWebinarInfo',
            '/questionary/get'
        ],
        cacheSwitch: true,//是否全局启用本地缓存
        cacheExp: 600,//过期时间(秒)
        refresh: false //是否强制刷新
    },
    //api相关配置
    "api": {
        //ssw  20170425
        //proxy: "http://emerson2017-projectapi.smarket.net.cn/signsmarketapi?smkproxyurl=",
        // proxy: "http://local.amsApi.com/index.php/signsmarketapi?smkproxyurl=",
        "cdn":"http://cdn.smarket.net.cn",
        //微信转发
        "weChatAuthProxy": "http://p1.smarket.net.cn/index.html",
        //网关相关配置
        "gateway": {
            "wechat": "http://s2-oldapi.smarket.net.cn",
            "webinar": "http://s2-oldapi.smarket.net.cn",
            "template": "http://s2-oldapi.smarket.net.cn",
            "dict": "http://s2-oldapi.smarket.net.cn",
            "product": "http://s2-oldapi.smarket.net.cn",
            "article": "http://s2-oldapi.smarket.net.cn",
            "seminar": "http://s2-oldapi.smarket.net.cn",
            "admintool": "http://s2-oldapi.smarket.net.cn",
            "account": "http://s2-oldapi.smarket.net.cn",
            "tools": "http://s2-oldapi.smarket.net.cn",
            "general": "http://s2-api.smarket.net.cn",
            "file": "http://s2-oldapi.smarket.net.cn"
        },
        //smarket接口配置
        "smarket": {
            "sdebUrl": "http://s2-sdeb.smarket.net.cn/"
        },
        "ungateway": {
            "sdebUrl": "http://s2-sdeb.smarket.net.cn1/",
            "webinarbInteractUrl":"http://s2-webinarbinteract.smarket.net.cn/",
            "sbaseUrl":"http://s2-content.smarket.net.cn/"
        }
    },

    //注册表单配置
    "contactManage":{
        "memberId":"679",
        "trackId":"2:461",
        "questionaryId1":1940,
        "instanceId":12265,
        "TC_WAP":"n3994g2JDm",
        "TC_PC":"nx9673184Y"
    },
    //测试会
    "contactManageTest":{
        "memberId":"679",
        "trackId":"2:463",
        "questionaryId1":2144,
        "instanceId":13383,
        "TC_WAP":"65Jgbdo222",
        "TC_PC":"T26O85A6uh"
    },


    //"customForm":{
    //    "instanceId":"10571",
    //    "customFormId":"3804",
    //    "linkId":"7680"
    //},
    //"regSeminarCustomForm":{
    //    "1878":{
    //        "instanceId":"10561",
    //        "customFormId":"3799"
    //    },
    //}
};
window['p-uat.smarket.net.cn'] = window['localhost'] = {
    //租户Id
    'tenantId': '722',
    //模块ID
    'moduleId': '26',
    //文章栏目ID
    'articleCategoryId': '101262',
    //体系ID
    'schemaId': '481',
    //资料库ID
    'folderId': '1009615',
    //约定加密串加密串
    "encrypt":"BJSN-201806260001-439",
    //游戏去第三方跳转地址
    "activeUrl":"http://megalaunch-veritas.smarket.net.cn/app_pc/view/game_landing.html?key=",

    //登录地址
    'loginUrl': 'http://uat-f.smarket.net.cn/s/template/5bacc9c0a9719eaff9c4c1c51fd9fb0b/html/login.html?memberId=679&trackId=2:463&configId=92382',
    //cookie配置相关配置
    'cookie': {
        'json': true,
        //cookie前缀
        'flag': {
            'member': 'smarketMember',
            'openId': 'openIdVeritas',
            'customForm': 'smarketCustomFormVeritas'
        }
    },
    //pcurl: 'http://p-uat.smarket.net.cn/veritas/test/app_pc',  //测试地址
    pcurl:'http://p-uat.smarket.net.cn/veritas/app_pc',
    wapurl: 'http://p-uat.smarket.net.cn/veritas/app_wap',
    //需要中转的接口
    proxyInterfaces: [
        '/seminar/bigScreen/forBigScreenWall/checkIn'
    ],

    //api相关配置
    'api': {
        //ssw  20170425
        //proxy: "http://emerson2017-projectapi.smarket.net.cn/signsmarketapi?smkproxyurl=",
        // proxy: "http://local.amsApi.com/index.php/signsmarketapi?smkproxyurl=",
        'cdn': 'http://cdn.smarket.net.cn',
        //微信转发
        'weChatAuthProxy': 'http://uat-p1.smarket.net.cn/index.html',
        //网关相关配置
        'gateway': {
            'wechat': 'http://uat-oldapi.smarket.net.cn',
            'webinar': 'http://uat-oldapi.smarket.net.cn',
            'template': 'http://uat-oldapi.smarket.net.cn',
            'dict': 'http://uat-oldapi.smarket.net.cn',
            'product': 'http://uat-oldapi.smarket.net.cn',
            'article': 'http://uat-oldapi.smarket.net.cn',
            'seminar': 'http://uat-oldapi.smarket.net.cn',
            'admintool': 'http://uat-oldapi.smarket.net.cn',
            'account': 'http://uat-oldapi.smarket.net.cn',
            'tools': 'http://uat-oldapi.smarket.net.cn',
            'general': 'http://uat-api.smarket.net.cn',
            'file': 'http://uat-oldapi.smarket.net.cn'
        },
        //smarket接口配置
        'smarket': {
            'sdebUrl': 'http://uat-sdeb.smarket.net.cn/'
        },
        'ungateway': {
            'sdebUrl': 'http://uat-sdeb.smarket.net.cn1/',
            "webinarbInteractUrl":"http://uat-webinarbinteract.smarket.net.cn/",
            'sbaseUrl': 'http://uat-content.smarket.net.cn/'
        }
    },

    //注册表单配置
    'contactManage': {
        'memberId': '679',
        'trackId': '2:461',
        'questionaryId1': 1940,
        'instanceId': 12265,
        'TC_WAP': 'n3994g2JDm',
        'TC_PC': 'nx9673184Y'
    }



    //"customForm":{
    //    "instanceId":"10571",
    //    "customFormId":"3804",
    //    "linkId":"7680"
    //},
    //"regSeminarCustomForm":{
    //    "1878":{
    //        "instanceId":"10561",
    //        "customFormId":"3799"
    //    },
    //}
};
//当访问免登陆页面时，忽略自适应
if(location.href.toLowerCase().indexOf('meeting_nlogin.html')==-1){
    //pc端以及wap端自适应
    var isMobile= navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
    var isPC=!isMobile;
    var isTestSite=false;
    if(location.href.toLowerCase().indexOf('test')>0)isTestSite=true;
//在pc端浏览wap站点时候，统一跳转至 pc首页
    if(isPC&&location.href.toLowerCase().indexOf('app_wap')>0){
        if(isTestSite)location.href='http:///i-veritas.smarket.net.cn/test/app_pc/view/index.html';
        else location.href='http:///i-veritas.smarket.net.cn/app_pc/view/index.html';
    }
//在wap端浏览pc站点时，统一跳转到wap首页
    if(isMobile&&location.href.toLowerCase().indexOf('app_pc')>0){
        if(isTestSite)location.href='http:///i-veritas.smarket.net.cn/test/app_wap/view/index.html';
        else location.href='http:///i-veritas.smarket.net.cn/app_wap/view/index.html';
    }

}
