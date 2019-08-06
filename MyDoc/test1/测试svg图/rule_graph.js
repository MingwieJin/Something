var Mydata = {
	"work": {
		"name": "199",
		"uuid": "C90B017F-B165-54AC-BE80-9C95BA862D70",
		"process": 100,
		"state": "track",
		"fullbackup": [],
		"threads": [{ // 日志分析
			"num": 0,
			"time": "2019-07-16 13:15:19",
			"breakpoint": "1282.67215",
			"lwn": "1282.97753",
			"state": -4021
		}],
		"txn": {  // 事物分析
			"mem": "120 Bytes",
			"mempeak": "136.2 KB",
			"irp": 27674,
			"drp": 27664,
			"urp": 0,
			"qmi": 0,
			"txn": 29305,
			"state": 0
		}
	},
	"back": {
		"name": "200",
		"uuid": "83902265-1D1A-ACB8-F185-C41055376887",
		"state": "track",
		"process": 100,
		"fullbackup": [],
		"loaderInfo": {  // 装载
			"actfail": 11,
			"actload": 55378,
			"txndelay": "0ms",
			"maxdelay": "0ms",
			"scnTime": "2019-07-15 22:15:12",
			"compress_rate": "100%"
		},
		"loadThread": [{ // 线程 队列长度
			"num": 0,
			"size": 0
		}]
	},
	"relay": []
};

var Mydata2 = {
          'work': {
          'name': '199-db',
            'uuid': '9A1DF444-68C3-C16B-6FC8-21E8A28BA860',
            'process': 72.22,
            'state': 'dump',
            'fullbackup': [],
            'threads': [{
            'num': 0,
            'time': '2019-07-18 10:47:45',
            'breakpoint': '1285.16940',
            'lwn': '1285.16940',
            'state': 0
          }],
            'txn': {
            'mem': '0 Bytes',
              'mempeak': '828 Bytes',
              'irp': 19138,
              'drp': 19128,
              'urp': 0,
              'qmi': 0,
              'txn': 20222,
              'state': 0
          }
        },
          'back': {
          'name': '200-db',
            'uuid': '5B1295F1-25B6-7D95-34AD-848F43DC6235',
            'state': 'dump',
            'process': 94.44,
            'fullbackup': [{
            'line': 0,
            'name': 'I2.COMDATA',
            'tunnel': '76.7 MB'
          }],
            'loaderInfo': {
            'actfail': 0,
              'actload': 0,
              'txndelay': '0ms',
              'maxdelay': '0ms',
              'scnTime': '1969-12-31 16:00:00',
              'compress_rate': 0
          },
          'loadThread': []
        },
          'relay': []
        };

var lang = {};


ajaxGetGraphData();


function ajaxGetGraphData() {
	updateGraph(Mydata2);
//  // var params = {"rule_uuid":'69FFE8F9-11FE-D91A-1D2A-4071E6277027'};
//  try {
//      $.ajax({
//          url : graphDataJaxUrl,
//          data : {},
//          type : 'get',
//          dataType : 'json',
//          success : function(data) {
//              updateGraph(data);
//          }
//      });
//  } catch (e) {
//      console.log(e);
}

function updateGraph(data) {
    var work = data['work'];
    var back = data['back'];

    // 计算高度
    var fullbackupLength = work['fullbackup'].length > back['fullbackup'] ? work['fullbackup'].length : back['fullbackup'].length;
    
   

    if (work['state'] !== 'track'&& back['state'] !== 'track') { // 如果两个都不是track才进来

        // 计算框的高度
       if (fullbackupLength > 2) {
//     	console.log(fullbackupLength)
           var fullBackupHeight = 130 + (fullbackupLength-2) * 30;
           fullBackupHeight = fullBackupHeight > 300 ? 300 : fullBackupHeight;
           var fullBackupMarginTop = 40 - (fullbackupLength-2) * 9;
            fullBackupMarginTop = fullBackupMarginTop < -20 ? -20 : fullBackupMarginTop;
           var titlePaddingTop = 24 + (fullbackupLength-2) * 12;
           var loadInfoBelowMargin = 115 - (fullbackupLength-2)*5;
           loadInfoBelowMargin = loadInfoBelowMargin < 50 ? 50 : loadInfoBelowMargin;
           $(".extract-table").css({'height':fullBackupHeight+"px",'margin-top':fullBackupMarginTop + 'px'});
           $(".extract-table .aside-title").css({'padding-top':titlePaddingTop + 'px'});
           $(".load-info-below-box").css({'margin-top':loadInfoBelowMargin});
       }

        // 抽取进度
        $("#range-extract").val(work['process']);
        $(".tbody-extract").html(generateTBodyHtml(work['fullbackup'],fullbackupLength)); // 抽取详情

        /* 备端  */
        // 装载进度
        $("#range-handle").val(back['process']);
        // 装载详情
        $(".tbody-handle").html(generateTBodyHtml(back['fullbackup'],fullbackupLength));

        $(".track-hidden").show();
        $(".db-box").removeClass('track-hidden-box').addClass('track-box');

        $("[data-toggle='tooltip']").tooltip();

    } else {
        $(".track-hidden").hide();
        $(".db-box").removeClass('track-box').addClass('track-hidden-box');
    }

    // 源端名称
    $(".src-db-name").html(work['name']);

    // 事物分析
    var workTxn = work['txn'];
//  如果事物分析的state不为0,框换成错误的红色框
    (parseInt(workTxn['state']) !== 0)
        ? $(".thing-analysis").removeClass('result-box').addClass('error-result-box')
        : $(".thing-analysis").removeClass('error-result-box').addClass('result-box');
    assignValueForEle(workTxn,'');

    // 日志分析
    generateLogThreadHtml(work['threads']);

    // 中继
    if (data['relay'].length !== 0) {

        $(".relay .container").hide();
        $(".topo-box").removeClass('without-relay');
        $("#loader").hide();
        $(".relay-content").show();

        var relay = data['relay'];
        assignValueForEle(relay,'relay-');

        (parseInt(relay['state']) !== 0)
            ? $(".relay").removeClass('result-box').addClass('error-result-box')
            : $(".relay").removeClass('error-result-box').addClass('result-box');

    } else {

        $(".relay-content").hide();
        $(".relay").removeClass('result-box').removeClass('error-result-box');
        $(".relay .container").show();
        $(".topo-box").addClass('without-relay');

    }
    // 备端名称
    $(".tar-db-name").html(back['name']);
    // 装载
    assignValueForEle(back['loaderInfo'],'');

    //线程
    var loadThread = back['loadThread'];
    $(".tbody-loader-thread").html(generateLoadThreadHtml(loadThread));
}

