import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Spinner/Spinner';
import css from './register.module.css';
import { useHistory } from 'react-router-dom';

const Register = props => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const sign = () => {
    if (emailValue.length === '' || !emailValue.includes('@')) {
      setEmailErr('Имэйлээ шалгана уу!');
      setTimeout(() => {
        setEmailErr('');
      }, 2000);
      return;
    }
    if (passwordValue.length === 0) {
      setPasswordErr('Нууц үгээ шалгана уу!');
      setTimeout(() => {
        setPasswordErr('');
      }, 2000);
      return;
    }

    // Send login data
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/login?email=${emailValue}&password=${passwordValue}`
    )
      .then(r => r.json())
      .then(response => {
        if (response.code === 404) {
          setEmailErr('Имэйл буруу байна!');
          setTimeout(() => {
            setEmailErr('');
          }, 2000);
          setLoading(false);
          return;
        } else if (response.code === 400) {
          setPasswordErr('Нууц үг буруу байна!');
          setTimeout(() => {
            setPasswordErr('');
          }, 2000);
          setLoading(false);
          return;
        } else if (response.code !== 200) {
          setError(
            'Холболтонд алдаа гарлаа!, Та түр хүлээгээд дахин оролдоно уу ...'
          );
          setTimeout(() => {
            setError('');
          }, 2000);
          setLoading(false);
          return;
        } else if (
          response.code === 200 &&
          response.message === 'login successful'
        ) {
          setLoading(false);
          localStorage.setItem('ebazaar_admin_token', response.ebazaar_token);
          //   history.replace("/");
          window.location.href = '/';
        }
        setLoading(false);
      });
  };
  return (
    <div id='sign'>
      <div className='image'></div>
      <div className='container-form'>
        <div className='form'>
          <div className='marginbottom4rem'>
            <img src='https://ebazaar.mn/logo/ebazaar.svg' alt='' />
          </div>
          {loading && (
            <div className='spinner-container'>
              <LoadingSpinner />
            </div>
          )}
          {!loading && (
            <>
              <div className='marginbottom4rem'>
                <h1>Нэвтрэх</h1>
              </div>
              <div className='container-input'>
                <input
                  type='text'
                  placeholder='Имэйл'
                  id='lemail'
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                />

                {emailErr && <p className={css.loginError}>{emailErr}</p>}
              </div>
              <div className='container-input'>
                <input
                  type='password'
                  placeholder='Нэвтрэх нууц үг'
                  id='lpassword'
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                />

                {passwordErr && <p className={css.loginError}>{passwordErr}</p>}
              </div>
              {error && <div className={css.loginError}>{passwordErr}</div>}
              <div className='marginbottom4rem'>
                <button className='sign' id='btn' onClick={() => sign()}>
                  Нэвтрэх
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
