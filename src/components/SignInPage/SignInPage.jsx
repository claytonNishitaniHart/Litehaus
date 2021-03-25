import React, { useState } from 'react';
import { useHistory } from 'react-router';
import lighthouse from '../../images/lighthouse.svg';
import styles from './SignInPage.module.css';

const SignInPage = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateForm = () => {
    if (email.length === 0 ||
      password.length === 0) return false;
    return true;
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
        <label className={styles.label}>
          Email
          <input className={styles.input} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={styles.button} onClick={(e) => submitForm(e)}>Continue</button>
        <p className={styles.signupText}>Don't have an account? <a className={styles.signupLink} href='/signup'>Sign Up</a></p>
      </form>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
    </main>
  );
}

export default SignInPage;