function generateLogThreadHtml(data) {
    var length = data.length;
    var html = '';
    if (length>1) {
        var height = 200 + (length-1)*85 + 'px';
        var marginTop = -(length-2)*30 + 'px';
        var asideTitlePaddingTop = 60 + (length-1)*45 + 'px';
        $(".thread-table").css({'height':height,'margin-top':marginTop});
        $(".thread-table .aside-title").css({'padding-top':asideTitlePaddingTop});
    } else {
        $(".thread-table .aside-title").css({'padding-top':"45px"});
    }

    if (length === 0) {
        html = '<p class="text-center have-no-data">'+lang['nothing']+'</p>';
        $(".log-thread-box").html(html);
        return;
    }

    var pMargin = 10 - (length-2)*4;
    pMargin = pMargin > 0 ? pMargin : 2;
    var pEle = '<p class="desc-text" style="margin: ' +pMargin+'px 10px">';
    for (var i=0; i<length; i++) {
        var divEle = (parseInt(data[i]['state']) !== 0) ? '<div class="thread-error">' : "<div>";
        html += divEle + pEle + '<span class=""> ' + lang['thd'] + '   ' + data[i]['num'] +' </span> </p>';
        html += pEle + '<span>'+lang['breakpoint']+'</span> <span class="desc-value">'+data[i]['breakpoint']+'</span></p>';
        html += pEle + '<span>LWN</span> <span class="desc-value">'+data[i]['lwn']+'</span></p>';
        html += pEle + '<span>'+lang['time']+'</span> <span class="desc-value">'+data[i]['time']+'</span></p>' + '</div>';
        if (i !== length-1) {
            html += '<hr>';
        }
    }
    $(".log-thread-box").html(html);
}

//封装名字
function assignValueForEle(data,prefix) {
    for (var name  in data) {
        var className = '.' + prefix + name;
        if ($(className).length > 0) {
            $(className).html(data[name] ?data[name] : 0);
        }
    }
}

function generateTBodyHtml(data,maxLen) {
    if (data.length == 0) {
        return '<tr><td colspan="3">'+lang['nothing']+'</td></tr>';
    }
    var html = '';
    var length = data.length;
    var lineHeight = 24 - maxLen;
    lineHeight = lineHeight < 14 ? 14 : lineHeight;
    var tdHtml = '<td class=""  style="line-height: '+lineHeight+'px !important">';
    for (var i=0; i < length; i++) {
        html += '<tr>' + tdHtml +data[i]['tunnel']+"</td>";
        html += tdHtml + '<span class="line-limit-length limit-width"  data-toggle="tooltip" title="'+data[i]['name']+'">' +data[i]['name']+"</span></td>";
        html += tdHtml + '<span class="line-limit-length"  data-toggle="tooltip" title="'+data[i]['line']+'"  style="display: inline-block;max-width: 60px">' + data[i]['line'] +"</span></td></tr>";
    }
    return html;
}


function generateLoadThreadHtml(data) {
    var length = data.length;
    if (length === 0) {
        return '<tr><td colspan="3">'+lang['nothing']+'</td></tr>';
    }
    if (2 < length) {
        var step = 20;
        if (length > 10) { step = 22 ;}
        var queueHeight = 100 + (length-2) * step;
        queueHeight = queueHeight > 480 ? '480' : queueHeight;
        var queueMarginTop = 100 - (queueHeight-100)/2;
        $(".queue").css({"height":queueHeight + 'px','margin-top':queueMarginTop + 'px'});
    }

    var html = '';
    var lineHeight = 12;
    if (length>17) lineHeight = 10;
    var tdHtml = '<td  style="line-height: '+ lineHeight +'px !important;">';
    for (var i=0; i<length; i++) {
        html += '<tr>' + tdHtml + data[i]['num'] + '</td>';
        html += tdHtml + data[i]['size'] + '</td></tr>';
    }
    return html;
}

