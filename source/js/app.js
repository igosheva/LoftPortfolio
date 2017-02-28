$(function () {
	$('.js-blog-link').on('click', function () {
		const item = $(this).closest('.js-blog-item'),
			contentItem = $('.l-blog-data'),
			itemPosition = item.data('class');

		contentItem.filter('.l-blog-data--' + itemPosition)
			.add(item)
			.addClass('active')
			.siblings()
			.removeClass('active');

		const Height = $('.l-blog-data.active').offset().top;
		const space = 100;
		$('body,html').animate({
			scrollTop: Height - space + 50
		}, 1000);
		return false;
	});
});

$(function () {
	const $blogNav = $('.js-blog-nav');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 400) {
			$blogNav.css('position', 'static')
		}
	});
});

$(function () {
	$('.c-arrow').on('click', function () {
		const Height = $('.js-section-two').offset().top;
		$('body,html').animate({
			scrollTop: Height
		}, 1000);
		return false;
  });
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