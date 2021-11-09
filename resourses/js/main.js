jQuery(function($){

var GB = window.GB || {};
    /*-------------------------------------------
                    Loading
    --------------------------------------------    

/* -----------------------------------------------
             Mobile Navigation
------------------------------------------------ */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

GB.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

GB.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
}


/* ==================================================
   Slider Options
================================================== */

GB.slider = function(){
	$.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   4000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	300,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   0,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
											{image : 'resourses/img/slider-images/image01.jpg', title : '<div class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
				                            {image : 'resourses/img/slider-images/image02.jpg', title : '<div class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
				                            {image : 'resourses/img/slider-images/image03.jpg', title : '<div class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
			                            	{image : 'resourses/img/slider-images/image04.jpg', title : '<div class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
                                            {image : 'resourses/img/slider-images/image05.jpg', title : '<dic class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
                                            {image : 'resourses/img/slider-images/image06.jpg', title : '<dic class="slide-content">M.D.CARS</div>', thumb : '', url : ''},
									],
									
		// Theme Options			   
		progress_bar			:	0,			// Timer for each slide							
		mouse_scrub				:	0
		
	});

}



/* -----------------------------------------------
                Sticky nav
------------------------------------------------ */

GB.nav = function(){
	$('.sticky-nav').waypoint('sticky');
}


/* -----------------------------------------------
                  Gallery
----------------------------------------------- */


GB.filter = function (){
	if($('#FnL').length > 0){		
		var $container = $('#FnL');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already FnL
			if ( $this.hasClass('FnL') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.FnL').removeClass('FnL');
			$this.addClass('FnL');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/*-----------------------------------------------
                 FancyBox
----------------------------------------------- */

GB.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
				padding : 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
}

/* -----------------------------------------------
              Menu Highlight
----------------------------------------------- */

GB.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
}

/* -----------------------------------------------
                  Next Section
----------------------------------------------- */

GB.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}

/* -----------------------------------------------
                    GoUp
----------------------------------------------- */

GB.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}


/* -----------------------------------------------
	           Scroll to Top
----------------------------------------------- */

GB.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}

/* -----------------------------------------------
             Thumbs / Social Effects
----------------------------------------------- */

GB.utils = function(){
	
	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('#social ul li').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
}
/* -----------------------------------------------
                   Accordion
----------------------------------------------- */

GB.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* -----------------------------------------------
                    Toggle
----------------------------------------------- */

GB.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* -----------------------------------------------
                  Tooltip
----------------------------------------------- */

GB.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}

/* drag */
/***********************************************
* Drag and Drop Script: (c) Dynamic Drive (http://www.dynamicdrive.com)
* Please keep this notice intact
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
var dragobject={
z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
initialize:function(){
document.onmousedown=this.drag
document.onmouseup=function(){this.dragapproved=0}
},
drag:function(e){
var evtobj=window.event? window.event : e
this.targetobj=window.event? event.srcElement : e.target
if (this.targetobj.className=="drag"){
this.dragapproved=1
if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
this.offsetx=parseInt(this.targetobj.style.left)
this.offsety=parseInt(this.targetobj.style.top)
this.x=evtobj.clientX
this.y=evtobj.clientY
if (evtobj.preventDefault)
evtobj.preventDefault()
document.onmousemove=dragobject.moveit
}
},
moveit:function(e){
var evtobj=window.event? window.event : e
if (this.dragapproved==1){
this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
return false
}
}
}

dragobject.initialize()

/* -----------------------------------------------
	               Init
----------------------------------------------- */

GB.slider();

$(document).ready(function(){
	Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: '_include/js/placeholder.js', 
		complete : function() {
				if (!Modernizr.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]);
	
	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});
	
	GB.nav();
	GB.mobileNav();
	GB.listenerMenu();
	GB.menu();
	GB.goSection();
	GB.goUp();
	GB.filter();
	GB.fancyBox();
	GB.contactForm();
	GB.tweetFeed();
	GB.scrollToTop();
	GB.utils();
	GB.accordion();
	GB.toggle();
	GB.toolTip();
});

$(window).resize(function(){
	GB.mobileNav();
});

});
