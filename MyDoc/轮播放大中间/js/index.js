$(function(){
    $(".case-list-content").slide({
        mainCell:".bd ul",
        autoPage:true,
        effect:"leftLoop",
        autoPlay:true,
        scroll:1,
        vis:3,
        startFun: function (i,c) {
            $(".contentbox li").removeClass("active");
            $(".contentbox li").eq(i+2).addClass("active");
        },

    });
})