$(document).ready(function(){
	
	$(document).click(function(e){
		var socialMediaSelector = $(e.target).parent().parent();
		if(socialMediaSelector.hasClass("social-media-block") || socialMediaSelector.hasClass("social-media")){
			$(".social-media-block").addClass("active");
		}
		else{
			$(".social-media-block").removeClass("active");
		}

	});
	$('.featuredProductSlider').slick({
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		variableWidth: false,
		responsive: [
			{
				breakpoint: 1385,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 1050,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			
			{
				breakpoint: 857,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 552,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
	$('select').material_select();
	
	// click events
	$('.hamburger').on('click', function(){
		if(!$("body").hasClass("show-nav")){
			$("body").addClass("show-nav");
			$('.shadow').fadeIn();
			$('body').animate({'left':"200px"});
		}
		else{
			removeAddedBodyClass();
			removeShadow();
		}
	});
	$('.search-icon-link').on('click', function() {
		if($("body").hasClass("show-nav")){
			removeAddedBodyClass();
		}
		else{
			$("body").addClass("show-input", 1300);
			$('.shadow').fadeIn();
		}
	});
	
	// this element covers the whole html tag...
	$('.shadow').on('click',function(){
		removeAddedBodyClass();
		removeShadow();
	});
	function removeShadow(){
		$('.shadow').fadeOut();
		$('body').animate({'left':0},400);
	}
	function removeAddedBodyClass(){
		if($("body").hasClass("show-nav")){
			$("body").removeClass("show-nav");
		}
		if($("body").hasClass("show-input")){
			$("body").removeClass("show-input");
		}
		
	}
	
	/**
* --------------------------------------------------------------------------
* HIDE HEADER ON ON SCROLL DOWN
* --------------------------------------------------------------------------
*/

	/**
* --------------------------------------------------------------------------
* HIDE HEADER ON ON SCROLL DOWN
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
	adjustSlickButtons(".featuredProductSlider");
	setHeightOfChildren(".event-content-main .event-list");
	$(window).resize(function(){
		adjustSlickButtons(".featuredProductSlider");
		setHeightOfChildren(".event-content-main .event-list");
	});
	
	
	function adjustSlickButtons(elementName){
		var slickDotsWidthSummation = 0;
		var containerWidth = $(elementName).width();
		var positioningValue = 0;
		var widthPercentageOfhalfContainer = 50;// means 50%;
		$(".slick-dots li").each(function(){
			slickDotsWidthSummation += $(this).width();
		});
		var leftPositioningValue = 50-((slickDotsWidthSummation/containerWidth)*100/2)-3;// -3 para pumantay
		var rightPositioningValue = 50+((slickDotsWidthSummation/containerWidth)*100/2);
		$(".slick-prev").css("left",leftPositioningValue+"%");
		$(".slick-next").css("left",rightPositioningValue+"%");
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

/**
* --------------------------------------------------------------------------
* EVENTS
* --------------------------------------------------------------------------
*/
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
	/***********************/
});