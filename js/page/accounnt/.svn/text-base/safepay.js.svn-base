(function(mui) {
	var codeButton = document.querySelector("#codeButton"),
		imgCodeBox = document.querySelector("#imgCode"),
		phoneCodeBox = document.querySelector("#phoneCode"),
		yzmNumBox = document.querySelector("#yzmNum"),
		updateBalanceBtnBox = document.querySelector("#updateBalanceBtn"),
		checkState = false,
		newPwdBox = document.querySelector("#newPwd");
		
	//发送短信时间限制，90秒后可重新发送
	var second = 90;
	function startCount() {
		codeButton.innerHTML = second + "秒后可重新发送";
		codeButton.disabled = true;
		second--;
		if(second < 1) {
			clearTimeout(timeout);
			second = 90;
			codeButton.innerHTML = "重新获取验证码";
			codeButton.removeAttribute("disabled");
		} else {
			timeout = setTimeout(startCount, 1000);
		}

	}

	//验证验证码
	codeButton.addEventListener("tap", function() {
		var imgCodeValReg = /^(\d){4,4}$/; //正则
			smsWithdrawVerify();
	})
	//修改newPwd
	var configData = {
		'newPwd': null,
		'phoneCode': null
	}
	//验证短信
	phoneCodeBox.addEventListener("change", function() {
		var phoneCodeValReg = /^(\d){6,6}$/; //正则
		var phoneCodeVal = this.value;
		if(phoneCodeValReg.test(phoneCodeVal)) {
			configData.phoneCode = this.value
		} else {
			mui.toast('请输入正确格式的短信!');
			console.log(JSON.stringify(configData))
		}
	})
	//验证密码
	newPwdBox.addEventListener("change", function() {
		var newPwdValReg = /^(\S){6,16}$/; //正则
		var newPwdVal = this.value;
		if(newPwdValReg.test(newPwdVal)) {
			configData.newPwd = this.value
		} else {
			mui.toast('请输入正确格式密码!');
		}
	})
	//验证用户的信息是否完整
	updateBalanceBtnBox.addEventListener("tap", function() {
		this.focus();
		console.log(Fun_App.checkObjIsNull(configData, null))
		if(Fun_App.checkObjIsNull(configData, null) != false) {
			upDataLoginPwd()
		} else {
			mui.toast('你还有东西没输入完整！')
		}
	})
	//发送短信
	function smsWithdrawVerify() {
		var smsWithdrawVerifyRes = {
			config: {
				"token": Fun_App.getdata("token"),
				'type': 2
			},
			fun_Success: function(data) {
				if(data.success == true) {
					startCount();
					checkState = true;
				} else {
					mui.toast(data.message);
				}
			}
		}
		Fun_App.ExAjax("merchant/smsVerify", smsWithdrawVerifyRes);
		
	}
	//更改密码
	function upDataLoginPwd() {
		var sendData = {
			config: {
				"token": Fun_App.getdata("token"),
				"newPwd": configData.newPwd,
				"code": configData.phoneCode
			},
			fun_Success: function(data) {
				if(data.success) {
					mui.toast("结算密码修改成功");
					setTimeout(function() {
						var allWin = plus.webview.all();
						for(var i = 1; i < allWin.length; i++) {
							plus.webview.close(allWin[i]);
						}
					}, 2000)
				} else {
					mui.toast(data.message);
				}
			}
		}
		Fun_App.ExAjax("merchantPerson/updatebalancepassword", sendData);
	}

})(mui);