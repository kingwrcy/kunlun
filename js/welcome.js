/* 
* @Author: JerryWang
* @Date:   2015-07-17 13:57:34
* @Last Modified by:   JerryWang
* @Last Modified time: 2015-07-17 19:58:46
*/

$(function(){
	var storage = window.localStorage;
	$(".path").scrollTop(1000);


	/**
	 *  7.22		西宁，日月山，倒淌河
		7.23		沙岛，克鲁克
		7.24		托素湖，外星人遗址
		7.25		察尔汗盐湖
		7.26		胡杨林
		7.27		玉珠峰
		7.28		工厂，水源地
		7.29		格尔木返程
	 * @return {[type]} [description]
	 */
	function disableNode(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = 29||today.getDate();

		var rules = {
				22:['西宁','日月山','倒淌河'],
				23:['沙岛','克鲁克'],
				24:['托素湖','外星人遗址'],
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

    // for(var i=0;i<5;i++){
    //     $("#node-"+i+"-lock").show();
    // }

    // for(var i=4;i<10;i++){
    //     $("#node-"+i+"-unlock").show();
    // }
    
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
		$("#reg").hide();
		window.location.href = 'list.html';
		// $.post('http://k3.limijiaoyin.com/api/third/user',{name:username,phone:tel}).done(function(data){
		// 	if(data.code === 0){
		// 		storage.setItem('username',username);
		// 		alert('注册成功!');
		// 		window.location.href = 'list.html';
		// 	}
		// });
	});


	$(document.body).on('tapmove',function(){
		$("#tooltip").hide();
	});
})
