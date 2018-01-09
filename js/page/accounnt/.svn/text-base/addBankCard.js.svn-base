var Vue = new Vue({
	el: "#addBankCard",
	data: function() {
		return {
			pageData: {
				token: Fun_App.getdata("token"),
				bankName: null,
				bankUser: null,
				bankCode: null,
				bankProvince: null,
				bankCity: null,
				bankArea: null,
				messageCode: null
			},
			bankAddress: null,
			showOutTime: false, // 显示倒计时
			second: 90, // 总计时
			bankCardAddress: null, // 这个是接口获取地址
			isSeeCard: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			var id = Fun_App.getextrasdata();
			if(id != null && id != 'null') {
				_this.seeBankCard(function(resData) {
					_this.pageData.bankUser = resData.bankUser
					_this.pageData.bankName = resData.bankName
					_this.pageData.bankCode = resData.bankCode
					_this.bankAddress = resData.bankNameBranch
				}, id)
			} else {
				_this.isSeeCard = true;
				_this.getBankAddress(function(resData) {
					_this.bankCardAddress = resData.replace(/\\/g, '');

				})
			}

		})
	},
	methods: {
		// 银行的名称
		addBank: function() {
			var _this = this;
			var Bank = new mui.PopPicker()
			Bank.setData([{
				text: '建设银行'
			}, {
				text: '中国银行'
			}, {
				text: '工商银行'
			}, {
				text: '农业银行'
			}, {
				text: '招商银行'
			}, {
				text: '光大银行'
			}, {
				text: '民生银行'
			}, {
				text: '兴业银行'
			}, {
				text: '交通银行'
			}, {
				text: '中信银行'
			}, {
				text: '华夏银行'
			}, {
				text: '邮政银行'
			}]);
			Bank.show(function(items) {
				_this.pageData.bankName = items[0].text;
			});
		},
		// 添加银行的地址
		bankAddr: function() {
			var Add = new mui.PopPicker({
				layer: 3
			});
			var _this = this;
			Add.setData(JSON.parse(_this.bankCardAddress));
			Add.show(function(items) {
				_this.pageData.bankProvince = items[0].value;
				_this.pageData.bankCity = items[1].value;
				_this.pageData.bankArea = items[2].value;
				_this.bankAddress = items[0].text + '-' + items[1].text + '-' + items[2].text
			})
		},
		// 添加银行卡
		addBankCard: function() {
			var sendData = {
				config: this.pageData,
				fun_Success: function(data) {
					mui("#buttom").button('reset');
					if(data.success) {
						mui.alert('添加银行卡成功!', '提示', '知道了!', function(e) {
							e.index
						}, 'div');
					} else {
						mui.toast(data.message);
					}
				}
			}
			if(Fun_App.checkObjIsNull(this.pageData, '') != false) {
				mui("#buttom").button('loading');
				Fun_App.ExAjax("merchantPerson/bindingBankCard", sendData)
			} else {
				mui.toast('还有数据没有填写完整哦!')
			}
		},
		// 获取银行地址
		getBankAddress: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					console.log(Fun_App.getdata('token'))
					callBack(data.data)
				}
			}
			Fun_App.ExAjax("merchantPerson/getAllAddress", sendData)
		},
		// 查看銀行卡
		seeBankCard: function(callBack, id) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					bankCardId: id
				},
				fun_Success: function(data) {
					callBack(data.data)
				}
			}
			Fun_App.ExAjax("merchantPerson/previewBankCard", sendData)
		},
		// 发送短信验证码
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
					type: 5
				},
				fun_Success: function(data) {
					if(data.success) {
						mui.toast(data.message)
						_this.timeOut();
					} else {
						mui.toast(data.message)
					}
				}
			}
			if(this.showOutTime == false) {
				mui.plusReady(function() {
					Fun_App.ExAjax("merchant/smsVerify", sendData);
				})
			}
		}
	}

})