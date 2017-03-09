$('.c-arrow').on('click', function () {
  const Height = $('.js-section-two').offset().top;
  $('body,html').animate({
    scrollTop: Height
  }, 1000);
  return false;
});

$(function () {
  var
    hamburger = $('.js-hamburger'),
    navContainer = $('.js-navigation'),
    navContent = $('.c-navigation');

	hamburger.on('click', function (e) {
    e.preventDefault();

    var _this = $(this);

		_this.toggleClass('active');
    setTimeout(function () {
      navContent.toggleClass('active');
    }, 500);
    navContainer.toggleClass('active')
  });
});

$(function () {
  var
    authorization = $('.js-authorization'),
    card = $('.l-card__wrapper');

	authorization.on('click', function (e) {
    e.preventDefault();

    var _this = $(this);

		_this.toggleClass('active');
    setTimeout(function () {
      card.toggleClass('active');
    }, 500);
  });
});