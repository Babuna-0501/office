import React, { useContext, useState } from 'react';
import { Switch } from 'antd';
import css from './brandmodified.module.css';
import closeIcon from '../../assets/close.svg';
import ProductHook from '../../Hooks/ProductHook';
import imagIcon from '../../assets/photo-add.svg';
import deleteIconred from '../../assets/delete_red_small.svg';
import myHeaders from '../../components/MyHeader/myHeader';

const BrandModified = () => {
  const prdctx = useContext(ProductHook);
  console.log('CONTEXT:  ', prdctx);
  const [data, setData] = useState(prdctx.brandID);
  const [nameValue, setNameValue] = useState(prdctx.brandID.name);
  const [nameSlug, setNameSlug] = useState(prdctx.brandID.slug);
  const [imageBrand, setImageBrand] = useState([prdctx.brandID.image]);
  const [checkedValue, setCheckedValue] = useState(1);
  const [active, setActive] = useState(
    prdctx.brandID.active === 0 ? false : true
  );

  console.log('IMAGE', prdctx.brandID.image);
  const closeHandler = () => {
    prdctx.setBrandFix(false);
  };
  // const onChange = checked => {
  // 	let raw = {
  // 		// brand_id: data.id,
  // 		id: data.id,
  // 		active: active ? 1 : 0,
  // 		name: nameValue,
  // 		slug: nameSlug,
  // 	};
  // 	var requestOptions = {
  // 		method: "PUT",
  // 		headers: myHeaders,
  // 		redirect: "follow",
  // 		body: JSON.stringify(raw),
  // 	};
  // 	// console.log("requestOptions", requestOptions);
  // 	let url = `${process.env.REACT_APP_API_URL2}/brand`;
  // 	fetch(url, requestOptions)
  // 		.then(r => r.json())
  // 		.then(res => {
  // 			console.log("res brand update", res);
  // 			setCheckedValue(checked);
  // 		})
  // 		.catch(error => {
  // 			console.log("Brand update error", error);
  // 		});
  // };
  const cancelHandler = () => {
    prdctx.setBrandFix(false);
  };
  const confirmHandler = () => {
    let raw = {
      id: data.id,
      name: nameValue,
      brand_code: nameSlug,
      image: imageBrand,
      active: active ? 1 : 0
    };
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(raw)
    };
    console.log('requestOptions', requestOptions);
    let url = `${process.env.REACT_APP_API_URL2}/brand`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('res brand update', res);
        // if (res.code === 200) {
        alert('Амжилттай брэндээ шинэчлэлээ.');
        prdctx.setBrandRender(!prdctx.brandRender);
        closeHandler();
        // }
      })
      .catch(error => {
        console.log('Brand update error', error);
        alert('Амжилтгүй.', error);
      });
  };

  /////
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
    let files = [];
    var fileField = document.getElementById('uploader' + form);
    let container = document.getElementById('uploaded-images');
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
        console.log('image response', response);
        let temp = [];
        if (response.status === 200) {
          response.data.map(img => {
            temp.push(
              `${process.env.REACT_APP_MEDIA_URL}/original/` + img.image
            );
          });
        }
        setImageBrand(temp.join(','));
      });
    document.getElementById(form).remove();
  };
  // const deleteBrand = () => {
  //   let raw = {
  //     ...data,
  //     is_active: 0,
  //   };
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //     body: JSON.stringify(raw),
  //   };
  //   console.log("requestOptions delete", requestOptions);
  //   let url = `${process.env.REACT_APP_API_URL2}/apibrand/update`;
  //   fetch(url, requestOptions)
  //     .then((r) => r.json())
  //     .then((res) => {
  //       if (res.code === 200) {
  //         alert("Амжилттай брэндээ устгалаа.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Brand update error", error);
  //       alert("Амжилтгүй.", error);
  //     });
  // };

  {
    /* <div className={css.imgCloseContainer}>
		<img
			src={closeIcon}
			alt="removeIMG"
			style={{ height: "116px", width: "116px" }}
			className={css.imgRemove}
		/>
	</div> */
  }
  // let renderHTML = imageBrand.map((i, idx) => {
  // 	return (
  // 		<div className={css.relativeContainer} key={idx}>
  // 			<img
  // 				src={i.replace("original", "product")}
  // 				alt="brandLOGO"
  // 				style={{ height: "116px", width: "116px" }}
  // 				className={css.brandImg}
  // 			/>
  // 		</div>
  // 	);
  // });

  /////
  return (
    <div className={css.container}>
      <div className={css.first}></div>
      <div className={css.wrapper}>
        <div className={css.header}>
          <p>Брэнд тохиргоо</p>
          <img src={closeIcon} onClick={closeHandler} />
        </div>
        <div className={css.wrapperMiddle}>
          <div className={css.middleFirst}>
            <img src={imagIcon} onClick={up} />
            <span>Брэнд лого оруулах</span>
          </div>
          {/* {renderHTML} */}
          <div onClick={() => setActive(!active)}>
            {/* <Switch defaultChecked onChange={onChange}/> */}
            {!active ? (
              <img src='https://admin.ebazaar.mn/media/off.svg' />
            ) : (
              <img src='https://admin.ebazaar.mn/media/on.svg' />
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
        <div className={css.deleteContainer}>
          <img src={deleteIconred} onClick={() => console.log('DELETE')} />
          <label>Брэндийг устгах</label>
        </div>
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

export default BrandModified;
