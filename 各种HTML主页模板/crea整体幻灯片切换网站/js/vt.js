var dt_settings = {
   // how long will it take the dots to disappear
   dots_duration: 7500,
   // how many dots to display on sliders
   dots_count:    15,
   // which elements should have highslide attached
   highslide: 'a.pf, .post-i a.alignleft',
   // options for hs.expand(...)
   highslide_gall: '.gallery_item a.shadow_light',
   // options for hs gallery
};

// prettyPhoto options, deprecated!
var pf_options = {
   theme: 'light_rounded',
   gallery_markup: ''
};

Cufon('#about', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});

Cufon('h1, h2, h3, h4, h5, h6, .quote_author', {
	color: '-linear-gradient(#686b6c, #181818)', textShadow: '1px 1px #fff',
	hover: {
		color: '-linear-gradient(#a8abad, #434343)'
	}
});

Cufon('.pxs_thumbnails > li > a', {
    color: '-linear-gradient(#aeb3b3, #f6f6f6)',textShadow: '1px 1px #000'
  });
  
Cufon('.desc h2', {
 color: '-linear-gradient(#aeb3b3, #f6f6f6)', textShadow: '1px 1px #000'
  });
    Cufon('.gallery-cont h2', {
 color: '-linear-gradient(#aeb3b3, #f6f6f6)', textShadow: '1px 1px #000'
  });

Cufon('.post_type div, .post_type span, .header', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '1px 1px #000'
});
Cufon('#footer .header', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '-1px -1px #000'
});
Cufon('.article_c h2', {
	color: '-linear-gradient(#b0b5b8, #f5f5f5)', textShadow: '-1px -1px #000'
});

Cufon('.ico_link.comments');
Cufon('.gallery-content h2', {
	color: '-linear-gradient(#aeb3b3, #f6f6f6)', textShadow: '1px 1px #000'
});

Cufon('.pxs_thumbnails > li > a', {
    color: '-linear-gradient(#aeb3b3, #f6f6f6)',
    textShadow: '1px 1px #000'
});


$(function () {
   upd_ev();
});




/*
   Move comments form
*/

var slider_auto = 0;

function move_form_to(ee)
{
   var e = $("#form_holder").html();
   var tt = $("#form_holder .share_comment").text();
   $("#form_holder").slideUp(500, function () {
      $("#form_holder").remove();
      
      ee.append('<div id="form_holder">'+e+'</div>');
      $("#form_holder .share_comment").html(tt);
      $("#form_holder [valed]").removeAttr('valed');
      $("#form_holder .do-clear").attr('remove', 1);
      
      Cufon.replace('#form_holder h1', {
	      color: '-linear-gradient(#686b6c, #181818)', textShadow: '1px 1px #fff',
	      hover: {
		      color: '-linear-gradient(#a8abad, #434343)'
	      }
      });
      
      $(".formError").remove();
      
      $("#form_holder").hide().slideDown(500, function () {
         upd_ev();
      });
      
      upd_ev();
   });
}

