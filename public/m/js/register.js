$(function () {

    var letao = new LeTao();
    letao.Register();
        letao.getVCode();




})
var LeTao = function () {

}
LeTao.prototype = {
    //注册的点击事件
    Register: function () {
        $('.btn-zhuce').on('tap', function () {

            var username = $('.username').val();
            //3. 获取当前输入的手机号
            var mobile = $('.moblie').val();
            console.log(mobile);

            // 3. 获取当前输入的用密码
            var password1 = $('.password1').val();
            // 4. 获取确认密码
            var password2 = $('.password2').val();
            // 5. 获取验证码
            var vCode = $('.vcode').val();
            var check = true;
            mui(".mui-input-row input").each(function () {
                //若当前input为空，则alert提醒 
                if (!this.value || this.value.trim() == "") {
                    var label = this.previousElementSibling;
                    mui.alert(label.innerText + "不允许为空");
                    check = false;
                    return false;
                }
            }); //校验通过，继续执行业务逻辑 
            if (check) {
                mui.alert('验证通过!')
            }
            // 判断两次密码是否一致
            if (!password1 == password2) {
                mui.toast('两次密码不一致');
                return false;
            }
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    username: username,
                    mobile: mobile,
                    password: password1,
                    vCode: vCode
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        // 注册成功返回上一页


                        window.location = 'login.html?from=register'
                    } else {
                        return false;
                    }

                }
            })

        });
    },

    // 验证码的获取
    getVCode: function () {

        $('.btn-getvCode').on('tap', function () {
            $.ajax({
                url: '/user/vCode',
                success: function (data) {
                    console.log(data);
                    $('.vcode').val(data.vCode);

                }
            })
        })
    },
}