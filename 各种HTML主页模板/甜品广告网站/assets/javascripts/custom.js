$(document).ready(function(){

/* 
=============================================== 
Slider Cake CSS
=============================================== 
*/
	"use strict";
	$('.center').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 970,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: true,
					centerMode: true,
					centerPadding: '0px',
					slidesToShow: 1
				}
			}
		]
	});

	$('.quote').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 1
	});

/* 
=============================================== 
Mega Menu Cake CSS
=============================================== 
*/

	$('.show-menu').on("click", function(){
		$('.top-header').toggleClass('show-mega');
		$('.mega-menu').toggleClass('hide');
		$('.top-highlight').toggleClass('hide');
		$('.ip-main').toggleClass('top-relative');
	});

	$('.close-menu').on("click", function(){
		$('.top-header').removeClass('show-mega');
		$('.mega-menu').addClass('hide');
		$('.top-highlight').addClass('hide');
		$('.ip-main').toggleClass('top-relative');
	});

/* 
=============================================== 
Btn Blog
=============================================== 
*/

	$('.btn-1').on("click", function(){
		$('.show-1').slideDown();
		$('.btn-1').addClass('hide');
		$('.btn-2').removeClass('hide');
	});

	$('.btn-2').on("click", function(){
		$('.show-1').slideUp();
		$('.btn-1').removeClass('hide');
		$('.btn-2').addClass('hide');
	});

	$('.btn-3').on("click", function(){
		$('.show-2').slideDown();
		$('.btn-3').addClass('hide');
		$('.btn-4').removeClass('hide');
	});

	$('.btn-4').on("click", function(){
		$('.show-2').slideUp();
		$('.btn-3').removeClass('hide');
		$('.btn-4').addClass('hide');
	});

	$('.btn-5').on("click", function(){
		$('.show-3').slideDown();
		$('.btn-5').addClass('hide');
		$('.btn-6').removeClass('hide');
	});

	$('.btn-6').on("click", function(){
		$('.show-3').slideUp();
		$('.btn-5').removeClass('hide');
		$('.btn-6').addClass('hide');
	});

/* 
=============================================== 
Fancy Box
=============================================== 
*/

	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
});

