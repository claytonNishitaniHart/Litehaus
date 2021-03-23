import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';

function App() {
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
