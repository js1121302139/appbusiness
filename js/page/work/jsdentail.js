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

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    ++page;
    this.endPullupToRefresh((page > totalPage))
    getincomeData(page);
    return;
}

function getincomeData(pageNum) {

    var senddata = {
        config: {
            "token": Fun_App.getdata("token"),
            "pageIndex": pageNum
        },
        fun_Success: function (data) {
            var data = {
                "success": true,
                "rows": [],
                "data": [
                    {
                        "id": 1,
                        "merchantId": 1,
                        "merchantName": "wrerfewre",
                        "moneyBefore": 100,
                        "moneyAfter": 50,
                        "money": 50,
                        "createTime": "2017-05-16 14:46:07",
                        "optType": 2,
                        "optId": null,
                        "optName": null,
                        "optDes": null,
                        "orderSn": "14242545"
                    }, {
                        "id": 1,
                        "merchantId": 1,
                        "merchantName": "wrerfewre",
                        "moneyBefore": 100,
                        "moneyAfter": 50,
                        "money": 50,
                        "createTime": "2017-05-16 14:46:07",
                        "optType": 2,
                        "optId": null,
                        "optName": null,
                        "optDes": null,
                        "orderSn": "14242545"
                    },
                    {
                        "id": 1,
                        "merchantId": 1,
                        "merchantName": "wrerfewre",
                        "moneyBefore": 100,
                        "moneyAfter": 50,
                        "money": 50,
                        "createTime": "2017-05-17 14:46:07",
                        "optType": 2,
                        "optId": null,
                        "optName": null,
                        "optDes": null,
                        "orderSn": "14242545"
                    }
                ],
                "message": null,
                "total": 0,
                "backUrl": null,
                "footer": []
            };
            totalPage = Math.ceil(data.total / pageLen)

            if (data.success) {

                var jsListBox = document.querySelector("#jsList"); //结算明细列表
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    jsListBox.innerHTML += /*'<div class="order-good-item">' +
                        '<div class="order-good-top">' +
                        '<div class="order-good-top-left">' +
                        '<span>结算单号：' + dataList[i].orderSn + '</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="mui-table-view-cell  ">' +
                        '<div class="mui-table">' +
                        '<div class="mui-table-cell">' +
                        '<span class="shop-top-title mui-ellipsis ">结算金额：<span class="drawing-num">' + dataList[i].money + '</span>元</span>' +
                        '</div>' +
                        '<div class="mui-table-cell">' +
                        '<span class="shop-top-title mui-ellipsis ">剩余金额：<span class="surplus-num">' + dataList[i].moneyAfter + '</span>元</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="mui-table">' +
                        '<div class="mui-table-cell txtime">' +
                        dataList[i].createTime +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';*/
                        '<li class="wrapperListItem">' +
                        '<div class="orderLeft">' +
                        '<div class="orderCode">' +
                        '结算单号:'+ dataList[i].orderSn +
                        '</div>' +
                        '<div class="orderDate">' +
                        dataList[i].createTime +
                        '</div>' +
                        '</div>' +
                        '<div class="orderRight">' +
                        '<div class=" withdrawals">' +
                        '结算:'+dataList[i].money +
                        '</div>' +
                        '<div class="balance">' +
                        '余额:'+dataList[i].moneyAfter +
                        '</div>' +
                        '</div>' +
                        '</li>'
                }
            }

        }
    }
    Fun_App.ExAjax("merchantBalance/withdrawInfo", senddata);
}

mui.plusReady(function () {
    getincomeData(page)
})