import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import { getAccessToken, setAccessToken } from './components/accessToken';

function App() {
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
        setAccessToken(json.token);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'><LandingPage /></Route>
          <Route path='/signin'><SignInPage /></Route>
          <Route path='/signup'><SignUpPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