function overShow() {

    var showDiv = document.getElementById('showDiv');
    console.log(event.clientX);
    showDiv.style.left = event.clientX + "px";
    showDiv.style.top = event.clientY + "px";
    showDiv.style.display = 'block';

    showDiv.innerHTML = '';
}

function outHide() {
    var showDiv = document.getElementById('showDiv');
    showDiv.style.display = 'none';
    showDiv.innerHTML = '';
}


var CircularProgress = {

    canvasWidth : 180,
    canvasHeight : 180,
    waveWidth : 0.015,  //波浪宽度,数越小越宽
    waveHeight : 6,     //波浪高度,数越大越高
    waveSpeed : 0.07,  //波浪速度，数越大速度越快
    waveXOffset : 0 , //波浪x偏移量
    circleCenter : 0,
    circleRadius : 0,
    ctx : null,
    isDrawCircled : false,
    sX : 0,
    sY : 0,
    axisLength : 0,
    rangeValue : 0,
    nowRange : 20,
    range : null,
    baseRange : 20,
    textRange : 0,

    init : function(id,rangeId) {
        var canvas = document.getElementById(id);
        this.ctx = canvas.getContext('2d');
        this.range = document.getElementById(rangeId);
        //range控件信息
        this.rangeValue = this.range.value;

        //画布属性
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var lineWidth = 2;
        //圆属性
        this.circleCenter = this.canvasHeight / 2; //圆心
        this.circleRadius = this.circleCenter - 16 * lineWidth; //圆半径
        //Sin 曲线属性
        this.sX = 0;
        this.sY = this.canvasHeight / 2;
        this.axisLength = this.canvasWidth; //轴长
        this.ctx.lineWidth = lineWidth;
        var _this = this;

        (function render() {

            _this.ctx.clearRect(0, 0, _this.canvasWidth,_this.canvasHeight);
            _this.rangeValue = parseFloat(_this.range.value);

            if(_this.isDrawCircled === false){
                _this.drawCircle();
            }

            if (_this.textRange < _this.rangeValue) {
                _this.textRange += 1;
                _this.nowRange += 0.6;
            }
            if (_this.textRange > _this.rangeValue) {
                _this.textRange -= 1;
                _this.nowRange -= 0.6;
            }
            if(Math.abs(_this.textRange-_this.rangeValue) <= 1) {
                _this.textRange = _this.rangeValue;
                _this.nowRange = _this.baseRange +  0.6 * _this.rangeValue;
            }
            _this.drawSin(_this.waveXOffset);
            _this.drawText();
            _this.waveXOffset += _this.waveSpeed;
            requestAnimationFrame(render)
        })();
    },
    //画圈函数
    drawCircle : function() {

        var r = this.circleCenter;
        var cR = this.circleRadius;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#67c4e5';
        this.ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(r, r, cR, 0, 2 * Math.PI);
        this.ctx.clip();
    },

    //画sin 曲线函数
    drawSin : function(xOffset) {
        this.ctx.save();
        var points=[]; //用于存放绘制Sin曲线的点
        this.ctx.beginPath();
        //在整个轴长上取点
        for(var x = this.sX; x < this.sX + this.axisLength; x += 20 / this.axisLength){
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = - Math.sin((this.sX + x) * this.waveWidth + xOffset);

            var dY = this.canvasHeight * (1 - this.nowRange / 100 );
            points.push([x, dY + y * this.waveHeight]);
            this.ctx.lineTo(x, dY + y * this.waveHeight);
        }
        //封闭路径
        this.ctx.lineTo(this.axisLength, this.canvasHeight);
        this.ctx.lineTo(this.sX, this.canvasHeight);
        this.ctx.lineTo(points[0][0],points[0][1]);

        var linear = this.ctx.createLinearGradient(0,0,0,180);
        /*linear.addColorStop(0,"#D5FF92");
        linear.addColorStop(0.3,"#0599cc");*/
        linear.addColorStop(1,"#0829D1");
        linear.addColorStop(0.8,"#0d9ed1");
        linear.addColorStop(0.3,"#0ed1b8");
        linear.addColorStop(0,"#12d137");

        this.ctx.fillStyle = linear;
        // this.ctx.fillStyle = '#0599cc';
        this.ctx.fill();
        this.ctx.restore();
    },

    //写百分比文本函数
    drawText : function () {
        this.ctx.save();
        var size = 0.4*this.circleRadius;
        this.ctx.font = size + 'px Microsoft Yahei';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = "rgba(06, 85, 128, 0.8)";
        this.ctx.fillText(this.textRange + '%', this.circleCenter, this.circleCenter + size / 2);
        this.ctx.restore();
    }

};
var extractObj = Object.create(CircularProgress);
extractObj.init('can-extract','range-extract');
var handleObj = Object.create(CircularProgress);
handleObj.init('can-handle','range-handle');