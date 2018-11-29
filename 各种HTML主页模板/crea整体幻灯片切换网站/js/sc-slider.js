$(document).ready(function () {
   $(".carousel").each(function () {
      var c = $(this);
      
      $(window).resize(function () {
         var m = $(window).height();
         m /= 2;
         m -= $("#carousel-container").height() / 2;
         m += 32;
         $("#carousel-container").css('margin-top', m+"px");
      });
      
      $(window).trigger("resize");
      
      var i;
      var slides = c.children();
      var slides_count = slides.length;
      
      slides = c.children();
      
      var current_slide = 0;
      
      function fix_slide_n(n) {
         if (n >= slides_count)
            n -= slides_count;
         if (n < 0)
            n = slides_count + n;
         return n;
      }
      
      function get_css_for_slide(n) {
         var css = {};
         if (n == 0)
         {
            css.left = 0;
            css.zIndex = 10;
            css.scale = '1.00';
         }
         if (n == 1)
         {
            css.left = 140;
            css.zIndex = 9;
            css.scale = '0.90';
         }
         if (n == -1)
         {
            css.left = -140;
            css.zIndex = 8;
            css.scale = '0.90';
         }
         //css.scale = '1.00';
         css.display = 'block';
         css.cursor = 'default';
         return css;
      }
      
      var speed_slide = 2000;
      
      var is_animating_slider = false;
      
      var one_sl = dt_settings.dots_duration;
      var one_speed = 1500;
      var max_dots = dt_settings.dots_count;
      var dur_sliding = 500;
      
      var current_tick = 0;
      var current_dots = max_dots;
      
      var one_tick_t = (one_sl - one_speed) / max_dots;
      
      $(".nav_s_inner", c).html("");
      var j;
      for (j=0; j<current_dots; j++) {
         $(".nav_s_inner", c).append('<a><img src="images/timer.png" alt="" /></a>');
      }
      
      function golog(s)
      {
      }
      
      function start_ticker(stop) {
         golog("start_ticker");
         current_tick++;
         var tick_now = current_tick;
         current_dots = max_dots;
         if (stop) {
            golog("start_ticker - stop manual");
            return;
         }
         var dots = $(".nav_s_inner", slides[current_slide]).children();
         function anim_tick() {
            if (tick_now != current_tick)
            {
               golog("wrong tick");
               return;
            }
            var vis = current_dots;
            if (vis == 0)
            {
               $(".nav_s_inner", slides[current_slide]).hide();
               gogo(1);
            }
            else if (vis > 0)
            {
               var ee = dots.eq( vis-1 );
               //alert(dots.parent().html());
               if (!ee.is(":visible"))
               {
                  golog("no visible");
                  return;
               }
               ee.fadeOut(one_tick_t, anim_tick);
            }
            current_dots--;
         }
         anim_tick();
      }
      
      function go_slide(p) {
         if (is_animating_slider) return;
         is_animating_slider = true;
         var s = [];
         var c = [];
         if (p > 0)
         {
            s[1] = $( slides[ fix_slide_n(current_slide) ] );
            s[2] = $( slides[ fix_slide_n(current_slide+1) ] );            
            s[3] = $( slides[ fix_slide_n(current_slide+2) ] );
            //s[4] = $( slides[ fix_slide_n(current_slide-1) ] );
            
            c[1] = -1;
            c[2] = 0;
            c[3] = 1;
            c[4] = 1;
         }
         if (p < 0)
         {
            s[1] = $( slides[ fix_slide_n(current_slide-2) ] );
            s[2] = $( slides[ fix_slide_n(current_slide-1) ] );            
            s[3] = $( slides[ fix_slide_n(current_slide) ] );
            
            c[1] = -1;
            c[2] = 0;
            c[3] = 1;
         }
         if (p == 0)
         {
            s[1] = $( slides[ fix_slide_n(current_slide-1) ] );
            s[2] = $( slides[ fix_slide_n(current_slide) ] );
            s[3] = $( slides[ fix_slide_n(current_slide+1) ] );
            
            c[1] = -1;
            c[2] = 0;
            c[3] = 1;  
         }
         
         var col = slides;
         if (s[1]) col = col.not( s[1] );
         if (s[2]) col = col.not( s[2] );
         if (s[3]) col = col.not( s[3] );
         if (s[4]) col = col.not( s[4] );
         
         col.css({
            zIndex: 5
         });
         
         col.hide();
         
         for (i=1; i<=4; i++) {
            if (s[i])
            {
               if (p)
               {
                  s[i].each(function () {
                     var my_i = i;
                     var css = get_css_for_slide(c[i]);
                     //if ( (c[i] != 0) && (my_i != 4) )
                     var ok = 0;
                     if ( (p>0) && (my_i == 1) )
                        ok = 1;
                     if ( (p<0) && (my_i == 3) )
                        ok = 1;
                     if ( (c[i] != 0) && ok )
                     {
                        var new_css = css;
                        new_css.left *= 3.5;
                        $(this).show().animate(new_css, {
                           duration: speed_slide/2,
                           queue: false,
                           complete: function () {
                              new_css.left /= 3.5;
                              $(this).show().css({
                                 zIndex: 5
                              }).animate(new_css, {
                                 duration: speed_slide/2,
                                 queue: false,
                                 complete: function () {

                                 }
                              });
                           }
                        });
                     }
                     else
                     {
                        $(this).show().animate(css, {
                           duration: speed_slide,
                           queue: false,
                           complete: function () {

                           }
                        });
                     }
                  });
               }
               else
               {
                  set_css( s[i], c[i] );
               }
            }
         }
         
         current_slide += p;
         
         current_slide = fix_slide_n(current_slide);
         
         function slides_click() {
            var cols = slides.not( slides[current_slide] );
            cols.css('cursor', 'pointer').unbind('click').click(function () {
               start_ticker(true);
               var left = parseInt( $(this).css('left') );
               gogo( left > 0 ? 1 : -1 );
               return false;
            });
         }
         
         if (p) 
         {
            setTimeout(function () {
               for (i=1; i<=4; i++)
               {
                  if (s[i])
                  {
                     set_css( s[i], c[i] );
                  }
               }
               $(".desc_outer", slides[current_slide]).animate({
                  left: 0
               }, {
                  duration: 500,
                  queue: false,
                  complete: function () {
                     $(".nav_s_inner", slides[current_slide]).children().show();
                     $(".nav_s", slides[current_slide]).fadeIn(500, function () {
                        is_animating_slider = false;
                        is_animating_slider_gogo = false;
                        start_ticker();
                     });
                  }
               });
               slides_click();
            }, speed_slide);
         }
         else
         {
            is_animating_slider = false;
            $(".desc_outer", slides[current_slide]).css('left', 0);
            $(".nav_s", slides[current_slide]).show();
            slides_click();
         }
      }
      
      function set_css(slide, cur_n)
      {
         var css = get_css_for_slide(cur_n);
         slide.css( css );
         if (css.scale > 0)
            slide.scale(css.scale);                  
      }
      
      var is_animating_slider_gogo = false;
      function gogo(p) {
         if (is_animating_slider_gogo)
            return;
         is_animating_slider_gogo = true;
         $(".nav_s", slides[ current_slide ]).fadeOut(500, function () {
            $(".desc_outer", slides[ current_slide ]).animate({
               left: "-341px"
            }, {
               duration: 500,
               queue: false,
               complete: function () {
                  //$(".nav_s_inner", slides[ current_slide ]);
                  go_slide(p);
               }
            });
         });
      }
      
      $(".pxs_prev, .pxs_next", c).unbind().click(function () {
         start_ticker(true);
         gogo( $(this).hasClass('pxs_next') ? 1 : -1 );
      });
      
      slides.hide();
      
      slides.each(function () {
         if ( $(this).index() == current_slide )
            return;
         $(".nav_s", this).hide();
         $(".desc_outer", c).css('left', '-341px');
      });
      
      go_slide(0);
      start_ticker();
      
   });
});
