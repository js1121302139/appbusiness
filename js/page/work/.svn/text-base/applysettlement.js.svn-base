var allMoneyBtnBox = document.querySelector("#allMoneyBtn"), //全部结算
    cashMoneyNumBox = document.querySelector("#cashMoneyNum"), //结算金额
    smCodeBox = document.querySelector("#smCode"), //短信验证码
    uPwdBox = document.querySelector("#upw"), //结算密码
    getPhoneCodeBox = document.querySelector("#getPhoneCode"),//获取短信
    phoneNumCodePromptBox= document.querySelector(".phoneNumCodePrompt"),//提示
    dateTimer = 60;
    cashBtnBox = document.querySelector("#cashBtn"); //申请结算按钮

    function smsWithdrawVerify() {
        var smsWithdrawVerifyRes = {
            config: {
                "token": Fun_App.getdata("token"),
                'type': 4
            },
            fun_Success: function (data) {
                if (!data.success) {
                    var time = setInterval(function () {
                        phoneNumCodePromptBox.innerText="请"+ (dateTimer--) +"秒后再次获取验证码";
                        if (dateTimer<0){
                            clearInterval(time);
                            phoneNumCodePromptBox.innerText="再次获取验证码";
                            dateTimer==60;
                        }
                    },1000)
                } else {
                    mui.toast(data.message);
                }
            } 
        };
        Fun_App.ExAjax("merchant/smsVerify", smsWithdrawVerifyRes);
    } 

(function (mui) {
    document.querySelector("#numTotal").innerText = "可结算:" + Fun_App.getextrasdata('Withdrawals').Withdrawals;
    /*Fun_App.OpenPage('#cashBtn', 'cashsuccess.html', 'pop-in', '');//我的店铺*/
    allMoneyBtnBox.addEventListener("tap", function () {
        document.querySelector("#cashMoneyNum").value = Fun_App.getextrasdata('Withdrawals').Withdrawals;
    });
    getPhoneCodeBox.addEventListener("tap", function () {
        dateTimer!=60?"":smsWithdrawVerify();
    });
    cashBtnBox.addEventListener("tap", function () {
        if (cashMoneyNumBox.value !== null && smCodeBox.value !== null && uPwdBox.value !== null) {
           
        } else {
            alert("不能为空")
        }
    })

}(mui));