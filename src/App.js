import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/refresh_token', {
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
      })
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>{loggedIn ? <Redirect to='/dashboard' /> : <LandingPage />}</Route>
          <Route path='/signin'>{loggedIn ? <Redirect to='/dashboard' /> : <SignInPage setLoggedIn={setLoggedIn} />}</Route>
          <Route path='/signup'>{loggedIn ? <Redirect to='/dashboard' /> : <SignUpPage setLoggedIn={setLoggedIn} />}</Route>
          <Route path='/dashboard'>{loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Redirect to='/signin' />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
