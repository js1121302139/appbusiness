<<<<<<< HEAD
var Vue = new Vue({
	el: "#partySettlement",
	data: function() {
		return {
			page: 1,
			totalPage: null,
			pageLen: pageLen,
			orderId: null, //订单ID 
			pageData: {}, //页面数据
			settlementMoney:0, // 可结算金额
			showIco: false, //是否显示已结束图标
			picservice: picservice, //图片服务地址
			isBOOS: false,
			isMaster: false,
			StateCode: {
				0: '未结算',
				1: '审核中',
				2: '已结算',
				3: '退款'
			},
			applyState: { //申请结算的状态
				id: null,
				Text: ""
			}
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			// 获取当前的角色
			_this.isBOOS = Fun_App.getdata("jobCode") == 'BOOS' ? true : false;
			// 获取当前的用户类型
			_this.isMaster = (Fun_App.getdata("merchantType") != 0) ? false : true;
			window.addEventListener("getListData", function() {
				
				_this.getListData(_this.orderId, function(resData) {
					console.log("完成刷新")
					console.log(JSON.stringify(resData));
					// 可结算金额
					_this.settlementMoney = resData.data.settleMoneyTotal- resData.data.settleScalingMoney;
					//页面数据
					_this.pageData = resData.data;
					//总页数
					_this.totalPage = Math.ceil(_this.page / resData.total);
					//显示活动结束的图标
					_this.controlIco();
					//获取结算的id
					_this.applyState.id = resData.data.settlementStatus;
					//结算的状态文字 StateCode
					_this.applyState.Text = '<span>' + _this.StateCode[resData.data.settlementStatus] + '</span>'
				})
			})
			_this.orderId = Fun_App.getextrasdata();
			// 下拉刷新插件
			refresher.init({
				id: "wrapper",// 容器id
				pullUpAction: _this.Load //方法
			});
			//获取列表
			_this.getListData(_this.orderId, function(resData) {
				// 可结算金额
					_this.settlementMoney = resData.data.settleMoneyTotal- resData.data.settleScalingMoney;
					//页面数据
					_this.pageData = resData.data;
					//总页数
					_this.totalPage = Math.ceil(_this.page / resData.total);
					//显示活动结束的图标
					_this.controlIco();
					//获取结算的id
					_this.applyState.id = resData.data.settlementStatus;
					//结算的状态文字 StateCode
					_this.applyState.Text = '<span>' + _this.StateCode[resData.data.settlementStatus] + '</span>'
			})
		})

	},
	methods: {
		// 获取列表数据
		getListData: function(id, callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					id: id
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantParty/playKaOrders", sendData)
		},
		// 是否已结束
		controlIco: function() {
			var nowDate = new Date().getTime(),
				endTime = new Date(this.pageData.endTime.replace(/-/g, "/")).getTime();
			this.showIco = (endTime < nowDate);
		},
		// 打开页面
		open: function() {
			var _this = this;
			//判断当前的状态为0则是未结算 && endTime<startTime	
			if(this.applyState.id == 0 && this.showIco && this.pageData.settleMoneyTotal != 0) {
				mui.plusReady(function() {
					Fun_App.openWin("../work/applysettlement.html", "pop-in", {
						msgType: 6,// 短信类型
						type:6,// 结算类型
						scalingMoney:  _this.pageData.settleMoneyTotal, // 佣金
						money: _this.settlementMoney ,// 总金额
						id: _this.orderId// 活动id
					})
				})
			} else {
				mui.toast('当前状态不可申请结算!')
			}

		},
		// 加载更多
		Load: function() {
			wrapper.refresh();
		}
	}
})
=======
var Vue = new Vue({
			el: "#partySettlement",
			data: function() {
				return {
					page: 1,
					totalPage: null,
					pageLen: pageLen,
					orderId: null,//订单ID
					pageData: {},//页面数据
					showIco: false,//是否显示已结束图标
					picservice: picservice,//图片服务地址
					isBOOS:false,
					StateCode: {
						0: '未结算',
						1: '审核中',
						2: '已结算',
						3: '退款'
					},
					applyState: {//申请结算的状态
						id: null,
						Text: ""
					} 
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.isBOOS=Fun_App.getdata("jobCode")=='BOOS'?true:false;
					window.addEventListener("getListData", function() {
						_this.getListData(_this.orderId, function(resData) {
							_this.pageData = resData.data;
							_this.totalPage = Math.ceil(_this.page / resData.total);
							_this.controlIco();
							_this.applyState.id = resData.data.settlementStatus;
							_this.applyState.Text = '<span>' + _this.StateCode[resData.data.settlementStatus] + '</span>'
						})
					})
					_this.orderId = Fun_App.getextrasdata();
					refresher.init({
						id: "wrapper",
						pullUpAction: _this.Load
					});
					//获取列表
					_this.getListData(_this.orderId, function(resData) {
						_this.pageData = resData.data;
						_this.totalPage = Math.ceil(_this.page / resData.total);
						_this.controlIco();
						_this.applyState.id = resData.data.settlementStatus;
						_this.applyState.Text = '<span>' + _this.StateCode[resData.data.settlementStatus] + '</span>'
					})
				})

			},
			methods: {
				getListData: function(id, callBack) {
					var sendData = {
						config: {
							token: Fun_App.getdata("token"),
							id: id
						},
						fun_Success: function(data) {
							callBack(data)

						}
					}
					Fun_App.ExAjax("merchantParty/playKaOrders", sendData)
				},
				controlIco: function() {
					var nowDate = new Date().getTime(),
						endTime = new Date(this.pageData.endTime.replace(/-/g, "/")).getTime();
					this.showIco = (endTime < nowDate);
				},
				open: function() {
					var _this = this;
					//判断当前的状态为0则是未结算 && endTime<startTime
					if(this.applyState.id == 0 && this.showIco && this.pageData.settleMoneyTotal!=0) {
						mui.plusReady(function() {
							Fun_App.openWin("../work/applysettlement.html", "pop-in", {
								msgType: 6,
								money: _this.pageData.settleMoneyTotal,
								id: _this.orderId
							})
						})
					}else{
						mui.toast('当前状态不可申请结算!')
					}

				},
				Load: function() {
					wrapper.refresh();
				}
			}
		})
	
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
