/**
 * Created by kakawater on 16/10/30.
 */


$(function () {
    function resize() {
        const windowWidth = $(window).width();
        const isSmallScreen = windowWidth < 768;
        //根据屏幕的大小设置轮播图中的图片
        if (isSmallScreen){
            //小屏幕
            $("#ad-center > .carousel-inner > .item").each(function (index,element) {
                $(element).css("background-image","");
                $(element).html('<img src="'+$(element).attr("data-image-xs")+'">');
            });
        }else{
            //大屏幕
            $("#ad-center > .carousel-inner > .item").each(function (index,element) {
                $(element).html("");
                $(element).css("background-image", "url("+$(element).attr("data-image-lg")+")");
            });
        }

        /*
         *控制标签页的标签容器宽度
         */

        const tabItemcontainer = $("#products > .container > .nav-tab-wrap > .nav-tabs");

        //get the sum of all elements's width

        var width = 0;


        tabItemcontainer.children().each(function (index,tabitem) {
            width += $(tabitem).width() + 30;
        });

        if (windowWidth < width) {
            tabItemcontainer.width(width).parent().css("overflow-x","scroll");
        }

    }
    $(window).on("resize",resize).trigger("resize");

    $("#news-section .nav-pills a").on("click",function () {
       const title = $(this).data("title");
        $(".news-title").text(title);
    });
    $("#news-section .nav-pills a").first().trigger("click");


    // 获取界面上的轮播图容器
    var $carousels = $('#ad-center');
    var startX, endX;
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart', function(e) {
        // 手指触摸开始时记录一下手指所在的坐标X
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });

    $carousels.on('touchmove', function(e) {
        // 变量重复赋值
        endX = e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
    $carousels.on('touchend', function(e) {
        console.log(e);
        // 结束触摸一瞬间记录最后的手指所在坐标X
        // 比大小
        // console.log(endX);
        // 控制精度
        // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            // 有方向变化
            // console.log(startX > endX ? '←' : '→');
            // 2. 根据获得到的方向选择上一张或者下一张
            //     - $('a').click();
            //     - 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel-methods
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }});

});