(function(mui) {
	var yyaccountBoxBox = document.querySelector("#yyaccount"), //总营业收入
		SettlementMoneyBox = document.querySelector("#SettlementMoney"), //已结算
		OutstandingMoneyBox = document.querySelector("#OutstandingMoney"), //可结算
		yyaccountListBox = document.querySelector("#yyaccountList"), //收入列表
        totalPage = 0,
        applyMoney= 0;

	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '加载...',
				callback: pullupRefresh
			}
		}
	});
	mui(".mui-scroll-wrapper").scroll();
	var page = 1;

	function pullupRefresh() {
		++page;
		this.endPullupToRefresh((page > totalPage));
		getincomeDataLsit(page)
	}
	Fun_App.OpenPage("#myDetailed", "jsdentail.html", "pop-in", "");
	document.querySelector("#myMoney").addEventListener("tap",function () {
        Fun_App.openWin("applysettlement.html", "pop-in", {"Withdrawals":applyMoney});
    })


	function getincomeDataLsit(pageNum) {
		var senddata = {
			config: {
				"token": Fun_App.getdata("token"),
				"pageIndex": pageNum
			},
			fun_Success: function(data) {
				var data = {
                    "success": true,
                    "rows": [],
                    "data": [
                        {
                            "createTime": "2017-06-08",
                            "money": 250
                        },
                        {
                            "createTime": "2017-06-08",
                            "money": 550
                        },
                        {
                            "createTime": "2017-06-18",
                            "money": 450
                        }
                    ],
                    "message": null,
                    "total": 2,
                    "backUrl": null,
                    "footer": []
                };
				totalPage = Math.ceil(data.total / pageLen)

				if(data.success) {
					var merchantBalanceLogsList = data.data;
					for(var i = 0; i < merchantBalanceLogsList.length; i++) {
						yyaccountListBox.innerHTML +=
                    '<li class="wrapperListItem">'+
                            '<p class="ordersDate">'+merchantBalanceLogsList[i].createTime+'</p>'+
                        '<p class="ordersMoney mui-right">￥'+merchantBalanceLogsList[i].money+'</p>'+
                        '</li>'
					}
				}

			}
		}
		Fun_App.ExAjax("merchantBalance/moreInfo", senddata);
	}

	function getincomeData() {
		var senddata = {
			config: {
				"token": Fun_App.getdata("token"),
			},
			fun_Success: function(data) {
				var data={
                    "success": true,
                    "rows": [],
                    "data": {
                        "token": null,
                        "deviceId": null,
                        "merchantId": null,
                        "source": null,
                        "merchantBalanceLogsMoneyEveryDay": [
                            {
                                "createTime": "2017-06-15",
                                "money": 200
                            }
                        ],
                        "balance": 10,//可结算金额
                        "saleMoney": 100,//总营业收入
                        "settled": 90//已结算金额
                    },
                    "message": null,
                    "total": 0,
                    "backUrl": null,
                    "footer": []
                };
				if(data.success) {
					yyaccountBoxBox.innerText = data.data.saleMoney; //总营业收入
					SettlementMoneyBox.innerText = data.data.settled; //已结算
					OutstandingMoneyBox.innerText = applyMoney = data.data.balance; //可结算
					Fun_App.storagedata("OutstandingMoney", data.data.balance);
				}

			}
		}
		Fun_App.ExAjax("merchantBalance/info", senddata);
	}

	mui.plusReady(function() {
		getincomeData()
		getincomeDataLsit(1)
	})

}(mui))

mui('.mui-scroll-wrapper').scroll();