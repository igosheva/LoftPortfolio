$(function () {
  var blur = (function () {
    var
      wrapper = document.querySelector('.js-feedback-wrapper'),
      form = document.querySelector('.js-feedback-bg');
    return {
      set: function () {
        var
          imgWidth = document.querySelector('.js-reviews-bg').offsetWidth,
          posLeft = -wrapper.offsetLeft,
          posTop = -wrapper.offsetTop + 290,
          blurCss = form.style;

        blurCss.backgroundSize = imgWidth + 'px'+ ' ' + 'auto';
        blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
      }
    }
  }());
  if ($('#feedbackForm').length) {
    blur.set();
  }

  window.onresize = function () {
    if ($('#feedbackForm').length) {
      blur.set();
    }
  }
});