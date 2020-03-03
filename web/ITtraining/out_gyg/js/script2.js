$(document).ready(function(){
  
    var WIN = $(window);
  
	WIN.on("scroll", function(){
		
		if( WIN.scrollTop()>500 ){
			$("#nav").css({ position:"fixed", top:0, zIndex:999 });
		}else{
			$("#nav").css({ position:"static" });
		}
			
	});

});