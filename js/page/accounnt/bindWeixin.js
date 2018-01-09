<<<<<<< HEAD
(function(mui) {
	mui(document.body).on('tap', '.codeBtn', function(e) {
		mui(this).button('loading');
		setTimeout(function() {
			mui(this).button('reset');
		}.bind(this), 2000);
	});

	//打开绑定微信成功页面
	Fun_App.OpenPage('#bindSuccess', 'bindsuccess.html', 'pop-in', '');
=======
(function(mui) {
	mui(document.body).on('tap', '.codeBtn', function(e) {
		mui(this).button('loading');
		setTimeout(function() {
			mui(this).button('reset');
		}.bind(this), 2000);
	});

	//打开绑定微信成功页面
	Fun_App.OpenPage('#bindSuccess', 'bindsuccess.html', 'pop-in', '');
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
})(mui);