function upd_ev()
{
   /* 
      Валидация форм
   */
   
   $(".gallery").each(function () {
      var ch = $(this).children().length;
      var cols = Math.ceil(ch / 2);
      var pad = 16;
      var one_w = 304 + pad;
      var all_w = one_w * cols - pad;
      //all_w += 18;
      //all_w -= 1;
      $(this).css({
         'width': all_w+'px'
      });
      $(this).children(":eq("+(cols-1)+")").css('margin-right', 0);
      $(this).children(":last").css('margin-right', 0);
   });
   
   if ( $.jScrollHorizontalPane )
   {
     $('.horiz .scroll-box, #scroll-box').each(function () {
         if ( $(this).attr("sc") )
            return;
         $(this).attr("sc", "done");
         $(this).jScrollHorizontalPane({
            showArrows:       true,
            arrowSize:        23,
            scrollbarHeight:  14,
            scrollbarMargin:  0,
            skip: 26
         });
         
         var tracker = $(this).parent().find(".jScrollPaneDrag").unbind();
         
         var sc       = $('.gallery', this);
         var scroller = $(this).parent().find(".jScrollPaneDrag");
         var ch       = Math.ceil(sc.children().length / 2);
         var sc_one   = 304 + 16;
         var pad      = 16;
         var sc_w     = sc.width();
         var one_ch   = 3;
         var sc_min_w = one_ch*sc_one-pad;
         var maxw     = 878 - scroller.width(); 
         var anim_dur = 500;
         var is_animating_slider = false;
         
         $(".jScrollPaneTrack, .jScrollArrowLeft, .jScrollArrowRight, .jScrollPaneDrag, .jScrollPaneDragLeft, .jScrollPaneDragRight", $(this).parent()).unbind();
         
         if (ch<=one_ch)
         {
            //$('#scroll_bar, .do_scroll').remove();
         }
         
         $(".jScrollArrowLeft, .jScrollArrowRight", $(this).parent()).unbind().click(function () {
            var p = ($(this).hasClass('jScrollArrowLeft') ? -1 : 1);
            var e = jQuery.Event("drag");
            e.custom = 1;
            var k = (maxw) / (sc_w-sc_min_w);
            var x_now = parseInt(scroller.css('left'));
            var x = x_now+((sc_one) * k)*p;
            
            // автодоводка
            var i;
            var _x = x;
            for (i=1; i<ch; i++)
            {
               var _x1 = (i-1)*sc_one*k;
               var _x2 = i*sc_one*k;
               if (Math.round(_x1) == Math.round(x)) continue;
               if (Math.round(_x2) == Math.round(_x)) continue;
               if ((_x < _x2) && (_x > _x1) && ( Math.abs(x_now - _x1) > 5 ) )
               {
                  x = _x1;
                  //alert(x);
                  break;
               }
            }
            
            if ( Math.abs(x - maxw) < 5 ) x = maxw;
            
            e.offsetX = x;
            scroller.trigger(e);
            return false;
         });
         
         scroller.parent().click(function (e) {
            if (!$(e.target).hasClass('jScrollPaneTrack')) return;
            var x = e.pageX;
            x -= scroller.parent().offset().left;
            x -= scroller.width()/2;
            var e = jQuery.Event("drag");
            e.custom = 1;
            e.offsetX = x;
            scroller.trigger(e);
            return false;
         });
         
         scroller.bind('drag', function (e) {
            var x=e.offsetX;
                     
            if (e.custom)
            {
               if (is_animating_slider) return;
               is_animating_slider = true;
            }
                     
            anim_o = {
               duration: anim_dur,
               queue: false,
               complete : function () {
                  is_animating_slider = false;
               }
            };
                     
            if (!e.custom) x-=scroller.parent().offset().left;
            
            if (x<0)   x=0;
            if (x>maxw) x=maxw;
            
            if (!e.custom)
            {
               $(this).css({
                  left: x+"px"
               });
            }
            else
            {
               $(this).animate({
                  left: x+"px"
               }, anim_o);
            }
            
            var m=(sc_w-sc_min_w)*(x/maxw);
            
            if (!e.custom)
            {
               sc.css({
                  marginLeft: '-'+m+'px'
               });
            }
            else
            {
               sc.animate({
                  marginLeft: '-'+m+'px'
               }, anim_o);
            }
            
            e.stopPropagation();
            
            //return false;
         });
         
     });
   }
   if ($.jScrollPane)
   {
	   $('.scroll-pane').each(function () {
	      if ( $(this).attr("sc") )
	         return;
         $(this).jScrollPane({
		      showArrows:       true,
		      scrollbarWidth:   22,
		      dragMinHeight:    87,
		      dragMaxHeight:    87,
		      topCapHeight:     0,
		      bottomCapHeight:  38,
		      scrollbarOnLeft:  true,
		      reinitialiseOnImageLoad: true
	      });
	      $(this).attr("sc", 1);
	   });
	}
   
   $("[placeholder]").each(function () {
      $(this).val( $(this).val().replace( $(this).attr("placeholder"), "" ) );
      $(this).placeholder();
   });
   $("form .button").unbind().click(function () {
      var e=$(this).parents("form");
      e.find("input, textarea").each(function () {
         $(this).unbind();
         $(this).val( $(this).val().replace( $(this).attr("placeholder"), "" ) );
      });
      if (!e.attr("valed")) e.validationEngine({
         ajaxSubmit: true,
         ajaxSubmitFile: e.attr("action")
      });
      e.attr("valed", "1");
      e.submit(); 
      e.find("input, textarea").each(function () {
         $(this).placeholder();
      });      
      return false;
   });
   $("form .do-clear").unbind().click(function () {
      $(this).parents("form").find("input, textarea").each(function () {
         $(this).val("").placeholder();
      });
      $(".formError").remove();
      
      if ($(this).attr("remove") && !$(this).parents("#form_prev_holder").length) 
      {
         move_form_to( $("#form_prev_holder") );
         $("#form_holder .do-clear").removeAttr('remove');
      }
      
      return false;
   });
   
   /*
      End: Валидация форм
   */
}

