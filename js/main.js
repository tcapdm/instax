$(document).ready(function(){
	
	


/**
* --------------------------------------------------------------------------
* EVENTS
* --------------------------------------------------------------------------
*/
	var didScroll;
	var lastScrollTop = 0;
	var delta = 0;
	var hh = $(".header-navigation-block").height();
	var docHeight = $(document).innerHeight();
	var winHeight = $(window).innerHeight();
	var scrollTop     = 0,
		elementOffset = 0,
		distance = 0;
	var topHeight = "0";


	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	});
	setSocialMediaPosition();

	$(window).scroll(function(){
		setSocialMediaPosition();

	});

	function setSocialMediaPosition(){
		scrollTop     = $(window).scrollTop();
		elementOffset = $('main').offset().top;
		distance      = (elementOffset - scrollTop);
		//		console.log(distance);
		//		console.log(scrollTop);
		if(distance<0){
			$('.social-media-block').addClass("setRightMost");
		}
		else{
			$('.social-media-block').removeClass("setRightMost");
		}
	}

	function hasScrolled() {
		var st = $(this).scrollTop();
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop && st > hh){
			$('.navigation').addClass("hideNav").removeClass("showNav");

		} else {
			if(st + winHeight < docHeight) {
				$('.navigation').addClass("showNav").removeClass("hideNav");
			}
			if(distance<0){//means wala ka na sa header
				$('.header-navigation-block').addClass("whiteBGC");
			}
			else{
				$('.header-navigation-block').removeClass("whiteBGC");
			}
		}
		lastScrollTop = st;
	}


	/* USE THIS for getting the position of the slick buttons */
	adjustSlickButtons(".productSlider",45);
	adjustSlickButtons(".home-thumbs-slider",45);// means 45 degree rotation
	setHeightOfChildren(".event-content-main .event-list");
	$(window).resize(function(){
		adjustSlickButtons(".productSlider");
		setHeightOfChildren(".event-content-main .event-list");
		resetChildHeight($("ul.sitemap li.col"));
	});

//	elementRotation = means that the element is tranformed
	function adjustSlickButtons(elementName, elementRotation){
//		console.log("dumaan dito");
		var slickDotsWidthSummation = 0;
		var containerWidth = $(elementName).width();
		var positioningValue = 0;
		var widthPercentageOfhalfContainer = 50;// means 50%;
//		console.log(listDots);
		$(elementName+" .slick-dots li").each(function(){
			if(elementRotation!=0){
//				slickDotsWidthSummation += $(this).width()/Math.sin(elementRotation);
				slickDotsWidthSummation += Math.sqrt(Math.pow($(this).width(),2)+Math.pow($(this).height(),2));
//				console.log(Math.sqrt(Math.pow($(this).width(),2)+Math.pow($(this).height(),2)));
//				console.log(containerWidth);
			}
			slickDotsWidthSummation += $(this).width();
		});
		slickDotsWidthSummation = slickDotsWidthSummation/2;
		var leftPositioningValue = 50-((slickDotsWidthSummation/containerWidth)*100/2)-5;// -5 para pumantay at may space
		var rightPositioningValue = 50+((slickDotsWidthSummation/containerWidth)*100/2)+2;// +2 para pumantay at may space
//		console.log("left",leftPositioningValue+"%");
//		console.log("right",rightPositioningValue+"%");
		$(elementName+" .slick-prev").css("left",leftPositioningValue+"%");
		$(elementName+" .slick-next").css("left",rightPositioningValue+"%");
	}

	function setHeightOfChildren(parentChildSelector){
		var height = 0;
		$(parentChildSelector).css("height","auto");
		$(parentChildSelector).each(function(){
			if(height<$(this).height()){
				height = $(this).height();
			}
		});
		$(parentChildSelector).css("height",height+"px");
	}
	
	
	function resetChildHeight(selector){
		selector.css("height","auto");
		$highestHeight = 0;
		$(selector).each(function(){
			console.log(selector.height());
			if($highestHeight<selector.height()){
				$highestHeight=selector.height();
			}
		});
		selector.css("height",$highestHeight);

	}

	$(window).scroll(function(event){
		didScroll = true;
	});
	/* copied scripts */
	$('.btn-6').on('mouseenter', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	}).on('mouseout', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	});
	
	$(".showSiteMapButton").click(function(){
		$(this).toggleClass("active");
		$(".sitemap").slideToggle();
		resetChildHeight($("ul.sitemap li.col"));
		$('html,body').animate({scrollTop: $('html,body').height()}, 1000);
	});
	/***********************/
});