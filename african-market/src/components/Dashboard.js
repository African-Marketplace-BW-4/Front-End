import React from 'react';
import Item from "./Items"

import UpdateItem from "./UpdateItem"



let Dashboard = () => {
  // let [userItems, setUsersItems] = useState([]);
  // let [editing, setediting] = useState(false);
  // let history = useHistory()

  // let itemId = JSON.parse(localStorage.getItem('itemId'))
  //       let initialValue = {
  //           name: '',
  //           description: '',
  //           price: '',
  //           location_id: '',
  //       }
  //       history.push('/Home');

  // const [itemToEdit, setItemToEdit] = useState(inital);
  // console.log(itemToEdit, 'itemToEdit');

  // useEffect(() => {
  //   Axios
  //     .get('https://build-week-app.herokuapp.com/api/items')
  //     .then((res) => {
  //     console.log(res, 'userItems');
  //     setItemToEdit(res.data);
  //   });
  // }, []);


  return (
          <div>
          <UpdateItem />
           <Item />
          </div>
  );
};
export default Dashboard;
