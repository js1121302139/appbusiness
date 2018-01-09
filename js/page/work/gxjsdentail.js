<<<<<<< HEAD
(function(mui) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '加载...',
				callback: pullupRefresh
			}
		}
	});
	var page = 1;

	function pullupRefresh() {
		++page;
		getjsincomeData(page);
		return;
	}

	function getjsincomeData(pageNum) {
		var send = {
			config: {
				"token": Fun_App.getdata("token"),
				"pageIndex": pageNum
			},
			fun_Success: function(data) {
				totalPage = Math.ceil(data.total / 1)
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageNum > totalPage));
				if(data.success) {
					var jsListBox = document.querySelector("#jsList"); //结算明细列表
					var datas = data.data;
					for(var i = 0; i < datas.length; i++) {
						jsListBox.innerHTML += '<div class="order-good-item">' +
							'<div class="order-good-top">' +
							'<div class="order-good-top-left">' +
							'<span>结算单号：' + datas[i].orderSn + '</span>' +
							'</div>' +
							'</div>' +
							'<div class="mui-table-view-cell  ">' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell">' +
							'<span class="shop-top-title mui-ellipsis ">结算金额：<span class="drawing-num">' + datas[i].money + '</span>元</span>' +
							'</div>' +
							'<div class="mui-table-cell">' +
							'<span class="shop-top-title mui-ellipsis ">剩余金额：<span class="surplus-num">' + datas[i].moneyAfter + '</span>元</span>' +
							'</div>' +
							'</div>' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell txtime">' +
							datas[i].createTime +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>'
					}
				}

			}
		}
		Fun_App.ExAjax("merchantShare/withdrawInfo", send);
	}
	mui.plusReady(function() {
		getjsincomeData(page);
	})
=======
(function(mui) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '加载...',
				callback: pullupRefresh
			}
		}
	});
	var page = 1;

	function pullupRefresh() {
		++page;
		getjsincomeData(page);
		return;
	}

	function getjsincomeData(pageNum) {
		var send = {
			config: {
				"token": Fun_App.getdata("token"),
				"pageIndex": pageNum
			},
			fun_Success: function(data) {
				totalPage = Math.ceil(data.total / 1)
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageNum > totalPage));
				if(data.success) {
					var jsListBox = document.querySelector("#jsList"); //结算明细列表
					var datas = data.data;
					for(var i = 0; i < datas.length; i++) {
						jsListBox.innerHTML += '<div class="order-good-item">' +
							'<div class="order-good-top">' +
							'<div class="order-good-top-left">' +
							'<span>结算单号：' + datas[i].orderSn + '</span>' +
							'</div>' +
							'</div>' +
							'<div class="mui-table-view-cell  ">' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell">' +
							'<span class="shop-top-title mui-ellipsis ">结算金额：<span class="drawing-num">' + datas[i].money + '</span>元</span>' +
							'</div>' +
							'<div class="mui-table-cell">' +
							'<span class="shop-top-title mui-ellipsis ">剩余金额：<span class="surplus-num">' + datas[i].moneyAfter + '</span>元</span>' +
							'</div>' +
							'</div>' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell txtime">' +
							datas[i].createTime +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>'
					}
				}

			}
		}
		Fun_App.ExAjax("merchantShare/withdrawInfo", send);
	}
	mui.plusReady(function() {
		getjsincomeData(page);
	})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
}(mui))