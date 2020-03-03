/*gotop滑上淡出、滑下淡入*/

$(function(){

$("#gotop").click (function(){

$("html,body").animate({scrollTop:0},1300);

});

$(window).scroll (function(){

if($(this).scrollTop() > 1500){

$('#gotop').stop().fadeTo('fast',1);

} else {

$('#gotop').stop().fadeOut('fast');

}

});

});



$(function(){
	$('#GO').click(function(){
		$('html,body').animate({scrollTop:4800}, 1000);
	});
});
