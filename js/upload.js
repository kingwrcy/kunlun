/* 
* @Author: JerryWang
* @Date:   2015-07-13 21:02:18
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-15 15:02:53
*/

~function(){
	var uploadBtn = document.getElementById('upload_file'),
		area = document.getElementById('upload_area'),
		areaParent = $(area).parent(),
		okBtn = $("#ok"),
		x,y,start = false,
		left,top,
		MAXSIZE = 3 * 1024 *1024,
		imgUri = null,
		originalWidth,originalHeight,
		Orientation,
		initScale = 1,
		tmpCanvas = document.createElement('canvas'),
		mc = new Hammer(area,{
			drag_block_horizontal: true,
	        drag_block_vertical: true,
	        drag_min_distance: 0
		}),
		transform = {
	        translate: { x: 0, y: 0 },
	        scale: 1,
	        angle: 0,
	        rx: 0,
	        ry: 0,
	        rz: 0
	    };

	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	mc.get('pinch').set({ enable: true });
	uploadBtn.addEventListener('change',function(e){
		var file = e.target.files[0];
		var type = file.type;
		var size = file.size;
		var f = new FileReader();
		var uploadArea = document.getElementById('upload_area');
		if (!file.type.match('image.*')){
			alert('请选择图片类型文件');
			return;
		} 
		f.onload = function(theFile){
			var img = new Image();
			img.onload = function(){
				originalWidth = this.width;
				originalHeight = this.height;

				EXIF.getData(img, function() {
			        Orientation = EXIF.getTag(this,'Orientation');
			    });

			}
			img.src = f.result;
			img.id  = "aaa";
			imgUri = f.result;


			
			upload_area.appendChild(img);
			$(".result").text(img.width+','+img.height);
		}
		f.readAsDataURL(file);
	});

	mc.on('pinch',function(e){
		// if(e.type == 'pinchstart') {
	 //        initScale = transform.scale || 1;
	 //    }
		// var maxWidth = areaParent.find('img').width() * e.scale;
		// maxWidth = Math.min(originalWidth,Math.max(areaParent.width(),maxWidth));
		// $(".result").text(e.);
		transform.scale = initScale * e.scale;
		var tmpCtx = tmpCanvas.getContext('2d');
		var img = $("#upload_area img")[0];
		tmpCanvas.width = originalWidth * e.scale;
		tmpCanvas.height = originalHeight * e.scale;
		var mpImg = new MegaPixImage(img);
		mpImg.render(tmpCanvas,{width:tmpCanvas.width,height:tmpCanvas.height,orientation:Orientation});
		$(".result").text('width:'+tmpCanvas.width+',height:'+tmpCanvas.height+',Orientation:'+Orientation);
		img.src = tmpCanvas.toDataURL("image/jpeg");
		// updateElement();
	})

	mc.on('panstart',function(e){
		e.preventDefault();
		start = true;
		left = transform.translate.x;
		top = transform.translate.y;
	});

	mc.on('pan',function(e){
		e.preventDefault();

		if(start){
			var move_left = e.deltaX + left;
			var move_top = e.deltaY + top;
			// var img = areaParent.find('img');
			// move_left = Math.min(Math.max(-(img.width() - $("#upload_area").width()),move_left),0);
			// move_top = Math.min(Math.max(-(img.height() - $("#upload_area").height()),move_top),0);
			transform.translate.x = move_left;
			transform.translate.y = move_top;
			updateElement();
		}
	});

	function updateElement(){
		var img = $("#upload_area img")[0];
		var value = [
	        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
	        'scale(' + transform.scale + ', ' + transform.scale + ')',
	        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
	    ];
		value = value.join(" ");
		// $(".result").text(value);
	    img.style.webkitTransform = value;
	    img.style.mozTransform = value;
	    img.style.transform = value;
	}

	// mc.on('panend',function(e){
	// 	e.preventDefault();
	// 	if(start){
	// 		start = false;
	// 	}
	// })

	okBtn.click(function(e){

		e.preventDefault();
		e.stopPropagation();
		var area_left = $(area).position().left;
		var area_top = $(area).position().top;
		var canvas = $("#canva");
		var height = $(area).height();
		var width = $(area).width();
		var img = $(area).find('img');
		var rateX = img.width() / originalWidth;
		var rateY = img.height() /originalHeight;
		canvas.attr({
			width:width+'px',
			height:height+'px'
		});
		var ctx = canvas[0].getContext('2d');
		$(".result").text(Orientation);
		ctx.clearRect(0, 0, width, height);
		
		ctx.drawImage(img[0],Math.abs(transform.translate.x),Math.abs(transform.translate.y),$(area).width(),$(area).height(),0,0,$(area).width(),$(area).height());
		var data = canvas[0].toDataURL('image/jpeg');
		putb64(data);
		$(".result").text('Orientation:'+Orientation+','+Math.abs(transform.translate.x)+',y:'+Math.abs(transform.translate.y)+',width:'+$(area).width()+',height:'+$(area).height());
	});

	function putb64(pic){
	    var url = "http://up.qiniu.com/putb64/-1";
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange=function(){
	        if (xhr.readyState==4){
	            console.log(xhr.responseText);
	        }
	    }
	    // xhr.open("POST", url, true); 
	    // xhr.setRequestHeader("Content-Type", "image/jpeg"); 
	    // xhr.setRequestHeader("Authorization", "UpToken UNIFT3Dh3-4HYCR-OjoSADE8wPdu56O69AnQGr_j:Q1zusXQv4_rF4It-21LzL9P5Ntg=:eyJzY29wZSI6ImRvdGFmYW5zIiwiZGVhZGxpbmUiOjE0MzY4MDYyNTF9"); 
	    // xhr.send(pic.split(',')[1]);
	}  


	function fixOrientation(ctx,orientation,canvas){
		switch(orientation){
		    case 2:
		        // horizontal flip
		        ctx.translate(canvas.width, 0);
		        ctx.scale(-1, 1);
		        break;
		    case 3:
		        // 180° rotate left
		        ctx.translate(canvas.width, canvas.height);
		        ctx.rotate(Math.PI);
		        break;
		    case 4:
		        // vertical flip
		        ctx.translate(0, canvas.height);
		        ctx.scale(1, -1);
		        break;
		    case 5:
		        // vertical flip + 90 rotate right
		        ctx.rotate(0.5 * Math.PI);
		        ctx.scale(1, -1);
		        break;
		    case 6:
		        // 90° rotate right
		        ctx.rotate(0.5 * Math.PI);
		        ctx.translate(0, -canvas.height);
		        break;
		    case 7:
		        // horizontal flip + 90 rotate right
		        ctx.rotate(0.5 * Math.PI);
		        ctx.translate(canvas.width, -canvas.height);
		        ctx.scale(-1, 1);
		        break;
		    case 8:
		        // 90° rotate left
		        ctx.rotate(-0.5 * Math.PI);
		        ctx.translate(-canvas.width, 0);
		        break;
		    default:
		    	break;
		}
	}


	/**
	 * Detecting vertical squash in loaded image.
	 * Fixes a bug which squash image vertically while drawing into canvas for some images.
	 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
	 * 
	 */
	function detectVerticalSquash(img) {
	    var iw = img.naturalWidth, ih = img.naturalHeight;
	    var canvas = document.createElement('canvas');
	    canvas.width = 1;
	    canvas.height = ih;
	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(img, 0, 0);
	    var data = ctx.getImageData(0, 0, 1, ih).data;
	    // search image edge pixel position in case it is squashed vertically.
	    var sy = 0;
	    var ey = ih;
	    var py = ih;
	    while (py > sy) {
	        var alpha = data[(py - 1) * 4 + 3];
	        if (alpha === 0) {
	            ey = py;
	        } else {
	            sy = py;
	        }
	        py = (ey + sy) >> 1;
	    }
	    var ratio = (py / ih);
	    return (ratio===0)?1:ratio;
	}

	/**
	 * A replacement for context.drawImage
	 * (args are for source and destination).
	 */
	function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
	    var vertSquashRatio = detectVerticalSquash(img);
	 // Works only if whole image is displayed:
	 // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
	 // The following works correct also when only a part of the image is displayed:
	    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio, 
	                       sw * vertSquashRatio, sh * vertSquashRatio, 
	                       dx, dy, dw, dh );
	}


}()