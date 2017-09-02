mui.init()
var cashBtnBOx = document.querySelector("#cashBtn"),
    cashRegBox = document.querySelector("#cashReg"),
    countMoneyBox = document.querySelector("#countMoney"),
    promotionAwardBox = document.querySelector("#promotionAward"),
    page = 1,
    totalPage = 0;
mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        up: {
            contentrefresh: '正在加载...',
            callback: pullupRefresh
        }
    }
});

function pullupRefresh() {
    ++page;
    this.endPullupToRefresh((page > totalPage))
    getpromotionAwardList(page)
    return;
}

mui.plusReady(function () {
    getpromotionAwardList(1)
})

function getpromotionAwardList(pageNum) {
    var sendData = {
        config: {
            "token": Fun_App.getdata("token"),
            "pageIndex": pageNum
        },
        fun_Success: function (data) {
            var data =
                {
                    "success": true,
                    "rows": [],
                    "data": {
                        "token": null,
                        "deviceId": null,
                        "merchantId": null,
                        "source": null,
                        "merchantUserId": null,
                        "extendMoneyTotal": 0,
                        "extendBalance": 0,
                        "merchantExtendLogs": [

                            {
                                "id": 6,
                                "merchantId": 1,
                                "merchantName": "几个房间号",
                                "moneyBefore": 420,
                                "moneyAfter": 40,
                                "money": 100.12,
                                "createTime": "2017-05-10 17:45:58",
                                "optType": 5,
                                "optId": null,
                                "optName": null,
                                "optDes": null,
                                "orderSn": "111111"
                            },
                            {
                                "id": 6,
                                "merchantId": 1,
                                "merchantName": "几个房间号",
                                "moneyBefore": 420,
                                "moneyAfter": 40,
                                "money": 100.12,
                                "createTime": "2017-05-10 17:45:58",
                                "optType": 5,
                                "optId": null,
                                "optName": null,
                                "optDes": null,
                                "orderSn": "111111"
                            },
                            {
                                "id": 6,
                                "merchantId": 1,
                                "merchantName": "几个房间号",
                                "moneyBefore": 420,
                                "moneyAfter": 40,
                                "money": 100.12,
                                "createTime": "2017-05-10 17:45:58",
                                "optType": 5,
                                "optId": null,
                                "optName": null,
                                "optDes": null,
                                "orderSn": "111111"
                            }

                        ],
                        "pageIndex": 1
                    },
                    "message": null,
                    "total": 0,
                    "backUrl": null,
                    "footer": []
                }
            totalPage = Math.ceil(data.total / pageLen);
            if (data.success) {
                countMoneyBox.innerText = data.data.extendMoneyTotal;
                for (var i = 0; i < data.data.merchantExtendLogs.length; i++) {
                    var datas = data.data.merchantExtendLogs[i];
                    promotionAwardBox.innerHTML +=
                        '<li class="wrapperListItem">' +
                        '<p class="ordersDate">' + datas.createTime + '</p>' +
                        '<p class="ordersMoney mui-right">￥' + datas.money + '</p>' +
                        '</li>'
                }
            }
        }
    }
    Fun_App.ExAjax("merchantExtend/info", sendData)
}

/*能否结算*/
function isWithdraw() {
    var sendData = {
        config: {
            "token": Fun_App.getdata("token")
        },
        fun_Success: function (data) {
            return data.data
        }
    }
    Fun_App.ExAjax("merchantExtend/isWithdraw", sendData)
}

cashRegBox.addEventListener("tap", function () {
    Fun_App.openWin("promotiondentail.html", "pop-in", "")
})
cashBtnBOx.addEventListener("tap", function () {
    var isW = isWithdraw();
    if (!isW) {
        mui.alert("推广奖励结算期限为1个月，从推广第一个会员时间开始计数，谢谢配合~", "", "知道了");
    } else {

    }
})