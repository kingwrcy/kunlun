/* 
 * @Author: JerryWang
 * @Date:   2015-07-15 15:12:34
 * @Last Modified by:   JerryWang
 * @Last Modified time: 2015-07-18 18:05:45
 */


~ function() {
	var start = 0;
	var el = $("#scroller-content");
	var myScroll;
	var tmpl = '<% for(var i = 0 ;i <data.length ;i++){ %><li  vid="<%= data[i].id %>" >' +
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
		'<a href="#"><div class="fav"><span class="icon"></span><span class="upnum"><%= data[i].upnum %></span></div></a>' +
		'<a href="#"><div class="share"><span class="icon"></span><span class="sharenum"><%= data[i].sharenum %></span></div></a>' +
		'</div>' +
		'</li><% }%>';

	function render(limit) {
		var compiled = _.template(tmpl);
		$.getJSON('http://k3.limijiaoyin.com/api/third/cards/',{start:start,limit:limit},function(data){
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

	// $("#wrapper").on('click',".fav .icon",function(e){

	// });

	$("#cropReset").click(function(){
		$('#originalimg').cropper('reset');
	});

	$('#scroller-content').on('click','li',function(e){

		if(e.target.tagName === 'SPAN' && e.target.classList.contains('icon')){
			var fav = $(e.target).next();
			var id = $(e.target).parents("li").attr('vid');
			e.stopPropagation();
			$.post('/api/third/up/',{id:id},function(){
				fav.text(function(index,text){
					return parseInt(text)+1;
				});
			})
			return;
		}

		var index = $(this).index();
		if(index > 0){
			$('.enterindex').hide();
			$("#detail").show();
			$('#detail #detailimg').attr('src',$(this).find('.figure img').attr('src'));
			$('#detail .signature .name').text($(this).find('.signature .name').text());
			$('#detail .textarea .text').text($(this).find('.signature').attr('desc'));
			$('#detail .sharenum').text($(this).find('.sharenum').text());
			$('#detail .upnum').text($(this).find('.upnum').text());
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
		putb64(b64);
	});

	function putb64(pic){
	    var url = "http://up.qiniu.com/putb64/-1";
	    var xhr = new XMLHttpRequest();
	    var token = null;

	    $.get('http://k3.limijiaoyin.com/api/third/token/',function(data){
	    	if(data.code == 0){
	    		xhr.onreadystatechange=function(){
			        if (xhr.readyState==4){
			        	$.post('http://k3.limijiaoyin.com/api/third/cards/',{
			        		img:'http://7xkb2g.com1.z0.glb.clouddn.com/'+JSON.parse(xhr.responseText).hash,
			        		desc:$("#chooseTemplate textarea").val(),
			        		template:$("#chooseTemplate .name").text() === '叶小萌' ? 1 : 0	
			        	},function(data){
			        		if(data.code == 0){
			        			alert('上传成功!');
			        		}
			        	})
			        }
			    }
			    xhr.open("POST", url, true); 
			    xhr.setRequestHeader("Content-Type", "image/jpeg"); 
			    xhr.setRequestHeader("Authorization", "UpToken "+data.token); 
			    xhr.send(pic.split(',')[1]);
	    	}
	    })
	    
	}  


	
}();