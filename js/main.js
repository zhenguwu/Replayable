/* =================================
------------------------------------
	Divisima | eCommerce Template
	Version: 1.0
 ------------------------------------
 ====================================*/


'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(350).fadeOut(350);

});

(function($) {

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$("#login-btn").hide();
			if (user.displayName) {
				$("#profile-username").text(user.displayName);
			} else {
				$("#profile-username").text("Unnamed User");
				$("#login-page-content").hide();
				$("#signup-page-content").show();
				$("#login-page-container").fadeIn(250);
			}
			$("#profile-btn").show();
		} else {
			$("#profile-btn").hide();
			$("#login-btn").show();
		}
	});

	/*------------------
		Login
	--------------------*/
	$("#login-btn").click(function() {
		$("#signup-page-content").hide();
		$("#login-page-content").show();
		$("#login-page-container").fadeIn(250);
	});

	$("#login-page-container").click(function() {
		if (!isSigningUp) {
			$("#login-page-container").fadeOut(250);
		}
	});

	$("#login-page").click(function(e) {
		e.stopPropagation();
	});

	$("#login-form input").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        $("#sign-in-btn").trigger("click");
	    }
	});

	$("#signup-form").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        $("#signup-save-btn").trigger("click");
	    }
	});

	$("#sign-in-btn").click(function() {
		$(".sign-error").remove();
		firebase.auth().signInWithEmailAndPassword($("#sign-email").val(), $("#sign-password").val()).then(function(result) {
			$("#login-page-container").fadeOut(250, function() {
				$("#sign-email").val("");
				$("#sign-password").val("");
			});
		}, function(error) {
			$("#login-form").append("<p style='color:red' class='sign-error'>Incorrect Email or Password</p>");
		});
	});

	var isSigningUp = false;

	$("#sign-up-btn").click(function() {
		$(".sign-error").remove();
		firebase.auth().createUserWithEmailAndPassword($("#sign-email").val(), $("#sign-password").val()).then(function(result) {
			isSigningUp = true;
			$("#login-page-content").fadeOut(250);
			$("#signup-page-content").fadeIn(250);
		}, function(error) {
			var errorCode = error.code;
			if (errorCode == "auth/email-already-in-use") {
				$("#login-form").append("<p style='color:red' class='sign-error'>Email Already Linked to an Account</p>");
			} else if (errorCode == "auth/invalid-email") {
				$("#login-form").append("<p style='color:red' class='sign-error'>Invalid Email Address</p>");
			} else if (errorCode == "auth/weak-password") {
				$("#login-form").append("<p style='color:red' class='sign-error'>Password Is Too Weak</p>");
			}
		});
	})

	$("#signup-save-btn").click(function() {
		$(".sign-error").remove();
		var newName = $("#sign-username").val();
		if (newName != "") {
			firebase.auth().currentUser.updateProfile({
				displayName: newName
			}).then(function() {
				$("#profile-username").text(newName);
				$("#login-page-container").fadeOut(250, function() {
					$("#sign-email").val("");
					$("#sign-password").val("");
					$("#sign-username").val("");
				});
			}).catch(function(error) {
				console.log(error.code);
			});
		} else {
			$("#signup-form").append("<p style='color:red' class='sign-error'>Display Name Cannot Be Empty</p>");
		}
	})

	$("#profile-btn").click(function() {
		firebase.auth().signOut();
	})

	/*------------------
		Navigation
	--------------------*/
	$('.main-menu').slicknav({
		prependTo:'.main-navbar .container',
		closedSymbol: '<i class="flaticon-right-arrow"></i>',
		openedSymbol: '<i class="flaticon-down-arrow"></i>'
	});


	/*------------------
		ScrollBar
	--------------------*/
	$(".cart-table-warp, .product-thumbs").niceScroll({
		cursorborder:"",
		cursorcolor:"#afafaf",
		boxzoom:false
	});


	/*------------------
		Category menu
	--------------------*/
	$('.category-menu > li').hover( function(e) {
		$(this).addClass('active');
		e.preventDefault();
	});
	$('.category-menu').mouseleave( function(e) {
		$('.category-menu li').removeClass('active');
		e.preventDefault();
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	/*------------------
		Hero Slider
	--------------------*/
	
	var hero_s = $(".hero-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        mouseDrag: false,
        dots: false,
        animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
        navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        onInitialized: function() {
        	var a = this.items().length;
            $("#snh-1").html("<span>1</span><span>" + a + "</span>");
        }
    }).on("changed.owl.carousel", function(a) {
        var b = --a.item.index, a = a.item.count;
    	$("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");

    });

	hero_s.append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
	$(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo('.slider-nav');



	/*------------------
		Brands Slider
	--------------------*/
	$('.product-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin : 30,
		autoplay: true,
		navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
		responsive : {
			0 : {
				items: 1,
			},
			480 : {
				items: 2,
			},
			768 : {
				items: 3,
			},
			1200 : {
				items: 4,
			}
		}
	});


	/*------------------
		Popular Services
	--------------------*/
	$('.popular-services-slider').owlCarousel({
		loop: true,
		dots: false,
		margin : 40,
		autoplay: true,
		nav:true,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive : {
			0 : {
				items: 1,
			},
			768 : {
				items: 2,
			},
			991: {
				items: 3
			}
		}
	});


	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});


	/*-------------------
		Range Slider
	--------------------- */
	var rangeSlider = $(".price-range"),
		minamount = $("#minamount"),
		maxamount = $("#maxamount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function (event, ui) {
			minamount.val('$' + ui.values[0]);
			maxamount.val('$' + ui.values[1]);
		}
	});
	minamount.val('$' + rangeSlider.slider("values", 0));
	maxamount.val('$' + rangeSlider.slider("values", 1));


	/*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});



	/*------------------
		Single Product
	--------------------*/
	$('.product-thumbs-track > .pt').on('click', function(){
		$('.product-thumbs-track .pt').removeClass('active');
		$(this).addClass('active');
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product-big-img').attr('src');
		if(imgurl != bigImg) {
			$('.product-big-img').attr({src: imgurl});
			$('.zoomImg').attr({src: imgurl});
		}
	});


	$('.product-pic-zoom').zoom();



})(jQuery);
