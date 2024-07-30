import React, { useContext, useEffect, useState } from 'react';
import css from './newproduct.module.css';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import ImageUpload from './ImageUpload';
import ProductCat from './ProductCat';
import Select from 'react-select';
import closeBtn from '../../assets/close.svg';

//////
const NewProduct = props => {
  const ctx = useContext(ProductReportHook);
  const [category, setCategory] = useState(27125);
  const [categoryCode, setCategoryCode] = useState(null);
  const [productGroupID, setProductGroupID] = useState(null);
  const [productName, setProductName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [productCode, setProductCode] = useState(null);
  const [inCaseState, setInCaseState] = useState(0);
  const [price, setPrice] = useState(null);
  const [skuCode, setSkuCode] = useState(null);
  const [barCode, setBarCode] = useState(null);
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState(null);
  const [categoryShow, setCategoryShow] = useState(false);
  const [productPriority, setProductPriority] = useState(0);
  const [error, setError] = useState('');
  const [updatedbyState, setUpdatedbyState] = useState(null);
  const [sectorIDstate, setSectorIDstate] = useState(null);

  const options = [];
  let defaultValueLabel = null;
  if (ctx.sitedata.categories) {
    ctx.sitedata.categories.map(category => {
      options.push({ value: category.id, label: category.name });
      if (category.id === 27125) {
        defaultValueLabel = category.name;
      }
    });
  }
  const brandoptions = [];
  if (ctx.sitedata.brands) {
    ctx.sitedata.brands.map(brand => {
      brandoptions.push({ value: brand.BrandID, label: brand.BrandName });
    });
  }

  useEffect(() => {
    let catID = ctx.sitedata.categories.filter(item => {
      return item.id === categoryCode;
    });

    setCategory(catID);
  }, [categoryCode]);
  const ProductSave = () => {
    if (productCode?.length === 0) {
      alert('Таны бүтээгдэхүүний ID байхгүй байна.');
      return;
    } else if (productName?.length === 0) {
      alert('Таны бүтээгдэхүүний нэр байхгүй байна.');

      return;
    } else if (barCode?.length === 0) {
      alert('Таны бүтээгдэхүүний нэр байхгүй байна.');

      return;
    } else if (images.length === 0) {
      alert('Таны бүтээгдэхүүний зураг байхгүй байна.');
      return;
    } else if (skuCode.length === 0) {
      alert('Таны бүтээгдэхүүний SKU код байхгүй байна.');
      return;
    } else if (desc.length === 0) {
      alert('Таны бүтээгдэхүүний дэлгэрэнгүй мэдээлэл байхгүй байна.');
      return;
    } else if (productPriority === null) {
      alert(
        'Таны бүтээгдэхүүний дэлгэрэнгүй productPriority мэдээлэл байхгүй байна.'
      );
      return;
    } else if (updatedbyState !== null) {
      alert(
        'Таны бүтээгдэхүүний дэлгэрэнгүй updatedbyState мэдээлэл байхгүй байна.'
      );
      return;
    } else if (brand.length === 0) {
      alert('Таны бүтээгдэхүүний брэндийн мэдээлэл байхгүй байна.');
      return;
    } else if (sectorIDstate !== null) {
      alert('Таны бүтээгдэхүүний sectorIDstate мэдээлэл байхгүй байна.');
      return;
    } else if (price.length === 0) {
      alert('Таны бүтээгдэхүүний үнийн мэдээлэл байхгүй байна.');
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      ProductGroupID: productCode,
      ProductName: productName,
      BarCode: barCode,
      inCase: inCaseState,
      isActive: 0,
      ProductImage: images,
      SKU: skuCode,
      ProductDescription: desc,
      ProductPriority: productPriority,
      Updatedby: updatedbyState,
      BrandID: brand,
      Slug: 'maggi-100-6917878015064',
      SectorID: sectorIDstate,
      DefaultPrice: price
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_API_URL2}/api/product/add`, requestOptions)
      .then(r => r.json())
      .then(response => {
        if (response.code === 200) {
          alert('Амжилттай бүтээгдэхүүн нэмэгдлээ');
        } else {
          alert(`Алдаа гарлаа. ${response.error}`);
        }
      })
      .catch(error => console.log(error.message));
  };
  const handleChange = selectedOptions => {
    // console.log(selectedOptions.value);
    setCategory(selectedOptions.value);
  };
  const handleChangeBrand = selectedOptions => {
    setBrand(selectedOptions.value);
  };
  /////////

  const customStyles = {
    option: () => ({
      width: 600,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: 'pointer',
      width: '100%'
    }),

    control: () => ({
      alignItems: 'center',
      display: 'flex',
      width: 428,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 20,
      paddingRight: 20,
      border: '1px solid #cfd8dc',
      height: 52,
      borderRadius: 12
    })
  };

  return (
    <div className={css.container}>
      <div style={{ width: '100%' }}></div>
      <div className={css.wrapper}>
        <div className={css.wrapperSub}>
          <div>
            <div className={css.closeContainer}>
              <span className={css.header}>Бүтээгдэхүүн</span>{' '}
              <span onClick={() => ctx.setNewProduct(false)}>
                <img
                  src={closeBtn}
                  alt='close button '
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </span>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Бүтээгдэхүүний ангилал</span>
              </div>
              <Select
                styles={customStyles}
                options={options}
                id='category'
                onChange={handleChange}
                defaultValue={{
                  label: defaultValueLabel,
                  value: 27125
                }}
              />

              {categoryShow && (
                <div className={css.newProductCSS}>
                  <ProductCat setCategoryCode={setCategoryCode} />
                </div>
              )}
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Бүтээгдэхүүний нэр</span>
              </div>
              <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Брэнд</span>
              </div>
              <Select
                styles={customStyles}
                options={brandoptions}
                id='brand'
                onChange={handleChangeBrand}
                defaultValue={{
                  label: `Coca Cola`,
                  value: 1914
                }}
              />
              {/* <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </div> */}
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Бүтээгдэхүүний дотоод код ID</span>
              </div>
              <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={productCode}
                  onChange={e => setProductCode(e.target.value)}
                />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Үнэ</span>
              </div>
              <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>SKU код</span>
              </div>
              <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={skuCode}
                  onChange={e => setSkuCode(e.target.value)}
                />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Баркод</span>
              </div>
              <div className={css.secondWrapper}>
                <input
                  className={css.inputwrapper}
                  value={barCode}
                  onChange={e => setBarCode(e.target.value)}
                />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Бүтээгдэхүүний зураг</span>
              </div>
              <div className={css.imagesContainer}>
                <ImageUpload setImages={setImages} />
              </div>
            </div>
            <div className={css.wrapperContainer}>
              <div className={css.firsWrapper}>
                <span>Бүтээгдэхүүний тайлбар</span>
              </div>
              <div className={css.thirdWrapper}>
                <textarea
                  className={css.inputwrapper}
                  placeholder='Бүтээгдэхүүний тайлбар оруулах'
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className={css.btnContainer}>
          <button onClick={ProductSave}>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};
export default NewProduct;
