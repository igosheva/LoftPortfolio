//Блог на странице "блог"
var scrollMenu = (function () {
  var $news = $('.l-blog-data'),
    $item = $('.js-blog-item'),
    $wrapMenu = $('.js-blog-inner'),
    body = document.body,
    isPositionArticle = [],
    offsetHeight = 200,

    positionArticle = function (element) {
      var len = element.length;
      for (var i = 0; i < len; i++) {
        isPositionArticle[i] = {};
        isPositionArticle[i].top = element
            .eq(i)
            .offset()
            .top - offsetHeight;
        isPositionArticle[i].bottom = isPositionArticle[i].top + element
            .eq(i)
            .innerHeight();
      }
    },

    scrollPageFixMenu = function () {
      var scroll = window.pageYOffset;
      if (scroll < $news.offset().top) {
        $wrapMenu.removeClass('fixed');
      } else {
        $wrapMenu.addClass('fixed');
      }
    },

    scrollPage = function () {
      var scroll = window.pageYOffset;
      for (var i = 0; i < isPositionArticle.length; i++) {
        if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
          $('.l-blog-nav__item--news')
            .eq(i)
            .addClass('active')
            .siblings()
            .removeClass('active');
          $item
            .eq(i)
            .addClass('active')
            .siblings()
            .removeClass('active');
        }
      }
    },

    clickOnMenu = function (e) {
      var index = $(e.target).index();
      var sectionOffset = $news
        .eq(index)
        .offset()
        .top;
      $(document).off('scroll', scrollPage);
      $('body, html').animate({
        'scrollTop': sectionOffset
      }, function () {
        $(e.target)
          .addClass('active')
          .siblings()
          .removeClass('active');
        $(document).on('scroll', scrollPage);
      });
    },

    addListener = function () {
      $('.js-blog-nav').on('click', clickOnMenu);

      $(document).on('scroll', scrollPage);
      $(document).on('scroll', scrollPageFixMenu);

      $(window).on('load', function (e) {
        positionArticle($news);
      });

      $(window).on('resize', function (e) {
        positionArticle($news);
      });

      $('.l-news-menu__handler').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.l-news-menu').toggleClass('blocked');
      });
    };

  return {
    init: addListener
  }
}());

$(function () {
  if ($('#blog').length) {
    scrollMenu.init();
  }
});
