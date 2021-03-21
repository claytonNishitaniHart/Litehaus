import React from 'react';
import lighthouse from '../../images/lighthouse.svg';
import styles from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Litehaus</h1>
      <form className={styles.form}>
        <h2 className={styles.header}>Sign In</h2>
        <label className={styles.label}>
          Email
          <input className={styles.input} />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' />
        </label>
        <button className={styles.button}>Continue</button>
        <p className={styles.signupText}>Don't have an account? <a className={styles.signupLink} href='/signup'>Sign Up</a></p>
      </form>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
    </main>
  );
}

export default SignInPage;