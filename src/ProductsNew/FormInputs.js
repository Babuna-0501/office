import React, { useContext, useState, useEffect } from 'react';
import css from './forminput.module.css';
import closeIcon from '../assets/close.svg';
import { Button } from '../components/common/Button';
import ProductHook from '../Hooks/ProductHook';
import BackOfficeHook from '../Hooks/BackOfficeHook';

import ProductReportHook from '../Hooks/ProductsReportHook';
// import ChannelPrice from "./ChannelPrice";
import checked from '../assets/Tick Square on 2.svg';
import check from '../assets/Tick Square.svg';
import { GlobalContext } from '../Hooks/GlobalContext';
import { emHanganForm, storageData, subCategory, angilal} from './data';

const FormInputs = props => {
  const { loggedUser } = useContext(GlobalContext);
  const [isEmhangan, setIsEmhangan] = useState(false);

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [option, setOption] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [category, setCategory] = useState(null);
  const [alcohol, setAlcohol] = useState(null);
  const [name, setName] = useState(null);
  const [manufacturer, setManufacturer] = useState('');
  const [country, setCountry] = useState('');
  // for nugan start
  const [boditSavlalt, setBoditSavlalt] = useState(null);
  const [zardagSavlalt, setZardagSavlalt] = useState(null);
  const [storageCondition, setStorageCondition] = useState('');
  const [form, setForm] = useState('');
  const [isEmdCoupon, setIsEmdCoupon] = useState(false);
  const [retailPrice, setRetailPrice] = useState(null);
  const [wholePrice, setWholePrice] = useState(null);
  const [slug, setSlug] = useState(null);
  // for nugan end
  const [barcode, setBarcode] = useState(null);
  const [sku, setSku] = useState(null);
  const [price, setPrice] = useState(null);

  const [qty, setQty] = useState(null);
  const [incase, setIncase] = useState(null);
  const [citytax, setCitytax] = useState(null);
  const [brand, setBrand] = useState(null);
  const [noat, setNoat] = useState(null);
  const [productWeight, setProductWeight] = useState(null);
  const [description, setDescription] = useState(null);
  const [categoryOpt, setCategoryOpt] = useState([]);
  const [busType, setBusType] = useState(null);
  const [brandOpt, setBrandOpt] = useState([]);
  const [channelPrice, setChannelPrice] = useState(null);
  const prodctx = useContext(ProductHook);
  const backCtx = useContext(BackOfficeHook);
  const prodReportCtx = useContext(ProductReportHook);

  useEffect(() => {
    if (loggedUser?.company_id.includes('|14010|')) {
      setIsEmhangan(true);
    } else {
      setIsEmhangan(false);
    }
  }, [props.company_id]);
  const [emHangan, setEmHangan] = useState({
    condition: null,
    storageTemp: null,
    storageLocation: null,
    subCategory: null,
    form: null,
    unitPrice: null,
    price: null,
    seriesNumber: null,
    endDate: null
  });
  const CancelHandler = () => {
    if (page === 1) {
      setOption([]);
      setName(null);
      setBarcode(null);
      setSku(null);
      setPrice(null);
      setRetailPrice(null);
      setWholePrice(null);
      setQty(null);
      setIncase(null);
      setDescription();
      setCountry('');
      setManufacturer('');
      setCategoryOpt([]);
      setImages([]);
      setSupplier(null);
      setCategory(null);
      setAlcohol(null);
      setCitytax(null);
      setBrand(null);
      setNoat(null);
      setBusType(null);
      setBrandOpt([]);
      setProductWeight(null);
      prodctx.setCreateProd(false);
      let aa = prodReportCtx.bustype.map(item => {
        return {
          ...item,
          price: 0,
          chosed: true,
          priority: 0,
          deliver_fee: 0
        };
      });
      prodReportCtx.setBustype([...aa]);
    }
    if (page === 2) {
      setPage(1);
    }
    props.setProduct(false);
  };

  useEffect(() => {
    console.log('brand == null', !brand);
    console.log('brand', brand);
  }, [brand]);

  const ConfirmHandler = () => {
    if (props.company_id === '|14010|') {
      if (!boditSavlalt) {
        alert('Та бодит савлалт оруулна уу');
        return;
      }
      if (storageCondition === null) {
        alert('Та хадгалах нөхцөл оруулна уу');
        return;
      }
      if (form === null) {
        alert('Та хэлбэр оруулна уу');
        return;
      }
      if (country === null) {
        alert('Та Үйлдвэрлэгч улс оруулна уу');
        return;
      }
      if (manufacturer === '') {
        alert('Та Нийлүүлэгч байгууллага оруулна уу');
        return;
      }
    } else {
      if (price === null && !isEmhangan) {
        alert('Та барааны үнэ оруулна уу');
        return;
      }
      if (qty === null) {
        alert('Та барааны үлдэгдэл тоо хэмжээг оруулна уу');
        return;
      }
      // if (citytax === null) {
      //   alert('Та хотын татвар шалгана уу');
      //   return;
      // }
      // if (alcohol === null) {
      //   alert("Та алкохолын төрөлд орсон эсэхийг сонгоно уу");
      //   return;
      // }
      // if (brand === null) {
      //   alert("Та бүтээгдэхүүний брэнд сонгоно уу");
      //   return;
      // }
    }
    if (barcode === null) {
      alert('Та баркодоо оруулна уу');
      return;
    }
    // if (sku === null) {
    //   alert('Та sku оруулна уу');
    //   return;
    // }

    if (name === null || name.trim() === '') {
      alert('Та барааны нэрээ оруулна уу');
      return;
    }

    // if (incase === null && !isEmhangan) {
    //   alert('Та сагслах тоогоо оруулна уу');
    //   return;
    // }

    if (supplier === null) {
      alert('Та нийлүүлэгчээ сонгон уу');
      return;
    }
    // if (category === null) {
    //   alert('Та барааны категороо сонгоно уу');
    //   return;
    // }

    if (description === null || description.trim() === "") {
      alert("Та бүтээгдэхүүний тайлбараа оруулна уу");
      return;
    }

    // if (noat === null) {
    //   alert('Та бүтээгдэхүүний нөат сонгон уу');
    //   return;
    // }
    // if (images.length === 0) {
    //   alert("Та бүтээгдэхүүний зураг оруулна уу");
    //   return;
    // }
    // if (productWeight === null) {
    //   alert('Та бүтээгдэхүүний жингээ оруулна уу');
    //   return;
    // }

    let channelPrice = {};
    let channelIncase = {};
    let channelActive = {};
    let channelPriority = {};
    let channelUpoint = {};
    let channelDeliveryPay = {};
    prodReportCtx.bustype.map(item => {
      channelPrice[item.business_type_id] = Number(
        item.price === 0 ? price : item.price
      );
      channelIncase[item.business_type_id] = Number(incase);
      channelActive[item.business_type_id] = Number(item.chosed ? 1 : 0);
      channelPriority[item.business_type_id] = Number(
        item.priority ? item.priority : 100
      );
      channelUpoint[item.business_type_id] = Number(0);
      channelDeliveryPay[item.business_type_id] = Number(
        item.deliver_fee ? item.deliver_fee : 0
      );
    });
    console.log(supplier);
    let rawNew = {
      name: name.replaceAll("'", "\\'"),
      bar_code: barcode,
      image:
        images.length == 0
          ? [
              `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
            ]
          : images,
      sku: sku,
      supplier_id: Number(supplier),
      description: description ?? ''.trim().replaceAll("'", "\\'"),
      sector_id: null,
      country: country,
      manufacturer: manufacturer,
      pickpack: parseInt(supplier) === 13884 ? 1 : 0,
      weight: null,
      supplier_productgroup_id: 0,
      created_date: new Date(),
      updated_date: new Date(),
      slug: slug,
      stock: Number(qty),
      // city_tax: product.city_tax ? product.city_tax : false,
      noat: noat === 1 ? true : false,
      city_tax: citytax,
      include: [],
      exclude: [],
      attributes: isEmhangan
        ? [
            {
              boditSavlalt,
              storageCondition,
              zardagSavlalt,
              form: emHangan.form,
              subCategory: emHangan.subCategory,
              storageLocation: emHangan.storageLocation,
              storageTemp: emHangan.storageTemp,
              seriesNumber: emHangan.seriesNumber,
              endDate: emHangan.endDate,
              unitPrice: emHangan.unitPrice,
              wholePrice: emHangan.price,
              condition: emHangan.condition
            }
          ]
        : // ? [{ boditSavlalt, storageCondition,  isEmdCoupon, form: emHangan.form, subCategory: emHangan.subCategory,  }]
          [],
      locations: {
        '62f4aabe45a4e22552a3969f': {
          in_case: {
            channel: channelIncase
          },
          price: {
            channel: channelPrice
          },

          is_active: {
            channel: channelActive
          },
          priority: {
            channel: channelPriority
          },
          upoint: {
            channel: channelUpoint
          },
          deliver_fee: {
            channel: channelDeliveryPay
          }
        }
      },
      thirdparty_data: {
        pickpack: {
          sync: false,
          sku: ''
        }
      },
      // brand: brand === 'null' || brand === null ? 0 : Number(brand),
      category_id: Number(category),
      alcohol: Number(alcohol ?? '0'),
      product_measure: false,
      product_weight: Number(productWeight)
    };
    console.log(rawNew);
    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(rawNew),
      redirect: 'follow'
    };

    console.log('requestOptions', requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/product/add1`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.acknowledged === true) {
          alert('Амжилттай бараа бүртгэлээ');
          CancelHandler();
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    props.setProduct(false);
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
    // console.log(form)
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

  useEffect(() => {
    let aa = [];
    let sitedata = [];
    let brands = [];
    prodReportCtx.sitedata.categories.map(item => {
      sitedata.push({
        label: item.name,
        value: item.id
      });
    });
    prodReportCtx.sitedata.brands.map(item => {
      brands.push({
        label: item.BrandName,
        value: item.BrandID
      });
    });
    backCtx.suppliers.map(item => {
      aa.push({
        label: item.name,
        value: item.id
      });
    });
    setOption(aa);
    setCategoryOpt(sitedata);
    setBrandOpt(brands);
    setBusType(prodReportCtx.sitedata.business_types);
  }, []);
  let optionalcohol = [
    {
      label: 'Тийм',
      value: 1
    },
    {
      label: 'Үгүй',
      value: 0
    }
  ];
  let conditions = [
    {
      label: 'Ж',
      value: 0
    },
    {
      label: 'Ж*',
      value: 0
    },
    {
      label: 'ЖГ',
      value: 1
    },
    {
      label: 'ЗБШ',
      value: 2
    }
  ];
  const handleChangeSupplier = e => {
    setSupplier(e.target.value);
  };

  const handleChangeCategory = e => {
    if (isEmhangan) {
    }
    setCategory(e.target.value);
  };
  const handleChangeAlcohol = e => {
    setAlcohol(e.target.value);
  };

  const handleChangeBrand = e => {
    setBrand(e.target.value);
  };
  const handleChangeCitytax = e => {
    setCitytax(e.target.value);
  };
  const handleChangeNoat = e => {
    setNoat(e.target.value);
  };
  const handleEm = (e, key) => {
    setEmHangan(prev => ({ ...prev, [key]: e.target.value }));
  };

  const ConfirmPriceHandler = () => {
    setPage(1);
    console.log('prodctx', prodReportCtx.bustype);
  };

  const SubmitHandler = () => {
    if (page === 1) {
      ConfirmHandler();
    } else if (page === 2) {
      ConfirmPriceHandler();
    }
  };

  const [productFields, setProducctsFields] = useState([]);

  const [displayFields, setDisplayFields] = useState([
    'Нийлүүлэгч нэр',
    'Бүтээгдэхүүний үнэ',
    'Бүтээгдэхүүний нэр',
    'Бүтээгдэхүүний категори',
    'Бүтээгдэхүүний тайлбар',
    'Бүтээгдэхүүний брэнд',
    'Бүтээгдэхүүний sku',
    'Бүтээгдэхүүний үлдэгдэл тоо',
    'Бүтээгдэхүүний barcode',
    'Алкохол төрөл',
    'Сагслах тоо хамжээ /ш/',
    'Хотын татвар',
    'Бүтээгдэхүүний жин',
    'НӨАТ'
  ]);

  useEffect(() => {
    setIsEmhangan(loggedUser?.company_id.includes('1'));
    // setIsEmhangan(loggedUser?.company_id.includes("14142"));
  }, [loggedUser?.company_id]);

  useEffect(() => {
    if (isEmhangan) {
      setDisplayFields([
        'Нийлүүлэгч нэр',
        'Бүтээгдэхүүний нэр',
        // "Бүтээгдэхүүний үнэ",
        'Үйлдвэрлэгч улс',
        'Нийлүүлэгч байгууллага',
        'Бүтээгдэхүүний barcode',
        'Бүтээгдэхүүний ангилал',
        // "Сагслах тоо хамжээ /ш/",
        'Бүтээгдэхүүний категори',
        'Бүтээгдэхүүний тайлбар',
        'Бүтээгдэхүүний sku',
        'Бүтээгдэхүүний жин',
        'Бодит савлалт',
        'Зардаг савлалт',
        'Хотын татвар',
        'Брэнд',
        'Хэлбэр',
        'Бүтээгдэхүүний үлдэгдэл тоо',
        // "ЭМД хөнгөлөлт",
        'НӨАТ',
        'Дуусах хугацаа',
        'Жижиглэн үнэ',
        'Бөөний үнэ',
        'Сери дугаар',
        'Олгох нөхцөл',
        'Бүтээгдэхүүний дэд категори',
        'Хадгалах хэм',
        'Хадгалах байршил'
      ]);
    }
  }, [isEmhangan]);

  useEffect(() => {
    setProducctsFields([
      {
        name: 'Бүтээгдэхүүний нэр',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний нэр' className={css.field}>
            <span>Бүтээгдэхүүний нэр</span>
            <input
              required
              value={name}
              type='text'
              placeholder='Бүтээгдэхүүний нэр'
              onChange={e => setName(e.target.value)}
            />
          </div>
        )
      },
      loggedUser?.company_id !== ('|14010|')&& {
        name: 'Бүтээгдэхүүний категори',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний категори' className={css.field}>
            <span>Бүтээгдэхүүний категори</span>
            <select
              onChange={handleChangeCategory}
              name='categories'
              id='categories'
            >
              <option value='null'>Бүтээгдэхүүний категори</option>
              {categoryOpt.map(e => {
                console.log(categoryOpt, 'dgahdsghdsa');
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },
      loggedUser?.company_id.includes('|14010|') && {
        name: 'Бүтээгдэхүүний ангилал',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний ангилал' className={css.field}>
            <span>Бүтээгдэхүүний ангилал</span>
            <select
              onChange={e =>
                setEmHangan(prev => ({ ...prev, slug: e.target.value }))
              }
              name='slug'
              id='slug'
            >
              <option value='null'>Бүтээгдэхүүний ангилал</option>
              {angilal.map((e, i) => {
                return <option value={i}>{e}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Олгох нөхцөл',
        show: true,
        content: (
          <div key='Олгох нөхцөл' className={css.field}>
            <span>Олгох нөхцөл</span>
            <select
              onChange={e =>
                setEmHangan(prev => ({ ...prev, condition: e.target.value }))
              }
              name='condition'
              id='condition'
            >
              <option value='null'>Олгох нөхцөл</option>
              {conditions.map(e => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Бүтээгдэхүүний barcode',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний barcode' className={css.field}>
            <span>Бүтээгдэхүүний barcode</span>
            <input
              placeholder='Бүтээгдэхүүний barcode'
              type='text'
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
            />
          </div>
        )
      },
      {
        name: 'Бүтээгдэхүүний дэд категори',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний дэд категори' className={css.field}>
            <span>Бүтээгдэхүүний дэд категори</span>
            <select
              onChange={e =>
                setEmHangan(prev => ({ ...prev, subCategory: e.target.value }))
              }
              name='categories'
              id='categories'
            >
              <option value='null'>Бүтээгдэхүүний дэд категори</option>
              {subCategory.map((e, i) => {
                return <option value={i}>{e}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Хэлбэр',
        show: true,
        content: (
          <div key='Хэлбэр' className={css.field}>
            <span>Хэлбэр</span>
            <select
              onChange={e => {
                setEmHangan(prev => ({ ...prev, form: e.target.value }));
              }}
              name='Хэлбэр'
              id='Хэлбэр'
            >
              <option value='null'>Хэлбэр</option>
              {emHanganForm.map((e, i) => {
                return <option value={i}>{e}</option>;
              })}
            </select>
          </div>
        )
      },
      loggedUser?.company_id !== ('|14010|') && {
        name: 'Бүтээгдэхүүний sku',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний sku' className={css.field}>
            <span>Бүтээгдэхүүний sku</span>
            <input
              placeholder='Бүтээгдэхүүний sku'
              type='text'
              value={sku}
              onChange={e => setSku(e.target.value)}
            />
          </div>
        )
      },
      {
        name: 'Нийлүүлэгч нэр',
        show: true,
        content: (
          <div key='Нийлүүлэгч нэр' className={css.field}>
            <span>Нийлүүлэгч нэр</span>
            <select
              onChange={handleChangeSupplier}
              name='suppliers'
              id='suppliers'
            >
              <option value='null'>Нийлүүлэгч нэр</option>
              {option.map(e => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },

      {
        name: 'Бүтээгдэхүүний үнэ',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний үнэ' className={css.field}>
            <span>Бүтээгдэхүүний үнэ</span>
            <input
              placeholder='Бүтээгдэхүүний үнэ'
              type='number'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        )
      },
 
      {
        name: 'Үйлдвэрлэгч улс',
        show: true,
        content: (
          <div key='Үйлдвэрлэгч улс' className={css.field}>
            <span>Үйлдвэрлэгч улс</span>
            <input
              placeholder='Үйлдвэрлэгч улс'
              type='text'
              onChange={e => setCountry(e.target.value)}
            />
          </div>
        )
      },
      {
        name: 'Нийлүүлэгч байгууллага',
        show: true,
        content: (
          <div key='Нийлүүлэгч байгууллага' className={css.field}>
            <span>Нийлүүлэгч байгууллага</span>
            <input
              placeholder='Нийлүүлэгч байгууллага'
              type='text'
              onChange={e => setManufacturer(e.target.value)}
            />
          </div>
        )
      },
      {
        name: 'Бүтээгдэхүүний тайлбар',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний тайлбар' className={css.field}>
            <span>Бүтээгдэхүүний тайлбар</span>
            <input
              placeholder='Бүтээгдэхүүний тайлбар'
              type='text'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        )
      },
      loggedUser?.company_id !== ('|14010|') &&  {
        name: 'Бүтээгдэхүүний брэнд',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний брэнд' className={css.field}>
            <span>Бүтээгдэхүүний брэнд</span>
            <select onChange={handleChangeBrand} name='brands' id='brands'>
              <option value='null'>Бүтээгдэхүүний брэнд</option>
              {brandOpt.map(e => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Бүтээгдэхүүний үлдэгдэл тоо',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний үлдэгдэл тоо' className={css.field}>
            <span>Бүтээгдэхүүний үлдэгдэл тоо</span>
            <input
              placeholder='Бүтээгдэхүүний үлдэгдэл тоо'
              type='number'
              value={qty}
              onChange={e => setQty(e.target.value)}
            />
          </div>
        )
      },

      {
        name: 'Алкохол төрөл',
        show: true,
        content: (
          <div key='Алкохол төрөл' className={css.field}>
            <span>Алкохол төрөл</span>
            <select
              onChange={handleChangeAlcohol}
              name='Алкохол төрөл'
              id='brands'
            >
              <option value='null'>Бүтээгдэхүүний алкохол</option>
              {optionalcohol.map(e => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Сагслах тоо хамжээ /ш/',
        show: true,
        content: (
          <div key='Сагслах тоо хамжээ /ш/' className={css.field}>
            <span>Сагслах тоо хамжээ /ш/</span>
            <input
              placeholder='Бүтээгдэхүүний сагслах тоо'
              type='number'
              value={incase}
              onChange={e => setIncase(e.target.value)}
            />
          </div>
        )
      },
      {
        name: 'Дуусах хугацаа',
        show: true,
        content: (
          <div key='Дуусах хугацаа' className={css.field}>
            <span>Дуусах хугацаа</span>
            <input
              placeholder='Бүтээгдэхүүний дуусах хугацаа'
              type='date'
              value={emHangan.endDate}
              onChange={e =>
                setEmHangan(prev => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
        )
      },
      {
        name: 'Сери дугаар',
        show: true,
        content: (
          <div key='Сери дугаар' className={css.field}>
            <span>Сери дугаар</span>
            <input
              placeholder='Бүтээгдэхүүний сери дугаар'
              // type="number"
              value={emHangan.seriesNumber}
              onChange={e =>
                setEmHangan(prev => ({ ...prev, seriesNumber: e.target.value }))
              }
            />
          </div>
        )
      },
      {
        name: 'Бөөний үнэ',
        show: true,
        content: (
          <div key='Бөөний үнэ' className={css.field}>
            <span>Бөөний үнэ</span>
            <input
              placeholder='Бүтээгдэхүүний бөөний үнэ'
              type='number'
              value={emHangan.unitPrice}
              onChange={e =>
                setEmHangan(prev => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
        )
      },
      {
        name: 'Жижиглэн үнэ',
        show: true,
        content: (
          <div key='Жижиглэн үнэ' className={css.field}>
            <span>Жижиглэн үнэ</span>
            <input
              placeholder='Бүтээгдэхүүний жижиглэн үнэ'
              type='number'
              value={emHangan.unitPrice}
              onChange={e =>
                setEmHangan(prev => ({ ...prev, unitPrice: e.target.value }))
              }
            />
          </div>
        )
      },
      !loggedUser?.company_id.includes('|14010|') && {
        name: 'Хотын татвар',
        show: true,
        content: (
          <div key='Хотын татвар' className={css.field}>
            <span>Хотын татвар</span>
            <select
              onChange={handleChangeCitytax}
              name='Хотын татвар'
              id='brands'
            >
              <option value='null'>Хотын татвар</option>
              <option value='1'>Тийм</option>
              <option value='0'>Үгүй</option>
            </select>
          </div>
        )
      },
      loggedUser?.company_id !== ('|14010|') && {
        name: 'Бүтээгдэхүүний жин',
        show: true,
        content: (
          <div key='Бүтээгдэхүүний жин' className={css.field}>
            <span>Бүтээгдэхүүний жин</span>
            <input
              placeholder='Бүтээгдэхүүний жин'
              type='number'
              value={productWeight}
              onChange={e => setProductWeight(e.target.value)}
            />
          </div>
        )
      },
      !loggedUser?.company_id.includes('|14010|') && {
        name: 'НӨАТ',
        show: true,
        content: (
          <div key='НӨАТ' className={css.field}>
            <span>НӨАТ</span>
            <select onChange={handleChangeNoat} name='НӨАТ' id='brands'>
              <option value='null'>НӨАТ</option>
              <option value='1'>Тийм</option>
              <option value='0'>Үгүй</option>
            </select>
          </div>
        )
      },
      {
        name: 'Бодит савлалт',
        show: true,
        content: (
          <div key='Бодит савлалт' className={css.field}>
            <span>Бодит савлалт</span>
            <input
              placeholder='Бодит савлалт'
              value={boditSavlalt}
              type='number'
              onChange={e => {
                console.log('setBoditSavlalt', e.target.value);
                setBoditSavlalt(e.target.value);
              }}
            />
          </div>
        )
      },
      {
        name: 'Зардаг савлалт',
        show: true,
        content: (
          <div key='Зардаг савлалт' className={css.field}>
            <span>Зардаг савлалт</span>
            <input
              placeholder='Зардаг савлалт'
              value={zardagSavlalt}
              type='number'
              onChange={e => {
                console.log('setZardagSavlalt', e.target.value);
                setZardagSavlalt(e.target.value);
              }}
            />
          </div>
        )
      },
      loggedUser?.company_id !== ('|14010|') && {
        name: 'Брэнд',
        show: true,
        content: (
          <div key='Брэнд' className={css.field}>
            <span>Брэнд</span>
            <select
              onChange={e => {
                setStorageCondition(e.target.value);
              }}
              name='Брэнд'
              id='Брэнд'
            >
              <option value='null'>Брэнд</option>
              {brandOpt.map(e => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        )
      },
      {
        name: 'Хадгалах хэм',
        show: true,
        content: (
          <div key='Хадгалах хэм ' className={css.field}>
            <span>Хадгалах хэм </span>
            <select
              onChange={e => {
                setEmHangan(prev => ({ ...prev, storageCondition: e.target.value }));
              }}
              name='Хадгалах хэм'
              id='Хадгалах хэм'
            >
              <option value='null'>Хадгалах хэм</option>
              {storageData.map((e, i) => {
                return <option value={i}>{e}</option>;
              })}
            </select>
          </div>
        )
      },
      // {
      //   name: 'Хадгалах байршил',
      //   show: true,
      //   content: (
      //     <div key='Хадгалах байршил' className={css.field}>
      //       <span>Хадгалах байршил</span>
      //       <select
      //         onChange={e => {
      //           setEmHangan(prev => ({
      //             ...prev,
      //             storageLocation: e.target.value
      //           }));
      //         }}
      //         name='Хадгалах байршил'
      //         id='Хадгалах байршил'
      //       >
      //         <option value='null'>Хадгалах байршил</option>
      //         {storageData.map((e, i) => {
      //           return <option value={i}>{e}</option>;
      //         })}
      //       </select>
      //     </div>
      //   )
      // },
      {
        name: 'ЭМД хөнгөлөлт',
        show: true,
        content: (
          <div key='ЭМД хөнгөлөлт' className={css.field}>
            <span>ЭМД хөнгөлөлт</span>
            {isEmdCoupon ? (
              <img
                src={checked}
                alt='checkbox'
                style={{ width: '40px' }}
                onClick={() => {
                  setIsEmdCoupon(!isEmdCoupon);
                }}
              />
            ) : (
              <img
                src={check}
                alt='checkbox'
                style={{ width: '40px' }}
                onClick={() => {
                  setIsEmdCoupon(!isEmdCoupon);
                }}
              />
            )}
          </div>
        )
      },
 
    ]);
  }, [option, categoryOpt, brandOpt, isEmdCoupon, displayFields]);

  return (
    <div className={css.container}>
      <div className={css.wrapper2}>
        <div style={page === 1 ? { height: '100%' } : {}}>
          <div className={css.header}>
            <span>Шинэ бүтээгдэхүүн нэмэх</span>
            <img src={closeIcon} alt='baraa nemeh' onClick={CancelHandler} />
          </div>


          {page === 1 && (
            <div className={css.body}>
                <div className={css.header2}>
                  <span>Бүтээгдэхүүний ерөнхий мэдээлэл</span>
                  <span>Бүтээгдэхүүний үйлдвэрлэгчийн мэдээлэл</span>
                  <span>Бүтээгдэхүүний савлалтын мэдээлэл</span>
                </div>
              <div className={css.fields}>
                {productFields.map(field => {
                  if (displayFields.includes(field.name)) {
                    return field.content;
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className={css.footer}>
                <span>Бүтээгдэхүүний зураг</span>
                <div className={css.imgContainer}>
                  <div className={css.uploadImg}>
                    <img
                      style={{ cursor: 'pointer' }}
                      src='https://ebazaar.mn/icon/photo-add.svg'
                      onClick={() => up()}
                      alt='https://ebazaar.mn/icon/photo-add.svg'
                    />
                  </div>
                  <div className={css.uploadImg}>
                    {images.map((img, index) => {
                      return (
                        <>
                          <img
                            src={closeIcon}
                            alt='closeIcon'
                            onClick={() => {
                              setImages([]);
                            }}
                            style={{
                              position: 'absolute',
                              right: '5px',
                              top: '5px',
                              width: '20px',
                              height: '20px',
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              cursor: 'pointer'
                            }}
                          />
                          <img
                            key={index}
                            src={img.replace('original', 'product')}
                            alt='img'
                            className={css.prodImage}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* {page === 2 && (
            <ChannelPrice
              setChannelPrice={setChannelPrice}
              channelPrice={channelPrice}
            />
          )} */}
        </div>
        <div className={css.btncontainer}>
          <Button variant='secondary'>
            <span onClick={CancelHandler}>Цуцлах</span>
          </Button>
          <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
            {/* <Button
              variant="primary"
              onClick={() => {
                setPage(2);
              }}
            >
              <span
                style={{
                  color: "#fff",
                }}
              >
                Сувгийн үнэ тохиргоо
              </span>
            </Button> */}

            <Button variant='primary'>
              <span
                style={{
                  color: '#fff'
                }}
                onClick={SubmitHandler}
              >
                Өөрчлөлт оруулах
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputs;
