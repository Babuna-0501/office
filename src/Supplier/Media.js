import React from 'react';

function Price(props) {
  const up = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById('root')
      .insertAdjacentHTML(
        'beforeEnd',
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="uploader' +
          id +
          '" multiple /></form>'
      );
    document.getElementById('uploader' + id).click();
    document
      .getElementById('uploader' + id)
      .addEventListener('change', () => upload(id), false);
  };
  const upload = form => {
    const uploader = document.getElementById('uploader' + form);
    var fileField = document.getElementById('uploader' + form);
    let formData = new FormData();
    for (let i = 0; i < uploader.files.length; i++) {
      formData.append('files', fileField.files[i]);
    }
    fetch(
      `${process.env.REACT_APP_MEDIA_UPLOAD_URL}?preset=product&ebazaar_admin_token=` +
        localStorage.getItem('ebazaar_admin_token'),
      { method: 'post', body: formData }
    )
      .then(r => r.json())
      .then(response => {
        if (response.status === 200) {
          response.data.map(img => {
            props.setLogo(
              `${process.env.REACT_APP_MEDIA_URL}/product/${img.image}`
            );
          });
          props.setMedia(false);
        } else {
          alert('Алдаа');
        }
      });
    document.getElementById(form).remove();
  };

  return (
    <div id='bg'>
      <div id='foo'>
        <span className='close' onClick={() => props.setMedia(false)}>
          Close
        </span>
        <h1>Нийлүүлэгчийн зураг</h1>
        <div id='images'>
          <img
            src='https://ebazaar.mn/icon/photo-add.svg'
            onClick={() => up()}
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

export default Price;
