var Vue = new Vue({
	el: "#safe",
	data: function() {
		return {
			pageData: {
				phoneCode: null,
				newPwd: null
			},
			phoneNumber:null,
			showOutTime: false, // 发送短信倒计时
			second: 90, // 倒计时
			checkValue: new CheckValue() // 检测实例
		}
	},
	created: function() {
		mui.plusReady(function(){
			this.phoneNumber = Fun_App.getdata("phoneNumber");
		}.bind(this))
	},
	methods: {
		// 检测数据
		checkVal: function(type, val) {
			// 验证码
			if(type == 'code') {
				this.pageData.phoneCode = this.checkValue.checkCode(val);
			} else {
				// 密码
				this.pageData.newPwd = this.checkValue.checkPwd(val);
			}
		},
		// 修改密码
		upDataLoginPwd: function() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"newPwd": this.pageData.newPwd,
					"code": this.pageData.phoneCode
				},
				fun_Success: function(data) {
					// 重置按钮的状态
					mui("#buttom").button('reset');
					if(data.success) {
						mui.toast("登录密码修改成功");
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
			var _this = this;
			mui.plusReady(function() {
				// 按钮的状态
				mui("#buttom").button('loading');
				if(Fun_App.checkObjIsNull(_this.pageData, "") != false) {
					Fun_App.ExAjax("merchantPerson/updatepassword", sendData);
				} else {
					mui.toast('还有数据没有填写完整!')
				}
			})

		},
		// 倒计时
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
		// 发送短信
		smsVerify: function() {
			var _this = this;
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					type: 1
				},
				fun_Success: function(data) {
					if(data.data) {
						mui.toast(data.message);
						_this.timeOut();
					} else {
						mui.toast(data.message);
					}
				}
			}
			if(this.showOutTime == false) {
				mui.plusReady(function() {
					Fun_App.ExAjax("merchant/smsVerify", sendData);
				})
			}
		}
	},
	filters:{
		phoneStart:function(val){
			var val = String(val);
			var phone = val.substr(3, 4);
			return val.replace(phone, " * * * * ");
		}
	}
})