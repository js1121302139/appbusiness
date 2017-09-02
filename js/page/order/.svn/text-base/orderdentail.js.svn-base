var page = 1,
    totalPage = 0;
var selectData = null;
var orderListBox = document.querySelector("#orderList");
(function (mui) {

    mui.plusReady(function () {
        selectData = Fun_App.getextrasdata();
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
            orders(page);
            this.endPullupToRefresh(page > totalPage)
        }

        function orders(pageNum) {
            var thisTime = Fun_App.getextrasdata(); //传递过来的时间
            var sendData = {
                config: {
                    "token": Fun_App.getdata("token"),
                    "statisTime": selectData,
                    "pageIndex": pageNum
                },
                fun_Success: function (data) {
                    var data = {
                        "success": true,
                        "rows": [],
                        "data": [
                            {
                                "token": null,
                                "deviceId": null,
                                "merchantId": 1,
                                "source": null,
                                "orderSn": "17051915354806671",//订单号
                                "createTime": "2017-05-25 15:35:48",
                                "memberName": "赛亚人",//用户名
                                "moneyTotal": 333333,//消费金额
                                "integral": 1,//兑呗抵扣
                                "actualTotalIncome": 333332,//营业收入
                                "scalingAmount": 0//佣金
                            },
                            {
                                "token": null,
                                "deviceId": null,
                                "merchantId": 1,
                                "source": null,
                                "orderSn": "16121217061873551",
                                "createTime": "2017-05-25 14:45:45",
                                "memberName": "张三",
                                "moneyTotal": 10,
                                "integral": 0,
                                "actualTotalIncome": 10,
                                "scalingAmount": 0
                            }
                        ],
                        "message": null,
                        "total": 0,
                        "backUrl": null,
                        "footer": []
                    }
                    var ordersList = data.data;
                    if (data.success) {
                        totalPage = Math.ceil(data.total / pageLen)

                        for (var i = 0; i < data.data.length; i++) {
                            orderListBox.innerHTML +=
                                /*'<div class="order-good-item">' +
                                '<div class="order-good-top">' +
                                '<span class="order-good-top-left">订单号：<span>' + ordersList[i].orderSn + '</span></span>' +
                                '<span class="order-good-top-right">' + ordersList[i].createTime + '</span>' +
                                '</div>' +
                                '<div class="order-good-bottom mui-clearfix">' +
                                '<div class="order-good-bottom-left">' +
                                '<img src="../../images/user-img.png" />' +
                                '<div class="left-name">' + ordersList[i].memberName + '</div>' +
                                '</div>' +
                                '<div class="order-good-bottom-right">' +
                                '<div>' +
                                '<span class="drakgrayColor">消费金额：</span>' +
                                '<span class="OrangeColor">' + ordersList[i].moneyTotal + '</span>' +
                                '</div>' +
                                '<div>' +
                                '<span class="drakgrayColor">营业收入：</span>' +
                                '<span class="OrangeColor">' + ordersList[i].actualTotalIncome + '</span>' +
                                '</div>' +
                                '<div>' +
                                '<span class="drakgrayColor">兑贝抵扣：</span>' +
                                '<span class="OrangeColor">' + ordersList[i].integral + '</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>'*/
                                '<li class="wrapperListItem">' +
                                '<div class="ListItem-Tit">' +
                                '<div class="itemTit-orderNum">' +
                                '订单号: ' +ordersList[i].orderSn +
                                '</div>' +
                                '<div class="itemTit-orderDate mui-text-right ">' +
                                ordersList[i].createTime.split(" ")+
                                '</div>' +
                                '</div>' +
                                '<div class="ListItem-Info">' +
                                '<div class="order-People">' +
                                '<div class="order-PeopleImg"><img class="order-PeopleImg" src="../../img/aboutydw_icon.png" alt=""></div>' +
                                '<div class="order-PeopleInfo mui-ellipsis">'+ ordersList[i].memberName +'</div>' +
                                '</div>' +
                                '<div class="order-Income">' +
                                '<p>消费金额:<span> '+ordersList[i].moneyTotal+'</span></p>' +
                                '<p>营业收入:<span>'+ordersList[i].actualTotalIncome+'</span></p>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        }

                    }
                }
            }
            Fun_App.ExAjax("merchantOrders/detailInfo", sendData)
        }

        orders()
    })
}(mui))