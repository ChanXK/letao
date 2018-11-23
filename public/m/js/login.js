$(function () {
    var letao=new LeTao();
    letao.Login();
    letao.Register();

})
var LeTao = function () {

}
LeTao.prototype = {
    Login: function () {
        //    登录 // 
        $('.btn-login').on('tap', function () {
            var name = $('.username').val();
            var pwd = $('.pwd').val();
            $.ajax({
                data: {
                    username: name,
                    password: pwd
                },
                type: 'post',
                url: '/user/login',
                success: function (data) {
                    if (data.success) {
                        // console.log(data);
                        var str = window.location.search;
                        console.log(str);

                        str = str.substring(1, str.length);
                        str = str.split('=');
                        console.log(str);
                        if (str[1] == 'register') {
                            window.location = 'index.html';
                        } else {
                            window.location = 'javascript:history.back()';
                        }

                    } else {
                        mui.toast('您输入的账号或密码有误，请重新输入');
                    }
                }
            })
        });
    },
    Register: function () {
        // 注册
        $('.btn-register').on('tap', function () {
            window.location = 'register.html?login=1'
        })
    }
}