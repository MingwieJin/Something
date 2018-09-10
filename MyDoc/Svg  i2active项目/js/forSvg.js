//画正方形
function DrawRect(x,y,width,height, idname){
var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
rect.setAttribute( "x", x );
rect.setAttribute( "y", y);
rect.setAttribute( "width", width );
rect.setAttribute( "height", height );
rect.setAttribute( "style", "fill:white;stroke:#c0c0c0;stroke-width:1;fill-opacity:0;stroke-opacity:0.3");
document.getElementById(idname).appendChild( rect );
};

//画源端节点
function DrawnodeSrc(x,y,status,name,ip, mid, length, idname, j, i){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'ScrNode'+j+i;
image.setAttribute( "x", x );
image.setAttribute( "y", y);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", x-45 );
text1.setAttribute( "y", y+20);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", x-90 );
text2.setAttribute( "y", y+40);
text2.setAttribute( "fill", "#666");
text2.textContent = ip;
document.getElementById(idname).appendChild( text2 );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", x+50 );
line1.setAttribute( "y1", y+25);
line1.setAttribute( "x2", x+100 );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line1 );


if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x+100 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x+100 );
line2.setAttribute( "y2", mid);
line2.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line2 );
};
}

//画备端节点
function DrawnodeDst(x,y,status,name,ip, mid, length, idname, j, i){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'DstNode'+j+i;
image.setAttribute( "x", x );
image.setAttribute( "y", y);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", x+62 );
text1.setAttribute( "y", y+20);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", x+60 );
text2.setAttribute( "y", y+40);
text2.setAttribute( "fill", "#666");
text2.textContent = ip;
document.getElementById(idname).appendChild( text2 );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", x-50 );
line1.setAttribute( "y1", y+25);
line1.setAttribute( "x2", x );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line1 );

if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x-50 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x-50 );
line2.setAttribute( "y2", mid);
line2.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line2 );	
};

}

//源端数据库
function DrawDbSrc(name,status, mid, Cheight, totalH, idname, j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'SrcDB'+j;
image.setAttribute( "x", 270 );
image.setAttribute( "y", mid-25+Cheight);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

image.addEventListener( 'click', function() {
       window.location.href="http://www.baidu.com";
    } );


var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 220 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 270 );
line1.setAttribute( "y2", mid+Cheight);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 270 );
text1.setAttribute( "y", mid+45+Cheight);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

//var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
//text2.setAttribute( "class", "SVG-text" )
//text2.setAttribute( "x", 200 );
//text2.setAttribute( "y", totalH-10+20+Cheight);
//text2.setAttribute( "fill", "#666");
//text2.textContent = label;
//text2.id = 'SrcDBLabel'+j;
//document.getElementById(idname).appendChild( text2 );
}

//备端数据库
function DrawDbDst(name,status, mid, Cheight, totalH, idname, j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );
image.id = 'DstDB'+j;
image.setAttribute( "x", 760 );
image.setAttribute( "y", mid-25+Cheight);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

image.addEventListener( 'click', function() {
       window.location.href="http://www.w3school.com.cn";
    } );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 810 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 860 );
line1.setAttribute( "y2", mid+Cheight);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1;stroke-opacity:0.5");
document.getElementById(idname).appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 760 );
text1.setAttribute( "y", mid+45+Cheight);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

//var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
//text2.setAttribute( "class", "SVG-text" )
//text2.setAttribute( "x", 750);
//text2.setAttribute( "y", totalH-10+20+Cheight);
//text2.setAttribute( "fill", "#666");
//text2.textContent = label;
//text2.id = 'DstDBLabel'+j;
//document.getElementById(idname).appendChild( text2 );
}


function DrawCloud(name, status, bytes ,mid, Cheight, idname, j, label1, label2, label3){
var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 340 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 730 );
line1.setAttribute( "y2", mid+Cheight);
line1.setAttribute( "style", "stroke:rgb(192,192,192);stroke-width:5");
document.getElementById(idname).appendChild( line1 );

var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'cloud'+j;
image.setAttribute( "x", 500 );
image.setAttribute( "y", mid+Cheight-55);
image.setAttribute( "width", "70px" );
image.setAttribute( "height", "100px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 500 );
text1.setAttribute( "y", mid+35+Cheight);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text2.id = 'cloudText'+j;
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", 485 );
text2.setAttribute( "y", mid+55+Cheight);
text2.setAttribute( "fill", "#666");
text2.textContent = "网络状态"+bytes+"kb/s";
document.getElementById(idname).appendChild( text2 );

var text3 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text3.id = 'cloudLabel1'+j;
text3.setAttribute( "class", "SVG-text" )
text3.setAttribute( "x", 445 );
text3.setAttribute( "y", mid+75+Cheight);
text3.setAttribute( "fill", "#666");
text3.textContent = label1;
document.getElementById(idname).appendChild( text3 );

var text4 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text4.id = 'cloudLabel2'+j;
text4.setAttribute( "class", "SVG-text" )
text4.setAttribute( "x", 445 );
text4.setAttribute( "y", mid+95+Cheight);
text4.setAttribute( "fill", "#666");
text4.textContent = label2;
document.getElementById(idname).appendChild( text4 );

var text5 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text5.id = 'cloudLabel3'+j;
text5.setAttribute( "class", "SVG-text" )
text5.setAttribute( "x", 495 );
text5.setAttribute( "y", mid+115+Cheight);
text5.setAttribute( "fill", "#666");
text5.textContent = label3;
document.getElementById(idname).appendChild( text5 );


var polygon = document.createElementNS( "http://www.w3.org/2000/svg", "polygon" );	
polygon.setAttribute( "points", "730,"+(mid+Cheight-10)+" 740,"+(mid+Cheight)+" 730,"+(mid+Cheight+10) );
polygon.setAttribute( "style", "fill:rgb(192,192,192);stroke:rgb(192,192,192);stroke-width:1;");
document.getElementById(idname).appendChild( polygon );
}

//<line x1="420" y1="130" x2="650" y2="130"style="stroke:rgb(192,192,192);stroke-width:5"/>
//
//<image xlink:href="img/rule_track.png" x="500" y="75" height="100px" width="70px"/> 
// <text class="SVG-text" x="500" y="165" fill="#666">1-2同步规则</text>
//<text class="SVG-text" x="480" y="185" fill="#666">网络状态1000kb/s</text>
//
// <polygon points="650,120 660,130 650,140"style="fill:rgb(192,192,192);stroke:rgb(192,192,192);stroke-width:1;" />



//"name": "rule1",
//		"status": "rule_dump",
//		"bytes": 1234000