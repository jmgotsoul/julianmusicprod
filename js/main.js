(function() {
  'use strict';

  // Mobile detect
  var desktop_nav, height_line, init_classic_menu, init_classic_menu_resize, init_navigation_scroll, init_progress_bar, init_skrollr, init_wow, mobileTest, mobile_nav;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
    mobileTest = true;
    $("html").addClass("mobile");
  } else {
    mobileTest = false;
    $("html").addClass("no-mobile");
  }

  // Page Loader
  $(window).on("load", function (e) {
    $('.page-loader').delay(600).fadeOut('slow');
  });

  // Parallax background image
  $(".bg-img, .parallax").each(function() {
    $(this).attr("data-background") && $(this).css("background-image", "url(" + $(this).data("background") + ")")
  });

  // skrollr
  init_skrollr = function() {
    if (($(window).width() >= 1024) && (mobileTest === false)) {
      skrollr.init({
        forceHeight: false,
        smoothScrolling: false
      });
    }
  };

  init_skrollr();

  // Progress Bar
  init_progress_bar = function() {
    $(".progress-bar").appear(function() {
      var addPerstange, count, progressContainer, progressPerstange, step;
      progressContainer = $(this);
      progressPerstange = progressContainer.attr("data-progress");
      step = 5;
      count = 30;
      addPerstange = function() {
        progressContainer.css("width", count + "%");
        if (count < progressPerstange) {
          count += step;
          setTimeout(addPerstange, 40);
        }
      };
      addPerstange();
    });
  };

  if (($(window).width() >= 1024) && (mobileTest === false)) {
    init_progress_bar();
  }

  // Navigation Panel
  height_line = function(height_object, height_donor) {
    height_object.height(height_donor.height());
    height_object.css({
      'line-height': height_donor.height() + 'px'
    });
  };

  mobile_nav = $('.navbar-mobile');

  desktop_nav = $('.navbar-desktop');

  init_classic_menu_resize = function() {
    $('.mobile-on .navbar-desktop > ul').css('max-height', $(window).height() - $('.main-nav').height() - 20 + 'px');
    if ($(window).width() <= 1024) {
      $('.main-nav').addClass('mobile-on');
    } else if ($(window).width() > 1024) {
      $('.main-nav').removeClass('mobile-on');
      desktop_nav.show();
    }
  };

  init_classic_menu = function() {
    var check_scroll, menuHasSub, menuThisLi;
    check_scroll = function() {
      if ($(window).scrollTop() > 10) {
        $('.js-transparent').removeClass('transparent');
        $('.main-nav, .nav-logo-wrap .logo, .navbar-mobile').addClass('small-height');
      } else {
        $('.js-transparent').addClass('transparent');
        $('.main-nav, .nav-logo-wrap .logo, .navbar-mobile').removeClass('small-height');
      }
    };
    $('.js-stick').sticky({
      topSpacing: 0
    });
    height_line($('.inner-nav > ul > li > a'), $('.main-nav'));
    height_line(mobile_nav, $('.main-nav'));
    mobile_nav.css({
      'width': $('.main-nav').height() + 'px'
    });
    if ($('.main-nav').hasClass('transparent')) {
      $('.main-nav').addClass('js-transparent');
    }
    check_scroll();
    $(window).scroll(function() {
      check_scroll();
    });
    mobile_nav.on('click', function() {
      if (desktop_nav.hasClass('js-opened')) {
        desktop_nav.slideUp('slow').removeClass('js-opened');
        $(this).removeClass('active');
      } else {
        desktop_nav.slideDown('slow').addClass('js-opened');
        $(this).addClass('active');
      }
    });
    desktop_nav.find('a:not(.menu-has-sub)').on('click', function() {
      if (mobile_nav.hasClass('active')) {
        desktop_nav.slideUp('slow').removeClass('js-opened');
        mobile_nav.removeClass('active');
      }
    });
    menuHasSub = $('.menu-has-sub');
    menuThisLi = void 0;
    $('.mobile-on .menu-has-sub').find('.fa:first').removeClass('fa-angle-right').addClass('fa-angle-down');
    menuHasSub.on('click', function() {
      if ($('.main-nav').hasClass('mobile-on')) {
        menuThisLi = $(this).parent('li:first');
        if (menuThisLi.hasClass('js-opened')) {
          menuThisLi.find('.menu-sub:first').slideUp(function() {
            menuThisLi.removeClass('js-opened');
            menuThisLi.find('.menu-has-sub').find('.fa:first').removeClass('fa-angle-up').addClass('fa-angle-down');
          });
        } else {
          $(this).find('.fa:first').removeClass('fa-angle-down').addClass('fa-angle-up');
          menuThisLi.addClass('js-opened');
          menuThisLi.find('.menu-sub:first').slideDown();
        }
        return false;
      } else {

      }
    });
    menuThisLi = menuHasSub.parent('li');
    menuThisLi.hover((function() {
      if (!$('.main-nav').hasClass('mobile-on')) {
        $(this).find('.menu-sub:first').stop(true, true).fadeIn('fast');
      }
    }), function() {
      if (!$('.main-nav').hasClass('mobile-on')) {
        $(this).find('.menu-sub:first').stop(true, true).delay(100).fadeOut('fast');
      }
    });
  };

  init_classic_menu();

  init_classic_menu_resize();

  $(window).resize(function() {
    init_classic_menu_resize();
  });

  // Navigation On Scroll
  init_navigation_scroll = function() {

    /* Smooth scroll */
    var menuLinks, sections;
    $('.scroll li a, a.scroll').smoothScroll({
      speed: 1200
    });
    sections = $('body section');
    menuLinks = $('.scroll-nav li a');
    $(window).scroll(function() {
      sections.filter(":in-viewport:first").each(function() {
        var activeLink, activeSection;
        activeSection = $(this);
        activeLink = $('.scroll-nav li a[href$="#' + activeSection.attr("id") + '"]');
        menuLinks.removeClass('active');
        activeLink.addClass('active');
      });
    });
  };

  init_navigation_scroll();

  // WOW Animation
  init_wow = function() {
    var wow;
    wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });
    if ($('body').hasClass('appear-animate')) {
      wow.init();
    }
  };

  init_wow();
}).call(this);