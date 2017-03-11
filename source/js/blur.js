//BLUR-эффект на странице "портфолио"
var blur = (function () {
	var wrap = document.querySelector('.js-feedback-wrapper'),
	    bg = document.querySelector('.js-feedback-bg'),
	    bgSection = document.querySelector('.js-reviews-bg');

	function set() {
		var bgWidth = bgSection.offsetWidth,
		    posLeft = -wrap.offsetLeft,
		    posTop = -wrap.offsetTop,
		    offsetImgTop = bgSection.offsetTop,
		    offsetTop = posTop + offsetImgTop;

		bg.style.backgroundSize = bgWidth + 'px ' + 'auto';
		bg.style.backgroundPosition = posLeft + 'px ' + offsetTop + 'px';
	}

	return {
		init: function init() {
			set();

			window.addEventListener('resize', set);
		}
	};
}());

$(function () {
  if ($('#feedbackForm').length) {
    blur.init();
  }

  window.onresize = function () {
    if ($('#feedbackForm').length) {
      blur.init();
    }
  }
});