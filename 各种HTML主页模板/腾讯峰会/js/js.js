$(document).ready(function(){
	
	document.body.addEventListener('touchmove', function (e) {
		e.cancelable=true;
      	e.preventDefault();
    }, {passive: false});
	
	
	
	/* 瀹夊崜鐗堟湰鍏煎 */
	var brower = {
		versions:function(){
			var u = window.navigator.userAgent;
			var num ;
			if(u.indexOf('Trident') > -1){
			//IE
				return "IE";
			}else if(u.indexOf('Presto') > -1){
			//opera
				return "Opera";
			}else if(u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
			//firefox
				return "Firefox";
			}else if(u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1){
			//鑻规灉銆佽胺姝屽唴鏍�
				if(u.indexOf('Chrome') > -1){
				//chrome
					return "Chrome";
				}else if(u.indexOf('OPR')){
				//webkit Opera
					return "Opera_webkit"
				}else{
				//Safari
					return "Safari";
				}
			}else if(u.indexOf('Mobile') > -1){
			//绉诲姩绔�
				if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
				//ios
					if(u.indexOf('iPhone') > -1){
					//iphone
						return "iPhone"
					}else if(u.indexOf('iPod') > -1){
					//ipod
						return "iPod"
					}else if(u.indexOf('iPad') > -1){
					//ipad
						return "iPad"
					}
				}else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
				//android
					num = u.substr(u.indexOf('Android') + 8, 3);
					return {"type":"Android", "version": num};
				}else if(u.indexOf('BB10') > -1 ){
				//榛戣帗bb10绯荤粺
					return "BB10";
				}else if(u.indexOf('IEMobile')){
				//windows phone
					return "Windows Phone"
				}
			}
		}
    }
	
	
	// 鏇存敼瀛椾綋澶у皬鍋氬搷搴斿紡
	var fixPages = (function (baseH, baseW, baseSize) {
		
		var screenW = document.body.clientWidth;
		var screenH = document.body.clientHeight;

		var baseRatio = Math.floor(baseW / baseH * 10000) / 10000;
		var screenRatio = Math.floor(screenW / screenH * 10000) / 10000;

		var realW = Math.floor(screenH * baseRatio);
		var realH = Math.floor(screenW / baseRatio);
		
		var scale = screenRatio >= baseRatio ? realW / baseW : realH / baseH;
		var newSize = Math.floor(parseInt(scale * 10000 * baseSize) / 10000);

		setTimeout(function () {
			$('html').css('font-size' , newSize + 'px');
		}, 0);
	})(603, 375, 100);
	
	
	/*loading*/
//用于暂停用	
	var an_hook=false;
//	if(parseInt(brower.versions().version)<8){
//		an_hook=true;
//		$("body").addClass("an_hook")
//	}
	
	var timer_count=0;
	var timer_cloud_1;
	var timer_cloud_2;
	var timer_cloud_3;
	var timer_cloud_3_1;
	var timer_cloud_4;
	
	var fun_cloud_1_loop;
	var fun_cloud_2_loop;
	var fun_cloud_3_loop;
	var fun_cloud_3_1_loop;
	var fun_cloud_4_loop;
	
	
	var timer_loading=setInterval(function(){
		if(timer_count<100){
			
			var n_100=Math.floor(timer_count/100);
			var n_10=Math.floor(timer_count/10)%10;
			var n_1=timer_count%10;
			
			if(n_100>0){
				var str_100="<span class='num num_"+n_100+"'></span>";
			}else{
				var str_100="";
			}
			
			if(n_10>0){
				var str_10="<span class='num num_"+n_10+"'></span>";
			}else{
				var str_10="";
			}
			
			var str_1="<span class='num num_0'></span>";
			
			if(n_1>0){
				var str_1="<span class='num num_"+n_1+"'></span>";
			}else{
				var str_1="<span class='num num_0'></span>";
			}
			
			$(".loading .num_area").html(str_100+""+str_10+""+str_1+""+"<span class='num num_percent'></span>");
			
			timer_count++;
		}else{
			$(".loading .num_area").html("<span class='num num_1'></span><span class='num num_0'></span><span class='num num_0'></span><span class='num num_percent'></span>");
			clearInterval(timer_loading);
			$(".loading_wrap .loading .loading_txt").fadeOut();
			$(".loading_wrap .loading .click_links").fadeIn();
			$(".loading_wrap .hook").hide();
		}
	},30);
	
	/*loading*/
	
	//浜�1
	if(!an_hook){
	//椤甸潰绮掑瓙
	var cloud_1={};
	cloud_1.connectThreshold=0;
	
	
	
	function f_cloud_1(){
		
		//(function(){
			var canvas, ctx, height, width, bounds,
			  center, mouse, hover = false, mouseDown = false,
			  props, particles, gui;
			
			var Vector2 = function(x,y){
				x = x || 0;
				y = y || 0;
				this.x = x;
				this.y = y;
				return this;
			};
		
			Vector2.prototype.add = function(vec){
				this.x += vec.x;
				this.y += vec.y;
			};
		
			Vector2.prototype.sub = function(vec){
				this.x -= vec.x;
				this.y -= vec.y;
			};
			
			//插值
			Vector2.prototype.lerp = function(to, amount) {
				amount = amount || 0.05;
				this.x = (1 - amount) * this.x + amount * to.x;
				this.y = (1 - amount) * this.y + amount * to.y;
			};
		
		
			Vector2.prototype.distanceTo = function(vec){
				return Math.sqrt(Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2));
			};
		
			Vector2.prototype.angleTo = function(vec, format){
				format = format || 'rad';
				var angle = format === 'rad' ? Math.atan2(vec.y - this.y, vec.x - this.x) :
						format === 'deg' ? Math.atan2(vec.y - this.y, vec.x - this.x) * 180 / Math.PI :
						undefined;
				return angle;
			};
		
			var Particle = function(){
				this.size = props.minSize,
				this.velocity = new Vector2(
					1 - Math.random() * 2,
					1 - Math.random() * 2
				);
				this.position = new Vector2(
					Math.random() * width, 
					Math.random() * height
				);
				return this;
			};
		
			//遇到边界就返回
			Particle.prototype.checkBoundaries = function(){
				if(this.position.x < bounds.xMin || this.position.x > bounds.xMax) this.velocity.x *= -1;
				if(this.position.y < bounds.yMin || this.position.y > bounds.yMax) this.velocity.y *= -1;
			};
		
			Particle.prototype.update = function(){
				this.position.add(this.velocity);
				this.checkBoundaries();
			};
		  
			function resize(){
				
				//console.log(window.innerHeight);
				//canvas.height = height = window.innerHeight;
				//canvas.width = width = window.innerWidth;
				canvas.height = height = 640;
				canvas.width = width = 750;
				center = new Vector2(width/2, height/2);
				bounds = {
					xMin: -props.mouseThreshold,
					yMin: -props.mouseThreshold,
					xMax: width + props.mouseThreshold,
					yMax: height + props.mouseThreshold
				};
			}
			
			function populate(){
				particles = [];
				for(var i = 0; i < props.numParticles; particles[i++] = new Particle());
			}
			
		  function animateHover(p){
			var mouseDist = p.position.distanceTo(mouse);
			if (mouseDist < props.mouseThreshold){
			  var mLineOpacity = 1 - mouseDist/props.mouseThreshold,
				  mLineColor = props.mouseConnectColor.substr(0,props.mouseConnectColor.length-2) + mLineOpacity + ')',
				  size = props.maxSize * (1 - (mouseDist/props.mouseThreshold)) + props.minSize,
				  angle = mouse.angleTo(p.position),
				  position = new Vector2(
					mouse.x + props.mouseThreshold * Math.cos(angle),
					mouse.y + props.mouseThreshold * Math.sin(angle)
				  );
		
			  p.size = size;
			  ctx.beginPath();
			  ctx.strokeStyle = mLineColor;
			  ctx.moveTo(mouse.x, mouse.y);
			  ctx.lineTo(p.position.x, p.position.y);
			  ctx.stroke();
			  ctx.closePath();
		
			  if(mouseDown)
				p.position.lerp(mouse);
			  else
				p.position.lerp(position);
			}
			else{
			  p.size = props.minSize;
			}
		  }
		  
			function draw(){
				ctx.fillStyle = props.backgroundColor;
					ctx.fillRect(0,0,width,height);
					for(var i = 0; i < particles.length; i++){
						var p1 = particles[i],
					  p2 = particles[i + 1] || particles[0],
					  distance = p2.position.distanceTo(p1.position);
							
						p1.update();
						ctx.fillStyle = props.particleColor;
						ctx.fillRect(p1.position.x - p1.size/2, p1.position.y - p1.size/2,p1.size,p1.size);
						if (distance < props.connectThreshold){
							var pLineOpacity = 1 - distance/props.connectThreshold,
								  pLineColor = props.particleConnectColor.substr(0,props.particleConnectColor.length-2) + pLineOpacity + ')';
							ctx.beginPath();
							ctx.strokeStyle = pLineColor;
							ctx.lineWidth = 1;
							ctx.moveTo(p1.position.x, p1.position.y);
							ctx.lineTo(p2.position.x, p2.position.y);
							ctx.stroke();
							ctx.closePath();
						}
						if (hover){
							animateHover(p1);
						}
					}
				if(props.screenOverlay){
				  var grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, width/2);
				  grad.addColorStop(0,'rgba(0,0,0,0)');
				  grad.addColorStop(1,'rgba(0,0,0,0.6)');
				  ctx.fillStyle = grad;
				  ctx.fillRect(0,0,width,height);
				}
			}
		
			fun_cloud_1_loop=function(){
				draw();
				timer_cloud_1=window.requestAnimationFrame(fun_cloud_1_loop);
				
				props.connectThreshold=cloud_1.connectThreshold;
			}
			
			/*props = {
			  backgroundColor: '#000',
			  particleColor: 'rgba(41,62,223,0.25)',
			  minSize: 2, 
			  maxSize: 30,
			  numParticles: 1200,
			  connectThreshold: cloud_1.connectThreshold,
			  mouseThreshold: 150,
			  particleConnectColor: 'rgba(122,74,165,0)',
			  mouseConnectColor: 'rgba(40,150,250,0)',
			  screenOverlay: true
			};*/
			
			props = {
			  backgroundColor: '#000',
			  particleColor: 'rgba(0,0,255,0.25)',
			  minSize: 3, 
			  maxSize: 30,
			  numParticles: 1400,
			  connectThreshold: cloud_1.connectThreshold,
			  mouseThreshold: 150,
			  particleConnectColor: 'rgba(0,113,255,0)',
			  mouseConnectColor: 'rgba(40,150,250,0)',
			  screenOverlay: true
			};
			
		  
		  /*function setProps(){
			props = {
			  backgroundColor: '#000',
			  particleColor: 'rgba(85,255,180,0.25)',
			  minSize: 2, 
			  maxSize: 30,
			  numParticles: 1500,
				  connectThreshold: 935,
				  mouseThreshold: 150,
			  particleConnectColor: 'rgba(200,100,200,0)',
			  mouseConnectColor: 'rgba(40,150,250,0)',
			  screenOverlay: true
			};
		  }*/
		  
		 /* function buildUI(){
			
			gui = new dat.GUI();
			
			var f1 = gui.addFolder('System'),
				f2 = gui.addFolder('Particles'),
				f3 = gui.addFolder('Interaction');
			
			f1.open();
			f2.open();
			f3.open();
			
			f1.addColor(props, 'backgroundColor');
			f1.add(props, 'screenOverlay');
			
			var updateCount = f2.add(props, 'numParticles',100,4000).step(20);
			
			f2.add(props, 'minSize', 0, 10).step(0.5);
			f2.add(props, 'maxSize', 0, 100);
			f2.addColor(props, 'particleColor');
			f2.add(props, 'connectThreshold', 0, 1000).step(5);
			f2.addColor(props, 'particleConnectColor');
			var updateMouseThreshold = f3.add(props, 'mouseThreshold', 0, 500).step(5);
			f3.addColor(props, 'mouseConnectColor');
			
			updateCount.onFinishChange(function(){
			  populate();
			});
			
			updateMouseThreshold.onFinishChange(function(){
			  populate(); //to avoid getting particles stuck outside of boundaries
			});
		  }*/
			
			window.onload = function(){
				canvas = $(".cloud_1")[0];
				/*
	 
				var canvas_width = $(".bg_area").width()*2.6;
				var canvas_height = $(".bg_area").height()*2.6;
				
				var canvas=$(".cloud_1")[0];	
				canvas.width = canvas_width;
				canvas.height = canvas_height;*/
				
				ctx = canvas.getContext('2d');
				mouse = new Vector2();
				//setProps();
				//buildUI();
				resize();
				populate();
				fun_cloud_1_loop();
			}
			
			/*window.onresize = function(){
				resize();
				populate();
			};*/
			
		$(".wrap").on("touchmove",function(e){
		//window.onmousemove = function(e){
			//console.log(e.originalEvent);
			var eve=e.originalEvent.changedTouches[0];
			
			hover = true;
			var ot=$(".bg_area_1").offset().top;
			mouse.x = eve.clientX*2; 
			mouse.y = (eve.clientY-ot)*2;
			
		});
			
		$(".wrap").on("touchstart",function(e){
			var eve=e.originalEvent.changedTouches[0];
			
			hover = true;
			var ot=$(".bg_area_1").offset().top;
			mouse.x = eve.clientX*2; 
			mouse.y = (eve.clientY-ot)*2;
			
			mouseDown = true;
			
			
		  });
		  
		 $(".wrap").on("touchend",function(e){
			mouseDown = false;
			//hover = false;
			var timer=setTimeout(function(){
				hover = false;
			},1000);
		  });
		  
			
			window.requestAnimationFrame = (function(){
				return  window.requestAnimationFrame       ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						window.oRequestAnimationFrame      ||
						window.msRequestAnimationFrame     ||
						function (callback) {
							window.setTimeout(callback, 1000 / 60);
						};
			})();
			
			
			
		//})();
	
	}
	
	//f_cloud_1();
	
	f_cloud_1();
	
	function showCloud(){
		$(".bg_area_1").fadeIn();
		//cloud_1.connectThreshold=1000;
		var timer_line=setInterval(function(){
			if(cloud_1.connectThreshold<=960){
				cloud_1.connectThreshold+=15;
			}else{
				clearInterval(timer_line);
				cloud_1.connectThreshold=1000;
			}
		},40);
		
	}
	
	/*var timer=setTimeout(function(){
		showCloud();
	},500);*/
	
	
	function hideCloud(){
		var timer_line2=setInterval(function(){
			if(cloud_1.connectThreshold>=0){
				cloud_1.connectThreshold-=60;
			}else{
				clearInterval(timer_line2);
				cloud_1.connectThreshold=0;
				$(".bg_area_1").fadeOut();
			}
		},50);
	}
	
