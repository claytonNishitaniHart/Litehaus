import React from 'react';
import lighthouse from '../../images/lighthouse.svg';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}><a className={styles.titleLink} href='/'>Litehaus</a></h1>
      <form className={styles.form}>
        <h2 className={styles.header}>Sign Up</h2>
        <label className={styles.label}>
          Name
          <input className={styles.input} />
        </label>
        <label className={styles.label}>
          Email
          <input className={styles.input} />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' />
        </label>
        <button className={styles.button}>Continue</button>
        <p className={styles.signinText}>Already have an account? <a className={styles.signinLink} href='/signin'>Sign In</a></p>
      </form>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
    </main>
  );
}

export default SignUpPage;