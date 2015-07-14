/* 
* @Author: JerryWang
* @Date:   2015-07-13 21:02:18
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-13 23:51:01
*/

~function(){
	var uploadBtn = document.getElementById('upload_file');
	var area = document.getElementById('area');
	var areaParent = $(area).parent();
	var okBtn = $("#ok");
	var x,y,start = false;
	var left,top;
	var MAXSIZE = 3 * 1024 *1024;
	var imgUri = null;
	var originalWidth,originalHeight;

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
			}
			img.src = f.result;
			imgUri = f.result;
			
			upload_area.appendChild(img);
		}
		f.readAsDataURL(file);
	});

	$(area).bind('tapstart',function(e,touch){
		x = touch.position.x;
		y = touch.position.y;
		start = true;
		left = $(area).position().left;
		top = $(area).position().top;
	});

	$(area).bind('tapmove',function(e,touch){
		if(start){
			// console.log('before:',left );
			var move_left = touch.position.x - x + left;
			var move_top = touch.position.y -y + top;

			move_left = Math.min(Math.max(0,move_left),areaParent.width() - $(area).width());
			move_top = Math.min(Math.max(0,move_top),areaParent.height() - $(area).height());

			$(area).css({
				left:move_left + 'px',
				top:move_top + 'px'
			});

			// console.log('after:',$(area).offset().left );
		}
	})

	$(area).bind('tapend',function(e){
		if(start){
			start = false;
		}
	})

	okBtn.click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var area_left = $(area).position().left;
		var area_top = $(area).position().top;
		var canvas = $("<canvas></canvas>");
		var height = $(area).height();
		var width = $(area).width();
		var rateX = $(areaParent).width() / originalWidth;
		var rateY = $(areaParent).height() /originalHeight;
		canvas.attr({
			width:width+'px',
			height:height+'px'
		}).hide();
		$(document.body).append(canvas);
		var ctx = canvas[0].getContext('2d');
		ctx.clearRect(0, 0, width, height);  
		ctx.drawImage($("#upload_area img")[0],area_left/rateX,area_top/rateY,width/rateX,height/rateY,0,0,width,height);
		var data = canvas[0].toDataURL();
		putb64(data);
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
	    xhr.setRequestHeader("Content-Type", "image/png"); 
	    xhr.setRequestHeader("Authorization", "UpToken UNIFT3Dh3-4HYCR-OjoSADE8wPdu56O69AnQGr_j:Q1zusXQv4_rF4It-21LzL9P5Ntg=:eyJzY29wZSI6ImRvdGFmYW5zIiwiZGVhZGxpbmUiOjE0MzY4MDYyNTF9"); 
	    xhr.send(pic.split(',')[1]);
	}  


}()