/*	var timer=setTimeout(function(){
		hideCloud();
	},10000);*/
	
	//椤甸潰绮掑瓙
	
	//浜�1
	
	
	
	//浜�2
	
		$(".bg_area_2").show();
		$(".con_wrap_3").addClass("wrap_show");
		
		/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 1);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports) {
	
	module.exports = THREE;
	
	/***/ }),
	/* 1 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_reset_css__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_reset_css__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_style_css__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shaders_frag_glsl__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shaders_frag_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__shaders_frag_glsl__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shaders_vert_glsl__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shaders_vert_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__shaders_vert_glsl__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__renderer__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scene__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__render_loop__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sphere__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_three_OrbitControls__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_three_OrbitControls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_three_OrbitControls__);
	
	
	const containerEl = $(".cloud_2")[0];
	
	const renderer = Object(__WEBPACK_IMPORTED_MODULE_5__renderer__["a" /* default */])({containerEl});
	const { scene, camera } = Object(__WEBPACK_IMPORTED_MODULE_6__scene__["a" /* default */])({
	  // cameraPos: [10, 0, 0],
	  cameraPos: [43, 0, 0],
	  cameraAspect: containerEl.offsetWidth / containerEl.offsetHeight,
	  cameraFov: 45
	});
	
	
	const controls = new __WEBPACK_IMPORTED_MODULE_2_three__["OrbitControls"](camera);
	controls.enableDamping = false;
	controls.rotateSpeed = 0.5;
	controls.dampingFactor = 0.25;
	
	const sphere = Object(__WEBPACK_IMPORTED_MODULE_8__sphere__["a" /* default */])({
	  fragmentShader: __WEBPACK_IMPORTED_MODULE_3__shaders_frag_glsl___default.a,
	  vertexShader: __WEBPACK_IMPORTED_MODULE_4__shaders_vert_glsl___default.a
	});
	
	scene.add(sphere);
	window.addEventListener('resize', () => {
	  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight);
	  camera.aspect = containerEl.offsetWidth / containerEl.offsetHeight;
	  camera.updateProjectionMatrix();
	});
	
	Object(__WEBPACK_IMPORTED_MODULE_7__render_loop__["a" /* default */])({ renderer, scene, camera, controls, time: sphere.material.uniforms.time});
	
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
	
	// removed by extract-text-webpack-plugin
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {
	
	// removed by extract-text-webpack-plugin
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {
	
	module.exports = "#define GLSLIFY 1\n// #pragma glslify: pnoise = require('glsl-noise/classic/3d');\nvarying vec2 vUv;\nvarying float noise;\nvarying vec3 pos;\nuniform float time;\nuniform sampler2D texture;\n\nvoid main() {\n\n  // compose the colour using the UV coordinate\n  // and modulate it with the noise like ambient occlusion\n  // vec3 color = vec3( vUv * ( 1. - 1.5 * noise ), 1.0 );\n  // gl_FragColor = vec4( color.rgb, 1.0 );\n\n  // black and white\n  vec3 blackAndWhite = vec3(1. - 2.0 * noise);\n  \n  //\n  float r = 1. - 2.0 * noise;\n  float g = 0.0;\n  float b = 1. - 1.0 * noise;\n  vec3 foo = vec3(r*2.0, g, b*1.5);\n\n  // gl_FragColor = vec4( foo, 1.0 );\n  // gl_FragColor = vec4( foo, 1.0 ) * texture2D( texture, vec2(pos.x, pos.y) );\n  gl_FragColor = vec4( foo, 1.0 ) * texture2D( texture, vec2(vUv.x, vUv.y / 2.0) );\n  // gl_FragColor = texture2D( texture, gl_PointCoord );\n\n}"
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports) {
	
	module.exports = "#define GLSLIFY 1\n//#pragma glslify: cnoise3 = require('glsl-noise/classic/3d');\n//\n// GLSL textureless classic 3D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x)\n{\n  return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade_1_3(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_1_4(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289_1_0(Pi0);\n  Pi1 = mod289_1_0(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_1_1(permute_1_1(ix) + iy);\n  vec4 ixy0 = permute_1_1(ixy + iz0);\n  vec4 ixy1 = permute_1_1(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_1_2(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_1_2(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_1_3(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise_1_5(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289_1_0(Pi0);\n  Pi1 = mod289_1_0(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_1_1(permute_1_1(ix) + iy);\n  vec4 ixy0 = permute_1_1(ixy + iz0);\n  vec4 ixy1 = permute_1_1(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_1_2(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_1_2(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_1_3(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n\n\nuniform float time;\n\nvarying vec2 vUv;\nvarying vec3 pos;\nvarying float noise;\n\nfloat fac = 10.0;\n\nfloat turbulence( vec3 p ) {\n\n  // float w = 100.0;\n  float t = -.5;\n\n  for (float f = 1.0 ; f <= 1.0 ; f++ ) {\n    float power = pow( 2.0, f );\n    t += abs(\n      pnoise_1_5(\n        vec3( power * p ),\n        vec3( fac, fac, fac )\n      ) / power\n    );\n  }\n\n  return t;\n\n}\n\nvoid main() {\n\n  vUv = uv * 200.0;\n\n  // get a turbulent 3d noise using the normal, normal to high freq\n  noise = 10.0 *  -.10 * turbulence( .5 * normal + time );\n  // get a 3d noise using the position, low frequency\n  float b = 5.0 * pnoise_1_5( 0.05 * position, vec3( 100.0 ) );\n  // compose both noises\n  float displacement = (- 10. * noise) + b;\n\n  // move the position along the normal and transform it\n  vec3 newPosition = position + normal * displacement;\n  pos = newPosition;\n  gl_PointSize = 50.0;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}"
	
	/***/ }),
	/* 6 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
	
	
	function Renderer({containerEl, clearColor}) {
	  const renderer = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]({antialias: true, alpha: true});
	  const w = $(".bg_area").width();
	  const h = $(".bg_area").height();
	 
	   /*const w = containerEl.offsetWidth;
	  const h = containerEl.offsetHeight;*/
	  
	  renderer.setSize(w, h);
	  if (clearColor) {
		renderer.setClearColor(clearColor);
	  }
	  renderer.setPixelRatio(window.devicePixelRatio);
	  containerEl.appendChild(renderer.domElement);
	  return renderer;
	}
	
	/* harmony default export */ __webpack_exports__["a"] = (Renderer);
	
	/***/ }),
	/* 7 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
	
	
	function Scene({cameraPos, cameraFov, cameraAspect}) {
	  const scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
	  const camera = new __WEBPACK_IMPORTED_MODULE_0_three__["PerspectiveCamera"]( cameraFov, cameraAspect, 1, 10000 );
		camera.position.set(...cameraPos);
		camera.lookAt(scene.position);
		
		scene.add(camera);
	  return { scene, camera };
	}
	
	/* harmony default export */ __webpack_exports__["a"] = (Scene);
	
	/***/ }),
	/* 8 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	function RenderLoop({renderer, scene, camera, controls, time}) {
	  if (controls) {
		controls.update();
	  }
	  time.value += 0.0025;
	  timer_cloud_2=window.requestAnimationFrame(() => RenderLoop({renderer, scene, camera, controls, time}));
	  renderer.render(scene, camera);
	}
	
	/* harmony default export */ __webpack_exports__["a"] = (RenderLoop);
	
	/***/ }),
	/* 9 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__circle_texture__ = __webpack_require__(10);
	
	
	
	function Sphere({fragmentShader, vertexShader}) {
	
	  const textureLoader = new __WEBPACK_IMPORTED_MODULE_0_three__["TextureLoader"]();
	  textureLoader.crossOrigin = '';
	
	  const geo = new __WEBPACK_IMPORTED_MODULE_0_three__["IcosahedronGeometry"](20, 4);
	  const material = new __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"]( {
		uniforms: {
		  time: { value: 0.0 },
		  texture: { value: new __WEBPACK_IMPORTED_MODULE_0_three__["CanvasTexture"](Object(__WEBPACK_IMPORTED_MODULE_1__circle_texture__["a" /* CircleTexture */])({})) },
		  // texture: { value: textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1081752/spark1.png") },
		  resolution: { value: new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]() }
		},
		fragmentShader,
		vertexShader
	  });
	  material.uniforms.texture.value.wrapS = material.uniforms.texture.value.wrapT = __WEBPACK_IMPORTED_MODULE_0_three__["RepeatWrapping"]
	  const sphere = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](geo, material);
	  sphere.rotation.set(0, Math.PI, 0);
	  return sphere;
	}
	
	/* harmony default export */ __webpack_exports__["a"] = (Sphere);
	
	
	/***/ }),
	/* 10 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	
	"use strict";
	/* harmony export (binding) */ 
	__webpack_require__.d(__webpack_exports__, "a", function() { return CircleTexture; });
	function CircleTexture({resolution = 64, color = '#ffffff'}) {
	  const canvas = document.createElement('canvas');
	  const ctx = canvas.getContext('2d');
	  canvas.height = resolution * window.devicePixelRatio * 6;
	  canvas.width = resolution * window.devicePixelRatio * 6;
	
	  const x = resolution * window.devicePixelRatio;
	  const y = resolution * window.devicePixelRatio;
	  // const x = 64;
	  // const y = 64;
	  const radius = resolution * window.devicePixelRatio;
	  // const radius = 64;
	  const startAngle = 0;
	  const endAngle = Math.PI * 2;
	
	  ctx.fillStyle = color;
	
	  ctx.arc(x, y, radius, startAngle, endAngle);
	  ctx.fill();
	
	  return canvas;
	}
	
	
	
	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {
	
	/* WEBPACK VAR INJECTION */(function(THREE) {/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	
	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finger swipe
	
	THREE.OrbitControls = function ( object, domElement ) {
	
		this.object = object;
	
		this.domElement = ( domElement !== undefined ) ? domElement : document;
	
		// Set to false to disable this control
		this.enabled = true;
	
		// "target" sets the location of focus, where the object orbits around
		this.target = new THREE.Vector3();
	
		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;
	
		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;
	
		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians
	
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians
	
		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;
	
		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = false;
		this.zoomSpeed = 1.0;
	
		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;
	
		// Set to false to disable panning
		this.enablePan = false;
		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
	
		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
	
		// Set to false to disable use of the keys
		this.enableKeys = false;
	
		// The four arrow keys
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
		// Mouse buttons
		this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
	
		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;
	
		//
		// public methods
		//
	
		this.getPolarAngle = function () {
	
			return spherical.phi;
	
		};
	
		this.getAzimuthalAngle = function () {
	
			return spherical.theta;
	
		};
	
		this.saveState = function () {
	
			scope.target0.copy( scope.target );
			scope.position0.copy( scope.object.position );
			scope.zoom0 = scope.object.zoom;
	
		};
	
		this.reset = function () {
	
			scope.target.copy( scope.target0 );
			scope.object.position.copy( scope.position0 );
			scope.object.zoom = scope.zoom0;
	
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );
	
			scope.update();
	
			state = STATE.NONE;
	
		};
	
		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = function () {
	
			var offset = new THREE.Vector3();
	
			// so camera.up is the orbit axis
			var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
			var quatInverse = quat.clone().inverse();
	
			var lastPosition = new THREE.Vector3();
			var lastQuaternion = new THREE.Quaternion();
	
			return function update() {
	
				var position = scope.object.position;
	
				offset.copy( position ).sub( scope.target );
	
				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion( quat );
	
				// angle from z-axis around y-axis
				spherical.setFromVector3( offset );
	
				if ( scope.autoRotate && state === STATE.NONE ) {
	
					rotateLeft( getAutoRotationAngle() );
	
				}
	
				spherical.theta += sphericalDelta.theta;
				spherical.phi += sphericalDelta.phi;
	
				// restrict theta to be between desired limits
				spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );
	
				// restrict phi to be between desired limits
				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );
	
				spherical.makeSafe();
	
	
				spherical.radius *= scale;
	
				// restrict radius to be between desired limits
				spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );
	
				// move target to panned location
				scope.target.add( panOffset );
	
				offset.setFromSpherical( spherical );
	
				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion( quatInverse );
	
				position.copy( scope.target ).add( offset );
	
				scope.object.lookAt( scope.target );
	
				if ( scope.enableDamping === true ) {
	
					sphericalDelta.theta *= ( 1 - scope.dampingFactor );
					sphericalDelta.phi *= ( 1 - scope.dampingFactor );
	
				} else {
	
					sphericalDelta.set( 0, 0, 0 );
	
				}
	
				scale = 1;
				panOffset.set( 0, 0, 0 );
	
				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8
	
				if ( zoomChanged ||
					lastPosition.distanceToSquared( scope.object.position ) > EPS ||
					8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {
	
					scope.dispatchEvent( changeEvent );
	
					lastPosition.copy( scope.object.position );
					lastQuaternion.copy( scope.object.quaternion );
					zoomChanged = false;
	
					return true;
	
				}
	
				return false;
	
			};
	
		}();
	
		this.dispose = function () {
	
			scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
			scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
			scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );
	
			scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
			scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
			scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );
	
			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );
	
			window.removeEventListener( 'keydown', onKeyDown, false );
	
			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
	
		};
	
		//
		// internals
		//
	
		var scope = this;
	
		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };
	
		var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
	
		var state = STATE.NONE;
	
		var EPS = 0.000001;
	
		// current position in spherical coordinates
		var spherical = new THREE.Spherical();
		var sphericalDelta = new THREE.Spherical();
	
		var scale = 1;
		var panOffset = new THREE.Vector3();
		var zoomChanged = false;
	
		var rotateStart = new THREE.Vector2();
		var rotateEnd = new THREE.Vector2();
		var rotateDelta = new THREE.Vector2();
	
		var panStart = new THREE.Vector2();
		var panEnd = new THREE.Vector2();
		var panDelta = new THREE.Vector2();
	
		var dollyStart = new THREE.Vector2();
		var dollyEnd = new THREE.Vector2();
		var dollyDelta = new THREE.Vector2();
	
		function getAutoRotationAngle() {
	
			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	
		}
	
		function getZoomScale() {
	
			return Math.pow( 0.95, scope.zoomSpeed );
	
		}
	
		function rotateLeft( angle ) {
	
			sphericalDelta.theta -= angle;
	
		}
	
		function rotateUp( angle ) {
	
			sphericalDelta.phi -= angle;
	
		}
	
		var panLeft = function () {
	
			var v = new THREE.Vector3();
	
			return function panLeft( distance, objectMatrix ) {
	
				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
				v.multiplyScalar( - distance );
	
				panOffset.add( v );
	
			};
	
		}();
	
		var panUp = function () {
	
			var v = new THREE.Vector3();
	
			return function panUp( distance, objectMatrix ) {
	
				v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
				v.multiplyScalar( distance );
	
				panOffset.add( v );
	
			};
	
		}();
	
		// deltaX and deltaY are in pixels; right and down are positive
		var pan = function () {
	
			var offset = new THREE.Vector3();
	
			return function pan( deltaX, deltaY ) {
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				if ( scope.object.isPerspectiveCamera ) {
	
					// perspective
					var position = scope.object.position;
					offset.copy( position ).sub( scope.target );
					var targetDistance = offset.length();
	
					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );
	
					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
					panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );
	
				} else if ( scope.object.isOrthographicCamera ) {
	
					// orthographic
					panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
					panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );
	
				} else {
	
					// camera neither orthographic nor perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
					scope.enablePan = false;
	
				}
	
			};
	
		}();
	
		function dollyIn( dollyScale ) {
	
			if ( scope.object.isPerspectiveCamera ) {
	
				scale /= dollyScale;
	
			} else if ( scope.object.isOrthographicCamera ) {
	
				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
	
			} else {
	
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;
	
			}
	
		}
	
		function dollyOut( dollyScale ) {
	
			if ( scope.object.isPerspectiveCamera ) {
	
				scale *= dollyScale;
	
			} else if ( scope.object.isOrthographicCamera ) {
	
				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
	
			} else {
	
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;
	
			}
	
		}
	
		//
		// event callbacks - update the object state
		//
	
		function handleMouseDownRotate( event ) {
	
			//console.log( 'handleMouseDownRotate' );
	
			rotateStart.set( event.clientX, event.clientY );
	
		}
	
		function handleMouseDownDolly( event ) {
	
			//console.log( 'handleMouseDownDolly' );
	
			dollyStart.set( event.clientX, event.clientY );
	
		}
	
		function handleMouseDownPan( event ) {
	
			//console.log( 'handleMouseDownPan' );
	
			panStart.set( event.clientX, event.clientY );
	
		}
	
		function handleMouseMoveRotate( event ) {
	
			//console.log( 'handleMouseMoveRotate' );
	
			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );
	
			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
			// rotating across whole screen goes 360 degrees around
			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	
			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
			rotateStart.copy( rotateEnd );
	
			scope.update();
	
		}
	
		function handleMouseMoveDolly( event ) {
	
			//console.log( 'handleMouseMoveDolly' );
	
			dollyEnd.set( event.clientX, event.clientY );
	
			dollyDelta.subVectors( dollyEnd, dollyStart );
	
			if ( dollyDelta.y > 0 ) {
	
				dollyIn( getZoomScale() );
	
			} else if ( dollyDelta.y < 0 ) {
	
				dollyOut( getZoomScale() );
	
			}
	
			dollyStart.copy( dollyEnd );
	
			scope.update();
	
		}
	
		function handleMouseMovePan( event ) {
	
			//console.log( 'handleMouseMovePan' );
	
			panEnd.set( event.clientX, event.clientY );
	
			panDelta.subVectors( panEnd, panStart );
	
			pan( panDelta.x, panDelta.y );
	
			panStart.copy( panEnd );
	
			scope.update();
	
		}
	
		function handleMouseUp( event ) {
	
			// console.log( 'handleMouseUp' );
	
		}
	
		function handleMouseWheel( event ) {
	
			// console.log( 'handleMouseWheel' );
	
			if ( event.deltaY < 0 ) {
	
				dollyOut( getZoomScale() );
	
			} else if ( event.deltaY > 0 ) {
	
				dollyIn( getZoomScale() );
	
			}
	
			scope.update();
	
		}
	
		function handleKeyDown( event ) {
	
			//console.log( 'handleKeyDown' );
	
			switch ( event.keyCode ) {
	
				case scope.keys.UP:
					pan( 0, scope.keyPanSpeed );
					scope.update();
					break;
	
				case scope.keys.BOTTOM:
					pan( 0, - scope.keyPanSpeed );
					scope.update();
					break;
	
				case scope.keys.LEFT:
					pan( scope.keyPanSpeed, 0 );
					scope.update();
					break;
	
				case scope.keys.RIGHT:
					pan( - scope.keyPanSpeed, 0 );
					scope.update();
					break;
	
			}
	
		}
	
		function handleTouchStartRotate( event ) {
	
			//console.log( 'handleTouchStartRotate' );
	
			rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	
		}
	
		function handleTouchStartDolly( event ) {
	
			//console.log( 'handleTouchStartDolly' );
	
			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	
			var distance = Math.sqrt( dx * dx + dy * dy );
	
			dollyStart.set( 0, distance );
	
		}
	
		function handleTouchStartPan( event ) {
	
			//console.log( 'handleTouchStartPan' );
	
			panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	
		}
	
		function handleTouchMoveRotate( event ) {
	
			//console.log( 'handleTouchMoveRotate' );
	
			rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
			rotateDelta.subVectors( rotateEnd, rotateStart );
	
			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
			// rotating across whole screen goes 360 degrees around
			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	
			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
			rotateStart.copy( rotateEnd );
	
			scope.update();
	
		}
	
		function handleTouchMoveDolly( event ) {
	
			//console.log( 'handleTouchMoveDolly' );
	
			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
	
			var distance = Math.sqrt( dx * dx + dy * dy );
	
			dollyEnd.set( 0, distance );
	
			dollyDelta.subVectors( dollyEnd, dollyStart );
	
			if ( dollyDelta.y > 0 ) {
	
				dollyOut( getZoomScale() );
	
			} else if ( dollyDelta.y < 0 ) {
	
				dollyIn( getZoomScale() );
	
			}
	
			dollyStart.copy( dollyEnd );
	
			scope.update();
	
		}
	
		function handleTouchMovePan( event ) {
	
			//console.log( 'handleTouchMovePan' );
	
			panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
	
			panDelta.subVectors( panEnd, panStart );
	
			pan( panDelta.x, panDelta.y );
	
			panStart.copy( panEnd );
	
			scope.update();
	
		}
	
		function handleTouchEnd( event ) {
	
			//console.log( 'handleTouchEnd' );
	
		}
	
		//
		// event handlers - FSM: listen for events and reset state
		//
	
		function onMouseDown( event ) {
	
			if ( scope.enabled === false ) return;
	
			event.preventDefault();
	
			switch ( event.button ) {
	
				case scope.mouseButtons.ORBIT:
	
					if ( scope.enableRotate === false ) return;
	
					handleMouseDownRotate( event );
	
					state = STATE.ROTATE;
	
					break;
	
				case scope.mouseButtons.ZOOM:
	
					if ( scope.enableZoom === false ) return;
	
					handleMouseDownDolly( event );
	
					state = STATE.DOLLY;
	
					break;
	
				case scope.mouseButtons.PAN:
	
					if ( scope.enablePan === false ) return;
	
					handleMouseDownPan( event );
	
					state = STATE.PAN;
	
					break;
	
			}
	
			if ( state !== STATE.NONE ) {
	
				document.addEventListener( 'mousemove', onMouseMove, false );
				document.addEventListener( 'mouseup', onMouseUp, false );
	
				scope.dispatchEvent( startEvent );
	
			}
	
		}
	
		function onMouseMove( event ) {
	
			if ( scope.enabled === false ) return;
	
			event.preventDefault();
	
			switch ( state ) {
	
				case STATE.ROTATE:
	
					if ( scope.enableRotate === false ) return;
	
					handleMouseMoveRotate( event );
	
					break;
	
				case STATE.DOLLY:
	
					if ( scope.enableZoom === false ) return;
	
					handleMouseMoveDolly( event );
	
					break;
	
				case STATE.PAN:
	
					if ( scope.enablePan === false ) return;
	
					handleMouseMovePan( event );
	
					break;
	
			}
	
		}
	
		function onMouseUp( event ) {
	
			if ( scope.enabled === false ) return;
	
			handleMouseUp( event );
	
			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );
	
			scope.dispatchEvent( endEvent );
	
			state = STATE.NONE;
	
		}
	
		function onMouseWheel( event ) {
	
			if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;
	
			event.preventDefault();
			event.stopPropagation();
	
			handleMouseWheel( event );
	
			scope.dispatchEvent( startEvent ); // not sure why these are here...
			scope.dispatchEvent( endEvent );
	
		}
	
		function onKeyDown( event ) {
	
			if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;
	
			handleKeyDown( event );
	
		}
	
		function onTouchStart( event ) {
	
			if ( scope.enabled === false ) return;
	
			switch ( event.touches.length ) {
	
				case 1:	// one-fingered touch: rotate
	
					if ( scope.enableRotate === false ) return;
	
					handleTouchStartRotate( event );
	
					state = STATE.TOUCH_ROTATE;
	
					break;
	
				case 2:	// two-fingered touch: dolly
	
					if ( scope.enableZoom === false ) return;
	
					handleTouchStartDolly( event );
	
					state = STATE.TOUCH_DOLLY;
	
					break;
	
				case 3: // three-fingered touch: pan
	
					if ( scope.enablePan === false ) return;
	
					handleTouchStartPan( event );
	
					state = STATE.TOUCH_PAN;
	
					break;
	
				default:
	
					state = STATE.NONE;
	
			}
	
			if ( state !== STATE.NONE ) {
	
				scope.dispatchEvent( startEvent );
	
			}
	
		}
	
		function onTouchMove( event ) {
	
			if ( scope.enabled === false ) return;
	
			event.preventDefault();
			event.stopPropagation();
	
			switch ( event.touches.length ) {
	
				case 1: // one-fingered touch: rotate
	
					if ( scope.enableRotate === false ) return;
					if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...
	
					handleTouchMoveRotate( event );
	
					break;
	
				case 2: // two-fingered touch: dolly
	
					if ( scope.enableZoom === false ) return;
					if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...
	
					handleTouchMoveDolly( event );
	
					break;
	
				case 3: // three-fingered touch: pan
	
					if ( scope.enablePan === false ) return;
					if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...
	
					handleTouchMovePan( event );
	
					break;
	
				default:
	
					state = STATE.NONE;
	
			}
	
		}
	
		function onTouchEnd( event ) {
	
			if ( scope.enabled === false ) return;
	
			handleTouchEnd( event );
	
			scope.dispatchEvent( endEvent );
	
			state = STATE.NONE;
	
		}
	
		function onContextMenu( event ) {
	
			if ( scope.enabled === false ) return;
	
			event.preventDefault();
	
		}
	
		//
	
		scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );
	
		scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.addEventListener( 'wheel', onMouseWheel, false );
	
		scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.addEventListener( 'touchmove', onTouchMove, false );
	
		window.addEventListener( 'keydown', onKeyDown, false );
	
		// force an update at start
	
		this.update();
	
	};
	
	THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
	THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
	
	Object.defineProperties( THREE.OrbitControls.prototype, {
	
		center: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
				return this.target;
	
			}
	
		},
	
		// backward compatibility
	
		noZoom: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				return ! this.enableZoom;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				this.enableZoom = ! value;
	
			}
	
		},
	
		noRotate: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				return ! this.enableRotate;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				this.enableRotate = ! value;
	
			}
	
		},
	
		noPan: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				return ! this.enablePan;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				this.enablePan = ! value;
	
			}
	
		},
	
		noKeys: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				return ! this.enableKeys;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				this.enableKeys = ! value;
	
			}
	
		},
	
		staticMoving: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				return ! this.enableDamping;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				this.enableDamping = ! value;
	
			}
	
		},
	
		dynamicDampingFactor: {
	
			get: function () {
	
				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				return this.dampingFactor;
	
			},
	
			set: function ( value ) {
	
				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				this.dampingFactor = value;
	
			}
	
		}
	
	} );
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))
	
	/***/ })
	/******/ ]);
	
	
	//$(".con_wrap_3").addClass("wrap_prepare");
	//$(".bg_area_2").hide();
	//浜�2
	
	
	//浜�3
	
	
	//var leafArray=[];
	//var finish_tree=false;
	var leafColor="#fff";
	
