import { replaceImageUrl } from '../../utils';
import css from '../style.module.css';
import { useState, useContext, useEffect } from 'react';

const Entry = props => {
  const data = props.data;
  const productGroups = props.productGroups;

  // Find product group
  let productGroup = null;
  if (data.category_id !== 0) {
    productGroups.forEach(group => {
      if (group.ID === data.category_id) {
        console.log('found' + group.Name);
        productGroup = group.Name;
        return;
      }
    });
  }

  // Calculate boxQuantity
  let boxQuantity = 0;
  props.allProducts.forEach(product => {
    if (product._id === data._id) {
      boxQuantity = product.incase;
    }
  });

  // Calculate totalBox
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

  // Calculate totalBoxCalculated
  let totalBoxCalculated =
    boxQuantity && boxQuantity !== null
      ? data.reservedStock > 0
        ? (data.reservedStock / boxQuantity).toFixed(2)
        : null
      : null;

  // Format the endDate
  const formatDate = (dateString) => {
    if (!dateString) return 'n/a'; // Handle null or undefined values

    const parts = dateString.split(/[\s-]/);
    if (parts.length < 3) return 'n/a'; // Handle unexpected formats

    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const endDate = data.attributes && data.attributes[0]
    ? formatDate(data.attributes[0].endDate)
    : '';

  const width = [50, 100, 50, 300, 200, 200, 200, 200, 200];

  return (
    <div className='box_container' style={{ margin: '0 0 0 0.5rem' }}>
      <div className='box' style={{ width: width[0] }}>
        <input
          type='checkbox'
          checked={props.checked}
          onChange={e => props.onChange()}
        />
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
        {data?.attributes && data.attributes[0]?.seriesNumber}
      </div>
      <div className='box' style={{ width: width[4] }}>
        {endDate}
      </div>
   
      <div className="box" style={{ width: width[6] }}>
        <h6>{data.stock}</h6><h6 style={{ color: '#faa51a' }}>{data.reservedStock}</h6>
      </div>
      <div className="box" style={{ width: width[7] }}></div>
      <div className='box' style={{ width: width[5] }}>
        {productGroup}
      </div>
      {/* <div className="box" style={{ width: width[7] }}>
        <h6>{totalBox}</h6><h6 style={{ color: '#faa51a' }}>{totalBoxCalculated}</h6>
      </div> */}
    </div>
  );
};

export default Entry;
