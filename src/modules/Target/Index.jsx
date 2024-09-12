// CSS
import css from './styles.module.css';

// Packages
import { useContext, useEffect, useState } from 'react';

// Hooks
import { HeaderContext } from '../../Hooks/HeaderHook';
import { GlobalContext } from '../../Hooks/GlobalContext';

// Images
import { TargetWhite } from '../../assets/icons';

// Components
import myHeaders from '../../components/MyHeader/myHeader';
import { AddUser, TargetHeader, UserCard } from './components/';
import { LoadingSpinner, Modal } from '../../components/common';
import ErrorPopup from '../../components/common/ErrorPopup';

const Index = () => {
  const { setHeaderContent, setShowRefreshBtn } = useContext(HeaderContext);
  const { loggedUser, userRoles, globalDataReady } = useContext(GlobalContext);

  const [initialTargets, setInitialTargets] = useState([]);
  const [targets, setTargets] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const [showAddUser, setShowAddUser] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const companyId = loggedUser.company_id.replaceAll('|', '');

      const targetUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/users/target?supplier=${companyId}`;
      const usersUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/users?company=${companyId}`;
      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const [targetRes, usersRes] = await Promise.all([
        fetch(targetUrl, requestOptions),
        fetch(usersUrl, requestOptions)
      ]);

      const targetData = await targetRes.json();
      const usersData = await usersRes.json();

      const targetsCopy = [...targetData.data];
      const targetUserIds = [];
      let targetProductIds = [];

      for (const target of targetsCopy) {
        if (usersData.data.length > 0) {
          const targetUser = usersData.data.find(
            user => user.user_id === target.user
          );
          if (targetUser) {
            target.user = { ...targetUser };
            targetUserIds.push(targetUser.user_id);
          }
        }

        if (
          target.startDate &&
          target.endDate &&
          Number(target.type) === 1 &&
          target.products
        ) {
          targetProductIds = [
            ...targetProductIds,
            ...target.products.map(prod => prod._id)
          ];
        }
      }

      targetProductIds = [...new Set(targetProductIds)];

      const productsUrl = `https://api2.ebazaar.link/api/products/get1?ids=[${targetProductIds.join(',')}]`;

      const productsRes = await fetch(productsUrl, requestOptions);
      const productsData = await productsRes.json();

      setProducts(
        productsData.data.map(product => ({
          ...product,
          singlePrice:
            product.locations?.['62f4aabe45a4e22552a3969f']?.price
              ?.channel?.[1] ?? 0
        }))
      );
      setUsers(
        usersData.data.filter(user => !targetUserIds.includes(user.user_id))
      );
      setInitialTargets(targetsCopy);
      setTargets(targetsCopy);
    } catch (error) {
      setErrorMsg('Алдаа гарлаа. Та дахин оролдоно уу!');
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (globalDataReady) getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalDataReady]);

  useEffect(() => {
    setHeaderContent(
      <TargetHeader
        setShowAddUser={setShowAddUser}
        searchName={searchName}
        setSearchName={setSearchName}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        loading={loading}
      />
    );
    setShowRefreshBtn(true);

    return () => {
      setHeaderContent(<></>);
      setShowRefreshBtn(false);
    };
  }, [
    setHeaderContent,
    searchName,
    selectedStatus,
    setShowRefreshBtn,
    loading
  ]);

  useEffect(() => {
    let targetsCopy = [...initialTargets];

    if (searchName) {
      targetsCopy = targetsCopy.filter(
        target =>
          (target.user?.first_name ?? target.user?.email)?.toLowerCase()[0] ===
            searchName.toLowerCase()[0] &&
          (target.user?.first_name ?? target.user?.email)
            ?.toLowerCase()
            .includes(searchName.toLowerCase())
      );
    }

    if (selectedStatus) {
      if (selectedStatus === '1') {
        targetsCopy = targetsCopy.filter(
          target => target.startDate && target.endDate
        );
      }

      if (selectedStatus === '2') {
        targetsCopy = targetsCopy.filter(
          target => !target.startDate || !target.endDate
        );
      }
    }

    console.log('targetsCopy', targetsCopy);

    const uniqueArr = targetsCopy.filter((item, index, self) => {
      return (
        index === self.findIndex(i => i.user.user_id === item.user.user_id)
      );
    });

    setTargets([...uniqueArr]);
  }, [initialTargets, searchName, selectedStatus]);

  const afterCreate = target => {
    const currentUser = users.find(user => user.user_id === target.user);
    setUsers(prev => prev.filter(user => user.user_id !== target.user));
    setTargets(prev => [...prev, { ...target, user: { ...currentUser } }]);
    setInitialTargets(prev => [
      ...prev,
      { ...target, user: { ...currentUser } }
    ]);
  };

  return (
    <>
      {!loading && targets.length > 0 && (
        <div className={css.container}>
          {targets.map((target, index) => {
            return (
              <UserCard
                key={`target-module-single-user-target-${target._id}`}
                target={target}
                user={target.user}
                userRoles={userRoles}
                products={products}
              />
            );
          })}
        </div>
      )}
      {!loading && targets.length === 0 && (
        <div className={css.notFound}>
          <TargetWhite />
          <span>Одоогоор төлөвлөгөө үүсээгүй байна</span>
        </div>
      )}
      {loading && (
        <div className={css.spinner}>
          <LoadingSpinner />
        </div>
      )}

      <Modal
        show={showAddUser}
        width={749}
        height={668}
        closeHandler={() => setShowAddUser(false)}
      >
        <AddUser
          closeHandler={() => setShowAddUser(false)}
          users={users}
          roles={userRoles}
          afterCreate={afterCreate}
          loggedUser={loggedUser}
        />
      </Modal>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          getData();
        }}
      />
    </>
  );
};

export default Index;
