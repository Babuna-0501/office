import React, { useState, useEffect } from 'react';
import css from './ordertab.module.css';
import Listcomponents from '../Listcomponents/Listcomponents';
import myHeaders from '../../../components/MyHeader/myHeader';
import editIcon from '../../../assets/Edit_icon.svg';
import TavanBogd from '../../TavanBogd';

const OrderTab = props => {
  const [modify, setModify] = useState(false);
  const [active, setActive] = useState(null);
  const [line, setLine] = useState(props.order.line);
  const [orderOne, setOrderOne] = useState(props.order);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  // console.log("props ordertab++++----", props);
  // console.log("props line", line);

  const modifyHandler = (index, data) => {
    if (props.order.status === 5 || props.order.status === 3) {
      setModify(false);
      setActive(null);
    } else if (props.order.status === 1 || props.order.status === 2) {
      setModify(true);
      setActive(index);
    }
  };
  const addHandler = data => {
    // console.log("add", data);

    if (permission.order && permission.order.update !== true) {
      alert('Та захиалга засварлах эрхгүй байна.');
      return;
    }
    const newState = line.map(obj => {
      if (obj.product_id === data.product_id) {
        console.log('obj', obj);
        return { ...obj, quantity: obj.quantity + 1 };
      }
      return obj;
    });
    setLine(newState);
    let aa = orderOne;
    aa.line = line;
    props.setOrder(aa);
  };
  const minusHandler = data => {
    // console.log("minus", data);

    if (permission.order && permission.order.update !== true) {
      alert('Та захиалга засварлах эрхгүй байна.');
      return;
    }
    const newState = line.map(obj => {
      if (obj.product_id === data.product_id) {
        console.log('obj', obj);
        if (obj.quantity > 1) {
          return { ...obj, quantity: obj.quantity - 1 };
        } else {
          return { ...obj, quantity: (obj.quantity = 1) };
        }
      }
      return obj;
    });
    setLine(newState);
    let aa = orderOne;
    aa.line = line;
    props.setOrder(aa);
  };

  const UpdateHandler = () => {
    setActive(null);
    setButtonDisabled(true);
    let dataQuantity = props.order.line.map(item => {
      return {
        order_detail_id: item.order_detail_id,
        quantity: Number(item.quantity)
      };
    });

    var raw = JSON.stringify({
      order_id: props.order.order_id,
      line: dataQuantity
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log("order line request", requestOptions);
    fetch(`${process.env.REACT_APP_API_URL2}/api/order/update`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("lines result", result);
        // console.log("buttondisabled", buttonDisabled);
        if (result.code === 200) {
          fetch(`${process.env.REACT_APP_API_URL2}/api/create/backofficelog`, {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
              section_name: 'Захиалгыг шинэчлэлээ.',
              entry_id: props.data.order_id,
              user_name: props.userData.email,
              action: `Шинэ захиалга:${raw}`
            })
          })
            .then(res => res.json())
            .then(res => console.log('res', res))
            .catch(error => {
              console.log('error', error);
            });
          alert('Захиалгыг шинэчлэлээ.!');
          setButtonDisabled(false);
          props.setLines(false);
        } else {
          alert('Алдаа гарлаа' + result.message);
        }
      });
  };
  const change = (idx, operator) => {
    // setOrderChangeBtn(true);
    // console.log("orderchange btn from change", orderChangeBtn);
    let qty =
      operator === 'plus'
        ? parseInt(document.getElementById('qty' + idx).value, 10) + 1
        : parseInt(document.getElementById('qty' + idx).value, 10) > 2
        ? parseInt(document.getElementById('qty' + idx).value, 10) - 1
        : 1;
    document.getElementById('qty' + idx).value = qty;
    let temp = orderOne;
    temp.line[idx].quantity = qty;

    setOrderOne(temp => JSON.parse(JSON.stringify(temp)));
  };
  let content;
  if (props.order.supplier_id === 975) {
    content = <TavanBogd order={orderOne} data={props.data} supID={975} />;
  } else if (props.order.supplier_id === 149) {
    content = <TavanBogd order={orderOne} data={props.data} supID={149} />;
  } else {
    content = line.map((item, index) => {
      return (
        <div className={css.wrapper} key={index}>
          <Listcomponents data={item} setActive={setActive} />
          <div className={css.editcontainer}>
            {active === index ? (
              <div className={css.modifycontainer}>
                <ul>
                  <li onClick={() => change(index, 'minus')}>-</li>
                  {/* <li className={css.quantity}>{item.quantity}</li>{" "} */}
                  <input
                    className={css.quantityOne}
                    type='number'
                    defaultValue={item.quantity}
                    id={'qty' + index}
                    style={{ width: '50px' }}
                    onChange={e => {
                      item.quantity = e.target.value;
                      // setOrderChangeBtn(true);
                    }}
                  />
                  <li onClick={() => change(index, 'plus')}>+</li>
                </ul>
              </div>
            ) : (
              <img
                src={editIcon}
                alt='modify button'
                onClick={() => modifyHandler(index, props.order)}
              />
            )}
          </div>
        </div>
      );
    });
  }
  return (
    <div className={css.container}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {buttonDisabled === false ? (
          <button className={css.approvebtn} onClick={UpdateHandler}>
            Хадгалах
          </button>
        ) : null}
      </div>
      {content}
    </div>
  );
};

export default OrderTab;
