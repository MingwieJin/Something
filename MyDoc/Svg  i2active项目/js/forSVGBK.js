//画正方形
function DrawRect(x,y,width,height, idname){
var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
rect.setAttribute( "x", x );
rect.setAttribute( "y", y);
rect.setAttribute( "width", width );
rect.setAttribute( "height", height );
rect.setAttribute( "style", "fill:white;stroke:#c0c0c0;stroke-width:1;fill-opacity:0;stroke-opacity:0.5");
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
line1.setAttribute( "x2", x+150 );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
document.getElementById(idname).appendChild( line1 );


if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x+150 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x+150 );
line2.setAttribute( "y2", mid);
line2.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
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
line1.setAttribute( "x1", x-100 );
line1.setAttribute( "y1", y+25);
line1.setAttribute( "x2", x );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
document.getElementById(idname).appendChild( line1 );

if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x-100 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x-100 );
line2.setAttribute( "y2", mid);
line2.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
document.getElementById(idname).appendChild( line2 );	
};

}

//源端数据库
function DrawDbSrc(name,label,status, mid, Cheight, totalH, idname, j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'SrcDB'+j;
image.setAttribute( "x", 340 );
image.setAttribute( "y", mid-25+Cheight);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

image.addEventListener( 'click', function() {
       window.location.href="http://www.baidu.com";
    } );


var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 290 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 340 );
line1.setAttribute( "y2", mid+Cheight);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
document.getElementById(idname).appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 340 );
text1.setAttribute( "y", mid+45+Cheight);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", 200 );
text2.setAttribute( "y", totalH-10+20+Cheight);
text2.setAttribute( "fill", "#666");
text2.textContent = label;
text2.id = 'SrcDBLabel'+j;
document.getElementById(idname).appendChild( text2 );
}

//备端数据库
function DrawDbDst(name,label,status, mid, Cheight, totalH, idname, j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );
image.id = 'DstDB'+j;
image.setAttribute( "x", 690 );
image.setAttribute( "y", mid-25+Cheight);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
document.getElementById(idname).appendChild( image );

image.addEventListener( 'click', function() {
       window.location.href="http://www.w3school.com.cn";
    } );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 740 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 790 );
line1.setAttribute( "y2", mid+Cheight);
line1.setAttribute( "style", "stroke:rgb(150,150,150);stroke-width:1");
document.getElementById(idname).appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 690 );
text1.setAttribute( "y", mid+45+Cheight);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
document.getElementById(idname).appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", 680);
text2.setAttribute( "y", totalH-10+20+Cheight);
text2.setAttribute( "fill", "#666");
text2.textContent = label;
text2.id = 'DstDBLabel'+j;
document.getElementById(idname).appendChild( text2 );
}

//画云
function DrawCloud(name, status, bytes ,mid, Cheight, idname, j){
var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 420 );
line1.setAttribute( "y1", mid+Cheight);
line1.setAttribute( "x2", 650 );
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

var polygon = document.createElementNS( "http://www.w3.org/2000/svg", "polygon" );	
polygon.setAttribute( "points", "650,"+(mid+Cheight-10)+" 660,"+(mid+Cheight)+" 650,"+(mid+Cheight+10) );
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