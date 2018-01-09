<<<<<<< HEAD
var Vue = new Vue({
	el: "#changeShop",
	data: function() {
		return {
			list: [],
			picservice: picservice,// 图片的服务器地址
			isNoData: false,// 是否有数据
			isSuccess:false// 改变成功后的页面反馈
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.getShops(function(resData) {
				_this.list = resData.data;
				// 判断当前的店铺是不是大于1
				_this.isNoData = (_this.list.length < 2) ? true : '';
			})
		})
	},
	methods: {
		getShops: function(callBack) {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchant/getMerchants", sendData);
		},
		changeShop: function(id) {
			var _this = this ;
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"merchantId": id // 切换商户的ID
				},
				fun_Success: function(data) {
					mui.toast(data.message);
					if(data.success) {
						// 重新更新token
						Fun_App.storagedata("token", data.data.token)
						console.log("重新更新token"+Fun_App.getdata("token"));
						_this.isSuccess=true;
						setTimeout(function(){
							// 打开需要更新的页面
							detailPage = plus.webview.getWebviewById('page/work/home.html');
							mui.fire(detailPage, "getindexData");
//							detailPage = plus.webview.getWebviewById('page/order/myorder.html');
							// 关闭订单页面,到时候点击功能按钮会在创建一个
							try{
								plus.webview.getWebviewById('page/order/myorder.html').close();
							}catch(e){
								//TODO handle the exception
								console.log("获取订单页面失败");
							}
//							detailPage.close();
							detailPage = plus.webview.getWebviewById('page/account/myaccount.html');
							mui.fire(detailPage, "getInfodata");
							// 完成后关闭当前页面
							plus.webview.currentWebview().close();
						},1000)
					}
				}
			};
			Fun_App.ExAjax("merchant/switchMerchant", sendData);
		}
	}
=======
var Vue = new Vue({
	el: "#changeShop",
	data: function() {
		return {
			list: [],
			picservice: picservice,// 图片的服务器地址
			isNoData: false,// 是否有数据
			isSuccess:false// 改变成功后的页面反馈
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.getShops(function(resData) {
				_this.list = resData.data;
				// 判断当前的店铺是不是大于1
				_this.isNoData = (_this.list.length < 2) ? true : '';
			})
		})
	},
	methods: {
		getShops: function(callBack) {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchant/getMerchants", sendData);
		},
		changeShop: function(id) {
			var _this = this ;
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"merchantId": id // 切换商户的ID
				},
				fun_Success: function(data) {
					mui.toast(data.message);
					if(data.success) {
						// 重新更新token
						Fun_App.storagedata("token", data.data.token)
						_this.isSuccess=true;
						setTimeout(function(){
							// 打开需要更新的页面
							detailPage = plus.webview.getWebviewById('page/work/home.html');
							mui.fire(detailPage, "getindexData")
							detailPage = plus.webview.getWebviewById('page/order/myorder.html');
							mui.fire(detailPage, "getMyOrderTop")
							detailPage = plus.webview.getWebviewById('page/order/myorder.html');
							mui.fire(detailPage, "myOrderList")
							detailPage = plus.webview.getWebviewById('page/account/myaccount.html');
							mui.fire(detailPage, "getInfodata")
							// 完成后关闭当前页面
							plus.webview.currentWebview().close();
						},1000)
					}
				}
			};
			Fun_App.ExAjax("merchant/switchMerchant", sendData)
		}
	}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
})