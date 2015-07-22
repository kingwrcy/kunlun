/* 
* @Author: JerryWang
* @Date:   2015-07-19 00:01:12
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-22 11:19:14
*/




$(function(){
	$(".uploadimg").on('change',function(){
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
			    	$(".figure figure").html('');
	                var imgDataURL = canvas.toDataURL();
	                var $img = $('<img>').attr('src', imgDataURL).attr('id','originalimg');
	                $(".figure figure").append($img);
	                $(".enterindex").hide();
	                $("#detail").hide();
			    	$("#cropimg").show();	
			    	// if(id === 'uploadimageBtn'){
			    	// 	$img.cropper('destory');
			    	// }
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


	$("#okbtn").click(function(){
		var b64 = $("#previewImage").attr('src');
		putb64(b64);
	});
})


function putb64(pic){
    var url = "http://up.qiniu.com/putb64/-1";
    var xhr = new XMLHttpRequest();
    var token = null;
    var desc = $("#chooseTemplate textarea").val();
    var template = $('#chooseTemplate .picshow').hasClass('model2') ? 1 : 0;
    if(!$.trim(desc)){
    	alert('请填写信息');
    	return;
    }
    $.get('/api/third/token/',function(data){
    	if(data.code == 0){
    		xhr.onreadystatechange=function(){
		        if (xhr.readyState==4){
		        	$("#chooseTemplate").hide();
		        	$.post('/api/third/cards/',{
		        		img:'http://7xkb2g.com1.z0.glb.clouddn.com/'+JSON.parse(xhr.responseText).hash,
		        		desc:desc,
		        		template:template,
		        		owner:$.trim($("#sign").val())
		        	},function(data){
		        		if(data.code == 0){
		        			window.location.href = 'detail.html?id='+data.card.id+'&preview=true';
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