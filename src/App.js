import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {Button} from '@material-ui/core';
import { Link,useHistory} from 'react-router-dom';
import Protected from '../src/components/ProtectedDash/ProtectedDash';

function App() {

  return (
    <Router>
      <div className="App">

        {/* <h1>I am the main App component</h1> */}
        <div className="boxes">

          <Switch>
            <Route exact path="/">
              <h1 style={{textAlign:"center"}}>Welcome to Unano</h1>
              <p style={{textAlign:"center"}}>Shortten your links</p>
              <div style={{textAlign:"center"}}>
                <Link to="/signup">
                  <Button style={{alignSelf:"center"}}variant="contained"color="primary">Register</Button>    
                </Link>
                <p></p>
                <Link to="/login">
                  <Button style={{alignSelf:"center"}}variant="contained"color="primary">Login</Button> 
                </Link>
              </div>
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/dashboard">
              <Protected >
                <Dashboard />
              </Protected>
            </Route>

          </Switch>

        </div>
        


        
      </div>
    </Router>
  );
}

export default App;
