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
//Авторизация на главной странице
var AuthorizationButton = (function () {
  var
    authorization = $('.js-authorization'),
    cardFlip = $('.l-card__wrapper');

  return {
    init: function () {
      authorization.on('click', function (e) {
        e.preventDefault();

        $('#authorizationButton').toggleClass('active');
        setTimeout(function () {
          cardFlip.toggleClass('flip');
        }, 100);
      });
    }
  }
}());

var AuthorizationSubmit = (function () {
  return {
    init: function () {
      $("#authorization").submit(function (event) {
        event.preventDefault();

        if (!($("#noRobot").prop("checked") && $('input[name=radio]:checked', '#authorization').val() == 1)) {
            $("#validation1").text('Роботы нам не нужны');
        } else {
            $("#validation1").text('Замечательно! Сабмит реализую позже');
        }
      });
    }
  }
}());

$(function () {
  if ($('#authorizationButton').length) {
    AuthorizationButton.init();
  }
  if ($('#authorization').length) {
    AuthorizationSubmit.init();
  }
});

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
//Анимация для букв слайдера на странице "портфолио"

if ($('#slider').length) {
  var aviatitle = {
    generate: function (string, block) {
      var wordsArray = string.split(' '),
        stringArray = string.split(''),
        sentence = [],
        word = '';

      block.text('');

      wordsArray.forEach(function (currentWord) {
        var wordsArray = currentWord.split('');

        wordsArray.forEach(function (letter) {
          var letterHtml = '<span class="letter-span">' + letter + '</span>';

          word += letterHtml;
        });

        var wordHTML = '<span class="letter-word">' + word + '</span>';

        sentence.push(wordHTML);
        word = '';
      });

      block.append(sentence.join(' '));

      // анимация появления
      var letters = block.find('.letter-span'),
        counter = 0,
        timer,
        duration = 500 / stringArray.length;

      function showLetters() {
        var currentLetter = letters.eq(counter);

        currentLetter.addClass('active');
        counter++;

        if (typeof timer !== 'undefined') {
          clearTimeout(timer);
        }

        timer = setTimeout(showLetters, duration);
      }

      showLetters();

    }
  };
}

//Слайдер на странице "портфолио"

var sliderCont = (function () {
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

      aviatitle.generate(data.title[slide], title, 'ru');

      aviatitle.generate(data.skills[slide], skills, 'en');

      link.attr('href', data.link[slide]);
    };

    this.setDefaults = function () {
      var _that = this,
        data = getDataArrays();

      generateMarkups();

      nextBtn
        .find('.js-slider-item')
        .eq(_that.counter - 1)
        .addClass('active');

      prevBtn
        .find('.js-slider-item')
        .eq(_that.counter + 1)
        .addClass('active');

      display
        .find('.js-slider-display-img')
        .attr('src', data.pics[_that.counter]);

      // текстовые описания
      changeTextData(_that.counter);

    };

    this.moveSlide = function (direction) {
      var _that = this;

      var directions = {
        next: function () {

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
    }
  };
  return {
    init: function () {
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
    }
  }
}());
$(function () {
  if ($('#slider').length) {
    sliderCont.init();
  }
});
var animateSkills = (function () {

  var checkDistance = function (scrollTop, element) {
    var
      offset = element.offset().top,
      windowMargin = Math.ceil($(window).height() /1.5),
      topBorder = offset - scrollTop - windowMargin,
      bottomEdge = element.outerHeight(true) + offset,
      bottomBorder = scrollTop + windowMargin - bottomEdge;

    return topBorder <=0 && bottomBorder <=0;
  };

  var item = $('.c-skills-list__item');

  var animationActions = {
    toSkills: function () {
      item.addClass('active');
    }
  };

  return {
    init: function () {
      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();

        if (checkDistance(scrollTop, $('.animate'))) {
          animationActions['toSkills']();
        } else{
          //item.removeClass('active');
        }
      })
    }
  }
}());

$(function () {
  if ($('#skills').length) {
    animateSkills.init();
  }
});
//Карта на странице "обо мне"

$(function () {
	var Maps;
	var Routes;
	var App;
	var Utils;
	Utils = {
		settings: {
				debug: false
		},
		clickEvent: 'click',
		log: function(what) {
				if ( Utils.settings.debug && window.console ) {
						console.log(what);
				}
		}
	};

	//  Для быстрого использования
	var clickEvent = Utils.clickEvent,
						_log = Utils.log;
	Maps = {
		load: function() {
				_log( "Map: load script" );
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
						'callback=initMap&key=AIzaSyCoinv0op00s_n1cclfA0ExKG-yrhCGTq4';
				document.body.appendChild(script);
		},
		initSettings: function() {
				_log( "Map: init settings" );
				this.map = null;
				this.marker = null;
				this.settings = {
						zoom: 12,
						center: new google.maps.LatLng(60.011695, 30.256744),
						mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#444444"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "simplified"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#d5d5d5"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "color": "#61dac9"
                      },
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "color": "#61dac9"
                      },
                  ]
              }
            ],
						scrollwheel: false,
						mapTypeControl: false,
						panControl: true,
						panControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						zoomControl: true,
						zoomControlOptions: {
								position: google.maps.ControlPosition.LEFT_CENTER
						},
						scaleControl: false,
						streetViewControl: true
				};
		},
		init: function() {
				_log( "Map: init Map" );
				Maps.initSettings();
				Maps.map = new google.maps.Map(document.getElementById('map'),
						Maps.settings);
				Maps.marker = new google.maps.Marker({
						map: Maps.map,
						draggable: false,
						position: new google.maps.LatLng(60.011695, 30.256744)
				});
		}
	};
	//  Функция для обратного вызова карт при асинхронной загрузке
	window.initMap = function() {
		Maps.init();
	};
	Routes = {
		init: function() {
			_log( "Routes: init" );
				Maps.load();
		}
	};
	App = {
			init: function() {
					Routes.init();
			}
	};
	if ($('#map').length) {
    App.init();
  }
});
//Параллакс
var ParallaxScroll = (function () {
  return {
    init: function () {
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
              this.move(bg, wScroll, 45, 0);
              this.move(title, wScroll, 15, 50);
              this.move(user, wScroll, 5, 50);
            }
          }
        }());
        var wScroll = window.pageYOffset;

        parallax.init(wScroll);
      };
    }
  }
}());

