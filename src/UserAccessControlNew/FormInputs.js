import { useState, useContext, useEffect } from 'react';

const FormInputs = props => {
  const product = props.product;
  console.log(product._id);
  const [productGroup, setProductGroup] = useState(null);
  const [mustHave, setMustHave] = useState(
    props.product !== 'new' && product.attributes['musthave'] === true
      ? true
      : false
  );
  useEffect(() => {
    document.getElementById('pageBody').style.top =
      document.getElementById('pageHeader').offsetHeight + 'px';
  }, []);
  async function save() {
    const name = document.getElementById('name');
    if (name.value !== '') {
      const barcode = document.getElementById('barcode').value;
      const country = document.getElementById('country').value;
      const manufacturer = document.getElementById('manufacturer').value;
      const vendor = document.getElementById('vendor').value;
      let category = '';
      if (document.getElementById('category').value !== '') {
        console.log('1');
        category = document.getElementById('category').value;
      } else if (
        document.getElementById('category').value === '' &&
        document.getElementById('parentcategory').value !== ''
      ) {
        console.log('2');
        category = document.getElementById('parentcategory').value;
      }
      console.log(category);
      const condition = document.getElementById('condition').value;
      const storage = document.getElementById('storage').value;
      const form = document.getElementById('form').value;
      const sku = document.getElementById('sku').value;
      const boditsavlalt = document.getElementById('boditsavlalt').value;
      const zardagsavlalt = document.getElementById('zardagsavlalt').value;
      const description = document.getElementById('description').value;
      const attributes = {
        musthave: true,
        boxing: {
          sell: zardagsavlalt,
          box: boditsavlalt
        }
      };
      props.save(
        name.value,
        barcode,
        country,
        manufacturer,
        vendor,
        category,
        sku,
        description,
        attributes
      );
    } else {
      const borderColor = name.style.borderColor;
      name.style.borderColor = 'red';
      name.focus();
      setTimeout(() => {
        name.style.borderColor = borderColor;
      }, 3000);
    }
  }
  const update = id => {
    const name = document.getElementById('name');
    if (name.value !== '') {
      const barcode = document.getElementById('barcode').value;
      const country = document.getElementById('country').value;
      const manufacturer = document.getElementById('manufacturer').value;
      const vendor = document.getElementById('vendor').value;
      let category = '';
      if (document.getElementById('category').value !== '') {
        console.log('1');
        category = document.getElementById('category').value;
      } else if (
        document.getElementById('category').value === '' &&
        document.getElementById('parentcategory').value !== ''
      ) {
        console.log('2');
        category = document.getElementById('parentcategory').value;
      }
      console.log(category);
      const condition = document.getElementById('condition').value;
      const storage = document.getElementById('storage').value;
      const form = document.getElementById('form').value;
      const sku = document.getElementById('sku').value;
      const boditsavlalt = document.getElementById('boditsavlalt').value;
      const zardagsavlalt = document.getElementById('zardagsavlalt').value;
      const description = document.getElementById('description').value;
      console.log(description);
      props.update(
        id,
        name.value,
        barcode,
        country,
        manufacturer,
        vendor,
        category,
        condition,
        storage,
        form,
        sku,
        boditsavlalt,
        zardagsavlalt,
        description
      );
    } else {
      const borderColor = name.style.borderColor;
      name.style.borderColor = 'red';
      name.focus();
      setTimeout(() => {
        name.style.borderColor = borderColor;
      }, 3000);
    }
  };
  const countriesHTML = [];
  for (const [key, value] of Object.entries(props.attributes.country)) {
    countriesHTML.push(<option value={key}>{value}</option>);
  }
  const manufacturerHTML = [];
  for (const [key, value] of Object.entries(props.attributes.manufacturer)) {
    manufacturerHTML.push(<option value={key}>{value}</option>);
  }
  const storageHTML = [];
  for (const [key, value] of Object.entries(
    props.attributes.storageConditions
  )) {
    storageHTML.push(<option value={key}>{value}</option>);
  }
  const conditionsHTML = [];
  for (const [key, value] of Object.entries(props.attributes.conditions)) {
    conditionsHTML.push(<option value={key}>{value}</option>);
  }
  const formsHTML = [];
  for (const [key, value] of Object.entries(props.attributes.form)) {
    formsHTML.push(<option value={key}>{value}</option>);
  }
  const customers = props.customers ? props.customers : [];
  const [images, setImages] = useState([]);
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
      { method: 'POST', body: formData }
    )
      .then(r => r.json())
      .then(response => {
        console.log(response);
        let temp = [];
        if (response.status === 200) {
          response.data.map(img => {
            temp.push(
              `${process.env.REACT_APP_MEDIA_URL}/original/` + img.image
            );
          });
        }
        setImages(prev => [...temp]);
      });
  };
  console.log(props.product);
  return (
    <div id='overlaypage_bg'>
      <div id='overlaypage'>
        <div className='pageHeader' id='pageHeader'>
          <p>
            {props.product === 'new'
              ? 'Шинэ бүтээгдэхүүн'
              : 'Бүтээгдэхүүний мэдээлэл'}
          </p>
          <span className='pageClose' onClick={() => props.setProduct(null)}>
            <img src='/images/close.svg' alt='' />
          </span>
        </div>
        <div id='pageBody'>
          <div className='left' style={{ width: '400px' }}>
            <div className='inputContainer'>
              <label>Бүтээгдэхүүний нэр:</label>
              <input
                type='text'
                id='name'
                defaultValue={props.product === 'new' ? null : product.name}
              />
            </div>
            <div className='inputContainer'>
              <label>Баркод:</label>
              <input
                type='text'
                id='barcode'
                defaultValue={props.product === 'new' ? null : product.bar_code}
              />
            </div>
            <div className='inputContainer'>
              <label>Үйлдвэрлэгч улс</label>
              <select id='country'>
                <option value='0'>--сонгоно уу--</option>
                {countriesHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Үйлдвэрлэгч</label>
              <select id='manufacturer'>
                <option value='0'>--сонгоно уу--</option>
                {manufacturerHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Нийлүүлэгч</label>
              <select id='vendor'>
                <option value='0'>--сонгоно уу--</option>
                {customers.map(customer => {
                  return (
                    <option value={customer.tradeshop_id}>
                      {customer.customer_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Ангилал:</label>
              <select
                id='parentcategory'
                onChange={e => setProductGroup(e.target.value)}
              >
                <option value=''>--сонгоно уу--</option>
                {props.productGroups.map(group => {
                  return group.ParentID === 0 ? (
                    <option value={group.ID}>{group.Name}</option>
                  ) : null;
                })}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Дэд ангилал:</label>
              <select
                id='category'
                disabled={parseInt(productGroup) > 0 ? false : true}
              >
                <option value=''>--сонгоно уу--</option>
                {props.productGroups.map(group => {
                  return parseInt(group.ParentID) === parseInt(productGroup) ? (
                    <option value={group.ID}>{group.Name}</option>
                  ) : null;
                })}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Олгох нөхцөл:</label>
              <select id='condition'>
                <option value='0'>--сонгоно уу--</option>
                {conditionsHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Хадгалах хэм:</label>
              <select id='storage'>
                <option value='0'>--сонгоно уу--</option>
                {storageHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Хадгалах байршил:</label>
              <select id='storage'>
                <option value='0'>--сонгоно уу--</option>
                {storageHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>Хэлбэр:</label>
              <select id='form'>
                <option value='0'>--сонгоно уу--</option>
                {formsHTML}
              </select>
            </div>
            <div className='inputContainer'>
              <label>SKU:</label>
              <input
                type='text'
                id='sku'
                value={props.product === 'new' ? null : product.sku}
              />
            </div>
            <div className='inputContainer'>
              <label>Бодит савлалт:</label>
              <input
                type='text'
                id='boditsavlalt'
                defaultValue={
                  props.product !== 'new' &&
                  props.product.attributes &&
                  props.product.attributes['boxing'] &&
                  props.product.attributes['boxing']['box']
                    ? props.product.attributes['boxing']['box']
                    : ''
                }
              />
            </div>
            <div className='inputContainer'>
              <label>Зардаг савлалт:</label>
              <input
                type='text'
                id='zardagsavlalt'
                defaultValue={
                  props.product !== 'new' &&
                  props.product.attributes['boxing'] &&
                  props.product.attributes['boxing']['sell']
                    ? props.product.attributes['boxing']['sell']
                    : ''
                }
              />
            </div>
            <div className='inputContainer'>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type='checkbox'
                    style={{ width: '20px', height: '20px' }}
                    id='musthave'
                    checked={mustHave}
                    onChange={e =>
                      setMustHave(mustHave === true ? false : true)
                    }
                  />
                  <label for='musthave' style={{ cursor: 'pointer' }}>
                    Заавал байх
                  </label>
                </div>
              </div>
            </div>
            <div className='inputContainer'>
              <label>Бүтээгдэхүүний зураг:</label>
              <div>
                <img
                  style={{ cursor: 'pointer', height: '80px', width: '80px' }}
                  src='https://ebazaar.mn/icon/photo-add.svg'
                  onClick={() => up()}
                  alt='https://ebazaar.mn/icon/photo-add.svg'
                />
              </div>
              <div></div>
            </div>
          </div>
          <div className='right' style={{ left: '400px' }}>
            <span className='tab active'>Дэлгэрэнгүй мэдээлэл</span>
            <span className='tab'>Нэмэлт мэдээлэл</span>
            <textarea className='text margintop1rem' id='description'>
              {props.product.description}
            </textarea>
            <div className='containerButtons'>
              <button
                className='button primary large'
                onClick={() =>
                  props.product === 'new' ? save() : update(product._id)
                }
              >
                {props.product === 'new'
                  ? 'Бүтээгдэхүүнийг бүртгэх'
                  : 'Өөрчлөлтийг хадгалах'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputs;
