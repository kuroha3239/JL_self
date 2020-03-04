$(function() {
  // -------------------<a> slide-------------------//
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate(
      { scrollTop: $($(this).attr('href')).offset().top },
      900,
      'swing'
    );
  });

  // -------------------top click show-------------------//
  setTimeout(function() {
    $('#top_click').css('opacity', '1');
  }, 2900);

  // -------------------top click change bg-------------------//
  $('#top_click').click(function() {
    $('#main_bg').addClass('shine');

    setTimeout(function() {
      $('#main_bg').addClass('main_bg_click');
      $('h4').text('用一張張的照片，紀錄下我的生活');
    }, 150);

    setTimeout(function() {
      $('html,body').animate({ scrollTop: $('#about').offset().top }, 1200);
    }, 2500);

    // $(this).css("display", "none");
    $(this).hide();
  });

  // -------------------NAV-------------------//
  $('#logo').hover(
    function() {
      $(this)
        .css('background', '#174887')
        .find('img')
        .attr('src', 'images/logo/jl_logo_w.png');
    },
    function() {
      $(this)
        .css('background', 'transparent')
        .find('img')
        .attr('src', 'images/logo/jl_logo.png');
    }
  );
  $('nav ul li')
    .not(':first-child')
    // .slice(1)
    .hover(
      function() {
        $(this).addClass('nav_act');
      },
      function() {
        $(this).removeClass('nav_act');
      }
    );
  // $("nav ul li").hover(
  //   function () {
  //     if ($(this).hasClass('nav_act')) return;
  //   }
  // );

  // -----------------------------------Scroll-----------------------------------//
  $(window).on('scroll', function() {
    // $(window).scroll(function () {

    var scroll_act = $(window).scrollTop();

    // -------------------NAV FIXED-------------------//
    top_section = $('#top').height() - 60;
    if (scroll_act >= top_section) {
      $('nav').addClass('dropdown_fixed');
    } else {
      $('nav').removeClass('dropdown_fixed');
    }

    // -------------------NAV scrollspy-------------------//
    zone_1 = $('#about').offset().top - 60;
    zone_2 = $('#photo').offset().top - 60;
    zone_3 = $('#graphic').offset().top - 60;
    zone_4 = $('#web').offset().top - 60;

    if (scroll_act <= zone_1) {
      $('#logo').css('background', '#174887');
      $('nav li:eq(0)')
        .find('img')
        .attr('src', 'images/logo/jl_logo_w.png');
      $('nav li:eq(0)')
        .siblings()
        .removeClass('nav_act');
    } else {
      $('#logo').css('background', 'transparent');
      $('nav li:eq(0)')
        .find('img')
        .attr('src', 'images/logo/jl_logo.png');
    }
    // if ($(window).scrollTop() > zone_0) {
    if (scroll_act > zone_1) {
      $('nav li:eq(1)')
        .addClass('nav_act')
        .siblings()
        .removeClass('nav_act');
    }
    if (scroll_act > zone_2) {
      $('nav li:eq(2)')
        .addClass('nav_act')
        .siblings()
        .removeClass('nav_act');
    }
    if (scroll_act > zone_3) {
      $('nav li:eq(3)')
        .addClass('nav_act')
        .siblings()
        .removeClass('nav_act');
    }
    if (scroll_act > zone_4) {
      $('nav li:eq(4)')
        .addClass('nav_act')
        .siblings()
        .removeClass('nav_act');
    }

    // -------------------gotop 出現-------------------//
    if (scroll_act > 2000) {
      $('#gotop').fadeIn();
    } else {
      $('#gotop').fadeOut();
    }

    // -------------------gotop 變白-------------------//
    // footer = $('#footer').offset().top - 900;
    // if (scroll_act >= footer) {
    //   $('.arrow').addClass('bottom');
    // } else {
    //   $('.arrow').removeClass('bottom');
    // }

    // -------------------加上footer bottom-------------------//
    var window_width = $(window).width();

    var window_height = $(window).height();

    var over_bottom = $('#wrapper').outerHeight();

    if (window_width > 1281) {
      if (scroll_act + window_height + 1 > over_bottom) {
        setTimeout(function() {
          $('body').addClass('footer_down');
          $('#footer_bottom').show(500);
        }, 500);
      } else {
        $('body').removeClass('footer_down');
        $('#footer_bottom').fadeOut(1000);
      }
    }
  });

  // -------------------focus BTN_Click 停止 & 消失-------------------//

  // focus的click
  $('#focus_click').hover(
    function() {
      $(this)
        .find('img')
        .css('animation', '0s');
    },
    function() {
      $(this)
        .find('img')
        .attr('animation', 'btn_click 1.5s infinite');
    }
  );

  // 1.5秒後再下滑
  $('#focus_click').click(function() {
    // 快門鎖定改紅色
    $(this).addClass('click_down');

    setTimeout(function() {
      $('html,body').animate({ scrollTop: $('#photo').offset().top }, 1200);
    }, 1500);
  });

  // fliter的click
  $('.select_btn button').hover(function() {
    // $(".point img").css("display", "none");
    $('.point img').hide();
  });

  // -------------------circle & photo filter-------------------//
  var $photo_selects = $('#photo_selects').isotope({});

  $('#filters').on('click', 'button', function() {
    $('#photo_selects').addClass('open');

    setTimeout(function() {
      $('.case_card').css('filter', 'grayscale(0)');
    }, 200);

    var filterValue = $(this).attr('data-filter');
    $photo_selects.isotope({
      filter: filterValue,
    });

    AOS.refresh();
  });

  // -------------------gallery album-------------------//

  // 照片點選後出現的黑底cover遮罩
  baguetteBox.run('.gallery', {
    buttons: Boolean, // 顯示上下一張btn。
    noScrollbars: true, //顯示時隱藏scrollbar。
    titleTag: true, //使用圖片上的title
    async: false, //是否異步加載文件。
  });
  $('#photo_selects a').hover(
    function() {
      $(this)
        .parent()
        .css('box-shadow', '1px 1px 8px #47474c');
    },
    function() {
      $(this)
        .parent()
        .css('box-shadow', '0');
    }
  );

  // -------------------owl carousel-------------------//
  $('.owl-carousel').owlCarousel({
    margin: 10,
    loop: true,
    autoWidth: true,
    items: 5,
  });

  // -------------------graphic hover-------------------//
  $('.inframe').hover(
    function() {
      // 其他
      $('.inframe')
        .parent()
        .css({ filter: 'grayscale(100%)', filter: 'blur(3px)' });
      // hover中
      $(this)
        .parent()
        .css({
          'z-index': '5000',
          opacity: '1',
          filter: 'blur(0)',
        });
    },
    function() {
      $('.inframe')
        .parent()
        .css({ filter: 'grayscale(70%)', filter: 'blur(0)' });
      $(this)
        .parent()
        .css('z-index', '100');
    }
  );

  // -------------------Final Click-------------------//

  $('#final_click').click(function() {
    $('.final_sec')
      .addClass('flip')
      .fadeOut(1000);
    $('#tk').fadeIn(2500);

    // 改變gotop的目標
    $('#gotop').click(function() {
      $('html,body').animate({ scrollTop: $('body').offset().top }, 1000);
    });
  });

  // -------------------啟動 AOS-------------------//
  AOS.init({
    duration: 800,
  });

  // =====================================RWD=====================================//

  var window_width = $(window).width();
  if (window_width <= 1280) {
    // ------------------- AOS 調整-------------------//
    // if (window_width <= 767) {

    AOS.init({
      duration: 500,
    });

    $('nav').attr({
      'data-aos': '',
    });
    $('#top_click span').attr({
      // 'data-aos-offset': '100',
      'data-aos-anchor-placement': 'top-bottom',
      // 'data-aos-delay': '0',
    });
    $('h3,#skill,#chart').attr({
      'data-aos': '',
      // 'data-aos-offset': '800',
      // 'data-aos-anchor-placement': 'bottom-bottom',
      // 'data-aos-delay': '0',
    });
    $('#final_click').attr({
      'data-aos': '',
      'data-aos-offset': '1000',
      'data-aos-anchor-placement': 'top-bottom',
    });
    AOS.refresh();
  }

  // ------------------- AOS 調整-------------------//
  if (window_width <= 767) {
    // $(window).resize(function() {
    //   if (
    //     window_Width != $(window).width() ||
    //     window_Height != $(window).height()
    //   ) {
    //     location.reload();
    //     return;
    //   }
    // });

    AOS.init({ disable: 'mobile' });
    // AOS.refresh();
  }
});
