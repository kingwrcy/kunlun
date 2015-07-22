/* 
* @Author: JerryWang
* @Date:   2015-07-17 13:57:34
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-22 16:37:36
*/

$(function(){
	var storage = window.localStorage;
	$(".path").scrollTop(1000);


	/**
	 *  722 西宁 
		723 日月山，倒淌河、沙岛、
		724 克鲁克、托素湖 外星人遗址
		725 察尔汗盐湖
		726 胡杨林
		727 玉珠峰
		728 工厂 水源地 
		729格尔木
	 * @return {[type]} [description]
	 */
	function disableNode(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();



		var rules = {
				22:['西宁'],
				23:['日月山','倒淌河','沙岛'],
				24:['克鲁克','托素湖','外星人遗址'],
				25:['察尔汗盐湖'],
				26:['胡杨林'],
				27:['玉珠峰'],
				28:['水源地'],
				29:['格尔木返程']
			};
		$("path[id^=node]").css('display','inline');
		$("path[id^=unlock]").css('display','');
		if(year == '2015' && month == '7'){
			for(var p in rules){
				if(p <= day){
					for(var text in rules[p]){
						var nodes = $("text[id^=text]:contains('"+rules[p][text]+"')");
						if(nodes.length === 0)break;
						var id = nodes.attr('id');
						var index = id.match(/\d+/)[0];
						$("path[id=node-"+index+"-unlock]").css('display','inline');
						$("path[id=node-"+index+"-lock]").css('display','');
					}
				}
			}
		}
	}

	disableNode();

    if(storage && storage.getItem('username')){
		window.location.href = 'list.html';
	}

    $("path[id^=circle],path[id^=node],text[id^=text]").click(function(){
        var index = parseInt($(this).attr('id').match(/\d+/)[0],10);
        var display = $("path[id=node-"+index+"-lock]")[0].style.display;
        if( display !== ''){
            var circle = $("path[id=circle-"+index+"]");
            $("#tooltip").show().css({
                position:'absolute',
                left:(circle.offset().left-24)+'px',
                top:(circle.offset().top-121)+'px'
            });
        }else{
        	if(storage){
				if(!storage.getItem('username')){
					$("#reg").show();
				}else{
					window.location.href = 'list.html';
				}
			}
        }
    })

    $("#closeBtn").click(function(){
        $("#tooltip").hide();
    });

    $(".enterbtn").click(function(){
		var username = $.trim($("#username").val());
		var tel = $.trim($("#tel").val());
		if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(tel))){
			alert('请填写正确的电话号码');
			return;
		}
		$.ajax({
			type:'POST',
			url:'/api/third/user/',
			data:{name:username,phone:tel},
			success:function(data){
				if(data.code === 0){
					storage.setItem('username',username);
					window.location.href = 'list.html';
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert('很抱歉，信息没有提交成功');
			}
		});
	});


	$(document.body).on('tapmove',function(){
		$("#tooltip").hide();
	});
})
