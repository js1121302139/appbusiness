var dateHeaderBox = document.querySelector("#dateHeader");

var page = 1,total=30,totalPage=total/pageLen;
mui.plusReady(function () {
	var shopType = Fun_App.getdata("shopType");
	if(shopType=='null'){
		document.querySelector(".roomNum").style.display="none";
	}
        var Timer = new Date();
        var nowY = new Date().getFullYear();
        var nowM = new Date().getMonth() + 1;
        var dateObj = {
            "dateYear": nowY,
            "dateMouth": nowM
        };
        refresher.init({ 
			id: "wrapper",
			pullUpAction: Load
		});
			function Load() {
				if(page<totalPage){
					selfBuildActivity();
				}else{
					mui.toast('没有更多数据了!')
				}
				 
				wrapper.refresh(); 
			}
        Calendardate.renderMouthList(dateObj, f2cActivity(dateObj))

        //f2c活动日
        f2cActivity(dateObj);

        function f2cActivity(otherM) {
//      console.log(otherM.dateMouth)
            var datas = null;
            var sendData = {
                config: {
                    "token": Fun_App.getdata("token"),
                    "activityDate": otherM.dateYear + "-" + ((otherM.dateMouth <= 9) ? "0" + otherM.dateMouth : otherM.dateMouth) + "-" + "01"
                },
                fun_Success: function (data) {
                	total = data.total;
                    if (data.data.length != 0) {
                        datas = data.data;
                    } else {
                        return false;
                    }
                }
            }
            Fun_App.ExAjax("merchantActivity/f2cActivity", sendData)
//      console.log(sendData.config.activityDate)
            return datas;
        }
        //上一月下一月的点击事件
        mui("#dateHeader").on("tap", "span", function () {
            var btnName = this.getAttribute("name");
            if (btnName == "pre") {
                if (nowM <= 1) {
                    nowM = 13;
                    Timer.setFullYear(nowY -= 1);
                }
                nowM--;
            } else {
                if (nowM >= 12) {
                    nowM = 0;
                    Timer.setFullYear(nowY += 1);
                }
                nowM++;
            }
            dateObj.dateYear = Timer.getFullYear();
            dateObj.dateMouth = nowM;
            Calendardate.renderMouthList(dateObj, f2cActivity(dateObj))
        })

        //点击打开创建活动
        document.querySelector("#Topactivity").addEventListener("tap", function () {
            Fun_App.openWin('createactivity.html', 'pop-in', ''); //创建活动
        })

        mui('.mui-scroll-wrapper').scroll();
        //响应创建活动后触发的事件
        window.addEventListener("selfBuildActivity", function () {
            selfBuildActivity();
        })
        //自建活动
        selfBuildActivity();

        function selfBuildActivity() {

            var activityListBox = document.querySelector("#activityList");
            var sendData = {
                config: {
                    "token": Fun_App.getdata("token"),
                    "pageIndex": null
                },
                fun_Success: function (data) {
                    activityListBox.innerHTML = "";
                    if (data.data.length != 0) {
                        var datas=data.data;
                        for (var i = 0; i < data.data.length; i++) {
                            var states = { //定义活动的状态
                                "null": "审批中",
                                "1": "进行中",
                                "2": "已结束",
                                "5": "已下架"
                            }; //定义状态
                                activityListBox.innerHTML +=
                                '<li class="ListItem">' +
                                '<div class="activityInfo">' +
                                '<p class="mui-ellipsis">'+datas[i].activityName+' '+data.data[i].activityDate+' 期<span>('+datas[i].discount+'折)</span></p>' +
                                '<p class="mui-ellipsis">'+datas[i].remark+'</p>' +
                                '</div>' +
                                '<div class="activityState '+((datas[i].state==2)?' stateBg2 ':(datas[i].state==5)?' stateBg5 ':"")+' mui-text-right">' +
                                '<p class="runState">审批中</p>' +
                                '<a href="javascript:;" activeityName="'+datas[i].activityName+'" id="'+datas[i].id+'" class="rmActiveityBtn mui-text-center">撤销</a>' +
                                '</div>' +
                                '</li>'
                        }
                    }

                }
            };
            Fun_App.ExAjax("merchantActivity/selfBuildActivity", sendData);
            //活动下架
            function offShelfActivity(rmId) {
                var rmActiveityData = {
                    config: {
                        "token": Fun_App.getdata("token"),
                        "id": rmId
                    },
                    fun_Success: function (data) {
                        if (data.success) {

                        }
                    }
                }
                Fun_App.ExAjax("merchantActivity/offShelfActivity", rmActiveityData);
            }
            mui("#activityList").on("tap", ".rmActiveityBtn", function () {
                mui("#activityList").on("tap", ".rmActiveityBtn", function () {
                    var activityId=this.getAttribute("id"),
                        preNode=this.parentNode,
                        activeityName=this.getAttribute("activeityName");
                    mui.confirm("确定下架" +activeityName+"活动?", "提示", function (e) {
                        if (e.index != 0) {
                            offShelfActivity(activityId);
                            changeClass.addclass(preNode,"stateBg5");
                        }
                    })
                    
                })
            })
        }

        //编辑房间信息
        function editRoomNum(ids, roomNum) {
            var sendData = {
                config: {
                    "token": Fun_App.getdata("token"),
                    "id": ids,//活动id
                    "roomNum": roomNum//预留的房间数
                },
                fun_Success: function (data) {
                    if (data.success) {
                        var countRoomBox = document.querySelector(".countRoom");//总房间数
                        countRoomBox.innerText = '房间数量:' + roomNum;
                    } else {
                        mui.toast(data.message)
                    }
                }
            }
            Fun_App.ExAjax("merchantActivity/updateRoomNum", sendData);
        }
		
        document.querySelector("#editRoom").addEventListener("tap", function () {
            var ids = this.getAttribute("ids");
            mui.prompt('请输入参加房间数量', '', '提示', ['取消', '确认'], function (e) {
                if (e.index == 1) {
                    var val = e.value;
                    if (!isNaN(val)) {
                        editRoomNum(ids, e.value)
                    } else {
                        mui.toast('请输入数字！')
                    }
                }
            }, 'div')
        })
        //tab切换
        mui("#segmentedControl").on("tap", "a", function () {
            var taphref = this.getAttribute("href"); //获取当前的点击的href
            if (taphref == "#item1") {
                selfBuildActivity();
            }
        })

    }
)
