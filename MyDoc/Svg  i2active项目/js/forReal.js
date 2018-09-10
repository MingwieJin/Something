//画正方形
function DrawRect(x,y,width,height){
var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
rect.setAttribute( "x", x );
rect.setAttribute( "y", y);
rect.setAttribute( "width", width );
rect.setAttribute( "height", height );
rect.setAttribute( "style", "fill:white;stroke:#d8e0ea;stroke-width:1;fill-opacity:0;stroke-opacity:0.8");
svg1.appendChild( rect );
};

//画源端节点
function DrawnodeSrc(x,y,name,ip,status,start, length, j, i){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'ScrNode'+j+i;
image.setAttribute( "x", x );
image.setAttribute( "y", y);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );

image.setAttribute( "href", "img/"+status+".png");
svg1.appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", x-45 );
text1.setAttribute( "y", y+20);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
svg1.appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", x-90 );
text2.setAttribute( "y", y+40);
text2.setAttribute( "fill", "#666");
text2.textContent = ip;
svg1.appendChild( text2 );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", x+50 );
line1.setAttribute( "y1", y+25);
line1.setAttribute( "x2", x+100 );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line1 );


if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x+100 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x+100 );
line2.setAttribute( "y2", start);
line2.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line2 );
};
}

//画备端节点
function DrawnodeDst(x,y,name,ip,status,start, length, j, i){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'DstNode'+j+i;
image.setAttribute( "x", x );
image.setAttribute( "y", y);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
svg1.appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", x+62 );
text1.setAttribute( "y", y+20);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
svg1.appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", x+60 );
text2.setAttribute( "y", y+40);
text2.setAttribute( "fill", "#666");
text2.textContent = ip;
svg1.appendChild( text2 );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", x-50 );
line1.setAttribute( "y1", y+25);
line1.setAttribute( "x2", x );
line1.setAttribute( "y2", y+25);
line1.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line1 );

if  (length!=1){
var line2 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", x-50 );
line2.setAttribute( "y1", y+25);
line2.setAttribute( "x2", x-50 );
line2.setAttribute( "y2", start);
line2.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line2 );	
};
}

//源端数据库
function DrawDbSrc(name,status,Srcid,start,j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'SrcDB'+j;
image.setAttribute( "x", 270 );
image.setAttribute( "y", start+10);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
svg1.appendChild( image );
image.addEventListener( 'click', function() {
//     window.location.href="http://www.baidu.com";
} );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 220 );
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2", 270 );
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 270 );
text1.setAttribute( "y", start+75);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
svg1.appendChild( text1 );

}

//备端数据库
function DrawDbDst(name,status,Dstid,start,j){
var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'DstDB'+j;
image.setAttribute( "x", 760 );
image.setAttribute( "y", start+10);
image.setAttribute( "width", "50px" );
image.setAttribute( "height", "50px" );
image.setAttribute( "href", "img/"+status+".png");
svg1.appendChild( image );
image.addEventListener( 'click', function() {
//     window.location.href="http://www.baidu.com";
} );

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 810);
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2", 860 );
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke:#d8e0ea;stroke-width:1");
svg1.appendChild( line1 );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 760 );
text1.setAttribute( "y", start+75);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
svg1.appendChild( text1 );

}

//画云
function DrawCloud(name, status, bytes, label1, label2, label3, start, j, LorR, Srcheight, Srcwidth, Dstheight, Dstwidth){

if(LorR == 1){
var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 427.5 - Srcwidth*10 );
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2", 730 );
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line1 );

var line2= document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", 430 - Srcwidth*10 );
line2.setAttribute( "y1", Srcheight);
line2.setAttribute( "x2", 430 - Srcwidth*10 );
line2.setAttribute( "y2", start+35);
line2.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line2 );

var polygon = document.createElementNS( "http://www.w3.org/2000/svg", "polygon" );	
polygon.setAttribute( "points", "727,"+(start+27.5)+" 737,"+(start+35)+" 727,"+(start+42.5) );
polygon.setAttribute( "style", "fill: #e2e9f1;stroke: #e2e9f1;stroke-width:1;");
svg1.appendChild( polygon );
}

