<<<<<<< HEAD
var Vue = new Vue({
				el: "#cashsuccess",
				data: function() {
					return {
						pageData: {
							allMoney: 0,
							money: 0,
						    url:null
						},
						isParty:false,
						bankCode:'***0000'
						//bankCode:"***1321"
						
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						//接受传递的参数
						var getData = Fun_App.getextrasdata();
						console.log(JSON.stringify(getData))
						_this.isParty = getData.type==6;
						_this.pageData.allMoney = getData.allMoney;//所有的钱
						_this.pageData.money = getData.money;//结算成功的钱
						_this.bankCode = getData.account[0].bankCode;//银行卡账户 
						_this.pageData.url = getData.url;//查询的接口地址
						plus.webview.currentWebview().opener().close();
					})
				},
				methods: {
					open:function(url){
						var _this = this ;
						mui.plusReady(function(){
							Fun_App.openWin("./jsdentail.html",'pop-in',_this.pageData.url);
						})
					},
					close:function(){
						mui.plusReady(function(){
							plus.webview.close("./cashsuccess.html","slide-out-right",250);
						})
					}
				},
				filters: {
					replacex: function(ss) {
						return ss.replace(/\*/g,"");
					}
				}
=======
var Vue = new Vue({
				el: "#cashsuccess",
				data: function() {
					return {
						pageData: {
							allMoney: 0,
							money: 0,
						    url:null
						},
						bankCode:'***0000'
						//bankCode:"***1321"
						
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						//接受传递的参数
						var getData = Fun_App.getextrasdata();
						console.log(JSON.stringify(getData))
						_this.pageData.allMoney = getData.allMoney;//所有的钱
						_this.pageData.money = getData.money;//结算成功的钱
						_this.bankCode = getData.account[0].bankCode;//银行卡账户 
						_this.pageData.url = getData.url;//查询的接口地址
						plus.webview.close('./applysettlement.html', "slide-out-left", 500);
					})
				},
				methods: {
					open:function(url){
						var _this = this ;
						mui.plusReady(function(){
							Fun_App.openWin("./jsdentail.html",'pop-in',_this.pageData.url);
						})
						setTimeout(function(){
							/*plus.webview.close("./cashsuccess.html","slide-out-left",500);*/
						},10)
					},
					close:function(){
						mui.plusReady(function(){
							plus.webview.close("./cashsuccess.html","slide-out-right",250);
						})
					}
				},
				filters: {
					replacex: function(ss) {
						return ss.replace(/\*/g,"");
					}
				}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
			})