$(function () {
    var letao = new LeTao();
    letao.initScroll();
    letao.getId();
    // letao.initNum();
    letao.addCart();
})
var LeTao = function () {

}
LeTao.prototype = {
    //获取id，实现页面的渲染
    getId: function () {
        var str = window.location.search;
        // console.log(str);
        str = str.substring(1, str.length);
        str = str.split('=');
        console.log(str);
        var id = str[1];
        this.id = id;

          // /轮播图的模板  异步请求，先去执行外面的代码了
          $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id,
            },
            success: function (data) {
                console.log(data);

                var html = template('sliderTpl', data)
                $('#slider .mui-slider').html(html);
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        });
        // 文字信息的渲染
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id,
            },
            success: function (data) {
                // console.log(data);
                var size = data.size;
                size = size.split('-');

                // console.log(size);
                var arr = [];
                for (var i = size[0] - 0; i <= size[1]; i++) {
                    arr.push(i);
                }
                console.log(arr);
                data.arr = arr;
                console.log(data);

                var html = template('productTpl', data)
                $('.product').html(html);
                mui('.mui-numbox').numbox();//在初始化之后才渲染
                // 确定是从登录页面过来的才渲染
                //渲染数量
                var str=JSON.parse(localStorage.getItem('data'));
                console.log(str);
                
                console.log(str.num);
                mui('.product-num').numbox().setValue(str.num);
                // 渲染尺码
                for(var i=0;i<$('.btn-size').length;i++){
                    if($($('.btn-size')[i]).data('size')==str.size){
                       $( $('.btn-size')[i]).addClass('active');
                    }
                 }

            }
        });
      
    },


    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    // initNum:function () {
    //     mui('.mui-numbox').numbox()
    // }
    addCart: function () {
        var that = this;
        // h获取尺码  只能用事件委托
        $('#main').on('tap','.btn-size', function () {
            console.log(111);
            $(this).addClass('active').siblings().removeClass('active');
            var size = $(this).data('size');
            console.log(this);
            console.log(size);
        }) //获取不到

        $('.btn-add-cart').on('tap', function () {
            var size = $('.btn-size.active').data('size');
            if (!size) {

                mui.toast('请选择尺寸', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }
            var num = mui('.product-num').numbox().getValue();
            if (!num) {
                mui.toast('请选择数量', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }

            var data = {
                productId: that.id,
                num: num,
                size: size,
            };
            localStorage.setItem('data', JSON.stringify(data));

            console.log(localStorage.getItem('data'));

            $.ajax({
                url: '/cart/addCart',
                data: {
                    productId: that.id,
                    num: num,
                    size: size,
                },
                type: 'post',
                success: function (data) {
                    console.log(data);
                    if (data.error == '400') {

                        window.location = 'login.html';
                    }

                }
            })
        })
    }
}