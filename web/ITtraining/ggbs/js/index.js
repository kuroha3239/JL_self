$(function(){
	$('#menu01').click(function(){
		$('html,body').animate({scrollTop:$('#class01').offset().top}, 800);
	});
	$('#menu02').click(function(){
		$('html,body').animate({scrollTop:$('#class02').offset().top}, 800);
	});
	$('#menu03').click(function(){
		$('html,body').animate({scrollTop:$('#class03').offset().top}, 800);
	});
	$('#menu04').click(function(){
		$('html,body').animate({scrollTop:$('#class04').offset().top}, 800);
	});
	$('#menu05').click(function(){
		$('html,body').animate({scrollTop:$('#class05').offset().top}, 800);
	});
	$('#aatop').click(function(){
		$('html,body').animate({scrollTop:$('#topbanner').offset().top}, 800);
	});
	$('.a02').click(function(){
		$('html,body').animate({scrollTop:$('#class05').offset().top}, 800);
	});
	$('#a03').click(function(){
		$('html,body').animate({scrollTop:$('#class05').offset().top}, 800);
	});
	$('#a04').click(function(){
		$('html,body').animate({scrollTop:$('#class04').offset().top}, 800);
	});
	$('.num').click(function(){
		$('html,body').animate({scrollTop:$('#class05').offset().top}, 800);
	});
});


$(document).ready(function(){
  
    var WIN = $(window);
  
	WIN.on("scroll", function(){
		
		if( WIN.scrollTop()>790 ){
			$("#nav").css({ position:"fixed", top:0, zIndex:999 });
		}else{
			$("#nav").css({ position:"static" });
		}
			
	});

});