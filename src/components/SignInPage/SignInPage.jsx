import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import lighthouse from '../../images/lighthouse.svg';
import styles from './SignInPage.module.css';

const SignInPage = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const history = useHistory();

  const validateForm = () => {
    let valid = true;
    document.getElementById('passwordLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('emailLabel').classList.remove(`${styles.inputMissing}`);
    if (password.length === 0) {
      valid = false
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

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch('/api/login', {
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
    }
  };
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}><a className={styles.titleLink} href='/'>Litehaus</a></h1>
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
        <button className={styles.button} onClick={(e) => submitForm(e)}>Continue</button>
        <p className={styles.signupText}>Don't have an account? <a className={styles.signupLink} href='/signup'>Sign Up</a></p>
      </form>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
    </main>
  );
}

export default SignInPage;