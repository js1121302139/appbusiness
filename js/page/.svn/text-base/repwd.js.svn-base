var Vue = new Vue({
	el: "#repwd",
	data: function() {
		return {
			changeInfo: {
				"password": null,
				"messageCode": null,
				'mobile': null
			},
			timer: null,
			check: new CheckValue(),
			showOutTime: false,
			second: 90
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.changeInfo.mobile = Fun_App.getextrasdata();
		})
	},
	methods: {
		changeUserData: function(key) {
			clearInterval(this.timer);
			var _this = this;
			switch(key) {
				case "password":
					_this.check.checkPwd(_this.changeInfo.password)
					break;
				case "mobile":
					_this.check.checkPhoneNum(_this.changeInfo.mobile)
					break;
				case "messageCode":
					_this.check.checkCode(_this.changeInfo.messageCode)
					break;
			}
		},
		timeOut: function() {
			this.showOutTime = true;
			this.second--;
			if(this.second < 1) {
				this.showOutTime = false;
				this.second = 90;
			} else {
				var timeout = setTimeout(this.timeOut, 1000);
			}
		},
		smsVerify: function() {
			var _this = this;
			var sendData = {
				config: {
					'phone': this.changeInfo.mobile
				},
				fun_Success: function(data) {
					if(data.data) {
						mui.toast(data.message)
						_this.timeOut();
					} else {
						mui.toast(data.message)
					}
				}
			}
			if(this.showOutTime == false && this.changeInfo.mobile != null) {
				mui.plusReady(function() {
					Fun_App.ExAjax("lookpwdSmsSend", sendData);
				})
			} else {
				mui.toast('请输入手机号!');
			}
		},
		changePwd: function() {
			var sendData = {
				config: this.changeInfo,
				fun_Success: function(data) {
					if(data.success) {
						mui.toast('密码修改成功,2秒后跳回登录页面!')
						setTimeout(function() {
							plus.webview.currentWebview().close();
						}, 2500)
					} else {
						mui.toast(data.message)
					}
				}
			}
			Fun_App.checkObjIsNull(this.changeInfo, "") != false ? Fun_App.ExAjax("findPassword", sendData) : mui.toast('还有东西没有填写!')
		}

	}

})