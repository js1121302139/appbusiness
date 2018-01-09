var Vue = new Vue({
	el: "#partyAdmin",
	data: {
		status: {
			'0': '未审核',
			'1': "审核通过",
			'2': "审核不通过",
			"3": '下架',
			"4": "众筹成功",
			"5": "众筹失败"
		},
		partyType: {
			3: "购票",
			4: "众筹"
		},
		totalPage: null,
		page: 1,
		list: [],
		pageLen: pageLen,
		isNoData: false
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			refresher.init({
				id: "wrapper",
				pullUpAction: _this.Load
			});
			window.addEventListener("getPartyList", function() {
				_this.getPartyList(function(resData) {
					_this.list = resData.data;
					_this.totalPage = resData.total;
					_this.isNoData = (_this.list.length < 1) ? true : '';
				});
			})
			_this.getPartyList(function(resData) {
				_this.list = resData.data;
				_this.isNoData = (_this.list.length < 1) ? true : '';
				_this.totalPage = Math.ceil(resData.total / this.pageLen);
			});
		})
	},
	methods: {
		getPartyList: function(callBack, page) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					pageIndex: page
				},
				fun_Success: function(data) {
					callBack(data);
				}
			}
			Fun_App.ExAjax("merchantParty/playKaList", sendData)
		},
		open: function(openClass, id) {
			var win = {
				Settlement: './partySettlement.html',
				partyIn: './partyIn.html',
				create: './createParty.html',
				qrCode: '../qrCode.html'
			}
			Fun_App.openWin(win[openClass], 'pop-in', id)
		},
		Load: function() {
			this.page++;
			var _this = this;
			if(this.page < this.totalPage) {
				this.getPartyList(function(resData) {
					_this.list = _this.list.concat(resData.data);
				}, this.page)
			} else {
				refresher.info.pullUpLable = '没有更多数据了!';
			}
			wrapper.refresh();
		}
	}
})