import React, { useContext, useState, useEffect } from "react";
import css from "./forminput.module.css";
import closeIcon from "../assets/close.svg";
import { Button } from "../components/common/Button";
import ProductHook from "../Hooks/ProductHook";
import BackOfficeHook from "../Hooks/BackOfficeHook";

import ProductReportHook from "../Hooks/ProductsReportHook";
// import ChannelPrice from "./ChannelPrice";
import checked from "../assets/Tick Square on 2.svg";
import check from "../assets/Tick Square.svg";
import { GlobalContext } from "../Hooks/GlobalContext";

const FormInputs = (props) => {
  const { loggedUser } = useContext(GlobalContext);
  const [isEmhangan, setIsEmhangan] = useState(false);

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [option, setOption] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [category, setCategory] = useState(null);
  const [alcohol, setAlcohol] = useState(null);
  const [name, setName] = useState(null);
  const [manufacturer, setManufacturer] = useState("");
  const [country, setCountry] = useState("");
  // for nugan start
  const [boditSavlalt, setBoditSavlalt] = useState(null);
  const [storageCondition, setStorageCondition] = useState("");
  const [form, setForm] = useState("");
  const [isEmdCoupon, setIsEmdCoupon] = useState(false);
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
  let emSubCategory = [
    {
      id: "ahuinKhereglee",
      values: [
        "Амны хөндийн арчилгаа",
        "Арьс арчилгаа",
        "Ахуйн хэрэглээ",
        "Хувийн хэрэглээ",
      ],
    },
    {
      id: "gooSaikhan",
      values: ["Амны хөндийн арчилгаа", "Арьс арчилгаа", "Үс арчилгаа"],
    },
    {
      id: "nasandKhuregchded",
      values: ["Насанд хүрэгчдэд"],
    },
    {
      id: "tonogTokhooromj",
      values: ["Тоног төхөөрөмж"],
    },
    {
      id: "khuns",
      values: ["Хүнс"],
    },
    {
      id: "emiinButeegdekhuun",
      values: [
        "A",
        "B",
        "C",
        "D",
        "G",
        "H",
        "J",
        "L",
        "M",
        "N",
        "P",
        "R",
        "S",
        "T",
        "БИБ",
        "Сэтгэц нөлөөт эм",
      ],
    },
    {
      id: "emnelgiinKheregsel",
      values: [
        "Асаргаа сувилгааны хэрэгсэл",
        "Ахуйн хэрэглээ",
        "Гэмтлийн үеийн хэрэгсэл",
        "Нэг удаагийн хэрэгсэл",
        "Хүүхдийн хэрэгсэл",
        "Эмнэлэгт хэрэглэх хэрэгсэл",
      ],
    },
    {
      id: "ekhKhuukhdiinButeegdekhuun",
      values: [
        "Арьс арчилгаа",
        "Жирэмсэн, хөхүүл эх",
        "Хүүхдийн амны хөндийн арчилгаа",
        "Хүүхдийн арьс арчилгаа",
        "Хүүхдийн хооллох хэрэгсэл",
        "Хүүхдийн хуурайлах хэрэгсэл",
        "Хүүхдийн хүнс тэжээл",
        "Хүүхдийн хэрэгсэл",
      ],
    },
  ];
  const [emHangan, setEmHangan] = useState({
    condition: null,
    storageTemp: null,
    storageLocation: null,
    subCategory: emSubCategory
      .map((s) => s.values)
      .join()
      .split(","),
  });
  const CancelHandler = () => {
    if (page === 1) {
      setOption([]);
      setName(null);
      setBarcode(null);
      setSku(null);
      setPrice(null);
      setQty(null);
      setIncase(null);
      setDescription();
      setCountry("");
      setManufacturer("");
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
      let aa = prodReportCtx.bustype.map((item) => {
        return {
          ...item,
          price: 0,
          chosed: true,
          priority: 0,
          deliver_fee: 0,
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
    console.log("brand == null", !brand);
    console.log("brand", brand);
  }, [brand]);

  const ConfirmHandler = () => {
    if (isEmhangan) {
      if (!boditSavlalt) {
        alert("Та бодит савлалт оруулна уу");
        return;
      }
      if (storageCondition === null) {
        alert("Та хадгалах нөхцөл оруулна уу");
        return;
      }
      if (form === null) {
        alert("Та хэлбэр оруулна уу");
        return;
      }
      if (country === null) {
        alert("Та Үйлдвэрлэгч улс оруулна уу");
        return;
      }
      if (manufacturer === "") {
        alert("Та Нийлүүлэгч байгууллага оруулна уу");
        return;
      }
    } else {
      if (price === null) {
        alert("Та барааны үнэ оруулна уу");
        return;
      }
      if (qty === null) {
        alert("Та барааны үлдэгдэл тоо хэмжээг оруулна уу");
        return;
      }
      if (citytax === null) {
        alert("Та хотын татвар шалгана уу");
        return;
      }
      if (alcohol === null) {
        alert("Та алкохолын төрөлд орсон эсэхийг сонгоно уу");
        return;
      }
      // if (brand === null) {
      //   alert("Та бүтээгдэхүүний брэнд сонгоно уу");
      //   return;
      // }
    }
    if (barcode === null) {
      alert("Та баркодоо оруулна уу");
      return;
    }
    if (sku === null) {
      alert("Та sku оруулна уу");
      return;
    }

    if (name === null || name.trim() === "") {
      alert("Та барааны нэрээ оруулна уу");
      return;
    }

    if (incase === null) {
      alert("Та сагслах тоогоо оруулна уу");
      return;
    }

    if (supplier === null) {
      alert("Та нийлүүлэгчээ сонгон уу");
      return;
    }
    if (category === null) {
      alert("Та барааны категороо сонгоно уу");
      return;
    }

    if (description === null || description.trim() === "") {
      alert("Та бүтээгдэхүүний бичиглэлээ оруулна уу");
      return;
    }

    if (noat === null) {
      alert("Та бүтээгдэхүүний нөат сонгон уу");
      return;
    }
    if (images.length === 0) {
      alert("Та бүтээгдэхүүний зураг оруулна уу");
      return;
    }
    if (productWeight === null) {
      alert("Та бүтээгдэхүүний жингээ оруулна уу");
      return;
    }

    let channelPrice = {};
    let channelIncase = {};
    let channelActive = {};
    let channelPriority = {};
    let channelUpoint = {};
    let channelDeliveryPay = {};
    prodReportCtx.bustype.map((item) => {
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

    let rawNew = {
      name: name.trim().replaceAll("'", "\\'"),
      bar_code: barcode,
      image: images,
      sku: sku,
      supplier_id: supplier,
      description: description.trim().replaceAll("'", "\\'"),
      sector_id: null,
      country: country,
      manufacturer: manufacturer,
      pickpack: parseInt(supplier) === 13884 ? 1 : 0,
      weight: null,
      supplier_productgroup_id: 0,
      created_date: new Date(),
      updated_date: new Date(),
      slug: "test",
      stock: Number(qty),
      // city_tax: product.city_tax ? product.city_tax : false,
      noat: noat === 1 ? true : false,
      city_tax: citytax,
      include: [],
      exclude: [],
      attributes: isEmhangan
        ? [{ boditSavlalt, storageCondition, form, isEmdCoupon }]
        : [],
      locations: {
        "62f4aabe45a4e22552a3969f": {
          in_case: {
            channel: channelIncase,
          },
          price: {
            channel: channelPrice,
          },

          is_active: {
            channel: channelActive,
          },
          priority: {
            channel: channelPriority,
          },
          upoint: {
            channel: channelUpoint,
          },
          deliver_fee: {
            channel: channelDeliveryPay,
          },
        },
      },
      thirdparty_data: {
        pickpack: {
          sync: false,
          sku: "",
        },
      },
      brand: brand === "null" || brand === null ? 0 : Number(brand),
      category_id: Number(category),
      alcohol: Number(alcohol),
      product_measure: false,
      product_weight: Number(productWeight),
    };
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawNew),
      redirect: "follow",
    };
    console.log("requestOptions", requestOptions);
    fetch("https://api2.ebazaar.mn/api/product/add1", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Амжилттай бараа бүртгэлээ");
          CancelHandler();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    props.setProduct(false);
  };

  const up = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforeEnd",
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="uploader' +
          id +
          '" multiple /></form>'
      );
    document.getElementById("uploader" + id).click();
    document
      .getElementById("uploader" + id)
      .addEventListener("change", () => upload(id), false);
  };
  const upload = (form) => {
    const uploader = document.getElementById("uploader" + form);
    var fileField = document.getElementById("uploader" + form);
    let formData = new FormData();
    for (let i = 0; i < uploader.files.length; i++) {
      formData.append(i, fileField.files[i]);
    }
    fetch(
      "https://ebazaar.mn/media/ehlo.php?preset=product&ebazaar_admin_token=" +
        localStorage.getItem("ebazaar_admin_token"),
      { method: "POST", body: formData }
    )
      .then((r) => r.json())
      .then((response) => {
        let temp = [];
        if (response.status === 200) {
          response.data.map((img) => {
            temp.push("https://ebazaar.mn/media/original/" + img.image);
          });
        }
        setImages((prev) => [...temp]);
      });
  };

  useEffect(() => {
    let aa = [];
    let sitedata = [];
    let brands = [];
    prodReportCtx.sitedata.categories.map((item) => {
      sitedata.push({
        label: item.name,
        value: item.id,
      });
    });
    prodReportCtx.sitedata.brands.map((item) => {
      brands.push({
        label: item.BrandName,
        value: item.BrandID,
      });
    });
    backCtx.suppliers.map((item) => {
      aa.push({
        label: item.name,
        value: item.id,
      });
    });
    setOption(aa);
    setCategoryOpt(sitedata);
    setBrandOpt(brands);
    setBusType(prodReportCtx.sitedata.business_types);
  }, []);
  let optionalcohol = [
    {
      label: "Тийм",
      value: 1,
    },
    {
      label: "Үгүй",
      value: 0,
    },
  ];
  let conditions = [
    {
      label: "Ж",
      value: 1,
    },
    {
      label: "Ж*",
      value: 0,
    },
    {
      label: "ЖГ",
      value: 2,
    },
    {
      label: "ЗБШ",
      value: 3,
    },
  ];
  const handleChangeSupplier = (e) => {
    setSupplier(Number(e.target.value));
  };

  const handleChangeCategory = (e) => {
    if (isEmhangan) {
    }
    setCategory(e.target.value);
  };
  const handleChangeAlcohol = (e) => {
    setAlcohol(e.target.value);
  };

  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
  };
  const handleChangeCitytax = (e) => {
    setCitytax(e.target.value);
  };
  const handleChangeNoat = (e) => {
    setNoat(e.target.value);
  };
  const handleEm = (e, key) => {
    setEmHangan((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const ConfirmPriceHandler = () => {
    setPage(1);
    console.log("prodctx", prodReportCtx.bustype);
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
    "Нийлүүлэгч нэр",
    "Бүтээгдэхүүний үнэ",
    "Бүтээгдэхүүний нэр",
    "Бүтээгдэхүүний категори",
    "Бүтээгдэхүүний дэлгэрэнгүй бичиглэл",
    "Бүтээгдэхүүний брэнд",
    "Бүтээгдэхүүний sku",
    "Бүтээгдэхүүний үлдэгдэл тоо",
    "Бүтээгдэхүүний barcode",
    "Алкохол төрөл",
    "Сагслах тоо хамжээ /ш/",
    "Хотын татвар",
    "Бүтээгдэхүүний жин",
    "НӨАТ",
  ]);

  useEffect(() => {
    // setIsEmhangan(loggedUser?.company_id.includes("1"));
    setIsEmhangan(loggedUser?.company_id.includes("14142"));
  }, [loggedUser?.company_id]);

  useEffect(() => {
    if (isEmhangan) {
      setDisplayFields([
        "Нийлүүлэгч нэр",
        "Бүтээгдэхүүний нэр",
        "Үйлдвэрлэгч улс",
        "Нийлүүлэгч байгууллага",
        "Бүтээгдэхүүний barcode",
        "Сагслах тоо хамжээ /ш/",
        "Бүтээгдэхүүний категори",
        "Бүтээгдэхүүний дэлгэрэнгүй бичиглэл",
        "Бүтээгдэхүүний sku",
        "Бүтээгдэхүүний жин",
        "Бодит савлалт",
        "Хадгалах нөхцөл",
        "Хэлбэр",
        "ЭМД хөнгөлөлт",
        "НӨАТ",

        "Олгох нөхцөл",
        "Бүтээгдэхүүний дэд категори",
        "Хадгалах хэм",
        "Хадгалах байршил",
      ]);
    }
  }, [isEmhangan]);

  useEffect(() => {
    setProducctsFields([
      {
        name: "Нийлүүлэгч нэр",
        show: true,
        content: (
          <div key="Нийлүүлэгч нэр" className={css.field}>
            <span>Нийлүүлэгч нэр</span>
            <select
              onChange={handleChangeSupplier}
              name="suppliers"
              id="suppliers"
            >
              <option value="null">Нийлүүлэгч нэр</option>
              {option.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },

      {
        name: "Бүтээгдэхүүний үнэ",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний үнэ" className={css.field}>
            <span>Бүтээгдэхүүний үнэ</span>
            <input
              placeholder="Бүтээгдэхүүний үнэ"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний нэр",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний нэр" className={css.field}>
            <span>Бүтээгдэхүүний нэр</span>
            <input
              required
              value={name}
              type="text"
              placeholder="Бүтээгдэхүүний нэр"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Үйлдвэрлэгч улс",
        show: true,
        content: (
          <div key="Үйлдвэрлэгч улс" className={css.field}>
            <span>Үйлдвэрлэгч улс</span>
            <input
              placeholder="Үйлдвэрлэгч улс"
              type="text"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Нийлүүлэгч байгууллага",
        show: true,
        content: (
          <div key="Нийлүүлэгч байгууллага" className={css.field}>
            <span>Нийлүүлэгч байгууллага</span>
            <input
              placeholder="Нийлүүлэгч байгууллага"
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний категори",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний категори" className={css.field}>
            <span>Бүтээгдэхүүний категори</span>
            <select
              onChange={handleChangeCategory}
              name="categories"
              id="categories"
            >
              <option value="null">Бүтээгдэхүүний категори</option>
              {categoryOpt.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний дэд категори",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний дэд категори" className={css.field}>
            <span>Бүтээгдэхүүний дэд категори</span>
            <select
              onChange={handleChangeCategory}
              name="categories"
              id="categories"
            >
              <option value="null">Бүтээгдэхүүний дэд категори</option>
              {emHangan.subCategory.map((e, i) => {
                return <option value={i}>{e}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний дэлгэрэнгүй бичиглэл",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний дэлгэрэнгүй бичиглэл" className={css.field}>
            <span>Бүтээгдэхүүний дэлгэрэнгүй бичиглэл</span>
            <input
              placeholder="Бүтээгдэхүүний дэлгэрэнгүй"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний брэнд",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний брэнд" className={css.field}>
            <span>Бүтээгдэхүүний брэнд</span>
            <select onChange={handleChangeBrand} name="brands" id="brands">
              <option value="null">Бүтээгдэхүүний брэнд</option>
              {brandOpt.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний sku",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний sku" className={css.field}>
            <span>Бүтээгдэхүүний sku</span>
            <input
              placeholder="Бүтээгдэхүүний sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний үлдэгдэл тоо",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний үлдэгдэл тоо" className={css.field}>
            <span>Бүтээгдэхүүний үлдэгдэл тоо</span>
            <input
              placeholder="Бүтээгдэхүүний үлдэгдэл тоо"
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний barcode",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний barcode" className={css.field}>
            <span>Бүтээгдэхүүний barcode</span>
            <input
              placeholder="Бүтээгдэхүүний barcode"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Алкохол төрөл",
        show: true,
        content: (
          <div key="Алкохол төрөл" className={css.field}>
            <span>Алкохол төрөл</span>
            <select
              onChange={handleChangeAlcohol}
              name="Алкохол төрөл"
              id="brands"
            >
              <option value="null">Бүтээгдэхүүний алкохол</option>
              {optionalcohol.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "Сагслах тоо хамжээ /ш/",
        show: true,
        content: (
          <div key="Сагслах тоо хамжээ /ш/" className={css.field}>
            <span>Сагслах тоо хамжээ /ш/</span>
            <input
              placeholder="Бүтээгдэхүүний сагслах тоо"
              type="number"
              value={incase}
              onChange={(e) => setIncase(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "Хотын татвар",
        show: true,
        content: (
          <div key="Хотын татвар" className={css.field}>
            <span>Хотын татвар</span>
            <select
              onChange={handleChangeCitytax}
              name="Хотын татвар"
              id="brands"
            >
              <option value="null">Хотын татвар</option>
              <option value="1">Тийм</option>
              <option value="0">Үгүй</option>
            </select>
          </div>
        ),
      },
      {
        name: "Бүтээгдэхүүний жин",
        show: true,
        content: (
          <div key="Бүтээгдэхүүний жин" className={css.field}>
            <span>Бүтээгдэхүүний жин</span>
            <input
              placeholder="Бүтээгдэхүүний жин"
              type="number"
              value={productWeight}
              onChange={(e) => setProductWeight(e.target.value)}
            />
          </div>
        ),
      },
      {
        name: "НӨАТ",
        show: true,
        content: (
          <div key="НӨАТ" className={css.field}>
            <span>НӨАТ</span>
            <select onChange={handleChangeNoat} name="НӨАТ" id="brands">
              <option value="null">НӨАТ</option>
              <option value="1">Тийм</option>
              <option value="0">Үгүй</option>
            </select>
          </div>
        ),
      },
      {
        name: "Бодит савлалт",
        show: true,
        content: (
          <div key="Бодит савлалт" className={css.field}>
            <span>Бодит савлалт</span>
            <input
              placeholder="Бодит савлалт"
              value={boditSavlalt}
              type="number"
              onChange={(e) => {
                console.log("setBoditSavlalt", e.target.value);
                setBoditSavlalt(e.target.value);
              }}
            />
          </div>
        ),
      },
      {
        name: "Хадгалах нөхцөл",
        show: true,
        content: (
          <div key="Хадгалах нөхцөл" className={css.field}>
            <span>Хадгалах нөхцөл</span>
            <select
              onChange={(e) => {
                setStorageCondition(e.target.value);
              }}
              name="Хадгалах нөхцөл"
              id="Хадгалах нөхцөл"
            >
              <option value="null">Хадгалах нөхцөл</option>
              {brandOpt.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "Хадгалах хэм",
        show: true,
        content: (
          <div key="Хадгалах хэм " className={css.field}>
            <span>Хадгалах хэм </span>
            <input
              required
              value={emHangan.storageTemp}
              type="text"
              placeholder="Хадгалах хэм "
              onChange={(e) =>
                setEmHangan((prev) => ({
                  ...prev,
                  storageTemp: e.target.value,
                }))
              }
            />
          </div>
        ),
      },
      {
        name: "Хадгалах байршил",
        show: true,
        content: (
          <div key="Хадгалах байршил" className={css.field}>
            <span>Хадгалах байршил</span>
            <input
              required
              value={emHangan.storageLocation}
              type="text"
              placeholder="Хадгалах байршил"
              onChange={(e) =>
                setEmHangan((prev) => ({
                  ...prev,
                  storageLocation: e.target.value,
                }))
              }
            />
          </div>
        ),
      },
      {
        name: "Хэлбэр",
        show: true,
        content: (
          <div key="Хэлбэр" className={css.field}>
            <span>Хэлбэр</span>
            <select
              onChange={(e) => {
                setForm(e.target.value);
              }}
              name="Хэлбэр"
              id="Хэлбэр"
            >
              <option value="null">Хэлбэр</option>
              {brandOpt.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
      {
        name: "ЭМД хөнгөлөлт",
        show: true,
        content: (
          <div key="ЭМД хөнгөлөлт" className={css.field}>
            <span>ЭМД хөнгөлөлт</span>
            {isEmdCoupon ? (
              <img
                src={checked}
                alt="checkbox"
                style={{ width: "40px" }}
                onClick={() => {
                  setIsEmdCoupon(!isEmdCoupon);
                }}
              />
            ) : (
              <img
                src={check}
                alt="checkbox"
                style={{ width: "40px" }}
                onClick={() => {
                  setIsEmdCoupon(!isEmdCoupon);
                }}
              />
            )}
          </div>
        ),
      },
      {
        name: "Олгох нөхцөл",
        show: true,
        content: (
          <div key="Нийлүүлэгч нэр" className={css.field}>
            <span>Олгох нөхцөл</span>
            <select
              onChange={handleChangeSupplier}
              name="condition"
              id="condition"
            >
              <option value="null">Олгох нөхцөл</option>
              {conditions.map((e) => {
                return <option value={e.value}>{e.label}</option>;
              })}
            </select>
          </div>
        ),
      },
    ]);
  }, [option, categoryOpt, brandOpt, isEmdCoupon, displayFields]);

  return (
    <div className={css.container}>
      <div className={css.wrapper2}>
        <div style={page === 1 ? { height: "90%" } : {}}>
          <div className={css.header}>
            <span>Бүтээгдэхүүн бүртгэх</span>
            <img src={closeIcon} alt="baraa nemeh" onClick={CancelHandler} />
          </div>

          {page === 1 && (
            <div className={css.body}>
              <div className={css.fields}>
                {productFields.map((field) => {
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
                      style={{ cursor: "pointer" }}
                      src="https://ebazaar.mn/icon/photo-add.svg"
                      onClick={() => up()}
                      alt="https://ebazaar.mn/icon/photo-add.svg"
                    />
                  </div>
                  <div className={css.uploadImg}>
                    {images.map((img, index) => {
                      return (
                        <>
                          <img
                            src={closeIcon}
                            alt="closeIcon"
                            onClick={() => {
                              setImages([]);
                            }}
                            style={{
                              position: "absolute",
                              right: "5px",
                              top: "5px",
                              width: "20px",
                              height: "20px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            key={index}
                            src={img.replace("original", "product")}
                            alt="img"
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
          <Button variant="secondary">
            <span onClick={CancelHandler}>Цуцлах</span>
          </Button>
          <div style={{ display: "flex", gap: "20px", color: "white" }}>
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

            <Button variant="primary">
              <span
                style={{
                  color: "#fff",
                }}
                onClick={SubmitHandler}
              >
                Хадгалах
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputs;
