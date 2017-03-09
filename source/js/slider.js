var Slider = function (container) {
  var nextBtn = container.find('.js-slider-bth--left'),
    prevBtn = container.find('.js-slider-bth--right'),
    items = nextBtn.find('.js-slider-item'),
    display = container.find('.js-slider-display'),
    title = container.find('.js-slider-subtitle'),
    skills = container.find('.js-slider-tehnologes'),
    link = container.find('.js-slider-site'),
    itemsLength = items.length,
    duration = 500,
    flag = true;

  var timeout;

  this.counter = 0;

  var generateMarkups = function () {
    var list = nextBtn.find('.js-slider-list'),
      markups = list.clone();

    prevBtn
      .append(markups)
      .find('.js-slider-item')
      .removeClass('active')
      .eq(this.counter + 1)
      .addClass('active');
  };

  // Вытащить данные из дата атрибутов для левой части слайдера
  var getDataArrays = function () {
    var dataObject = {
      pics: [],
      title: [],
      skills: [],
      link: []
    };

    $.each(items, function () {
      var $this = $(this);

      dataObject
        .pics
        .push($this.data('full'));
      dataObject
        .title
        .push($this.data('title'));
      dataObject
        .skills
        .push($this.data('skills'));
      dataObject
        .link
        .push($this.data('link'));
    });

    return dataObject;
  };

  var slideInLeftBtn = function (slide) {
    var reqItem = items.eq(slide - 1),
      activeItem = items.filter('.active');

    activeItem
      .stop(true, true)
      .animate({
        'top': '100%'
      }, duration);

    reqItem
      .stop(true, true)
      .animate({
        'top': '0%'
      }, duration, function () {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active')
          .css('top', '-100%')
      });

  };

  var slideInRightBtn = function (slide) {
    var items = prevBtn.find('.js-slider-item'),
      activeItem = items.filter('.active'),
      reqSlide = slide + 1;

    if (reqSlide > itemsLength - 1) {
      reqSlide = 0;
    }

    var reqItem = items.eq(reqSlide);

    activeItem
      .stop(true, true)
      .animate({
        'top': '-100%'
      }, duration);

    reqItem
      .stop(true, true)
      .animate({
        'top': '0%'
      }, duration, function () {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active')
          .css('top', '100%')
      });
  };

  var changeMainPicture = function (slide) {
    var image = display.find('.js-slider-display-img');
    var data = getDataArrays();

    image
      .stop(true, true)
      .fadeOut(duration / 2, function () {
        image.attr('src', data.pics[slide]);
        $(this).fadeIn(duration / 2);
      });
  };

  var changeTextData = function (slide) {
    var data = getDataArrays();

    // название работы
    aviatitle.generate(data.title[slide], title, 'ru');

    // описание технологий
    aviatitle.generate(data.skills[slide], skills, 'en');

    // ссылка
    link.attr('href', data.link[slide]);
  };

  // public
  this.setDefaults = function () {
    var _that = this,
      data = getDataArrays();

    // создаем разметку
    generateMarkups();

    // левая кнопка
    nextBtn
      .find('.js-slider-item')
      .eq(_that.counter - 1)
      .addClass('active');

    // правая кнопка
    prevBtn
      .find('.js-slider-item')
      .eq(_that.counter + 1)
      .addClass('active');

    // основное изображение
    display
      .find('.js-slider-display-img')
      .attr('src', data.pics[_that.counter]);

    // текстовые описания
    changeTextData(_that.counter);

  };

  this.moveSlide = function (direction) {
    var _that = this;
    // if (direction === "next") {
    //   if (_that.counter < itemsLength - 1) {
    //     _that.counter++;
    //   } else {
    //     _that.counter = 0;
    //   }
    // } else {
    //   if (_that.counter > 0) {
    //     _that.counter--;
    //   } else {
    //     _that.counter = itemsLength - 1;
    //   }
    // }

    var directions = {
      next: function () {
        // закольцовывание слайдера
        if (_that.counter < itemsLength - 1) {
          _that.counter++;
        } else {
          _that.counter = 0;
        }
      },

      prev: function () {
        if (_that.counter > 0) {
          _that.counter--;
        } else {
          _that.counter = itemsLength - 1;
        }
      }
    };

    directions[direction]();

    if (flag) {
      flag = false;

      if (typeof timeout != 'undefined') {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        flag = true;
      }, duration + 50);

      slideInLeftBtn(_that.counter);
      slideInRightBtn(_that.counter);
      changeMainPicture(_that.counter);
      changeTextData(_that.counter);
    }
  };
};

var slider = new Slider($('.l-works__content'));
slider.setDefaults();

$('.js-slider-bth--left').on('click', function (e) {
  e.preventDefault();
  slider.moveSlide('prev');
});

$('.js-slider-bth--right').on('click', function (e) {
  e.preventDefault();
  slider.moveSlide('next');
});

console.log(slider);