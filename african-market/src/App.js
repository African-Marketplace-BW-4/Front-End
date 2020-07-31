import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ViewItem from "./components/ViewItem";
import Axios from "axios";
import AddItem from "./components/AddItem"
import Footer from "./components/footer"



import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

export default function App(props) {
  
  let initalValue = {
    name: '',
    description: '',
    price: '',
    location: '',
  };

  const [itemToEdit, setItemToEdit] = useState(initalValue);
  console.log(itemToEdit, 'itemToEdit');

  useEffect(() => {
    Axios
      .get('https://build-week-app.herokuapp.com/api/items')
      .then((res) => {
      console.log(res, 'userItems');
      setItemToEdit(res.data);
    });
  }, []);

  
  return (
    // Wrapping in Router & adding links
    // placing "exact" on Route to make it go to the specific path
   
    <Router>
    <div className='App'>
      <img src='African photo.jpg' alt='africanphoto'/>
      <Nav />
        <Switch>
          <PrivateRoute exact path='/Home' component={Dashboard} itemToEdit = {itemToEdit} setItemEdit = {setItemToEdit} />

          <Route exact path='/Signup'>
            <Signup />
          </Route>

          <Route path='/Login'>
            <Login />
          </Route>

          <Route exact path='/Additem'>
            <AddItem />
          </Route>

          {/* <Route path='/ViewItem/:id' render={(props) =><ViewItem itemToEdit = {itemToEdit} setItemEdit = {setItemToEdit} />}/> */}
         
        </Switch>
        <Footer />
      </div>

     </Router>
  );
}
// comment
