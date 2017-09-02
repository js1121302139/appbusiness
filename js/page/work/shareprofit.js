var Icodata = ["consumeTotalIncome", "spreadTotalIncome", "shopTotalIncome"], //数据中的收益字段
    IcoType = { //收益类型
        "consumeIncome": { //消费奖励分页
            type: 1, //收益类型
            page: 1
        },
        "spreadIncome": { //推广收益分页
            type: 3, //收益类型
            page: 1

        },
        "shopIncome": { //店铺奖励分页
            type: 2, //收益类型
            page: 1

        }

    },
    nowIcoTypeId = 1; //现在的收益类型Id
nowDoms = document.querySelector(IcoType.consumeIncome.Doms); //即将填充的Dom
var page = 1,
    totalPage = 0; //页码
var moneyData = null; //可结算的金额
var myMoneyBox = document.querySelector("#myMoney");
var goubeiaccountBox = document.querySelector("#goubeiaccount"), //总营业收入
    minegoubeionlineBox = document.querySelector("#mine-goubei-online"), //已结算
    minegoubeiofflineBox = document.querySelector("#mine-goubei-offline"), //可结算
    ljsyCountBox = document.querySelector("#ljsyCount"), //累计收益
    yyaccountListBox = document.querySelector("#yyaccountList"); //收入列表

mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        up: {
            contentrefresh: '加载...',
            callback: pullupRefresh
        }
    }
});

function pullupRefresh() {
    ++page;
    getincomeData(page, nowIcoTypeId);
    this.endPullupToRefresh((page > totalPage));
}

//打开页面
Fun_App.OpenPage("#myDetailed", "jsdentail.html", "pop-in", "");
Fun_App.OpenPage("#everyMoth", "monthlyEarnings.html", "pop-in", "");
myMoneyBox.addEventListener('tap', function () {
    Fun_App.openWin("applysettlement.html", "pop-in", moneyData);
})
//打开页面结束
//ajax请求
function getheaderData(index) {
    var ljtype = Icodata[(index - 1)];
    var sendData = {
        config: {
            "token": Fun_App.getdata("token")
        },
        fun_Success: function (data) {
            goubeiaccountBox.innerText = data.data.shareMoney;
            minegoubeionlineBox.innerText = moneyData = data.data.shareMoney - data.data.shareBalance;
            minegoubeiofflineBox.innerText = data.data.shareBalance;
            ljsyCountBox.innerText = data.data[ljtype];
        }
    }
    Fun_App.ExAjax("merchantShare/info", sendData);
}

function getincomeData(pageNum, typeID) {
    var sendData = {
        config: {
            "token": Fun_App.getdata("token"),
            "pageIndex": pageNum,
            "type": typeID
        },
        fun_Success: function (data) {
            var data = {
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
                    },
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
                    },
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
            if (data.success) {
                totalPage = Math.ceil(data.total / pageLen);
                for (var i = 0; i < data.data.length; i++) {
                    datas = data.data[i];
                    yyaccountListBox.innerHTML +=
                        '<li class="ListItem">' +
                        '<div class="ListItemTop">' +
                        '<p class="itemInfo">' + datas.merchantName + '</p>' +
                        '<p class="itemMoney">￥' + datas.money + '</p>' +
                        '</div>' +
                        '<p class="ListItemDate">' +datas.createTime+'</p>' +

                        '</li>'
                }
            }
        }
    }
    Fun_App.ExAjax("merchantShare/moreInfo", sendData);
}

mui.plusReady(function () {
    getincomeData(page, 1); //加载时默认加载
    getheaderData(1); //加载时默认加载
    /*mui(".myIcoList").on("tap", ".countTab", function() { //收益栏点击方法
        page = 1;//点击后重置页码
        mui('#pullrefresh').pullRefresh().refresh(true);
        yyaccountListBox.innerHTML = "";
        var tapId = this.getAttribute("id");
        nowIcoTypeId = IcoType[tapId].type;
        nowDoms = document.querySelector(IcoType[tapId].Doms); //获取当前要填充的列表
        getincomeData(page, nowIcoTypeId);//列表的数据
        getheaderData(nowIcoTypeId)//头部和累计收益的数据
    })*/
})