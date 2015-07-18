/* 
 * @Author: JerryWang
 * @Date:   2015-07-15 15:12:34
 * @Last Modified by:   JerryWang
 * @Last Modified time: 2015-07-17 19:46:00
 */


~ function() {
	var json = {
		"code": 0,
		"cards": [{
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 100,
			"share": 300,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 334,
			"share": 441,
			"template": 2
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 22,
			"share": 3334,
			"template": 2
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 433,
			"share": 443,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 100,
			"share": 300,
			"template": 2
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 134,
			"share": 34,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 4234,
			"share": 784,
			"template": 2
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 43245,
			"share": 545,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 67,
			"share": 4343,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 43,
			"share": 321,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 43,
			"share": 321,
			"template": 1
		}, {
			"id": "1",
			"img": "http://lorempixel.com/100/106/",
			"desc": "用户描述",
			"fav": 43,
			"share": 321,
			"template": 1
		}]
	};
	var el = $("#scroller-content");
	var myScroll;
	var tmpl = '<% for(var i = 0 ;i <data.length ;i++){ %><li>' +
		' <a href="#">' +
		'<div class="picshow <%= data[i].template == "1" ? "model1" : "model2"  %>">' +
		' <figure class="figure">' +
		'<img src="<%= data[i].img %>">' +
		'<div class="beauty">' +
		'<span class="logo"></span>' +
		'<span class="text"></span>' +
		'</div>' +
		'</figure>' +
		'<div class="signature posr" desc="><%= data[i].desc %>"><span class="name"><%= data[i].template == "1" ? "小宇宙" : "叶小萌"  %></span><div class="line"></div></div>' +
		'</div>' +
		'</a>' +
		'<div class="actions">' +
		'<a href="#"><div class="fav"><span class="icon"></span><%= data[i].fav %></div></a>' +
		'<a href="#"><div class="share"><span class="icon"></span><%= data[i].share %></div></a>' +
		'</div>' +
		'</li><% }%>';

	function render(data) {
		var compiled = _.template(tmpl);
		var html = compiled({
			data: data
		});
		$("#scroller-content ul").append(html);
		var len = $("#scroller-content li").length;
		var last = (len % 3) || 3;
		var lis = el.find('li').toArray().reverse();
		for (var i = 0; i < last; i++) {
			$(lis[i]).addClass('noborder');
		}
	}

	render(json.cards);

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
				render(json.cards);
				myScroll.refresh();
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
	var day = 28 || today.getDate();
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
	}



	var mySwiper = new Swiper('.swiper-container', {
		speed: 400,
		spaceBetween: 100,
		autoplay: 3000
		// pagination:'.swiper-pagination'
	});

	// var img = null, filereader ,orientation ,cropArea =  $(".area"),left,top,imgRate,initScale = 1,originalWidth = 0,originalHeight = 0;
	$(".uploadimg,#detail #uploadimageBtn").on('change',function(){
		var file = this.files[0];
		var options = {
			canvas: true
		};
		var id = $(this).attr('id');
		// Use the "JavaScript Load Image" functionality to parse the file data
	    loadImage.parseMetaData(file, function(data) {

	        // Get the correct orientation setting from the EXIF Data
	        if (data.exif) {
	            options.orientation = data.exif.get('Orientation');
	        }

	        // Load the image from disk and inject it into the DOM with the correct orientation
	        loadImage(
	            file,
	            function(canvas) {
	            	if(id === 'uploadimageBtn'){
			    		$(".figure figure").html('');
			    	}
	                var imgDataURL = canvas.toDataURL();
	                var $img = $('<img>').attr('src', imgDataURL).attr('id','originalimg');
	                $(".figure figure").append($img);
	                $(".enterindex").hide();
	                $("#detail").hide();
			    	$("#cropimg").show();	
			    	if(id === 'uploadimageBtn'){
			    		$img.cropper('destory');
			    	}
	                // Initiate cropper once the orientation-adjusted image is in the DOM
	                $img.cropper({
						aspectRatio: 1 / 1,
						autoCropArea: 0.8,
						strict: false,
						guides: false,
						highlight: false,
						dragCrop: false,
						guides:true,
						// rotatable:true,
						cropBoxMovable: true
						// cropBoxResizable: true
					});
					// var data = 
	            },
	            options
	        );
	    });
	});

	$("#cropOk").click(function(){
		var croppedImage = $('#originalimg').cropper('getCroppedCanvas');
		var b64data = croppedImage.toDataURL("image/jpeg");
		$("#cropimg").hide();
		$("#chooseTemplate").show();
		$("#previewImage").attr('src',b64data);
	});

	$(".seleectmodel #model1").click(function(){
		$('#chooseTemplate .picshow').removeClass('model2').addClass('model1');
		$('#chooseTemplate .signature .name').text('小宇宙');
	});

	$(".seleectmodel #model2").click(function(){
		$('#chooseTemplate .picshow').removeClass('model1').addClass('model2');
		$('#chooseTemplate .signature .name').text('叶小萌');
	});

	$("#cropReset").click(function(){
		$('#originalimg').cropper('reset');
	});

	$('#scroller-content').on('click','li',function(){
		var index = $(this).index();
		if(index > 0){
			$('.enterindex').hide();
			$("#detail").show();
			$('#detail #detailimg').attr('src',$(this).find('.figure img').attr('src'));
			$('#detail .signature .name').text($(this).find('.signature .name').text());
			$('#detail .textarea .text').text($(this).find('.signature').attr('desc'));
		}
	});


	$("#okbtn").click(function(){
		var b64 = $("#previewImage").attr('src');
		// console.log(b64);
		$("#chooseTemplate").hide();
		$("#detail").show();
		$('#detail #detailimg').attr('src',b64);
		$('#detail .signature .name').text($('#chooseTemplate .signature .name').text());
		$('#detail .textarea .text').text($('#chooseTemplate textarea').val());
		// putb64(b64);
	});

	function putb64(pic){
	    var url = "http://up.qiniu.com/putb64/-1";
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange=function(){
	        if (xhr.readyState==4){
	            console.log(xhr.responseText);
	        }
	    }
	    xhr.open("POST", url, true); 
	    xhr.setRequestHeader("Content-Type", "image/jpeg"); 
	    xhr.setRequestHeader("Authorization", "UpToken UNIFT3Dh3-4HYCR-OjoSADE8wPdu56O69AnQGr_j:Q1zusXQv4_rF4It-21LzL9P5Ntg=:eyJzY29wZSI6ImRvdGFmYW5zIiwiZGVhZGxpbmUiOjE0MzY4MDYyNTF9"); 
	    xhr.send(pic.split(',')[1]);
	}  


	loaded();
}();