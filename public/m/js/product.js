$(function () {
    // console.log(window.location.search);
    // var letao = new LeTao(1, 2);
    var letao = new LeTao();
    // function LeTao(page, pageSize) {
    //     this.page = page;
    //     this.pageSize = pageSize;
    // }

    console.log(letao);

    letao.getProductList();
    letao.searchProductList();
    letao.productListSort();
    letao.initPulldownupRefresh();
    letao.goBuy();




})
// 先执行，后执行入口函数
//如果放入口函数里面的话，就必须要放在函数调用的前面，赋值没有提前
var LeTao = function () {};
LeTao.prototype = {
    page:1,
    pageSize: 2,
    proName: '',
    getProductList: function () {
        //获取地址栏的搜索信息
        var that=this;
        var str = window.location.search;
        str = str.substring(1, str.length);
        // console.log(str);
        str = str.split('&');
        console.log(str);
        for (var i = 0; i < str.length; i++) {
            var res = str[i].split('=');
            console.log(res);
            if (res[0].indexOf('search') != -1) {
                res = decodeURI(res[1]);
                break;
            }
        }
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: {
                page: that.page,
                pageSize: that.pageSize,

                proName: res,
            },
            success: function (data) {
                console.log(data);

                var html = template('firstProduct', data);
                $('.shelf').html(html);
            }
        })


    },




    //页面的搜索栏搜索内容
    getProduct: function (res,price,num) {
        var that = this;
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: {
                page: that.page,
                pageSize: that.pageSize,
                proName: res,
                price:price||0,
                mum:num||0,
            },
            success: function (data) {
                console.log(data);

                var html = template('firstProduct', data);
                $('.shelf').html(html);
            }
        });


    },
    //页面本身搜索按钮的点击事件
    searchProductList: function () {
        var that = this;
        $('.btn-search').on('tap', function () {
            var str = $('.search-box').val();
            // that.search=str;
            // 需要重置，因为页面每点击一次，就需要加载第一页，所以需要重置为1
            that.page = 1;
            that.getProduct(str);
            // 每次点击搜索，就要重置下拉刷新
            mui('#refreshContainer').pullRefresh().refresh(true);
            $('.search-box').val('');
        })
    },
    //商品排序
    productListSort: function () {
        var that=this;
        $('.mui-col-xs-3 a').on('tap', function () {
            var sortType = $(this).data('sort-type');
            var sort = $(this).data('sort');
            if (sort == 1) {
                sort = 2;
                $(this).data('sort', sort);
            } else {
                sort = 1;
                $(this).data('sort', sort);
            }
            if (sortType == "price") {
                $.ajax({
                    url: '/product/queryProduct',
                    type: 'get',
                    data: {
                        page: that.page,
                        pageSize: that.pageSize,
                        proName: that.search,
                        price: sort,
                    },

                    success: function (data) {
                        console.log(data);

                        var html = template('firstProduct', data);
                        $('.shelf').html(html);
                    }
                })
            } else {
                $.ajax({
                    url: '/product/queryProduct',
                    type: 'get',
                    data: {
                        page: that.page,
                        pageSize: that.pageSize,
                        proName: that.search,
                        num: sort,
                    },
                    success: function (data) {
                        console.log(data);

                        var html = template('firstProduct', data);
                        $('.shelf').html(html);
                    }
                })
            }
        })

    },

    //上拉下拉
    initPulldownupRefresh: function () {
        var search = '';
        var page = 1;
        var pageSize = 2;
        var that = this;
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    // height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    // auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(() => {
                            // console.log(res);
                            that.page = 1;
                            $.ajax({
                                url: '/product/queryProduct',
                                type: 'get',
                                data: {
                                    page: that.page,
                                    pageSize: that.pageSize,
                                    proName: that.search,
                                },
                                success: function (data) {
                                    console.log(data);

                                    var html = template('firstProduct', data);
                                    $('.shelf').html(html);
                                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                                    mui('#refreshContainer').pullRefresh().refresh(true);
                                }
                            })

                        }, 1000)
                    }, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    // height: 50, //可选.默认50.触发上拉加载拖动距离
                    // auto: true, //可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        setTimeout(() => {
                            // console.log(res);
                            that.page++;
                            $.ajax({
                                url: '/product/queryProduct',
                                type: 'get',
                                data: {
                                    page: that.page,
                                    pageSize: that.pageSize,
                                    proName: that.search,
                                },
                                success: function (data) {
                                    // console.log(data);
                                    if (data.data.length > 0) {
                                        var html = template('firstProduct', data);
                                        $('.shelf').append(html);
                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                    } else {
                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    }

                                }
                            })

                        }, 1000)
                    }, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }

        });
    },

    // 点击购买
    goBuy:function () {
        $('.shelf').on('tap','.btn-buy',function () {
            var id=$('.btn-buy').data('id');
            console.log(id);
            window.location.href="detail.html?id="+id;
        })
    }
}