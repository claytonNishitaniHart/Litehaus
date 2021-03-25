import React, { useState } from 'react';
import lighthouse from '../../images/lighthouse.svg';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (name.length === 0 ||
      email.length === 0 ||
      password.length === 0) return false;
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch('/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });
      const json = await response.json();
      console.log(json);
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}><a className={styles.titleLink} href='/'>Litehaus</a></h1>
      <form className={styles.form}>
        <h2 className={styles.header}>Sign Up</h2>
        <label className={styles.label}>
          Name
          <input className={styles.input} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.label}>
          Email
          <input className={styles.input} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={styles.button} onClick={(e) => submitForm(e)}>Continue</button>
        <p className={styles.signinText}>Already have an account? <a className={styles.signinLink} href='/signin'>Sign In</a></p>
      </form>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
    </main>
  );
}

export default SignUpPage;