//var sk_px = 35;
var sk_px = 0;

(function($) {
	$.fn.parallaxSlider = function(options) {
		var opts = $.extend({}, $.fn.parallaxSlider.defaults, options);
		return this.each(function() {
			var $pxs_container 	= $(this),
			o 				= $.meta ? $.extend({}, opts, $pxs_container.data()) : opts;
			
			//the main slider
			var $pxs_slider		= $('.pxs_slider',$pxs_container),
			//the elements in the slider
			$elems			= $pxs_slider.children(),
			//total number of elements
			total_elems		= $elems.length,
			//the navigation buttons
			$pxs_next		= $('#pxs_next',$pxs_container),
			$pxs_prev		= $('#pxs_prev',$pxs_container),
			//the bg images
			$pxs_bg1		= $('.pxs_bg1',$pxs_container),
			$pxs_bg2		= $('.pxs_bg2',$pxs_container),
			$pxs_bg3		= $('.pxs_bg3',$pxs_container),
			//current image
			current			= 0,
			//the thumbs container
			$pxs_thumbnails = $('.pxs_thumbnails'),
			//the thumbs
			$thumbs			= $pxs_thumbnails.children(),
			//the interval for the autoplay mode
			slideshow,
			//the loading image
			$pxs_loading	= $('.pxs_loading',$pxs_container),
			$pxs_slider_wrapper = $('.pxs_slider_wrapper',$pxs_container);
			
			$pxs_slider.css({
			   left: sk_px+"px"
			});
				
			//first preload all the images
			var loaded		= 0,
			$images		= $pxs_slider_wrapper.find('img');
				
			$images.each(function(){
				var $img	= $(this);
				$('<img/>').each(function(){
				
					++loaded;
					
					if(loaded	== total_elems*2){
					
						$pxs_loading.hide();
						$('.pxs_slider').css('visibility', 'visible');
						$pxs_slider_wrapper.show();
							
						//one images width (assuming all images have the same sizes)
						var one_image_w		= $pxs_slider.find('img:first').width();
			
						/*
						need to set width of the slider,
						of each one of its elements, and of the
						navigation buttons
						 */
						setWidths($pxs_slider,
						$elems,
						total_elems,
						$pxs_bg1,
						$pxs_bg2,
						$pxs_bg3,
						one_image_w,
						$pxs_next,
						$pxs_prev);
				
						var spaces	= one_image_w/(total_elems+1);
						$thumbs.each(function(i){

						});
							
						//make the first thumb be selected
						highlight($thumbs.eq(0));
							
						//slide when clicking the navigation buttons
						$pxs_next.bind('click',function(){
						   if (slideshow)
						   {
						      s_t();
						   }
							++current;
							if(current >= total_elems)
								if(o.circular)
									current = 0;
							else{
								--current;
								return false;
							}
							highlight($thumbs.eq(current));
							slide(current,
							$pxs_slider,
							$pxs_bg3,
							$pxs_bg2,
							$pxs_bg1,
							o.speed,
							o.easing,
							o.easingBg,
							o.animDone); // ДОБАВИЛ
						});
						
						$pxs_prev.bind('click',function(){
							--current;
							if(current < 0)
								if(o.circular)
									current = total_elems - 1;
							else{
								++current;
								return false;
							}
							highlight($thumbs.eq(current));
							slide(current,
							$pxs_slider,
							$pxs_bg3,
							$pxs_bg2,
							$pxs_bg1,
							o.speed,
							o.easing,
							o.easingBg,
							o.animDone); // ДОБАВИЛ
						});
				
						/*
						clicking a thumb will slide to the respective image
						 */
						var can_click = true;
						$thumbs.find("a").bind('click',function(){
						   if (!can_click) return false;
						   can_click = false;
						   if ( !$(this).attr("id") ) return false;
						   if (!$('.navigatable').length) return true;
						   $(".formError").remove();
							var $thumb	= $(this);
							highlight($thumb);
							//if autoplay interrupt when user clicks
							if(o.auto)
								clearInterval(slideshow);
							//current 	= $thumb.index();
							var the_id = $thumb.attr("id").replace('link_', '');
							current = $("#for_"+the_id).index();
							slide(current,
							$pxs_slider,
							$pxs_bg3,
							$pxs_bg2,
							$pxs_bg1,
							o.speed,
							o.easing,
							o.easingBg,
							function () {
							   can_click = true;
							}); // ДОБАВИЛ
							return false;
						});
				
					
					   var int_c = 0;
				
						/*
						activate the autoplay mode if
						that option was specified
						 */
						 
						 function s_t(){
						 
						   if(o.auto != 0){
							   o.circular	= true;
							   if (slideshow) clearInterval(slideshow);
							   slideshow	= setInterval(function(){
							      int_c = 1;
								   $pxs_next.trigger('click');
								   int_c = 0;
							   },o.auto);
						   };
						
						}
						
						s_t();
				
						/*
						when resizing the window,
						we need to recalculate the widths of the
						slider elements, based on the new windows width.
						we need to slide again to the current one,
						since the left of the slider is no longer correct
						 */
						$(window).resize(function(){
							w_w	= $(window).width();
							setWidths($pxs_slider,$elems,total_elems,$pxs_bg1,$pxs_bg2,$pxs_bg3,one_image_w,$pxs_next,$pxs_prev);
							slide(current,
							$pxs_slider,
							$pxs_bg3,
							$pxs_bg2,
							$pxs_bg1,
							1,
							o.easing,
							o.easingBg);
						});

					}
				}).attr('src',$img.attr('src'));
			});
				
		});
	};
	
	//the current windows width
	var w_w				= $(window).width();
	
	var slide			= function(current,
	$pxs_slider,
	$pxs_bg3,
	$pxs_bg2,
	$pxs_bg1,
	speed,
	easing,
	easingBg,
	animDone){
		var slide_to	= parseInt(-w_w * current);
		$pxs_slider.stop().animate({
			left	: (slide_to+sk_px)+ 'px'
		},speed, easing, function () {
		   var parent=$pxs_slider.children().eq(current);
		   if (animDone) animDone.apply(this, [parent]);
		});
		$pxs_bg3.stop().animate({
			left	: slide_to/2 + 'px'
		},speed, easingBg);
		$pxs_bg2.stop().animate({
			left	: slide_to/4+ 'px'
		},speed, easingBg);
		$pxs_bg1.stop().animate({
			left	: slide_to/8 + 'px'
		},speed, easingBg);
	};
	
	var highlight		= function($elem){
		$elem.siblings().removeClass('selected');
		$elem.addClass('selected');
	};
	
	var setWidths		= function($pxs_slider,
	$elems,
	total_elems,
	$pxs_bg1,
	$pxs_bg2,
	$pxs_bg3,
	one_image_w,
	$pxs_next,
	$pxs_prev){
		/*
		the width of the slider is the windows width
		times the total number of elements in the slider
		 */
		var pxs_slider_w	= w_w * total_elems;
		$pxs_slider.width(pxs_slider_w + 'px');
		//each element will have a width = windows width
		$elems.width(w_w + 'px');
		/*
		we also set the width of each bg image div.
		The value is the same calculated for the pxs_slider
		 */
		$pxs_bg1.width(pxs_slider_w + 'px');
		$pxs_bg2.width(pxs_slider_w + 'px');
		$pxs_bg3.width(pxs_slider_w + 'px');
	};
	
	$.fn.parallaxSlider.defaults = {
		auto			: 0,	//how many seconds to periodically slide the content.
								//If set to 0 then autoplay is turned off.
		speed			: 1600,//speed of each slide animation
		easing			: 'easeInOutCubic',//easing effect for the slide animation
		easingBg		: 'easeInOutCubic',//easing effect for the background animation
		circular		: true,//circular slider
		thumbRotation	: true, //the thumbs will be randomly rotated
		
		animDone : null // ДОБАВИЛ СВОЙСТВО
	};
	//easeInOutExpo,easeInBack
})(jQuery);
