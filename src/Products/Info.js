import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { Popconfirm, message } from "antd";
import deleteIcon from "../assets/delete_red_small.svg";
import { Tabs } from "antd";
import css from "./List.module.css";
import cssproduct from "./product.module.css";
import closeIcon from "../assets/close.svg";
import myHeaders from "../components/MyHeader/myHeader";
import ProductReportHook from "../Hooks/ProductsReportHook";
import Zones from "./Zones/Zones";

const oronnudagdata = [
  { id: 1, name: "Улаанбаатар", value: "1" },
  { id: 2, name: "Улаанбаатар+Орон нутаг", value: "1,329, 117" },
  { id: 3, name: "Орон нутаг", value: "329, 117" },
];
function Info(props) {
  console.log("PROPS:   ", props);
  let [category, setCategory] = useState(props.product.category_id);
  const [alco, setAlco] = useState(props.product.alcohol === 1 ? true : false);
  const [pp, setPp] = useState(
    props.product && props.product.thirdparty_data?.pickpack?.sync === true ? true : false
  );
  const [cityTax, setCityTax] = useState(props.product.city_tax === 1 ? true : false);
  const [oronnutag, setOronnutag] = useState(false);
  const [noat, setNoat] = useState(props.product.noat ? props.product.noat : false);
  const [images, setImages] = useState(props.product.image);
  const [busTypes, setBusTypes] = useState([]);
  const [choseddata, setChoseddata] = useState(1);
  const [weightProduct, setWeightProduct] = useState(0);
  const [group, setGroup] = useState(props.product.supplierProductGroup);

  useEffect(() => {
    if (props.product.supplier_id === 13884 || props.product.supplier_id === 14051) {
      if (props.product.include.length === 1) {
        setChoseddata(1);
      } else if (props.product.include.length === 2) {
        setChoseddata(3);
      } else if (props.product.include.length === 3) {
        setChoseddata(2);
      }
    } else {
      setChoseddata(1);
    }
  }, [props.product]);
  const sitedatactx = useContext(ProductReportHook);
  // console.log("sitedatactx.sitedata", sitedatactx);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let urlNew = `https://api.ebazaar.mn/api/site_data`;
    fetch(urlNew, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        let data = [];
        res.business_types.map((item) => {
          data.push(item.business_type_id);
        });
        setBusTypes(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    if ((props.product.include ?? []).length !== 0) {
      setOronnutag(true);
    }
  }, [props.product]);

  const options = [];
  let defaultValueLabel = null;
  if (props.categories) {
    props.categories.map((category) => {
      options.push({ value: category.id, label: category.name });
      if (category.id === props.product.category_id) {
        defaultValueLabel = category.name;
      }
    });
  }

  const options2 = [];
  let defaultValueLabel2 = null;
  if (props.productGroup) {
    props.productGroup.map((group) => {
      options2.push({ value: group.id, label: group.name });
      if (group.id === props.product.supplierProductGroup) {
        defaultValueLabel2 = group.name;
      }
    });
  }

  const handleChange = (selectedOptions) => {
    setCategory(selectedOptions.value);
  };

  // console.log("props.selected", props.selected);
  const save = () => {
    const productname = document.getElementById("productname");
    const productbarcode = document.getElementById("productbarcode");
    const productsku = document.getElementById("productsku");
    const productdescription = document.getElementById("productdescription");
    const in_case = document.getElementById("in_case");
    const stock = document.getElementById("stock");
    const priority = document.getElementById("productpriority");
    if (productname.value !== "") {
      let incaceall = {};
      let priorityall = {};

      busTypes.map((item) => {
        incaceall[item] = Number(in_case.value.length === 0 ? 1 : in_case.value);
      });
      busTypes.map((item) => {
        priorityall[item] = Number(priority.value.length === 0 ? 1 : priority.value);
      });
      let oronnutagIDS = [];
      let ubIDS = [];
      if (choseddata == 1) {
        oronnutagIDS = [1];
        ubIDS = [329, 117];
      } else if (choseddata == 2) {
        oronnutagIDS = [1, 329, 117];
        ubIDS = [];
      } else if (choseddata == 3) {
        oronnutagIDS = [329, 117];
        ubIDS = [1];
      }
      let weighted = {
        attribute_id: 96,
        attribute_name: "Дундаж жин / кг",
        attribte_value: parseFloat(weightProduct).toFixed(2).toString(),
      };

      let rawNew = {
        product_id: props.product._id,
        supplier_id: props.product.supplier_id,
        sku: productsku.value,
        bar_code: productbarcode.value,
        name: productname.value,
        description: productdescription.value,
        category_id: category,
        alcohol: alco === true ? 1 : 0,
        pickpack: pp === true ? 1 : 0,
        city_tax: cityTax === true ? 1 : 0,
        include: oronnutagIDS,
        exclude: ubIDS,
        noat: noat === true ? true : false,
        attribute: [props.product.supplier_id === 14005 ? weighted : {}],
        stock: Number(stock.value),
        "locations.62f4aabe45a4e22552a3969f.in_case.channel": incaceall,
        "locations.62f4aabe45a4e22552a3969f.priority.channel": priorityall,
        supplierProductGroup: group,
      };
      rawNew = JSON.stringify(rawNew);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawNew,
        redirect: "follow",
      };
      let urlNew = `https://api2.ebazaar.mn/api/product/update1`;
      // console.log("requestOptions ------------ requestOptions", requestOptions);

      fetch(urlNew, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.code === 200) {
            alert("Бүтээгдэхүүний мэдээллийг амжилттай шинэчиллээ!");
            console.log("UPDATED INFO", requestOptions);

            props.setProduct({
              ...props.product,
              name: productname.value,
              description: productdescription.value,
              sku: productsku.value,
              bar_code: productbarcode.value,
              category_id: category,
              stock: Number(stock.value),
              noat: noat,
              include: oronnutagIDS,
              supplierProductGroup: group,
              exclude: ubIDS,

              ...(props.product.locations["62f4aabe45a4e22552a3969f"].in_case.channel = incaceall),
              ...(props.product.locations["62f4aabe45a4e22552a3969f"].priority.channel =
                priorityall),
            });
            props.setInfo(false);
          }
        })
        .catch((error) => {
          console.log("error product update", error);
        });
    } else {
      alert("Бүтээгдэхүүний нэр оруулна уу!");
    }
  };

  let newIncase = props.product.locations["62f4aabe45a4e22552a3969f"].in_case.channel[1];
  let priorityNew = props.product.locations["62f4aabe45a4e22552a3969f"].priority.channel[1];

  const deleteHandler = () => {
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `https://api2.ebazaar.mn/product/remove?productId=${props.product._id}`
    console.log(url)
    fetch(url, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          message.success("Амжилттай устгалаа");
          props.setInfo(false);
        } else {
          message.error("Алдаа гарлаа");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const savePrice = () => {
    const foobar = document.getElementById("productprice");
    if (foobar.value !== "") {
      let inprice = {};
      busTypes.map((item) => {
        inprice[item] = Number(foobar.value);
      });

      let rawNew = {
        product_id: props.product._id,
        supplier_id: props.product.supplier_id,
        "locations.62f4aabe45a4e22552a3969f.price.channel": inprice,
      };
      rawNew = JSON.stringify(rawNew);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawNew,
        redirect: "follow",
      };
      // console.log("requestOptions price update", requestOptions);
      let urlNew = `https://api2.ebazaar.mn/api/product/update1`;
      fetch(urlNew, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.code === 200) {
            props.setProduct({
              ...props.product,
              ...(props.product.locations["62f4aabe45a4e22552a3969f"].price.channel = inprice),
            });
            props.setPrice(false);
            alert("Үнэ амжилттай шинэчлэгдлээ");
          }
        })
        .catch((error) => {
          console.log("price update error", error);
        });
    } else {
      alert("Үнийн мэдээлэл оруулна уу");
    }
  };
  const up = () => {
    const id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
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
    document.getElementById("uploader" + id).addEventListener("change", () => upload(id), false);
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
      { method: "post", body: formData }
    )
      .then((r) => r.json())
      .then((response) => {
        let temp = [];
        if (response.status === 200) {
          response.data.map((img) => {
            temp.push("https://ebazaar.mn/media/original/" + img.image);
          });
        }
        setImages((prev) => [...prev, ...temp]);
      });
  };
  let renderHTML = images.map((i, index) => {
    return (
      <div className={cssproduct.relativeContainer} key={index}>
        <img
          src={i.replace("original", "product")}
          alt=""
          style={{ height: "168px", width: "168px" }}
          className={cssproduct.prodImage}
        />
        <img
          src={closeIcon}
          alt=""
          className={cssproduct.close}
          onClick={() => {
            setImages((prev) => prev.filter((_, x) => x !== index));
          }}
        />
      </div>
    );
  });
  const savePicture = () => {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        product_id: props.product._id,
        supplier_id: props.product.supplier_id,
        image: images,
      }),
      redirect: "follow",
    };
    let urlNew = `https://api2.ebazaar.mn/api/product/update1`;
    fetch(urlNew, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          alert("Амжилттай хадгаллаа!");
          props.setProduct({
            ...props.product,
            image: images,
          });
        } else {
          alert("Алдаа гарлаа!");
        }
      })
      .catch((error) => {
        console.log("error image update", error);
      });
  };
  // console.log("props.producttttttttttttttt", props);

  return (
    <div id="bg">
      <div id="foo">
        <span className="close" onClick={() => props.setInfo(false)}>
          Close
        </span>
        <div>
          <Tabs
            defaultActiveKey="1"
            style={{ width: "100%", marginTop: "16px" }}
            items={[
              {
                label: <div className={css.tabHeader}>Бүтээгдэхүүний мэдээлэл</div>,
                key: "1",
                children: (
                  <div>
                    <label>Нэр</label>
                    <input type="text" id="productname" defaultValue={props.product.name} />

                    {/* ------------------ */}
                    <label>Ангилал</label>
                    <Select
                      options={options}
                      id="category"
                      onChange={handleChange}
                      defaultValue={{
                        label: defaultValueLabel === null ? "Ангилал" : defaultValueLabel,
                        value: props.product.category_id,
                      }}
                    />
                    {/* ------------------ */}

                    <div style={{ height: "20px" }}></div>
                    {/* {props.product.supplier_id === 13884 ? (
                       <>
                         <label>Шуурхай ангилал</label>
                         <Select
                           options={options}
                           id="category"
                           onChange={handleChange}
                           defaultValue={{
                             label: defaultValueLabel === null ? "Ангилал" : defaultValueLabel,
                             value: props.product.category_id,
                           }}
                         />
                         <div style={{ height: "20px" }}></div>
                       </>
                     ) : null} */}
                    {/* ------------------ */}
                    {props.product.supplier_id === 13884 || props.product.supplier_id === 14142 ? (
                      <>
                        <label>Шуурхай ангилал </label>
                        <Select
                          options={options2}
                          id="category"
                          onChange={(e) => setGroup(e.value)}
                          defaultValue={{
                            label: defaultValueLabel2 === null ? "Ангилал" : defaultValueLabel2,
                            value: props.product.supplierProductGroup,
                          }}
                        />
                      </>
                    ) : null}

                    {/* ------------------ */}
                    <label>Barcode</label>
                    <input type="text" id="productbarcode" defaultValue={props.product.bar_code} />
                    <label>SKU</label>
                    <input type="text" id="productsku" defaultValue={props.product.sku} />
                    <label>Хайрцаг/авдар дахь тоо</label>
                    <input type="number" id="in_case" defaultValue={newIncase} />
                    <label>Агуулахын үлдэгдэл</label>
                    <input type="number" id="stock" defaultValue={props.product.stock} />
                    <label>Тайлбар</label>
                    <input
                      type="text"
                      id="productdescription"
                      defaultValue={props.product.description}
                    />
                    <label>Дараалал</label>
                    <input type="input" id="productpriority" defaultValue={priorityNew} />
                    <label
                      style={{
                        display: props.product.supplier_id === 14005 ? "block" : "none",
                      }}
                    >
                      Дундаж жин/кг
                    </label>
                    <input
                      id="productpriority"
                      value={weightProduct}
                      type="number"
                      min={0}
                      onChange={(e) => {
                        setWeightProduct(e.target.value);
                      }}
                      style={{
                        display: props.product.supplier_id === 14005 ? "block" : "none",
                      }}
                    />
                    <label
                      style={{
                        display:
                          props.product.supplier_id === 13884 || props.product.supplier_id === 14051
                            ? "block"
                            : "none",
                      }}
                    >
                      Улаанбаатар/Орон нутаг
                    </label>
                    <select
                      style={{
                        display:
                          props.product.supplier_id === 13884 || props.product.supplier_id === 14051
                            ? "block"
                            : "none",
                      }}
                      value={choseddata}
                      onChange={(e) => {
                        setChoseddata(e.target.value);
                      }}
                    >
                      {oronnudagdata.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                      }}
                    >
                      <span style={{ display: "flex" }}>
                        <div style={{ marginRight: "40px" }}>
                          <label>Алкохол</label>
                          <div>
                            <input
                              type="checkbox"
                              checked={alco}
                              onChange={() => {
                                setAlco(!alco);
                              }}
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div>
                        <div style={{ marginRight: "40px" }}>
                          <label>Pickpack</label>
                          <div>
                            <input
                              type="checkbox"
                              checked={pp}
                              onChange={() => {
                                setPp(!pp);
                              }}
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div>
                        <div style={{ marginRight: "40px" }}>
                          <label>Хотын татвар</label>
                          <div>
                            <input
                              type="checkbox"
                              checked={cityTax}
                              onChange={() => {
                                setCityTax(!cityTax);
                              }}
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div>
                        {/* <div style={{ marginRight: "40px" }}>
                          <label>Орон нутаг</label>
                          <div>
                            <input
                              type="checkbox"
                              checked={oronnutag}
                              onChange={() => {
                                setOronnutag(!oronnutag);
                              }}
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div> */}
                        <div style={{ marginRight: "40px" }}>
                          <label>НӨАТ</label>
                          <div>
                            <input
                              type="checkbox"
                              checked={noat}
                              onChange={() => {
                                setNoat(!noat);
                              }}
                              style={{ width: "20px" }}
                            />
                          </div>
                        </div>
                        {/* <div>
                        <label>Бутархайгаар сагслах</label>
                        <div>
                          <input
                            type="checkbox"
                            checked={butarhaiSagslah}
                            onChange={() => {
                              setButarhaiSagslah(!butarhaiSagslah);
                            }}
                            style={{ width: "20px" }}
                          />
                        </div>
                      </div> */}
                      </span>
                      <Popconfirm
                        placement="left"
                        title="Та энэ бүтээгдхүүнийг устгахдаа итгэлтэй байна уу?"
                        onConfirm={() => deleteHandler()}
                        okText="Тийм"
                        cancelText="Үгүй"
                      >
                        <img src={deleteIcon} style={{ marginTop: "6px" }} />
                      </Popconfirm>
                    </div>
                    <button onClick={() => save()}>Хадгалах</button>
                  </div>
                ),
              },
              {
                label: <div className={css.tabHeader}>Зураг</div>,
                key: "2",
                children: (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        flexWrap: "wrap",
                        display: "flex",
                      }}
                    >
                      {renderHTML}
                      <img
                        src="https://ebazaar.mn/icon/photo-add.svg"
                        onClick={() => up()}
                        alt=""
                        style={{ height: "168px", width: "168px" }}
                      />
                    </div>
                    <button onClick={() => savePicture()} style={{ marginTop: "50px" }}>
                      Хадгалах
                    </button>
                  </div>
                ),
              },
              {
                label: <div className={css.tabHeader}>Үнийн тохиргоо</div>,
                key: "3",
                children: (
                  <div>
                    <input
                      type="number"
                      id="productprice"
                      defaultValue={
                        props.product.locations["62f4aabe45a4e22552a3969f"].price.channel[1]
                      }
                    />
                    <button onClick={() => savePrice()} style={{ marginTop: "50px" }}>
                      Хадгалах
                    </button>
                  </div>
                ),
              },
              {
                label: <div className={css.tabHeader}>Zone</div>,
                key: "4",
                children: <Zones product={props.product} selected={props.selected} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Info;