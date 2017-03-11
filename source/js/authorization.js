var AuthorizationButton = (function () {
  var
    authorization = $('.js-authorization'),
    card = $('.l-card__wrapper');

  return {
    init: function () {
      authorization.on('click', function (e) {
        e.preventDefault();

        var _this = $(this);

        _this.toggleClass('active');
        setTimeout(function () {
          card.toggleClass('active');
        }, 500);
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
            $("#validation").text('Роботы нам не нужны');
        } else {
            $("#validation").text('Верю, что человек. Сабмит реализую позже');
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

/*
$("#connect-me-form").submit(function (event) {
    $('input[name=name]', "#connect-me-form").val('');
    $('input[name=email]', "#connect-me-form").val('');
    $('input[name=message]', "#connect-me-form").val('');
    $("#validation-message").text('Форму отправлено');

    event.preventDefault();
});

$('input', "#connect-me-form").on('change', function () {
    $("#validation-message").text('');
});*/
