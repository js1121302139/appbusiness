<<<<<<< HEAD
var Vue = new Vue({
		el:"#helpCenter",
		data:function(){
			return{
				list:[]
			}
		},
		created:function(){
			var _this =this;
			mui.plusReady(function(){
				_this.getlist(function(resData){
					_this.list=resData.data;
				});
			})
		},
		methods:{
			// 获取帮助列表
			getlist:function(callBack){
				var sendData={
					config:{
						token:Fun_App.getdata("token")
					},
					fun_Success:function(data){
						// 回调
						callBack(data);
					}
				}
				Fun_App.ExAjax("merchantPerson/helpCenter",sendData);
			}
		}
	})
=======
var Vue = new Vue({
		el:"#helpCenter",
		data:function(){
			return{
				list:[]
			}
		},
		created:function(){
			var _this =this;
			mui.plusReady(function(){
				_this.getlist(function(resData){
					_this.list=resData.data;
				});
			})
		},
		methods:{
			// 获取帮助列表
			getlist:function(callBack){
				var sendData={
					config:{
						token:Fun_App.getdata("token")
					},
					fun_Success:function(data){
						// 回调
						callBack(data);
					}
				}
				Fun_App.ExAjax("merchantPerson/helpCenter",sendData);
			}
		}
	})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
