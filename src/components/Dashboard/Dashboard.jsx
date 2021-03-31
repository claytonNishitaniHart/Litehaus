import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { HiChevronDown } from 'react-icons/hi';

const Dashboard = ({ setLoggedIn }) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const auth = `Bearer ${localStorage.getItem('accessToken')}`;
    fetch('/api/user', {
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
    fetch('/api/reset_refresh_token');
    localStorage.setItem('accessToken', '');
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <main>
      <h1>Litehaus</h1>
      <div>
        <p>Hi, {user.name} 👋</p>
        <button><HiChevronDown /></button>
      </div>
      <div>
        <button>Account Settings</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <h2>Add a new stock</h2>
      <h2>Stocks you're watching</h2>
    </main>
  );
};

export default Dashboard;