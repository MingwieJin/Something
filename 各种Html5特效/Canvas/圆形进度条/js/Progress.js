var K = 0;
var Progress = function() {
    var progress = {
        textheight: null,
        renderOne: function(id, length, r, percent) {

            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            canvas.width = length;
            canvas.height = length;
            var i = 0;
            k = percent;
            var interval = setInterval(function() {
                i++;
                progress.render(context, length, r, i, percent);
                if (i >= percent) {
                    clearInterval(interval)
                }
            },
            10)
        },
        render: function(context, length, r, i, percent) {
            context.clearRect(0, 0, length, length);
            context.beginPath();
            var gradient = context.createLinearGradient(length, 0, 0, 0);
            gradient.addColorStop("0", "#76EEC6");
            gradient.addColorStop("1.0", "#63B8FF");
            context.strokeStyle = gradient;
            context.lineWidth = r;
            context.arc(length / 2, length / 2, length / 2 - r, -0.5 * Math.PI, -0.5 * Math.PI + i * 0.02 * Math.PI, false);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.strokeStyle = "#8d8d8d";
            context.lineWidth = 2;
            context.fillStyle = "#ffffff";
            context.arc(length / 2, r, 0.6 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            var radian = percent / 100 * 2 * Math.PI - 0.5 * Math.PI;
            var x = Math.cos(radian) * (length / 2 - r) + length / 2;
            var y = Math.sin(radian) * (length / 2 - r) + length / 2;
            context.arc(x, y, 0.6 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#54DDAF";
            context.fillStyle = "#54DDAF";
            context.arc(length / 2, length / 2, length / 2 - 2 * r, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            context.beginPath();
            context.font = "bold " + (length / 2 - 2.5 * r) / 2 + "px 微软雅黑";
            context.fillStyle = "#ffffff";
            var text = percent + "%";
            textwidth = context.measureText(text).width;
            if (this.textheight == null) {
                var div = document.createElement("div");
                document.body.appendChild(div);
                div.innerHTML = text;
                div.style.fontSize = ((length / 2 - 2.5 * r) / 2) + "px";
                this.textheight = div.offsetHeight;
                div.parentNode.removeChild(div)
            }
            textheight = this.textheight;
            context.fillText(text, (length - textwidth) / 2, length / 2 + textheight / 4);
            context.fill();
            context.closePath()
        }
    };
    return progress
        	 
};


var NProgress = function() {
    var progress = {
        textheight: null,
        renderOne: function(id, length, r, percent) {

            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            
            canvas.width = length;
            canvas.height = length;
            var i = k;
            k = percent;
            var interval = setInterval(function() {
                i++;
                progress.render(context, length, r, i, percent);
                if (i >= percent) {
                    clearInterval(interval)
                }
            },
            10)
        },
        render: function(context, length, r, i, percent) {
            context.clearRect(0, 0, length, length);
            context.beginPath();
            var gradient = context.createLinearGradient(length, 0, 0, 0);
            gradient.addColorStop("0", "#76EEC6");
            gradient.addColorStop("1.0", "#63B8FF");
            context.strokeStyle = gradient;
            context.lineWidth = r;
            context.arc(length / 2, length / 2, length / 2 - r, -0.5 * Math.PI, -0.5 * Math.PI + i * 0.02 * Math.PI, false);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.strokeStyle = "#8d8d8d";
            context.lineWidth = 2;
            context.fillStyle = "#ffffff";
            context.arc(length / 2, r, 0.6 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            var radian = percent / 100 * 2 * Math.PI - 0.5 * Math.PI;
            var x = Math.cos(radian) * (length / 2 - r) + length / 2;
            var y = Math.sin(radian) * (length / 2 - r) + length / 2;
            context.arc(x, y, 0.6 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#54DDAF";
            context.fillStyle = "#54DDAF";
            context.arc(length / 2, length / 2, length / 2 - 2 * r, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            context.beginPath();
            context.font = "bold " + (length / 2 - 2.5 * r) / 2 + "px 微软雅黑";
            context.fillStyle = "#ffffff";
            var text = percent + "%";
            textwidth = context.measureText(text).width;
            if (this.textheight == null) {
                var div = document.createElement("div");
                document.body.appendChild(div);
                div.innerHTML = text;
                div.style.fontSize = ((length / 2 - 2.5 * r) / 2) + "px";
                this.textheight = div.offsetHeight;
                div.parentNode.removeChild(div)
            }
            textheight = this.textheight;
            context.fillText(text, (length - textwidth) / 2, length / 2 + textheight / 4);
            context.fill();
            context.closePath()
        }
    };
    return progress
        	 
};


function fresh(){
	var changepPercent = document.getElementById("demo").innerHTML;
	 if (changepPercent!=null && changepPercent!="" &&  changepPercent!="这里显示进度条") {
//	 	
	 	if (changepPercent>k){
	 	NProgress().renderOne('canvas1',100,5,changepPercent);
	 	k = changepPercent;
	 	}
	 }
	 
	
	
};
setInterval(fresh,5000);



function disp_prompt()
  {
  var name=prompt("Please enter your percent","")
  if (name!=null && name!="")
    {
     document.getElementById("demo").innerHTML=name;
    }
  };
// setInterval(drawGraph,5000);


