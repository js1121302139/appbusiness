var vue = new Vue({
	el: "#addSonsign",
	data: function() {
		return {
			pageData: {
				// 二维码信息
				qrToken: "",
				// 用户名
				memberName: "",
				// 总金额
				moneyTotal: 0,
				// 订单编号
				orderSn: "",
				// 支付时间
				payTime: ""
			},
			sendData: {
				// 用户名
				memberName: '',
				// 订单编号
				orderSn: "",
				// 支付时间
				payTime: "",
				//结束时间
				endTime: "",
				// 寄存商品
				goods: [{
					// 物品的名称
					name: "",
					// 物品的数量
					num: "",
					// 物品的单位
					unit: ''
				}]
			},
			// 寄存的结束时间
			effectTime: "",
			isSuccess: false
		}
	},
	created: function() {
		mui.plusReady(function() {
			this.effectTime = Fun_App.getNowFormatDate();
			// 获取二维码
			this.pageData.qrToken = Fun_App.getextrasdata();
			try {
				plus.webview.currentWebview().opener().close();
				this.getUserInfo();
			} catch(e) {
				//TODO handle the exception
				console.log("前一个页面已被关闭!");
			}
		}.bind(this))
	},
	methods: {
		getUserInfo: function() {
			var _this = this;
			var sendData = {
				config: this.pageData.qrToken,
				data_Config: [
					"merchantToken=" + Fun_App.getdata("token")
				],
				fun_Success: function(resData) {
					mui.toast(resData.retMsg);
					if(resData.retCode !== 0) {
						plus.webview.currentWebview().close("slide-out-right", 500);
						return false;
					};
					var datas = resData.data;
					_this.pageData = {
						// 二维码信息
						qrToken: "",
						// 用户名
						memberName: datas.memberName,
						// 总金额
						moneyTotal: datas.moneyTotal,
						// 订单编号
						orderSn: datas.orderSn,
						// 支付时间
						payTime: datas.payTime,

						resData: datas
					}
				}
			}
			console.log(sendData.config.qrToken);
			Fun_App.ExEncryptionAjax("order-service/merchant/order/myrepo/qr/parse", sendData, " ", "post", "abc")
		},
		getSonsignList: function() {
			var _this = this;
			console.log(JSON.stringify(this.pageData.resData))
			var thisData =  this.pageData.resData;
			var sendData = {
				config: {
					"ordId": thisData.id,
					"memId": thisData.memberId,
					"memName": thisData.memberName,
					"merchantId": thisData.merchantId,
					"merchantName": thisData.merchantName,
					"effectTime": this.effectTime,
					"content": this.sendData.goods
				},
				data_Config: [
					"merToken=" + Fun_App.getdata("token")
				],
				fun_Success: function(resData) {
					mui.toast(resData.retMsg);
					mui("#buttom").button('reset');
					if(resData.retCode != 0) return false;
					// 设置反馈的状态
					_this.isSuccess = true;
					// 通知列表页面刷新
					mui.fire(plus.webview.getWebviewById("storeSonsign.html"), 'storeList');
					// 关页面
					setTimeout(function() {
						plus.webview.currentWebview().close();
					}, 500)
				}
			}
			// 判断数据的完整
			if(Fun_App.checkObjIsNull(sendData.config, ["merchantName"]) == false) {
				mui.toast('还有数据没填写！')
				console.log(JSON.stringify(sendData.config))
				return false;
			}
			// 判断寄存数据的完整
			if(Fun_App.checkArrayObjIsNull(sendData.config.content) == false || !sendData.config.content.length) {
				mui.toast('寄存物品信息不完善！')
				return false;
			}
			mui.confirm('提交后无法修改寄存信息', '确认提交?', ['取消', '确认'], function(e) {
				if(e.index) {
					// 设置按钮状态
					mui("#buttom").button('loading');
					//console.log(JSON.stringify(sendData))
					Fun_App.ExEncryptionAjax("order-service/merchant/order/myrepo/save", sendData, "", "post", "abc");
					setTimeout(function() {
						mui("#buttom").button('reset');
					}, 5000)
				} else {
					//console.log(JSON.stringify(sendData))
					mui.toast('用户已取消！')
				}
			}, 'div')
		},
		// 添加物品的方法
		addGoods: function() {
			this.sendData.goods.push({
				name: "",
				num: "",
				unit: ""
			});
		},
		// 时间选择
		optionDate: function() {
			// 获取当前的时间
			var seconds = new Date().getSeconds() <= 9 ? "0" + new Date().getSeconds() : new Date().getSeconds();
			// 日期时间选择器
			var picker = new mui.DtPicker({
					type: ''
				}),
				_this = this;
			picker.show(function(rs) {
				_this.effectTime = rs.text + ":" + seconds;
				picker.dispose();
			});
		}
	}
})