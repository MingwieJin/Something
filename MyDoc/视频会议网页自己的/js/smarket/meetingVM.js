//头部信息
var HeadVM = function () {
    var self = this;
    self.title = ko.observable('会议标题');
    self.sponsor = ko.observable('主办方');
    self.logoMapId = ko.observable('../images/default_logo.png');
    self.logined = ko.observable(false);//是否登录
    self.needLogin = ko.observable(true);//是否需要报名
    self.isRegistration = ko.observable(false);//当前用户是否已经报名
    self.trailer = ko.observable(false);//可以试看
    self.canJoin = ko.pureComputed(function () {
        if ((self.logined() && self.isRegistration()) || self.trailer() || !self.needLogin()) {//登录且报名||可以试看||免登录
            return true;
        }
        else {
            return false;
        }
    });
};
var headVM = new HeadVM();

//在线人数
//var UserOnlineVM = function () {
//    var self = this;
//    self.userOnline = ko.observable(0);
//};
//var userOnlineVM = new UserOnlineVM();

//在线问答维护
var QA = function (qa) {
    var self = this;
    /*self.qid = qa.qid;
     self.aid = qa.aid;
     self.question = qa.question;
     self.submitor = qa.submitor;
     self.submitorId = qa.submitorId;
     self.answer = qa.answer;
     self.answerBy = qa.answerBy;
     self.submitTime = qa.submitTime;
     self.answerTime = qa.answerTime;
     self.qaowerID = qa.qaowerID;
     self.published =ko.observable(qa.published);
     self.group=qa.group;
     self.clientType=qa.clientType;*/

    /*self.qUserId=qa.qUserId;
     self.qName=qa.qName;
     self.qMessage=qa.qMessage;
     self.aId=qa.aId;*/

    //new qaModel
    self.pkId = qa.pkId;//主键
    self.qId = qa.qId;//问题id
    self.qUserId = qa.qUserId;//用户id
    self.qName = qa.qName;//姓名
    self.qMessage = qa.qMessage;//问题内容
    self.qTime = qa.qTime;//提问时间
    self.aId = qa.aId;//回答id
    self.aUserId = qa.aUserId;//嘉宾id
    self.aTime = qa.aTime;//回复时间
    self.aName = qa.aName;//姓名
    self.aMessage = qa.aMessage;//回复内容
    self.isRelease = qa.isRelease;//是否发布true/false
    self.isAnswer = qa.isAnswer;//是否回复true/false
    self.isSubject = qa.isSubject;//是否星标 true/false
    self.assignTo = qa.assignTo;//设置嘉宾ID id,id,id..
    self.isAssignGuest = qa.isAssignGuest;//true/false
    self.createTime = qa.createTime;//本条记录生成时间
    self.clientType = qa.clientType;
};
var QARemove = function (qaRemove) {
    var self = this;
    self.id = qaRemove.id;
};
var QAVM = function () {
    var self = this;
    self.qaList = ko.observableArray([]);
    self.limitNum = ko.observable(0);
    self.visiableShowQaMore = ko.computed(function () {
        if (self.qaList().length > self.limitNum()) {
            return true;
        }
        else {
            return false;
        }
    }, self);
    self.showMoreQa = function () {
        self.limitNum(self.limitNum() + 100);
    };
    //event Qa
    self.qaAdd = function (question) {
        var qaArray = self.qaList();
        if (question) {
            if (qaArray.length == 0) {
                question.aTime = switchQAShortTime(question.aTime);
                question.qTime = switchQAShortTime(question.qTime);
                self.qaList.push(question);
            } else {
                var qaListDown = self.qaList();
                for (var i in qaListDown) {
                    if (qaListDown[i].pkId == question.pkId) {
                        qaListDown.splice(i, 1);
                    }
                }
                question.aTime = switchQAShortTime(question.aTime);
                question.qTime = switchQAShortTime(question.qTime);
                qaListDown.push(question);

                qaListDown.sort(this.listCompare);
                self.qaList(qaListDown);
            }
        }
    };
    self.qaAddPublished = function (questions) {
        self.qaList([]);
        if (questions) {
            //var qaArray = self.qaList();
            for (var i = 0; i < questions.length; i++) {
                var qModel = questions[i];
                if (typeof(questions[i]) == "string") {
                    qModel = JSON.parse(questions[i]);
                }
                qModel.aTime = switchQAShortTime(qModel.aTime);
                qModel.qTime = switchQAShortTime(qModel.qTime);
                self.qaList.push(qModel);
            }
        }
        //console.log("QA列表======");
        //console.log(self.qaList());
        //console.log("QA列表======");
    };
    self.myQaAdd = function (questions) {
        if (questions) {
            for (var i = 0, max = questions.length; i < max; i++) {
                var qModel = questions[i];
                if (typeof(questions[i]) == "string") {
                    qModel = JSON.parse(questions[i]);
                }
                qModel.aTime = switchQAShortTime(qModel.aTime);
                qModel.qTime = switchQAShortTime(qModel.qTime);
                if (!self.checkQaExistsQid(qModel.qid)) {
                    self.qaList.push(qModel);
                }

            }
        }
    };
    self.qaAddModel = function (question) {
        if (question) {
            if (typeof(question) == "string") {
                question = JSON.parse(question);
            }
            //var qaArray = self.qaList();
            question.aTime = switchQAShortTime(question.aTime);
            question.qTime = switchQAShortTime(question.qTime);

            self.qaList.push(question);
        }

    };
    self.qaAddAnswerModel = function (question, callback) {
        if (question) {
            if (typeof(question) == "string") {
                question = JSON.parse(question);
            }
            var qaArray = self.qaList();
            //question.answerTime = switchQAShortTime(question.answerTime);
            //question.submitTime = switchQAShortTime(question.submitTime);
            for (var i = 0, max = qaArray.length; i < max; i++) {
                if (qaArray[i].pkId == question.pkId && (qaArray[i].aMessage == "" || qaArray[i].aMessage == null)) {
                    self.qaList.splice(i, 1);
                    i = 0;
                    max = qaArray.length;
                }
            }
            self.qaList.push(question);
            if (typeof callback == "function") {
                callback();
            }
        }
    };
    self.qaRemoveByQid = function (pkId, qUserId) {
        if ($.cookie('smarketMember_' + window.memberSchemaId).memberId != qUserId) {
            for (var i = 0, max = self.qaList().length; i < max; i++) {
                if (self.qaList()[i].pkId == pkId) {
                    self.qaList.splice(i, 1);
                    break;
                }
            }
        }
    };
    self.qaRemoveByAid = function (pkId) {
        var qaArray = self.qaList();
        for (var i = 0, max = qaArray.length; i < max; i++) {
            if (qaArray[i].pkId == pkId) {
                self.qaList.splice(i, 1);
                break;
            }
        }
    };
    self.checkQaExistsQid = function (qid) {
        var qaArray = self.qaList();
        for (var i = 0, max = qaArray.length; i < max; i++) {
            if (qaArray[i].qId == qid) {
                return true;
            }
        }
        return false;
    };
    self.listDown = function (data) {
        var list = [];
        var listSize = data.length;
        for (var i = listSize - 1; i >= 0; i--) {
            list.push(data[i]);
        }
        return list;
    };
    //徐艳茹加  按提交时间 升序
    self.listCompare = function (obj1, obj2) {
        var val1 = obj1.createTime;
        var val2 = obj2.createTime;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
};
var qaVM = new QAVM();
var allQaVM = new QAVM();
var myQaVM = new QAVM();
//用户维护
var User = function (user) {
    var self = this;
    self.id = user.id;
    self.name = user.name;
    self.email = user.email;
};

var UserListVM = function () {
    var self = this;
    self.userList = ko.observableArray([]);

    self.limitNum = ko.observable(0);
    self.visiableShowMore = ko.computed(function () {
        if (self.userList().length > self.limitNum()) {
            return true;
        }
        else {
            return false;
        }
    }, self);
    self.showMoreUser = function () {
        self.limitNum(self.limitNum() + 100);
    };

    self.userIdList = ko.observableArray([]);
    self.userJoin = function (users) {
        //var userArray = self.userList();
        for (var i = 0, max = users.length; i < max; i++) {
            if (self.userIdList.indexOf(users[i].id) < 0) {
                self.userList.push(new User({
                    id: users[i].id,
                    name: decodeURIComponent(users[i].name),
                    email: users[i].email
                }));
                self.userIdList.push(users[i].id);
            }
        }
        //self.userOnline(self.userList().length)
    };
    self.userLeave = function (userId) {
        var userArray = self.userList();
        for (var k = 0, max0 = userArray.length; k < max0; k++) {
            if (userArray[k].id == userId) {
                self.userList.splice(k, 1);
                break;
            }
        }
        var userIdArray = self.userIdList();
        for (var i = 0, max = userIdArray.length; i < max; i++) {
            if (userIdArray[i] == userId) {
                self.userIdList.splice(i, 1);
                break;
            }
        }
        //self.userOnline(self.userList().length)
    };
    self.userOnline = ko.observable(0);
};
var userListVM = new UserListVM();

//会议日程start
var Agenda = function (agenda) {
    var self = this;
    self.title = agenda.theme;
    self.year = agenda.year;
    self.month = agenda.month;
    self.date = agenda.date;
    self.startTime = switchQAShortTime(agenda.startTime * 1000);
    self.timeRange = agenda.timeRange;
    self.speakers = agenda.Speakers;
    self.duration = (agenda.endTime - agenda.startTime) / 60;
};

var AgendaGroup = function (date, agendaArray) {
    var self = this;
    self.date = ko.observable(date);
    self.agendaList = ko.observableArray([]);
    for (var i = 0,max = agendaArray.length;i<max;i++) {
        self.agendaList.push(new Agenda(agendaArray[i]));
    }
};

var AgendaVM = function () {
    var self = this;
    //self.startNYR = ko.observable("");  //徐艳茹新加   得到会议信息 年月日
    self.agendaGroups = ko.observableArray([]);
    self.agendaReload = function (agendaArray, callback) {
        if (agendaArray && agendaArray.length) {
            for (var i = 0,max = agendaArray.length;i < max;i++) {
                var t = new Date(parseInt(agendaArray[i]['startTime']) * 1000);
                agendaArray[i]['year'] = t.getFullYear().toString();
                var month = t.getMonth() + 1;
                agendaArray[i]['month'] = month < 10 ? ('0' + month.toString()) : month.toString();
                var date = t.getDate();
                agendaArray[i]['date'] = date < 10 ? ('0' + date.toString()) : date.toString();
                agendaArray[i]['fullDateInt'] = parseInt(agendaArray[i]['year'] + agendaArray[i]['month'] + agendaArray[i]['date']);
            }
            agendaArray.sort(function (a, b) {
                return a['fullDateInt'] - b['fullDateInt'];
            });
            var tempGroups = [];
            var index = agendaArray[0]['fullDateInt'];
            for (var i = 0,max = agendaArray.length;i < max;i++) {
                if (agendaArray[i]['fullDateInt'] == index) {
                    tempGroups.push(agendaArray[i]);
                }
                else {
                    self.agendaGroups.push(new AgendaGroup(index, tempGroups));
                    tempGroups = [];
                    index = agendaArray[i]['fullDateInt'];
                    tempGroups.push(agendaArray[i]);
                }
            }
            self.agendaGroups.push(new AgendaGroup(index, tempGroups));
        }
        if (callback && typeof callback == "function") {
            callback();
        }
    };
};
var agendaVM = new AgendaVM();

//嘉宾介绍start
var Speaker = function (speaker) {
    var self = this;
    self.name = speaker.name;
    //self.duty = speaker.duty;
    self.description = speaker["intro"];
    //self.pictureUrl = speaker["imageUrl"].indexOf("images/default-guest.png") > -1 ? ('../' + speaker["imageUrl"]) : speaker["imageUrl"];
    self.pictureUrl = !speaker["imageMapId"] ? '../images/img-guest-01.jpg' : window.configs.sbaseUrl + "index.php?mappingId=" + speaker["imageMapId"];
    self.enterprise = speaker["enterprise"];
    self.duty = speaker["duty"];
};
var SpeakerVM = function () {
    var self = this;
    self.speakerList = ko.observableArray([]);
    self.showPicUrl = ko.observable('');
    self.showName = ko.observable('');
    self.showEnterprise = ko.observable('');
    self.showDuty = ko.observable('');
    self.showInfo = ko.observable('');
    self.IsShowInfo = ko.observable(false);       // 是否显示 详细框
    self.isMore = ko.observable(false);             //显示更多按钮 是否显示
    self.showInfoMore = ko.observable('');
    self.spearkMsgCss = ko.observable('guest-introduce');
    self.focus = ko.observable(0);
    self.speakerReload = function (speakerArray, callback) {
        //for(var i=0;i<speakerArray.length;i++){
        //    self.speakerList.push(new Speaker(speakerArray[i]));
        //}
        for (var i = 0,max = speakerArray.length; i<max;i++) {
            self.speakerList.push(new Speaker(speakerArray[i]));
        }
        if(window.location.href.indexOf('webinarId=659') > -1){
            self.speakerList.reverse();
        }
        if (typeof callback == "function") {
            callback();
        }
    };
};
var speakerVM = new SpeakerVM();

//会议简介start
var DescriptionVM = function () {
    var self = this;
    self.description = ko.observable("");
    self.showAll = ko.observable(false);
    self.descriptionReload = function (description, callback) {
        self.description(description);
        if (callback && typeof callback == "function") {
            callback();
        }
    };
};
var descriptionVM = new DescriptionVM();

//资料下载start

var Resource = function (resource, domain) {
    var self = this;
    self.ext = resource["ext"];
    if (domain) {
        self.title = resource["name"];
        self.href = domain + "?mappingId=" + resource["mapId"];
        self.size = resource["size"];
    }
    else {
        self.fileUrl = resource["fileUrl"];
        self.name = resource['name'];
        self.extIco = '';
        switch (self.ext) {
            case 'doc':
            case 'docx':
                self.extIco = 'doc';
                break;
            case 'xls':
            case 'xlsx':
                self.extIco = 'exl';
            default :
                self.extIco = 'pdf';
                break;
        }
    }
};
var ResDownloadFileVM = function () {
    var self = this;
    self.files = ko.observableArray([]);
    self.visible = ko.observable(false);
    self.resourceReload = function (fileList, domain, callback) {
        for (var i in fileList) {
            if (fileList[i].ext == '文件夹') {
                continue;
            } else {
                self.files.push(new Resource(fileList[i], domain))
            }
        }
        //for(var i=0;i<fileList.length;i++){
        //    self.files.push(new Resource(fileList[i],domain))
        //}
        if (callback && typeof callback == "function") {
            callback();
        }
    };
};
var resDownloadFileVM = new ResDownloadFileVM();

//文字直播start
var TextWebcast = function (textWebcast) {
    var self = this;
    self.content = textWebcast.content;
    self.time = textWebcast.time;
};
var TextWebcastVM = function () {
    var self = this;
    self.twList = ko.observableArray([]);
    self.twAdd = function (textWebcast) {
        self.twList.unshift(new TextWebcast(textWebcast));
    }
};
var textWebcastVM = new TextWebcastVM();
//-----------------------投票----------------------//
var Vote = function (vote) {
    var self = this;
    self.voteId = vote["voteId"];
    self.src = vote["src"];
};
var VoteVM = function () {
    var self = this;
    self.currentVoteId = ko.observable(0);
    self.currentVoteSrc = ko.observable("");
    self.voteArray = ko.observableArray([]);
    self.visible = ko.observable(false);
    self.voteReload = function (votes) {
        self.voteArray([]);
        for (var i in votes) {
            self.voteArray.push(new Vote(votes[i]));
        }
    };
    self.setCurrentVote = function (voteId) {
        self.currentVoteId(voteId);
        var votes = self.voteArray();
        for (var i in votes) {
            if (votes[i].voteId == voteId) {
                self.currentVoteSrc(votes[i].src);
            }
        }
    };
    self.showVote = function () {
        self.visible(true);
    };
    self.hideVote = function () {
        self.visible(false);
    };
};
var voteVM = new VoteVM();
/*---时间轴信息展视---*/
var AdVM = function () {
    var self = this;
    self.visible = ko.observable(false);
    self.content = ko.observable('');
}
var adVM = new AdVM();
//抽奖维护
var Lucker = function (lucker, memberId, callback) {
    var self = this;
    self.memberId = lucker.memberId;
    self.name = lucker.name;
    self.email = lucker.email;
    if (memberId == self.memberId) {
        if (callback && typeof callback == "function") {
            callback()
        }
    }
};
var LuckyDrawGroup = function (luckyDrawGroupData, memberId, callback) {
    var self = this;
    self.name = luckyDrawGroupData.name;
    self.awardName = luckyDrawGroupData.awardName;
    self.orderNum = luckyDrawGroupData.orderNum;
    self.members = ko.observableArray([]);
    for (var i in luckyDrawGroupData.members) {
        ////console.log(luckyDrawGroupData.members);
        self.members.push(new Lucker({
            memberId: luckyDrawGroupData.members[i]["memberId"],
            name: luckyDrawGroupData.members[i]["realName"],
            email: luckyDrawGroupData.members[i]["email"]
        }));
        if (memberId.toString() && luckyDrawGroupData.members[i]["memberId"] == memberId) {
            if (callback && typeof callback == "function") {
                callback(self.awardName);
            }
        }
    }
};
var LuckDrawVM = function () {
    var self = this;
    self.imluck = ko.observable(false);
    self.myAward = ko.observable('');
    self.myMemberId = ko.observable(0);
    self.luckDrawGroups = ko.observableArray([]);
    self.luckDrawLoad = function (luckDrawData) {
        self.luckDrawGroups([]);
        for (var i in luckDrawData) {
            self.luckDrawGroups.push(new LuckyDrawGroup(luckDrawData[i], self.myMemberId(), function (award) {
                if (award) {
                    self.myAward(award);
                    self.imluck(true);
                }
            }));
        }
        self.luckDrawGroups.sort(function compare(a, b) {
            return a.orderNum > b.orderNum;
        });
    };
};
var luckDrawVM = new LuckDrawVM();

//问卷调查地址
var QuestionnaireVM = function () {
    var self = this;
    self.src = ko.observable('javascript:void(0);');
};
var questionnaireVM = new QuestionnaireVM();

var ChapterItem = function (chapter) {
    var self = this;
    self.doc = chapter.doc;
    self.starttimestamp = chapter.starttimestamp;
    self.stoptimestamp = chapter.stoptimestamp;
    self.title = chapter.title;
    self.focus = ko.observable(false);
    var startTime = self.starttimestamp / 1000;
    var second = parseInt(startTime % 60);
    self.startimeShort = parseInt(startTime / 60) + ':' + (second > 9 ? second.toString() : (0 + second.toString()));
};

var ChapterVM = function () {
    var self = this;
    self.chapterList = ko.observableArray([]);
    self.addList = function (list) {
        self.chapterList([]);
        for (var i = 0,max = list.length;i < max ;i++) {
            self.chapterList.push(new ChapterItem(list[i]));
        }
    };
};
var chapterVM = new ChapterVM();

var Video = function (video) {
    var self = this;
    self.description = video.description;
    self.mapId = video.mapId;
    self.src = self.mapId ? smarket.Config().api.ungateway.sbaseUrl + "?mappingId=" + self.mapId : '../images/videoList-item-img-default.jpg';
    self.orderNum = video.orderNum;
    self.tenantId = video.tenantId;
    self.times = video.times;
    self.title = video.title;
    self.videoId = video.videoId;
    self.videoOrigin = video.videoOrigin;
    self.webinarId = video.webinarId;
    self.isFocus = ko.observable(false);
};

var VideoListVM = function () {
    var self = this;
    self.videoList = ko.observableArray([]);
    self.addList = function (videoList) {
        for (var i in videoList) {
            self.videoList.push(new Video(videoList[i]));
        }
        self.videoList.sort(function (a, b) {
            return parseInt(a['orderNum']) - parseInt(b['orderNum']);
        });
    };
    self.setFocus = function (focusIndex) {
        var videoList = self.videoList();
        for(var i = 0,max = videoList.length;i<max;i++){
            if (i == parseInt(focusIndex)) {
                videoList[i].isFocus(true);
            }
            else {
                videoList[i].isFocus(false);
            }
        }
        //for (var i in videoList) {
        //    if (i == focusIndex) {
        //        videoList[i].isFocus(true);
        //    }
        //    else {
        //        videoList[i].isFocus(false);
        //    }
        //}
    }
};

var videoListVM = new VideoListVM();

//时间轴维护

var TimePoint = function (timePoint) {
    var self = this;
    self.title = timePoint.title;
    self.intoTime = timePoint.intoTime;
    self.interval = timePoint.interval;
    self.type = timePoint.type;
    self.content = timePoint.content;
    self.resources = ko.observableArray([]);
    if (self.type == 1) {
        var resources = timePoint.content;
        for (var i in resources) {
            self.resources.push(new Resource(resources[i]));
        }
    }

};

var TimeLineVM = function () {
    var self = this;
    self.points = ko.observableArray([]);
    self.addPoints = function (timePoints) {
        self.points([]);
        var interval = 0;
        for (var i = 0, max = timePoints.length; i < max; i++) {
            interval = timePoints[i].intoTime - (i > 0 ? timePoints[i - 1].intoTime : 0);
            timePoints[i]['interval'] = interval / 60;
            self.points.push(new TimePoint(timePoints[i]));
        }
    };
}

var timeLineVM = new TimeLineVM();

$(function () {
    //头部信息绑定
    var headElement = document.getElementById("headVM");
    if (headElement) {
        ko.applyBindings(headVM, headElement);
    }
    var titleElement = document.getElementById("title");
    if (titleElement) {
        ko.applyBindings(headVM, titleElement);
    }
    var footElement = document.getElementById("footVM");
    if (footElement) {
        ko.applyBindings(headVM, footElement);
    }
    //会议日程绑定
    var agendaElement = document.getElementById('agendaVM');
    //var timelineElement = document.getElementById('TimeLine');
    if (agendaElement) {
        ko.applyBindings(agendaVM, agendaElement);
        //if (timelineElement) {
        //    ko.applyBindings(agendaVM, timelineElement);
        //}
    }
    //嘉宾介绍绑定
    var speakerElement = document.getElementById('slideBox');
    if (speakerElement) {
        ko.applyBindings(speakerVM, speakerElement);
    }
    //会议简介绑定
    var descriptionElement = document.getElementById('descriptionVM');
    if (descriptionElement) {
        ko.applyBindings(descriptionVM, descriptionElement);
    }
    ////在线人数绑定
    //var userOnlineElement = document.getElementById('userOnlineVM');
    //if (userOnlineElement) {
    //    ko.applyBindings(userOnlineVM, userOnlineElement);
    //}
    //用户列表绑定
    var userListElement = document.getElementById('userListVM');
    if (userListElement) {
        ko.applyBindings(userListVM, userListElement);
    }
    //在线问答绑定 
    var QAVMElement = document.getElementById('tab-b-top-2');
    if (QAVMElement) {
        ko.applyBindings(qaVM, QAVMElement);
    }
    //我的问答绑定
    var myQAVMElement = document.getElementById('tab-b-top');
    if (myQAVMElement) {
        ko.applyBindings(myQaVM, myQAVMElement);
    }
    //在线所有问答绑定
    var allQAVMElement = document.getElementById('ulAllQA');
    if (allQAVMElement) {
        ko.applyBindings(allQaVM, allQAVMElement);
    }
    ////在线投票
    var voteVMElement = document.getElementById('voteVM');
    if (voteVMElement) {
        ko.applyBindings(voteVM, voteVMElement);
    }
    ////在线投票
    var adVMElement = document.getElementById('adVM');
    if (adVMElement) {
        ko.applyBindings(adVM, adVMElement);
    }
    //文字直播
    var textWebcastElement = document.getElementById('textWebcastVM');
    if (textWebcastElement) {
        ko.applyBindings(textWebcastVM, textWebcastElement);
    }
    //资料下载
    var downloadFilesElement = document.getElementById('resDownLoadVM');
    if (downloadFilesElement) {
        ko.applyBindings(resDownloadFileVM, downloadFilesElement);
    }
    //获奖名单绑定
    //var luckerListElement = document.getElementById('divVMLuckerList');
    //if (luckerListElement) {
    //    ko.applyBindings(luckerListVM, luckerListElement);
    //}
    //抽奖绑定
    var luckDrawElement = document.getElementById('divVMLuckerList');
    if (luckDrawElement) {
        ko.applyBindings(luckDrawVM, luckDrawElement);
    }
    ////点播章节
    //var videoChapterListElement = document.getElementById('videoChapterList');
    //if (videoChapterListElement) {
    //    ko.applyBindings(videoModel, videoChapterListElement);
    //}
    //调查问卷
    var questionnaireElement = document.getElementById('questionnaireVM');
    if (questionnaireElement) {
        ko.applyBindings(questionnaireVM, questionnaireElement);
    }
    //视频列表信息
    var videoListElement = document.getElementById('videoListVM');
    if (videoListElement) {
        ko.applyBindings(videoListVM, videoListElement);
    }
    //时间点信息
    var timeLineElement = document.getElementById('TimeLine');
    if (timeLineElement) {
        ko.applyBindings(timeLineVM, timeLineElement);
    }
    //章节信息
    var chapterElement = document.getElementById('chapterVM');
    if (chapterElement) {
        ko.applyBindings(chapterVM, chapterElement);
    }
});