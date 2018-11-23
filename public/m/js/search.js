$(function () {
    //存到localstorage中
    var leTao = new LeTao();
    leTao.__proto__.queryHistory();
    leTao.__proto__.addHistory();
    leTao.__proto__.deleteHistory();
    leTao.__proto__.clearHistory();



})
var LeTao = function () {

}
LeTao.prototype = {
    //按钮的点击事件
    addHistory: function () {
        $('.btn-search').on('tap', function () {
            var historyData = JSON.parse(localStorage.getItem('historyData') || '[]');
            //获取输入的数据
            console.log(historyData);
            var search = $('.search-box').val();
            if (!search.trim()) {
                return false;
            }
            if (historyData.indexOf(search) != -1) {
                console.log(historyData.indexOf(search));
                historyData.splice(historyData.indexOf(search), 1);
            }
            console.log(search);

            historyData.unshift(search);
            console.log(historyData);

            localStorage.setItem('historyData', JSON.stringify(historyData))
            LeTao.prototype.queryHistory();
            $('.search-box').val('');
            // window.location.href="product.html?search="+search;
            window.location.href = 'product.html?search='+search+'&page=1&pagesize=1'
        })
    },

    //显示localStorage的值
    queryHistory: function () {
        var historyData = JSON.parse(localStorage.getItem('historyData') || '[]');
        var tem = template('firstSearch', {
            rows: historyData
        });
        // console.log(tem);

        $('ul.mui-table-view ').html(tem);
    },
    //删除单个列表
    deleteHistory: function () {
        $('.mui-card-content ul').on('tap', '.btn-delete', function () {
            var id = $(this).parent().data('index');
            console.log(id);
            var historyData = JSON.parse(localStorage.getItem('historyData') || '[]');
            historyData.splice(id, 1);
            localStorage.setItem('historyData', JSON.stringify(historyData));
            LeTao.prototype.queryHistory();
        });
    },

    //全部删除
    clearHistory: function () {
        $('.btn-clear').on('tap', function () {
            localStorage.removeItem('historyData');
            LeTao.prototype.queryHistory();
        })
    },
}