$(document).ready(function () {

   $(".comment_meta .comment-1").click(function () {
   
      move_form_to( $(this).parent().parent() );
      
      return false;
   });

   /* Всплывающее окошко для навигационной ленты */

   var popup_options = {
      jump_height:        30,
      show_duration:      300,
      hide_duration:      300,
      tout:               200,
      top:                55   // почему-то $("ul.pxs_thumbnails div").position().top дает неправильное значение 
   };
   
   if (!$.browser.msie)
   {
      $("ul.pxs_thumbnails li div").css({
         display:       'none',
         opacity:       0
      });
   }
   
   var touts    = new Array();
   var cur_elem = null;
   var n=0;
   $("ul.pxs_thumbnails li").each(function () {
      $(this).attr("n", ++n);
   });
   
   $("ul.pxs_thumbnails li").hover(function () {
      cur_elem = $("div", this);
      touts[ parseInt($(this).attr("n")) ] = setTimeout(function () {
         if ($.browser.msie)
         {
            cur_elem.show().css({
               bottom:        popup_options.top+"px"
            });
         }
         else
         {
            cur_elem.show().css({
               opacity:    0,
               bottom: ( popup_options.top - popup_options.jump_height )+"px"
            }).animate({
               opacity:    1,
               bottom:        popup_options.top+"px"
            }, {
               duration:   popup_options.show_duration,
               queue:      false,
               complete:   function () {
                  //$(this).hide();
               }
            });
         }
      }, popup_options.tout);
   }, function () {
   
      if (touts[ parseInt($(this).attr("n")) ]) clearTimeout(touts[ parseInt($(this).attr("n")) ]);
   
      if ($.browser.msie)
      {
         $("div", this).hide();
      }
      else
      {
         $("div", this).animate({
            opacity:    0
         }, {
            duration:   popup_options.hide_duration,
            queue:      false,
            complete:   function () {
               $(this).hide();
            }
         });
      }   
   });
   
   /* End: Всплывающее окошко для навигационной ленты */
   
   
   $(window).resize(function () {
      $(".pxs_slider").children().eq(0).css('margin-left', '0px');
   });
   
   
   /* Слайдер, перенес инициализацию из slider.js, добавляю выезжание стрелки */
   
   if ($('#pxs_container').length)
   {
   
      var arrow_duration  = 300;
      var arrow_prev      = $( $(".pxs_slider").children()[0] );
      var arrow_left_init = "-"+$("#pxs_container div.desc").width()+"px";
      
      $(".pxs_slider").children().eq(0).css('margin-left', '-10px');
      
      $("#pxs_container div.desc:gt(0)").css({
         left: arrow_left_init
      });
     
	 
	   $('#pxs_container').parallaxSlider({
	      auto: slider_auto,
	      animDone: function (parent) {
	         /*
	         $("div.desc", parent).show().animate({
	            left: '0px'
	         }, {
	            duration: arrow_duration,
	            queue: false, 
	            complete: function () {
	               $("div.desc", arrow_prev).hide().css('left', arrow_left_init);
	               arrow_prev = parent;
	            }
	         });
	         */
	         $(".pxs_slider").show();
	      }
	   });
	   
	   //$(".pxs_slider").show();
	
	}
   
   /* End: Слайдер */
   
   
   
   
   
   /* 
      Блоки с картинками и на них текст - добавление fade 
   */
   
   var blocks_speed_fade_in  = 300;
   var blocks_speed_fade_out = 300;
   
   if (!$.browser.msie)
   {      
      $(".gallery_item .h-i").css({
         display: 'block',
         opacity: 0
      });
      
      $(".gallery_item").hover(function () {
         $(".h-i", this).animate({
            opacity: 1
         }, {
            duration: blocks_speed_fade_in,
            queue: false,
            complete: function () {
               if ($.browser.msie) this.style.removeAttribute('filter');
            }
         });
      }, function () {
         $(".h-i", this).animate({
            opacity: 0
         }, {
            duration: blocks_speed_fade_out,
            queue: false
         });
      });
   }

   ////////////////////////

   $(".post-i .alignleft i").css({
      display: 'block',
      opacity: 0
   });
   
   $(".post-i .alignleft").hover(function () {
      $("i",  $(this) ).animate({
         opacity: 1
      }, {
         duration: blocks_speed_fade_in,
         queue: false,
         complete: function () {
            if ($.browser.msie) this.style.removeAttribute('filter');
         }
      });
   }, function () {
      $("i", $(this) ).animate({
         opacity: 0
      }, {
         duration: blocks_speed_fade_out,
         queue: false
      });
   });
   
   ////////////////////////////////

   $(".info-block").css({
      display: 'none',
      opacity: 0
   });
   
   $(".inf").each(function () {
      var block = $(".info-block",  $(this).parents(".post-item") );
      var tout_h = false;
      function start_hide() {
         if (tout_h)
            clearTimeout(tout_h);
         tout_h = setTimeout(function () {
            block.hide();
            return;
            block.animate({
               opacity: 0
            }, {
               duration: blocks_speed_fade_out,
               queue: false,
               complete: function () {
                  $(this).css('display', 'none');
               }
            });
         }, 400);
      }
      $(this).hover(function () {
         if (tout_h)
            clearTimeout(tout_h);
         block.css('display', 'block').animate({
            opacity: 1
         }, {
            duration: blocks_speed_fade_in,
            queue: false,
            complete: function () {
               if ($.browser.msie) this.style.removeAttribute('filter');
            }
         });
      }, start_hide);
      block.hover(function () {
         if (tout_h)
            clearTimeout(tout_h);
      },
      start_hide);
   });
   
   /*
      End: Блоки с картинками и на них текст - добавление fade 
   */
   
   
   
   
   upd_ev();
   
   
   /* 
      Цвет меню 
   */
   
   $("#mainmenu li.act").addClass("active");
   
   var n=0;
   $("#mainmenu > li").each(function () {
      $(this).find("a:eq(0)").attr("id", "m"+(++n));
   });
   $("#mainmenu > li").mouseover(function () {
	   return;
      if ( $(this).hasClass('act') )
         return;
      Cufon.replace('#'+$(this).find("a:eq(0)").attr("id"), {
		      color: '-linear-gradient(#950d38, #dc3560)', textShadow: '1px 1px #000'
      });

   });
   $("#mainmenu > li").mouseout(function () {
	   return;
      if ( $(this).hasClass('act') )
         return;
      Cufon.replace('#'+$(this).find("a:eq(0)").attr("id"), {
		   color: '-linear-gradient(#b8b4b1, #edebe8)', textShadow: '1px 1px #000',
		   hover: {
			   color: '-linear-gradient(#950d38, #dc3560)', textShadow: '1px 1px #000'
		   }
      });
   });
      
   /*
      End: цвет меню
   */
   
   if (1)
   {
      var popup_options2 = { top: 25 };
      
      var touts2    = new Array();
      var cur_elem2 = null;
      var n2=0;
      $("#mainmenu > li").each(function () {
         if ( !$(this).children("div").length )
            return;
         $(this).attr("n", ++n2).addClass("parent");
      });
      
      $("#mainmenu > li.parent").hover(function () {
         cur_elem2 = $("div", this);
         touts2[ parseInt($(this).attr("n")) ] = setTimeout(function () {
            if ($.browser.msie)
            {
               cur_elem2.show().css({
                  display:    'block',
                  bottom:        popup_options2.top+"px"
               });
            }
            else
            {
               cur_elem2.css({
                  opacity:    0,
                  display:    'block',
                  bottom: ( popup_options2.top + popup_options.jump_height )+"px"
               }).animate({
                  opacity:    1,
                  bottom:        popup_options2.top+"px"
               }, {
                  duration:   popup_options.show_duration,
                  queue:      false
               });
            }
         }, popup_options.tout);
      }, function () {
      
         if (touts2[ parseInt($(this).attr("n")) ]) clearTimeout(touts2[ parseInt($(this).attr("n")) ]);
      
         if ($.browser.msie)
         {
            $("div", this).hide();
         }
         else
         {
            $("div", this).animate({
               opacity:    0
            }, {
               duration:   popup_options.hide_duration,
               queue:      false,
               complete:   function () {
                  $(this).hide();
               }
            });
         }   
      });
   }
   
   $(".gal").attr("rel", "gal[g]");
   if ($.prettyPhoto && $(".gal").length)
   {
      $(".gal").each(function () {
         $(this).attr("rel", "gal[g]")
            .attr("title",  $(this).find("h4").text() );
      });
      $("a[rel=gal\\[g\\]]").prettyPhoto(pf_options);
   }
   
   $(".sh").each(function () {
      var now = 0;
      var maxnow = $(this).children(".item").length-1;
      var ee = $(this);
      $(this).parent().find(".larr, .rarr").click(function () {
         var the_now = now;
         if ( !$(this).hasClass('larr') ) now++; else now--;
         if (now<0) now = maxnow;
         if (now>maxnow) now=0;
         var now_h = ee.height();
         //$(".widget_arr").hide();
         ee.find(".item:eq("+the_now+")").fadeOut(300, function () {
            var gg = ee.find(".item:eq("+now+")");
            gg.show();
            ee.css({ height: 'auto' });
            var new_h = ee.height();
            gg.hide();
            ee.css({ height: now_h }).animate({ height: new_h }, { duration: 300, complete: function () {
               //$(".widget_arr").show();
            } });
            gg.fadeIn(300);
         });
         return false;
      });
   });
   
});

