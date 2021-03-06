//Срелка скрола к нужному блоку

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

//Гамбургер-меню
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

$(function () {
  if ($('#hamburger').length) {
    Hamburger.init();
  }
  if ($('#arrow').length) {
    Arrow.init();
  }
});