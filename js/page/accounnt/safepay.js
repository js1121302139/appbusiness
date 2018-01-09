<<<<<<< HEAD
var Vue = new Vue({
	el: "#safe",
	data: function() {
		return {
			pageData: {
				phoneCode: null,
				newPwd: null
			},
			phoneNumber:"",
			showOutTime: false,
			second: 90,
			checkValue: new CheckValue()
		}
	},
	created: function() {
		mui.plusReady(function() {
			this.phoneNumber = Fun_App.getdata("phoneNumber");
		}.bind(this))
	},
	methods: {
		checkVal: function(type, val) {
			if(type == 'code') {
				this.pageData.phoneCode = this.checkValue.checkCode(val);
			} else {
				this.pageData.newPwd = this.checkValue.checkPwd(val);
			}
		},
		upDataLoginPwd: function() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"newPwd": this.pageData.newPwd,
					"code": this.pageData.phoneCode
				},
				fun_Success: function(data) {
					mui("#buttom").button('reset');
					if(data.success) {
						mui.toast("结算密码修改成功!");
						plus.webview.currentWebview().close();
					} else {
						mui.toast(data.message);
					}
				}
			}
			var _this = this;
			mui.plusReady(function() {
				if(Fun_App.checkObjIsNull(_this.pageData, "") != false) {
					mui("#buttom").button('loading');
					Fun_App.ExAjax("merchantPerson/updatebalancepassword", sendData)
				} else {
					mui.toast('还有数据没有填写完整!');
				}
			})

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
					token: Fun_App.getdata("token"),
					type: 2
				},
				fun_Success: function(data) {
					if(data.data) {
						_this.timeOut();
						mui.toast(data.message);
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
	filters: {
		phoneStart: function(val) {
			var phone = val.substr(3, 4);
			return val.replace(phone, " * * * * ");
		}
	}
=======
var Vue = new Vue({
	el: "#safe",
	data: function() {
		return {
			pageData: {
				phoneCode: null,
				newPwd: null
			},
			showOutTime: false,
			second: 90,
			checkValue: new CheckValue()
		}
	},
	created: function() {

	},
	methods: {
		checkVal: function(type, val) {
			if(type == 'code') {
				this.pageData.phoneCode = this.checkValue.checkCode(val);
			} else {
				this.pageData.newPwd = this.checkValue.checkPwd(val);
			}
		},
		upDataLoginPwd: function() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"newPwd": this.pageData.newPwd,
					"code": this.pageData.phoneCode
				},
				fun_Success: function(data) {
					mui("#buttom").button('reset');
					if(data.success) {
						mui.toast("结算密码修改成功!");
						plus.webview.currentWebview().close();
					} else {
						mui.toast(data.message);
					}
				}
			}
			var _this = this;
			mui.plusReady(function() {
				if(Fun_App.checkObjIsNull(_this.pageData, "") != false) {
					mui("#buttom").button('loading');
					Fun_App.ExAjax("merchantPerson/updatebalancepassword", sendData)
				} else {
					mui.toast('还有数据没有填写完整!');
				}
			})

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
					token: Fun_App.getdata("token"),
					type: 2
				},
				fun_Success: function(data) {
					if(data.data) {
						_this.timeOut();
						mui.toast(data.message);
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
	watch: {

	}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
})