else if(LorR == 2){
var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 340);
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2", 652.5 + Dstwidth*10);
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line1 );

var line2= document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", 650 + Dstwidth*10 );
line2.setAttribute( "y1", Dstheight);
line2.setAttribute( "x2", 650 + Dstwidth*10 );
line2.setAttribute( "y2", start+35);
line2.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line2 );
}

else if(LorR == 4){

var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 427.5 - Srcwidth*10 );
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2",	652.5 + Dstwidth*10);
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line1 );

var line2= document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line2.setAttribute( "x1", 430 - Srcwidth*10 );
line2.setAttribute( "y1", Srcheight);
line2.setAttribute( "x2", 430 - Srcwidth*10 );
line2.setAttribute( "y2", start+35);
line2.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line2 );

var line3= document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line3.setAttribute( "x1", 650 + Dstwidth*10 );
line3.setAttribute( "y1", Dstheight);
line3.setAttribute( "x2", 650 + Dstwidth*10 );
line3.setAttribute( "y2", start+35);
line3.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line3 );
}

else if (LorR == 0){
var line1 = document.createElementNS( "http://www.w3.org/2000/svg", "line" );	
line1.setAttribute( "x1", 340 );
line1.setAttribute( "y1", start+35);
line1.setAttribute( "x2", 730 );
line1.setAttribute( "y2", start+35);
line1.setAttribute( "style", "stroke: #e2e9f1;stroke-width:5");
svg1.appendChild( line1 );

var polygon = document.createElementNS( "http://www.w3.org/2000/svg", "polygon" );	
polygon.setAttribute( "points", "727,"+(start+27.5)+" 737,"+(start+35)+" 727,"+(start+42.5) );
polygon.setAttribute( "style", "fill: #e2e9f1;stroke: #e2e9f1;stroke-width:1;");
svg1.appendChild( polygon );
}





var image = document.createElementNS( "http://www.w3.org/2000/svg", "image" );	
image.id = 'cloud'+j;
image.setAttribute( "x", 500 );
image.setAttribute( "y", start-20);
image.setAttribute( "width", "70px" );
image.setAttribute( "height", "100px" );
image.setAttribute( "href", "img/"+status+".png");
svg1.appendChild( image );

var text1 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );	
text1.setAttribute( "class", "SVG-text" )
text1.setAttribute( "x", 500 );
text1.setAttribute( "y", start+70);
text1.setAttribute( "fill", "#666");
text1.textContent = name;
svg1.appendChild( text1 );

var text2 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text2.id = 'cloudText'+j;
text2.setAttribute( "class", "SVG-text" )
text2.setAttribute( "x", 455 );
text2.setAttribute( "y", start+90);
text2.setAttribute( "fill", "#666");
text2.textContent = "状态"+bytes+"kb/s";
svg1.appendChild( text2 );

var text3 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text3.id = 'cloudLabel1'+j;
text3.setAttribute( "class", "SVG-text" )
text3.setAttribute( "x", 450 );
text3.setAttribute( "y", start+110);
text3.setAttribute( "fill", "#666");
text3.textContent = label1;
svg1.appendChild( text3 );

var text4 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text4.id = 'cloudLabel2'+j;
text4.setAttribute( "class", "SVG-text" )
text4.setAttribute( "x", 450 );
text4.setAttribute( "y", start+130);
text4.setAttribute( "fill", "#666");
text4.textContent = label2;
svg1.appendChild( text4 );

var text5 = document.createElementNS( "http://www.w3.org/2000/svg", "text" );
text5.id = 'cloudLabel3'+j;
text5.setAttribute( "class", "SVG-text" )
text5.setAttribute( "x", 550 );
text5.setAttribute( "y", start+90);
text5.setAttribute( "fill", "#666");
text5.textContent = label3;
svg1.appendChild( text5 );


}