// PIE
$(function () {
    $('.alignleft, ul.pxs_slider li div.holder img, .shadow_dark, .shadow_dark i, #content_full_black .shadow_dark, .shadow_light, .alignright').each(function() {
        //if ($.browser.msie) PIE.attach(this);
    });
});
// end PIE

$(window).resize(function () {
   var m = $(window).height();
   //m -= $("ul.pxs_slider > li").height();
   m -= 517;
   m /= 2;
   m += 32;
   $(".pxs_slider .holder").css({
      marginTop: m+"px"
   });
});

$(function () {
   $(window).trigger("resize");
})

$(document).ready(function(){
   $(window).resize(function () {
       $('.menu_bot ul.pxs_thumbnails').css({ 
         position:'absolute',
         left: ($(window).width() - $('.menu_bot ul.pxs_thumbnails').outerWidth())/2
       }).show();  
   }).trigger("resize");
});

$(function () {
   $(".pxs_thumbnails a").click(function () {
      var p = $(this).parent();
      $(".pxs_thumbnails > li > a").removeClass("act");
      while (1)
      {
         if (p.parent().hasClass("pxs_thumbnails"))
         {
            p.children("a").addClass("act");
            break;
         }
         p = p.parent();
      }
   });
});

$(function () {
   $(".slider_normal").each(function () {
      var parent_elem = $(this);
      
      var one_sl = dt_settings.dots_duration;
      var one_speed = 1500;
      var max_dots = dt_settings.dots_count;
      var dur_sliding = 500;
      
      var one_sl_timeout = false;
      var current_dots = max_dots;
      var first_run = true;

      $(".nav_s_inner", parent_elem).html("");
      var j;
      for (j=0; j<current_dots; j++) {
         $(".nav_s_inner", parent_elem).append('<a><img src="images/timer.png" alt="" /></a>');
      }
      
      var dots = $(".nav_s_inner", parent_elem).find("a");

      var prev_c = current_dots;
      
      var one_tick_t = (one_sl - one_speed) / max_dots;
      //one_tick_t = 500;
      
      function populate_ticks(cb) {
         return;
         if (current_dots > prev_c)
            dots.show();
         else
            dots.eq( dots.find(":visible").length-1 ).fadeOut(one_tick_t, cb);
         prev_c = current_dots;
      }
      
      var current_n = 0;
      
      function start_dots()
      {
         current_n++;
         var now_n = current_n;
         function run_dots()
         {
            if (current_n != now_n)
               return;
            //console.log("run dots");
            var vis = current_dots;
            if (vis == 0)
            {
               $(".nav_s_inner", parent_elem).hide();
               $(".cycle", parent_elem).cycle("next");            
            }
            else if (vis > 0)
            {
               var ee = dots.eq( vis-1 );
               if (!ee.is(":visible"))
                  return;
               ee.fadeOut(one_tick_t, run_dots);
            }
            current_dots--;
         }
         run_dots();
      }
      
      function tick_one() {
         return;
         if (one_sl_timeout)
            clearTimeout(one_sl_timeout);
         populate_ticks();
         current_dots--;
         one_sl_timeout = setTimeout(tick_one, one_tick_t);
         if (current_dots == -1)
         {
            $(".nav_s_inner", parent_elem).fadeOut(1, function () {
               $(".cycle", parent_elem).cycle("next");
            });
         }
      }
      
      //tick_one();
      
      var cycle_first_run = true;
      
      var allow_anim = true;
      
      $(".cycle", parent_elem).cycle({
          fx:     'fade', 
          speed:   one_speed, 
          timeout: one_sl,
          parent_elem: parent_elem,
          dur_sliding: dur_sliding,
          before: function () {
            if (cycle_first_run)
            {
               cycle_first_run = false;
               current_dots = max_dots;
               //run_dots();
            }
          },
          after: function (currSlideElement, nextSlideElement, options) {   
            var a=$(nextSlideElement);   
            $(".desc h2", parent_elem).html( a.attr("title") );
            $(".desc .desc_text", parent_elem).html( a.attr("alt") );
           Cufon.replace('.desc h2', {
            color: '-linear-gradient(#aeb3b3, #f6f6f6)'
           });
            $(".desc_outer", parent_elem).animate({
               left: 0
            }, {
               duration: dur_sliding,
               queue: false,
               complete: function () {
                  dots.show();
                  $(".nav_s_inner", parent_elem).fadeIn(500, function () {
                     current_dots = max_dots;
                     start_dots();
                     allow_anim = true;
                  });
               }
            });
          }
      }).cycle("pause");
      
      $(".pxs_next, .pxs_prev", parent_elem).not(".carousel .pxs_next, .carousel .pxs_prev").click(function () {
         if (!allow_anim)
            return;
         allow_anim = false;
         if (one_sl_timeout)
            clearTimeout(one_sl_timeout);
         var e = ($(this).hasClass('pxs_next') ? "next" : "prev");
         $(".nav_s_inner", parent_elem).fadeOut(500, function () {
            $(".cycle", parent_elem).cycle(e);
         });
      });
   });   
});

