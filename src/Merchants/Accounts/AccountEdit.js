import { useState } from 'react';
import css from './businessedit.module.css';
import myHeaders from '../../components/MyHeader/myHeader';

const AccountEdit = props => {
  let item = props.data;
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [email, setEmail] = useState(item.email);
  const [phoneNumber, setPhoneNumber] = useState(item.phone);

  const handleSave = async () => {
    const url = `${process.env.REACT_APP_API_URL2}/user`;
    const requestPutOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        userId: item.userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber === item.phone ? '' : phoneNumber
      })
    };
    const res = await fetch(url, requestPutOptions);
    const response = await res.json();
    if (response.message === 'success') {
      alert('put success');
      props.getRequest();
      props.setToggleEdit(!props.toggleEdit);
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <div className={css.card}>
        <label className={css.label}>ID</label>
        <input
          className={css.information}
          type='number'
          disabled
          value={item.userId}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Нэр </label>
        <input
          className={css.information}
          type='text'
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Овог </label>
        <input
          className={css.information}
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Цахим хаяг </label>
        <input
          className={css.information}
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Хэрэглэгчийн утас </label>
        <input
          className={css.information}
          type='number'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>

      <button className={css.saveBtn} onClick={handleSave}>
        Хадгалах
      </button>
    </>
  );
};
export default AccountEdit;
