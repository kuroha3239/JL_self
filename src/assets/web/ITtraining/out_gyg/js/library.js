/* 
 *
 * library.js v0.2
 * ※jQueryとEasing Pluginが必要です
 * 
 * Copyright(c) INVOGUE.CO,. Ltd. ALL Rights Reserved.
 * http://www.invogue.co.jp/
 * 
 */

(function($) {
	$.library = {
		analysis:function(path){var self=this;this.originalPath=path;this.absolutePath=(function(){var e=document.createElement('span');e.innerHTML='<a href="'+path+'"/>';return e.firstChild.href;})();var fields={'schema':2,'username':5,'password':6,'host':7,'path':9,'query':10,'fragment':11};var r=/^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);for(var field in fields){this[field]=r[fields[field]];}this.querys={};if(this.query){$.each(self.query.split('&'),function(){var a=this.split('=');if(a.length==2) self.querys[a[0]]=a[1];});}},
		rollover:function(options){var c=$.extend({hoverSelector:'img.rover,input.rover,.all-rover img',groupSelector:'.group-rover',activeclass:'active',postfix:'_on'},options);var rolloverImgs=$(c.hoverSelector).filter(isNotCurrent);rolloverImgs.each(function(){this.originalSrc=$(this).attr('src');this.rolloverSrc=this.originalSrc.replace(new RegExp('('+c.postfix+')?(\.gif|\.jpg|\.png)$'),c.postfix+"$2");this.rolloverImg=new Image;this.rolloverImg.src=this.rolloverSrc;});var groupingImgs=$(c.groupSelector).find('img').filter(isRolloverImg);rolloverImgs.not(groupingImgs).hover(function(){if(!$(this).hasClass(c.activeclass)){$(this).attr('src',this.rolloverSrc);}},function(){if(!$(this).hasClass(c.activeclass)){$(this).attr('src',this.originalSrc);}});$(c.groupSelector).hover(function(){$(this).find('img').filter(isRolloverImg).each(function(){if(!$(this).hasClass(c.activeclass)){$(this).attr('src',this.rolloverSrc);}});},function(){$(this).find('img').filter(isRolloverImg).each(function(){if(!$(this).hasClass(c.activeclass)){$(this).attr('src',this.originalSrc);}});});function isNotCurrent(i){return Boolean(!this.currentSrc);}function isRolloverImg(i){return Boolean(this.rolloverSrc);}},
		active:function(id,options){var c=$.extend({type:'img',addclass:'active',postfix:'_on'},options);if(id !='' && c.type=='img'){$("img#"+id).each(function(){var dot=$(this).attr('src').lastIndexOf('.');var imgsrc_ro=$(this).attr('src').substr(0,dot)+c.postfix+$(this).attr('src').substr(dot,4);$(this).attr('src',imgsrc_ro).addClass(c.addclass);});}else if(id !='' && c.type=='text'){$("#"+id).each(function(){$(this).addClass(c.addclass);});}},
		scroll:function(options){var scroller=(function(){var c=$.extend({easing:100,step:30,fps:60,fragment:''},options);c.ms=Math.floor(1000/c.fps);var timerId;var param={stepCount:0,startY:0,endY:0,lastY:0};function move(){if(param.stepCount==c.step){window.scrollTo(getCurrentX(),param.endY);}else if(param.lastY==getCurrentY()){param.stepCount++;window.scrollTo(getCurrentX(),getEasingY());param.lastY=getEasingY();timerId=setTimeout(move,c.ms);}else{if(getCurrentY()+getViewportHeight()==getDocumentHeight()){setFragment(param.hrefdata.absolutePath);}}}function setFragment(path){location.href=path}function getCurrentY(){return document.body.scrollTop||document.documentElement.scrollTop;}function getCurrentX(){return document.body.scrollLeft||document.documentElement.scrollLeft;}function getDocumentHeight(){return document.documentElement.scrollHeight||document.body.scrollHeight;}function getViewportHeight(){return(!$.browser.safari && !$.browser.opera)?document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight:window.innerHeight;}function getEasingY(){return Math.floor(getEasing(param.startY,param.endY,param.stepCount,c.step,c.easing));}function getEasing(start,end,stepCount,step,easing){var s=stepCount/step;return(end - start) *(s+easing/(100 * Math.PI) * Math.sin(Math.PI * s))+start;}return{set:function(options){this.stop();if(options.startY==undefined) options.startY=getCurrentY();param=$.extend(param,options);param.lastY=param.startY;timerId=setTimeout(move,c.ms);},stop:function(){clearTimeout(timerId);param.stepCount=0;}};})();$('a[href^=#],area[href^=#]').not('a[href=#],area[href=#]').each(function(i){this.hrefdata=new $.library.analysis(this.getAttribute('href'));}).click(function(){var target=$('#'+this.hrefdata.fragment);if(target.length==0) target=$('a[name='+this.hrefdata.fragment+']');if(target.length){scroller.set({endY:target.offset().top,hrefdata:this.hrefdata});return false;}});$("a[name]").each(function(i){if(($(this).html()=='') &&($(this).text()=='') &&($(this).attr('id') !='')){$(this).css({'height':'0','width':'0','display':'block','overflow':'hidden'});}});},
		heights:function(target,options){var c=$.extend({row:0},options);if(c.row>0){var sets=[],temp=[];$(target).each(function(i){temp.push(this);if(i % c.row==(c.row-1)){sets.push(temp);temp=[];}});if(temp.length){sets.push(temp);}$.each(sets,function(){$.library.flatheights(this);});}else{$.library.flatheights(target);}},
		flatheights:function(target,options){var c=$.extend({handlers:[],interval:1000,currentSize:0},options);var ins=$('<ins>M</ins>').css({display:'block',visibility:'hidden',position:'absolute',padding:'0',top:'0'});var isChanged=function(){ins.appendTo('body');var size=ins[0].offsetHeight;ins.remove();if(c.currentSize==size) return false;c.currentSize=size;return true;};$(isChanged);var observer=function(){if(!isChanged()) return;$.each(c.handlers,function(i,handler){handler();});};c.addHandler=function(func){c.handlers.push(func);if(c.handlers.length==1){setInterval(observer,c.interval);}};var sets=[];function flat(set){var maxHeight=0;$(set).each(function(){var height=$(this).height();if(height>maxHeight) maxHeight=height;});$(set).css('height',maxHeight+'px');}if($(target).length>1){flat($(target));sets.push($(target));}c.addHandler(function(){$.each(sets,function(){$(this).height('auto');flat($(this));});});},
		boxhover:function(target,options){var c=$.extend({addclass:'hover',linkclass:'location'},options);if(target !=''){$(target).each(function(){$(this).removeClass(c.addclass);$(this).css('cursor','pointer');if($(this).find('a').hasClass(c.linkclass)){var Url=$(this).find('a.'+c.linkclass).attr('href');$(this).hover(function(){$(this).addClass(c.addclass);},function(){$(this).removeClass(c.addclass);});$(this).click(function(){if($(this).find('a.'+c.linkclass).attr('target')=='_blank'){window.open(Url,'_blank');}else{location.href=Url;}return false;});}});}},
		pagetop:function(target,options){
			var c=$.extend({easing:'easeOutCirc',duration:500,start:200,marginbtm:20,marginlt:10},options);
			var PositionLeft=parseInt(($(window).width()-$('#Content').width())/2)+$('#Content').width()+c.marginlt;
			
			$(target).css({'position':'fixed','top':'auto','bottom':c.marginbtm,'left':PositionLeft});
			PositionAnimate();
			
			$(window).scroll(function(){if($(this).scrollTop()>c.start){$(target).show();}else{$(target).hide();}});
			$(window).resize(function(){PositionAnimate();});
			
			function PositionAnimate(){
				PositionLeft=parseInt(($(window).width()-$('#Content').width())/2)+$('#Content').width()+c.marginlt;
				if($(window).width() > $('#Content').width()+($(target).width()*2)+(c.marginlt*2)){
					$(target).css({'left':PositionLeft,'opacity':'1'});
				}else{
					$(target).css({'left':PositionLeft,'opacity':'0'});
				}
			}
			$(target).find('a').click(function(){
				$('html,body').stop(true,false).animate({scrollTop:'0'},{duration:c.duration,easing:c.easing});
				return false;
			});
		},
		hovercaption:function(target,options){
			var c=$.extend({
				easing:'easeOutBack',
				duration:500
			},options);
			
			$(target).find('p.img .caption').after('<span></span>');
			
			$(target).find('p.img span').css('opacity','0');
			$(target).find('p.img .caption').css('opacity','0');
			$(target).hover(function(){
				$(this).find('p.img .caption').stop(false,true).animate({'bottom':'0','opacity':'1'},{duration:c.duration,easing:c.easing});
				$(this).find('p.img span').stop(false,true).animate({'bottom':'0','opacity':'0.8'},{duration:c.duration,easing:c.easing});
			},function(){
				$(this).find('p.img .caption').stop(false,true).animate({'bottom':'-38','opacity':'0'},{duration:c.duration,easing:c.easing});
				$(this).find('p.img span').stop(false,true).animate({'bottom':'-38','opacity':'0'},{duration:c.duration,easing:c.easing});
			});
		},
		social:function(target){$(target).find('.facebook').socialbutton('facebook_like');$(target).find('.twitter').socialbutton('twitter');$(target).find('.google').socialbutton('google_plusone');$(target).find('.mixi').socialbutton('mixi_check');$(target).find('.hatena').socialbutton('hatena');},
		pager:function(target,options){
			var c=$.extend({
				addclass:'active',
				easing:'easeOutExpo',
				duration:1000
			},options);
			
			//ini
			var TargetHeight = [];
			var page=location.hash.substr(6,7);
			if(page==''){page='01';}
			$(target).wrapAll('<div class="section-wrap"></div>');
			$(target).parent().css('position','relative');
			
			$(target).each(function(){
				TargetHeight[$(this).attr('id')] = $(this).height();
				$(this).css({'overflow':'hidden','position':'absolute','top':0,'left':0})
			});
			
			$('#Main div.pager a').click(function(){
				$('html,body').animate({scrollTop:'0'},{duration:c.duration,easing:c.easing});
			});
			
			$(window).hashchange(function(){
				page=location.hash.substr(6,7);
				if(page==''){page='01';}
				Changer(page,0);
				$('html,body').animate({scrollTop:'0'},{duration:c.duration,easing:c.easing});
			});
			
			Changer(page,1);
			function Changer(page,flag){
				var v_target_img = '#Visual h1 img';
				var v_dot = $(v_target_img).attr('src').lastIndexOf('.');
				var v_imgsrc = $(v_target_img).attr('src').substr(0, v_dot-2) + page + $(v_target_img).attr('src').substr(v_dot, 4);
				
				if(flag){
					$(v_target_img).attr('src',v_imgsrc);
					$(target).not('#page'+page).css({'opacity':'0'}).hide();
					$(target).parent().css({'height':TargetHeight['page'+page]});
				}else{
					$(v_target_img).stop().animate({'opacity':'0'},{duration:500,easing:c.easing,complete:function(){
						$(this).attr('src',v_imgsrc);
						setTimeout(function(){
							$(v_target_img).stop().animate({'opacity':'1'},{duration:500,easing:c.easing});
						},100);
					}});
					$(target).stop().animate({'opacity':'0'},{duration:c.duration,easing:c.easing}).hide();
					setTimeout(function(){
						$('#page'+page).show().stop().animate({'opacity':'1'},{duration:c.duration,easing:c.easing});
						$(target).parent().animate({'height':TargetHeight['page'+page]},{duration:c.duration,easing:c.easing});
					},500);
				}
				
				$('#Main div.pager a img').each(function(){
					$(this).removeClass(c.addclass);
					$(this).attr('src',$(this).attr('src').replace(/_on/i,""));
				});
				
				var p_target_img = '#Main div.pager a.page'+page+' img';
				var p_dot = $(p_target_img).attr('src').lastIndexOf('.');
				var p_imgsrc = $(p_target_img).attr('src').substr(0, p_dot) + '_on' + $(p_target_img).attr('src').substr(p_dot, 4);
				$(p_target_img).attr('src',p_imgsrc).addClass(c.addclass);
				
				var compute = page.substr(1,2);
				var next_page = '0'+(parseInt(page.substr(1,2))+1);
				var back_page = '0'+(parseInt(page.substr(1,2))-1);
				
				if(page == '01'){
					$('#Main div.pager li a.back').hide();
					$('#Main div.pager li a.next').show();
					$('#Main div.pager li a.next').attr('href','#/page'+next_page);
				}else if(page == '0'+$('#Main '+target).length){
					$('#Main div.pager li a.back').show();
					$('#Main div.pager li a.next').hide();
					$('#Main div.pager li a.back').attr('href','#/page'+back_page);
				}else{
					$('#Main div.pager li a.back').show();
					$('#Main div.pager li a.next').show();
					$('#Main div.pager li a.next').attr('href','#/page'+next_page);
					$('#Main div.pager li a.back').attr('href','#/page'+back_page);
				}
			}
		}
	};
	$(function(){
		$.library.rollover();
		if($.browser.msie && parseInt($.browser.version) == 6){
			$('#PageTop').hide();
		}else{
			$.library.pagetop('#PageTop');
		}
	});
})(jQuery);