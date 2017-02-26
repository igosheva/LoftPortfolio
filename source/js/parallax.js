$(function () {
	window.onscroll = function () {
    var parallax= (function() {
      var
        bg = document.querySelector('.js-hero-bg'),
        title = document.querySelector('.js-hero-title'),
        user = document.querySelector('.js-user');
      
      return {
        move: function (block, windowScroll, strafeAmount) {
          var
            strafe = windowScroll/-strafeAmount + '%',
            style = block.style,
            transformString = 'translate3d(0,'+ strafe +', 0)';

          style.top = strafe;
          style.transform = transformString;
          style.webkitTransform = transformString;
        },
        init: function (wScroll) {
          this.move(bg, wScroll, 45);
          this.move(title, wScroll, 30);
          this.move(user, wScroll, 6);
        }
      }
    }());
    var wScroll = window.pageYOffset;

    if ($('#parallaxScroll').length) {
      parallax.init(wScroll);
    }
  }
});