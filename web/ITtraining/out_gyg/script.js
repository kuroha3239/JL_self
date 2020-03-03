$(function(){
	$("#BOX_2").show();
	})



$(function(){	
	$(".COURSE").click(function(){
		var N =this.id.substr(7);
		$(".COURSE_BOX").hide();		
		$("#BOX_"+ N).show();
		})
	})
	
	
$(function(){	
	$(".Course").click(function(){
		var N =this.id.substr(7);
		$(".Course_box").hide();		
		$("#box_"+ N).show();
		})
	})
	
