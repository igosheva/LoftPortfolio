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
  sendMailData('/contact', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

function sendMailData(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
}
