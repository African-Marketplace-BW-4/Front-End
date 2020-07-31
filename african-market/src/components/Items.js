import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarket } from '../actions/marketActions';
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios';

import styled from 'styled-components'


const Cardholder = styled.div`
display: flex;
flex-wrap: wrap;
background-color: white;
padding: 5%;
`
const Card = styled.div `
padding:5%;
width: 30%;
margin: 0 auto;
margin-top: 5%;
padding: 1%;
border: 1px solid black`

const Item = (props) => {
  useEffect(() => {
    props.fetchMarket();
  }, []);
  
  const history = useHistory()
  const {id} = useParams

  const deleteItem = (evt) => {
    axios
      .delete(`https://build-week-app.herokuapp.com/api/items/${id}`)
      .then((res) => {
      history.push('/Home');
    });
  };

  return (
    <>
     <div>
        {props.item &&
          props.item.map((itemList) => {
            return (
              <Cardholder>
              <Card>
                <p className="listName">{itemList.name}</p>
                <div className="listOthers">
                <p>{itemList.description}</p>
                <p>{itemList.price}</p>
                <p>{itemList.location}</p>
                </div>
                <Link to='/edit/:id'>Edit</Link>
                <Link onClick={deleteItem}>Delete</Link>
              <link to={`ViewItem/${itemList.id}`}/>
              </Card>
              </Cardholder>
          
            );
          })}    
      </div>
      

      <p className='error'>{props.error}</p>
      <div className="alignButtons">
      <Link className="addItemButton" to ='/Additem'>Add Item</Link>
     </div>
  </>
   );
  };
 
 const mapStateToProps = state => {
     console.log(state);
     return {
         item: state.marketReducer.market,
         error: state.marketReducer.error
     }
 }

 export default connect(
     mapStateToProps,
     { fetchMarket })
     (Item)