import css from './productTargetEdit.module.css';

import {
  CloseDark,
  TugrugGray,
  TugrugGreen,
  TargetWhite
} from '../../../../../assets/icons';
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  LoadingSpinner,
  SuccessPopup
} from '../../../../../components/common';
import myHeaders from '../../../../../components/MyHeader/myHeader';
import { useEffect, useState } from 'react';
import ErrorPopup from '../../../../../components/common/ErrorPopup';

export const ProductTargetEdit = ({
  initCategories,
  initBrands,
  loggedUser,
  closeHandler,
  target,
  productTarget,
  setTarget,
  setProductTargetExist,
  setTotalProductTargetExist,
  categoryTargetExist,
  brandTargetExist,
  setInitProducts
}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [origProducts, setOrigProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorWhileFetching, setErrorWhileFetching] = useState(false);
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState('');
  const [productSupplier, setProductSupplier] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const [productSku, setProductSku] = useState('');

  const [totalAmount, setTotalAmount] = useState(target ? target.goal : '');

  const getData = async () => {
    try {
      setLoading(true);

      const suppliersUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
      const suppExtraDataUrl = `${
        process.env.REACT_API_URL2
      }/supplier/extra/data?supplierId=${loggedUser.company_id.replaceAll(
        '|',
        ''
      )}`;
      const productsUrl = `${
        process.env.REACT_API_URL2
      }/products/get1?supplier=${loggedUser.company_id.replaceAll(
        '|',
        ''
      )}&page=1`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const [supplierRes, extraRes, productsRes] = await Promise.all([
        fetch(suppliersUrl, requestOptions),
        fetch(suppExtraDataUrl, requestOptions),
        fetch(productsUrl, requestOptions)
      ]);
      const supplierData = await supplierRes.json();
      const extraData = await extraRes.json();
      const productsData = await productsRes.json();

      setSuppliers(supplierData.data);
      setCategories(
        initCategories.filter(cat =>
          extraData?.data?.categoryIds?.includes(cat.id)
        )
      );
      setBrands(
        initBrands.filter(
          brand =>
            brand.SupplierID === loggedUser.company_id.replaceAll('|', '')
        )
      );

      let productsCopy = productsData.data.map(prod => ({
        ...prod,
        singlePrice:
          prod.locations?.['62f4aabe45a4e22552a3969f']?.price?.channel?.[1] ?? 0
      }));

      if (target) {
        setSelectedProducts(productsCopy);
      } else if (productTarget) {
        productsCopy = productsCopy
          .map(product => {
            const currentTarget = productTarget.find(
              target => target._id === product._id
            );
            if (currentTarget) {
              return { ...product, target: { ...currentTarget.target } };
            }
            return product;
          })
          .sort((a, b) =>
            a.hasOwnProperty('target') ? -1 : b.hasOwnProperty('target') ? 1 : 0
          );
        setSelectedProducts(productsCopy.filter(product => product.target));
      }

      setProducts(productsCopy);
      setOrigProducts(productsCopy);
    } catch (error) {
      console.log(error);
      setErrorWhileFetching(true);
      setErrorMsg('Алдаа гарлаа та дахин оролдоно уу!');
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [
    initBrands,
    initCategories,
    loggedUser.company_id,
    productTarget,
    target
  ]);

  useEffect(() => {
    let productsCopy = [...origProducts];

    if (productName) {
      productsCopy = productsCopy.filter(prod =>
        prod.name.toLowerCase().includes(productName.toLowerCase())
      );
    }

    if (productSupplier) {
      productsCopy = productsCopy.filter(
        prod => prod.supplier_id === Number(productSupplier)
      );
    }

    if (productCategory) {
      productsCopy = productsCopy.filter(
        prod => prod.category_id === Number(productCategory)
      );
    }

    if (productBarcode) {
      productsCopy = productsCopy.filter(
        prod => prod.bar_code === productBarcode
      );
    }

    if (productBrand) {
      productsCopy = productsCopy.filter(prod => prod.brand === productBrand);
    }

    if (productSku) {
      productsCopy = productsCopy.filter(prod => prod.sku === productSku);
    }

    setProducts(productsCopy);
  }, [
    origProducts,
    productName,
    productSupplier,
    productCategory,
    productBarcode,
    productBrand,
    productSku
  ]);

  const saveHandler = () => {
    try {
      const allChecked =
        selectedProducts
          .map(prod => prod._id)
          .sort()
          .join(',') ===
        products
          .map(prod => prod._id)
          .sort()
          .join(',');

      if (!allChecked && !selectedProducts.every(prod => prod.target)) {
        throw new Error('Сонгосон бүтээгдэхүүнд төлөвлөгөө оруулна уу!');
      }
      if (allChecked && !totalAmount) {
        throw new Error('Багц төлөвлөгөөний дүнг оруулна уу!');
      }
      if (
        allChecked &&
        totalAmount &&
        (brandTargetExist || categoryTargetExist)
      ) {
        throw new Error(
          'Ангилал болон брэнд төлөвлөгөө үүсэн үед багц бүтээгдэхүүний төлөвлөгөө үүсгэх боломжгүй!'
        );
      }
      setLoading(true);

      if (allChecked) {
        setTarget(prev => {
          delete prev.products;
          return {
            ...prev,
            type: 2,
            target: prev.target
              ? { ...prev.target, goal: Number(totalAmount) }
              : { goal: Number(totalAmount), succeeded: 0, waiting: 0 }
          };
        });
        setTotalProductTargetExist(true);
        setProductTargetExist(false);
        setInitProducts([]);
      } else {
        setTarget(prev => {
          delete prev.target;

          const prevProds = prev.products
            ? prev.products.map(curTarget => {
                if (
                  selectedProducts.map(prod => prod._id).includes(curTarget._id)
                ) {
                  const current = selectedProducts.find(
                    prod => prod._id === curTarget._id
                  );

                  return { ...curTarget, target: { ...current.target } };
                }
                return curTarget;
              })
            : [];

          return {
            ...prev,
            type: 1,
            products:
              selectedProducts.length === 0
                ? []
                : [
                    ...prevProds,
                    ...selectedProducts
                      .filter(
                        prod =>
                          !prevProds
                            .map(target => target._id)
                            .includes(prod._id)
                      )
                      .map(prod => ({
                        _id: prod._id,
                        target: { ...prod.target },
                        succeeded: { amount: 0, quantity: 0 },
                        waiting: { amount: 0, quantity: 0 }
                      }))
                  ]
          };
        });
        setInitProducts(prev => [
          ...prev,
          ...selectedProducts
            .filter(
              prod => !prev.map(prevProd => prevProd._id).includes(prod._id)
            )
            .map(prod => {
              delete prod.target;
              return prod;
            })
        ]);
        setTotalProductTargetExist(false);
        setProductTargetExist(true);
      }

      setSuccessMsg('Бүтээгдэхүүн төлөвлөгөө амжилттай хадгалагдлаа!');
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorMsg(error.message ?? 'Алдаа гарлаа. Та дахин оролдоно уу!');
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Ангилал төлөвлөгөө</h1>
          <button onClick={closeHandler} className={css.closeBtn}>
            <CloseDark />
          </button>
        </div>

        <div className={css.content}>
          <div className={css.contentHeader}>
            <div
              className={css.headerItem}
              style={{ width: 34, justifyContent: 'center' }}
            >
              <Checkbox
                checked={
                  products
                    .map(product => product._id)
                    .sort()
                    .join(',') ===
                  selectedProducts
                    .map(product => product._id)
                    .sort()
                    .join(',')
                }
                onChange={() => {
                  if (
                    products
                      .map(product => product._id)
                      .sort()
                      .join(',') ===
                    selectedProducts
                      .map(product => product._id)
                      .sort()
                      .join(',')
                  ) {
                    setSelectedProducts([]);
                  } else {
                    setSelectedProducts([...products]);
                  }
                }}
              />
            </div>

            <div className={css.headerItem} style={{ width: 55 }}>
              <span className={css.headerText}>Зураг</span>
            </div>

            <div className={css.headerItem} style={{ width: 140 }}>
              <span className={css.headerText}>Бүтээгдэхүүний нэр</span>
              <Input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                size='small'
                placeholder='Хайх'
              />
            </div>

            <div className={css.headerItem} style={{ width: 140 }}>
              <span className={css.headerText}>Нийлүүлэгч</span>
              <Dropdown
                value={productSupplier}
                onChangeHandler={setProductSupplier}
                datas={suppliers.map(supplier => ({
                  value: supplier.id,
                  label: supplier.name
                }))}
              />
            </div>

            <div className={css.headerItem} style={{ width: 100 }}>
              <span className={css.headerText}>Ангилал</span>
              <Dropdown
                value={productCategory}
                onChangeHandler={setProductCategory}
                datas={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            </div>

            <div className={css.headerItem} style={{ width: 100 }}>
              <span className={css.headerText}>Брэнд</span>
              <Dropdown
                value={productBrand}
                onChangeHandler={setProductBrand}
                datas={brands.map(brand => ({
                  value: brand.BrandID,
                  label: brand.BrandName
                }))}
              />
            </div>

            <div className={css.headerItem} style={{ width: 105 }}>
              <span className={css.headerText}>Баркод</span>
              <Input
                value={productBarcode}
                onChange={e => setProductBarcode(e.target.value)}
                size='small'
                placeholder='Хайх'
              />
            </div>

            <div className={css.headerItem} style={{ width: 80 }}>
              <span className={css.headerText}>SKU</span>
              <Input
                value={productSku}
                onChange={e => setProductSku(e.target.value)}
                size='small'
                placeholder='Хайх'
              />
            </div>

            <div className={css.headerItem} style={{ width: 120 }}>
              <span className={css.headerText}>Үнийн дүн төлөвлөгөө</span>
            </div>

            <div className={css.headerItem} style={{ width: 90 }}>
              <span className={css.headerText}>Тоо / Ширхэг төлөвлөгөө</span>
            </div>
          </div>

          {!loading && products.length > 0 && (
            <div className={css.contentBody}>
              {products.map((product, index) => {
                return (
                  <SingleProduct
                    key={`target-product-edit-${product._id}`}
                    product={product}
                    zIndex={products.length - index}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    products={products}
                    suppliers={suppliers}
                    categories={categories}
                    brands={brands}
                  />
                );
              })}
            </div>
          )}

          {loading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className={css.notFound}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>

        <div className={css.footer}>
          {products
            .map(product => product._id)
            .sort()
            .join(',') ===
            selectedProducts
              .map(product => product._id)
              .sort()
              .join(',') && (
            <div className={css.inputs}>
              <Input
                value={totalAmount}
                onChange={e => setTotalAmount(e.target.value)}
                size='small'
                type='number'
                placeholder='0'
                icon={totalAmount ? <TugrugGreen /> : <TugrugGray />}
                iconposition='right'
                width={130}
              />
            </div>
          )}

          <div className={css.btns}>
            <Button onClick={closeHandler} variant='secondary' size='medium'>
              Цуцлах
            </Button>
            <Button
              onClick={saveHandler}
              variant='primary'
              size='medium'
              width={116}
            >
              Хадгалах
            </Button>
          </div>
        </div>
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg('');
          errorWhileFetching && getData();
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg('');
          if (selectedProducts.length === 0) setProductTargetExist(false);
          closeHandler();
        }}
      />
    </>
  );
};

const SingleProduct = ({
  product,
  zIndex,
  suppliers,
  categories,
  brands,
  selectedProducts,
  setSelectedProducts,
  products
}) => {
  const checked = selectedProducts.map(prod => prod._id).includes(product._id);

  const [amount, setAmount] = useState(
    product.target && product.target.amount ? product.target.amount : ''
  );
  const [quantity, setQuantity] = useState(
    product.target && product.target.quantity ? product.target.quantity : ''
  );

  useEffect(() => {
    if (checked && product.target) {
      if (product.target.amount) setAmount(product.target.amount);
      if (product.target.quantity) setQuantity(product.target.quantity);
    }

    if (!checked) {
      setAmount('');
      setQuantity('');
    }
  }, [checked, product]);

  useEffect(() => {
    if (
      selectedProducts
        .map(prod => prod._id)
        .sort()
        .join(',') ===
      products
        .map(prod => prod._id)
        .sort()
        .join(',')
    ) {
      setAmount('');
      setQuantity('');
    }
  }, [selectedProducts, products]);

  const amountChangeHandler = value => {
    if (value) {
      setSelectedProducts(prev =>
        prev.map(prod =>
          prod._id === product._id
            ? { ...prod, target: { amount: Number(value), quantity: null } }
            : prod
        )
      );
    } else {
      setSelectedProducts(prev =>
        prev.map(prod => {
          if (prod._id === product._id) {
            delete prod.target;
            return prod;
          }
          return prod;
        })
      );
    }
  };

  const quantityChangeHandler = value => {
    if (value) {
      setSelectedProducts(prev =>
        prev.map(prod =>
          prod._id === product._id
            ? { ...prod, target: { amount: null, quantity: Number(value) } }
            : prod
        )
      );
    } else {
      setSelectedProducts(prev =>
        prev.map(prod => {
          if (prod._id === product._id) {
            delete prod.target;
            return prod;
          }
          return prod;
        })
      );
    }
  };

  return (
    <div
      className={`${css.contentRow} ${checked && css.checked}`}
      style={{ zIndex }}
    >
      <div className={css.contentItem} style={{ width: 34 }}>
        <Checkbox
          checked={checked}
          onChange={() => {
            if (checked) {
              setSelectedProducts(prev =>
                prev.filter(prod => prod._id !== product._id)
              );
              setAmount('');
              setQuantity('');
            } else {
              setSelectedProducts(prev => [...prev, product]);
            }
          }}
        />
      </div>

      <div className={css.contentItem} style={{ width: 55 }}>
        <div className={css.productPicture}>
          <img src={product.image[0]} alt={product.name} />
        </div>
      </div>

      <div className={css.contentItem} style={{ width: 140 }}>
        <span className={css.contentText}>{product.name}</span>
      </div>

      <div className={css.contentItem} style={{ width: 140 }}>
        <span className={css.contentText}>
          {
            suppliers.find(supplier => supplier.id === product.supplier_id)
              ?.name
          }
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 100 }}>
        <span className={css.contentText}>
          {
            categories.find(category => category.id === product.category_id)
              ?.name
          }
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 100 }}>
        <span className={css.contentText}>
          {brands.find(brand => brand.BrandID === product.brand)?.BrandName}
        </span>
      </div>

      <div className={css.contentItem} style={{ width: 105 }}>
        <span className={css.contentText}>{product.bar_code}</span>
      </div>

      <div className={css.contentItem} style={{ width: 80 }}>
        <span className={css.contentText}>{product.sku}</span>
      </div>

      <div className={css.contentItem} style={{ width: 120 }}>
        <Input
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
            amountChangeHandler(e.target.value);
          }}
          disabled={
            !checked || quantity || products.length === selectedProducts.length
          }
          size='small'
          placeholder='0'
          icon={amount ? <TugrugGreen /> : <TugrugGray />}
          iconposition='right'
          type='number'
        />
      </div>

      <div className={css.contentItem} style={{ width: 90 }}>
        <Input
          value={quantity}
          type='number'
          onChange={e => {
            setQuantity(e.target.value);
            quantityChangeHandler(e.target.value);
          }}
          disabled={
            !checked || amount || products.length === selectedProducts.length
          }
          size='small'
          placeholder='0'
        />
      </div>
    </div>
  );
};
