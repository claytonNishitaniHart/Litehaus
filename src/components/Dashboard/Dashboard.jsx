import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { HiChevronDown, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import styles from './Dashboard.module.css';
import Search from '../Search/Search';
import SymbolList from '../SymbolList/SymbolList';

const URL = 'https://litehaus-api.herokuapp.com';

const Dashboard = ({ setLoggedIn }) => {
  const [user, setUser] = useState({});
  const [symbols, setSymbols] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const auth = `Bearer ${localStorage.getItem('accessToken')}`;
    fetch(`${URL}/api/getSymbols`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'authorization': auth
      }
    })
      .then(response => response.json())
      .then(json => setSymbols(json.symbols));
  }, []);

  useEffect(() => {
    const auth = `Bearer ${localStorage.getItem('accessToken')}`;
    fetch(`${URL}/api/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'authorization': auth
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          setUser(json.user);
        }
      });
  }, []);

  const logout = () => {
    fetch(`${URL}/api/reset_refresh_token`, {
      credentials: 'include'
    })
      .then(result => result.json())
      .then(json => {
        localStorage.setItem('accessToken', '');
        setLoggedIn(false);
        history.push('/');
      });
  }

  const handleDropDown = () => {
    const dropdown = document.getElementById(styles.dropDown);
    dropdown.style.display = dropdown.style.display === 'none' ? 'inline-block' : 'none';
  }

  const handleUpdateSymbols = (e, newSymbol) => {
    e.preventDefault();
    let symbolsArr = symbols ? symbols.split(',') : [];
    if (symbolsArr.includes(newSymbol)) {
      symbolsArr = symbolsArr.filter((x) => {
        return x !== newSymbol;
      });
    } else {
      symbolsArr.push(newSymbol);
    }
    const newSymbols = symbolsArr.join(',');

    fetch(`${URL}/api/refresh_token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('accessToken', json.token);
        setLoggedIn(json.token.length > 0 ? true : false);
        const auth = `Bearer ${localStorage.getItem('accessToken')}`;
        fetch(`${URL}/api/setSymbols`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'authorization': auth
          },
          body: JSON.stringify({
            symbols: newSymbols
          })
        })
          .then(response => response.json())
          .then(json => setSymbols(json.user.symbols));
      })
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Litehaus</h1>
      <div className={styles.userDropDown}>
        <p className={styles.greeting}>Hi, {user.name ? user.name.split(' ')[0] : user.name} 👋</p>
        <button className={styles.dropDownArrow} onClick={() => handleDropDown()}><HiChevronDown /></button>
      </div>
      <div id={styles.dropDown} style={{ display: 'none' }}>
        <button className={styles.dropDownButton}><div className={styles.svg}><HiOutlineCog /></div><p>Account Settings</p></button>
        <button className={styles.dropDownButton} onClick={() => logout()}><div className={styles.svg}><HiOutlineLogout /></div><p>Logout</p></button>
      </div>
      <div className={styles.content}>
        <h2 className={styles.add}>Add a new stock</h2>
        <Search updateSymbols={handleUpdateSymbols} currentSymbols={symbols} />
        <h2 className={styles.watching}>Stocks you're watching</h2>
        <SymbolList symbols={symbols ? symbols.split(',') : []} />
      </div>
    </main>
  );
};

export default Dashboard;