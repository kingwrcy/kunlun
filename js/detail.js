/* 
* @Author: JerryWang
* @Date:   2015-07-18 23:36:35
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-21 14:54:51
*/

$(function(){
	var href = window.location.href;
	var id = null;
	if(href.match(/id=(\d+)/)){
		id = href.match(/id=(\d+)/)[1];

		if(href.indexOf('preview=true')>0){
			$('.actions').hide();
			$('#iwantupload').hide();
			$('#iwantshare').show();
		}else{
			$('#iwantupload').show();
			$('#iwantshare').hide();
		}

		$.get('/api/third/cards/'+id+'/',function(data){

			
			$('#detail #detailimg').attr('src',data.card[0].img);
			// $('#detail .signature .name').text(data.card[0].template == '1' ? '叶小萌' : '小宇宙');
			$('#detail .textarea #desc').text(data.card[0].desc);
			$('#detail .textarea #whoami').text(data.card[0].owner);
			$('#detail .picshow').addClass(data.card[0].template == '1' ? 'model1' : 'model2');
			$('#detail .upnum').text(data.card[0].upnum);
			$('#detail .sharenum').text(data.card[0].sharenum);

		});
	}

	$("#share").click(function(){
		$(this).hide();
	});

	$("#sharenum,#iwantshare").click(function(){
		$("#share").show();
	});

	$(".fav .icon").click(function(){
		$.post('/api/third/up/',{id:id},function(){
			$('#detail .upnum').text(function(index,text){
				return (parseInt(text) || 0) + 1;
			})
		})
	});

	$.post('/api/third/visit/',{id:id},function(){});


	$.getJSON('http://slide.cm/wechat/config?url=http://kunlun.limijiaoyin.com/third/html/detail.html?id='+id,function(data){
		wx.config({
			debug: false,
			appId: 'wx82a5d90838b461ba',
			timestamp: data.config.timestamp,
			nonceStr: data.config.nonceStr,
			signature: data.config.signature,
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			]
		});

		function share(){
			$.post('/api/third/share/',{id:id},function(){});
		}



		wx.ready(function(){
            wx.onMenuShareAppMessage({
                 title: "一起去挑战6000，一起去升级人生～",
                 desc: '我参与了昆仑山雪山矿泉水的晒风景活动，分享就有奖，你也快来参加吧！',
                 link: 'http://kunlun.limijiaoyin.com/third/html/detail.html?id='+id,
                 imgUrl: "http://kunlun.limijiaoyin.com/third/images/weixin_logo.jpg",
                 trigger: function (res) {
                 },
                 success: function (res) {
                    share();
                 }
             });

             wx.onMenuShareTimeline({
                 title: '一起去挑战6000，一起去升级人生～',
                 link: 'http://kunlun.limijiaoyin.com/third/html/detail.html?id='+id,
                 imgUrl: "http://kunlun.limijiaoyin.com/third/images/weixin_logo.jpg",
                 trigger: function (res) {
                 },
                 success: function (res) {
                    share();
                 }
             });
         });
	});
})


