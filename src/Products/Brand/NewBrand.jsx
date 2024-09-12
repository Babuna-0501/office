import React from 'react';
import css from './newbrand.module.css';
import { Switch } from 'antd';
import closeIcon from '../../assets/close.svg';
import ProductHook from '../../Hooks/ProductHook';
import imagIcon from '../../assets/photo-add.svg';
import myHeaders from '../../components/MyHeader/myHeader';
import { useState } from 'react';
import { useContext } from 'react';

const NewBrand = props => {
  const prdctx = useContext(ProductHook);
  const [nameValue, setNameValue] = useState('');
  const [nameSlug, setNameSlug] = useState('');
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(true);

  console.log('NAME: ', nameValue);
  console.log('SLUG: ', nameSlug);

  const closeHandler = () => {
    setNameValue('');
    setNameSlug('');
    setImages([]);
    setActive(0);
    prdctx.setBrandNew(false);
  };
  const cancelHandler = () => {
    setNameValue('');
    setNameSlug('');
    setImages([]);
    setActive(0);
    prdctx.setBrandNew(false);
  };
  const confirmHandler = () => {
    // prdctx.setBrandNew(false);
    if (nameValue === null || nameValue === '') {
      alert('Брэндийн нэр бичнэ үү');
      return;
    }
    if (nameSlug === null || nameSlug === '') {
      alert('Брэндийн SLUG бичнэ үү');
      return;
    }

    const info = {
      name: nameValue,
      slug: nameSlug,
      image:
        images[0] === undefined
          ? `${process.env.REACT_APP_MEDIA_URL}/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg`
          : images[0],
      active: active ? 1 : 0
    };

    // console.log("INFO", info);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(info)
    };

    fetch(`${process.env.REACT_APP_API_URL2}/brand`, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('Data:', res.data);
        alert('Брэнд амжилттай бүртгэлээ.');
        prdctx.setBrandRender(!prdctx.brandRender);
        closeHandler();
      })
      .catch(err => {
        console.log('ERROR:  ', err);
      });
  };

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

    for (let i = 0; i < uploader.files.length; ++i) {
      formData.append('files', fileField.files[i]);
    }
    fetch(
      `${process.env.REACT_APP_MEDIA_UPLOAD_URL}?preset=product&ebazaar_admin_token=` +
        localStorage.getItem('ebazaar_admin_token'),
      { method: 'POST', body: formData }
    )
      .then(r => r.json())
      .then(res => {
        let temp = [];
        if (res.status === 200) {
          res.data.map(img => {
            temp.push(
              `${process.env.REACT_APP_MEDIA_URL}/original/` + img.image
            );
          });
        }
        setImages(prev => [...temp]);
      });
  };

  let renderHTML = images.map((i, idx) => {
    return (
      <div className={css.relativeContainer} key={idx}>
        {/* <div className={css.imgCloseContainer}>
					<img
						src={closeIcon}
						alt="removeIMG"
						style={{ height: "116px", width: "116px" }}
						className={css.imgRemove}
					/>
				</div> */}
        <img
          src={i.replace('original', 'product')}
          alt='brandLOGO'
          style={{ height: '116px', width: '116px' }}
          className={css.brandImg}
        />
      </div>
    );
  });

  return (
    <div className={css.container}>
      <div className={css.first}></div>
      <div className={css.wrapper}>
        <div className={css.header}>
          <p>Шинэ брэнд нэмэх</p>
          <img src={closeIcon} onClick={closeHandler} />
        </div>
        <div className={css.wrapperMiddle}>
          <div className={css.middleFirst}>
            <div>
              <img src={imagIcon} onClick={() => up()} />
              <span>Брэнд лого оруулах</span>
            </div>
          </div>
          {renderHTML}

          <div onClick={() => setActive(!active)}>
            {/* <Switch /> */}
            {!active ? (
              <img src='/media/off.svg' />
            ) : (
              <img src='/media/on.svg' />
            )}
          </div>
        </div>
        <div className={css.inputContainer}>
          <label>Брэндийн нэр</label>
          <input
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
          />
        </div>
        <div className={css.inputContainer}>
          <label>Slug</label>
          <input
            placeholder='Slug бичих'
            value={nameSlug}
            onChange={e => setNameSlug(e.target.value)}
          />
        </div>
        {/* <div className={css.deleteContainer}>
					<img src={deleteIconred} onClick={deleteBrand} />
					<label>Брэндийг устгах</label>
				</div> */}
        <div className={css.btnContainer}>
          <div className={css.deletebtn} onClick={cancelHandler}>
            Цуцлах
          </div>
          <div className={css.confirmbtn} onClick={confirmHandler}>
            Хадгалах
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBrand;