//(function () {
		
	var canvas_width = $(".bg_area").width()*2.6;

	var canvas_height = $(".bg_area").height()*2.6;
		
		
	var canvas_leaf=$(".cloud_3_1")[0];	

	canvas_leaf.width = canvas_width;

	canvas_leaf.height = canvas_height;
	
	var ctx_leaf = canvas_leaf.getContext("2d");
	
		

	var Vector = function (x, y) {

		this.x = x || 0;

		this.y = y || 0;

	};

	Vector.prototype = {

		add: function (v) {

			this.x += v.x;

			this.y += v.y;

			return this;

		},

		length: function () {

			return Math.sqrt(this.x * this.x + this.y * this.y);

		},

		rotate: function (theta) {

			var x = this.x;

			var y = this.y;

			this.x = Math.cos(theta) * this.x - Math.sin(theta) * this.y;

			this.y = Math.sin(theta) * this.x + Math.cos(theta) * this.y;

			//this.x = Math.cos(theta) * x - Math.sin(theta) * y;

			//this.y = Math.sin(theta) * x + Math.cos(theta) * y;

			return this;

		},

		mult: function (f) {

			this.x *= f;

			this.y *= f;

			return this;

		}

	};



	var Leaf = function (p, r, c, ctx) {

		this.p = p || null;

		this.r = r || 0;

		this.c = c || 'rgba(255,255,255,1.0)';

		this.ctx = ctx;

	}



	Leaf.prototype = {

		/*render: function () {

			var that = this;

			var ctx = this.ctx;
			
			ctx.fillStyle = that.color;

			//var f = Branch.random(1, 2)

			for (var i = 0; i < 5; i++) { // i鍙互璋冩暣鍙跺瓙棰楃矑澶у皬

				(function (r) {

					setTimeout(function () {
						
						//ctx.globalCompositeOperation = "lighter";

						ctx.beginPath();

						//ctx.fillStyle = that.color;

						ctx.moveTo(that.p.x, that.p.y);

						ctx.arc(that.p.x, that.p.y, r, 0, Branch.circle, true); //棰楃矑鎱㈡參鍙樺ぇ

						ctx.fill();
						
						if(r>3){
							ctx.globalCompositeOperation = "lighter";
						}else{
							ctx.globalCompositeOperation = "source-over";
						}
						

					}, r * 60);

				})(i);

			}

		}*/
		
		render: function () {
			
			message.placement.push(new particle(this.p.x, this.p.y));

	//		var that = this;
//
//			var ctx = ctx_leaf;
//			
//			//ctx.fillStyle = that.color;
//			
//			ctx.fillStyle = that.c;
//
//			//var f = Branch.random(1, 2)
//
//			//for (var i = 0; i < 5; i++) { // i鍙互璋冩暣鍙跺瓙棰楃矑澶у皬
//
//				(function (r) {
//
//					setTimeout(function () {
//						
//						//ctx.globalCompositeOperation = "lighter";
//
//						ctx.beginPath();
//
//						ctx.fillStyle = that.c;
//
//						ctx.moveTo(that.p.x, that.p.y);
//						
//						if(r==0){
//						
//							leafArray.push(that.p);
//						
//						}
//
//						ctx.arc(that.p.x, that.p.y, r, 0, Branch.circle, true); //棰楃矑鎱㈡參鍙樺ぇ
//
//						ctx.fill();
//						/*
//						if(r>3){
//							ctx.globalCompositeOperation = "lighter";
//						}else{
//							ctx.globalCompositeOperation = "source-over";
//						}*/
//						ctx.globalCompositeOperation = "lighter";
//
//					}, r * 60);
//
//				})(i);
//
//			}

		}

	}





	var Branch = function (p, v, r, c, t, a, g, tall,fo) {
		
		this.a = a || []; //array琛�
		
		this.tall = tall || 1; //琛�
		
		this.fo = fo || {"min":2,"max":4}; //fork琛�

		this.p = p || null;

		this.v = v || null;

		this.r = r || 0;

		this.length = 0;

		this.generation = g || 1;

		this.tree = t || null;

		this.color = c || 'rgba(255,255,255,1.0)';

		this.register();

	};


	Branch.prototype = {

		register: function () {

			this.tree.addBranch(this);

		},

		draw: function () {
			
			

			var ctx = this.tree.ctx;
			
			/*ctx.save();
			ctx.globalAlpha=0.2;
			ctx.fillStyle = "#000";
			ctx.fillRect(0,0,$(".bg_area").width()*2.6,$(".bg_area").height()*2.6);
			ctx.restore();*/

			ctx.beginPath();

			ctx.fillStyle = this.color;

			if(this.a.length<2){
				ctx.moveTo(this.p.x, this.p.y);
			}else{
				ctx.moveTo(this.a[this.a.length-1].x, this.a[this.a.length-1].y);
			}
			ctx.lineTo(this.p.x, this.p.y);
			
			//console.log(this.p.x+" "+this.p.y);
			//console.log(this.a);
			
			ctx.lineWidth = 1;//绾挎潯鐨勫搴�
			ctx.strokeStyle = this.color;
			ctx.closePath();
			ctx.stroke();
			
			
			/*ctx.moveTo(this.p.x, this.p.y);

			ctx.arc(this.p.x, this.p.y, this.r, 0, Branch.circle, true);

			ctx.fill();*/
			//rgba(244,217,128,0.5) 閲戦粍鑹�

		},

		modify: function () {

			var angle = 0.17 - (0.10 / this.generation); //璁╄搴﹂殢鏈虹殑鏇村ぇ 0.18
			
			
			/*if(this.a.length>1){
				this.a.shift();
			}*/
			this.addDot({
				"x":this.p.x,
				"y":this.p.y
			});
			
			
			
			//console.log(this.p);

			this.p.add(this.v);

			this.length += this.v.length()/(this.generation*0.3);
			
			this.length *=this.tall;

			this.r =1;//*= 0.99;

			this.v.rotate(Branch.random(-angle, angle)); //.mult(0.996);

			if (/*this.r < 0.8 || */this.generation > 5) { //褰撻暱鍒扮5浠�

				this.tree.removeBranch(this); //涓嶇户缁敓闀挎灊骞诧紝鐢熸垚鍙跺瓙缁撶偣锛岀粨鏉�
				
				//this.color=Branch.randomrgba(80, 255, 0.5);
				//console.log(this.color);
				
				//Branch.randomrgba(80, 255, 0.5);
				//leafArray.push(this.p);
				var l = new Leaf(this.p, 10, this.color, this.tree.ctx);
				l.render();

			}
			
			

		},

		grow: function () {

			this.draw();

			this.modify();

			this.fork();

		},

		fork: function () {
			
			var p = this.length - Branch.random(100, 200); // + (this.generation * 10);
			

			if (p > 0) {

				var n = Math.round(Branch.random(this.fo.min, this.fo.max)); //2,5鍒嗗弶鏁伴噺

				this.tree.stat.fork += n - 1;
				

				for (var i = 0; i < n; i++) {

					Branch.clone(this); //

				}

				this.tree.removeBranch(this);

			}

		},
		
		addDot:function(dot){
			this.a.push(dot);
		}

	};



	Branch.circle = 2 * Math.PI;

	Branch.random = function (min, max) {

		return Math.random() * (max - min) + min;

	};

	Branch.clone = function (b) {
		
		var array_tem=[]; //涓嶈兘鐩存帴b.a浼犲弬锛屽惁鍒欐墍鏈夊垎鏀叡浜竴涓暟缁勬寚閽�
		for(var i=0;i<b.a.length;i++){
			array_tem.push(b.a[i]);
		}
		
		var r = new Branch(new Vector(b.p.x, b.p.y), new Vector(b.v.x, b.v.y), b.r, b.color, b.tree, array_tem, b.generation + 1,b.tall,b.fo);

		r.generation = b.generation + 1; //澧炲姞涓€涓垎鏀瓙绾�

		return r;

	};

	Branch.rgba = function (r, g, b, a) {

		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

	};

	Branch.randomrgba = function (min, max, a) {

		return Branch.rgba(Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), a);

	};


	var Tree = function () {

		var branches = [];

		var timer;

		this.stat = {

			fork: 0,

			length: 0

		};

		this.addBranch = function (b) {

			branches.push(b);

		};

		this.removeBranch = function (b) {

			for (var i = 0; i < branches.length; i++) {

				if (branches[i] === b) {

					branches.splice(i, 1);

					return;

				}

			}

		};

		this.render = function (fn) {

			var that = this;

			/*timer_cloud_3 = setInterval(function () {

				fn.apply(that, arguments);

				if (branches.length > 0) {

					for (var i = 0; i < branches.length; i++) {

						branches[i].grow();

					}

				}

				else {

					//clearInterval(timer);
					//if(finish_tree){
//						
//					}else{
//						console.log("finish");
//						finish_tree=true;
//					}

				}

			}, 1000 / 25);*/
			
			fun_cloud_3_loop=function() {

				fn.apply(that, arguments);

				if (branches.length > 0) {

					for (var i = 0; i < branches.length; i++) {

						branches[i].grow();

					}

				}
				
				timer_cloud_3=window.requestAnimationFrame(fun_cloud_3_loop); //

			}
			
			fun_cloud_3_loop();

		};

		this.init = function (ctx) {

			this.ctx = ctx;

		};

		this.abort = function () {

			branches = [];

			this.stat = {

				fork: 0,

				length: 0

			}

		};

	};



	var ctx_tree;

	function cloud_3_init() {



		// init



		var $window = $(window);

		var $body = $("body");

		/*var canvas_width = $(".bg_area").width()*2.6;

		var canvas_height = $(".bg_area").height()*2.6;*/

		var center_x = canvas_width / 2;

		var stretch_factor = 600 / canvas_height;

		var y_speed = 5 / stretch_factor;




		// tx



		var canvas = $('.cloud_3')[0];

		canvas.width = canvas_width;

		canvas.height = canvas_height;

		var ctx = canvas.getContext("2d");
		ctx_tree=ctx;

	

		// tree



		var t = new Tree();

		t.init(ctx);
	
	
		//澶栧眰
		
		//涓�
		

		var fo={
			"min":2,
			"max":4
		}
		
		var fo2={
			"min":2,
			"max":3
		}

		//var color=Branch.randomrgba(80, 255, 0.4);
		var color=Branch.rgba(255,141,255,0.4);
		leafColor=color;
		console.log(leafColor);
		
		
		for(var j=0;j<2;j++){
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(43) , 1, color, t, [], 2, getTall(0.74),fo2);
		
		
		for (var i = 0; i <2; i++) {
		
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(23) , 1, color, t, [], 2, getTall(0.88),fo);
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(0) , 1, color, t, [], 1, getTall(0.91),fo);
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(337) , 1, color, t, [], 2, getTall(0.88),fo);

		}
		
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(317) , 1, color, t, [], 2, getTall(0.74),fo2);
		
		
		//鍙�
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(65) , 1, color, t, [], 3,  getTall(0.90),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(55) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(53) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(58) , 1, color, t, [], 3,  getTall(0.75),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(63) , 1, color, t, [], 3,  getTall(0.78),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(68) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(73) , 1, color, t, [], 3,  getTall(0.82),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(106) , 1, color, t, [], 3,  getTall(0.82),fo);

		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.93),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.94),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.94),fo);
		
		
		
		//宸�
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(295) , 1, color, t, [], 3,  getTall(0.90),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(305) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(308) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(302) , 1, color, t, [], 3,  getTall(0.75),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(297) , 1, color, t, [], 3,  getTall(0.78),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(292) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(287) , 1, color, t, [], 3,  getTall(0.82),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(254) , 1, color, t, [], 3,  getTall(0.82),fo);
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.93),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.94),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.94),fo);
		
		for (var i = 0; i < 2; i++) {
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.97),fo);

		}
		
		//涓�
		
		for (var i = 0; i < 3; i++) {
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(110) , 1, color, t, [], 3,  getTall(0.89),fo);
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(250) , 1, color, t, [], 3,  getTall(0.89),fo);

		}
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(115) , 1, color, t, [], 3,  getTall(0.88),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(125) , 1, color, t, [], 3,  getTall(0.86),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(135) , 1, color, t, [], 3,  getTall(0.84),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(145) , 1, color, t, [], 3,  getTall(0.82),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(155) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(245) , 1, color, t, [], 3,  getTall(0.88),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(235) , 1, color, t, [], 3,  getTall(0.86),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(225) , 1, color, t, [], 3,  getTall(0.84),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(215) , 1, color, t, [], 3,  getTall(0.82),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(205) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		
		for (var i = 0; i < 2; i++) {
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(180) , 1, color, t, [], 3,  getTall(0.78),fo);

		}
		
		for (var i = 0; i < 2; i++) {
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(196) , 1, color, t, [], 3,  getTall(0.80),fo);

		}
		
		for (var i = 0; i < 2; i++) {
			
			new Branch(new Vector(center_x, canvas_height/3*2), degToVec(164) , 1, color, t, [], 3,  getTall(0.80),fo);

		}
		
		}
		//澶栧眰
		
		
		//鍐呭眰
		
		
		//涓�
		
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(23) , 1, color, t, [], 3, getTall(0.78),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(0) , 1, color, t, [], 2, getTall(0.81),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(337) , 1, color, t, [], 3, getTall(0.78),fo);

		
		//鍙�
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(65) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(55) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(53) , 1, color, t, [], 3,  getTall(0.60),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(58) , 1, color, t, [], 3,  getTall(0.65),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(63) , 1, color, t, [], 3,  getTall(0.68),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(68) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(73) , 1, color, t, [], 3,  getTall(0.72),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(106) , 1, color, t, [], 3,  getTall(0.72),fo);

		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.83),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.84),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 2,  getTall(0.84),fo);
		
		
		//宸�
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(295) , 1, color, t, [], 3,  getTall(0.80),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(305) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(308) , 1, color, t, [], 3,  getTall(0.60),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(302) , 1, color, t, [], 3,  getTall(0.65),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(297) , 1, color, t, [], 3,  getTall(0.68),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(292) , 1, color, t, [], 3,  getTall(0.70),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(287) , 1, color, t, [], 3,  getTall(0.72),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(254) , 1, color, t, [], 3,  getTall(0.72),fo);
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.83),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.84),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.84),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 2,  getTall(0.87),fo);

		
		//涓�
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(110) , 1, color, t, [], 3,  getTall(0.69),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(250) , 1, color, t, [], 3,  getTall(0.69),fo);

		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(115) , 1, color, t, [], 3,  getTall(0.68),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(125) , 1, color, t, [], 3,  getTall(0.66),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(135) , 1, color, t, [], 3,  getTall(0.64),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(145) , 1, color, t, [], 3,  getTall(0.62),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(155) , 1, color, t, [], 3,  getTall(0.60),fo);
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(245) , 1, color, t, [], 3,  getTall(0.68),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(235) , 1, color, t, [], 3,  getTall(0.66),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(225) , 1, color, t, [], 3,  getTall(0.64),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(215) , 1, color, t, [], 3,  getTall(0.62),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(205) , 1, color, t, [], 3,  getTall(0.60),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(180) , 1, color, t, [], 3,  getTall(0.58),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(196) , 1, color, t, [], 3,  getTall(0.60),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(164) , 1, color, t, [], 3,  getTall(0.60),fo);

		
		//鍐呭眰
		
		//涓績灞�
		
		
		//涓�
		
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(23) , 1, color, t, [], 4, getTall(0.58),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(0) , 1, color, t, [], 3, getTall(0.61),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(337) , 1, color, t, [], 4, getTall(0.58),fo);

		
		//鍙�
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(65) , 1, color, t, [], 4,  getTall(0.60),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(55) , 1, color, t, [], 4,  getTall(0.50),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(53) , 1, color, t, [], 4,  getTall(0.40),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(58) , 1, color, t, [], 4,  getTall(0.45),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(63) , 1, color, t, [], 4,  getTall(0.48),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(68) , 1, color, t, [], 4,  getTall(0.50),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(73) , 1, color, t, [], 4,  getTall(0.52),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(106) , 1, color, t, [], 4,  getTall(0.52),fo);

		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(90) , 1, color, t, [], 3,  getTall(0.67),fo);
		
		
		//宸�
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(295) , 1, color, t, [], 4,  getTall(0.60),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(305) , 1, color, t, [], 4,  getTall(0.50),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(308) , 1, color, t, [], 4,  getTall(0.40),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(302) , 1, color, t, [], 4,  getTall(0.45),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(297) , 1, color, t, [], 4,  getTall(0.48),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(292) , 1, color, t, [], 4,  getTall(0.50),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(287) , 1, color, t, [], 4,  getTall(0.52),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(254) , 1, color, t, [], 4,  getTall(0.52),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(270) , 1, color, t, [], 3,  getTall(0.67),fo);

		
		//涓�
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(110) , 1, color, t, [], 4,  getTall(0.49),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(250) , 1, color, t, [], 4,  getTall(0.49),fo);

		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(115) , 1, color, t, [], 4,  getTall(0.48),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(125) , 1, color, t, [], 4,  getTall(0.46),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(135) , 1, color, t, [], 4,  getTall(0.44),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(145) , 1, color, t, [], 4,  getTall(0.42),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(155) , 1, color, t, [], 4,  getTall(0.40),fo);
		
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(245) , 1, color, t, [], 4,  getTall(0.48),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(235) , 1, color, t, [], 4,  getTall(0.46),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(225) , 1, color, t, [], 4,  getTall(0.44),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(215) , 1, color, t, [], 4,  getTall(0.42),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(205) , 1, color, t, [], 4,  getTall(0.40),fo);
		
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(180) , 1, color, t, [], 4,  getTall(0.38),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(196) , 1, color, t, [], 4,  getTall(0.40),fo);
		new Branch(new Vector(center_x, canvas_height/3*2), degToVec(164) , 1, color, t, [], 4,  getTall(0.40),fo);

		
		//涓績灞�


		t.render(function () {

			//$statMsg.html(this.stat.fork);

		});
		
		function getTall(num){
			if(num>=0&&num<=1){
				var tall=2-num;
			}else{
				
				return 1;
				
			}
			
			return tall;
		}


		function degToVec(angle){
			//12鐐规柟鍚戜负0deg
			if(angle<0){
				var deg=angle+360;
			}else{
				var deg=angle;
			}
			
			//console.log(Math.tan(0)+" "+Math.tan(60*Math.PI/180)+" "+Math.tan(180*Math.PI/180)+" "+Math.tan(270*Math.PI/180));
			
			//console.log(deg);
			
			if(deg>=0&&deg<90){
				
				if(deg>=0&&deg<15){
					
					var y=-1*y_speed;
					var x=0;
					
				}else if(deg>=75&&deg<90){
					
					var y=0;
					var x=y_speed;
					
				}else{
					
					var y=-1*y_speed;
					var x=Math.tan(deg*Math.PI/180)*y_speed;
					
				}
				
			}else if(deg>=90&&deg<180){
				
				
				if(deg>=90&&deg<105){
					
					var y=0;
					var x=y_speed;
					
				}else if(deg>=165&&deg<180){
					
					var y=y_speed;
					var x=0;
					
				}else{
					
					var y=y_speed;
					var x=-1*Math.tan(deg*Math.PI/180)*y_speed; // *-1 鍙栨
					
				}
				
				
			}else if(deg>=180&&deg<270){
				
				
				if(deg>=180&&deg<195){
					
					var y=y_speed;
					var x=0;
					
				}else if(deg>=255&&deg<270){
					
					var y=0;
					var x=-1*y_speed;
					
				}else{
					
					var y=y_speed;
					var x=-1*Math.tan(deg*Math.PI/180)*y_speed;
					
				}
				
				
			}else if(deg>=270&&deg<360){
				
				
				if(deg>=270&&deg<285){
					
					var y=0;
					var x=-1*y_speed;
					
				}else if(deg>=345&&deg<360){
					
					var y=-1*y_speed;
					var x=0;
					
				}else{
					
					var y=-1*y_speed;
					var x=Math.tan(deg*Math.PI/180)*y_speed;  // *-1 鍙栬礋
					
				}
				
				
			}
			
			//console.log(x+" "+y);
			
			var vec=new Vector(x, y);
			
			return vec;
			
		} 


	}




