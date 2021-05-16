import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import lighthouse from '../../images/lighthouse.svg';
import loading from '../../images/loading.svg';
import styles from './SignInPage.module.css';

const URL = 'https://litehaus-api.herokuapp.com';

const SignInPage = ({ setLoggedIn }) => {
  const [working, setWorking] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const history = useHistory();

  const validateForm = () => {
    let valid = true;
    document.getElementById('passwordLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('emailLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('passwordLabel').classList.remove(`${styles.passwordInvalid}`);
    document.getElementById('emailLabel').classList.remove(`${styles.emailInvalid}`);
    if (password.length === 0) {
      valid = false;
      passwordInput.current.focus();
      document.getElementById('passwordLabel').classList.add(`${styles.inputMissing}`);
    }
    if (email.length === 0) {
      valid = false;
      emailInput.current.focus();
      document.getElementById('emailLabel').classList.add(`${styles.inputMissing}`);
    }

    return valid;
  };

  const handleErrorStatus = (status) => {
    switch (status) {
      case 404:
        emailInput.current.focus();
        document.getElementById('emailLabel').classList.add(`${styles.emailInvalid}`);
        break;
      case 401:
        passwordInput.current.focus();
        document.getElementById('passwordLabel').classList.add(`${styles.passwordInvalid}`);
        break;
      default:
        console.log('unexpected status');
        break;
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setWorking(true);
      const response = await fetch(`${URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const json = await response.json();
      setLoggedIn(json.success ? true : false);
      localStorage.setItem('accessToken', json.token);
      history.push(json.success ? '/dashboard' : '/signin');
      if (!json.success) {
        setWorking(false);
        handleErrorStatus(response.status);
      }
    }
  };
  return (
    <main className={styles.wrapper}>
      <div>
        <h1 className={styles.title}><a className={styles.titleLink} href='/'>Litehaus</a></h1>
        <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
      </div>
      <form className={styles.form}>
        <h2 className={styles.header}>Sign In</h2>
        <label ref={emailInput} className={styles.label}>
          <p id='emailLabel'>Email</p>
          <input autoFocus className={styles.input} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.label}>
          <p id='passwordLabel'>Password</p>
          <input ref={passwordInput} className={styles.input} type='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={styles.button} onClick={(e) => submitForm(e)}>{working ? <img className={styles.loading} src={loading} alt='loading...' /> : 'Continue'}</button>
        <p className={styles.signupText}>Don't have an account? <a className={styles.signupLink} href='/signup'>Sign Up</a></p>
      </form>
    </main>
  );
}

export default SignInPage;