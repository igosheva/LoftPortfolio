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