import { useState } from 'react';
import { ModuleContext } from '../../index';
import VatDetailForm from './VatDetailForm';

const Entry = props => {
  console.log(props);
  const billId = props?.entryData?.config?.sale?.vat?.billId;
  console.log(billId);
  const [vatDetail, setVatDetail] = useState(false);
  const [removed, setRemoved] = useState(false);
  const data = props.entryData;
  let total = 0;
  try {
    data.products.map(line => {
      total += line.sellPrice.retail * line.quantity;
    });
  } catch (e) {}
  const removeDraft = id => {
    if (window.confirm('Та энэ драфтыг устгахыг хүсэж байна уу?')) {
      let drafts = JSON.parse(localStorage.getItem('draftsale'));
      let temp = [];
      drafts[props.warehouse].map(draft => {
        if (draft._id !== id) {
          temp.push(draft);
        }
      });
      drafts[props.warehouse] = temp;
      localStorage.setItem('draftsale', JSON.stringify(drafts));
      setRemoved(true);
    }
  };
  const dataId = data.type === 0 ? 'Draft' : data.generateId.slice(-7);
  let requestedBy = '';
  props.supplierUsers.map(user => {
    if (user.user_id === data.requestedBy) {
      requestedBy = user.first_name + ' ' + user.last_name;
    }
  });
  let taxPayerType = '';
  if (data?.config?.sale?.vat?.taxPayerType) {
    taxPayerType =
      data?.config?.sale?.vat?.taxPayerType === 'individual'
        ? 'Иргэн'
        : 'Байгууллага';
  }
  console.log(data);
  return (
    <>
      <div
        id={data.type === 0 ? data._id : null}
        className='box_container'
        style={{
          borderRadius: '3px',
          display: removed === false ? 'block' : 'none',
          overflow: 'hidden',
          background: data.type === 0 ? '#fffd7554' : 'inherit'
        }}
        key={Math.random()}
      >
        <div
          className='box'
          style={{ width: '52px', justifyContent: 'center' }}
        >
          <input type='checkbox' />
        </div>
        <div className='box' style={{ width: '80px' }}>
          <span
            onClick={() =>
              data.type === 0 ? props.openDraft(data) : props.openSale(data)
            }
            style={{ color: '#0F548C' }}
          >
            {dataId}
          </span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>
            {data.createdDate
              ? data.createdDate.substr(0, 10) +
                ' ' +
                data.createdDate.substr(11, 8)
              : null}
          </span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>{total.toLocaleString()}₮</span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>{data.discount ? data.discount : null}</span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span></span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span
            onClick={() => setVatDetail(true)}
            style={{
              color:
                data?.config?.sale?.vat?.returned &&
                data.config.sale.vat.returned === true
                  ? 'red'
                  : '#2ab674'
            }}
            id={'billId' + billId}
          >
            {data?.config?.sale?.vat?.totalVat ?? 0}₮
          </span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span></span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span></span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>{total.toLocaleString()}₮</span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>{taxPayerType}</span>
        </div>
        <div className='box' style={{ width: '180px' }}>
          <span>{requestedBy}</span>
        </div>
        <div className='box' style={{ width: '100px' }}>
          {data.type === 0 && removed === false ? (
            <span onClick={() => removeDraft(data._id)}>
              <button>Устгах</button>
            </span>
          ) : null}
        </div>
      </div>
      {vatDetail ? (
        <VatDetailForm props={props} setVatDetail={setVatDetail} />
      ) : null}
    </>
  );
};

export default Entry;
