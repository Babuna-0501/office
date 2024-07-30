// CSS
import css from './productTargetAdd.module.css';

// Images
import {
  CloseDark,
  TugrugGray,
  TugrugGreen,
  TargetWhite
} from '../../../../../assets/icons';

// Components
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  LoadingSpinner,
  SuccessPopup
} from '../../../../../components/common';
import { useEffect, useState } from 'react';
import myHeaders from '../../../../../components/MyHeader/myHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorPopup from '../../../../../components/common/ErrorPopup';

export const ProductTargetAdd = props => {
  const {
    closeHandler,
    loggedUser,
    categories: initCategories,
    brands: initBrands,
    setTarget,
    setTargetExist,
    setProductTargetExist,
    setTotalProductTargetExist,
    setProducts: setInitProducts,
    categoryTargetExist,
    brandTargetExist
  } = props;

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorWhileFetching, setErrorWhileFetching] = useState(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  const [productName, setProductName] = useState('');
  const [productSupplier, setProductSupplier] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const [productSku, setProductSku] = useState('');

  const getProducts = async () => {
    try {
      let currentPageCopy = currentPage;

      if (
        productName ||
        productSupplier ||
        productCategory ||
        productBrand ||
        productBarcode ||
        productSku
      ) {
        currentPageCopy = 1;
        setCurrentPage(1);
      }
      if (currentPageCopy === 1 && currentPage === 1) setLoading(true);

      let params = `page=${currentPageCopy}&limit=50&`;

      if (productName) {
        params += `&search=${productName}&`;
      }

      if (productSupplier) {
        params += `supplier=${productSupplier}&`;
      } else {
        params += `supplier=${loggedUser.company_id.replaceAll('|', '')}&`;
      }

      if (productCategory) {
        params += `category=${productCategory}&`;
      }

      if (productBrand) {
        params += `brand=${productBrand}&`;
      }

      if (productBarcode) {
        params += `bar_code=${productBarcode}&`;
      }

      if (productSku) {
        params += `sku=${productSku}&`;
      }

      const url = `${process.env.REACT_APP_API_URL2}/api/products/get1?${params}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.data.length === 0) setHasMore(false);

      if (currentPageCopy === 1) {
        setProducts(
          resData.data.map(prod => ({
            ...prod,
            singlePrice:
              prod.locations?.['62f4aabe45a4e22552a3969f']?.price
                ?.channel?.[1] ?? 0
          }))
        );
      } else {
        setProducts(prev => [
          ...prev,
          ...resData.data.map(prod => ({
            ...prod,
            singlePrice:
              prod.locations?.['62f4aabe45a4e22552a3969f']?.price
                ?.channel?.[1] ?? 0
          }))
        ]);
      }
    } catch (error) {
      setErrorMsg('Алдаа гарлаа та дахин оролдоно уу!');
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const suppliersUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
      const suppExtraDataUrl = `${
        process.env.REACT_API_URL2
      }/supplier/extra/data?supplierId=${loggedUser.company_id.replaceAll(
        '|',
        ''
      )}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const [supplierRes, extraRes] = await Promise.all([
        fetch(suppliersUrl, requestOptions),
        fetch(suppExtraDataUrl, requestOptions)
      ]);
      const supplierData = await supplierRes.json();
      const extraData = await extraRes.json();

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
    } catch (error) {
      console.log(error);
      setErrorMsg('Алдаа гарлаа та дахин оролдоно уу!');
      setShowErrorMsg(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    productName,
    productSupplier,
    productCategory,
    productBrand,
    productBarcode,
    productSku
  ]);

  const saveHandler = () => {
    try {
      if (selectedProducts.length === 0)
        throw new Error('Бүтээгдэхүүн сонгоно уу!');
      if (selectedProducts.length === products.length && totalAmount === '')
        throw new Error('Багц бүтээгдэхүүний төлөвлөгөөний дүн оруулна уу!');
      if (
        selectedProducts.filter(prod => prod.target).length !==
          selectedProducts.length &&
        selectedProducts.length !== products.length
      )
        throw new Error('Сонгосон бүтээгдэхүүнд төлөвлөгөө оруулна уу!');

      if (selectedProducts.length === products.length) {
        if (categoryTargetExist || brandTargetExist)
          throw new Error(
            'Ангилал болон брэнд төлөвлөгөө үүссэн тул бүтээгдэхүүн багц төлөвлөгөө үүсгэх боломжгүй!'
          );

        setTarget(prev => ({
          ...prev,
          target: {
            goal: Number(totalAmount),
            succeeded: 0,
            waiting: 0
          },
          type: 2
        }));
        setTotalProductTargetExist(true);
        setSuccessMsg('Бүтээгдэхүүний багц төлөвлөгөө амжилттай нэмэгдлээ');
      } else {
        setTarget(prev => ({
          ...prev,
          products: selectedProducts.map(prod => ({
            _id: prod._id,
            target: { ...prod.target },
            succeeded: { amount: 0, quantity: 0 },
            waiting: { amount: 0, quantity: 0 }
          })),
          type: 1
        }));
        setInitProducts(prev => [
          ...prev,
          ...selectedProducts.map(prod => {
            delete prod.target;
            return prod;
          })
        ]);
        setProductTargetExist(true);
        setSuccessMsg('Бүтээгдэхүүний төлөвлөгөө амжилттай нэмэгдлээ');
      }

      setTargetExist(true);
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorWhileFetching(false);
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Бүтээгдэхүүний төлөвлөгөө</h1>

          <button type='button' onClick={closeHandler} className={css.closeBtn}>
            <CloseDark />
          </button>
        </div>

        <div className={css.content}>
          <div className={css.contentHeader} style={{ zIndex: 101 }}>
            <div
              className={css.headerItem}
              style={{ width: 34, justifyContent: 'center' }}
            >
              <Checkbox
                checked={
                  selectedProducts
                    .map(product => product._id)
                    .sort()
                    .join(',') ===
                  products
                    .map(product => product._id)
                    .sort()
                    .join(',')
                }
                onChange={() => {
                  if (
                    selectedProducts
                      .map(product => product._id)
                      .sort()
                      .join(',') ===
                    products
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
            <div className={css.contentBody} id='scrollDiv'>
              <InfiniteScroll
                scrollableTarget='scrollDiv'
                dataLength={products.length}
                hasMore={hasMore}
                next={() => {
                  setCurrentPage(prev => prev + 1);
                }}
                loader={<h4 className={css.loadingScroll}>Уншиж байна...</h4>}
              >
                {products.map((product, index) => {
                  return (
                    <SingleProduct
                      key={`target-product-${product._id}`}
                      product={product}
                      products={products}
                      zIndex={products.length - index}
                      suppliers={suppliers}
                      categories={categories}
                      brands={brands}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                    />
                  );
                })}
              </InfiniteScroll>
            </div>
          )}

          {!loading && products.length === 0 && products.length === 0 && (
            <div className={css.notFound}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}

          {loading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>

        <div className={css.footer}>
          {selectedProducts
            .map(product => product._id)
            .sort()
            .join(',') ===
            products
              .map(product => product._id)
              .sort()
              .join(',') && (
            <div className={css.inputs}>
              <Input
                size='small'
                type='number'
                value={totalAmount}
                onChange={e => setTotalAmount(e.target.value)}
                placeholder='0'
                icon={totalAmount ? <TugrugGreen /> : <TugrugGray />}
                iconposition='right'
                width={130}
              />
              {/* <Input size="small" placeholder="0" width={130} /> */}
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
          errorWhileFetching && getProducts();
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg('');
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
    product.target ? product.target.amount : ''
  );
  const [quantity, setQuantity] = useState(
    product.target ? product.target.quantity : ''
  );

  useEffect(() => {
    if (amount) {
      setSelectedProducts(prev =>
        prev.map(prod =>
          prod._id === product._id
            ? { ...prod, target: { amount: Number(amount), quantity: null } }
            : prod
        )
      );
    } else {
      setSelectedProducts(prev =>
        prev.map(prod => {
          if (prod._id === product._id) {
            delete prod.target;
            return prod;
          } else {
            return prod;
          }
        })
      );
    }
  }, [amount, product, setSelectedProducts]);

  useEffect(() => {
    if (quantity) {
      setSelectedProducts(prev =>
        prev.map(prod =>
          prod._id === product._id
            ? { ...prod, target: { amount: null, quantity: Number(quantity) } }
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
  }, [product, setSelectedProducts, quantity]);

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
          onChange={e => setAmount(e.target.value)}
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
          onChange={e => setQuantity(e.target.value)}
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
