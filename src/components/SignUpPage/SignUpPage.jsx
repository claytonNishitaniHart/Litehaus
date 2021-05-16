import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import lighthouse from '../../images/lighthouse.svg';
import loading from '../../images/loading.svg';
import styles from './SignUpPage.module.css';

const URL = 'https://litehaus-api.herokuapp.com';

const SignUpPage = ({ setLoggedIn }) => {
  const [working, setWorking] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const history = useHistory();

  const validateForm = () => {
    let valid = true;
    document.getElementById('passwordLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('emailLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('nameLabel').classList.remove(`${styles.inputMissing}`);
    document.getElementById('emailLabel').classList.remove(`${styles.emailInvalid}`);
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
    if (name.length === 0) {
      valid = false;
      nameInput.current.focus();
      document.getElementById('nameLabel').classList.add(`${styles.inputMissing}`);
    }

    return valid;
  };

  const handleErrorStatus = (status) => {
    switch (status) {
      case 400:
        emailInput.current.focus();
        document.getElementById('emailLabel').classList.add(`${styles.emailInvalid}`);
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
      const response = await fetch(`${URL}/api/register`, {
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
      setLoggedIn(json.success ? true : false);
      localStorage.setItem('accessToken', json.token);
      history.push(json.success ? '/dashboard' : '/signup');
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
        <h2 className={styles.header}>Sign Up</h2>
        <label ref={nameInput} className={styles.label}>
          <p id='nameLabel'>Name</p>
          <input autoFocus className={styles.input} onChange={(e) => setName(e.target.value)} />
        </label>
        <label ref={emailInput} className={styles.label}>
          <p id='emailLabel'>Email</p>
          <input className={styles.input} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label ref={passwordInput} className={styles.label}>
          <p id='passwordLabel'>Password</p>
          <input className={styles.input} type='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={styles.button} onClick={(e) => submitForm(e)}>{working ? <img className={styles.loading} src={loading} alt='loading...' /> : 'Continue'}</button>
        <p className={styles.signinText}>Already have an account? <a className={styles.signinLink} href='/signin'>Sign In</a></p>
      </form>
    </main>
  );
}

export default SignUpPage;