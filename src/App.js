import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import './index.css';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import Userss from './components/users/Userss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={Userss} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