/*
	$(function () {

		init();

	});*/

	//cloud_3_init();



/*})();*/
	
	
	
	
	
	//浜�3
	
	
	
	
	//浜�4
	
	var message;
	var touching=1;
	
//(function () {
	
	var utils = {
	  norm: function(value, min, max) {
		return (value - min) / (max - min);
	  },
	
	  lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	  },
	
	  map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	  },
	
	  clamp: function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	  },
	
	  distance: function(p0, p1) {
		var dx = p1.x - p0.x,
		  dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	  },
	
	  distanceXY: function(x0, y0, x1, y1) {
		var dx = x1 - x0,
		  dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	  },
	
	  circleCollision: function(c0, c1) {
		return utils.distance(c0, c1) <= c0.radius + c1.radius;
	  },
	
	  circlePointCollision: function(x, y, circle) {
		return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	  },
	
	  pointInRect: function(x, y, rect) {
		return utils.inRange(x, rect.x, rect.x + rect.radius) &&
		  utils.inRange(y, rect.y, rect.y + rect.radius);
	  },
	
	  inRange: function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	  },
	
	  rangeIntersect: function(min0, max0, min1, max1) {
		return Math.max(min0, max0) >= Math.min(min1, max1) &&
		  Math.min(min0, max0) <= Math.max(min1, max1);
	  },
	
	  rectIntersect: function(r0, r1) {
		return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
		  utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	  },
	
	  degreesToRads: function(degrees) {
		return degrees / 180 * Math.PI;
	  },
	
	  radsToDegrees: function(radians) {
		return radians * 180 / Math.PI;
	  },
	
	  randomRange: function(min, max) {
		return min + Math.random() * (max - min);
	  },
	
	  randomInt: function(min, max) {
		return min + Math.random() * (max - min + 1);
	  },
	
	  getmiddle: function(p0, p1) {
		var x = p0.x,
		  x2 = p1.x;
		middlex = (x + x2) / 2;
		var y = p0.y,
		  y2 = p1.y;
		middley = (y + y2) / 2;
		pos = [middlex, middley];
	
		return pos;
	  },
	
	  getAngle: function(p0, p1) {
		var deltaX = p1.x - p0.x;
		var deltaY = p1.y - p0.y;
		var rad = Math.atan2(deltaY, deltaX);
		return rad;
	  },
	  inpercentW: function(size) {
		return (size * W) / 100;
	  },
	
	  inpercentH: function(size) {
		return (size * H) / 100;
	  },
	
	}
	
	// basic setup  :) 
	
	//canvas = document.getElementById("canvas");
	canvas = $(".cloud_3_1")[0];
	var ctx = canvas.getContext('2d');
	W = canvas.width = $(".bg_area").width()*2.6;
	H = canvas.height = $(".bg_area").height()*2.6;
	
	gravity = -0.01;
	duration =0.3;
	resolution = 20;
	speed = 0.1;
	radius = 4.0;
	
	gridX = resolution;
	gridY = resolution;
	
	function shape(x, y, texte) {
	  this.x = x;
	  this.y = y;
	  this.size = 320;
	
	  this.text = texte;
	  this.placement = [];
	  this.vectors = [];
	
	}
	
	
	/*shape.prototype.getValue = function() {
		//console.log("get black pixels position");
		
		// Draw the shape :^)
		
		//ctx.textAlign = "center";
		//ctx.font = "bold " + this.size + "px arial";
		//ctx.fillText(this.text, this.x, this.y);
		//var img=new Image();
//		img.src="images/color_2.png";
//		var that=this;
//		
//		img.onload=function(){
//			
//			ctx.drawImage(this, 0, 0, this.width*2, this.height*2);
//		  
//			var idata = ctx.getImageData(0, 0, W, H);
//			
//			var buffer32 = new Uint32Array(idata.data.buffer);
//			
//			console.log(buffer32);
//			for (var y = 0; y < H; y += gridY) {
//				for (var x = 0; x < W; x += gridX) {
//				  if (buffer32[y * W + x]) {
//					that.placement.push(new particle(x, y));
//				  }
//				}
//			}
//			ctx.clearRect(0, 0, W, H);
//			
//			
//			
//		  
//		}
		//this.placement=[];
		
		
		for(var i=0;i<leafArray.length;i++){
			this.placement.push(new particle(leafArray[i].x, leafArray[i].y));
		}
		
	
	}*/
	
	/*colors = [
	  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
	  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
	  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
	  '#FF5722'
	];*/
	
	function particle(x, y, type) {
	  this.radius = 1.1;
	  this.futurRadius = utils.randomInt(radius, radius+3);
	  
	  
	  this.rebond = utils.randomInt(1, 5);
	  this.x = x;
	  this.y = y;
	  
	  this.dying = false;
	  
	  this.base = [x, y]
	
	  this.vx = 0;
	  this.vy = 0;
	  this.type = type;
	  this.friction = .99;
	  this.gravity = gravity;
	  //this.color = colors[Math.floor(Math.random() * colors.length)];
	  this.color = leafColor; //sunny 
	
	  this.getSpeed = function() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	  };
	
	  this.setSpeed = function(speed) {
		var heading = this.getHeading();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	  };
	
	  this.getHeading = function() {
		return Math.atan2(this.vy, this.vx);
	  };
	
	  this.setHeading = function(heading) {
		var speed = this.getSpeed();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	  };
	
	  this.angleTo = function(p2) {
		return Math.atan2(p2.y - this.y, p2.x - this.x);
	
	  };
	
	  this.update = function(heading) {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += gravity;
	
		this.vx *= this.friction;
		this.vy *= this.friction;
		
		if(this.radius < this.futurRadius && this.dying === false){
		  this.radius += duration;
		}else{
		  this.dying = true;
		}
		  
		if(this.dying === true){
		  this.radius -= duration;
		}
	 
		ctx.save();
		
		ctx.beginPath();
	
		ctx.fillStyle = this.color;
		ctx.globalCompositeOperation = "lighter";
		
		//ctx.save();
//		
//		if(Math.random()>=0.5){
//			ctx.globalCompositeOperation = "lighter";
//		}else{
//			ctx.globalCompositeOperation = "source-over";
//		}
	
		ctx.arc(this.x, this.y, this.radius*touching, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.restore();
	
		if (this.y < 0 || this.radius < 1) {
		  this.x = this.base[0];
		  this.dying = false;
		  this.y = this.base[1];
		  this.radius = 1.1;
		  this.setSpeed(speed);
	  	  this.futurRadius = utils.randomInt(radius, radius+3);
		  this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));
		}
	
	  };
	
	  this.setSpeed(utils.randomInt(.1, .5));
	  this.setHeading(utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360)));
	
	}
	
	/*element2 = document.getElementById("2");
	element3 = document.getElementById("3");
	element4 = document.getElementById("4");
	element5 = document.getElementById("5");
	element6 = document.getElementById("6");
	
	fieldvalue = document.getElementById("message");
	gravity = parseFloat(element2.value);
	duration =  parseFloat(element3.value);
	resolution = parseFloat(element4.value);
	speed = parseFloat(element5.value);
	radius = parseFloat(element5.value);*/
	
	
	var message = new shape(W / 2, H / 2 + 50, "TREE");
	//message.placement = [];
	
	//var checkTree=setInterval(function(){
