// JavaScript Document
$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "slide",
		directionNav: true,
		controlNav: true, 
		controlsContainer: ".flexslider-container"
	});
});

	// Contact Form Validation	
	$("#contact_form").validate({
		meta: "validate",
		submitHandler: function (form) {
			$('#contact_form').hide();
			$('#sucessmessage').append("<h4 class='form_thanks'>Thanks! Our Team will get in touch in next 24 hours</h4>");
			return false;
			form.submit();
		},
		/* */
		rules: {
			name: "required",
			
			lastname: "required",
			// simple rule, converted to {required:true}
			email: { // compound rule
				required: true,
				email: true
			},
			subject: {
				required: true,
			},
			comment: {
				required: true
			}
		},
		messages: {
			name: "Please enter your name.",
			lastname: "Please enter your last name.",
			email: {
				required: "Please enter email.",
				email: "Please enter valid email"
			},
			subject: "Please enter a subject.",
			comment: "Please enter a comment."
		},
	}); /*========================================*/
	
	
/* Load Tweets Function */
$ (document).ready(function(){
	$('#tweets').tweetable({username: 'seaofclouds', time: true, limit: 1, replies: true, position: 'append', loading_text: "loading latest tweets..."});
});
/* Load Tweets Function */

/* Main Navigation Active Link Function */
$(document).ready(function() {  
	$('ul#navigation a').bind('click',function(event){
		var $anchor = $(this);
		
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500,'easeInOutExpo');
		$('ul#navigation li a').removeClass("active");
		$(this).addClass("active");
		/*
		if you don't want to use the easing effects:
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000);
		*/
		event.preventDefault();
	});
});
/* Main Navigation Active Link Function */

$(document).ready(function() {  
	$('.portfolio-img').each(function() {
		$(this).hover(
			function() {
				$(this).stop().animate({ opacity: 0.5 }, 400);
			},
		   function() {
			   $(this).stop().animate({ opacity: 1.0 }, 400);
		   })
		});
});

$(document).ready(function() {
	$('.t-content').show();
	$("#home .toggle-btn a").click(function () {			
		$("#home .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
	
	$("#about .toggle-btn a").click(function () {			
		$("#about .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
	
	$("#services .toggle-btn a").click(function () {			
		$("#services .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
	
	$("#portfolio .toggle-btn a").click(function () {			
		$("#portfolio .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
	
	$("#blog .toggle-btn a").click(function () {			
		$("#blog .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
	
	$("#contact .toggle-btn a").click(function () {			
		$("#contact .t-content").slideToggle("slow");        
		$(this).toggleClass("selected");
		return false;
	});
});

$(document).ready(function() {		
	$('.toggle-content').hide();  //hides the toggled content, if the javascript is disabled the content is visible

	$('.toggle-link').click(function () {
		if ($(this).is('.toggle-close')) {
			$(this).removeClass('toggle-close').addClass('toggle-open').parent().next('.toggle-content').slideToggle(300);
			return false;
		} 
		
		else {
			$(this).removeClass('toggle-open').addClass('toggle-close').parent().next('.toggle-content').slideToggle(300);
			return false;
		}
	});
});

$(document).ready(function(){
			$('#tabs div').hide();
			$('#tabs div:first').show();
			$('#tabs ul li:first').addClass('active');
			$('#tabs ul li a').click(function(){ 
			$('#tabs ul li').removeClass('active');
			$(this).parent().addClass('active'); 
			var currentTab = $(this).attr('href'); 
			$('#tabs div').hide();
			$(currentTab).show();
			return false;
			});
			});
			



