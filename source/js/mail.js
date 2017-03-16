//------------ block mail
const formMail = document.querySelector('#feedbackForm');

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
  sendAjaxJson('/portfolio', data, function (data) {
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