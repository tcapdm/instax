;(function($, window, document, undefined) {


	$(function() {
		// globals

		var $window = $(window),
			$document = $(document),
			docHeight = $document.innerHeight(),
			winWidth = $window.innerWidth(),
			winHeight = $window.innerHeight(),
			$header = $('.header'),
			hh = $header.innerHeight(),
			imgs = document.body.getElementsByTagName('img'),
			widthOfSearch = winWidth-50,
			sgw = $('.slider-guide').innerWidth(),
			sgh = $('.slider-guide').innerHeight(),
			sliderDataHeight = $('.slider-guide').attr('data-height'),
			percent = sliderDataHeight.split("%")[0],
			sliderHeight = winWidth*percent/100,
			$allVideos = $("iframe"),
			$fluidEl = $("figure"),
			played = false;

		$('.home-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.home-thumbs-slider',

		});

		$('.home-thumbs-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.home-slider',
			dots: true,
			focusOnSelect: true,
			arrows: true,
			infinite: true,
			focusOnSelect: true,
			variableWidth: true
		});

		$('.productSlider').slick({
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
		
		
		var updateOnResize = debounce(function() {
			updateValueOnResize();
			updateStyleOnResize();
		}, 250);


		updateStyleOnResize();
		searchResponsive();


		/**
* --------------------------------------------------------------------------
* HIDE HEADER ON ON SCROLL DOWN
* --------------------------------------------------------------------------
*/

		var didScroll;
		var lastScrollTop = 0;
		var delta = 0;

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		});

		function hasScrolled() {
			var st = $(this).scrollTop();
			if(Math.abs(lastScrollTop - st) <= delta)
				return;

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > hh){
				// Scroll Down
				$('.header, .burger, .search').css('top', '-'+hh+'px');
				// $('.burger').css('top',)
			} else {
				// Scroll Up
				if(st + winHeight < docHeight) {
					$('.header').css('top', 0);
					$('.burger').css('top', 10);
					$('.search').css('top', 7);
				}
			}
			lastScrollTop = st;
		}


		/**
* --------------------------------------------------------------------------
* ADD BACKGROUND FOR HEADER ON SCROLL DOWN
* --------------------------------------------------------------------------
*/

		function headerAddBgOnScroll() {
			var homeSliderHeight = $('.home-slider-wrapper').outerHeight();
			var homeHeaderHeight = $('.header').outerHeight();

			if($(this).scrollTop() > (homeSliderHeight - homeHeaderHeight)) {
				$('.header').addClass('header-background-black');
			}else {
				$('.header').removeClass('header-background-black');
			}
		}

		/**
* --------------------------------------------------------------------------
* SLIDER
* --------------------------------------------------------------------------
*/
		//jemuel codes
		$('.home-slider').on('afterChange swipe', function(){
			var iframes = $('.home-slider .slick-track .slick-slide').find('iframe');
			$(iframes).each(function(i, item){
				var src = $(item).attr('src').replace('?rel=0&fs=1&autoplay=1','');
				$(item).attr('src', src);
			});
			var current = $('.home-slider .slick-track .slick-slide.slick-current').find('iframe');
			var src = $(current).attr('src');
			$(current).attr('src', src + '?rel=0&fs=1&autoplay=1');
		});
		
		var iframes = $('.home-slider .slick-track .slick-slide.slick-current').find('iframe');
		$(iframes).each(function(i, item){
			var src = $(item).attr('src');
			$(item).attr('src', src + '?rel=0&fs=1&autoplay=1');
		});
/**
* --------------------------------------------------------------------------
* SEARCH
* --------------------------------------------------------------------------
*/

		var searchForm = function(){
			$('.search').on('click', function(e){
				e.preventDefault();
				$('.search-form, .shadow').toggleClass('open');
				$(".search-form input").val("");
			});
			$('.shadow, .seach-close, .search-close').on('click', function(){
				$('.shadow, .seach-close, .search-form').removeClass('open')
			});
			$('.search-form').on('submit', function(e) {
				e.preventDefault();
				if(!$('.search-tag-list a').length > 0) {
					var text = $(this).serializeArray()[0].value.split(' ');
					$('.search-tag-container').fadeIn();
					for (var i = 0; i < text.length; i++) {
						console.log(text[i]);
						if(text[i] != 0) {
							$('.search-tag-container .search-tag-list').append("<li><a href='#'>" + text[i] + "<i class='fa fa-times'></i></a></li>");
						}
					}

					$('.search-tag-list a').click(function(e) {
						e.preventDefault();
						console.log();
						if($('.search-tag-list li').length != 1) {
							$(this).parent('li').remove();
						} else {
							$('#search-keywords').val('');
							$(this).parent('li').remove();
							$('.search-tag-container').fadeOut();
						}
					});
				}
			});
		}();

		/**
* --------------------------------------------------------------------------
* DYNAMIC CHANGE OF COLOR ON SLIDER
* --------------------------------------------------------------------------
*/
	function searchResponsive() {

		if(winWidth <= 1110){
			$('input[type=search]').css('width',0);
			$('input[type=search]').focusin(function(){
				$('.shadow').fadeIn();
				$(this).css('width',widthOfSearch);
				$('.burger').css('z-index','-1');
				$('input[type=search]').siblings().toggleClass('fa-search fa-close');
				$('input[type=search]').siblings().css('z-index','9');

			});
			$('input[type=search]').focusout(function(){
				$(this).css('width',0);
				$('.burger').css('z-index','2');
				$('.shadow').fadeOut();
				$('input[type=search]').siblings().toggleClass('fa-close fa-search');
				$('input[type=search]').siblings().css('z-index','-1');
			});
		} else {
			$('input[type=search]').css('width',150);
			$('input[type=search]').focusin(function(){
				$(this).css('width',200);
			});
			$('input[type=search]').focusout(function(){
				$(this).css('width',150);
			});
		}
	}

	searchResponsive();


/**
* --------------------------------------------------------------------------
* RESPONSIVE MENU
* --------------------------------------------------------------------------
*/
		var mobileNav = function(){
			$('.burger').on('click', function(){
				$('.shadow').fadeIn();
				$('.header-nav').css('left',0);
				$('.search').css('z-index','-1');
				$('body').animate({'left':200},400);
			});
			$('.shadow').on('click',function(){
				$('.shadow').fadeOut();
				$('.header-nav').css('left',-200);
				$('body').animate({'left':0},400);
				$('.search').css('z-index','7');
			});
		}();
/**
* --------------------------------------------------------------------------
* EVENTS
* --------------------------------------------------------------------------
*/

		$(window).resize(function(){
			updateOnResize();
		});

		$(window).scroll(function(event){
			didScroll = true;
			headerAddBgOnScroll();
		});

		/**
* --------------------------------------------------------------------------
* FUNCTIONS
* --------------------------------------------------------------------------
*/

		function updateValueOnResize() {
			winWidth = $window.innerWidth();
			winHeight = $window.innerHeight();
			hh = $header.innerHeight();
			docHeight = $document.innerHeight();
			widthOfSearch = winWidth-80;
			sgw = $('.slider-guide').innerWidth();
			sgh = $('.slider-guide').innerHeight();
			sliderDataHeight = $('.slider-guide').attr('data-height');
			percent = sliderDataHeight.split("%")[0];
			sliderHeight = winWidth*percent/100;
		}

		function updateStyleOnResize() {
			$('.nav-up').css('top', '-'+hh);
			searchResponsive();
			$('.home-slider .slick-track').css('height',sliderHeight);
			resiveIframe();
		}

		resiveIframe();

		function resiveIframe() {
			$allVideos.each(function() {
				$(this).removeAttr('style');
			});
			$('.home-slider .slick-track iframe').each(function(index ,item){
				$(item).css({'width':sgw , 'height':sgh});
			});
		}

		function debounce(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

		function getImageBrightness(imageSrc,callback) {
			var img = document.createElement("img");
			img.src = imageSrc;
			img.style.display = "none";
			document.body.appendChild(img);

			var colorSum = 0;

			img.onload = function() {
				// create canvas
				var canvas = document.createElement("canvas");
				canvas.width = this.width;
				canvas.height = this.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(this,0,0);

				var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
				var data = imageData.data;
				var r,g,b,avg;

				for(var x = 0, len = data.length; x < len; x+=4) {
					r = data[x];
					g = data[x+1];
					b = data[x+2];

					avg = Math.floor((r+g+b)/3);
					colorSum += avg;
				}

				var brightness = Math.floor(colorSum / (this.width*this.height));
				callback(brightness);
			}
		}
		$('.home-slider .slick-track').css('height',sliderHeight);


		/**
* --------------------------------------------------------------------------
* FEATURED PRODUCTS
* --------------------------------------------------------------------------
*/

//		$('.feat-prod-a').slick({
//			slidesToShow: 1,
//			slidesToScroll: 1,
//			arrows: true,
//			dots: true,
//			fade: true,
//			asNavFor: '.feat-prod-b',
//			prevArrow: $('.feat-prod-left-arw'),
//			appendDots:$('.feat-prod-dots'),
//			nextArrow: $('.feat-prod-right-arw')
//		});
//
//		$('.feat-prod-b').slick({
//			slidesToShow: 1,
//			slidesToScroll: 1,
//			arrows: false,
//			adaptiveHeight: true,
//			asNavFor: '.feat-prod-a'
//		});


		/**
* --------------------------------------------------------------------------
* FOOTER SUBMIT BUTTON
* --------------------------------------------------------------------------
*/

		$('.footer-subscribe-icon').on('click', function(){
			$('.footer-subscribe-submit').trigger('click');
		});

		
/**
* --------------------------------------------------------------------------
* FOOTER SUBMIT BUTTON
* --------------------------------------------------------------------------
*/
	function sliderColorText(){
		var brightness = 0;
		//check first if it has image
		if(!$(".slick-current .slick-active:has(img)")){
			alert("no image");
		}
		else{
			getImageBrightness($(".home-slider .slick-active img, .home-slider .slick-active video").attr('src'),function(brightness) {
				if (brightness <= 150){
					$('.home-slider-txt h2, .header-nav ul li a').css('color','#f7f7f7');
					$('.header-logo a img').attr('src','/sites/all/themes/fuji_digital/images/logo-white.png');
					$('.home-thumbs-slider button').removeClass('button-black');
				} else {
					$('.home-slider-txt h2, .header-nav ul li a').css('color','#242424');
					$('.header-logo a img').attr('src','/sites/all/themes/fuji_digital/images/logo-dark.png');
					$('.home-thumbs-slider button').addClass('button-black');
				}
			});
		}
	}

//	$('.home-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
//		sliderColorText();
//	});

		
/**
*--------------------------------------------------------------------------
* JEMUEL CODES
*--------------------------------------------------------------------------
*/
		$(document).click(function(e){
			var socialMediaSelector = $(e.target).parent().parent();
			if(socialMediaSelector.hasClass("social-media-block") || socialMediaSelector.hasClass("social-media")){
				$(".social-media-block").addClass("active");
			}
			else{
				$(".social-media-block").removeClass("active");
			}

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
		$('.close-button').on("click", function(){
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

	
		

		
	});
	// $('.sliderVideo').addClassName('withborder');

})(jQuery, window, document);