var ParallaxMouse = (function () {

  return {
    init: function () {
      var
        parallaxContainer = document.getElementById('parallaxMouse'),
        layers = parallaxContainer.children;

      window.addEventListener('mousemove', function (e) {
        var
          pageX = e.pageX,
          pageY = e.pageY,
          initialX = (window.innerWidth / 2) - pageX,
          initialY = (window.innerHeight / 2) - pageY;

        [].slice.call(layers).forEach(function (layer, i) {
          var
            divider = i / 100,
            positionX = initialX * divider,
            positionY = initialY * divider,
            bottomPosition = (window.innerHeight / 2) * divider,
            layerStyle = layer.style,
            transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0)';

          layerStyle.transform = transformString;
          layerStyle.webkitTransform = transformString;
          layerStyle.oTransform = transformString;
          layerStyle.msTransform = transformString;
          layerStyle.bottom = '-' + bottomPosition + 'px';
        })
      });
    }
  }
}());

$(function () {
  if ($('#parallaxScroll').length) {
    ParallaxScroll.init();
  }
  if ($('#parallaxMouse').length) {
    ParallaxMouse.init();
  }
});

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
//Форма обратной связи на странице "портфолио"

var feedbackForm = (function () {

	var popup = $('#popup');
	popup.hide();

  return {
    init: function () {
      $("#feedbackForm").submit(function (event) {
        event.preventDefault();

        $('input[name=text]', "#feedbackForm").val('');
        $('input[name=email]', "#feedbackForm").val('');
        $('textarea[name=textarea]', "#feedbackForm").val('');
        popup.fadeIn('fast');

      });

      $('.js-close-popup').click(function () {
        popup.fadeOut('fast');
      });
    }
  }
}());

$(function () {
  if ($('#feedbackForm').length) {
    feedbackForm.init();
  }
});
//Блог на странице "блог"
var scrollMenu = (function () {
  var $news = $('.l-blog-data'),
    $item = $('.js-blog-item'),
    $wrapMenu = $('.js-blog-inner'),
    body = document.body,
    isPositionArticle = [],
    offsetHeight = 200,

    positionArticle = function (element) {
      var len = element.length;
      for (var i = 0; i < len; i++) {
        isPositionArticle[i] = {};
        isPositionArticle[i].top = element
            .eq(i)
            .offset()
            .top - offsetHeight;
        isPositionArticle[i].bottom = isPositionArticle[i].top + element
            .eq(i)
            .innerHeight();
      }
    },

    scrollPageFixMenu = function () {
      var scroll = window.pageYOffset;
      if (scroll < $news.offset().top) {
        $wrapMenu.removeClass('fixed');
      } else {
        $wrapMenu.addClass('fixed');
      }
    },

    scrollPage = function () {
      var scroll = window.pageYOffset;
      for (var i = 0; i < isPositionArticle.length; i++) {
        if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
          $('.l-blog-nav__item--news')
            .eq(i)
            .addClass('active')
            .siblings()
            .removeClass('active');
          $item
            .eq(i)
            .addClass('active')
            .siblings()
            .removeClass('active');
        }
      }
    },

    clickOnMenu = function (e) {
      var index = $(e.target).index();
      var sectionOffset = $news
        .eq(index)
        .offset()
        .top;
      $(document).off('scroll', scrollPage);
      $('body, html').animate({
        'scrollTop': sectionOffset
      }, function () {
        $(e.target)
          .addClass('active')
          .siblings()
          .removeClass('active');
        $(document).on('scroll', scrollPage);
      });
    },

    addListener = function () {
      $('.js-blog-nav').on('click', clickOnMenu);

      $(document).on('scroll', scrollPage);
      $(document).on('scroll', scrollPageFixMenu);

      $(window).on('load', function (e) {
        positionArticle($news);
      });

      $(window).on('resize', function (e) {
        positionArticle($news);
      });

      $('.l-news-menu__handler').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.l-news-menu').toggleClass('blocked');
      });
    };

  return {
    init: addListener
  }
}());

$(function () {
  if ($('#blog').length) {
    scrollMenu.init();
  }
});

//------------ block mail
const formMail = document.querySelector('#mail');

if (formMail) {
  formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
  e.preventDefault();
  var resultContainer = document.querySelector('.status');
  var data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/contact', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

function sendAjaxJson(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
}

//---- block Blog

const formBlog = document.querySelector('#blog');

if (formBlog) {
  formBlog.addEventListener('submit', prepareSendPost);
}

function prepareSendPost(e) {
  e.preventDefault();
  var resultContainer = document.querySelector('.status');
  var data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/addpost', data, function (data) {
    resultContainer.innerHTML = data;
  });
}
//---- block Login

const formLogin = document.querySelector('#login');

if (formLogin) {
  formLogin.addEventListener('submit', prepareAuth);
}

function prepareAuth(e) {
  e.preventDefault();
  var resultContainer = document.querySelector('.status');
  var data = {
    login: formLogin.login.value,
    password: formLogin.password.value
  };
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/login', data, function (data) {
    resultContainer.innerHTML = data;
  });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGhvcml6YXRpb24uanMiLCJwcmVsb2FkZXIuanMiLCJhbm10eHQuanMiLCJzbGlkZXIuanMiLCJhbmltYXRlLXNraWxscy5qcyIsIm1hcC5qcyIsInBhcmFsbGF4LmpzIiwiYmx1ci5qcyIsImZlZWRiYWNrLWZvcm0uanMiLCJibG9nLmpzIiwibWFpbC5qcyIsImxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL9Ch0YDQtdC70LrQsCDRgdC60YDQvtC70LAg0Log0L3Rg9C20L3QvtC80YMg0LHQu9C+0LrRg1xuXG52YXIgQXJyb3cgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgSGVpZ2h0ID0gJCgnLmpzLXNlY3Rpb24tdHdvJykub2Zmc2V0KCkudG9wO1xuXG4gICAgICAkKCcuYy1hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBIZWlnaHRcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSgpKTtcblxuLy/Qk9Cw0LzQsdGD0YDQs9C10YAt0LzQtdC90Y5cbnZhciBIYW1idXJnZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXJcbiAgICBoYW1idXJnZXIgPSAkKCcuanMtaGFtYnVyZ2VyJyksXG4gICAgbmF2Q29udGFpbmVyID0gJCgnLmpzLW5hdmlnYXRpb24nKSxcbiAgICBuYXZDb250ZW50ID0gJCgnLmMtbmF2aWdhdGlvbicpO1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgaGFtYnVyZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgIF90aGlzLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbmF2Q29udGVudC50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIG5hdkNvbnRhaW5lci50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjaGFtYnVyZ2VyJykubGVuZ3RoKSB7XG4gICAgSGFtYnVyZ2VyLmluaXQoKTtcbiAgfVxuICBpZiAoJCgnI2Fycm93JykubGVuZ3RoKSB7XG4gICAgQXJyb3cuaW5pdCgpO1xuICB9XG59KTsiLCIvL9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0L3QsCDQs9C70LDQstC90L7QuSDRgdGC0YDQsNC90LjRhtC1XG52YXIgQXV0aG9yaXphdGlvbkJ1dHRvbiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhclxuICAgIGF1dGhvcml6YXRpb24gPSAkKCcuanMtYXV0aG9yaXphdGlvbicpLFxuICAgIGNhcmRGbGlwID0gJCgnLmwtY2FyZF9fd3JhcHBlcicpO1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgYXV0aG9yaXphdGlvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJCgnI2F1dGhvcml6YXRpb25CdXR0b24nKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhcmRGbGlwLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0oKSk7XG5cbnZhciBBdXRob3JpemF0aW9uU3VibWl0ID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAkKFwiI2F1dGhvcml6YXRpb25cIikuc3VibWl0KGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICghKCQoXCIjbm9Sb2JvdFwiKS5wcm9wKFwiY2hlY2tlZFwiKSAmJiAkKCdpbnB1dFtuYW1lPXJhZGlvXTpjaGVja2VkJywgJyNhdXRob3JpemF0aW9uJykudmFsKCkgPT0gMSkpIHtcbiAgICAgICAgICAgICQoXCIjdmFsaWRhdGlvbjFcIikudGV4dCgn0KDQvtCx0L7RgtGLINC90LDQvCDQvdC1INC90YPQttC90YsnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjdmFsaWRhdGlvbjFcIikudGV4dCgn0JfQsNC80LXRh9Cw0YLQtdC70YzQvdC+ISDQodCw0LHQvNC40YIg0YDQtdCw0LvQuNC30YPRjiDQv9C+0LfQttC1Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjYXV0aG9yaXphdGlvbkJ1dHRvbicpLmxlbmd0aCkge1xuICAgIEF1dGhvcml6YXRpb25CdXR0b24uaW5pdCgpO1xuICB9XG4gIGlmICgkKCcjYXV0aG9yaXphdGlvbicpLmxlbmd0aCkge1xuICAgIEF1dGhvcml6YXRpb25TdWJtaXQuaW5pdCgpO1xuICB9XG59KTtcbiIsIi8v0L/RgNC10LvQvtCw0LTQtdGAINC00LvRjyDQstGB0LXRhSDRgdGC0YDQsNC90LjRhlxudmFyIHByZWxvYWRlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhclxuICAgIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKSxcbiAgICBwZXJzZW50c1RvdGFsID0gMCxcbiAgICBjYXJkQW5pbWF0ZSA9ICQoJy5sLWNhcmRfX3dyYXBwZXInKTtcbiAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChpbmQsIGVsZW1lbnQpIHtcblxuICAgIHZhclxuICAgICAgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG4gICAgICBwYXRoID0gJyc7XG4gICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XG5cbiAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcbiAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCcnKVxuICAgIH1cblxuICAgIGlmIChpc0ltZykge1xuICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJylcbiAgICB9XG5cbiAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XG4gIH0pO1xuXG4gIHZhciBzZXRQZXJzZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xuXG4gICAgdmFyIHBlcnNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqMTAwKTtcbiAgICAkKCcuanMtcGVyY2VudHMnKS50ZXh0KHBlcnNlbnRzICsgJyUnKTtcblxuICAgIGlmIChwZXJzZW50cyA+PSAxMDApIHtcbiAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgICBjYXJkQW5pbWF0ZS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xuICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcblxuICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xuICAgICAgdmFyIGZha2VJbWFnZXMgPSAkKCc8aW1nPicsIHtcbiAgICAgICAgYXR0cjoge1xuICAgICAgICAgIHNyYzogaW1nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmYWtlSW1hZ2VzLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwZXJzZW50c1RvdGFsKys7XG4gICAgICAgIHNldFBlcnNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcnNlbnRzVG90YWwpO1xuICAgICAgfSlcbiAgICB9KTtcblxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcbiAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XG4gICAgfVxuICB9XG59KCkpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgcHJlbG9hZGVyLmluaXQoKTtcbn0pOyIsIi8v0JDQvdC40LzQsNGG0LjRjyDQtNC70Y8g0LHRg9C60LIg0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgXCLQv9C+0YDRgtGE0L7Qu9C40L5cIlxyXG5cclxuaWYgKCQoJyNzbGlkZXInKS5sZW5ndGgpIHtcclxuICB2YXIgYXZpYXRpdGxlID0ge1xyXG4gICAgZ2VuZXJhdGU6IGZ1bmN0aW9uIChzdHJpbmcsIGJsb2NrKSB7XHJcbiAgICAgIHZhciB3b3Jkc0FycmF5ID0gc3RyaW5nLnNwbGl0KCcgJyksXHJcbiAgICAgICAgc3RyaW5nQXJyYXkgPSBzdHJpbmcuc3BsaXQoJycpLFxyXG4gICAgICAgIHNlbnRlbmNlID0gW10sXHJcbiAgICAgICAgd29yZCA9ICcnO1xyXG5cclxuICAgICAgYmxvY2sudGV4dCgnJyk7XHJcblxyXG4gICAgICB3b3Jkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKGN1cnJlbnRXb3JkKSB7XHJcbiAgICAgICAgdmFyIHdvcmRzQXJyYXkgPSBjdXJyZW50V29yZC5zcGxpdCgnJyk7XHJcblxyXG4gICAgICAgIHdvcmRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XHJcbiAgICAgICAgICB2YXIgbGV0dGVySHRtbCA9ICc8c3BhbiBjbGFzcz1cImxldHRlci1zcGFuXCI+JyArIGxldHRlciArICc8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICB3b3JkICs9IGxldHRlckh0bWw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciB3b3JkSFRNTCA9ICc8c3BhbiBjbGFzcz1cImxldHRlci13b3JkXCI+JyArIHdvcmQgKyAnPC9zcGFuPic7XHJcblxyXG4gICAgICAgIHNlbnRlbmNlLnB1c2god29yZEhUTUwpO1xyXG4gICAgICAgIHdvcmQgPSAnJztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBibG9jay5hcHBlbmQoc2VudGVuY2Uuam9pbignICcpKTtcclxuXHJcbiAgICAgIC8vINCw0L3QuNC80LDRhtC40Y8g0L/QvtGP0LLQu9C10L3QuNGPXHJcbiAgICAgIHZhciBsZXR0ZXJzID0gYmxvY2suZmluZCgnLmxldHRlci1zcGFuJyksXHJcbiAgICAgICAgY291bnRlciA9IDAsXHJcbiAgICAgICAgdGltZXIsXHJcbiAgICAgICAgZHVyYXRpb24gPSA1MDAgLyBzdHJpbmdBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzaG93TGV0dGVycygpIHtcclxuICAgICAgICB2YXIgY3VycmVudExldHRlciA9IGxldHRlcnMuZXEoY291bnRlcik7XHJcblxyXG4gICAgICAgIGN1cnJlbnRMZXR0ZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvdW50ZXIrKztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoc2hvd0xldHRlcnMsIGR1cmF0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2hvd0xldHRlcnMoKTtcclxuXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iLCIvL9Ch0LvQsNC50LTQtdGAINC90LAg0YHRgtGA0LDQvdC40YbQtSBcItC/0L7RgNGC0YTQvtC70LjQvlwiXG5cbnZhciBzbGlkZXJDb250ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFNsaWRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICB2YXIgbmV4dEJ0biA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGVyLWJ0aC0tbGVmdCcpLFxuICAgICAgcHJldkJ0biA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGVyLWJ0aC0tcmlnaHQnKSxcbiAgICAgIGl0ZW1zID0gbmV4dEJ0bi5maW5kKCcuanMtc2xpZGVyLWl0ZW0nKSxcbiAgICAgIGRpc3BsYXkgPSBjb250YWluZXIuZmluZCgnLmpzLXNsaWRlci1kaXNwbGF5JyksXG4gICAgICB0aXRsZSA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGVyLXN1YnRpdGxlJyksXG4gICAgICBza2lsbHMgPSBjb250YWluZXIuZmluZCgnLmpzLXNsaWRlci10ZWhub2xvZ2VzJyksXG4gICAgICBsaW5rID0gY29udGFpbmVyLmZpbmQoJy5qcy1zbGlkZXItc2l0ZScpLFxuICAgICAgaXRlbXNMZW5ndGggPSBpdGVtcy5sZW5ndGgsXG4gICAgICBkdXJhdGlvbiA9IDUwMCxcbiAgICAgIGZsYWcgPSB0cnVlO1xuXG4gICAgdmFyIHRpbWVvdXQ7XG5cbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuXG4gICAgdmFyIGdlbmVyYXRlTWFya3VwcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsaXN0ID0gbmV4dEJ0bi5maW5kKCcuanMtc2xpZGVyLWxpc3QnKSxcbiAgICAgICAgbWFya3VwcyA9IGxpc3QuY2xvbmUoKTtcblxuICAgICAgcHJldkJ0blxuICAgICAgICAuYXBwZW5kKG1hcmt1cHMpXG4gICAgICAgIC5maW5kKCcuanMtc2xpZGVyLWl0ZW0nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5lcSh0aGlzLmNvdW50ZXIgKyAxKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0RGF0YUFycmF5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkYXRhT2JqZWN0ID0ge1xuICAgICAgICBwaWNzOiBbXSxcbiAgICAgICAgdGl0bGU6IFtdLFxuICAgICAgICBza2lsbHM6IFtdLFxuICAgICAgICBsaW5rOiBbXVxuICAgICAgfTtcblxuICAgICAgJC5lYWNoKGl0ZW1zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgZGF0YU9iamVjdFxuICAgICAgICAgIC5waWNzXG4gICAgICAgICAgLnB1c2goJHRoaXMuZGF0YSgnZnVsbCcpKTtcbiAgICAgICAgZGF0YU9iamVjdFxuICAgICAgICAgIC50aXRsZVxuICAgICAgICAgIC5wdXNoKCR0aGlzLmRhdGEoJ3RpdGxlJykpO1xuICAgICAgICBkYXRhT2JqZWN0XG4gICAgICAgICAgLnNraWxsc1xuICAgICAgICAgIC5wdXNoKCR0aGlzLmRhdGEoJ3NraWxscycpKTtcbiAgICAgICAgZGF0YU9iamVjdFxuICAgICAgICAgIC5saW5rXG4gICAgICAgICAgLnB1c2goJHRoaXMuZGF0YSgnbGluaycpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGF0YU9iamVjdDtcbiAgICB9O1xuXG4gICAgdmFyIHNsaWRlSW5MZWZ0QnRuID0gZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKHNsaWRlIC0gMSksXG4gICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKTtcblxuICAgICAgYWN0aXZlSXRlbVxuICAgICAgICAuc3RvcCh0cnVlLCB0cnVlKVxuICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgJ3RvcCc6ICcxMDAlJ1xuICAgICAgICB9LCBkdXJhdGlvbik7XG5cbiAgICAgIHJlcUl0ZW1cbiAgICAgICAgLnN0b3AodHJ1ZSwgdHJ1ZSlcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICd0b3AnOiAnMCUnXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIC5jc3MoJ3RvcCcsICctMTAwJScpXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciBzbGlkZUluUmlnaHRCdG4gPSBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgIHZhciBpdGVtcyA9IHByZXZCdG4uZmluZCgnLmpzLXNsaWRlci1pdGVtJyksXG4gICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcbiAgICAgICAgcmVxU2xpZGUgPSBzbGlkZSArIDE7XG5cbiAgICAgIGlmIChyZXFTbGlkZSA+IGl0ZW1zTGVuZ3RoIC0gMSkge1xuICAgICAgICByZXFTbGlkZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXFJdGVtID0gaXRlbXMuZXEocmVxU2xpZGUpO1xuXG4gICAgICBhY3RpdmVJdGVtXG4gICAgICAgIC5zdG9wKHRydWUsIHRydWUpXG4gICAgICAgIC5hbmltYXRlKHtcbiAgICAgICAgICAndG9wJzogJy0xMDAlJ1xuICAgICAgICB9LCBkdXJhdGlvbik7XG5cbiAgICAgIHJlcUl0ZW1cbiAgICAgICAgLnN0b3AodHJ1ZSwgdHJ1ZSlcbiAgICAgICAgLmFuaW1hdGUoe1xuICAgICAgICAgICd0b3AnOiAnMCUnXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIC5jc3MoJ3RvcCcsICcxMDAlJylcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjaGFuZ2VNYWluUGljdHVyZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgdmFyIGltYWdlID0gZGlzcGxheS5maW5kKCcuanMtc2xpZGVyLWRpc3BsYXktaW1nJyk7XG4gICAgICB2YXIgZGF0YSA9IGdldERhdGFBcnJheXMoKTtcblxuICAgICAgaW1hZ2VcbiAgICAgICAgLnN0b3AodHJ1ZSwgdHJ1ZSlcbiAgICAgICAgLmZhZGVPdXQoZHVyYXRpb24gLyAyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaW1hZ2UuYXR0cignc3JjJywgZGF0YS5waWNzW3NsaWRlXSk7XG4gICAgICAgICAgJCh0aGlzKS5mYWRlSW4oZHVyYXRpb24gLyAyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjaGFuZ2VUZXh0RGF0YSA9IGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgdmFyIGRhdGEgPSBnZXREYXRhQXJyYXlzKCk7XG5cbiAgICAgIGF2aWF0aXRsZS5nZW5lcmF0ZShkYXRhLnRpdGxlW3NsaWRlXSwgdGl0bGUsICdydScpO1xuXG4gICAgICBhdmlhdGl0bGUuZ2VuZXJhdGUoZGF0YS5za2lsbHNbc2xpZGVdLCBza2lsbHMsICdlbicpO1xuXG4gICAgICBsaW5rLmF0dHIoJ2hyZWYnLCBkYXRhLmxpbmtbc2xpZGVdKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhhdCA9IHRoaXMsXG4gICAgICAgIGRhdGEgPSBnZXREYXRhQXJyYXlzKCk7XG5cbiAgICAgIGdlbmVyYXRlTWFya3VwcygpO1xuXG4gICAgICBuZXh0QnRuXG4gICAgICAgIC5maW5kKCcuanMtc2xpZGVyLWl0ZW0nKVxuICAgICAgICAuZXEoX3RoYXQuY291bnRlciAtIDEpXG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgIHByZXZCdG5cbiAgICAgICAgLmZpbmQoJy5qcy1zbGlkZXItaXRlbScpXG4gICAgICAgIC5lcShfdGhhdC5jb3VudGVyICsgMSlcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgZGlzcGxheVxuICAgICAgICAuZmluZCgnLmpzLXNsaWRlci1kaXNwbGF5LWltZycpXG4gICAgICAgIC5hdHRyKCdzcmMnLCBkYXRhLnBpY3NbX3RoYXQuY291bnRlcl0pO1xuXG4gICAgICAvLyDRgtC10LrRgdGC0L7QstGL0LUg0L7Qv9C40YHQsNC90LjRj1xuICAgICAgY2hhbmdlVGV4dERhdGEoX3RoYXQuY291bnRlcik7XG5cbiAgICB9O1xuXG4gICAgdGhpcy5tb3ZlU2xpZGUgPSBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgX3RoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgZGlyZWN0aW9ucyA9IHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgaWYgKF90aGF0LmNvdW50ZXIgPCBpdGVtc0xlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIF90aGF0LmNvdW50ZXIrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoYXQuY291bnRlciA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoYXQuY291bnRlciA+IDApIHtcbiAgICAgICAgICAgIF90aGF0LmNvdW50ZXItLTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoYXQuY291bnRlciA9IGl0ZW1zTGVuZ3RoIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGRpcmVjdGlvbnNbZGlyZWN0aW9uXSgpO1xuXG4gICAgICBpZiAoZmxhZykge1xuICAgICAgICBmbGFnID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB9LCBkdXJhdGlvbiArIDUwKTtcblxuICAgICAgICBzbGlkZUluTGVmdEJ0bihfdGhhdC5jb3VudGVyKTtcbiAgICAgICAgc2xpZGVJblJpZ2h0QnRuKF90aGF0LmNvdW50ZXIpO1xuICAgICAgICBjaGFuZ2VNYWluUGljdHVyZShfdGhhdC5jb3VudGVyKTtcbiAgICAgICAgY2hhbmdlVGV4dERhdGEoX3RoYXQuY291bnRlcik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzbGlkZXIgPSBuZXcgU2xpZGVyKCQoJy5sLXdvcmtzX19jb250ZW50JykpO1xuICAgICAgc2xpZGVyLnNldERlZmF1bHRzKCk7XG5cbiAgICAgICQoJy5qcy1zbGlkZXItYnRoLS1sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzbGlkZXIubW92ZVNsaWRlKCdwcmV2Jyk7XG4gICAgICB9KTtcblxuICAgICAgJCgnLmpzLXNsaWRlci1idGgtLXJpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzbGlkZXIubW92ZVNsaWRlKCduZXh0Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0oKSk7XG4kKGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQoJyNzbGlkZXInKS5sZW5ndGgpIHtcbiAgICBzbGlkZXJDb250LmluaXQoKTtcbiAgfVxufSk7IiwidmFyIGFuaW1hdGVTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24gKHNjcm9sbFRvcCwgZWxlbWVudCkge1xuICAgIHZhclxuICAgICAgb2Zmc2V0ID0gZWxlbWVudC5vZmZzZXQoKS50b3AsXG4gICAgICB3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8xLjUpLFxuICAgICAgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luLFxuICAgICAgYm90dG9tRWRnZSA9IGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQsXG4gICAgICBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xuXG4gICAgcmV0dXJuIHRvcEJvcmRlciA8PTAgJiYgYm90dG9tQm9yZGVyIDw9MDtcbiAgfTtcblxuICB2YXIgaXRlbSA9ICQoJy5jLXNraWxscy1saXN0X19pdGVtJyk7XG5cbiAgdmFyIGFuaW1hdGlvbkFjdGlvbnMgPSB7XG4gICAgdG9Ta2lsbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgJCgnLmFuaW1hdGUnKSkpIHtcbiAgICAgICAgICBhbmltYXRpb25BY3Rpb25zWyd0b1NraWxscyddKCk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAvL2l0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjc2tpbGxzJykubGVuZ3RoKSB7XG4gICAgYW5pbWF0ZVNraWxscy5pbml0KCk7XG4gIH1cbn0pOyIsIi8v0JrQsNGA0YLQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgXCLQvtCx0L4g0LzQvdC1XCJcblxuJChmdW5jdGlvbiAoKSB7XG5cdHZhciBNYXBzO1xuXHR2YXIgUm91dGVzO1xuXHR2YXIgQXBwO1xuXHR2YXIgVXRpbHM7XG5cdFV0aWxzID0ge1xuXHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdGRlYnVnOiBmYWxzZVxuXHRcdH0sXG5cdFx0Y2xpY2tFdmVudDogJ2NsaWNrJyxcblx0XHRsb2c6IGZ1bmN0aW9uKHdoYXQpIHtcblx0XHRcdFx0aWYgKCBVdGlscy5zZXR0aW5ncy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHdoYXQpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8vICDQlNC70Y8g0LHRi9GB0YLRgNC+0LPQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRj1xuXHR2YXIgY2xpY2tFdmVudCA9IFV0aWxzLmNsaWNrRXZlbnQsXG5cdFx0XHRcdFx0XHRfbG9nID0gVXRpbHMubG9nO1xuXHRNYXBzID0ge1xuXHRcdGxvYWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfbG9nKCBcIk1hcDogbG9hZCBzY3JpcHRcIiApO1xuXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdFx0XHRcdHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP3Y9My5leHAmc2Vuc29yPWZhbHNlJicgK1xuXHRcdFx0XHRcdFx0J2NhbGxiYWNrPWluaXRNYXAma2V5PUFJemFTeUNvaW52MG9wMDBzX24xY2NsZkEwRXhLRy15cmhDR1RxNCc7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0XHR9LFxuXHRcdGluaXRTZXR0aW5nczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF9sb2coIFwiTWFwOiBpbml0IHNldHRpbmdzXCIgKTtcblx0XHRcdFx0dGhpcy5tYXAgPSBudWxsO1xuXHRcdFx0XHR0aGlzLm1hcmtlciA9IG51bGw7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0XHR6b29tOiAxMixcblx0XHRcdFx0XHRcdGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg2MC4wMTE2OTUsIDMwLjI1Njc0NCksXG5cdFx0XHRcdFx0XHRtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgICAgc3R5bGVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZDVkNWQ1XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZDZkNmQ2XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxuICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZDZkNmQ2XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MWRhYzlcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcbiAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYxZGFjOVwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcblx0XHRcdFx0XHRcdHNjcm9sbHdoZWVsOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1hcFR5cGVDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0XHRcdHBhbkNvbnRyb2w6IHRydWUsXG5cdFx0XHRcdFx0XHRwYW5Db250cm9sT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uTEVGVF9DRU5URVJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR6b29tQ29udHJvbDogdHJ1ZSxcblx0XHRcdFx0XHRcdHpvb21Db250cm9sT3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uTEVGVF9DRU5URVJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzY2FsZUNvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IHRydWVcblx0XHRcdFx0fTtcblx0XHR9LFxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfbG9nKCBcIk1hcDogaW5pdCBNYXBcIiApO1xuXHRcdFx0XHRNYXBzLmluaXRTZXR0aW5ncygpO1xuXHRcdFx0XHRNYXBzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLFxuXHRcdFx0XHRcdFx0TWFwcy5zZXR0aW5ncyk7XG5cdFx0XHRcdE1hcHMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdFx0XHRtYXA6IE1hcHMubWFwLFxuXHRcdFx0XHRcdFx0ZHJhZ2dhYmxlOiBmYWxzZSxcblx0XHRcdFx0XHRcdHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDYwLjAxMTY5NSwgMzAuMjU2NzQ0KVxuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdC8vICDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L7QsdGA0LDRgtC90L7Qs9C+INCy0YvQt9C+0LLQsCDQutCw0YDRgiDQv9GA0Lgg0LDRgdC40L3RhdGA0L7QvdC90L7QuSDQt9Cw0LPRgNGD0LfQutC1XG5cdHdpbmRvdy5pbml0TWFwID0gZnVuY3Rpb24oKSB7XG5cdFx0TWFwcy5pbml0KCk7XG5cdH07XG5cdFJvdXRlcyA9IHtcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdF9sb2coIFwiUm91dGVzOiBpbml0XCIgKTtcblx0XHRcdFx0TWFwcy5sb2FkKCk7XG5cdFx0fVxuXHR9O1xuXHRBcHAgPSB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRSb3V0ZXMuaW5pdCgpO1xuXHRcdFx0fVxuXHR9O1xuXHRpZiAoJCgnI21hcCcpLmxlbmd0aCkge1xuICAgIEFwcC5pbml0KCk7XG4gIH1cbn0pOyIsIi8v0J/QsNGA0LDQu9C70LDQutGBXG52YXIgUGFyYWxsYXhTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmFsbGF4PSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZXJvLWJnJyksXG4gICAgICAgICAgICB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZXJvLXRpdGxlJyksXG4gICAgICAgICAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXVzZXInKTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIHN0cmFmZSA9IHdpbmRvd1Njcm9sbC8tc3RyYWZlQW1vdW50ICsgJyUnLFxuICAgICAgICAgICAgICAgIHN0eWxlID0gYmxvY2suc3R5bGUsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJysgc3RyYWZlICsnLCAwKSc7XG5cbiAgICAgICAgICAgICAgc3R5bGUudG9wID0gc3RyYWZlO1xuICAgICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1LCAwKTtcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlKHRpdGxlLCB3U2Nyb2xsLCAxNSwgNTApO1xuICAgICAgICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgNSwgNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSgpKTtcbiAgICAgICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG59KCkpO1xuXG52YXIgUGFyYWxsYXhNb3VzZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXJcbiAgICAgICAgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXhNb3VzZScpLFxuICAgICAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIHBhZ2VYID0gZS5wYWdlWCxcbiAgICAgICAgICBwYWdlWSA9IGUucGFnZVksXG4gICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG4gICAgICAgICAgdmFyXG4gICAgICAgICAgICBkaXZpZGVyID0gaSAvIDEwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcbiAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcbiAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcbiAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCAnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XG5cbiAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICBsYXllclN0eWxlLm9UcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgbGF5ZXJTdHlsZS5tc1RyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjcGFyYWxsYXhTY3JvbGwnKS5sZW5ndGgpIHtcbiAgICBQYXJhbGxheFNjcm9sbC5pbml0KCk7XG4gIH1cbiAgaWYgKCQoJyNwYXJhbGxheE1vdXNlJykubGVuZ3RoKSB7XG4gICAgUGFyYWxsYXhNb3VzZS5pbml0KCk7XG4gIH1cbn0pO1xuIiwiLy9CTFVSLdGN0YTRhNC10LrRgiDQvdCwINGB0YLRgNCw0L3QuNGG0LUgXCLQv9C+0YDRgtGE0L7Qu9C40L5cIlxudmFyIGJsdXIgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1mZWVkYmFjay13cmFwcGVyJyksXG5cdCAgICBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1mZWVkYmFjay1iZycpLFxuXHQgICAgYmdTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJldmlld3MtYmcnKTtcblxuXHRmdW5jdGlvbiBzZXQoKSB7XG5cdFx0dmFyIGJnV2lkdGggPSBiZ1NlY3Rpb24ub2Zmc2V0V2lkdGgsXG5cdFx0ICAgIHBvc0xlZnQgPSAtd3JhcC5vZmZzZXRMZWZ0LFxuXHRcdCAgICBwb3NUb3AgPSAtd3JhcC5vZmZzZXRUb3AsXG5cdFx0ICAgIG9mZnNldEltZ1RvcCA9IGJnU2VjdGlvbi5vZmZzZXRUb3AsXG5cdFx0ICAgIG9mZnNldFRvcCA9IHBvc1RvcCArIG9mZnNldEltZ1RvcDtcblxuXHRcdGJnLnN0eWxlLmJhY2tncm91bmRTaXplID0gYmdXaWR0aCArICdweCAnICsgJ2F1dG8nO1xuXHRcdGJnLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHggJyArIG9mZnNldFRvcCArICdweCc7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHRzZXQoKTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldCk7XG5cdFx0fVxuXHR9O1xufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjZmVlZGJhY2tGb3JtJykubGVuZ3RoKSB7XG4gICAgYmx1ci5pbml0KCk7XG4gIH1cblxuICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJyNmZWVkYmFja0Zvcm0nKS5sZW5ndGgpIHtcbiAgICAgIGJsdXIuaW5pdCgpO1xuICAgIH1cbiAgfVxufSk7IiwiLy/QpNC+0YDQvNCwINC+0LHRgNCw0YLQvdC+0Lkg0YHQstGP0LfQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUgXCLQv9C+0YDRgtGE0L7Qu9C40L5cIlxuXG52YXIgZmVlZGJhY2tGb3JtID0gKGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgcG9wdXAgPSAkKCcjcG9wdXAnKTtcblx0cG9wdXAuaGlkZSgpO1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgJChcIiNmZWVkYmFja0Zvcm1cIikuc3VibWl0KGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9dGV4dF0nLCBcIiNmZWVkYmFja0Zvcm1cIikudmFsKCcnKTtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1lbWFpbF0nLCBcIiNmZWVkYmFja0Zvcm1cIikudmFsKCcnKTtcbiAgICAgICAgJCgndGV4dGFyZWFbbmFtZT10ZXh0YXJlYV0nLCBcIiNmZWVkYmFja0Zvcm1cIikudmFsKCcnKTtcbiAgICAgICAgcG9wdXAuZmFkZUluKCdmYXN0Jyk7XG5cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuanMtY2xvc2UtcG9wdXAnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBvcHVwLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSgpKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkKCcjZmVlZGJhY2tGb3JtJykubGVuZ3RoKSB7XG4gICAgZmVlZGJhY2tGb3JtLmluaXQoKTtcbiAgfVxufSk7IiwiLy/QkdC70L7QsyDQvdCwINGB0YLRgNCw0L3QuNGG0LUgXCLQsdC70L7Qs1wiXG52YXIgc2Nyb2xsTWVudSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciAkbmV3cyA9ICQoJy5sLWJsb2ctZGF0YScpLFxuICAgICRpdGVtID0gJCgnLmpzLWJsb2ctaXRlbScpLFxuICAgICR3cmFwTWVudSA9ICQoJy5qcy1ibG9nLWlubmVyJyksXG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgaXNQb3NpdGlvbkFydGljbGUgPSBbXSxcbiAgICBvZmZzZXRIZWlnaHQgPSAyMDAsXG5cbiAgICBwb3NpdGlvbkFydGljbGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGxlbiA9IGVsZW1lbnQubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpc1Bvc2l0aW9uQXJ0aWNsZVtpXSA9IHt9O1xuICAgICAgICBpc1Bvc2l0aW9uQXJ0aWNsZVtpXS50b3AgPSBlbGVtZW50XG4gICAgICAgICAgICAuZXEoaSlcbiAgICAgICAgICAgIC5vZmZzZXQoKVxuICAgICAgICAgICAgLnRvcCAtIG9mZnNldEhlaWdodDtcbiAgICAgICAgaXNQb3NpdGlvbkFydGljbGVbaV0uYm90dG9tID0gaXNQb3NpdGlvbkFydGljbGVbaV0udG9wICsgZWxlbWVudFxuICAgICAgICAgICAgLmVxKGkpXG4gICAgICAgICAgICAuaW5uZXJIZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2Nyb2xsUGFnZUZpeE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgaWYgKHNjcm9sbCA8ICRuZXdzLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAkd3JhcE1lbnUucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkd3JhcE1lbnUuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNjcm9sbFBhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpc1Bvc2l0aW9uQXJ0aWNsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2Nyb2xsID49IGlzUG9zaXRpb25BcnRpY2xlW2ldLnRvcCAmJiBzY3JvbGwgPD0gaXNQb3NpdGlvbkFydGljbGVbaV0uYm90dG9tKSB7XG4gICAgICAgICAgJCgnLmwtYmxvZy1uYXZfX2l0ZW0tLW5ld3MnKVxuICAgICAgICAgICAgLmVxKGkpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkaXRlbVxuICAgICAgICAgICAgLmVxKGkpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGlja09uTWVudSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgaW5kZXggPSAkKGUudGFyZ2V0KS5pbmRleCgpO1xuICAgICAgdmFyIHNlY3Rpb25PZmZzZXQgPSAkbmV3c1xuICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgIC5vZmZzZXQoKVxuICAgICAgICAudG9wO1xuICAgICAgJChkb2N1bWVudCkub2ZmKCdzY3JvbGwnLCBzY3JvbGxQYWdlKTtcbiAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgJ3Njcm9sbFRvcCc6IHNlY3Rpb25PZmZzZXRcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChlLnRhcmdldClcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgc2Nyb2xsUGFnZSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcuanMtYmxvZy1uYXYnKS5vbignY2xpY2snLCBjbGlja09uTWVudSk7XG5cbiAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBzY3JvbGxQYWdlKTtcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBzY3JvbGxQYWdlRml4TWVudSk7XG5cbiAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHBvc2l0aW9uQXJ0aWNsZSgkbmV3cyk7XG4gICAgICB9KTtcblxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBwb3NpdGlvbkFydGljbGUoJG5ld3MpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5sLW5ld3MtbWVudV9faGFuZGxlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubC1uZXdzLW1lbnUnKS50b2dnbGVDbGFzcygnYmxvY2tlZCcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGFkZExpc3RlbmVyXG4gIH1cbn0oKSk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICBpZiAoJCgnI2Jsb2cnKS5sZW5ndGgpIHtcbiAgICBzY3JvbGxNZW51LmluaXQoKTtcbiAgfVxufSk7XG4iLCIvLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXG5jb25zdCBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWlsJyk7XG5cbmlmIChmb3JtTWFpbCkge1xuICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIHZhciBkYXRhID0ge1xuICAgIG5hbWU6IGZvcm1NYWlsLm5hbWUudmFsdWUsXG4gICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLFxuICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgfTtcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvY29udGFjdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICB9O1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbi8vLS0tLSBibG9jayBCbG9nXG5cbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuaWYgKGZvcm1CbG9nKSB7XG4gIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgdmFyIGRhdGEgPSB7XG4gICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxuICB9O1xuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICBzZW5kQWpheEpzb24oJy9hZGRwb3N0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59IiwiLy8tLS0tIGJsb2NrIExvZ2luXG5cbmNvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xuXG5pZiAoZm9ybUxvZ2luKSB7XG4gIGZvcm1Mb2dpbi5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlQXV0aCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVBdXRoKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICB2YXIgZGF0YSA9IHtcbiAgICBsb2dpbjogZm9ybUxvZ2luLmxvZ2luLnZhbHVlLFxuICAgIHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcbiAgfTtcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvbG9naW4nLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn0iXX0=
