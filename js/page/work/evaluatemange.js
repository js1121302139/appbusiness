/*
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
		this.endPullupToRefresh((page > totalPage))
		eval(page);
		return;
	}

	function eval(pageNum) {

		var evaluateListBox = document.querySelector("#evaluateList"), //評論列表
			evaluateContentBox = document.querySelector("#evaluateContent"), //评论总数
			evaluateNumBox = document.querySelector("#evaluateNum"); //平均得分
		var sendData = {
			config: {
				"token": Fun_App.getdata("token"),
				"pageIndex": pageNum
			},
			fun_Success: function(data) {

				var merchantComments = data.data.merchantComments;
				totalPage = Math.ceil(data.total / pageLen)

				evaluateContentBox.innerText = data.data.totalNum;
				evaluateNumBox.innerText = data.data.averageGrade;
				for(var i = 0; i < merchantComments.length; i++) {
					evaluateListBox.innerHTML += '<li class="">' +
						'<div class="mui-table-view-cell">' +
						'<div class="mui-table">' +
						'<div class="evaluate-left mui-table-cell mui-col-xs-3">' +
						'<img src="../../images/user-img.png" />' +
						'</div>' +
						'<div class="evaluate-right mui-table-cell mui-col-xs-9">' +
						'<div class="atar_Show">' +
						'<p tip="' + merchantComments[i].grade + '"></p>' +
						'</div>' +
						'<div class="right-info evaluate-personinfo mui-ellipsis">' +
						merchantComments[i].userName + ' ' + merchantComments[i].orderSn +
						'</div>' +
						'<div class="right-info mui-ellipsis">' + merchantComments[i].content + '</div>' +
						'<div class="right-info">' +
						'<span class="right-info-time">' + merchantComments[i].createTime + '</span>' +
						'</div></div></div></div></li>';
				}
			}
		}
		console.log(pageNum)
		Fun_App.ExAjax("merchantPerson/comment", sendData);
	}
	mui.plusReady(function() {
		eval(page);
		//星星图标显示

	})
}(mui))*/


function eval(pageNum) {
    var evaluateListBox = document.querySelector("#evaluateList"), //評論列表
        evaluateContentBox = document.querySelector("#evaluateContent"), //评论总数
        evaluateNumBox = document.querySelector("#evaluateNum"); //平均得分
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
                    "pageIndex": 1,
                    "merchantComments": [
                        {
                            "id": 17,
                            "userId": 267,
                            "userName": "赛亚人",
                            "grade": 4,
                            "content": "发个",
                            "sellerAttitude": null,
                            "createTime": "2017-05-10 10:08:08",
                            "merchantId": 58,
                            "orderSn": "16121218083534437",
                            "replyId": null,
                            "replyName": null,
                            "replyContent": null,
                            "adminId": null,
                            "description": 0,
                            "serviceAttitude": 0,
                            "state": 2,
                            "headImg": ""
                        },
                        {
                            "id": 18,
                            "userId": 267,
                            "userName": "赛亚人",
                            "grade": 3,
                            "content": "好的好的好大的",
                            "sellerAttitude": null,
                            "createTime": "2017-05-10 10:12:14",
                            "merchantId": 58,
                            "orderSn": "16121218083534437",
                            "replyId": null,
                            "replyName": null,
                            "replyContent": null,
                            "adminId": null,
                            "description": 0,
                            "serviceAttitude": 0,
                            "state": 2,
                            "headImg": ""
                        },
                        {
                            "id": 19,
                            "userId": 267,
                            "userName": "赛亚人",
                            "grade": 4,
                            "content": "公众账号早知道好多个等哈",
                            "sellerAttitude": null,
                            "createTime": "2017-05-10 10:12:30",
                            "merchantId": 58,
                            "orderSn": "16121218083534437",
                            "replyId": null,
                            "replyName": null,
                            "replyContent": null,
                            "adminId": null,
                            "description": 0,
                            "serviceAttitude": 0,
                            "state": 2,
                            "headImg": ""
                        },
                        {
                            "id": 20,
                            "userId": 267,
                            "userName": "赛亚人",//用户名
                            "grade": 4,//评论等级
                            "content": "的方法烦人",//评论内容
                            "sellerAttitude": null,
                            "createTime": "2017-05-10 11:35:52",//时间
                            "merchantId": 58,
                            "orderSn": "16121218083534437",
                            "replyId": null,
                            "replyName": null,
                            "replyContent": null,
                            "adminId": null,
                            "description": 0,
                            "serviceAttitude": 0,
                            "state": 2,
                            "headImg": ""//用户头像
                        }
                    ],
                    "averageGrade": 3.8,//平局评分
                    "totalNum": 4//总条数
                },
                "message": null,
                "total": 0,
                "backUrl": null,
                "footer": []
            };
            var merchantComments = data.data.merchantComments;
            totalPage = Math.ceil(data.total / pageLen);

            evaluateContentBox.innerText = "评论数:" + data.data.totalNum + "条";
            evaluateNumBox.innerText = data.data.averageGrade;
            for (var i = 0; i < merchantComments.length; i++) {
                evaluateListBox.innerHTML +=
                    '<li class="wrapperListItem">' +
                    '<div class="ListItemTop">' +
                    '<div class="userImg">' +
                    '<img src="../../img/help_icon.png" alt="">' +
                    '</div>' +
                    '<div class="userInfo">' +
                    '<p class="userName">'+merchantComments[i].userName+'</p>' +
                    '<div class="evaluateStar">' +
                    '<div class="evaluateStars" tip="'+merchantComments[i].grade+'">' +
                    '</div>' +
                    '<p class="evaluateStarsLine"></p>' +
                    '<p class="evaluateStarsLine"></p>' +
                    '<p class="evaluateStarsLine"></p>' +
                    '<p class="evaluateStarsLine"></p>' +
                    '<p class="evaluateStarsLine"></p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="evaluateDate">' +
                    merchantComments[i].createTime
                     + 
                    '</div>' +
                    '</div>' +
                    '<div class="evaluateMsg">' +
                    merchantComments[i].content +
                    '</div>' +
                    '</li>'
                ;
            }
            mui(".evaluateStar .evaluateStars").each(function (i, item) {
                var tip = Math.round(document.querySelectorAll(".evaluateStar .evaluateStars")[i].getAttribute("tip"));
                for (var j = 0; j < tip; j++) {
                    document.querySelectorAll(".evaluateStar .evaluateStars")[i].innerHTML += '<p class="evaluateStarsitem"></p>';
                }
            });
        }
    }
    Fun_App.ExAjax("merchantPerson/comment", sendData);
}

mui.ready(function () {
    eval(1);
})