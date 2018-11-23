$(function () {
    mui('.mui-scroll-wrapper.right').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    mui('.mui-scroll-wrapper.left').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url:"/category/queryTopCategory",
        dataType:"json",
        type:"get",
        success:function (data) {
            console.log(data);
            var tem=template('firstCateTpl',data);
            // console.log(tem);
            
            $('ul').html(tem);
            
        }
    });

    // 点击事件 传id值
   
    $('.mui-scroll ul').on('tap','li a',function () {
        var id = $(this).data('id');
        console.log(id);
        
        $.ajax({
            url:"/category/querySecondCategory",
            dataType:"json",
            type:"get",
            data:{
                id:id
            },
            success:function (data) {
                console.log(data);
                var tem=template('secondCateTpl',data);
                
                $('.mui-row').html(tem);
                console.log(this);
                
               
            }
        })
        $(this).parent().addClass('active').siblings().removeClass('active');
    })
   
})