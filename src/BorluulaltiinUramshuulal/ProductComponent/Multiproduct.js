import React, { useContext, useEffect, useState, useRef } from 'react';
import css from './multiproduct.module.css';
import SMSHook from '../../Hooks/SMSHook';
import { MultiStyles } from './style';
import tugrugnogoon from '../../assets/tugrug.svg';
import tugrugsaaral from '../../assets/tugrug@2x.svg';
import deleteIcon from '../../assets/delete_red_small.svg';
import AppHook from '../../Hooks/AppHook';
import { replaceImageUrl } from '../../utils';
const Multiproduct = props => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [skus, setSkus] = useState([]);
  const [barcodes, setBarcode] = useState([]);
  const appctx = useContext(AppHook);

  const smsctx = useContext(SMSHook);
  const quantityRef = useRef();
  const moneyRef = useRef();
  console.log('props item', props);

  let goal = {
    ...props.item.goal
  };

  useEffect(() => {
    let prodImages = [];
    let brandName = [];
    let catName = [];
    let barcode = [];
    let sku = [];
    console.log('smsmct.updateids', smsctx.updateID);
    if (smsctx.updateID !== null) {
      setTotalQuantity(props.item.totalQuantity);
      setTotalAmount(props.item.totalAmount);
    }

    props.item &&
      props.item.products.map(x => {
        barcode.push(x.bar_code);
        sku.push(x.sku);
        if (x.image && x.image.length !== 0) {
          x.image.map(y => {
            prodImages.push(replaceImageUrl(y));
          });
        }
        if (x.brand) {
          smsctx.sitedata &&
            smsctx.sitedata.brands.map(item => {
              if (item.BrandID == x.brand) {
                brandName.push(item.BrandName);
              }
            });
        }
        if (x.category_id) {
          smsctx.sitedata &&
            smsctx.sitedata.categories.map(item => {
              if (item.id == x.category_id) {
                catName.push(item.name);
              }
            });
        }
      });
    catName = [...new Set(catName)];
    brandName = [...new Set(brandName)];
    prodImages = [...new Set(prodImages)];
    setBarcode(barcode);
    setSkus(sku);
    setBrandName(brandName);
    setCategoryNames(catName);
    setProductImages(prodImages);
  }, [props]);
  console.log('props multiproduct', props);

  const DeleteHandler = () => {
    props.onDelete();
  };

  return (
    <div className={css.container}>
      <p
        style={{
          ...MultiStyles.product_name,
          fontSize: '12px',
          color: '#37474F',
          overflow: 'hidden'
        }}
      >
        {props.item.title}
      </p>
      <p
        style={{
          width: '150px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {productImages.length > 0
          ? productImages.slice(0, 4).map((x, index) => {
              let z = 100 - index;
              return (
                <span className={css.imagewrapper} style={{ zIndex: `${z}` }}>
                  <img src={replaceImageUrl(x)} style={{ zIndex: '150' }} />
                </span>
              );
            })
          : null}
      </p>
      <p
        className={css.prodname}
        style={{
          width: '150px'
        }}
      >
        {props &&
          props.item &&
          props.item.products.map((x, index) => {
            return <span key={index}>{x.name}</span>;
          })}
      </p>
      <p
        className={css.prodname}
        style={{
          width: '150px'
        }}
      >
        {categoryNames &&
          categoryNames.map((x, index) => {
            return <span key={index}>{x}</span>;
          })}
      </p>
      <p
        className={css.prodname}
        style={{
          width: '150px'
        }}
      >
        {brandName &&
          brandName.map((x, index) => {
            return <span key={index}>{x}</span>;
          })}
      </p>{' '}
      <p
        className={css.prodname}
        style={{
          width: '100px'
        }}
      >
        {barcodes &&
          barcodes.map((x, index) => {
            return <span key={index}>{x}</span>;
          })}
      </p>{' '}
      <p
        className={css.prodname}
        style={{
          width: '100px'
        }}
      >
        {skus &&
          skus.map((x, index) => {
            return <span key={index}>{x}</span>;
          })}
      </p>{' '}
      <p
        className={`${css.prodname} ${
          smsctx.multiProducts.find(x => x._id === props.item._id)
            .totalQuantity !== 0
            ? css.disabeldiv
            : null
        }`}
        style={{
          width: '150px',
          position: 'relative'
        }}
      >
        <input
          placeholder='Үнийн дүн'
          ref={moneyRef}
          value={totalAmount}
          onChange={e => {
            let aa = [...smsctx.multiProducts];
            aa.find(x => x._id === props.item._id).totalAmount = Number(
              e.target.value
            );
            smsctx.setMultiProducts(aa);
            setTotalAmount(e.target.value);
          }}
          //   placeholder="0"
          // min={0}
          type='number'
          style={{
            background: totalAmount !== null ? '#F9FCF5' : '#fff',
            border:
              totalAmount !== null
                ? '0.8px solid #60A744'
                : '0.8px solid #CCCCCC'
          }}
        />
        <img
          src={totalAmount !== null ? tugrugnogoon : tugrugsaaral}
          alt='tugrug icon'
          className={css.image}
        />
      </p>{' '}
      <p
        className={`${css.prodname} ${
          smsctx.multiProducts.find(x => x._id === props.item._id)
            .totalAmount !== 0
            ? css.disabeldiv
            : null
        }`}
        style={{
          width: '150px',
          position: 'relative'
        }}
      >
        <input
          placeholder='Тоо ширхэг'
          ref={quantityRef}
          type='number'
          // value={props.item.totalQuantity}
          value={totalQuantity}
          onChange={e => {
            let aa = [...smsctx.multiProducts];
            aa.find(x => x._id === props.item._id).totalQuantity = Number(
              e.target.value
            );
            smsctx.setMultiProducts(aa);

            setTotalQuantity(e.target.value);
          }}
          style={{
            background: totalQuantity !== null ? '#F9FCF5' : '#fff',
            border:
              totalQuantity !== null
                ? '0.8px solid #60A744'
                : '0.8px solid #CCCCCC'
          }}
        />
      </p>
      <div
        className={css.bar}
        style={{
          display: smsctx.barOpen ? 'block' : 'none'
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#1A1A1A',
            fontWeight: '600'
          }}
        >
          {props.item.totalAmount === 0
            ? `${props.item.totalQuantity?.toLocaleString()}ш`
            : `${props.item.totalAmount?.toLocaleString()}₮`}
        </div>
        {/* <span>}</span> */}
        <div className={css.secondbar}>
          <p
            style={{
              zIndex: 20
            }}
          ></p>
          <p
            style={{
              zIndex: 21,
              width: `${
                goal.quantity === 0
                  ? `${((goal.waiting + goal.succeeded) * 120) / goal.amount}px`
                  : `${
                      ((goal.waiting + goal.succeeded) * 120) / goal.quantity
                    }px`
              }`,
              background: '#D6DF2A'
            }}
          ></p>
          <p
            style={{
              zIndex: 22,
              width: `${
                goal.quantity === 0
                  ? `${(goal.succeeded * 120) / goal.amount}px`
                  : `${(goal.succeeded * 120) / goal.quantity}px`
              }`,
              background: '#2AB674'
            }}
          ></p>
        </div>
      </div>
      <div className={css.deletewrapper}>
        <img src={deleteIcon} onClick={DeleteHandler} />
      </div>
    </div>
  );
};

export default Multiproduct;