//		
//		if(finish_tree){
//			message.getValue();
//			update();
//			clearInterval(checkTree);
//		}
//		
//	},100);
	//console.log(message.placement);
	
	
	/*
	function change() {
	  ctx.clearRect(0, 0, W, H);
	
	  gridX = resolution;
	  gridY = resolution;
	  message.placement = [];
	  // message.text = fieldvalue.value;
	  message.getValue();
	}*/
	
	
	/*function changeV() {
		gravity = parseFloat(element2.value);
		duration =  parseFloat(element3.value);
		speed = parseFloat(element5.value);
		radius = parseFloat(element6.value);
	}*/
	
	var fps = 100;
	fun_cloud_3_1_loop=function() {
		var timer=setTimeout(function() {
			ctx.clearRect(0, 0, W, H);
			
			for (var i = 0; i < message.placement.length; i++) {
			  message.placement[i].update();
			}
			
			timer_cloud_3_1=requestAnimationFrame(fun_cloud_3_1_loop);
		}, 1000 / fps);
	}
	
	fun_cloud_3_1_loop();
	
	var timer_start;
	var timer_end;
	var touching_max=1.3;
	
	$(".wrap").on("touchstart",function(){
		
		var timer_start=setInterval(function(){
			if(touching<touching_max){
				touching+=0.02;
			}else{
				touching=touching_max;
				clearInterval(timer_start);
			}
		},30);
	});
	
	$(".wrap").on("touchend",function(){
		
		var timer_end=setInterval(function(){
			if(touching>1){
				touching-=0.02;
			}else{
				touching=1;
				clearInterval(timer_end);
			}
		},30);
		
	});
	
	
