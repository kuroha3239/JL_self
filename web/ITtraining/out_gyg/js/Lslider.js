$(function(){
	
	var i=0;
	$("#nav li").each(function(){
		$(this).css("top",40*i);
		i++;
	})
	
	$("#nav li").hover(
	
	function(){$(this).find("a").stop()
	.animate({"padding-right":"20px"},800,'easeOutBounce');
	$(this).css("background-color","#4b4b4b")
	
	},
	function(){$(this).find("a").stop()
	.animate({"padding-right":"10px"},500);
	$(this).css("background-color","#444")
	}
	);
	
	
/*open鈕的變色*/
	
	$(".open").hover(
	
	function(){$(this).find("a").stop()
	$(this).css("color","#ffe400")
	
	},
	function(){$(this).find("a").stop()
	.animate({"padding-left":"10px"},500);
	$(this).css("color","#fff")
	}
	);
	
	
/*open點下後*/
	
	$(".open").toggle(
	function(){$(".main").stop()
	.animate({"left":"0px"},800,'easeOutBounce');
	},
	
	function(){$(".main").stop()
	.animate({"left":"-150px"},800,'easeOutBounce');
	}
	);
	
})
