import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import ReactDOM from "react-dom";
import Import from "./Import";
import Update from "./Update";
import readXlsxFile from "read-excel-file";
import XLSX from "./XLSX";
import NewProduct from "./NewProduct/NewProduct";
import ProductReportHook from "../Hooks/ProductsReportHook";
import ProductHook from "../Hooks/ProductHook";
import AppHook from "../Hooks/AppHook";
import Setting from "./Setting/Setting";
import Suppliers from "../components/Suppliers/Suppliers";
import PriceTerm from "../PaymentTerm/PaymentTerm";
import PaymentTermNew from "../PaymentTerm/PaymentTermNew";
import { styles } from "./style";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import HeaderContentOresh from "../components/oresh/headerContent/HeaderContent";
import CreateProduct from "./CreateProduct/CreateProduct";
import { GlobalContext } from "../Hooks/GlobalContext";
import myHeaders from "../components/MyHeader/myHeader";

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo((props) => {
  const appctx = useContext(AppHook);
  const prodCtx = useContext(ProductHook);
  const productsCtx = useContext(ProductReportHook);

  const { getSafeDecent } = useContext(GlobalContext);
  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);
  const [suppValue, setSuppValue] = useState();
  const [updater, setUpdater] = useState(false);
  const [butarhai, setButarhai] = useState("all");
  let [fetchedData, setFetchedData] = useState([]);
  const [antselectcat, setAntselectcat] = useState([]);
  const [importData, setImportData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  let [exportToExcel, setExportToExcel] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [categories, setCategories] = useState(props.categories);
  const [safeDecent, setSafeDecent] = useState([]);
  const [coMerchant, setCoMerchant] = useState([]);
  const [coSuppliers, setCoSuppliers] = useState([]);
  const [suppFilter, setSuppFilter] = useState("All");
  const [sitedataOne, setSitedataOne] = useState([]);
  const [productGroup, setProductGroup] = useState();

  const [selectedWarehouse, setSelectedWarehouse] = useState({
    id: null,
    productIds: [],
  });
  const [warehouse, setWarehouse] = useState([]);

  const suppliers = props.suppliers;
  let date = null;
  let delivery_date = null;
  let filterBarcode = null;
  let filterSKU = null;
  let searchName = null;
  let vendor = null;
  let phone = null;
  let productId = null;

  const pathname = window.location.pathname;

  useEffect(() => {
    setShowRefreshBtn(true);
    if (pathname === "/oresh") {
      setHeaderContent(
        <HeaderContentOresh
          setPage={props.setPage}
          userData={props.userData}
          suppliers={props.suppliers}
        />
      );
    } else {
      setHeaderContent(
        <HeaderContent
          setPage={props.setPage}
          userData={props.userData}
          suppliers={props.suppliers}
        />
      );
    }
    return () => {
      setShowRefreshBtn(false);
      setHeaderContent(<></>);
    };
  }, []);

  const handleWarehouseChange = (warehouseId) => {
    const selectedWarehouseData = productsCtx.warehouseData?.data.find(
      (warehouse) => warehouse._id === warehouseId
    );
    const productIds =
      selectedWarehouseData?.products.map((product) => product._id) || [];

    setSelectedWarehouse({ id: warehouseId, productIds });
  };
  console.log("selectedWarehouse", selectedWarehouse);

  useEffect(() => {
    fetch("https://api2.ebazaar.mn/api/backoffice/newsuppliers?id=13884", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.ProductGroups) {
          setProductGroup(JSON.parse(response?.ProductGroups));
        }
      });
  }, []);

  const getCoMerchant = async () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    if (pathname === "/oresh") {
      const match = props.userData.company_id.match(/\|(\d+)\|/)[1];
      await fetch(
        `https://api2.ebazaar.mn/api/backoffice/suppliers?id=${match}`,
        requestOptions
      )
        .then((r) => r.json())
        .then((response) => {
          let data = response.data;
          console.log(data[data.length - 1]);
          setCoMerchant(data[data.length - 1]?.coMerchant.split(","));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    getCoMerchant();
    setShowRefreshBtn(true);
    // |1| to 1
    const match = props.userData.company_id.match(/\|(\d+)\|/)[1];

    const fetchData = async () => {
      try {
        const res = await getSafeDecent({
          supplierId: Number(match),
        });
        setSafeDecent(res.value);
      } catch (error) {
        console.error(error);
      }
    };
    if (pathname === "/oresh") {
      fetchData();
    }
  }, []);

  useEffect(() => {
    let aa = [];
    if (props.userData.company_id === "|948|") {
      let bb = productsCtx.sitedata.categories.filter(
        (item) => item.id == 27126
      );
      let cc = productsCtx.sitedata.categories.filter(
        (item) => item.parent_id == 27126
      );

      let dd = productsCtx.sitedata.categories.filter(
        (item) => item.id == 27137
      );

      let ee = productsCtx.sitedata.categories.filter(
        (item) => item.parent_id == 27137
      );

      aa.push(...bb);

      aa.push(...cc);
      aa.push(...dd);
      aa.push(...ee);
    } else {
      let bb = productsCtx.sitedata?.categories?.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      aa.push(...bb);
    }
    setSitedataOne(aa);
    let data = [];
    productsCtx.sitedata.categories.map((item) => {
      data.push({
        value: item.id,
        label: item.name,
      });
    });
    setAntselectcat(data);
  }, []);

  useEffect(() => {
    try {
          let aa = [];
    let bb = productsCtx.warehouseData?.data?.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    aa.push(...bb);
    setWarehouse(aa);
    let data = [];
    productsCtx.warehouseData.data.map((item) => {
      data.push({
        value: item.id,
        label: item.name,
      });
    });
    } catch(e) {
      console.log(e)
    }
  }, []);

  const renderProducts = () => {
    if (document.getElementById("foobar")) {
      ReactDOM.render(
        <React.StrictMode>
          <List
            supplier={suppValue}
            brands={props.brands}
            categories={categories}
            date={date}
            key={Math.random()}
            delivery_date={delivery_date}
            phone={phone}
            suppliers={suppliers}
            barcode={filterBarcode}
            sku={filterSKU}
            search={searchName}
            vendor={vendor}
            userData={props.userData}
            setFetchedData={setFetchedData}
            productId={productId}
            business_types={productsCtx.sitedata.business_types}
            app={props.app}
            selected={prodCtx.selected}
            setSelected={prodCtx.setSelected}
            setSelectedProduct={prodCtx.setSelectedProduct}
            appctx={appctx}
            butarhai={butarhai}
            categorySelected={categorySelected}
            warehouseSelected={selectedWarehouse}
            safeDecent={safeDecent}
            coSuppliers={coSuppliers}
            setCoSuppliers={setCoSuppliers}
            suppFilter={suppFilter}
          />
        </React.StrictMode>,
        document.getElementById("foobar")
      );
    }
  };

  const filterBySKU = (s) => {
    if (s.length >= 3) {
      filterSKU = s;
      renderProducts();
    } else if (s.length === 0) {
      filterSKU = null;
      renderProducts();
    }
  };
  const searchBarcode = (e) => {
    if (e.length >= 4) {
      filterBarcode = e;
      renderProducts();
    }
  };
  const searchByName = (s) => {
    if (s.length >= 2) {
      searchName = s;
      renderProducts();
    } else if (s.length === 0) {
      searchName = null;
      renderProducts();
    }
  };
  const searchByVendor = (s) => {
    if (s.length >= 2) {
      vendor = s;
      renderProducts();
    } else if (s.length === 0) {
      vendor = null;
      renderProducts();
    }
  };

  useEffect(() => {
    renderProducts();
  }, [
    suppValue,
    prodCtx.selected,
    butarhai,
    selectedWarehouse,
    categorySelected,
    safeDecent,
    suppFilter,
  ]);

  const readExcel = () => {
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
          '><input type="file" id="read" /></form>'
      );

    document.getElementById("read").click();
    document.getElementById("read").addEventListener(
      "change",
      () => {
        const schema = {
          price: {
            prop: "price",
            type: Number,
          },
          barcode: {
            prop: "barcode",
            type: String,
          },
          active: {
            prop: "active",
            type: String,
          },
          sku: {
            prop: "sku",
            type: String,
          },
          name: {
            prop: "name",
            type: String,
          },
          description: {
            prop: "description",
            type: String,
          },
          incase: {
            prop: "incase",
            type: Number,
          },
          stock: {
            prop: "stock",
            type: Number,
          },
          proper_stock: {
            prop: "proper_stock",
            type: String,
          },
          city_tax: {
            prop: "city_tax",
            type: String,
          },
          safe_stock: {
            prop: "safe_stock",
            type: String,
          },
          supplier_minimum_order_amount: {
            prop: "supplier_minimum_order_amount",
            type: String,
          },
          minimum_order_quantity: {
            prop: "minimum_order_quantity",
            type: String,
          },
          pick_date: {
            prop: "pick_date",
            type: String,
          },
          brand: {
            prop: "brand",
            type: String,
          },
          category: {
            prop: "category",
            type: String,
          },
          alcohol: {
            prop: "alcohol",
            type: String,
          },
          product_measure: {
            prop: "product_measure",
            type: String,
          },
          storage_day: {
            prop: "storage_day",
            type: String,
          },
          product_weigth: {
            prop: "product_weigth",
            type: String,
          },
          slug: {
            prop: "slug",
            type: String,
          },
          priority: {
            prop: "priority",
            type: Number,
          },
          shuurhaicat: {
            prop: "shuurkhaicat",
            type: String,
          },
        };
        readXlsxFile(document.getElementById("read").files[0], { schema }).then(
          (rows) => {
            setImportData(rows);
          }
        );
      },
      false
    );
  };

  const readExcelUpdate = () => {
    console.log("readExcelUpdate");
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
          '><input type="file" id="read" /></form>'
      );
    document.getElementById("read").click();
    document.getElementById("read").addEventListener(
      "change",
      () => {
        const schema = {
          price: {
            prop: "price",
            type: Number,
          },
          id: {
            prop: "id",
            type: String,
          },
          name: {
            prop: "name",
            type: String,
          },
          sku: {
            prop: "sku",
            type: String,
          },
          barcode: {
            prop: "barcode",
            type: String,
          },
          active: {
            prop: "active",
            type: String,
          },
          description: {
            prop: "description",
            type: String,
          },
          incase: {
            prop: "incase",
            type: String,
          },

          priority: {
            prop: "priority",
            type: Number,
          },
          stock: {
            prop: "stock",
            type: String,
          },
          proper_stock: {
            prop: "proper_stock",
            type: String,
          },
          city_tax: {
            prop: "city_tax",
            type: String,
          },
          safe_stock: {
            prop: "safe_stock",
            type: String,
          },
          supplier_minimum_order_amount: {
            prop: "supplier_minimum_order_amount",
            type: String,
          },
          minimum_order_quantity: {
            prop: "minimum_order_quantity",
            type: String,
          },
          pick_date: {
            prop: "pick_date",
            type: String,
          },
          brand: {
            prop: "brand",
            type: String,
          },
          category: {
            prop: "category",
            type: String,
          },
          slug: {
            prop: "slug",
            type: String,
          },
          shuurhaicat: {
            prop: "shuurkhaicat",
            type: String,
          },
        };
        readXlsxFile(document.getElementById("read").files[0], { schema }).then(
          (rows) => {
            setUpdateData(rows);
          }
        );
      },
      false
    );
  };

  localStorage.setItem("prodids", JSON.stringify([]));

  useEffect(() => {
    productsCtx.setProductsAll(fetchedData);
  }, [fetchedData]);

  const exportExcel = () => {
    setExportToExcel(true);
  };
  const searchById = (e) => {
    if (e.key === "Enter") {
      productId = e.target.value;
      renderProducts();
    } else if (e.target.value.length === 0 && e.key === "Enter") {
      productId = null;
      renderProducts();
    }
  };
  useEffect(() => {
    if (productsCtx?.massExport === true) {
      exportExcel();
    } else if (productsCtx?.massImport === true) {
      readExcel();
    } else if (productsCtx?.massUpdate === true) {
      readExcelUpdate();
    } else {
      return;
    }
  }, [
    productsCtx?.newProduct,
    productsCtx?.massImport,
    productsCtx?.massExport,
    productsCtx?.massUpdate,
  ]);

  // console.log("IMPORT DATA", importData);

  return suppliers ? (
    <div>
      {productsCtx?.massImport && importData ? (
        <Import
          data={importData}
          // setImporter={setImporter}
          setImporter={productsCtx?.setMassImport}
          suppliers={suppliers}
          pageData={props}
          productGroup={productGroup}
        />
      ) : null}
      {productsCtx?.massUpdate && updateData ? (
        <Update
          data={updateData}
          setUpdater={productsCtx.setMassUpdate}
          suppliers={suppliers}
          pageData={props}
          productGroup={productGroup}
        />
      ) : null}
      {productsCtx?.massExport ? (
        <XLSX
          data={fetchedData}
          categories={categories}
          suppliers={suppliers}
          suppValue={suppValue}
          company_id={parseInt(props?.userData?.company_id.replaceAll("|", ""))}
        />
      ) : null}
      {productsCtx?.newProduct && <NewProduct />}
      {prodCtx?.settingView && <Setting />}
      {prodCtx?.priceTerm && (
        <PriceTerm userData={props.userData} suppliers={suppliers} />
      )}

      {prodCtx?.createProd && <CreateProduct />}
      {/* {prodCtx.priceTerm && (
        <PaymentTermNew userData={props.userData} suppliers={suppliers} />
      )} */}
      <div
        style={{
          width: "auto",
          overflowX: "scroll",
          overflowY: "hidden",
          height: "94.5vh",
        }}
      >
        <div
          style={{
            // width: "1950px",
            width:
              props.userData.company_id === "|1|"
                ? "fit-content"
                : "fit-content",
            height: "64px",
            background: "green",
          }}
        >
          <div className="row header">
            <div style={{ ...styles.checkboxcontainer }}>
              <div>
                <span className="header">ID</span>
                <input type="text" onKeyPress={(e) => searchById(e)} />
              </div>
            </div>
            <div style={{ ...styles.logoContainer }}>
              <div>
                <span className="header">Show</span>
                <input type="text" />
              </div>
            </div>
            <div
              style={{
                display: props.userData.company_id === "|1|" ? "block" : "none",
                width: "160px",
              }}
            >
              <div>
                <Suppliers setSuppValue={setSuppValue} />
              </div>
            </div>
            <div style={{ width: "80px" }}>
              <div>
                <span className="header">Image</span>
                <input type="text" />
              </div>
            </div>
            <div style={{ width: "200px" }}>
              <div>
                <span className="header">Name</span>
                <input
                  type="text"
                  onChange={(e) => searchByName(e.target.value)}
                />
              </div>
            </div>
            <div
              style={{
                display:
                  props.userData.company_id === "|13884|" ||
                  props.userData.company_id === "|1|"
                    ? "block"
                    : "none",
                width: "100px",
              }}
            >
              <div>
                <span className="header">Vendor</span>
                <input
                  type="text"
                  onChange={(e) => searchByVendor(e.target.value)}
                />
              </div>
            </div>

            <div style={{ width: "120px" }}>
              <div>
                <span className="header">Агуулах</span>

                <select
                  value={selectedWarehouse.id}
                  onChange={(e) => handleWarehouseChange(e.target.value)}
                >
                  <option value="">Бүгд</option>;
                  {warehouse &&
                    warehouse.map((item) => {
                      return <option value={[item._id]}>{item.name}</option>;
                    })}
                </select>
              </div>
            </div>

            <div style={{ width: "120px" }}>
              <div>
                <span className="header">Ангилал</span>
                {/* <input type="text" /> */}

                <select
                  value={categorySelected}
                  onChange={(e) => setCategorySelected(e.target.value)}
                >
                  <option value="">Бүгд</option>;
                  <option value="0">Ангилалгүй бараа</option>;
                  {sitedataOne &&
                    sitedataOne.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                </select>
              </div>
            </div>

            {pathname !== "/oresh" ? (
              <div style={{ width: "240px" }}>
                <div>
                  <span className="header">Дэлгэрэнгүй</span>
                  <input type="text" />
                </div>
              </div>
            ) : (
              <div style={{ width: "120px" }}>
                <div>
                  <span className="header">Нийлүүлэгч</span>
                  <select
                    onChange={(e) => {
                      setSuppFilter(e.target.value);
                    }}
                  >
                    <option value="All">Бүгд</option>
                    {console.log("coSupplierscoSuppliers", coSuppliers)}
                    {coSuppliers.map((e) => {
                      return (
                        <option value={e.supplierId}>{e.supplierName}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            {pathname !== "/oresh" ? (
              <>
                <div style={{ width: "120px" }}>
                  <div>
                    <span className="header">Үлдэгдэл</span>
                    <input type="text" />
                  </div>
                </div>
              </>
            ) : (
              coMerchant
                .sort((a, b) => a - b)
                .map((e) => (
                  <div style={{ width: "120px" }} key={e}>
                    <div>
                      <span className="header">{e}</span>
                      <input type="text" disabled />
                    </div>
                  </div>
                ))
            )}

            {props.userData.company_id === "|1|" && pathname !== "/oresh" && (
              <>
                <div style={{ width: "80px" }}>
                  <div>
                    <span className="header" style={{ lineHeight: "14px" }}>
                      Зохистой хэмжээ
                    </span>
                    <input type="text" />
                  </div>
                </div>
                <div style={{ width: "80px" }}>
                  <div>
                    <span className="header" style={{ lineHeight: "14px" }}>
                      Аюулгүйн нөөц
                    </span>
                    <input type="text" />
                  </div>
                </div>
              </>
            )}
            {props.userData.company_id === "|1|" && (
              <>
                <div style={{ width: "80px" }}>
                  <div>
                    <span className="header" style={{ lineHeight: "14px" }}>
                      Min_order qty
                    </span>
                    <input type="text" />
                  </div>
                </div>
                <div style={{ width: "80px" }}>
                  <div>
                    <span className="header" style={{ lineHeight: "14px" }}>
                      Sup_min order
                    </span>
                    <input type="text" />
                  </div>
                </div>
                <div style={{ width: "80px" }}>
                  <div>
                    <span className="header" style={{ lineHeight: "14px" }}>
                      Хүргэлтийн өдөр
                    </span>
                    <input type="text" />
                  </div>
                </div>
              </>
            )}

            <div style={{ width: "120px" }}>
              <div>
                <span className="header">Barcode</span>
                <input
                  type="text"
                  onChange={(e) => searchBarcode(e.target.value)}
                />
              </div>
            </div>
            <div style={{ width: "120px" }}>
              <div>
                <span className="header">SKU</span>
                <input
                  type="text"
                  onChange={(e) => filterBySKU(e.target.value)}
                />
              </div>
            </div>
            <div style={{ width: "120px" }}>
              <div>
                <span className="header">Price</span>
                <input type="text" />
              </div>
            </div>
            {pathname !== "/oresh" ? (
              <>
                <div style={{ width: "100px" }}>
                  <div>
                    <span className="header">Сагслах тоо</span>
                    <input type="text" />
                  </div>
                </div>
                <div style={{ width: "100px" }}>
                  <div>
                    <span className="header">Хотын татвар</span>
                    <input type="text" />
                  </div>
                </div>
                <div style={{ width: "100px" }}>
                  <div>
                    <span className="header">Бутархайгаар сагслах</span>
                    <select
                      value={butarhai}
                      onChange={(e) => setButarhai(e.target.value)}
                    >
                      <option value={"all"}>Бүгд</option>
                      <option value={true}>Бутархай</option>
                      <option value={false}>Бутархай бус</option>
                    </select>
                  </div>
                </div>
              </>
            ) : null}
            {props.userData.company_id === "|1|" && (
              <div style={{ width: "80px" }}>
                <div>
                  <span className="header">Pickpack</span>
                  <input type="text" />
                </div>
              </div>
            )}
            {props.userData.company_id === "|1|" && (
              <div style={{ width: "100px" }}>
                <div>
                  <span className="header">Устгах</span>
                  <input
                    type="text"
                    // onChange={(e) => searchBarcode(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            )}

            {props.userData.company_id === "|1|" && (
              <div
                style={{
                  width: "100px",
                }}
              >
                <div>
                  <span className="header">Дэлгүүр тохируулах</span>
                  <input
                    type="text"
                    // onChange={(e) => searchBarcode(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          id="foobar"
          style={{
            width:
              props.userData.company_id === "|1|"
                ? "fit-content"
                : "fit-content",
            overflowX: "auto",
          }}
        ></div>
      </div>
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
}, areEqual);

export default Index;