$(function () {
   //$(dt_settings.highslide).prettyPhoto(pf_options);
   $(dt_settings.highslide).each(function () {
      $(this).click(function () {
         hs.expand(this, dt_settings.hs_options);
         return false;
      });
   });
});

$(function () {
   $(dt_settings.highslide_gall).each(function () {
      this.onclick = function () {
         return hs.expand(this, config1);
      };
   });
});

$(function () {
   $(".pxs_thumbnails > li > div").each(function () {
      var p = $(this).parent();
      var d = $(this);
      var pos = 0;
      //pos -= 5;
      pos += p.width() / 2;
      pos -= d.width() / 2;
      d.css('left', pos+"px");
   });
   $(".pxs_slider > li").addClass("containers");
   $(window).resize(function () {
      //$(".pxs_slider > li > .holder").css('height', $(window).height()+"px");
   }).trigger("resize");
});


$(function () {
	$('.i-h .inp').focus(function () {
		$(this).parent().addClass('h-f');}).blur(function (){$(this).parent().removeClass('h-f')
		});
});

$(function () {
	$('.t-h .textar').focus(function () {
		$(this).parent().addClass('t-f');}).blur(function (){$(this).parent().removeClass('t-f')
		});
});

$(function () {
	$('.i-h .inp-c').focus(function () {
		$(this).parent().addClass('h-f');}).blur(function (){$(this).parent().removeClass('h-f')
		});
});