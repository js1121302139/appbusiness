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
	var page = 1,
		totalPage = 0;

	function pullupRefresh() {
		++page;
		this.endPullupToRefresh((page > totalPage));
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
				data={
                    "success": true,
                    "rows": [],
                    "data": [
                        {
                            "id": 3,
                            "merchantId": 1,
                            "merchantName": "哦哦哦",
                            "moneyBefore": 50,
                            "moneyAfter": 80,
                            "money": 60,
                            "createTime": "2017-05-10 11:42:32",
                            "optType": 4,
                            "optId": null,
                            "optName": null,
                            "optDes": null,
                            "orderSn": "789654123"
                        }
                    ],
                    "message": null,
                    "total": 0,
                    "backUrl": null,
                    "footer": []
                };
				if(data.success) {
					var jsListBox = document.querySelector("#jsList"); //结算明细列表
					var datas = data.data;
					for(var i = 0; i < datas.length; i++) {
						jsListBox.innerHTML +=
                            '<li class="wrapperListItem">'+
                            '<div class="orderLeft">'+
                            '<div class="orderCode">'+
                            '结算单号:' + datas[i].orderSn + ''+
                            '</div>'+
                            '<div class="orderDate">'
                            +datas[i].createTime+
                            '</div>'+
                            '</div>'+
                            '<div class="orderRight">'+
                            '<div class=" withdrawals">'+
                            '结算:'+datas[i].money+
                            '</div>'+
                            '<div class="balance">'+
                            '余额:'+datas[i].moneyAfter+
                            '</div>'+
                            '</div>'+
                            '</li>'
					}
				}

			}
		}
		Fun_App.ExAjax("merchantExtend/withdrawInfo", send);
	}
	mui.plusReady(function() {
        getjsincomeData(page);
	})
}(mui))