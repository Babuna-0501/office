import { useEffect, useState } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import './modal_product.css';
import closeSvg from './close.svg';
import { replaceImageUrl } from '../../../utils';

export const ProductModal = ({ open, close, orderId, supId, submit }) => {
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [page, setPage] = useState(0);
  const [supplier, setSupplier] = useState(supId ? supId : null);
  const [productid, setProductid] = useState(null);
  const [search, setSearch] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let params = '';
    if (supplier !== null) {
      params += `supplier=${supplier}&`;
    }
    if (search && search.length >= 3) {
      params += `search=${search}&`;
    }

    if (productid !== null) {
      params += `id=${productid}&`;
    }
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/products/get1?${params}page=${page}&limit=50`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        let update = res.data.map(item => {
          return {
            ...item,
            chosed: false
          };
        });
        setData(update);
        setCopy(update);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    getData();
    // }, [page, productid, barcode, sku, search, supplier]);
  }, [supplier]);

  useEffect(() => {
    let d = data.filter(
      d => d._id.toString().includes(productid) || d.name.includes(productid)
    );

    productid == '' || productid == null ? setCopy([]) : setCopy(d);
  }, [productid]);

  const productAdd = () => {
    submit(search);
    setCopy([]);
    setData([]);
    setProductid(null);
    setSearch([]);
    close();
  };

  const cancel = () => {
    setCopy([]);
    setData([]);
    setProductid(null);
    setSearch([]);
    close();
  };

  return (
    <div className={`add-popup ${open ? 'active' : ''}`}>
      <div className='popup-content_add prod_popup_order2'>
        <span className='close-button' onClick={close}>
          <img src={closeSvg} alt='close' />
        </span>
        <span style={{ marginLeft: '30px', fontSize: '18px', fontWeight: 700 }}>
          Захиалгын дугаар: {orderId}
        </span>
        <div className='add_popup_search'>
          {' '}
          <input
            autoFocus
            type='text'
            placeholder='Бүтээгдэхүүн хайх'
            onChange={e => setProductid(e.target.value)}
          />
        </div>
        <div className='add_popup_title prod_title_order2'>
          <p>Бүтээгдэхүүний нэр</p>
          <p>Зураг</p>
          <p>Тоо ширхэг</p>
          <p>Нэгж үнэ</p>
          <p>Нийт дүн</p>
          <p>Action</p>
        </div>
        {/* End барааны жагсаалт */}
        <div
          className='head_list'
          style={{ height: '600px', marginBottom: '10px' }}
        >
          {search?.length > 0 && (
            <p style={{ fontWeight: 700 }}>Сонгосон Бүтээгдэхүүн</p>
          )}
          {search?.map((s, i) => {
            return (
              <ProductAddCard
                key={i}
                name={s.name}
                price={s.price}
                image={replaceImageUrl(s.image)}
                quantity={s.quantity}
                setQuantity={e => {
                  s.quantity = e;
                  setSearch(prev => [...prev]);
                }}
                remove={() => {
                  setSearch(search.filter(d => d.productId != s.productId));
                }}
              />
            );
          })}
          {productid != null && copy?.length > 0 && <p>Хайсан</p>}
          {copy?.map((d, ind) => {
            let priceValue = 0;
            let priceKeys = Object.keys(d.locations);
            if (priceKeys.length !== 0) {
              priceValue = d.locations[priceKeys[0]]?.price?.channel['1'];
            }

            return (
              <ProductAddCard
                key={ind}
                add={q => {
                  console.log({
                    name: d.name,
                    image: d.image,
                    productId: d._id,
                    quantity: q,
                    price: d.stock
                  });
                  console.log({
                    name: d.name,
                    image: d.image,
                    productId: d._id,
                    quantity: q,
                    price: priceValue
                  });
                  setSearch(prev => [
                    ...prev,
                    {
                      name: d.name,
                      image: d.image,
                      productId: d._id,
                      quantity: q,
                      price: priceValue
                    }
                  ]);
                }}
                quantity={0}
                name={d.name}
                image={replaceImageUrl(d.image)}
                price={priceValue}
              />
            );
          })}
        </div>
        <div className='add_popup_btn'>
          <button onClick={() => cancel()}>Цуцлах</button>
          <button onClick={() => productAdd()}>Бүтээгдэхүүн нэмэх</button>
        </div>
      </div>
    </div>
  );
};

const ProductAddCard = ({
  name,
  image,
  price,
  add,
  remove,
  quantity,
  setQuantity
}) => {
  return (
    <div className='add_popup_md'>
      <span>{name}</span>
      <span>
        {' '}
        <img style={{ width: '50px' }} src={image} />
      </span>
      <span>
        <input
          className='add_popup_quantity'
          type='number'
          value={quantity}
          pattern='[0-9]*'
          onChange={e => {
            let value = e.target.value;
            // Check if value is not negative and is a valid number
            if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
              setQuantity(value === '' ? '' : Number(value));
            }
          }}
        />
      </span>
      <span>{price}₮</span>
      <span>{Math.floor((quantity ?? 0) * price)}₮ </span>
      <span>
        {add == undefined ? (
          <button className='btn_pp' onClick={remove}>
            Устгах
          </button>
        ) : (
          <button className='btn_p' onClick={() => add(quantity)}>
            Нэмэх
          </button>
        )}
      </span>
    </div>
  );
};
