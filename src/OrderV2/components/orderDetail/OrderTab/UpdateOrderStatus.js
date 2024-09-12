import React from 'react';

function UpdateOrderStatus({ cancelFunction, submitFunction, orderStatus }) {
  let cancelText = 'Захиалгыг цуцлах';
  let submitText = 'Захиалгыг хүргэх';
  let statusCode = 3;

  if (orderStatus === 1) {
    submitText = 'Баталгаажуулах';
    statusCode = 2;
  }

  if (orderStatus === 3 || orderStatus === 5) {
    return null;
  }

  return (
    <div className='bottom-buttons'>
      <button className='order_detail_button' onClick={cancelFunction}>
        {cancelText}
      </button>

      <button
        className='order_detail_button'
        onClick={() => submitFunction(statusCode)}
      >
        {submitText}
      </button>
    </div>
  );
}

export default UpdateOrderStatus;
