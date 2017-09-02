
function sendMsg(userId, msgText) {
	console.log(userId);
	var shopData = {
		config: {
			"token": Fun_App.getdata("token"),
			"memberIds": memberIds,
			"content": msgText
		},
		fun_Success: function(data) {
			
		}
	}
	Fun_App.ExAjax("merchantPerson/sendMessage", shopData);
}

function getUserList(pageNum) {
	var shopData = {
		config: {
			"token": Fun_App.getdata("token"),
			"pageIndex": pageNum
		},
		fun_Success: function(data) {
			totalPage = Math.ceil(data.total / pageLen)
			mui('#pullrefresh').pullRefresh()
			var datas = data.data;
			if(data.success) {
				userNumBox.innerText = data.total;
				for(var i = 0; i < datas.length; i++) {
					//var userPhone = datas[i].phone;
					userListBox.innerHTML +=
						'<li class="mui-table-view-cell userBox" id="' + datas[i].memberId + '">' +
						'<div class="mui-input-row mui-checkbox mui-left">' +
						'<label></label>' +
						'<input type="checkbox" class="userChecks">' +
						'</div>' +
						'<img class="mui-media-object mui-pull-left" width="41" height="41" src="../../img/work-head.png">' +
						'<div class="mui-media-body">' +
						'<p>用户名:锤子(ID:' + datas[i].memberId + ') <span class="userMoney mui-pull-right">￥' + datas[i].money + '</span></p>' +
						'<p>等级:' + datas[i].grade + '</p>' +
						'<p>关注时间:' + datas[i].focusOnTime + '</p><span class="sendMsg mui-text-center" userId="' + datas[i].memberId + '">发送消息</span>' +
						'</div>' +
						'</li>';
					//userPhoneNumber.push(userPhone);
				}

			}
		}
	}
	Fun_App.ExAjax("merchantPerson/myUsers", shopData)
}

function isCheck(Els) {
	for(var i = 0; i < Els.length; i++) {
		if(!Els[i].checked) {
			return false
		}
	}
}

var userListBox = document.querySelector("#userList"),
	userNumBox = document.querySelector("#userNum"),
	userBox = document.querySelectorAll(".userBox"),
	checkAllBox = document.querySelector("#Allcheck"),
	memberIds = [];
(function(mui) {
	mui.plusReady(function() {
		var page = 1,
			totalPage = 0,
			userNum = 0,
			userId = [];
		getUserList();
		refresher.init({
			id: "wrapper",
			/*pullDownAction: Refresh,*/
			pullUpAction: Load
		});

		function Load() {
			page++;
			getUserList(page);
			wrapper.refresh();
		}
		mui(".userBox").each(function(i, item) {
			item.addEventListener("tap", function() {
				var checkedBox = this.querySelector("input"); //获取当前的checkBox
				var userId = parseInt(this.getAttribute("id"));
				var isUserId = memberIds.indexOf(userId); //是否存在这个用户Id
				isUserId == -1 ? memberIds.push(userId) : memberIds.splice(isUserId, 1); //对用户Id数组操作
				checkedBox.checked ? checkedBox.checked = false : checkedBox.checked = true; //设置当前的状态
				isCheck(document.querySelectorAll(".userBox input")) != false ? checkAllBox.checked = true : checkAllBox.checked = false; //是否全部选中
			})
		})

		mui(".selectAll").on("tap", ".Allcheck", function() {
			var _thisCheckState = !document.querySelector("#Allcheck").checked; //此处获取全选的状态(!转换状态)
			memberIds = [];
			mui(".userBox input").each(function(i, item) {
				item.checked = _thisCheckState;
				memberIds.push(parseInt(document.querySelectorAll("li")[i].getAttribute("id")));
			})
		})

	})
	
	
	function textBox(userId){
		mui.prompt('', '请输入文字', '发送消息', ['取消', '确认'], function(e) {
			if(e.index == 1&&memberIds.length!=0) {
				var msgTxt = document.querySelector("textarea").value;
				msgTxt.length <= 50 ? sendMsg(userId, msgTxt) : mui.toast('超长字符！')
			}
		}, 'div')
	}
	mui("#userList").on("tap", ".sendMsg", function() {
		var userId = [parseInt(this.getAttribute("userId"))];
		textBox(userId);
	})
	mui(".mui-bar").on("tap", ".senAllMsg", function() {
		textBox(memberIds);
	})
}(mui))