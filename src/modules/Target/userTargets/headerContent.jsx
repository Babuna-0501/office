import React, { useContext, useEffect, useState } from 'react';
import css from './headerContent.module.css';
import { GlobalContext } from '../../../Hooks/GlobalContext';
import myHeaders from '../../../components/MyHeader/myHeader';
import { Button } from '../../../components/common';
import Link from '../../../components/Routing/Link';

const HeaderContent = () => {
  const { loggedUser } = useContext(GlobalContext);
  const [userId] = useState(window.location.pathname.split('/')[2]);

  const createTarget = async () => {
    try {
      const url = `https://api2.ebazaar.link/api/backoffice/users/target`;

      const body = JSON.stringify({
        supplierId: Number(loggedUser.company_id.replaceAll('|', '')),
        user: Number(userId),
        // user: 971,
        brands: null,
        categories: null,
        products: null
      });

      const requestOptions = {
        method: 'POST',
        body,
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      window.history.pushState({}, '', `/target/${resData?.data?.insertedId}`);
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } catch (error) {
      console.log(error);
      alert('Алдаа', error);
    }
  };

  return (
    <div className={css.container}>
      <div>
        <Link className={css.title} href='/target'>
          Төлөвлөгөө
        </Link>
      </div>
      <Button
        onClick={createTarget}
        style={{ padding: '5px 10px', fontSize: '14px' }}
      >
        Төлөвлөгөө үүсгэх
      </Button>
    </div>
  );
};

export default HeaderContent;
