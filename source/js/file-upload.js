const formUpload = document.querySelector('#upload');

function fileUpload(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
}

function prepareSendFile(e) {
  e.preventDefault();
  var resultContainer = document.querySelector('.status');
  var formData = new FormData();
  var file = document
    .querySelector('#file-select')
    .files[0];
  var name = document
    .querySelector('#file-desc')
    .value;

  formData.append('photo', file, file.name);
  formData.append('name', name);

  resultContainer.innerHTML = 'Uploading...';
  fileUpload('/upload', formData, function (data) {
    resultContainer.innerHTML = data;
  });
}

if (formUpload) {
  formUpload.addEventListener('submit', prepareSendFile);
}