//})()
	
	//浜�4
	
	
	//浜�5
	function cloud_4(){
	const VERTEX_SHADER = `

    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    float cn(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
    }
    attribute float opacity;
    
    uniform float time;
    varying vec3 v_normal;
    // varying float v_addLength;
    varying float v_color;
    varying float v_opacity;
    
    void main() {


      v_normal = normal;
      v_opacity = opacity;
      
      float maxLength = 7.7;
      float addLength = maxLength * cn(normalize(position) * 2.9 + time * 0.9);
      v_color = maxLength * cn(normalize(position) * 0.6 + (time) * 0.6) * 0.82;
      // v_addLength = addLength;
      vec3 newPosition = position + normal * addLength;

      vec4 mPosition = modelViewMatrix * vec4(newPosition, 1.0);
      if (mPosition.z < 0.0) {
        // mPosition.x = 1000.0;
        gl_PointSize = 0.0;
      }
      gl_PointSize = opacity * 3.5; //绮掑瓙绮楃粏搴�
      gl_Position = projectionMatrix * mPosition;
    }
`;
    const FRAGMENT_SHADER = `
    varying float v_opacity;
    varying vec3 v_normal;
    varying float v_color;
    
    void main() {
      // vec3 color = normalize(v_color * 0.5 + 0.5 * v_normal + 0.1) * (v_color + 0.1) * 2.0;
      vec3 color = (v_color * 0.05) + v_normal + 0.5;
      color.x += v_color * 0.2;
      color.z += v_color * 0.2;
      gl_FragColor = vec4(normalize(color) , v_opacity);
        // gl_FragColor = vec4(v_opacity,v_opacity,v_opacity,v_opacity);
    }
`;

    const radius = 100;
    const smallRadius = radius * 0.9;
    const smallHeight = radius * 0.3;

    let canvas = $(".cloud_4")[0];
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      50,
      canvas.width / canvas.height,
      0.1,
      10000
    );
    // camera.position.y = -4;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3)
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    //renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(1);
    let material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        time: { type: '1f', value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    function createPoints(radius, position, opacityStart = 0.5, opacityEnd = -0.2, opacityMax = 1) {
      let initGeom = new THREE.IcosahedronGeometry(radius, 5);
      let geom = new THREE.Geometry();
      let bufferGeom = new THREE.BufferGeometry();
      let opacities = [];
      let normals = [];
      let vertices = [];

      let opacityStartVal = -1 * opacityStart * radius;
      let opacityEndVal = -1 * opacityEnd * radius;

      initGeom.lookAt(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
      geom.vertices = initGeom.vertices;
      geom.vertices = geom.vertices.filter(v => {
        let opacity = 1;
        if (v.z > opacityStartVal && v.z < opacityEndVal) {
          opacity = easing.easeOutCubic((v.z - opacityEndVal) / (opacityStartVal - opacityEndVal));
        }

        opacities.push(opacity);
        v.opacity = opacity * opacityMax;
        return v.z < opacityEndVal;
      });
      geom.lookAt(position.clone().negate());
      geom.translate(position.x, position.y, position.z);
      vertices = geom.vertices;

      let length = vertices.length;
      let bufferVertices = new Float32Array(length * 3);
      let bufferNormals = new Float32Array(length * 3);
      let bufferOpacity = new Float32Array(length);

      vertices.forEach((v, i) => {
        bufferVertices[i * 3] = v.x;
        bufferVertices[i * 3 + 1] = v.y;
        bufferVertices[i * 3 + 2] = v.z;
        v.normalize();
        bufferNormals[i * 3] = v.x;
        bufferNormals[i * 3 + 1] = v.y;
        bufferNormals[i * 3 + 2] = v.z;
        bufferOpacity[i] = v.opacity;
      });
      // console.log(vertices)
      bufferGeom.addAttribute('position', new THREE.BufferAttribute(bufferVertices, 3));
      bufferGeom.addAttribute('normal', new THREE.BufferAttribute(bufferNormals, 3));
      bufferGeom.addAttribute('opacity', new THREE.BufferAttribute(bufferOpacity, 1));

      let points = new THREE.Points(bufferGeom, material);
      return points;
    }

    scene.add(createPoints(
      radius * 0.9,
      new THREE.Vector3(0, radius * 0.18, 0),
      0.9, 0.0, 0.9
    ));

    scene.add(createPoints(
      radius * 0.92,
      new THREE.Vector3(radius * -0.1, radius * 0.13, -radius * 0.1),
      0.6, 0.2, 0.6
    ));
    
    // scene.add(createPoints(
    //   radius * 0.8,
    //   new THREE.Vector3(radius * -0.05, radius * 0.1, radius * 0.03),
    //   0.2, -0.9, 0.0
    // ));
    scene.add(createPoints(
      radius * 1.21,
      new THREE.Vector3(radius * 0.06, radius * -0.02, radius * -0.13),
      0.98, 0.5, 0.8
    ));

    scene.add(createPoints(
      radius * 0.7,
      new THREE.Vector3(radius * -0.5, radius * -0.2, radius * 0.0),
      0.4, -0.2, 0.3
    ));

    scene.add(createPoints(
      radius * 0.99,
      new THREE.Vector3(radius * 0.0, radius * -0.001, -radius * 0.0),
      0.9, 0.8, 0.6
    ));

    scene.add(createPoints(
      radius * 0.65,
      new THREE.Vector3(radius * 0.5, radius * -0.26, radius * 0.2),
      0.4, -0.2, 0.3
    ));

    scene.add(createPoints(
      radius * 0.69,
      new THREE.Vector3(radius * 0.7, radius * -0.26, radius * 0.0),
      0.9, 0.0, 0.8
    ));
    
    scene.add(createPoints(
      radius * 0.69,
      new THREE.Vector3(radius * -0.7, radius * -0.26, radius * 0.0),
      0.9, -0.3, 0.9
    ));
    // scene.add(createPoints(
    //   radius * 0.8,
    //   new THREE.Vector3(radius * -0.55, radius * -0.05, radius * 0.0),
    //   0.2, 0.2, 0.5
    // ));

    let now = new Date();
    let pre = now;
    let cameraOffsetStep = 6;
    fun_cloud_4_loop=function() {
      now = new Date();
      material.uniforms.time.value += (now - pre) * 0.0008;
      pre = now;
     /* if (camera.position.x > 200) {
        cameraOffsetStep = -2
      } else if (camera.position.x < -200) {
        cameraOffsetStep = 2
      }
      camera.position.x += cameraOffsetStep;
      */
      camera.lookAt(0,0,0);
      renderer.render(scene, camera);
      timer_cloud_4=window.requestAnimationFrame(fun_cloud_4_loop);
    }
	fun_cloud_4_loop();
	}
	
	
	//浜�5
	
	
	}
	
	
	/*缈婚〉鏍囪瘑*/
	var page_index=1;//褰撳墠鍦ㄥ摢涓〉闈�
	var page_total=6;//褰撳墠鍦ㄥ摢涓〉闈�
	var moving=0;

	/*$(".arrow_next").on("touchend",function(e){
		wipe_down();
		return false;
	});
	$(".arrow_prev").on("touchend",function(e){
		wipe_up();
		return false;
	});
	$(".con_wrap_1 .btn_enter").on("touchend",function(e){
		wipe_down();
		return false;
	});
	$(".con_wrap_6 .btn_enter").on("touchend",function(e){
		wipe_up();
		return false;
	});*/
	
	var opts_s={
		dotSize: 1/60,
		dotSizeThreshold: 0.02,
		initVelocity: 0.26,
		friction: 0.05,
		hoverDiameter: 0.8,
		hoverForce: 0.007,
		activeDiameter: 0.8,
		activeForce: -0.007,
		isAdditive: true,
		channels: [ 'red','green','blue' ],
		isChannelLens: false,
		//oscAmplitude: 0
	}
	
	
	var pageIndex=1;
	//touchstart需要改成html可用的click才能运行
	$(".con_wrap_1 .btn_enter").on("click",function(){
		
		pageIndex=2;
		
		$(".con_wrap_1").removeClass("wrap_hide_show").addClass("wrap_hide");
		
		var timer=setTimeout(function(){
			$(".con_wrap_2").addClass("wrap_show");
		},900);
		var timer2=setTimeout(function(){
			$(".con_wrap_1").removeClass("wrap_show");
			$(".con_wrap_2").removeClass("wrap_prepare");
			//$(".bg_area_1").show();
			if(!an_hook){
				showCloud();
			}else{
				$(".bg_area_1").show().addClass("bg_area_2_show");
			}
			
			$(".con_wrap_1.wrap_hide").hide();
		},1000);
		
		$(".bg_area_2").hide();
		$(".con_wrap_3").removeClass("wrap_show").addClass("wrap_prepare"); //闅愯棌绗�3椤�
		
		window.cancelAnimationFrame(timer_cloud_3);
		window.cancelAnimationFrame(timer_cloud_3_1);
		window.cancelAnimationFrame(timer_cloud_4);
		
		
	});
	
	$(".con_wrap_2 .arr_next").on("click",function(){
		
		
		pageIndex=3;
		
		if(!an_hook){
			hideCloud();
		}else{
			$(".bg_area_1").addClass("bg_area_2_hide");
		}
		
		$(".con_wrap_2").removeClass("wrap_hide_show").addClass("wrap_hide");
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_3").addClass("wrap_show");
			
		},1100);
		var timer2=setTimeout(function(){
			
			$(".con_wrap_2").removeClass("wrap_show");
			$(".bg_area_2").show().addClass("bg_area_2_show");
			$(".con_wrap_2.wrap_hide").hide();
			$(".con_wrap_3").removeClass("wrap_prepare");
			
			window.cancelAnimationFrame(timer_cloud_1);
			
			if(an_hook){
				$(".bg_area_1").removeClass("bg_area_2_show").removeClass("bg_area_2_hide");
			}
			
		},1300);
		
		
	});
	
	$(".con_wrap_2 .arr_pre").on("click",function(){
		
		pageIndex=1;
		
		if(!an_hook){
			hideCloud();
		}
		$(".con_wrap_2").removeClass("wrap_hide_show").addClass("wrap_show_prepare");
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_1").show().addClass("wrap_hide_show").addClass("wrap_show");
			
		},1200);
		var timer2=setTimeout(function(){
			
			$(".con_wrap_2").removeClass("wrap_show").removeClass("wrap_show_prepare").addClass("wrap_prepare");
			$(".con_wrap_1").removeClass("wrap_hide");
			
		},1400);
		
		
	});
	
	
	
	$(".con_wrap_3 .arr_next").on("click",function(){
		
		pageIndex=4;
		
		$(".con_wrap_3").removeClass("wrap_hide_show").addClass("wrap_hide");
		$(".bg_area_2").addClass("bg_area_2_hide");
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_4").addClass("wrap_show");
			
		},1250);
		var timer2=setTimeout(function(){
			$(".con_wrap_3").removeClass("wrap_show");
			$(".con_wrap_3.wrap_hide").hide();
			$(".bg_area_3").show();
			$(".con_wrap_4").removeClass("wrap_prepare");
			
			if(!an_hook){
				message.placement=[];//娓呯┖鍙跺瓙鐢诲竷宸插瓨鍦ㄥ彾瀛愯妭鐐规暟缁�
				cloud_3_init();
			}else{
				$(".bg_area_3").addClass("bg_area_2_show");
			}
			
			$(".bg_area_2").removeClass("bg_area_2_show").removeClass("bg_area_2_hide");
			$(".bg_area_2").hide();
			
			if(!an_hook){
				timer_cloud_3=window.requestAnimationFrame(fun_cloud_3_loop); 
				timer_cloud_3_1=window.requestAnimationFrame(fun_cloud_3_1_loop);
			}
			
		},1450);
		
		
	});
	
	
	
	$(".con_wrap_3 .arr_pre").on("click",function(){
		
		pageIndex=2;
		
		$(".con_wrap_3").addClass("wrap_show_prepare");
		$(".bg_area_2").removeClass("bg_area_2_show").addClass("bg_area_2_hide");
		
		if(!an_hook){
			timer_cloud_1=window.requestAnimationFrame(fun_cloud_1_loop);
		}else{
			$(".bg_area_3").addClass("bg_area_2_hide");
		}
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_2").show().addClass("wrap_hide_show").addClass("wrap_show");
			
			if(!an_hook){
				cloud_1.connectThreshold=0;
				showCloud();
			}
			
		},450);
		var timer2=setTimeout(function(){
			
			$(".con_wrap_3").removeClass("wrap_show").removeClass("wrap_show_prepare").addClass("wrap_prepare");
			$(".con_wrap_2").removeClass("wrap_hide");
			$(".bg_area_2").removeClass("bg_area_2_hide");
			
		},650);
		
		
	});
	
	
	$(".con_wrap_4 .arr_next").on("click",function(){
		
		pageIndex=5;
		
		$(".cloud_4").show();
		//cloud_4();
		
		$(".con_wrap_4").removeClass("wrap_hide_show").addClass("wrap_hide");
		$(".bg_area_3").addClass("bg_area_3_hide");
		$(".bg_area_1").remove();
		$(".bg_area_2").remove();
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_5").addClass("wrap_show");
			
		},600);
		var timer2=setTimeout(function(){
			$(".con_wrap_4").removeClass("wrap_show");
			$(".con_wrap_4.wrap_hide").hide();
			$(".con_wrap_5").removeClass("wrap_prepare");
			
			$(".cloud_4").addClass("cloud_4_show");
			$(".bg_area_3").removeClass("bg_area_3_hide");
			$(".bg_area_3").hide();
			$(".bg_area_3").remove();
			
			if(!an_hook){
				timer_cloud_4=window.requestAnimationFrame(fun_cloud_4_loop);
			}
			
			window.cancelAnimationFrame(timer_cloud_1);
			window.cancelAnimationFrame(timer_cloud_2);
			window.cancelAnimationFrame(timer_cloud_3);
			window.cancelAnimationFrame(timer_cloud_3_1);
		
		},800);
		
		
	});
	
	$(".con_wrap_4 .arr_pre").on("click",function(){
		
		pageIndex=3;
		
		$(".con_wrap_4").addClass("wrap_show_prepare");
		
		if(!an_hook){
			$(".bg_area_3").addClass("bg_area_3_hide");
		}else{
			$(".bg_area_3").addClass("bg_area_2_hide");
		}
		
		
		var timer=setTimeout(function(){
			
			$(".con_wrap_3").show().addClass("wrap_hide_show").addClass("wrap_show");
			$(".bg_area_2").show().addClass("bg_area_2_show");
			
		},450);
		var timer2=setTimeout(function(){
			
			$(".con_wrap_4").removeClass("wrap_show").removeClass("wrap_show_prepare").addClass("wrap_prepare");
			$(".con_wrap_3").removeClass("wrap_hide");
			$(".bg_area_3").removeClass("bg_area_3_hide");
			
			if(!an_hook){
				message.placement=[];//娓呯┖鍙跺瓙鐢诲竷宸插瓨鍦ㄥ彾瀛愯妭鐐规暟缁�
				ctx_tree.clearRect(0,0,canvas_width,canvas_height);//娓呯悊鏋濆共鐢诲竷宸插瓨鍦ㄧ殑鍥惧儚
			}else{
				$(".bg_area_3").removeClass("bg_area_2_hide");
			}
			
			window.cancelAnimationFrame(timer_cloud_3);
			window.cancelAnimationFrame(timer_cloud_3_1);
			
		},650);
		
		
	});
	
	
	
	/*loading*/
	
	var moving=1;
	
	var img_list={
		"img_1":"mask_1.png",
		"img_2":"num_0.png",
		"img_3":"num_1.png",
		"img_4":"num_2.png",
		"img_5":"num_3.png",
		"img_6":"num_4.png",
		"img_7":"num_5.png",
		"img_8":"num_6.png",
		"img_9":"num_7.png",
		"img_10":"num_8.png",
		"img_11":"num_9.png",
		"img_12":"num_percent.png"
	};
	
	//console.log(img_list.cover);
	var img_array=[];
	
	//鑾峰緱鍥剧墖鐨勫湴鍧€
	for(var i in img_list){
		img_array.push("http://h5app.qq.com/act/cdc/cloud/images/"+img_list[i]);
	}
	
	var img_num=img_array.length;
	var img_loaded=0;
	var flag_sound=0;
	
	for(var i=0;i<img_num;i++){
		var img=new Image();
		img.src=img_array[i];
		img.onload=function(){
			
			img_loaded++;
			if(img_num==img_loaded){
				
				//闇€瑕佸湪loading鏃讹紝鍏堟覆鏌撶粨灏鹃〉鐨勪簯锛屽惁鍒欑偣鍑诲垏鎹㈠姩鐢讳細鍗￠】
				if(!an_hook){
					cloud_4();
				}
				
				loadSound(); //濡傛灉鏈夊０闊�
				//pageStart(); //杞藉畬鍥剧墖锛岀洿鎺ヨ繘鍏ラ椤碉紝闊抽鑷繁鎱㈡參杞斤紝杞藉畬鑷姩鎾斁
			}
		}
	}
	
	function pageStart(){
		$(".loading_wrap").addClass("loading_hide");
		$(".con_wrap_1").addClass("wrap_show").removeClass("wrap_prepare");
		var timer=setTimeout(function(){
			$(".loading_wrap").hide();
		},300);
		moving=0;
		$(".cloud_4").hide();
		
		$(".bg_video .hook").css({
			"top":($(".bg_video").width()*603/375-75)+"px"
		});
		
	}
	
	var audio;
	function loadSound(){
		
		audio = document.createElement("audio");
		audio.src = "http://h5app.qq.com/act/cdc/cloud/media/music.mp3";
		audio.load();
		audio.loop=true;
		
		/*document.addEventListener("WeixinJSBridgeReady", function () {
			audio.play();
		}, false);*/
		
		/*audio.addEventListener("canplaythrough", function(){
			//musicPlay();
			if(flag_sound==0){
				//pageStart();
				flag_sound=1;
			}
		});*/
		
		
	}
	
	function musicStop(){
		audio.pause();
		$(".music_ctrl .music_stop").hide();
		$(".music_ctrl .music_play").show();
	}
	
	function musicPlay(){
		audio.play();
		$(".music_ctrl .music_play").hide();
		$(".music_ctrl .music_stop").show();
	}
	
	$(".music_ctrl .music_stop").on("touchstart",function(){
		musicStop();
		return false;
	});
	
	$(".music_ctrl .music_play").on("touchstart",function(){
		musicPlay();
		return false;
	});
	
	$(".loading_wrap .loading").on("click",function(){
		$(".bg_video .bg")[0].play();
		audio.play();
		
		pageStart();
		musicPlay();
	});
	
	/*loading*/
	
	
	//鎸夐挳鐩戝惉妫€娴�
	$(".loading_wrap .loading").on("touchstart",function(){
		MtaH5.clickStat("loading_enter");
	});
	
	$(".btn_enter").on("touchstart",function(){
		MtaH5.clickStat("btn_enter");
	});
	
	$(".loading_wrap .loading").on("touchstart",function(){
		MtaH5.clickStat("btn_enter");
	});
	
	$(".con_wrap_5 .btn_detail").on("touchstart",function(){
		MtaH5.clickStat("link_knowmore");
	});
	
	$(".music_off").on("touchstart",function(){
		MtaH5.clickStat("music_off");
	});
	
	$(".music_on").on("touchstart",function(){
		MtaH5.clickStat("music_on");
	});
	
	$(".con_wrap_2 .page_area .arr_pre").on("touchstart",function(){
		MtaH5.clickStat("con_2_pre");
	});
	
	$(".con_wrap_2 .page_area .arr_next").on("touchstart",function(){
		MtaH5.clickStat("con_2_next");
	});
	
	
	$(".con_wrap_3 .page_area .arr_pre").on("touchstart",function(){
		MtaH5.clickStat("con_3_pre");
	});
	
	$(".con_wrap_3 .page_area .arr_next").on("touchstart",function(){
		MtaH5.clickStat("con_3_next");
	});
	
	
	$(".con_wrap_4 .page_area .arr_pre").on("touchstart",function(){
		MtaH5.clickStat("con_4_pre");
	});
	
	$(".con_wrap_4 .page_area .arr_next").on("touchstart",function(){
		MtaH5.clickStat("con_4_next");
	});
	

	// 椤甸潰鍒嗕韩缁勪欢
	wx.ready(function() {

		var shareTitle = '2018鑵捐"浜�+鏈潵"宄颁細';
		var shareDesc = "鐢ㄦ暟鎹€濊€冩湭鏉ワ紝鐒曞惎鏅鸿兘+ 涓栫晫";
		var shareLink = 'http://h5app.qq.com/act/cdc/cloud/index.html';
		var shareImg = 'http://h5app.qq.com/act/cdc/cloud/images/feed.jpg';

		// 鍒嗕韩缁欐湅鍙嬩簨浠剁粦瀹�
		wx.onMenuShareAppMessage({
			title: shareTitle,
			desc: shareDesc,
			link: shareLink,
			imgUrl: shareImg
		});

		// 鍒嗕韩鍒版湅鍙嬪湀
		wx.onMenuShareTimeline({
			title: shareTitle,
			link: shareLink,
			imgUrl: shareImg
		});

		// 鍒嗕韩鍒癚Q
		wx.onMenuShareQQ({
			title: shareTitle,
			desc: shareDesc,
			link: shareLink,
			imgUrl: shareImg
		});

		// 鍒嗕韩鍒板井鍗�
		wx.onMenuShareWeibo({
			title: shareTitle,
			desc: shareDesc,
			link: shareLink,
			imgUrl: shareImg
		});
	});
	
	var cUrl = window.location.href.replace(window.location.hash, '');
	$.ajax({
		url: 'https://wxapp.qq.com/wxjssdk-signature/sign.php',
		type: 'GET',
		data: {url: cUrl},
		dataType: 'jsonp',
		success: function(res) {
			wx.config({
					debug: false,
					appId: res.data.appId,
					timestamp: res.data.timestamp,
					nonceStr: res.data.nonceStr,
					signature: res.data.signature,
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone',
						'onhideOptionMenu'
					]
			});
		}
	});
	
});



















