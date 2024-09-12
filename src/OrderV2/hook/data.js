import React, { useState, useEffect, useContext, createContext } from 'react';

import myHeaders from '../components/MyHeader/myHeader';
import { GlobalContext } from '../../Hooks/GlobalContext';

const Ctx = createContext();

export const Order2Hook = props => {
  const { loggedUser } = useContext(GlobalContext);
  const [fieldsData, setFieldsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [fieldsDataReport, setFieldsDataReport] = useState([]);
  const [tablePosition, setTablePosition] = useState({
    order: {
      field: [],
      report: []
    },
    product: {
      field: [],
      report: []
    }
  });

  const [permission, setPermission] = useState();

  useEffect(() => {
    if (loggedUser) {
      setPermission(Object.values(JSON.parse(loggedUser?.permission))[0]);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser && tablePosition.order.field.length > 0) {
      setFieldsData(tablePosition.order.field);
    } else if (loggedUser) {
      setFieldsData([
        {
          id: 1,
          position: 1,
          title: 'Дугаар',
          permission: true,
          show: true
        },
        {
          id: 2,
          position: 2,
          title: 'Logo',
          permission: true,
          show: true
        },
        {
          id: 3,
          position: 3,
          title: 'Нийлүүлэгч',
          permission: true,
          show: true
        },
        {
          id: 4,
          position: 4,
          title: 'Notification',
          permission: true,
          show: true
        },
        {
          id: 5,
          position: 5,
          title: 'Захиалга',
          permission: true,
          show: true
        },
        {
          id: 6,
          position: 6,
          title: 'DeliveryManOne',
          permission: true,
          show: false
        },
        {
          id: 7,
          position: 7,
          title: 'Захиалсан',
          permission: true,
          show: true
        },
        {
          id: 8,
          position: 8,
          title: 'Хүргүүлэх',
          permission: true,
          show: true
        },
        {
          id: 9,
          position: 9,
          title: 'Дүн',
          permission: true,
          show: true
        },
        {
          id: 10,
          position: 10,
          title: 'Анхны дүн',
          permission: true,
          show: true
        },
        {
          id: 11,
          position: 11,
          title: 'Coupon',
          permission: true,
          show: true
        },
        {
          id: 12,
          position: 12,
          title: 'Тэмдэглэл',
          permission: true,
          show: true
        },
        {
          id: 13,
          position: 13,
          title: 'Утас',
          permission: true,
          show: true
        },
        {
          id: 14,
          position: 14,
          title: 'Захиалсан',
          permission: true,
          show: true
        },
        {
          id: 15,
          position: 15,
          title: 'Суваг',
          permission: true,
          show: true
        },
        {
          id: 16,
          position: 16,
          title: 'Хот/аймаг',
          permission: true,
          show: true
        },
        {
          id: 17,
          position: 17,
          title: 'Дүүрэг/сум',
          permission: true,
          show: true
        },
        {
          id: 18,
          position: 18,
          title: 'Хороо',
          permission: true,
          show: true
        },
        {
          id: 19,
          position: 19,
          title: 'Хаяг',
          permission: true,
          show: true
        },
        {
          id: 20,
          position: 20,
          title: 'Төлбөрийн хэлбэр',
          permission: true,
          show: true
        },
        {
          id: 21,
          position: 21,
          title: 'PickPack',
          permission: true,
          show: true
        },
        {
          id: 22,
          position: 22,
          title: 'Origin',
          permission: true,
          show: true
        },
        {
          id: 23,
          position: 23,
          title: 'VAT',
          permission: true,
          show: false
        },
        {
          id: 24,
          position: 24,
          title: 'user_date',
          permission: true,
          show: false
        },
        {
          id: 25,
          position: 25,
          title: 'Хариуцагч',
          permission: true,
          show: true
        },
        {
          id: 26,
          position: 26,
          title: 'Хариуцагч нэр',
          permission: true,
          show: true
        },
        {
          id: 27,
          position: 27,
          title: ' Утасны дугаар',
          permission: true,
          show: true
        },
        {
          id: 28,
          position: 28,
          title: 'Түгээгч',
          permission: true,
          show: true
        },
        {
          id: 29,
          position: 29,
          title: 'Ачилт',
          permission: true,
          show: true
        },
        {
          id: 30,
          position: 30,
          title: 'Захиалга устгах',
          permission: true,
          show: true
        },
        {
          id: 31,
          position: 31,
          title: 'Утасны захиалга',
          permission: true,
          show: true
        },
        {
          id: 32,
          position: -1,
          title: 'Буцаалт',
          permission: true,
          show: true
        },
        {
          id: 33,
          position: 33,
          title: 'ХТ код',
          permission: true,
          show: true
        }
      ]);
    }
    if (loggedUser && tablePosition.order?.report?.length > 0) {
      setFieldsDataReport(tablePosition.order.report);
    } else if (loggedUser) {
      setFieldsDataReport([
        {
          fieldName: 'Order number',
          show: true
        },
        {
          fieldName: 'Product name',
          show: true
        },
        {
          fieldName: 'Merchant Sku',
          show: true
        },
        {
          fieldName: 'Barcode',
          show: true
        },
        {
          fieldName: 'Brand',
          show: true
        },
        {
          fieldName: 'Qty',
          show: true
        },
        {
          fieldName: 'Gr',
          show: true
        },
        {
          fieldName: 'Price',
          show: true
        },
        {
          fieldName: 'Taken',
          show: true
        },
        {
          fieldName: 'Canceled',
          show: true
        },
        {
          fieldName: 'Returned',
          show: true
        },
        {
          fieldName: 'Final Total',
          show: true
        },
        {
          fieldName: 'Paid at',
          show: true
        },
        {
          fieldName: 'Reason',
          show: true
        },
        {
          fieldName: 'Main category',
          show: true
        },
        {
          fieldName: 'Sub-category',
          show: true
        },
        {
          fieldName: 'Cancel reason',
          show: true
        },
        {
          fieldName: 'Төлбөр бэлэн',
          show: true
        },
        {
          fieldName: 'Төлбөр банк',
          show: true
        },
        {
          fieldName: 'Төлбөр зээл',
          show: true
        },
        {
          fieldName: 'LendMn',
          show: true
        },
        {
          fieldName: 'StorePay',
          show: true
        },
        {
          fieldName: 'Урдчилсан',
          show: true
        },
        {
          fieldName: 'Түгээгч',
          show: true
        },
        {
          fieldName: 'Vendor',
          show: true
        },
        {
          fieldName: 'Total',
          show: true
        },
        {
          fieldName: 'Completed at',
          show: true
        },
        {
          fieldName: 'When to ship',
          show: true
        },
        {
          fieldName: 'Shipped at',
          show: true
        },
        {
          fieldName: 'Note',
          show: true
        },
        {
          fieldName: 'Receiver phone',
          show: true
        },
        {
          fieldName: 'Receiver info',
          show: true
        },
        {
          fieldName: 'Receiver name',
          show: true
        },
        {
          fieldName: 'Branch',
          show: true
        },
        {
          fieldName: 'Business type',
          show: true
        },
        {
          fieldName: 'State name',
          show: true
        },
        {
          fieldName: 'District',
          show: true
        },
        {
          fieldName: 'Quarter',
          show: true
        },
        {
          fieldName: 'Address',
          show: true
        },
        {
          fieldName: 'Original total',
          show: true
        },
        {
          fieldName: 'Status',
          show: true
        },
        {
          fieldName: 'Register',
          show: true
        },
        {
          fieldName: 'Origin',
          show: true
        }
      ]);
    }
  }, [tablePosition.order.field, tablePosition.order.report, loggedUser]);

  useEffect(() => {
    try {
      if (loggedUser && loggedUser?.tablePosition) {
        setTablePosition(JSON.parse(loggedUser?.tablePosition));
      }
    } catch (error) {
      console.log('tablePosition error');
    }
  }, [loggedUser]);

  const updateUser = ({ fieldsData, fieldsDataReport }) => {
    const data = {
      user_id: loggedUser.id,
      tablePosition: {
        order: {
          field:
            fieldsData === 'restart'
              ? []
              : fieldsData
              ? fieldsData.map(({ content, ...rest }) => rest)
              : tablePosition.order.field || [],

          report:
            fieldsDataReport === 'restart'
              ? []
              : fieldsDataReport || tablePosition.order?.report || []
        },
        product: {
          field: [],
          report: []
        }
      }
    };
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(data)
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/update_users`,
      requestOptions
    )
      .then(r => r.json())
      .then(res => {
        console.log('Res', res);
        if (
          (res.code === 200 && fieldsData === 'restart') ||
          fieldsDataReport === 'restart'
        ) {
          alert('Амжилттай шинэчлэгдлээ');
          window.location.reload(false);
        }
      })
      .catch(error => {
        alert(`Алдаа гарлаа. ${error}`);
      });
  };

  return (
    <Ctx.Provider
      value={{
        userData,
        setUserData,
        fieldsData,
        setFieldsData,
        updateUser,
        permission,
        tablePosition,
        fieldsDataReport,
        setFieldsDataReport
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
