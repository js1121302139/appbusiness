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