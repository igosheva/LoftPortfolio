//прелоадер для всех страниц
var preloader = (function () {
  var
    preloader = $('.preloader'),
    persentsTotal = 0,
    cardAnimate = $('.l-card__wrapper');
  var imgPath = $('*').map(function (ind, element) {

    var
      background = $(element).css('background-image'),
      path = '';
    var isImg = $(element).is('img');

    if (background != 'none') {
      path = background.replace('url("', '').replace('")','')
    }

    if (isImg) {
      path = $(element).attr('src')
    }

    if (path) return path;
  });

  var setPersents = function (total, current) {

    var persents = Math.ceil(current / total *100);
    $('.js-percents').text(persents + '%');

    if (persents >= 100) {
      preloader.fadeOut();
      cardAnimate.addClass('active');
    }
  };

  var loadImages = function (images) {
    if (!images.length) preloader.fadeOut();

    images.forEach(function (img, i, images) {
      var fakeImages = $('<img>', {
        attr: {
          src: img
        }
      });

      fakeImages.on('load error', function () {
        persentsTotal++;
        setPersents(images.length, persentsTotal);
      })
    });

  };

  return {
    init: function () {
      var imgs = imgPath.toArray();
      loadImages(imgs);
    }
  }
}());

$(function () {
  preloader.init();
});