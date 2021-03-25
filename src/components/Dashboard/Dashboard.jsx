import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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
    <>
      {user.email}
      <button onClick={() => logout()}>logout</button>
    </>
  );
};

export default Dashboard;