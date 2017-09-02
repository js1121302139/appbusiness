(function(mui) {
	var msgListBox = document.querySelector("#msgList");
	/*mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '加载...',
				callback: pullupRefresh
			}
		}
	});*/
	mui(".mui-scroll-wrapper").scroll()

	function pullupRefresh() {
		/*++page;
		orders();*/
	}

	//未读消息数组
	var unreadMsg = [];

	function message() {
		var sendData = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(data) {
				msgListBox.innerHTML = "";
				for(var i = 0; i < data.data.length; i++) {
					var datas = data.data[i];
					if(datas.status == 0) {
						//添加未读消息的id
						unreadMsg.push(datas.adminMessageId);
					}
					msgListBox.innerHTML +=
						'<li class="ListItem" msgId="' + datas.adminMessageId + '">' +
						'<p class="msgDate mui-text-center">'+datas.createTime+'</p>' +
						'<div class="msgInfo">' +
						'<div class="msgTop">' +
						'<h1 class="msgTit mui-ellipsis">'+datas.title+' </h1>' +
						'<div class="msg-ico">' +
						'<span class="msgBadge" style="display: '+(datas.status==0?'block':'none')+'"></span>' +
						'</div>' +
						'</div>' +
						'<div class="msgimg">' +
						'<img src="../../img/ico-data02.png" alt="">' +
						'</div>' +
						'<p class="magText mui-ellipsis">福利大放送哦121321福利123132123大放送哦福利大放送哦福利大放送哦</p>' +
						'</div>' +
						'</li>'

				}
			}
		}
		Fun_App.ExAjax("merchant/message", sendData);
	}
	//阅读消息
	function readMessage(adminMessageId) {

		var sendData = {
			config: {
				"token": Fun_App.getdata("token"),
				"adminMessageIds": adminMessageId
			},
			fun_Success: function(data) {
				if(data.success == true) {
					unreadMsg.splice(unreadMsg.indexOf(adminMessageId), 1);
				};
			}
		}
		Fun_App.ExAjax("merchant/read", sendData);
	}
	mui.plusReady(function() {
		var msgState = Fun_App.getdata("msgState"); //是否接受消息
		if(msgState == 'true') {
			message()
		}
		var msgListBox = document.querySelectorAll(".msgList .mui-media")
		var msgNullBox = document.querySelector(".messageNull");
		//单条消息点击更新消息状态
		mui(".mui-table-view-cell").each(function(i, item) {
			item.addEventListener("tap", function() {

				var _thisId = parseInt(this.getAttribute("msgId"));
				if(unreadMsg.indexOf(_thisId) != -1) readMessage([_thisId]);
				this.querySelector(".mui-badge").style.display = "none";
			})
		})
		if(msgListBox.length == 0) {
			msgNullBox.style.display = "block";
			document.querySelector('.msgListNull').style.background = "url(../../img/work-msg.png) center center no-repeat"
		}
		document.querySelector("#TopMsg").addEventListener("tap", function() {
			if(unreadMsg.length > 0) {
				readMessage(unreadMsg);
			}
		})
	})

}(mui))