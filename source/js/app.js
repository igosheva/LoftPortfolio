var Arrow = (function () {

  return {
    init: function () {
      const Height = $('.js-section-two').offset().top;

      $('.c-arrow').on('click', function () {
        $('body,html').animate({
          scrollTop: Height
        }, 1000);
        return false;
      });
    }
  }
}());

var Hamburger = (function () {
  var
    hamburger = $('.js-hamburger'),
    navContainer = $('.js-navigation'),
    navContent = $('.c-navigation');

  return {
    init: function () {
      hamburger.on('click', function (e) {
        e.preventDefault();

        var _this = $(this);

        _this.toggleClass('active');
        setTimeout(function () {
          navContent.toggleClass('active');
        }, 500);
        navContainer.toggleClass('active')
      });
    }
  }
}());

var Authorization = (function () {
  var
    authorization = $('.js-authorization'),
    card = $('.l-card__wrapper');

  return {
    init: function () {
      authorization.on('click', function (e) {
        e.preventDefault();

        var _this = $(this);

        _this.toggleClass('active');
        setTimeout(function () {
          card.toggleClass('active');
        }, 500);
      });
    }
  }
}());

$(function () {
  if ($('#hamburger').length) {
    Hamburger.init();
  }
  if ($('#arrow').length) {
    Arrow.init();
  }
  if ($('#authorization').length) {
    Authorization.init();
  }
});