<<<<<<< HEAD
/*var PageView = {
	pages: [],
	styles: null,
	showPage: function() {
		var self = plus.webview.currentWebview();
		var bottomDoc = document.querySelectorAll('.pageitem');
		for(var i = 0; i < this.pages.length; i++) {
			bottomDoc[i].setAttribute("href", this.pages[i]);
			var sub = plus.webview.create(this.pages[i], this.pages[i], this.styles);
			if(i > 0) {
				sub.hide();
			}
			self.append(sub);
		}
		mui(".pageitem").each(function(i, item) {
			item.addEventListener("tap", function() {
				var navId = this.getAttribute("id");
				if(navId == "account") {
					plus.navigator.setStatusBarStyle("light");
				} else {
					plus.navigator.setStatusBarStyle("dark");
				}
				var navIdName = this.getAttribute("href");
				for(var i = 0; i < bottomDoc.length; i++) {
					var botHref = bottomDoc[i].getAttribute("href");
					if(botHref != navIdName) {
						plus.webview.hide(botHref);
					}
				}
				plus.webview.show(navIdName, "fade-in", 250);
			})
		})
	}
}
mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'popGesture': 'none'
	})
	mui.back = function() {
		plus.nativeUI.confirm("是否确认退出?", function(e) {
			var all = plus.webview.all();
			//如果是確認則關閉全部窗口
			if(e.index == 1) {
				for(var i = 1; i < all.length; i++) {
					plus.webview.close(all[i].id);
				}
			}
		}, "提示", ["取消", '确认'])
	};
	var allWebview = plus.webview.all();
	PageView.pages = ["page/work/home.html", "page/order/myorder.html", "page/account/myaccount.html"];
	PageView.styles = {
		top: "0px",
		bottom: "50px"
	};
	PageView.showPage();
})*/
var pageitemBoxs=document.querySelectorAll(".pageitem");
// 获取达人信息
var merchantType = Fun_App.getdata("merchantType");
// 如果是达人则隐藏订单功能
if(merchantType==0){
	pageitemBoxs[1].style.display='none';
}

var pages = ["page/work/home.html", "page/order/myorder.html", "page/account/myaccount.html"],
	styles = {
		top: "0px",
		bottom: "50px"
	};


mui.plusReady(function(){
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'popGesture': 'none'
	})
	mui.back = function() {
		plus.nativeUI.confirm("是否确认退出?", function(e) {
			var all = plus.webview.all();
			//如果是確認則關閉全部窗口
			if(e.index == 1) {
				for(var i = 1; i < all.length; i++) {
					plus.webview.close(all[i].id);
				}
			}
		}, "提示", ["取消", '确认'])
	};
	mui("#index").on('tap', '.pageitem', function() {
	var thisIndex = this.getAttribute('index');
	showpage(thisIndex)
})
showpage(0)
})
function showpage(index) {
	var viewId = plus.webview.getWebviewById(pages[index]);
	if(index==2){
		plus.navigator.setStatusBarStyle("dark")
	}else{
		plus.navigator.setStatusBarStyle("light")
	}
	if(viewId == null || viewId == '' || viewId == 'null') {
		var ws = plus.webview.currentWebview();
		var sub = plus.webview.create(pages[index], pages[index], styles);
		ws.append(sub);
	} else {
		pages.forEach(function(item) {
			plus.webview.hide(item);
		})
		plus.webview.show(pages[index], "fade-in", 250);
	}
}

for(var i=0;i<pageitemBoxs.length;i++){
	pageitemBoxs[i].setAttribute('index',i)
}
=======
var PageView = {
	pages: [],
	styles: null,
	showPage: function() {
		var self = plus.webview.currentWebview();
		var bottomDoc = document.querySelectorAll('.pageitem');
		for(var i = 0; i < this.pages.length; i++) {
			bottomDoc[i].setAttribute("href", this.pages[i]);
			var sub = plus.webview.create(this.pages[i], this.pages[i], this.styles);
			if(i > 0) {
				sub.hide();
			}
			self.append(sub);
		}
		mui(".pageitem").each(function(i, item) {
			item.addEventListener("tap", function() {
				var navId = this.getAttribute("id");
				if(navId == "account") {
					plus.navigator.setStatusBarStyle("light");
				} else {
					plus.navigator.setStatusBarStyle("dark");
				}
				var navIdName = this.getAttribute("href");
				for(var i = 0; i < bottomDoc.length; i++) {
					var botHref = bottomDoc[i].getAttribute("href");
					if(botHref != navIdName) {
						plus.webview.hide(botHref);
					}
				}
				plus.webview.show(navIdName, "fade-in", 250);
			})
		})
	}
}
mui.plusReady(function() {
	var wv = plus.webview.currentWebview();
	wv.setStyle({
		'popGesture': 'none'
	})
	mui.back = function() {
		plus.nativeUI.confirm("是否确认退出?", function(e) {
			var all = plus.webview.all();
			//如果是確認則關閉全部窗口
			if(e.index == 1) {
				for(var i = 1; i < all.length; i++) {
					plus.webview.close(all[i].id);
				}
			}
		}, "提示", ["取消", '确认'])
	};
	var allWebview = plus.webview.all();
	PageView.pages = ["page/work/home.html", "page/order/myorder.html", "page/account/myaccount.html"];
	PageView.styles = {
		top: "0px",
		bottom: "50px"
	};
	PageView.showPage();
})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
