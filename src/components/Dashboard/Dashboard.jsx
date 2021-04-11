import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { HiChevronDown, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import styles from './Dashboard.module.css';

const Dashboard = ({ setLoggedIn }) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const auth = `Bearer ${localStorage.getItem('accessToken')}`;
    fetch('https://litehaus-api.herokuapp.com/api/user', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'authorization': auth
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          setUser(json.user);
        }
      });
  }, []);

  const logout = () => {
    fetch('https://litehaus-api.herokuapp.com/api/reset_refresh_token');
    localStorage.setItem('accessToken', '');
    setLoggedIn(false);
    history.push('/');
  }

  const handleDropDown = () => {
    const dropdown = document.getElementById(styles.dropDown);
    dropdown.style.display = dropdown.style.display === 'none' ? 'inline-block' : 'none';
  }

  return (
    <main>
      <h1>Litehaus</h1>
      <div className={styles.userDropDown}>
        <p className={styles.greeting}>Hi, {user.name ? user.name.split(' ')[0] : user.name} 👋</p>
        <button className={styles.dropDownArrow} onClick={() => handleDropDown()}><HiChevronDown /></button>
      </div>
      <div id={styles.dropDown} style={{ display: 'none' }}>
        <button className={styles.dropDownButton}><div className={styles.svg}><HiOutlineCog /></div><p>Account Settings</p></button>
        <button className={styles.dropDownButton} onClick={() => logout()}><div className={styles.svg}><HiOutlineLogout /></div><p>Logout</p></button>
      </div>
      <h2>Add a new stock</h2>
      <h2>Stocks you're watching</h2>
    </main>
  );
};

export default Dashboard;