<script>
$(function(){
	
	var i=0;
	$("#nav li").each(function(){
		$(this).css("top",39*i);
		i++;
	})
	
	$("#nav li").hover(
	
	function(){$(this).find("a").stop()
	.animate({"padding-left":"20px"},800,'easeOutBounce');
	$(this).css("background-color","#4b4b4b")
	
	},
	function(){$(this).find("a").stop()
	.animate({"padding-left":"10px"},500);
	$(this).css("background-color","#444")
	}
	);
	
	$(".open").toggle(
	function(){$(".main").stop()
	.animate({"left":"0px"},800,'easeOutBounce');
	},
	
	function(){$(".main").stop()
	.animate({"left":"-200px"},800,'easeOutBounce');
	}
	);
	
})

</script>
