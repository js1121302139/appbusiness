var allMoneyBtnBox = document.querySelector("#allMoneyBtn"), //全部结算
	cashMoneyNumBox = document.querySelector("#cashMoneyNum"), //结算金额
	smCodeBox = document.querySelector("#smCode"), //短信验证码
	uPwdBox = document.querySelector("#upw"), //结算密码
	moneyData = null,
	cashBtnBox = document.querySelector("#cashBtn"); //申请结算按钮
(function(mui) {
	mui.plusReady(function() {
		moneyData = Fun_App.getextrasdata();
		document.querySelector("#numTotal").innerText = moneyData;
	})

	/*Fun_App.OpenPage('#cashBtn', 'cashsuccess.html', 'pop-in', '');//我的店铺*/
	allMoneyBtnBox.addEventListener("tap", function() {
		document.querySelector("#cashMoneyNum").value = moneyData;
	})
	cashBtnBox.addEventListener("tap", function() {
		if(cashMoneyNumBox.value !== null && smCodeBox.value !== null && uPwdBox.value !== null) {
			alert()
		} else {
			alert("不能为空")
		}
	})

}(mui))
//mui弹窗
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll();