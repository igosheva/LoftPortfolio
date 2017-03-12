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
