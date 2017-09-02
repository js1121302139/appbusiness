mui.init();

var Saverelase = document.querySelector(".saverelase");

mui.plusReady(function() {});

mui('.mui-scroll-wrapper').scroll();
mui('body').on('shown', '.mui-popover', function(e) {
	//console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
	//console.log('hidden', e.detail.id);//detail为当前popover元素
});
Saverelase.addEventListener('tap', function() {
	mui.alert('您确定要使用该角色名称吗？', '提示', function() {

	});
});