// CSS
import css from './styles.module.css';

// Packages
import { useState, useEffect } from 'react';

// Components
import { Input, Button, LoadingSpinner } from '../../components/common/';

// Pictures
import bgImage from '../../assets/login/background.png';
import logo from '../../assets/login/logo.svg';
import formElement from '../../assets/login/formElement.svg';
import { HideGray, ShowGray } from '../../assets/icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const [mainErrMsg, setMainErrMsg] = useState('');

  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email !== '' && email.includes('@') && password !== '') {
      setSubmitBtnDisabled(false);
    } else {
      setSubmitBtnDisabled(true);
    }
  }, [email, password]);

  const submitHandler = () => {
    if (submitBtnDisabled) return;
    if (loading) return;

    if (email.length === '' || !email.includes('@')) {
      setEmailErrMsg('Имэйлээ шалгана уу!');
      setTimeout(() => {
        setEmailErrMsg('');
      }, 2000);
      return;
    }
    if (password.length === 0) {
      setPasswordErrMsg('Нууц үгээ шалгана уу!');
      setTimeout(() => {
        setPasswordErrMsg('');
      }, 2000);
      return;
    }

    // Send login data
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/login?email=${email}&password=${password}`
    )
      .then(r => r.json())
      .then(response => {
        if (response.code === 404) {
          setEmailErrMsg('Имэйл буруу байна!');
          setTimeout(() => {
            setEmailErrMsg('');
          }, 2000);
          setLoading(false);
          return;
        } else if (response.code === 400) {
          setPasswordErrMsg('Нууц үг буруу байна!');
          setTimeout(() => {
            setPasswordErrMsg('');
          }, 2000);
          setLoading(false);
          return;
        } else if (response.code !== 200) {
          setMainErrMsg(
            'Холболтонд алдаа гарлаа!, Та түр хүлээгээд дахин оролдоно уу ...'
          );
          setTimeout(() => {
            setMainErrMsg('');
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
          window.location.replace('/');
        }
        setLoading(false);
      });
  };

  return (
    <div
      className={css.container}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={css.loginFormContainer}>
        <div
          className={css.formHeader}
          style={{ marginBottom: loading ? 0 : 47 }}
        >
          <img src={logo} alt='Logo' />
          <h1>Bazaar sales-т тавтай морил!</h1>
          <p>
            Цагаа хэмнэж бизнесээ <br /> өргөжүүлье
          </p>
        </div>

        {!loading && (
          <form
            onSubmit={e => {
              e.preventDefault();
              submitHandler();
            }}
            className={css.form}
          >
            <div style={{ marginBottom: emailErrMsg ? 0 : 20 }}>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                size='large'
                placeholder='Имэйл'
                type='email'
                errorMsg={emailErrMsg}
              />
            </div>
            <div style={{ marginBottom: passwordErrMsg ? 40 : 60 }}>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                size='large'
                placeholder='Нууц үг'
                icon={showPassword ? <ShowGray /> : <HideGray />}
                iconposition='right'
                iconClickHandler={() => {
                  setShowPassword(prev => !prev);
                }}
                errorMsg={passwordErrMsg}
              />
            </div>

            <Button disabled={submitBtnDisabled} type='submit' width='100%'>
              Нэвтрэх
            </Button>
            {mainErrMsg && <p className={css.errorMsg}>{mainErrMsg}</p>}
          </form>
        )}

        {loading && (
          <div className={css.spinnerWrapper}>
            <LoadingSpinner />
          </div>
        )}

        <div className={css.formElement}>
          <img src={formElement} alt='Form Element' />
        </div>
      </div>
    </div>
  );
};

export default Login;
