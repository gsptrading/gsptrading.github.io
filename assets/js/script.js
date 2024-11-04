(function($) {
	
	"use strict";


	
	

	$(function() {  
		$('.btn-1')
		.on('mouseenter', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
				$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});
	});

	function leftOuterContainer() {
		if ($(".left-outer-container").length) {
			var windowSize = $(window).width();
			if (windowSize >= 1170) {
				var width = ($(window).width() - 1170),
					LOC = (width / 2);
				$(".left-outer-container").css("margin-left", LOC);
			}			
		}
	}
	leftOuterContainer();
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
		TweenMax.to($(".loader-wrap .overlay"), 1.2, {
            force3D: true,
            left: "100%",
            ease: Expo.easeInOut,
        });
	}

	if ($(".preloader-close").length) {
        $(".preloader-close").on("click", function(){
            $('.loader-wrap').delay(200).fadeOut(500);
        })
    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function () {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function () {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        // if no file name return 
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 10,
			max: 200,
			values: [ 10, 99 ],
			slide: function( event, ui ) {
			$( "input.property-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		$( "input.property-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );	
	}

    // dynamic current class        
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
	}


	//Hidden Sidebar
	if($('.hidden-sidebar').length){

		var animButton = $(".sidemenu-nav-toggler"),
	        hiddenBar = $(".hidden-sidebar"),
	        navOverlay = $(".nav-overlay"),
	        hiddenBarClose = $(".hidden-sidebar-close");

	    function showMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            right: "0",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.removeClass("close-sidebar");
	    	navOverlay.fadeIn(500);
	    }

	    function hideMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            right: "-480px",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.addClass("close-sidebar");
	        navOverlay.fadeOut(500);
	    }
	    animButton.on("click", function() {
	        if (hiddenBar.hasClass("close-sidebar")) showMenu();
	        else hideMenu();
	    });
	    navOverlay.on("click", function() {
	    	hideMenu();
	    });
	    hiddenBarClose.on("click", function() {
	    	hideMenu();
	    });
	}

	if ($('.nav-overlay').length) {
		// / cursor /
		var cursor = $(".nav-overlay .cursor"),
		follower = $(".nav-overlay .cursor-follower");

		var posX = 0,
		posY = 0;

		var mouseX = 0,
		mouseY = 0;

		TweenMax.to({}, 0.016, {
			repeat: -1,
			onRepeat: function() {
				posX += (mouseX - posX) / 9;
				posY += (mouseY - posY) / 9;

				TweenMax.set(follower, {
					css: { 
						left: posX - 22,
						top: posY - 22
					}
				});

				TweenMax.set(cursor, {
					css: { 
						left: mouseX,
						top: mouseY
					}
				});

			}
		});

		$(document).on("mousemove", function(e) {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			mouseX = e.pageX;
			mouseY = e.pageY - scrollTop;
		});
		$("button, a").on("mouseenter", function() {
			cursor.addClass("active");
			follower.addClass("active");
		});
		$("button, a").on("mouseleave", function() {
			cursor.removeClass("active");
			follower.removeClass("active");
		});
		$(".nav-overlay").on("mouseenter", function() {
			cursor.addClass("close-cursor");
			follower.addClass("close-cursor");
		});
		$(".nav-overlay").on("mouseleave", function() {
			cursor.removeClass("close-cursor");
			follower.removeClass("close-cursor");
		});
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
			$(this).prev('.mega_menu').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});
		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn,.scroll-nav li a').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	//Sidemenu Nav Hide Show
	if($('.side-menu').length){		
		//Dropdown Button
		$('.side-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		$('body').addClass('side-menu-visible');
		//Menu Toggle Btn
		$('.side-nav-toggler').on('click', function() {
			$('body').addClass('side-menu-visible');
		});
		//Menu Toggle Btn
		$('.side-menu .side-menu-resize').on('click', function() {
			$('body').toggleClass('side-menu-visible');
		});
		//Menu Toggle Btn
		$('.main-header .mobile-nav-toggler-two').on('click', function() {
			$('body').addClass('side-menu-visible-s2');
		});
		//Menu Overlay
		$('.main-header .side-menu-overlay').on('click', function() {
			$('body').removeClass('side-menu-visible-s2');
		});
	}
	
	//Search Popup
	if($('#search-popup').length){		
		//Show Popup
		$('.search-toggler').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode === 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}

	function bannerSlider() {
	    if ($(".banner-slider").length > 0) {
		    // Banner Slider
			var bannerSlider = new Swiper('.banner-slider', {
				preloadImages: false,
                loop: true,
                grabCursor: true,
                centeredSlides: false,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 2400,
                spaceBetween: 0,
                parallax: false,
                effect: "slide",
				autoplay: {
				    delay: 8000,
                    disableOnInteraction: false
				},
	            navigation: {
	                nextEl: '.banner-slider-button-next',
	                prevEl: '.banner-slider-button-prev',
	            },
			});
		}
		if ($(".banner-slider-2").length > 0) {
		    // Banner Slider
			var bannerSlider2 = new Swiper('.banner-slider-2', {
				preloadImages: false,
                loop: true,
                grabCursor: true,
                centeredSlides: false,
                resistance: true,
                resistanceRatio: 0.6,
                speed: 2400,
                spaceBetween: 0,
                parallax: false,
                effect: "fade",
				autoplay: {
				    delay: 8000,
                    disableOnInteraction: false
				},
				pagination: {
				el: '.slider__pagination',
				clickable: true,
			  	},
	            navigation: {
	                nextEl: '.banner-slider-button-next',
	                prevEl: '.banner-slider-button-prev',
	            },
			});
		}
	}

	if ($('.theme_carousel').length) {
		$(".theme_carousel").each(function (index) {
			var $owlAttr = {},
			$extraAttr = $(this).data("options");
			$.extend($owlAttr, $extraAttr);
			$(this).owlCarousel($owlAttr);
		});
	}

	// Single item Carousel 
	if ($('.single-item-carousel').length) {
		var singleItemCarousel = new Swiper('.single-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			speed: 1400,
			spaceBetween: 0,
			parallax: false,
			effect: "slide",
			pagination: {
				el: '.slider__pagination',
				clickable: true,
			  },
			  pagination: {
				el: '.slider__pagination2',
				clickable: true,
			},
			autoplay: {
				delay: 8000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev',
			},
		});
	}

	// Single item Carousel 
	if ($('.single-item-carousel-2').length) {
		var singleItemCarousel = new Swiper('.single-item-carousel-2', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			speed: 1400,
			spaceBetween: 60,
			parallax: false,
			effect: "slide",
			pagination: {
				el: '.slider__pagination',
				clickable: true,
			  },
			  pagination: {
				el: '.slider__pagination2',
				clickable: true,
			},
			autoplay: {
				delay: 8000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev',
			},
		});
	}

	if ($('.two-item-carousel').length) {
		var twoItemCarousel = new Swiper('.two-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 2,
			speed: 1400,
			spaceBetween: 30,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 8000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.slider__pagination2',
				clickable: true,
			},
			navigation: {
				nextEl: '.slider-button-next2',
				prevEl: '.slider-button-prev2',
			},
			breakpoints: {
                991: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	if ($('.three-item-carousel').length) {
		var twoItemCarousel = new Swiper('.three-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 3,
			speed: 1400,
			spaceBetween: 30,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 800000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.slider__pagination3',
				clickable: true,
			},
			navigation: {
				nextEl: '.slider-button-next3',
				prevEl: '.slider-button-prev3',
			},
			noSwiping: true,
        	noSwipingClass: "no-swipe",
			breakpoints: {
                991: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	if ($('.three-item-carousel.no-margin').length) {
		var twoItemCarousel = new Swiper('.three-item-carousel.no-margin', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 3,
			speed: 1400,
			spaceBetween: 0,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 800000,
				disableOnInteraction: false
			},
			navigation: {
				prevEl: '.slider-button-next4',
				nextEl: '.slider-button-prev4',
			},
			noSwiping: true,
        	noSwipingClass: "no-swipe",
			breakpoints: {
                991: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	if ($('.three-item-blog-carousel').length) {
		var twoItemCarousel = new Swiper('.three-item-blog-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 3,
			speed: 1400,
			spaceBetween: 30,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 800000,
				disableOnInteraction: false
			},
			navigation: {
				prevEl: '.slider_button_prev',
				nextEl: '.slider_button_next',
			},
			noSwiping: true,
        	noSwipingClass: "no-swipe",
			breakpoints: {
                1150: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	if ($('.three-item-carousels').length) {
        $('.three-item-carousels').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:2
                },			
                1200:{
                    items:3
                }
            }
        });
    }


	if ($('.four-item-carousel').length) {
		var twoItemCarousel = new Swiper('.four-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 4,
			speed: 1400,
			spaceBetween: 30,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 80000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.slider-button-next4',
				prevEl: '.slider-button-prev4',
			},
			breakpoints: {
				1400: {
					slidesPerView: 3,
				},
                991: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	if ($('.five-item-carousel_swip').length) {
		var twoItemCarousel = new Swiper('.five-item-carousel_swip', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 5,
			speed: 1400,
			spaceBetween: 30,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 80000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.slider-button-next4',
				prevEl: '.slider-button-prev4',
			},
			breakpoints: {
				1400: {
					slidesPerView: 3,
				},
                991: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}

	


	var galleryThumbs = new Swiper(".gallery-thumbs", {
	  centeredSlides: true,
	  centeredSlidesBounds: true,
	  slidesPerView: 3,
	  watchOverflow: true,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  direction: 'vertical'
	});

	var galleryMain = new Swiper(".gallery-main", {
	  watchOverflow: true,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  preventInteractionOnTransition: true,
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },
	  effect: 'fade',
	    fadeEffect: {
	    crossFade: true
	  },
	  thumbs: {
	    swiper: galleryThumbs
	  }
	});

	galleryMain.on('slideChangeTransitionStart', function() {
	  galleryThumbs.slideTo(galleryMain.activeIndex);
	});

	galleryThumbs.on('transitionStart', function(){
	  galleryMain.slideTo(galleryThumbs.activeIndex);
	});


	// six item carousel
	if ($('.six-item-carousel').length) {
		var twoItemCarousel = new Swiper('.six-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 6,
			speed: 1400,
			spaceBetween: 0,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 80000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.slider__pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.slider_button_prev6',
				nextEl: '.slider_button_next6',
			},
			breakpoints: {
				1400: {
					slidesPerView: 4,
				},
                991: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}


	// industries-sixteen-carousel
	if ($('.industries-sixteen-carousel').length) {
        $('.industries-sixteen-carousel').owlCarousel({
            loop:true,
            margin:0,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="icon-left-arrow-1"></span>', '<span class="icon-right-arrow-1"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },			
                1200:{
                    items:4
                }
            }
        });
    }

	// five-item-carousel
    if ($('.five-item-carousel').length) {
        $('.five-item-carousel').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },			
                1200:{
                    items:5
                }
            }
        });
    }

	$('.three-item-slick-carousel').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [{
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
           breakpoint: 400,
           settings: {
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1
           }
        }]
    });

	$(window).scroll(function() {
		var theta = $(window).scrollTop() / 15;
		$(".about_image-box .round-box-content .curved-circle").css({ transform: "rotate(" + theta + "deg)" });
	});

	$('select.niceselect').niceSelect();
	
	// Donation Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});

	}

	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}

	//Fact Counter + Text Count
	if($('.count_box').length){
		$('.count_box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count_text").attr("data-stop"),
				r = parseInt($t.find(".count_text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count_text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count_text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count_text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}

	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}

	function tabpane() {
		if($('.tabs-box .tab').length){
			$('.tabs-box .tab').delay(10).css("display", "none");
		}
	}

	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}


	//Sortable Masonary with Filters
	function sortableMasonry() {
		if ($('.sortable-masonry').length) {
			var winDow = $(window);
			// Needed variables
			var $container = $('.sortable-masonry .items-container');
			var $filter = $('.filter-btns');
			$container.isotope({
				filter: '.all',
				animationOptions: {
					duration: 500,
					easing: 'linear'
				}
			});
			// Isotope Filter 
			$filter.find('li').on('click', function() {
				var selector = $(this).attr('data-filter');
				try {
					$container.isotope({
						filter: selector,
						animationOptions: {
							duration: 500,
							easing: 'linear',
							queue: false
						}
					});
				} catch (err) {}
				return false;
			});
			winDow.on('resize', function() {
				var selector = $filter.find('li.active').attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});
				$container.isotope()
			});
			var filterItemA = $('.filter-btns li');
			filterItemA.on('click', function() {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
			$container.isotope("on", "layoutComplete", function(a, b) {
                var a = b.length,
                pcn = $(".filters .count");
                pcn.html(a);
            }); 
		}
	}
	sortableMasonry();

	//Projects Tabs
	if($('.project-tab').length){
		$('.project-tab .project-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-tab .project-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}

	// Isotop Layout
	function isotopeBlock() {
		if($(".isotope-block").length){
			var $grid = $('.isotope-block').isotope();
	
		}
	}
	isotopeBlock();


	//Progress Bar / Levels
	if ($('.progress-box .bar-fill').length) {
		$(".progress-box .bar-fill").each(function() {
			var progressWidth = $(this).attr('data-percent');
			$(this).css('width', progressWidth + '%');
			$(this).children('.percent').html(progressWidth + '%');
		});
	}

	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
		});
	}

	// Date picker
	function datepicker () {
	    if ($('#datepicker').length) {
	        $('#datepicker').datepicker();
	    };
	}

	


	if ($('.gap_160.two-item-carousel').length) {
		var twoItemCarousel = new Swiper('.gap_160.two-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 2,
			speed: 1400,
			spaceBetween: 160,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 8000,
				disableOnInteraction: false
			},
			navigation: {
				prevEl: '.slider_button_prev',
				nextEl: '.slider_button_next',
			},
			breakpoints: {
                991: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                }, 
            }
		});
	}
	

	//Scrollbar
	$('.scroll-top-inner').on("click", function () {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });
    function handleScrollbar() {
        var progressLineBar = $('.scroll-top-inner .bar-inner');
        var pageHeight = $(document).height();
        var windwoHeight = $(window).height();
        var windowPos = $(window).scrollTop();
        var progressLineBarWidth = windowPos / (pageHeight - windwoHeight) * 100;
        $(progressLineBar).css('width',(progressLineBarWidth + '%'));
    }
	$(window).on('scroll', function() {
		handleScrollbar();
		if ($(window).scrollTop() > 200) {
				$('.scroll-top-inner').addClass('visible');
			} else {
				$('.scroll-top-inner').removeClass('visible');
			}
	});


	// three-item-carousel
    if ($('.testimonial').length) {
        $('.testimonial').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:3
                },			
                1200:{
                    items:3
                }
            }
        });
    }
    // three-item-carousel ends

    // one-item-carousel
    if ($('.one_item_carousel').length) {
        $('.one_item_carousel').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-angle-up"></span>', '<span class="fal fal fa-angle-down"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },			
                1200:{
                    items:1
                }
            }
        });
    }
    // one-item-carousel ends

    // form eleven carousel
    if ($('.eleven_form_carosul').length) {
        $('.eleven_form_carosul').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },			
                1200:{
                    items:1
                }
            }
        });
    }
    // form eleven carousel

    // home_eleven_blog_carousel
    if ($('.home_eleven_blog_carousel').length) {
        $('.home_eleven_blog_carousel').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="icon-left-arrow-1"></span>', '<span class="icon-right-arrow-1"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },			
                1200:{
                    items:2
                }
            }
        });
    }
    // home_eleven_blog_carousel

    // four-item-carousel
    if ($('.training-carousel').length) {
        $('.training-carousel').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },			
                1200:{
                    items:4
                }
            }
        });
    }
    // four-item-carousel

	if ($('.testimonial-seventeen').length) {
        $('.testimonial-seventeen').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:2
                },			
                1200:{
                    items:2
                }
            }
        });
    }

	if ($('.four-items-carousel').length) {
        $('.four-items-carousel').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },			
                1200:{
                    items:4
                }
            }
        });
    }

    // two-item-carousel ends
	// three-item-carousel
    if ($('.services-seventeen').length) {
        $('.services-seventeen').owlCarousel({
            loop:true,
            margin:24,
            nav:true,
            smartSpeed: 1000,
            autoplay: 6000,
            navText: [ '<span class="fal fa-arrow-left"></span>', '<span class="fal fa-arrow-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:3
                },			
                1200:{
                    items:3
                }
            }
        });
    }


		//Tabs Box
		if($('.industries-tabs-box').length){
			$('.industries-tabs-box .industries-tab-buttons .industries-tab-btn').on('click', function(e) {
				e.preventDefault();
				var target = $($(this).attr('data-tab'));			
				if ($(target).is(':visible')){
					return false;
				}else{
					target.parents('.industries-tabs-box').find('.industries-tab-buttons').find('.industries-tab-btn').removeClass('active-btn');
					$(this).addClass('active-btn');
					target.parents('.industries-tabs-box').find('.industries-tabs-content').find('.industries-tab').fadeOut(0);
					target.parents('.industries-tabs-box').find('.industries-tabs-content').find('.industries-tab').removeClass('active-tab');
					$(target).fadeIn(300);
					$(target).addClass('active-tab');
				}
			});
		}

	

	if ($('.ajax-sub-form').length > 0) {
	    $('.ajax-sub-form').ajaxChimp({
	          language: 'es',
	          url: "https://gmail.us17.list-manage.com/subscribe/post?u=8a43765a655b07d21fa500e4e&amp;id=2eda0a58a7" //Replace this with your mailchimp post URL.
	    });
	    $.ajaxChimp.translations.es = {
	        'submit': 'Submitting...',
	        0: 'Thanks for your subscription',
	        1: 'Please enter a valid email',
	        2: 'An email address must contain a single @',
	        3: 'The domain portion of the email address is invalid (the portion after the @: )',
	        4: 'The username portion of the email address is invalid (the portion before the @: )',
	        5: 'This email address looks fake or invalid. Please enter a real email address'
	    };
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	$(window).on('load', function() {
		if ($(".odometer").length) {
			var odo = $(".odometer");
			odo.each(function () {
			  $(this).appear(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			  });
			});
		}	
	});	

	$(document).on('ready', function () {
		(function ($) {
			// add your functions
			datepicker ();
		})(jQuery);
	});

	if($('.prgoress_indicator path').length){
		var progressPath = document.querySelector('.prgoress_indicator path');
		var pathLength = progressPath.getTotalLength();
		
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
		var updateProgress = function () {
		  var scroll = $(window).scrollTop();
		  var height = $(document).height() - $(window).height();
		  var progress = pathLength - (scroll * pathLength / height);
		  progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).on('scroll', updateProgress);
		var offset = 250;
		var duration = 550;
		jQuery(window).on('scroll', function () {
		  if (jQuery(this).scrollTop() > offset) {
			jQuery('.prgoress_indicator').addClass('active-progress');
		  } else {
			jQuery('.prgoress_indicator').removeClass('active-progress');
		  }
		});
		jQuery('.prgoress_indicator').on('click', function (event) {
		  event.preventDefault();
		  jQuery('html, body').animate({ scrollTop: 0 }, duration);
		  return false;
		});
		
		}

/* ==========================================================================
   When document is resize
   ========================================================================== */
	
	$(window).on('resize', function() {
		leftOuterContainer();
	});

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {

		//Jquery Curved Circle
		if ($('.curved-circle').length) {
			$('.curved-circle').circleType({
			  position: 'absolute',
			  dir: 1,
			  radius: 85,
			  forceHeight: true,
			  forceWidth: true
			});
		}
		if ($('.curved-circle-2').length) {
			$('.curved-circle-2').circleType({
			  position: 'absolute',
			  dir: 1,
			  radius: 170,
			  forceHeight: true,
			  forceWidth: true
			});
		}
		handlePreloader();
		sortableMasonry();
		isotopeBlock();
		bannerSlider();
		tabpane();	
	});	

})(window.jQuery);