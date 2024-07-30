import React, { useContext, useState } from 'react';
import css from './channelsetup.module.css';
import { Button } from '../../components/common/Button';
import closeIcon from '../../assets/close.svg';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import Channels from '../../Products/Channels/Channels';
import Oronnutag from '../../components/Oronnutag/Oronnutag';
import TradeShops from './TradeShops';
import Categories from './Categories';
import Order from './order';
import OrdersHook from '../../Hooks/OrdersHook';
import myHeaders from '../../components/MyHeader/myHeader';

const basedata = [
  { id: 1, name: 'Суваг' },
  {
    id: 2,
    name: 'Бүсчлэл'
  },
  {
    id: 3,
    name: 'Дэлгүүр'
  },
  // {
  //   id: 4,
  //   name: "Ангилал",
  // },
  {
    id: 5,
    name: 'Захиалга'
  }
];

const ChannelSetup = props => {
  const [active, setActive] = useState(1);
  const prodctx = useContext(ProductReportHook);
  const ordersCtx = useContext(OrdersHook);
  const { fieldsDataReport, tablePosition } = ordersCtx;

  const [fieldsDataCopy, setFieldsDataCopy] = useState([
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
      show: true
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
      show: true
    },
    {
      id: 24,
      position: 24,
      title: 'user_date',
      permission: true,
      show: true
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
      id: 33,
      position: 33,
      title: 'ХТ Код',
      permission: true,
      show: true
    }
  ]);

  const updateUser = () => {
    if (!props.supplierId) {
      alert(`Алдаа гарлаа ${props.supplierId}`);
    }
    const data = {
      updateBySupplier: props.supplierId,
      tablePosition: {
        order: {
          field: fieldsDataCopy.map(({ content, ...rest }) => rest),
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
        if (res.code === 200) {
        }
      })
      .catch(error => {
        alert(`Алдаа гарлаа. ${error}`);
      });
  };

  const CancelHandler = () => {
    props.setChannelSetup(false);
  };
  const SubmitHandler = () => {
    prodctx.setChannelSet(!prodctx.channelSet);
    let ids = [];
    prodctx.bustype.map(item =>
      item.chosed ? ids.push(item.business_type_id) : null
    );
    props.setChosedChannel(ids);
    console.log('IDS:  ', ids);
    console.log('BUSTYPE:  ', prodctx.bustype);
    let aa = prodctx.bustype.map(item => {
      return {
        ...item
        // chosed: true,
      };
    });
    prodctx.setBustype([...aa]);
    prodctx.setBusIDS(ids);
    props.setChannelSetup(false);
    prodctx.setRender(!prodctx.render);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div className={css.header}>
            <span>Тохиргоо</span>
            <img src={closeIcon} alt='close' onClick={CancelHandler} />
          </div>
          <div className={css.subheader}>
            {basedata.map(item => {
              return (
                <span
                  key={item.id}
                  style={{
                    borderBottom:
                      active === item.id
                        ? '3px solid #2AB674'
                        : '3px solid #F2F2F2'
                  }}
                  onClick={() => {
                    setActive(item.id);
                  }}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className={css.body}>
            {/* {prodctx.sitedata.business_types.map((item)=>{
                return <div>
            })} */}
            {active === 1 && <Channels />}
            {active === 2 && <Oronnutag />}
            {active === 3 && <TradeShops prodctx={prodctx} />}
            {active === 4 && <Categories />}
            {active === 5 && (
              <Order
                fieldsDataCopy={fieldsDataCopy}
                setFieldsDataCopy={setFieldsDataCopy}
                updateUser={updateUser}
              />
            )}
          </div>
        </div>
        <div className={css.btncontainer}>
          <Button variant='secondary'>
            <span onClick={CancelHandler}>Цуцлах</span>
          </Button>
          <Button variant='primary'>
            <span
              style={{
                color: '#fff'
              }}
              onClick={() => {
                SubmitHandler();
                updateUser();
              }}
            >
              Хадгалах
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelSetup;
