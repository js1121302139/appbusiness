var Vue = new Vue({
	el: "#myuser",
	data: function() {
		return {
			pageData: {
				// 店铺名
				merchantName: "",
				// 结束时间
				effectTime: "",
				// 寄存物品列表
				sonsignList: [],
				// 订单编号
				orderNumber: "",
				// 创建时间
				createTime: "",
				// 用户名
				memName: "",
				// 二维码文本
				qrToken: ""
			},
			// 核销后的状态
			isSuccess: false,
			// 是否显示核销按钮
			showBtn: false
		}
	},
	created: function() {
		mui.plusReady(function() {
			// 获取传递过来的 qrToken 和数据
			var getPage = Fun_App.getextrasdata();
			try {
				// 判断当前的数据类型 （ string || Obj ）
				this.pageData.qrToken = getPage;
				this.showBtn = typeof this.pageData.qrToken === "string";
				// 为字符串的时候
				if(this.showBtn) {
					plus.webview.currentWebview().opener().close();
					this.getSonsignList();
				} else {
					// 跟上面一样
					this.pageData = {
						merchantName: getPage.merchantName,
						effectTime: getPage.effectTime,
						sonsignList: eval(getPage.content),
						orderNumber: getPage.nbr,
						createTime: getPage.createTime,
						memName: getPage.memName
					}

				}

			} catch(e) {
				//TODO handle the exception
			}
		}.bind(this))
	},
	methods: {
		getSonsignList: function() {
			var _this = this;
			var sendData = {
				config: this.pageData.qrToken,
				data_Config: [
					"merToken=" + Fun_App.getdata("token")
				],
				fun_Success: function(resData) {
					mui.toast(resData.retMsg);
					var sonsignData = resData.data;
					if(resData.retCode !== 0) return false;
					// 这个跟上面的一样
					_this.pageData = {
						merchantName: sonsignData.merchantName,
						effectTime: sonsignData.effectTime,
						sonsignList: eval(sonsignData.content),
						orderNumber: sonsignData.nbr,
						createTime: sonsignData.createTime,
						memName: sonsignData.memName,
						// 寄存单号流水
						repoNbr: sonsignData.nbr
					}

				}
			}
			Fun_App.ExEncryptionAjax("order-service/mem/myrepo/qr/show", sendData, " ", "post", "abc")
		},
		// 核销
		chk: function() {
			var _this = this;
			var sendData = {
				config: this.pageData.repoNbr,
				data_Config: [
					"merToken=" + Fun_App.getdata("token")
				],
				fun_Success: function(resData) {
					mui.toast(resData.retMsg);
					mui("#buttom").button('reset');
					// 返回状态码不等于0
					if(resData.retCode !== 0) return false;
					// 否者设置成功的状态
					_this.isSuccess = true;
					setTimeout(function() {
						plus.webview.currentWebview().close();
					}, 1000)
					mui.fire(plus.webview.getWebviewById("storeSonsign.html"), 'storeList');
				}
			}
			console.log("config " + JSON.stringify(sendData.config));
			mui.confirm('提交后无法更改领取信息!', '确认领取？', ['取消', '确认'], function(e) {
				if(!e.index) {
					mui.toast('用户已取消');
				} else {
					mui("#buttom").button('loading');
					Fun_App.ExEncryptionAjax("order-service/mem/myrepo/qr/chk", sendData, " ", "post", "abc")
					setTimeout(function() {
						mui("#buttom").button('reset');
					}, 5000)
				}
			}, 'div')
		}
	}

})