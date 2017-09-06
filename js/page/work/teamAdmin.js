mui.init()
var teamListBox = document.querySelector("#teamList");
var addPage = document.querySelector("#addSonAccNum");
//打开添加子账号页面
addPage.addEventListener("tap", function() {
	Fun_App.openWin("addSonAccount.html", "pop-in")
})
mui(".mui-scroll-wrapper").scroll();

/*mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			contentrefresh: '加载...',
			callback: pullupRefresh
		}
	}
});*/

/*function pullupRefresh() {
	this.endPullupToRefresh(true)
}*/
var accountIds = [];

function getTeamList() {
	var sendData = {
		config: {
			"token": Fun_App.getdata("token"),
		},
		fun_Success: function(data) {
			teamListBox.innerHTML = "";
			if(data.data.length == 0) {
				//document.querySelector(".accountNull").style.display = "block";
			} else {
				//document.querySelector(".accountNull").style.display = "none";
			}
			if(data.success) {
				for(var i = 0; i < data.data.length; i++) {
					var datas = data.data[i]
					accountIds.push({
						'name': datas.name, //账户姓名
						"phone": datas.phone, //账户的手机
						"jobName": datas.jobName, //账户的角色名字
						"id": datas.id, //账户的id
						"groupId": datas.groupId, //团队的id
						"jobId": datas.jobId //角色id
					})
					teamListBox.innerHTML +=
						'<li class="mui-table-view-cell mui-row">' +
						'<div class="mui-pull-left memberLeft">' +
						'<div class="membersHeadImg mui-left">' +
						'<img src="' + Fun_App.getdata("shopLogo") + '" alt="" />' +
						'</div>' +
						'<div class="membersInfo mui-pull-left ">' +
						'<p class="mui-ellipsis"><span>' + datas.jobName + '</span></p>' +
						'<p class="mui-ellipsis">用户名: <span>' + datas.name + '</span></p>' +
						'<p class="mui-ellipsis">电话号码：<span>' + datas.phone + '</span></p>' +
						'	</div>' +
						'</div>' +
						'<div class="mui-pull-right memberRight">' +
						'<p class="membersMoney mui-text-right">￥' +
						datas.shareMoneyTotal + '</p>' +
						'<a href="javascript:;" type="button" class="mui-btn btnJY ' + ((datas.state == 1) ? "" : "activeBtn") + '" state="' + datas.state + '" teamsId="' + datas.id + '" sId="btnJY">' + ((datas.state == 1) ? ("禁用") : "启用") + '</a>' +
						'<a href="javascript:;" type="button" class="mui-btn mui-pull-right btnEd" sId="btnEd">编辑</a>' +
						'</div>' +
						'</li>'
				}
			}
		}
	}
	Fun_App.ExAjax("merchantAccount/list", sendData)
}

function updateState(id, state) {
	var isstate;
	var sendData = {
		config: {
			"token": Fun_App.getdata("token"),
			"id": id,
			"state": (state == 1) ? 2 : 1
		},
		fun_Success: function(data) {
			isstate = data.success;
			if(data.success) {
				mui.toast(data.message)
			} else {
				mui.toast(data.message)
			}
		}
	}
	Fun_App.ExAjax("merchantAccount/updateState", sendData)
	return isstate;
}
mui.plusReady(function() {
	window.addEventListener('getTeamList', function() {
		getTeamList();
		btnTap();
	});
	getTeamList();
	var membersInfoObj = {
		jsName: null,
		teamName: null,
		phoneNum: null,
		name: null
	}
	var jobCodeName = Fun_App.getdata("jobCode"); //角色名称
	btnTap();

	function btnTap() {
		//启用和禁用
		mui(".btnJY").each(function(i, item) {
			if(jobCode === jobCode.STAFF) {
				return false;
			}
			item.addEventListener("tap", function() {
				var state = this.getAttribute("state"),
					teamsId = this.getAttribute("teamsId");
				if(updateState(teamsId, state)) {
					thisTxt = this.innerText;
					(thisTxt == "禁用") ? this.innerText = "启用": this.innerText = "禁用";
					(thisTxt == "禁用") ? this.setAttribute("class", "mui-btn btnJY btn activeBtn"): this.setAttribute("class", "mui-btn btnJY btn");
				}
			})
		})

		//编辑
		mui(".btnEd").each(function(i, item) {
			item.addEventListener("tap", function() {
				Fun_App.openWin("addSonAccount.html", "pop-in", accountIds[i]);
			})
		})
	}

})