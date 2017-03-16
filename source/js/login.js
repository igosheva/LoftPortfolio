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