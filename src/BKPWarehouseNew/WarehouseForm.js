import { useState, useContext } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import { ModuleContext } from './index';
import UserDataHook from '../Hooks/userHook';

const WarehouseForm = props => {
  const context = useContext(ModuleContext);
  const userCtx = useContext(UserDataHook);
  console.log(userCtx.userInfo.data);
  console.log(context);
  console.log(props);
  const [saving, setSaving] = useState(false);
  const save = () => {
    if (saving === false) {
      const borderColor =
        document.getElementById('warehouseName').style.borderColor;
      const warehouseName = document.getElementById('warehouseName');
      const warehouseLocation = document.getElementById('warehouseLocation');
      const warehouseType = document.getElementById('warehouseType');
      setSaving(true);
      if (warehouseName.value === '') {
        warehouseName.style.borderColor = 'red';
        warehouseName.focus();
        setTimeout(() => {
          warehouseName.style.borderColor = borderColor;
        }, 2000);
        setSaving(false);
        return;
      } else if (warehouseLocation.value === '') {
        warehouseLocation.style.borderColor = 'red';
        warehouseLocation.focus();
        setTimeout(() => {
          warehouseLocation.style.borderColor = borderColor;
        }, 2000);
        setSaving(false);
        return;
      } else if (warehouseType.value === '') {
        warehouseType.style.borderColor = 'red';
        warehouseType.focus();
        setTimeout(() => {
          warehouseType.style.borderColor = borderColor;
        }, 2000);
        setSaving(false);
        return;
      }
      console.log('saving');
      let sendData = {
        location: document.getElementById('warehouseLocation').value,
        manager: parseInt(userCtx.userInfo.data.id),
        type: parseInt(document.getElementById('warehouseType').value),
        origin: 2,
        name: document.getElementById('warehouseName').value,
        supplierId: parseInt(props.companyId.match(/\d+/g)[0]),
        managerEmail: userCtx.userInfo.data.email,
        supplierName: userCtx.userInfo.data.supplier_name
      };
      console.log(sendData);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(sendData)
      };
      const url = `${process.env.REACT_APP_API_URL2}/warehouse`;
      fetch(url, requestOptions)
        .then(r => r.json())
        .then(response => {
          if (response.message === 'success') {
            alert('Амжилттай үүсгэлээ.');
            props.setWarehouseForm(false);
            window.location.href = '/aguulakh';
          } else {
            alert('Оруулсан мэдээлллээ шалгана уу!');
            setSaving(false);
          }
        });
    }
  };
  return (
    <div className='container-fullpageform'>
      <div id='containerFloatPage'>
        <div id='floatPage'>
          <div className='pageHeader' id='pageHeader'>
            <p>Шинэ агуулах нэмэх</p>
            <span
              className='pageClose'
              onClick={() => props.setWarehouseForm()}
            >
              <img src='/images/close.svg' alt='' />
            </span>
          </div>
          <div className='main'>
            <div>
              <label>Агуулахын нэр</label>
              <input
                type='text'
                placeholder='Агуулахын нэр оруулна уу'
                id='warehouseName'
              />
            </div>
            <div>
              <label>Агуулахын байршил</label>
              <input
                type='text'
                placeholder='Агуулахын байршил оруулна уу'
                id='warehouseLocation'
              />
            </div>
            <div>
              <label>Агуулахын төрөл</label>
              <select id='warehouseType'>
                <option value=''>--- сонгоно уу ---</option>
                <option value='1'>үндсэн агуулах</option>
                <option value='2'>салбар агуулах</option>
                <option value='3'>шууд борлуулалт (van)</option>
                <option value='4'>түгээлтийн машин</option>
                <option value='5'>үйлдвэр</option>
              </select>
            </div>
          </div>
          <div id='pageBottom'>
            <button
              onClick={() => save()}
              disabled={saving ? true : false}
              className='pageButton'
            >
              Агуулах үүсгэх
            </button>
          </div>
        </div>
      </div>
      <div className='container-fullpageform-bg'></div>
    </div>
  );
};

export default WarehouseForm;
