import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Spinner/Spinner';
import css from './login.module.css';

const Login = props => {
  const errorSign = false;
  let signing = false;
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  ///////
  let [emailError, setemailError] = useState(null);
  let [passwordError, setPasswordError] = useState(null);

  let inputBorderColor = null;
  const sign = () => {
    if (!signing) {
      const email = document.getElementById('lemail');
      const password = document.getElementById('lpassword');
      // // Email validation
      // if (email.value.length === "") {
      //   setemailError("Имэйлээ шалгана уу!");
      //   inputBorderColor = email.style.borderColor;
      //   setTimeout(() => {
      //     email.style.borderColor = inputBorderColor;
      //     document.getElementById("msg-email").innerText = "";
      //   }, 2000);
      //   email.style.borderColor = "red";
      //   email.focus();
      //   return;
      // }
      ///// Email shalgaj bn
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
      // if (password.value.length === 0) {
      //   // Password validation
      //   setPasswordError("Нууц үгээ оруулна уу!");
      //   inputBorderColor = email.style.borderColor;
      //   setTimeout(() => {
      //     password.style.borderColor = inputBorderColor;
      //     document.getElementById("msg-password").innerText = "";
      //   }, 2000);
      //   password.style.borderColor = "red";
      //   password.focus();
      //   return;
      // }
      signing = true;
      // Send login data
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/login?email=${email.value}&password=${password.value}`
      )
        .then(r => r.json())
        .then(response => {
          // console.log(
          //   "login resposnse++++++++++++------------------",
          //   response
          // );
          if (response.code === 404) {
            setemailError('Имэйл буруу байна!');
            inputBorderColor = email.style.borderColor;
            setTimeout(() => {
              email.style.borderColor = inputBorderColor;
              document.getElementById('msg-email').innerText = '';
            }, 2000);
            email.style.borderColor = 'red';
            email.focus();
            setLoading(false);
            return;
          } else if (response.code === 400) {
            setPasswordError('Нууц үг буруу байна!');
            inputBorderColor = email.style.borderColor;
            setTimeout(() => {
              password.style.borderColor = inputBorderColor;
              document.getElementById('msg-password').innerText = '';
            }, 2000);
            password.style.borderColor = 'red';
            setLoading(false);
            password.focus();
            return;
          } else if (
            response.code === 200 &&
            response.message === 'login successful'
          ) {
            setLoading(false);
            window.localStorage.setItem(
              'ebazaar_admin_token',
              response.ebazaar_token
            );
            window.location.href = '/';
          }
          setLoading(false);
        });
    }
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
                {emailError ? (
                  <p id='msg-email' className='msg-error'>
                    {emailError}
                  </p>
                ) : null}
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
                {passwordError ? (
                  <p id='msg-password' className='msg-error'>
                    {passwordError}
                  </p>
                ) : null}
                {passwordErr && <p className={css.loginError}>{passwordErr}</p>}
              </div>
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

export default Login;
