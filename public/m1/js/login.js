$(function() {
    /*1. 登录功能
    	1. 给登录按钮添加事件
    	2. 获取当前输入用户名 和 密码
    	3. 判断用户名和密码是否输入
    	4. 没有输入 就提示用户输入 
    	5. 如果输入了 就调用APi请求登录接口
    	6. 如果登录失败就提示用户失败的原因
    	7. 如果成功就返回上一页继续购买商品*/
    // 1. 给登录按钮添加事件
    $('.btn-login').on('tap', function() {
        // 2. 获取当前输入用户名 和 密码
        var username = $('.username').val();
        // 3. 验证用户是否输入 没有输入使用mui 确认框提示用户
        if (!username.trim()) {
            // mui.alert('提示内容','提示标题','提示按钮的文字','回调函数可以不加')
            mui.alert('请输入用户名', '温馨提示', '确定');
            return false;
        }
        var password = $('.password').val();
        if (!password.trim()) {
            mui.alert('请输入密码', '温馨提示', '确定');
            return false;
        }
        // 4. 如果输入了 就调用APi请求登录接口
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: { username: username, password: password },
            success: function(data) {
                console.log(data);
                // 5. 判断如果登录失败就提示用户登录失败的原因
                // 后台规定了如果登录失败返回403 表示用户或者密码错误
                if (data.error == 403) {
                    mui.toast('请输入正确的用户名或者密码');
                } else if (data.success) {
                    //判断如果登录成功 返回到详情页面	 使用历史记录的返回上一页
                    history.back();
                }
            }
        });
    });

    // 2. 点击注册按钮跳转到注册页面
    $('.btn-register').on('tap',function () {
    		// 使用location跳转注册页面
    		location = 'register.html';
    });
});
