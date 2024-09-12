import { replaceImageUrl } from '../../utils';
import css from '../style.module.css';
import { useState, useContext, useEffect } from 'react';

const Entry = props => {
  const data = props.data;
  console.log(data);
  const productGroups = props.productGroups;
  let productGroup = null;
  if (data.category_id !== 0) {
    productGroups.map(group => {
      if (group.ID === data.category_id) {
        console.log('found' + group.Name);
        productGroup = group.Name;
        return;
      }
    });
  }
  let boxQuantity = 0;
  props.allProducts.map(product => {
    if (product._id === data._id) {
      boxQuantity = product.incase;
    }
  });
  let totalBox = 'n/a';
  if (boxQuantity && boxQuantity !== null) {
    totalBox =
      data.stock && parseFloat(data.stock) > 0.0
        ? (data.stock / boxQuantity).toFixed(2)
        : '';
    if (totalBox % 1 === 0) {
      totalBox = parseInt(totalBox);
    }
  }
  let totalBoxCalculated =
    boxQuantity && boxQuantity !== null
      ? data.reservedStock > 0
        ? (data.reservedStock / boxQuantity).toFixed(2)
        : null
      : null;
  const width = [50, 100, 50, 300, 200, 200, 200, 200, 200];
  return (
    <div className='box_container'>
      <div className='box' style={{ width: width[0] }}>
        <input type='checkbox' />
      </div>
      <div
        className='box'
        style={{ width: width[1] }}
        onClick={() => props.setEntry(data)}
      >
        {data._id}
      </div>
      <div className='box' style={{ width: width[2] }}>
        <img
          src={
            data &&
            data.image &&
            data.image[0] &&
            replaceImageUrl(data.image[0].replace('original', 'small'))
          }
        />
      </div>
      <div className='box' style={{ width: width[3] }}>
        {data.name}
      </div>
      <div className='box' style={{ width: width[4] }}>
        {data.bar_code}
      </div>
      <div className='box' style={{ width: width[5] }}>
        {productGroup}
      </div>
      <div className='box' style={{ width: width[6] }}>
        <h6>{data.stock}</h6>
        <h6 style={{ color: '#faa51a' }}>{data.reservedStock}</h6>
      </div>
      <div className='box' style={{ width: width[7] }}>
        <h6>{totalBox}</h6>
        <h6 style={{ color: '#faa51a' }}>{totalBoxCalculated}</h6>
      </div>
    </div>
  );
};

export default Entry;
