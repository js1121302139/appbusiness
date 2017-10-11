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
	