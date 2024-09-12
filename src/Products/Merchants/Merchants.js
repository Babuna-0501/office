import React, { useState, useContext } from 'react';
import css from './merchants.module.css';
import { Button } from '../../components/common/Button';
import Channels from '../Channels/Channels';
import Shops from './Shops';
import ProductReportHook from '../../Hooks/ProductsReportHook';
import checkbox from '../../assets/check box.svg';
import checked from '../../assets/Tick Square_green.svg';
import myHeaders from '../../components/MyHeader/myHeader';

const data = [
  {
    id: 1,
    name: 'Суваг'
  },
  { id: 2, name: 'Дэлгүүр' }
];

const data1 = [
  {
    business_type_id: 1,
    business_type_name: '8 нэрийн дэлгүүр',
    channel_id: 1,
    channel_name: 'Хүнсний дэлгүүр'
  },
  {
    business_type_id: 2,
    business_type_name: '6 нэрийн дэлгүүр',
    channel_id: 1,
    channel_name: 'Хүнсний дэлгүүр'
  },
  {
    business_type_id: 3,
    business_type_name: 'ТҮЦ',
    channel_id: 1,
    channel_name: 'Хүнсний дэлгүүр'
  },
  {
    business_type_id: 4,
    business_type_name: 'Лангуу, Павильон',
    channel_id: 2,
    channel_name: 'Зах бөөний төв'
  },
  {
    business_type_id: 5,
    business_type_name: 'Бөөний төв',
    channel_id: 2,
    channel_name: 'Зах бөөний төв'
  },
  {
    business_type_id: 23,
    business_type_name: 'Агуулах худалдаа',
    channel_id: 2,
    channel_name: 'Зах бөөний төв'
  },
  {
    business_type_id: 24,
    business_type_name: 'Сүлжээ дэлгүүр',
    channel_id: 2,
    channel_name: 'Зах бөөний төв'
  },
  {
    business_type_id: 25,
    business_type_name: 'Сүлжээ дэлгүүр-Номин',
    channel_id: 2,
    channel_name: 'Зах бөөний төв'
  },
  {
    business_type_id: 6,
    business_type_name: 'Ресторан',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 7,
    business_type_name: 'Цайны газар',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 8,
    business_type_name: 'Зоогийн газар',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 9,
    business_type_name: 'Олон үндэстний хоол',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 10,
    business_type_name: 'Кафе, Кофе шоп',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 11,
    business_type_name: 'Паб, Лаунж',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 12,
    business_type_name: 'Караоке',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 13,
    business_type_name: 'Зочид буудал',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 14,
    business_type_name: 'Бар',
    channel_id: 3,
    channel_name: 'ХоРеКа'
  },
  {
    business_type_id: 15,
    business_type_name: 'Үсчин, гоо сайхан',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 16,
    business_type_name: 'Цэцэрлэг',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 17,
    business_type_name: 'Сургууль',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 18,
    business_type_name: 'Фитнес',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 19,
    business_type_name: 'Эмнэлэг',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 20,
    business_type_name: 'Үйлдвэр',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 22,
    business_type_name: 'Оффис',
    channel_id: 4,
    channel_name: 'Албан Байгууллага'
  },
  {
    business_type_id: 21,
    business_type_name: 'Эмийн сан',
    channel_id: 5,
    channel_name: 'Эмийн Сан'
  },
  {
    business_type_id: 27,
    business_type_name: 'Эцсийн хэрэглэгч',
    channel_id: 6,
    channel_name: 'Эцсийн хэрэглэгч'
  }
];

const Merchants = props => {
  const [active, setActive] = useState(1);
  const [channeldata, setChanneldata] = useState([]);
  const [tradeIDS, setTradeIDS] = useState([]);
  const [channelIDS, setChannelIDS] = useState([]);
  const [excludes, setExcludes] = useState([]);

  const prodctx = useContext(ProductReportHook);

  const CancelHandler = () => {
    props.setMerchantOpen(false);
  };
  const SubmitHandler = () => {
    console.log(props.productids);
    if (props.productids.length === 0) {
      alert('Та бүтээгдэхүүний сонгоно уу');
      return;
    }
    // console.log("tradeids", tradeIDS);

    // if (tradeIDS.length === 0) {
    //   alert("Та харилцагчаа сонгоно уу");
    //   return;
    // }
    let channels = {};
    data1.map(item => {
      channels[item.business_type_id] = channelIDS.includes(
        item.business_type_id
      )
        ? 1
        : 0;
    });
    props.productids.map(x => {
      let shops = {};

      console.log(tradeIDS);
      if (tradeIDS.length !== 0) {
        tradeIDS.map(y => {
          shops[y] = 1;
        });
      }

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify({
          product_id: x,
          'locations.62f4aabe45a4e22552a3969f.is_active.channel': channels,
          'locations.62f4aabe45a4e22552a3969f.is_active.tradeshop': shops,
          tradeshopExclude: excludes ? excludes : []
        })
      };
      console.log('last', requestOptions);

      fetch(
        `${process.env.REACT_APP_API_URL2}/api/product/update1`,
        requestOptions
      )
        .then(res => res.json())
        .then(res => {
          console.log('product update', res);
        })
        .catch(err => {
          console.log(err);
        });
    });

    setChannelIDS([]);
    setExcludes([]);
    setTradeIDS([]);
    props.setMerchantOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div
            style={{
              fontWeight: '600',
              fontSize: '18px'
            }}
          >
            Харилцагч
          </div>
          <div className={css.headercontainer}>
            <div className={css.header}>
              {data.map(item => {
                return (
                  <span
                    onClick={() => {
                      setActive(item.id);
                    }}
                    key={item.id}
                    className={css.tab}
                    style={{
                      borderBottom:
                        active === item.id
                          ? '3px solid #2AB674'
                          : '3px solid #F2F2F2'
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
          {active === 1 && (
            <div className={css.channelbody}>
              {data1.map(item => {
                return (
                  <div
                    key={item.business_type_id}
                    onClick={() => {
                      let aa = [...channelIDS];
                      if (channelIDS.includes(item.business_type_id)) {
                        let bb = aa.filter(x => x !== item.business_type_id);
                        setChannelIDS(bb);
                      } else {
                        setChannelIDS(prev => [...prev, item.business_type_id]);
                      }
                    }}
                    className={css.buswrapper}
                  >
                    <img
                      src={
                        channelIDS.includes(item.business_type_id)
                          ? checked
                          : checkbox
                      }
                    />
                    <span>{item.business_type_name}</span>
                  </div>
                );
              })}
            </div>
          )}
          {active === 2 && (
            <Shops
              setTradeIDS={setTradeIDS}
              data1={data1}
              tradeIDS={tradeIDS}
              channelIDS={channelIDS}
              setChannelIDS={setChannelIDS}
              setExcludes={setExcludes}
              excludes={excludes}
            />
          )}
        </div>
        <div className={css.btncontainer}>
          <Button variant='secondary'>
            <span onClick={CancelHandler}>Цуцлах</span>
          </Button>
          <Button variant='primary'>
            {' '}
            <span
              style={{
                color: '#fff'
              }}
              onClick={SubmitHandler}
            ></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Merchants;
