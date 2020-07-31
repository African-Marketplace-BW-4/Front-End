import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useHistory } from 'react-router-dom';

// const UpdateItem = props => {
//      console.log(props, 'updateitem')
//     let {itemToEdit, setItemToEdit, item, updateFunc} = props
    
//     const { items, getUpdateitems } = useState(initial);

//     let deleteItem = itemId => {
//         AxiosWithAuth()
//         .delete(`/api/items/${itemId}`)
//         .then(res => {
//           console.log(res)
//           refresh()
//         })
//         .catch(err => {
//           console.log(err)
//         })
//       }
//       const refresh = () => {
//         window.location.reload(true)
//       }

//     const handleSubmit = (evt) => {
//         updateFunc(item.id);
//         evt.preventDefault();
//     };

//     let handleChange = e => {
//         console.log('handleChange')
//         e.preventDefault();
//         setItemToEdit({...itemToEdit, [e.target.name]: e.target.value})
//     }

//     return(
//         <div>
//              <form onSubmit = {handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
//            {filteredList.map((items) => {
//                return 
//                 <itemLayout 
//                 deleteitem = {deleteitem} 
//                 item = {items}
//                 key = {item.id}
//                 />
//            })}
//            <div>
//                <button onClick={() => editing(true)}></button>
//            </div>
//             <h3>Need to make changes?</h3>
//             <label>Item</label>
//             <input type = 'text'
//             name= 'name'
//             placeholder = {item.name}
//             onChange = {handleChange}
//             value = {itemToEdit.name}
//             />
            
//             <label>Description</label>
//             <input type = 'text'
//             name =  'description'
//             placeholder = {item.description}
//             onChange = {handleChange}
//             value = {itemToEdit.description}
//             />
            
//             <label>Price</label>
//             <input type = 'number'
//             name =  'price'
//             placeholder = {item.price}
//             onChange = {handleChange}
//             value = {itemToEdit.price}
//             />

//             <label>Location</label>
//             <input type = 'location_id'
//             name =  'location'
//             placeholder = {item.location}
//             onChange = {handleChange}
//             value = {itemToEdit.location}
//             />

//             {/* <label>Id</label>
//             <input type = 'id'
//             name =  'id'
//             placeholder = {item.id}
//             onChange = {handleChange}
//             value = {itemToEdit.id}
//             /> */}

//             <button> Submit for changes </button>
            
//             </form>

//         </div>
//     )
// }

export default function Updateitem() {
    const { itemList, getItemList } = useState([]);

    const id = useParams().id;

    const initial = {
      name: '',
      description: '',
      price: '',
      location_id: [],
    };

    const [itemToEdit, setItemToEdit] = useState(initial);
    // const [movie, setMovie]

    const { push } = useHistory();

    useEffect(() => {
      axios
        .get(`https://build-week-app.herokuapp.com/api/items/${id}`)
        .then((res) => setItemToEdit(res.data))
        .catch((err) => console.log(err))
     },[id])
    

    const [value, setValue] = useState(itemToEdit);

    // const itemEdit = [...itemToEdit.initial];
    // console.log(itemEdit, "itemEdit stuff")
    

    const onChangeHandle = (e) => {
      const name = e.target.name;
      const changevalue =e.target.value;
      const id = e.target.id;
    setItemToEdit({...itemToEdit, [e.target.name]: e.target.value})

    //   if (name === 'initial') {
    //     itemEdit[id] = changevalue || itemToEdit.initial[id];
    //     console.log(itemEdit);
    //   } else {
    //     setValue({ ...itemToEdit, [name]: changevalue });
    //   }
    };

    const onSubmitHandle = (evt) => {
        evt.preventDefault();

        setValue({ ...value, initial: itemToEdit });
        console.log(value);

      axios
        .put(`https://build-week-app.herokuapp.com/api/items/${id}`, value)
        .then((res) => {
          console.log(res);
          getItemList();
          push('/Home');
        })
        .catch((err) => console.log(err));
    };
    
    const deleteItem = evt => {
      axios
        .delete(`https://build-week-app.herokuapp.com/api/items/${id}`)
        .then((res) => {
        getItemList();
        push('/Home');
      });
    };
    
    return (
      
      <form onSubmit={onSubmitHandle}>
          <label htmlFor='name'>Name</label>
        <input
          type='text'
          onChange={onChangeHandle}
          name='name'
          placeholder={`name: ${itemToEdit.name}`}
        />
         <label htmlFor='description'>Description</label>
        <input
          type='text'
          onChange={onChangeHandle}
          name='description'
          placeholder={`description: ${itemToEdit.description}`}
        />
         <label htmlFor='price'>Price</label>
        <input
          type='text'
          onChange={onChangeHandle}
          name='price'
          placeholder={`price: ${itemToEdit.price}`}
        />
         <label htmlFor='location_id'>Location</label>
        <input
          type='text'
          onChange={onChangeHandle}
          name='location_id'
          placeholder={`location_id: ${itemToEdit.location_id}`}
        />
        
        <button onClick={onSubmitHandle}>edit</button>
        <button onClick={deleteItem}>delete</button>
      
      </form>
    )
  };