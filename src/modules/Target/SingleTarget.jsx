// CSS
import css from './singleTarget.module.css';

// Packages
import { useState, useContext, useEffect } from 'react';

// Hooks
import { HeaderContext } from '../../Hooks/HeaderHook';
import { GlobalContext } from '../../Hooks/GlobalContext';

// Images
import {
  ProfileGray,
  TugrugGray,
  ArrowRightGray,
  CalendarGray
} from '../../assets/icons';

// Components
import {
  ProductTargetAdd,
  SingleTargetBrand,
  SingleTargetCategory,
  SingleTargetHeader,
  SingleTargetProducts,
  CategoryTargetAdd,
  BrandTargetAdd
} from './components/';
import {
  Button,
  Input,
  LoadingSpinner,
  Modal,
  SuccessPopup
} from '../../components/common';
import myHeaders from '../../components/MyHeader/myHeader';
import ErrorPopup from '../../components/common/ErrorPopup';
import { navigate } from '../../utils/navigate';

const SingleTarget = () => {
  const {
    brands: initBrands,
    loggedUser,
    categories: initCategories,
    userRoles,
    globalDataReady
  } = useContext(GlobalContext);
  const [targetId] = useState(window.location.pathname.split('/')[2]);

  const [target, setTarget] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSucceeded, setTotalSucceeded] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);

  const [showProductTargetAdd, setShowProductTargetAdd] = useState(false);
  const [showCategoryTargetAdd, setShowCategoryTargetAdd] = useState(false);
  const [showBrandTargetAdd, setShowBrandTargetAdd] = useState(false);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorWhileFetching, setErrorWhileFetching] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);

  const [targetExist, setTargetExist] = useState(false);
  const [totalProductTargetExist, setTotalProductTargetExist] = useState(false);
  const [productTargetExist, setProductTargetExist] = useState(false);
  const [categoryTargetExist, setCategoryTargetExist] = useState(false);
  const [brandTargetExist, setBrandTargetExist] = useState(false);

  const { setHeaderContent } = useContext(HeaderContext);

  const getData = async () => {
    try {
      setLoading(true);

      const targetUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/users/target?_id=${targetId}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const targetRes = await fetch(targetUrl, requestOptions);
      const targetData = await targetRes.json();

      if (targetData.code === 404) {
        throw new Error(targetData.message);
      }

      let targetProductIds = [];

      if (targetData.data.startDate && targetData.data.endDate) {
        setTargetExist(true);
      }
      if (targetData.data.type === 2) {
        setTotalProductTargetExist(true);
      }
      if (targetData.data.type === 1) {
        if (targetData.data.products && targetData.data.products.length > 0) {
          setProductTargetExist(true);
          for (const targetProduct of targetData.data.products) {
            targetProductIds.push(targetProduct?._id);
          }
        }

        if (
          targetData.data.categories &&
          targetData.data.categories.length > 0
        ) {
          setCategoryTargetExist(true);
        }

        if (targetData.data.brands && targetData.data.brands.length > 0) {
          setBrandTargetExist(true);
        }
      }

      const targetUserId = targetData.data?.user;

      const productsUrl = `https://api2.ebazaar.link/api/products/get1?ids=[${targetProductIds.join(',')}]`;
      const userUrl = `https://api2.ebazaar.link/api/backoffice/users?id=${targetUserId}`;

      const [userRes, productsRes] = await Promise.all([
        fetch(userUrl, requestOptions),
        fetch(productsUrl, requestOptions)
      ]);
      const userData = await userRes.json();
      const productsData = await productsRes.json();

      let suppliersId = [];

      for (const product of productsData.data) {
        suppliersId.push(product.supplier_id);
      }

      suppliersId = [...new Set(suppliersId)];

      const suppliersUrl = `https://api2.ebazaar.link/api/backoffice/suppliers?id=${suppliersId.join(',')}`;

      const suppliersRes = await fetch(suppliersUrl, requestOptions);
      const supplierData = await suppliersRes.json();

      setSuppliers(supplierData.data);
      setProducts(
        productsData.data.map(product => ({
          ...product,
          singlePrice:
            product.locations?.['62f4aabe45a4e22552a3969f']?.price
              ?.channel?.[1] ?? 0
        }))
      );
      setUser(userData.data[0]);
      setTarget(targetData.data);
    } catch (error) {
      if (error.message) {
        setNotFoundError(true);
        setErrorMsg(error.message);
        setShowErrorMsg(true);
      } else {
        setErrorWhileFetching(true);
        setErrorMsg('Алдаа гарлаа. Та дахин оролдоно уу!');
        setShowErrorMsg(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (globalDataReady) getData();
  }, [globalDataReady, targetId]);

  useEffect(() => {
    setHeaderContent(
      <SingleTargetHeader
        {...{
          setShowProductTargetAdd,
          setShowCategoryTargetAdd,
          setShowBrandTargetAdd,
          user,
          productTargetExist,
          brandTargetExist,
          categoryTargetExist,
          loading,
          totalProductTargetExist
        }}
      />
    );

    return () => {
      setHeaderContent(<></>);
    };
  }, [
    setHeaderContent,
    user,
    productTargetExist,
    categoryTargetExist,
    brandTargetExist,
    loading,
    totalProductTargetExist
  ]);

  useEffect(() => {
    try {
      if (target) {
        setStartDate(target.startDate ? target.startDate.split('T')[0] : '');
        setEndDate(target.endDate ? target.endDate.split('T')[0] : '');
      }
    } catch (error) {
      setErrorMsg('Алдаа гарлаа та дахин оролдоно уу!');
      setShowErrorMsg(true);
    }
  }, [target]);

  useEffect(() => {
    try {
      if (targetExist && target) {
        const type = target.type;

        let totalAmountCopy = 0;
        let totalSucceededCopy = 0;
        let totalWaitingCopy = 0;

        if (type === 1) {
          if (target.products && target.products.length > 0) {
            for (const targetProd of target.products) {
              if (targetProd.target.amount) {
                totalAmountCopy += targetProd.target.amount;
                totalSucceededCopy += targetProd.succeeded.amount;
                totalWaitingCopy += targetProd.waiting.amount;
              } else if (targetProd.target.quantity) {
                const currentProduct = products.find(
                  product => product._id === targetProd._id
                );
                const price = currentProduct?.singlePrice ?? 0;
                totalAmountCopy += price * targetProd.target.quantity;
                totalSucceededCopy += price * targetProd.succeeded.quantity;
                totalWaitingCopy += price * targetProd.waiting.quantity;
              }
            }
          }

          if (target.categories && target.categories.length > 0) {
            for (const targetCategory of target.categories) {
              if (targetCategory.target.amount) {
                totalAmountCopy += targetCategory.target.amount;
                totalSucceededCopy += targetCategory.succeeded.amount;
                totalWaitingCopy += targetCategory.waiting.amount;
              }
            }
          }

          if (target.brands && target.brands.length > 0) {
            for (const targetBrand of target.brands) {
              if (targetBrand.target.amount) {
                totalAmountCopy += targetBrand.target.amount;
                totalSucceededCopy += targetBrand.succeeded.amount;
                totalWaitingCopy += targetBrand.waiting.amount;
              }
            }
          }
        }

        if (type === 2) {
          totalAmountCopy += target.target.goal;
          totalSucceededCopy += target.target.succeeded;
          totalWaitingCopy += target.target.waiting;
        }

        setTotalAmount(totalAmountCopy);
        setTotalSucceeded(totalSucceededCopy);
        setTotalWaiting(totalWaitingCopy);
      }
    } catch (error) {
      setErrorMsg('Алдаа гарлаа та дахин оролдоно уу!');
      setShowErrorMsg(true);
    }
  }, [target, targetExist, products]);

  useEffect(() => {
    if (startDate) {
      setTarget(prev => ({ ...prev, startDate }));
    }

    if (endDate) {
      setTarget(prev => ({ ...prev, endDate }));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${loggedUser.company_id}&page=1`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setProducts(
          resData.data.map(product => ({
            ...product,
            singlePrice:
              product.locations?.['62f4aabe45a4e22552a3969f']?.price
                ?.channel?.[1] ?? 0
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (globalDataReady && target?.type === 2) {
      getAllProducts();
    }
  }, [target, loggedUser, globalDataReady]);

  const saveHandler = async () => {
    try {
      if (!startDate) throw new Error('Төлөвлөгөө эхлэх огноог оруулна уу!');
      if (!endDate) throw new Error('Төлөвлөгөө дуусах огноог оруулна уу!');
      if (startDate > endDate)
        throw new Error('Эхлэх огноо дуусах огнооноос хойш байж болохгүй!');

      setLoading(true);

      const targetCopy = { ...target };

      if (targetCopy.type === 1) {
        delete targetCopy.target;

        if (!targetCopy.brands || targetCopy.brands.length === 0) {
          delete targetCopy.brands;
        }

        if (!targetCopy.categories || targetCopy.categories.length === 0) {
          delete targetCopy.categories;
        }
      }

      if (targetCopy.type === 2) {
        delete targetCopy.products;
        delete targetCopy.categories;
        delete targetCopy.brands;
      }

      const url = `${process.env.REACT_APP_API_URL2}/api/backoffice/users/target`;
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(targetCopy)
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 400) {
        throw new Error(resData.message);
      }

      if (resData.code === 200) {
        setSuccessMsg(resData.message);
        setShowSuccessMsg(true);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && user && (
        <div className={css.wrapper}>
          <div className={css.container}>
            <div className={css.userDetails}>
              <div className={css.userInfo}>
                <div className={css.profilePicture}>
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.first_name ?? user.email ?? 'Нэргүй'}
                    />
                  ) : (
                    <ProfileGray width={22} height={22} />
                  )}
                </div>

                <div>
                  <h2 className={css.firstName}>
                    {user?.first_name ?? user?.email ?? 'Нэргүй'}
                  </h2>
                  <span className={css.userRole}>
                    {
                      userRoles.find(
                        role => role.BackofficeRoleID === user.role
                      )?.Role
                    }
                  </span>
                </div>
              </div>

              <Input
                disabled
                size='medium'
                width={215}
                icon={<TugrugGray />}
                iconposition='right'
                placeholder='Төлөвлөгөө'
                name='targetAmount'
                value={(totalAmount === 0 ? '' : totalAmount).toLocaleString()}
              />

              <div className={css.dates}>
                <Input
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  icon={<CalendarGray />}
                  iconposition='left'
                  size='medium'
                  width={147}
                  type='date'
                  name='startDate'
                />
                <div className={css.arrowRight}>
                  <ArrowRightGray />
                </div>
                <Input
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  icon={<CalendarGray />}
                  iconposition='left'
                  size='medium'
                  width={147}
                  type='date'
                  name='endDate'
                />
              </div>
            </div>

            <>
              {targetExist && (
                <>
                  <div className={css.targetStats}>
                    <div
                      className={css.targetGraph}
                      style={{
                        background: `conic-gradient(#2ab674  ${
                          3.6 *
                          (totalSucceeded === 0
                            ? 0
                            : Math.round((totalSucceeded * 100) / totalAmount))
                        }deg, #d6df2a 0deg)`
                      }}
                    >
                      <div
                        className={css.secondGraph}
                        style={{
                          background: `conic-gradient(transparent ${
                            3.6 *
                            (totalWaiting === 0
                              ? 0
                              : Math.round(
                                  (totalWaiting * 100) / totalAmount +
                                    (totalSucceeded * 100) / totalAmount
                                ))
                          }deg, #F1F1F1 0deg)`
                        }}
                      />

                      <div className={css.graphValues}>
                        <span className={css.completed}>
                          {totalSucceeded === 0
                            ? 0
                            : Math.round((totalSucceeded * 100) / totalAmount)}
                          %
                        </span>
                        <span className={css.pending}>
                          {totalWaiting === 0
                            ? 0
                            : Math.round((totalWaiting * 100) / totalAmount)}
                          %
                        </span>
                      </div>
                    </div>

                    <div className={css.targetGraphDetails}>
                      <div>
                        <span className={css.graphDetailsTitle}>
                          Биелэлт:{' '}
                          {totalSucceeded === 0
                            ? 0
                            : Math.round((totalSucceeded * 100) / totalAmount)}
                          %
                        </span>
                        <div className={css.graphDetailAmount}>
                          <div className={`${css.circle} ${css.completed}`} />
                          <span>{totalSucceeded.toLocaleString()}₮</span>
                        </div>
                      </div>

                      <div>
                        <span className={css.graphDetailsTitle}>
                          Хүлээгдэж буй:{' '}
                          {totalWaiting === 0
                            ? 0
                            : Math.round((totalWaiting * 100) / totalAmount)}
                          %
                        </span>
                        <div className={css.graphDetailAmount}>
                          <div className={`${css.circle} ${css.pending}`} />
                          <span>{totalWaiting.toLocaleString()}₮</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(productTargetExist || totalProductTargetExist) && (
                    <SingleTargetProducts
                      target={target.target}
                      productTarget={target.products}
                      products={products}
                      suppliers={suppliers}
                      loggedUser={loggedUser}
                      initCategories={initCategories}
                      initBrands={initBrands}
                      setTarget={setTarget}
                      setProductTargetExist={setProductTargetExist}
                      setTotalProductTargetExist={setTotalProductTargetExist}
                      categoryTargetExist={categoryTargetExist}
                      brandTargetExist={brandTargetExist}
                      setProducts={setProducts}
                    />
                  )}

                  <div className={css.otherTargets}>
                    {categoryTargetExist && (
                      <SingleTargetCategory
                        initCategories={initCategories}
                        categoryTarget={target.categories}
                        setTarget={setTarget}
                        setCategoryTargetExist={setCategoryTargetExist}
                        loggedUser={loggedUser}
                      />
                    )}
                    {brandTargetExist && (
                      <SingleTargetBrand
                        initBrands={initBrands}
                        brandTarget={target.brands}
                        loggedUser={loggedUser}
                        setTarget={setTarget}
                        setBrandTargetExist={setBrandTargetExist}
                      />
                    )}
                  </div>
                </>
              )}
            </>
          </div>

          <div className={css.footer}>
            <Button
              onClick={e => navigate({ e, href: '/target' })}
              variant='secondary'
              size='medium'
            >
              Цуцлах
            </Button>
            <Button
              onClick={saveHandler}
              variant='primary'
              size='medium'
              width={154}
            >
              Хадгалах
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className={css.spinner}>
          <LoadingSpinner />
        </div>
      )}

      <Modal
        show={showProductTargetAdd}
        closeHandler={() => setShowProductTargetAdd(false)}
        width={1048}
        height={812}
      >
        <ProductTargetAdd
          closeHandler={() => setShowProductTargetAdd(false)}
          loggedUser={loggedUser}
          categories={initCategories}
          brands={initBrands}
          setTarget={setTarget}
          setTargetExist={setTargetExist}
          setProductTargetExist={setProductTargetExist}
          setTotalProductTargetExist={setTotalProductTargetExist}
          setProducts={setProducts}
          categoryTargetExist={categoryTargetExist}
          brandTargetExist={brandTargetExist}
        />
      </Modal>

      <Modal
        show={showCategoryTargetAdd}
        closeHandler={() => setShowCategoryTargetAdd(false)}
        width={631}
        height={816}
      >
        <CategoryTargetAdd
          closeHandler={() => setShowCategoryTargetAdd(false)}
          initCategories={initCategories}
          loggedUser={loggedUser}
          setTarget={setTarget}
          setTargetExist={setTargetExist}
          setCategoryTargetExist={setCategoryTargetExist}
        />
      </Modal>

      <Modal
        show={showBrandTargetAdd}
        closeHandler={() => setShowBrandTargetAdd(false)}
        width={631}
        height={816}
      >
        <BrandTargetAdd
          closeHandler={() => setShowBrandTargetAdd(false)}
          brands={initBrands}
          loggedUser={loggedUser}
          setTarget={setTarget}
          setTargetExist={setTargetExist}
          setBrandTargetExist={setBrandTargetExist}
        />
      </Modal>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg('');
          errorWhileFetching && getData();
          notFoundError && navigate({ href: '/target' });
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg('');
        }}
      />
    </>
  );
};

export default SingleTarget;
