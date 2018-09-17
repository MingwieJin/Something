/**
 * Updated by qilongjie on 2017/1/15
 */
;'use strict';
(function (smarket) {
    var webinarApi = smarket.api.webinar,
        selectMettingVM = {};
    selectMettingVM.parentId = ko.observable(smarket.urlParams['id']);
    selectMettingVM.main = ko.observable('');
    selectMettingVM.webinarId = ko.observable(smarket.urlParams['webinarId']);
    selectMettingVM.instanceId = ko.observable(smarket.urlParams['instanceId']);
    selectMettingVM.maininstanceId = ko.observable(smarket.urlParams['maininstanceId']);
    selectMettingVM.registId = ko.observable();
    selectMettingVM.brinstanceId = ko.observable(smarket.urlParams['brinstanceId']);
    selectMettingVM.mainwebinarInfo = ko.observableArray();
    selectMettingVM.tc=ko.observable(smarket.urlParams['tc']);
    selectMettingVM.selectmeeting = function (webinarId,brinstanceId,item) {
        webinarId = item.parentId || selectMettingVM.main();
        selectMettingVM.webinarId(webinarId);
        window.location.href = 'http://'+location.host + location.pathname + "?webinarId=" + webinarId+'&&brinstanceId='+brinstanceId+'&&instanceId='+selectMettingVM.instanceId();
    };
    //从配置中获取tenantId
    var tenantId = smarket.Config('tenantId'),
        mainparams = {
            "tenantId": tenantId,
            "status": 4, //"1-待发布, 2-审核中, 3-已发布,其他4已结束
            "keyword": "",
            "orderby": "startTime",
            "start": 0,
            "num": 50,
            "fieldsDisplay": [    //搜索扩展字段时，必须填加上
                "conference"
            ],
            "fieldsCondition": [
                {
                    "fieldName": "conference",
                    "fieldComparison": "=",
                    "fieldValue": selectMettingVM.instanceId()
                    // , "includeNull": false  //接口bug，如果为false，不要传
                }
            ]
            , "videoType": "1"    // "会议类型 1为直播 2为点播"
        };
    //获取主会场分会场信息
    webinarApi.getWebinarListAdvanced(mainparams).then(function (data) {
        debugger
        if (data.content.items) {
            for (var i = 0; i < data.content.items.length; i++) {
                //计算已结束会议
                var item = data.content.items[i];
                if (item.videoType == 1 && item.status == 4&&item.parentId!=null) {
                    selectMettingVM.mainwebinarInfo.push(item);
                }
            }
            if (!smarket.urlParams['webinarId']) {
                $('.sel-meeting').show();
            }
            if (selectMettingVM.mainwebinarInfo().length > 0) {
                // $(".back.back-1").show();
                if(selectMettingVM.instanceId()){
                    $(".back.back-1.sel").show();
                }else{
                    $(".back.back-1.in").show();
                }
            }
            else {
                $('.sel-meeting').hide();
                $(".back.back-1").hide();
                meetingSocket.init();
            }
        }
        else {
            $('.sel-meeting').hide();
            $(".back.back-1").hide();
            $(".back.back-1.in").show();
            meetingSocket.init();
        }
        ko.applyBindings(selectMettingVM, $('.sel-meeting')[0]);

    });
    if (smarket.urlParams['webinarId']) {
        var memberInfo  = $.cookie(smarket.Config('cookie').flag.member+"_"+smarket.Config('schemaId'));
        if (!memberInfo || !memberInfo.session || !memberInfo.unique) {
            if (window.location.href.indexOf('wap')>-1){
                window.location.href = '../template/RegisterForm_WAP/html/register.html' + window.location.search;
            }else{
                // window.location.href = '../template/RegisterForm_PC/html/register.html' + window.location.search;
                window.location.href = '../view/index.html' + window.location.search;
            }
            return;
        }
        //根据直播的parentId拿取点播的instanceId去报名
        //判断分会场是否已报名，如果没有直接报名
        debugger
        //获取主会场分会场信息
        webinarApi.request_GetMeetingInfo(selectMettingVM.webinarId()).then(function(data){
            if(selectMettingVM.maininstanceId()){
                selectMettingVM.registId(selectMettingVM.maininstanceId())
            }else{
                selectMettingVM.registId(data.content.eventInfo.instanceId);
            }
            webinarApi.getApplicantInfo(selectMettingVM.registId(), memberInfo.session).then(function (data) {
                var applicantInfo = data.content;
                if (applicantInfo.IsRegistration==0) {
                    //登录成功后，报名当前会会场
                    var sys_source="";
                    var isMobile= navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
                    if(isMobile){
                        sys_source="WAP"
                    }else{
                        sys_source="PC"
                    }
                    var json = {
                        "instanceId": selectMettingVM.registId(),
                        "channel":  selectMettingVM.tc(),//渠道追踪代码
                        "items": [
                            {
                                "key": "name",
                                "text": memberInfo.name
                            },
                            {
                                "key": "mobile",
                                "text": memberInfo.mobile
                            },
                            {
                                "key": "email",
                                "text": memberInfo.unique
                            }
                        ],
                        "memberId": memberInfo.memberId,
                        "sess": memberInfo.session,
                        "sys_source":sys_source

                    };
                    smarket.api.webinar.registration(json).then(function (result) {
                        console.log('reg')
                        $('.sel-meeting').hide();
                        meetingSocket.init();
                    },function (result) {
                        console.log('unreg')
                    });
                }else{
                    $('.sel-meeting').hide();
                    meetingSocket.init();
                }
            });
        });
        // var brparams = {
        //     "tenantId": tenantId,
        //     "status": -1, //"1-待发布, 2-审核中, 3-已发布,其他4已结束
        //     "keyword": "",
        //     "orderby": "startTime",
        //     "start": 0,
        //     "num": 50,
        //     "fieldsDisplay": [    //搜索扩展字段时，必须填加上
        //         "conference"
        //     ],
        //     "fieldsCondition": [
        //         {
        //             "fieldName": "conference",
        //             "fieldComparison": "=",
        //             "fieldValue": selectMettingVM.instanceId()
        //             // , "includeNull": false  //接口bug，如果为false，不要传
        //         }
        //     ]
        //     , "videoType": "2"    // "会议类型 1为直播 2为点播"
        // };
        // webinarApi.getWebinarListAdvanced(brparams).then(function(data){
        //     $.each(data.content.items,function(index,el){
        //         debugger
        //         el.webinarId==selectMettingVM.webinarId()?selectMettingVM.brinstanceId(el.instanceId):''
        //     })
        // }).then(function(){
        //     if(selectMettingVM.maininstanceId()){
        //         selectMettingVM.registId(selectMettingVM.maininstanceId())
        //     }else{
        //         selectMettingVM.registId(selectMettingVM.brinstanceId())
        //     }
        //     webinarApi.getApplicantInfo(selectMettingVM.registId(), memberInfo.session).then(function (data) {
        //         var applicantInfo = data.content;
        //         if (applicantInfo.IsRegistration==0) {
        //             //登录成功后，报名当前会会场
        //             var sys_source="";
        //             var isMobile= navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? true : false;
        //             if(isMobile){
        //                 sys_source="WAP"
        //             }else{
        //                 sys_source="PC"
        //             }
        //             debugger
        //             var json = {
        //                 "instanceId": selectMettingVM.registId(),
        //                 "channel":  selectMettingVM.tc(),//渠道追踪代码
        //                 "items": [
        //                     {
        //                         "key": "name",
        //                         "text": memberInfo.name
        //                     },
        //                     {
        //                         "key": "mobile",
        //                         "text": memberInfo.mobile
        //                     },
        //                     {
        //                         "key": "email",
        //                         "text": memberInfo.unique
        //                     }
        //                 ],
        //                 "memberId": memberInfo.memberId,
        //                 "sess": memberInfo.session,
        //                 "sys_source":sys_source
        //
        //             };
        //             smarket.api.webinar.registration(json).then(function (result) {
        //                 console.log('reg')
        //                 debugger
        //                 //报名结果
        //                 // console.log(result);
        //             },function (result) {
        //                 // 如果注册失败返回首页
        //                 debugger
        //                 console.log('unreg')
        //             });
        //         }else{
        //
        //         }
        //     });
        //
        // });



    }

})(smarket);