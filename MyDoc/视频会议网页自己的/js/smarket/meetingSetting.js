var meetingSetting ={
    settingConfig:function(event){
        //head info
        headVM.title(event.title);
        headVM.sponsor(event.sponsor);
        //agenda
        agendaVM.agendaReload(event.agendaList,function(){
            //window.TimeLineLoad();
        });
        //speaker
        speakerVM.speakerReload(event.speakerList,function(){
            //$(".slideBox").slide({mainCell:".bd ul",autoPlay:true});
        });
        //description
        descriptionVM.descriptionReload(event.description.toString().replace(/\n/g,'<br/>'),function(){
        });
    },
    //会议基本信息
    settingInfo:function(event){
        //head info
        headVM.title(event.title);
        headVM.sponsor(event.sponsor);
        //agenda
        agendaVM.agendaReload(event.agendaList,function(){
            //window.TimeLineLoad();
        });
        //speaker
        speakerVM.speakerReload(event.speakerList,function(){
        });
        //description
        descriptionVM.descriptionReload(event.description.toString().replace(/\n/g,'<br/>'),function(){
        });
    },
    onQuestion:function(answerData){
        qaVM.qaAddModel(answerData);
        myQaVM.qaAddModel(answerData);
        this.qaScrollDown();
        this.myQaScrollDown();
    },
    onQuestionMyList:function(answerData){
        myQaVM.myQaAdd(answerData);
        this.qaScrollDown();
    },
    onAnswer:function(answerData){
        answerData.aTime = switchQAShortTime(answerData.aTime);
        answerData.qTime = switchQAShortTime(answerData.qTime);
        qaVM.qaAddAnswerModel(answerData);
        //allQaVM.qaAddAnswerModel(answerData);
        if(answerData.qName == cookObj.username){
            myQaVM.qaAddAnswerModel(answerData,function(){
                if(answerData.qName == cookObj.username){
                    window.getNewAnswerOfMe();
                }
            });
        }
        this.qaScrollDown();
        this.myQaScrollDown();
    },
    onQaList:function(qaListData){
        qaVM.qaAddPublished(this.listDown(qaListData.qaData));
        myQaVM.qaAddPublished(this.listDown(qaListData.qaMyData));
        this.qaScrollDown();
    },
    onAllQaList:function(qaListData){
        allQaVM.qaList([]);
        allQaVM.qaAddPublished(qaListData.list);
        this.qaScrollDown();
    },
    onUserOnLineNum:function(num){
        headVM.userOnlineReload(num);
    },
    onUserOnLineList:function(userListData){
        for (var i in userListData.data) {
            var tempUser = userListData.data[i];
            if(typeof tempUser == "string"){
                tempUser = JSON.parse(tempUser);
                //console.log(tempUser);
            }
            userListVM.userJoin([new User({
                id: tempUser.userid,
                email:tempUser.email,
                name: tempUser.userName
            })]);
        }
        headVM.userOnlineReload(userListData["numOnline"]);
    },
    onUserLeave:function(userListData){
        var userLen=userListData["data"].length;
        for (var j=0;j<userLen;j++) {
            userListVM.userLeave(userListData["data"][j]["userid"]);
        }
        //console.log(userListData["numOnline"]);
        headVM.userOnlineReload(userListData["numOnline"]);
    },
    description:function(returnData){
        descriptionVM.descriptionReload(returnData);
    },
    agendaList:function(returnData){
        agendaVM.agendaReload(eval('('+ returnData +')'));
    },
    speakerList:function(returnData){
        speakerVM.speakerReload(eval('('+ returnData+')'));
    },
    onRelease:function(objQuestion){
        if(objQuestion.isRelease)
        {
            qaVM.qaAdd(objQuestion);
            this.qaScrollDown();
        }
        else{
            qaVM.qaRemoveByQid(objQuestion.pkId,objQuestion.qUserId);
            //allQaVM.qaRemoveByQid(objQuestion.qId);
            //myQaVM.qaRemoveByQid(objQuestion.pkId);
        }
    },
    onDeleteAnswer:function(pkid){
        qaVM.qaRemoveByAid(pkid);
        //allQaVM.qaRemoveByAid(objqa.aid);
        myQaVM.qaRemoveByAid(pkid);
    },
    onVote:function(voteData){
        if(!window.voteRecode.recodeExist(voteData.id) || !window.voteRecode.isSubmitted(voteData.id)){
            if(voteData.state == "published") {
                voteVM.setCurrentVote(voteData.id);
                voteVM.showVote();
                window.voteRecode.saveRecode(voteData.id,false);
            }
            else{
                voteVM.setCurrentVote(voteData.id);
                voteVM.hideVote();
            }
        }
    },
    onVoteSubmitted:function(){
        if(voteVM.currentVoteId() != 0) {
            window.voteRecode.saveRecode(voteVM.currentVoteId(), true);
        }
    },
    onCloseVote:function(){
        voteVM.hideVote();
    },
    onMessage:function(messageData){
        $(".pop-radio-bg").css("display","block");
        $(".pop-radio-con").html(messageData.content);
    },
    onTextWebcast:function(textData){
        textWebcastVM.twAdd(textData);
        $("#textWebcastVM").scrollTop(0);
        $(".text_video").show();
        //console.log(textData);
    },
    onTimeLineSingle:function(timeLineData){
        if (timeLineData) {
            if (!timelineLoaded) {
                window.TimeLineLoad();
            }
            if (timeLineData.time) {
                var timeLineSingleTimeout = timeLineData.time - window.liveDurationTime;
                window.timeLineTime = timeLineData.time;
                setTimeout(function () {
                    TimeLineAdapter(timeLineData);
                }, timeLineSingleTimeout);
            }
        }
    },
    onGag:function(gagData){
        if (gagData) {
            setGag(gagData.isGag);
            if(gagData.isGag==false || gagData.isGag=="false")
            {
                alert("您已被管理员取消禁言！");
            }
        }
    },
    setMemberId:function(memberId){
        luckDrawVM.myMemberId(memberId);
    },
    resourceReload:function(resourceList){
        resDownloadFileVM.resourceReload(resourceList, smarket.Config().api.ungateway.sbaseUrl,function(){});
    },
    setQuestionnaire:function(questionnaireData){
        //var src = questionnaireData["template"]["pc"]["formalUrl"] + "?questionaryId=" + questionnaireData["questionaryId"] + "&configId=" + questionnaireData["template"]["pc"]["configId"];
        var src=smarket.Config().questionnairePCUrl + questionnaireData["questionaryId"]+"&returnUrl="+encodeURIComponent(window.location.href);
        //var src = window.location.origin+ '/tangsenlutou/SmarketView/Questionnaire/PC/questionnaire.html?questionaireId=' + questionnaireData["questionaryId"];
        questionnaireVM.src(src);
    },
    setVote:function(voteData){
        var voteArray = [];
        for(var i in voteData){
            var vote = voteData[i];
            var template = vote["template"]["pc"];
            voteArray.push({
                voteId : vote["pollId"],
                src :template["formalUrl"] + "?pollId=" + vote["pollId"] + "&configId=" + template["configId"]
            });
        }
        ////console.log(voteArray);
        voteVM.voteReload(voteArray);
        //{{poll.template.pc.formalUrl}}?pollId={{poll.pollId}}&configId={{poll.template.pc.configId}}
    },
    kickOut:function(tipsStr){
        $("#tips span").append(tipsStr);
        $("#tips").show();
        switch (arguments.length){
            case 2:
                setTimeout(function(){
                    window.location.href=window.loginUrl;
                },parseInt(arguments[1]));
                break;
            default :
                setTimeout(function(){
                    window.location.href=window.loginUrl;
                },3000);
                break;
        }
    },
    trailerOver:function(tipsStr,timeOut){
        clearTimeout(window.kickTimeOut);
        window.kickTimeOut = setTimeout(function(){
            if(window.getPlayheadTime) {
                window.getPlayheadTime();
            }
            meetingSetting.kickOut(tipsStr);
        },timeOut);
    },
    qaScrollDown:function(){
        $("#tab-b-top-2").scrollTop(document.getElementById('tab-b-top-2').scrollHeight);
    },
    myQaScrollDown:function(){
        $("#tab-b-top").scrollTop(document.getElementById('tab-b-top').scrollHeight);
    },
    listDown:function(data){
        var list = [];
        var listSize = data.length;
        for(var i=listSize-1;i>=0;i--){
            list.push(data[i]);
        }
        return list;
    },
    chapterAddList:function(data){
        chapterVM.addList(data);
    },
    chapterSeek:function(item){
        channel.send("seek", {
            "timestamp": item.starttimestamp
        });
        this.chapterChange(item);
    },
    chapterChange:function(item){
        var chapterList = chapterVM.chapterList();
        for(var i in chapterList){
            chapterList[i].focus(false);
        }
        item.focus(true);
    },
    getVideoIndex:function(webcastId){
        if(!webcastId){
            return 0;
        }
        for(var i = 0,max = videoItems.length;i<max;i++){
            if(videoItems[i]['videoId'].indexOf(webcastId) > -1){
                return i;
            }
        }
        return 0;
    },
    getVideoWebcastId:function(index){
        var linkRegx = /.+\-(\w{32})/;
        var result = videoItems[index]['videoOrigin'].match(linkRegx);
        if(result && result.length >= 2){
            return result[1];
        }
        else{
            null;
        }
    },
    videoListAdd:function(videoList,callback){
        videoListVM.addList(videoList);
        if(callback && typeof  callback == 'function'){
            callback();
        }
    },
    videoSetFocus:function(focusIndex){
        videoListVM.setFocus(focusIndex);
    },
    videoChange:function(index){
        window.videoIndex = index;
        var videoId = videoItems[index].videoId;
        if($.cookie('videoFocus' + window.instanceId) == videoId){
            return;
        } else{
            $.cookie('videoFocus' + window.instanceId,videoId);
            window.location.href=window.location.href;
        }
    },
    timeLineInit:function(){
        var $deferTimePoint = webinarApi.getTimePoints(window.videoFocus);
        $deferTimePoint.done(function(data){
            if(data && data['content']) {
                var points = data['content']['items'];
                points.sort(function(a,b){
                    return parseInt(a['intoTime']) > parseInt(b['intoTime']);
                });
                var hasZeroPoint = false;
                if(points.length > 0 && points[0]['intoTime'] == 0){
                    hasZeroPoint = true;
                }
                if(!hasZeroPoint){
                    points.unshift({
                        title: "时间轴标题",
                        intoTime: 0,
                        type:"0",
                        content: "会议开始"
                    })
                }
                for(var i = 0,max = points.length;i<max;i++){
                    if(points[i]['intoTime'] == 0){
                        hasZeroPoint = true;
                    }
                    if(i < points.length -1){
                        points[i]['intoTime'] = parseInt(points[i+1]['intoTime']);
                    }else{
                        points[i]['intoTime'] = window.videoTotalLong;
                    }
                }
                timeLineVM.addPoints(points);
                window.TimeLineLoad();
                var timeVar = {
                    content:'timeline1'
                };
                TimeLineAdapter(timeVar);
            }
        });
    },
    timeLinePop:function(index){
        var point = timeLineVM.points()[index];
        if(point['type'] == 2){
            //voteVM.currentVoteSrc(point['content']['pollUrl']);
            //var src=smarket.Config().questionnairePCUrl + questionnaireData["questionaryId"];
            //voteVM.currentVoteSrc(window.location.protocol + '//' + window.location.host +  '/Tangsenlutoutest/SmarketView/Questionnaire/PC/questionnaire.html?questionaireId=');
            voteVM.currentVoteSrc(smarket.Config().pollPCUrl);
            voteVM.currentVoteId(point['content']['pollId']);
            voteVM.visible(true);
            window.videoPause();
        }
        if(point['type'] == 3){
            adVM.content(point['content']);
            adVM.visible(true);
            window.videoPause();
        }
    }
};