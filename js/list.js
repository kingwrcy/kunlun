/* 
 * @Author: JerryWang
 * @Date:   2015-07-15 15:12:34
 * @Last Modified by:   JerryWang
 * @Last Modified time: 2015-07-22 13:24:07
 */


~ function() {
	var start = 0;
	var el = $("#scroller-content");
	var myScroll;
	var tmpl = '<% for(var i = 0 ;i <data.length ;i++){ %><li  vid="<%= data[i].id %>" >' +
		' <a href="#">' +
		'<div class="picshow <%= data[i].template == "1" ? "model2" : "model1"  %>">' +
		' <figure class="figure">' +
		'<img src="<%= data[i].img %>">' +
		'<div class="beauty">' +
		'<span class="logo"></span>' +
		'<span class="text"></span>' +
		'</div>' +
		'</figure>' +
		//'<div class="signature posr" desc="><%= data[i].desc %>"><span class="name"><%= data[i].template == "1" ? "小宇宙" : "叶小萌"  %></span><div class="line"></div></div>' +
		'</div>' +
		'</a>' +
		'<div class="actions">' +
		'<a href="#"><div class="fav"><span class="icon favicon"></span><span class="upnum"><%= data[i].upuser %></span></div></a>' +
		'<a href="#"><div class="share"><span class="icon shareicon"></span><span class="sharenum"><%= data[i].sharenum %></span></div></a>' +
		'</div>' +
		'</li><% }%>';

	function render(limit) {
		var compiled = _.template(tmpl);
		$.getJSON('/api/third/cards/',{start:start,limit:limit},function(data){
			if(data.cards.length == 0){
				// $("#scroller-pullUp").hide();
				return;
			}
			start += data.cards.length;
			var html = compiled({
				data: data.cards
			});
			$("#scroller-content ul").append(html);
			var len = $("#scroller-content li").length;
			var last = (len % 3) || 3;
			var lis = el.find('li').toArray().reverse();
			for (var i = 0; i < last; i++) {
				$(lis[i]).addClass('noborder');
			}
			if($("#scroller-content li").length >=9){
				$("#scroller-pullUp").show();
			}else{
				$("#scroller-pullUp").hide();
			}
			myScroll.refresh();
		})
		
	}
	loaded();
	render(8);

	function loaded() {

		myScroll = new IScroll('#wrapper', {
			probeType: 3,
			mouseWheel: true,
			click:true
		});

		myScroll.on("scroll", function() {
			var y = this.y;
			if (y >= 0 && y <= 10) {
				$("#back").fadeOut();
			} else if (y <= -250) {
				$("#back").fadeIn();
			}
		});

		myScroll.on("slideUp", function() {
			if (this.maxScrollY - this.y > 40) {
				// upIcon.removeClass("reverse_icon")
				$("#scroller-content li").slice(-3).removeClass('noborder');
				render(9);
				// $("#back").show();
			}
		});
	}

	$("#backtotop").click(function() {
		myScroll.scrollTo(0, 0, 1000);
		window.setTimeout(function() {
			$("#back").fadeOut();
		}, 1200);

	});

	var swiperWrapper = $(".swiper-wrapper");
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = 22 || today.getDate();
	var imgList = {
		22:['../images/7-22/1.jpg','../images/7-22/2.jpg'],
		23:['../images/7-23/1.jpg','../images/7-23/2.jpg'],
		24:['../images/7-24/1.jpg'],
		25:['../images/7-25/1.jpg'],
		26:['../images/7-26/1.jpg'],
		27:['../images/7-27/1.jpg','../images/7-27/2.jpg','../images/7-27/3.jpg'],
		28:['../images/7-28/1.jpg','../images/7-28/2.jpg','../images/7-28/3.jpg','../images/7-28/4.jpg']
	};
	if(year == '2015' && month == '7'){
		swiperWrapper.html('');
		for(var l in imgList){
			if(l <= day){
				for(var a in imgList[l]){
					swiperWrapper.append('<div class="swiper-slide"><img src="'+imgList[l][a]+'"></div>');
				}
			}
		}

		if(day == 22){
			$(".progrs").addClass('two');
		}else if (day == 23){
			$(".progrs").addClass('four');
		}else if (day == 24){
			$(".progrs").addClass('six');
		}else if (day == 25){
			$(".progrs").addClass('seven');
		}else if (day == 26){
			$(".progrs").addClass('eight');
		}else if (day == 27){
			$(".progrs").addClass('nine');
		}else if (day == 28){
			$(".progrs").addClass('ten');
		}else if (day == 29){
			$(".progrs").addClass('eleven');
		}

	}



	var mySwiper = new Swiper('.swiper-container', {
		speed: 400,
		spaceBetween: 100,
		autoplay: 3000
		// pagination:'.swiper-pagination'
	});

	



	


	$.getJSON('http://slide.cm/wechat/config?url=http://kunlun.limijiaoyin.com/third/html/list.html',function(data){
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


		var storage = window.localStorage;
		wx.ready(function(){
            wx.onMenuShareAppMessage({
                 title: "一起去挑战6000，一起去升级人生～",
                 desc: '我参与了昆仑山雪山矿泉水的晒风景活动，分享就有奖，你也快来参加吧！',
                 link: 'http://kunlun.limijiaoyin.com/third/html/list.html',
                 imgUrl: "http://kunlun.limijiaoyin.com/third/images/weixin_logo.jpg",
                 trigger: function (res) {
                 },
                 success: function (res) {
                   if(storage && !storage.getItem('share')){
						storage.setItem('share',true);
						window.location.href = 'http://gsactivity.diditaxi.com.cn/gulfstream/activity/v2/giftpackage/index?channel=a7645b68bd7807011f9f7272b11dd1f3';
					}
                 }
             });

             wx.onMenuShareTimeline({
                 title: '一起去挑战6000，一起去升级人生～',
                 link: 'http://kunlun.limijiaoyin.com/third/html/list.html',
                 imgUrl: "http://kunlun.limijiaoyin.com/third/images/weixin_logo.jpg",
                 trigger: function (res) {
                 },
                 success: function (res) {
                    if(storage && !storage.getItem('share')){
						storage.setItem('share',true);
						window.location.href = 'http://gsactivity.diditaxi.com.cn/gulfstream/activity/v2/giftpackage/index?channel=a7645b68bd7807011f9f7272b11dd1f3';
					}
                 }
             });
         });

	});


	$('#scroller-content').on('click','li',function(e){

		if(e.target.tagName === 'SPAN' && e.target.classList.contains('favicon')){
			var fav = $(e.target).next();
			var id = $(e.target).parents("li").attr('vid');
			e.stopPropagation();
			$.post('/api/third/up/',{id:id},function(){
				fav.text(function(index,text){
					return parseInt(text)+1;
				});
			})
			return;
		}else if(e.target.tagName === 'SPAN' && e.target.classList.contains('shareicon')){

		}

		if($(this).hasClass('add'))return;

		var id = $(this).attr('vid');
		window.location.href = 'detail.html?id='+id;
	});


	

	


	
}();