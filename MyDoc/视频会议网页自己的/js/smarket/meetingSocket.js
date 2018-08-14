var webinarApi = smarket.api.webinar;
var templateApi = smarket.api.template;
var fileApi = smarket.api.file;
var questionApi = smarket.api.questionaire;
var pollApi = smarket.api.poll;
liveModel = new smarket.viewModel.liveModel();

/**
 * Created by Arthur_li on 2015/8/26.
 */
var sBaseSocketFormat = function (cmd, data) {
    var self = this;
    self.size = 0;
    self.orn = "";
    self.dst = "";
    self.type = "0x0002";
    self.cmd = cmd;
    self.sess = $.cookie("globaUid");
    self.seq = 0;
    self.ver = 1000;
    if (!data) {
        data = new Object({});
    }
    self.body = {
        head: cookObj,//{'webinarId':'406','role':0,'userid': 418},//
        data: data
    };
};

var meetingSocket = {
    init: function () {
        //get meeting info
        window.webinarId = smarket.urlParams['webinarId'] || smarket.urlParams['id'];
        var memberInfo = userCookie = $.cookie(smarket.Config('cookie').flag.member + "_" + smarket.Config('schemaId'));
        userCookie = memberInfo;
        var $deferDemand = webinarApi.request_GetMeetingInfo(window.webinarId);
        $deferDemand.done(function (event) {
            if (event.content) {
                //网页标题修改
                window.document.title = event["content"]["eventInfo"]["title"];
                //报名观看
                $deferRegistration = $.Deferred().resolve().promise();
                var sys_source = "";
                var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
                if (isMobile) {
                    sys_source = "WAP"
                } else {
                    sys_source = "PC"
                }
                if (memberInfo)
                // $deferRegistration = webinarApi.registration({
                //     sys_source:sys_source,
                //     sess: memberInfo.session,
                //     session: memberInfo.session,
                //     instanceId: event.content.eventInfo.instanceId,
                //     channel: event.content.configInfo['sbase:webinar:defaultTrackConfig'],
                //     memberId: memberInfo.memberId,
                //     items: [
                //         {
                //             fieldId: '3',
                //             key: 'email',
                //             text: memberInfo.unique
                //         },
                //         {
                //             fieldId: '2',
                //             key: 'name',
                //             text: memberInfo.name
                //         },
                //         {
                //             "key": "mobile",
                //             "text": memberInfo.mobile
                //         }
                //
                //     ]
                // });

                    $deferRegistration.always(function () {
                        var eventInfo = event["content"]["eventInfo"];//event.body.content.eventInfo;
                        var questionnaireId = event["content"]['questionnaireId'];
                        var configInfo = event["content"]["configInfo"];
                        if (event["content"]["eventInfo"]['trailer'] == 1) {
                            trailer = true;
                            trailerTime = parseInt(event["content"]["eventInfo"]['trailerTime']);
                        }
                        if (event["content"]["eventInfo"]['needLogin'] == 0) {
                            needLogin = false;
                        }
                        //视频列表
                        videoItems = event["content"]["eventInfo"]['videoList']['items'];
                        window.instanceId = eventInfo.instanceId;
                        // window.loginUrl = '../template/RegisterForm_PC/html/register.html' + window.location.search;//登录地址
                        // window.loginUrl='../view/index.html' + window.location.search;
                        window.memberSchemaId = configInfo["sbase:webinar:defaultMemberConfig"];

                        window.tenantId = eventInfo.tenantId;
                        window.configId = eventInfo.meetingPlaceConfig;

                        //低版本IE判断
                        var lowIe = false;
                        var browserVer = (function () {
                            var browser = navigator.appName;
                            var b_version = navigator.appVersion;
                            var version = b_version.split(";");
                            if (version.length > 1) {
                                var trim_Version = version[1].replace(/[ ]/g, "");
                                if (browser == "Microsoft Internet Explorer") {
                                    switch (trim_Version) {
                                        case "MSIE6.0":
                                        case "MSIE7.0":
                                        case "MSIE8.0":
                                            return trim_Version;
                                        default:
                                            return 'highBrowser';
                                    }
                                }
                                else {
                                    return 'noIe';
                                }
                            }
                            else {
                                return 'noIe';
                            }
                        })();
                        if (browserVer == "MSIE6.0" || browserVer == "MSIE7.0" || browserVer == "MSIE8.0") {
                            lowIe = true;
                        }
                        //分享，二维码 start
                        var wapUrl = "http://webinaropen.smarket.net.cn/meetingplace/index.html?instanceId=" + window.instanceId;
                        $('#qr-code').qrcode({
                            render: lowIe ? 'table' : 'canvas',
                            width: 110, //宽度
                            height: 110, //高度
                            text: wapUrl //任意内容
                        });
                        $('#qr-code2').qrcode({
                            render: lowIe ? 'table' : 'canvas',
                            width: 108, //宽度
                            height: 108, //高度
                            text: wapUrl //任意内容
                        });
                        //分享
                        var clip = {};

                        $('#shareUrl').val(window.location.href.replace("&isAuto=1", ""));
                        if (lowIe) {
                            $('#copy').click(function () {
                                window.clipboardData.setData('text', window.location.href);
                                $('.weak-hint').show();
                                setTimeout(function () {
                                    $('.weak-hint').hide();
                                }, 3000);
                            });
                        }
                        else {
                            //$.getScript("../../../../../../bower_components/zeroclipboard/dist/ZeroClipboard.min.js")
                            $.getScript("../../Components/Demand/PC/ZeroClipboard.min.js")
                                .done(function () {
                                    clip = new ZeroClipboard(document.getElementById("copy"));
                                    clip.on("copy", function (e) {
                                        $('.weak-hint').show();
                                        setTimeout(function () {
                                            $('.weak-hint').hide();
                                        }, 3000);
                                    });
                                });
                        }
                        var firstShare = true;
                        (function () {
                            window._bd_share_config = {
                                "common": {
                                    "bdSnsKey": {
                                        "tsina": "sina",
                                        "tqq": "qq",
                                        "t163": "163",
                                        "tsohu": "sohu"
                                    },
                                    "bdText": "",
                                    "bdDesc": '会议标题:' + headVM.title() + '; 主办方:' + headVM.sponsor(),
                                    // "bdMini": "1",
                                    //"bdMiniList": false,
                                    bdUrl: '',
                                    bdPic: "自定义分享图片"
                                }, "share": {
                                    "bdSize": 16
                                }
                            };
                            // with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
                        })();
                        $('#share').mouseover(function () {
                            if (firstShare) {
                                firstShare = false;
                                $('.share-h-l').removeAttr('class').addClass('share-h-l');
                            }
                            $(".share-info").show();
                        });
                        $('#share').mouseleave(function () {
                            $(".share-info").hide();
                        });
                        //分享，二维码 end

                        // 上面已获取，此处不适用
                        // window.userCookie = $.cookie("smarketMember_" + window.memberSchemaId);
                        // if (typeof userCookie == "string") {
                        //     userCookie = JSON.parse(userCookie);
                        // }

                        //未登录
                        if (!needLogin) {//无需登录
                            var session = userCookie ? userCookie.session : '';
                            //var $deferAddAttend = webinarApi.request_AddAttend(instanceId,session);
                            //$deferAddAttend.done(function(data){
                            //    //console.log(data);
                            //    //console.log('增加统计成功')
                            //});
                            meetingSocket.final();//直接观看
                        } else {//必须登录
                            if (userCookie && userCookie.session) {//已登录，获取用户信息
                                meetingSocket.getApplicantInfoGoToFinal();
                            } else {
                                if (window.trailer) {//可以试看
                                    window.trailFlag = true;//试看
                                    meetingSocket.final();//直接观看
                                } else {
                                    meetingSetting.kickOut("很抱歉，登录报名成功才能进入本场会议。");
                                    return;
                                }
                            }
                        }

                        //get template info
                        var $deferPcTemplateInfo = templateApi.getConfigInfoByConfigId(eventInfo['meetingPlaceConfig']);
                        $deferPcTemplateInfo.done(function (templateData) {
                            $.initTemplate(templateData["content"]["configInfo"]["html"][0]);//引用模板设置
                            setTimeout(function () {
                                var flag = false;
                                $('p.tab-nav').each(function (i, item) {
                                    if ($(item).is(':hidden')) {
                                        $('div.m-tab div.tab-b:eq(' + i + ')').hide();
                                    }
                                    else {
                                        flag = true;
                                    }
                                });
                                if (!flag) {
                                    $('.m-tab').hide();
                                }
                                $("p.tab-nav:visible:first").click();
                            }, 1);
                        });

                        setTimeout(function () {
                            var flag = false;
                            $('p.tab-nav').each(function (i, item) {
                                if ($(item).is(':hidden')) {
                                    $('div.m-tab div.tab-b:eq(' + i + ')').hide();
                                }
                                else {
                                    flag = true;
                                }
                            });
                            if (!flag) {
                                $('.m-tab').hide();
                            }
                            $("p.tab-nav:visible:first").click();
                        }, 1);
                        fileApi.getList(0, '', '', window.tenantId, '', '', '', '', '', window.instanceId, '2', '').then(function (data) {
                            if (data && data["result"].toString() == "0" && data["content"]["total"] > 0) {
                                meetingSetting.resourceReload(data["content"]["items"]);
                            }
                        }, function () {
                            //console.log("文件信息失败");
                        });
                        if (questionnaireId != "") {
                            questionApi.get(questionnaireId).then(function (data) {
                                meetingSetting.setQuestionnaire(data.content);
                            }, function () {
                                //console.log("获取问卷信息失败");
                            })

                        }
                        meetingSetting.settingConfig(eventInfo);
                        //meetingService.request_GetPoll(function(data){
                        //    if(data && data["result"].toString() == "0" && data["content"]["total"] > 0){
                        //        meetingSetting.setVote(data["content"]["items"]);
                        //    }
                        //});
                    });
            }
        }, function (data) {
            //请求会议失败
        });
    },
    final: function (ApplicantInfo) {
        meetingSocket.setVideo();
        // debugger
        // if (window.isRegistration) {
        //已经登录报名或不需要登录的
        cookObj.webinarId = webinarId.toString();
        cookObj.userid = userCookie.memberId.toString();
        cookObj.username = ApplicantInfo.name;
        cookObj.email = ApplicantInfo.email;
        cookObj.useremail = ApplicantInfo.email;
        cookObj.channel = "DEFAULTFORM";
        cookObj.clientType = device.mobile() ? 'mobile' : 'pc';
        cookObj.isGag = false;
        cookObj.role = "0";
        //if (returnCitySN) {
        //    cookObj.ip = returnCitySN ['cip'];
        //    cookObj.address = returnCitySN ['cname'];
        //}
        // cookObj.cip = "127.0.0.1";
        // cookObj.cname = "未知";
        // cookObj.webcastid = eventInfo.webcastId;
        meetingSetting.setMemberId(cookObj.userid);
        userInfo.userid = cookObj.userid;
        userInfo.email = cookObj.email;
        userInfo.userName = cookObj.username;
        //userInfo.company = "company";//dev
        //userInfo.mobile = "13088888888";//dev
        userInfo.company = ApplicantInfo["enterprise"];
        userInfo.mobile = ApplicantInfo["mobile"];
        userInfo.channel = ApplicantInfo["channel"];
        userInfo.clientType = cookObj.clientType;
        userInfo.role = cookObj.role;
            InitVideoAndPPT(cookObj);
        // } else {
        //     InitVideoAndPPT();
        // }
    },
    setVideo: function () {
        window.videoFocus = $.cookie('videoFocus' + window.instanceId) || '';
        if (!videoItems.length) {//如果没有视频
            return;
        }
        videoItems.sort(function (a, b) {
            return parseInt(a['orderNum']) - parseInt(b['orderNum']);
        });
        for (var i in videoItems) {
            window.videoList.push(meetingSetting.getVideoWebcastId(i));
        }
        if (!videoList.length) {//如果没有webcastId
            return;
        }
        window.videoIndex = meetingSetting.getVideoIndex(window.videoFocus);
        var videoTimes = videoItems[window.videoIndex]['times'].split(':');
        window.videoTotalLong = parseInt(videoTimes[0]) * 60 + parseInt(videoTimes[1]);//获取视频总时长秒数，时间轴初始化要用
        if (!window.videoFocus) {//如果之前没有记录当前视频id，就记录下
            window.videoFocus = videoItems[window.videoIndex]['videoId'];
            $.cookie('videoFocus' + window.instanceId, window.videoFocus);
        }
        meetingSetting.videoListAdd(videoItems, function () {
            if (!window.videoFocus) {
                window.videoFocus = videoItems[videoIndex].videoId;
            }
            // meetingSetting.timeLineInit();
            // var mySwiper = new Swiper('.videoList .swiper-container', {
            //     cssWidthAndHeight: 'height',
            //     slidesPerView: 'auto'
            // });
            // $('.videoList-prev').click(function () {
            //     mySwiper.swipePrev();
            // });
            // $('.videoList-next').click(function () {
            //     mySwiper.swipeNext();
            // });
        });
    },
    getApplicantInfoGoToFinal: function () {//获取用户信息后看完
        var $defer_getApplication = webinarApi.getApplicantInfo(window.instanceId, userCookie.session);
        $defer_getApplication.done(function (response) {
            var ApplicantInfo = response.content;
            if (ApplicantInfo.IsRegistration == 1) {//已经报名
                window.isRegistration = true;
                meetingSocket.final(ApplicantInfo);
                // if (needLogin) {
                //     meetingSocket.load();
                // }
            } else if (trailer) {//试看
                window.trailFlag = true;//试看
                meetingSocket.final();//直接观看
            } else {//没有报名，且不许试看
                meetingSetting.kickOut("很抱歉，登录报名成功才能进入本场会议。");
                return;
            }
        })
            .fail(function () {
                if ((!ApplicantInfo) || (ApplicantInfo && ApplicantInfo.result == 0)) {
                    meetingSetting.kickOut("很抱歉，您的身份信息验证失败。");
                    return;
                }
            });
    },
    load: function () {
        //连接websocket后端服务器
        socket = io.connect(socketUrl + "center", {'reconnect': false});
        try {
            //连接成功后用户登录
            socket.on('connect', function () {
                socket.emit('emitSocket', new sBaseSocketFormat('onUserJoin', userInfo));
            });
            //isMinStatus();
            socket.on('disconnect', function () {
            });
        } catch (e) {
            alert(e.message);
        }
        socket.on('onEmitSocket', function (obj) {
            var key = obj.cmd.toLowerCase();
            //console.log(key);
            var returnData = obj['body']["content"]["data"];
            var answerData = new Object({});
            var qaListData = new Object({});
            var userListData = new Object({});
            var userLen = new Object({});
            var voteData = new Object({});
            try {
                switch (key) {
                    case 'onuserjoin'://用户加入成功
                        //socket.emit('emitSocket', new sBaseSocketFormat('onUserOnlineList'));// {key:"onUserOnlineList",head:cookObj}
                        //socket.emit('emitSocket', new sBaseSocketFormat('onGetTop50QAList'));
                        //socket.emit('emitSocket', new sBaseSocketFormat('onVote'));
                        socket.emit('emitSocket', new sBaseSocketFormat('onTimelineSingle'));
                        break;
                    case 'reconnect'://重连成功后
                        socket.emit('emitSocket', new sBaseSocketFormat('onUserJoin'));
                        break;
                    case 'onkickout'://踢掉线
                        meetingSetting.kickOut(returnData["reason"]);
                        break;
                    case 'onquestion': //监控自己提问
                        meetingSetting.onQuestion(returnData);
                        //socket.emit('emitSocket', new sBaseSocketFormat('onGetTop50QAList'));
                        break;
                    case 'onquestionmylist': //获取当前用户所有提问
                        meetingSetting.onQuestionMyList(returnData);
                        break;
                    case 'onanswer': //监控回答
                        meetingSetting.onAnswer(returnData);
                        //socket.emit('emitSocket', new sBaseSocketFormat('onGetTop50QAList'));
                        break;
                    case 'ongettop50qalist'://获取问答列表前50
                        meetingSetting.onQaList(returnData);
                        break;
                    case 'onallqalist'://获取所有问答列表
                        meetingSetting.onAllQaList(returnData);
                        break;
                    case 'onuseronlinenum'://获取在线人数
                        meetingSetting.onUserOnLineNum(returnData);
                        break;
                    case 'onuseronlinelist'://获取在线人员列表
                        meetingSetting.onUserOnLineList(returnData);
                        //socket.emit('emitSocket', {key:"onUserOnlineNum",head:cookObj});
                        break;
                    case 'onuserleave'://有用户退出时更新人员列表和人数
                        meetingSetting.onUserLeave(returnData);
                        //socket.emit('emitSocket', {key:"onUserOnlineNum",head:cookObj});
                        break;
                    case 'description':
                        meetingSetting.description(returnData);
                        break;
                    case 'agendalist':
                        meetingSetting.agendaList(returnData);
                        break;
                    case 'speakerlist':
                        meetingSetting.speakerList(returnData);
                        break;
                    case 'onrelease':  //监听问答是否发布
                        meetingSetting.onRelease(returnData);
                        //socket.emit('emitSocket', new sBaseSocketFormat('onGetTop50QAList'));
                        break;
                    case 'onanswerdel'://删除回复
                        //console.log(returnData);
                        meetingSetting.onDeleteAnswer(returnData.pkId);
                        break;
                    case 'onvote':
                    case 'onpublishvote':
                        meetingSetting.onVote(returnData);
                        break;
                    case 'onclosevote':
                        //closeVote();
                        //meetingSetting.onCloseVote(returnData);
                        break;
                    case 'onmessage':
                        //var messageData = returnData;
                        meetingSetting.onMessage(returnData);
                        ////console.log(obj.data);
                        break;
                    case 'ontextwebcast':
                        meetingSetting.onTextWebcast(returnData);
                        break;
                    case 'onluckydrawlist':
                    case 'onluckydraw':
                        meetingSetting.onLuckyDrawList(returnData);
                        break;
                    case 'oneventstart':
                        //console.log(returnData);
                        break;
                    case 'ontimeline':
                    case 'ontimelinesingle':
                        meetingSetting.onTimeLineSingle(returnData);
                        break;
                    case 'ongag':
                        meetingSetting.onGag(returnData);
                        break;
                    default:
                        //console.log('undefined emit!');
                        break;
                }
            }
            catch (ex) {
                //console.log("socket_load_error:" + ex.message);
            }
        })

    },
    socketListen: function (starttime) {
        try {
            socket.emit('emitSocket', new sBaseSocketFormat('onUserJoin'));
        } catch (ex) {
            //console.log("socketListen_error:" + ex.message);
        }
    },
    //提交聊天消息内容`
    submitMsg: function () {
        try {
            if (cookObj.isGag == true || cookObj.isGag.isGag == "true") {
                alert("您已被管理员设置禁言！");
                return;
            }
            var $askContent = $("#askContent");
            var content = $askContent.val();
            if (content != '') {
                var obj =
                    /*new Common({
                     qid: '',
                     aid: '',
                     question: content,
                     submitor: cookObj.username,
                     submitorId:cookObj.userid,
                     answer: null,
                     answerBy: null,
                     submitTime: null,
                     answerTime:null,
                     qaownerID: cookObj.userid,
                     published: false,
                     group:cookObj.group,
                     clientType:cookObj.clientType
                     });*/
                    new QA({
                        qUserId: cookObj.userid,
                        qName: cookObj.username,
                        qMessage: content,
                        aId: '',
                        clientType: cookObj.clientType,
                        isAssignGuest: false,
                        isRelease: false,
                        isSubject: false
                    });
                socket.emit('emitSocket', new sBaseSocketFormat('onQuestion', obj));
                $askContent.val("");
            }
            return false;
        } catch (ex) {
            //console.log("submitMsg_error:" + ex.message);
        }
    },
    //submitVote:function(voteData) {
    //    try{
    //        voteData.email= cookObj.email;
    //        voteData.username=cookObj.username;
    //        voteData.userid==cookObj.userid;
    //        socket.emit('emitSocket',new sBaseSocketFormat('onSubmitVote',voteData));
    //    }catch(ex) {
    //        //console.log("submitVote_error:"+ex.message);
    //    }
    //},
    //记录用户操作行为
    submitUserLogs: function (key, obj) {
        try {
            //socket.emit('emitSocket',new sBaseSocketFormat("$"+key,obj) );
        } catch (ex) {
            //console.log("submitUserLogs_error:" + ex.message);
        }
    },
    //获取全部问答
    //allQaList: function (key,obj) {
    allQaList: function () {
        try {
            socket.emit('emitSocket', new sBaseSocketFormat('onAllQAList'));
        } catch (ex) {
            //console.log("allQaList_error:" + ex.message);
        }
    }
};
//转换成需要的格式
var parseGroups = function (items) {
    //0）准备奖项
    var result = {};//{"三等奖":["三等奖","",[]],"一等奖-收益金":["一等奖","收益金",[]]};
    for (var i in items) {
        //console.log(i);
        var item = items[i];
        strKey = item.award + "-" + item.awardRemark;
        var arrValue = [];
        if (result[strKey]) {
            arrValue = result[strKey];
            arrValue[2].push(item);
        } else {
            arrValue = [item.award, item.awardRemark, [item]];
        }

        result[strKey] = arrValue;
    }
    //console.log(result);

    //1）奖项排序
    var ro = [];
    for (var r in result) {
        var t = result[r];
        var tmp = {};
        tmp.award = t[0];
        tmp.awardRemark = t[1];
        tmp.luckerList = t[2];
        switch (tmp.award) {
            case "一等奖":
                tmp.id = 1;
                break;
            case "二等奖":
                tmp.id = 2;
                break;
            case "三等奖":
                tmp.id = 3;
                break;
            case "特等奖":
                tmp.id = 0;
                break;
            default:
                tmp.id = 999;
                break;
        }
        ro.push(tmp);
    }

    //console.log(ro);
    return ro;
};