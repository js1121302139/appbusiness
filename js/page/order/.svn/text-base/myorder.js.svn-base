/*var $$ = jQuery.noConflict();
//定义拉取所有的数据
var jsonpro = [];
var dataindex = 0;
var totalPage = 0;
(function($) {
	mui.plusReady(function() {
		//设置页码
		var page = 1;
		//下拉刷新
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});

		//滚动区域
		$(".mui-scroll-wrapper").scroll({
			bounce: true, //滚动条是否有弹力默认是true
			indicators: false, //是否显示滚动条,默认是true
		});

		document.querySelector(".mui-scroll").addEventListener("scroll", function(e) {

		})
		//上拉刷新方法
		function pullupRefresh() {
			++page;
			this.endPullupToRefresh((page > totalPage));
			getMyorderdata(page);
		}

		mui('body').on('shown', '.mui-popover', function(e) {
			//console.log('shown', e.detail.id);//detail为当前popover元素
		});
		mui('body').on('hidden', '.mui-popover', function(e) {
			//console.log('hidden', e.detail.id);//detail为当前popover元素
		});

		var orderNumBox = document.querySelector("#orderNum"), //订单数
			orderTotalBox = document.querySelector("#orderTotal"), //订单额
			totalMoneyBox = document.querySelector("#totalMoney"), //总收入
			allOrderListBox = document.querySelector("#allOrderList"); //收入列表

		//获取当前点击的详细收益信息弹窗
		mui("#allOrderList").on("tap", ".bottomPopover", function() {
			var index = this.getAttribute("dataindex");

			for(i in jsonpro[(index)]) {
				var docs = jsonpro[index][i];
				document.querySelector(i).innerText = docs;
			}
		})
		//点击查看详情
		mui("#allOrderList").on("tap", ".timeBox", function() {
			var dates = this.getAttribute("datetime"); //获取当前的日期
			Fun_App.openWin("orderdentail.html", "pop-in", dates);
		})

		$$(".tc-bottom").click(function() {
			$$(".mui-popover").hide();
			$$(".mui-backdrop").hide();
		});
		$$(".close-img").click(function() {
			$$(".mui-popover").hide();
			$$(".mui-backdrop").hide();
		});

		//获取我的订单数据
		getMyorderdata();


	})
})(mui);

/*
			function showPro(index) {
				console.log(JSON.stringify(jsonpro));
				for(i in jsonpro[(index)]) {
					var docs = jsonpro[index][i];
					document.querySelector(i).innerText = docs;
				}
			}*/

var orderNumBox = document.querySelector("#orderNum"), //订单数
    orderTotalBox = document.querySelector("#orderTotal"), //订单额
    totalMoneyBox = document.querySelector("#totalMoney"), //总收入
    allOrderListBox = document.querySelector("#allOrderList"); //收入列表
    var jsonpro=[];
function getMyorderdata(pageNum) {
    var sendData = {
        config: {
            "token": Fun_App.getdata("token"),
            "pageIndex": pageNum
        },
        fun_Success: function (data) {
            var data = {
                "success": true,
                "rows": [],
                "data": {
                    "token": null,
                    "deviceId": null,
                    "merchantId": null,
                    "source": null,
                    "ordersTotal": 50, //订单总数
                    "ordersTotalMoney": 300, //订单总额
                    "actualTotalIncome": 260, //总实际收入
                    "ordersEntityStatisList": [{
                        "id": 1,
                        "merchantId": 59,
                        "moneyTotal": 100, //订单总额
                        "integral": 10, //兑呗
                        "scalingAmount": 10, //佣金
                        "actualIncome": 90, //实际收入
                        "totalNum": 20, //订单数
                        "statisTime": "2017-06-07 00:00:00", //统计时间
                        "createTime": "2017-06-08 11:55:56"
                    },
                        {
                            "id": 2,
                            "merchantId": 59,
                            "moneyTotal": 200,
                            "integral": 30,
                            "scalingAmount": 30,
                            "actualIncome": 170,
                            "totalNum": 30,
                            "statisTime": "2017-06-06 00:00:00",
                            "createTime": "2017-06-07 13:40:21"
                        }
                    ],
                    "pageIndex": 1 //当前页
                },
                "message": null,
                "total": 0,
                "backUrl": null,
                "footer": []
            }
            totalPage = Math.ceil(data.total / pageLen);

            orderNumBox.innerText = data.data.ordersTotal;
            orderTotalBox.innerText = data.data.ordersTotalMoney;
            totalMoneyBox.innerText = ((data.data.actualTotalIncome == null) ? " 0" : data.data.actualTotalIncome);

            var ordersEntityStatisList = data.data.ordersEntityStatisList;
            for (var i = 0; i < ordersEntityStatisList.length; i++) {
                jsonpro.push({
                    ".orderDate": ordersEntityStatisList[i].createTime.split(" ")[0],
                    ".orderMoney": ordersEntityStatisList[i].moneyTotal,
                    ".Commission": ordersEntityStatisList[i].scalingAmount, //佣金
                    ".duibei": ordersEntityStatisList[i].integral,
                    ".income": ordersEntityStatisList[i].actualIncome
                });
                allOrderListBox.innerHTML +=
                    '<li class="wrapperListItem">' +
                    '<div class="ordersItemTit">' +  
                    '<div class="ordersDate">' +
                    ordersEntityStatisList[i].statisTime.split(" ")[0]
                     +
                    '</div>' +
                    '<div class="question mui-text-center">' +
                    "" +
                    '</div>' +
                    '<div class="seeInfo mui-text-right" datetime="'+ordersEntityStatisList[i].statisTime.split(" ")[0]+'">' +
                    '查看明细' +
                    '</div>' +
                    '</div>' +
                    '<div class="ordersInfo ">' +
                    '<div class="ordersCount mui-text-left">' +
                    '<p>订单数</p>' +
                    '<p>'+ordersEntityStatisList[i].totalNum+'</p>' +
                    '</div>' +
                    '<div class="ordersMoney mui-text-center">' +
                    '<p>订单总额</p>' +
                    '<p>'+ordersEntityStatisList[i].moneyTotal+'</p>' +
                    '</div>' +
                    '<div class="ordersIncome mui-text-right">' +
                    '<p>营业收入</p>' +
                    '<p>'+ordersEntityStatisList[i].actualIncome+'</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
            }
        }
    };
    Fun_App.ExAjax("merchantOrders/statistics", sendData);
}

mui.plusReady(function () {
    getMyorderdata(1);
    mui("#allOrderList").on("tap", ".seeInfo", function() {
        var dates = this.getAttribute("datetime"); //获取当前的日期
        Fun_App.openWin("orderdentail.html", "pop-in", dates);
    })
}) 