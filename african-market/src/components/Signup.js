import React, { useState, useEffect } from 'react';
// import Nav from './Nav';
import * as yup from 'yup';
import { AxiosWithAuth } from '../utils/AxiosWithAuth';


import { useHistory } from 'react-router-dom';



const formSchema = yup.object().shape({
  first_name: yup.string().required('First name is a required field'),
  last_name: yup.string().required('Last name is a required field'),
  username: yup.string().required('username is a required field'),
  email: yup
    .string()
    .email('Email address required')
    .required('Must include email address'),
  password: yup.string().required(),
});

export default function Signup() {
  const [formState, setFormState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
  });

  const history = useHistory()

  const validate = (e) => {
    let value = e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted!');
    AxiosWithAuth()
      .post('api/register', formState)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    history.push('/login');
  };

  return (
    <div>
      {/* <Nav /> */}
      <form onSubmit={formSubmit}>
        <div className="loginColors">
        <h2> Welcome</h2>
        <label htmlFor='first_name'>
          First Name
          <input
            type='text'
            name='first_name'
            id='name'
            value={formState.first_name}
            onChange={inputChange}
          />
        </label>
        <label htmlFor='last_name'>
          Last Name
          <input
            type='text'
            name='last_name'
            id='name'
            value={formState.last_name}
            onChange={inputChange}
          />
        </label>
        <label htmlFor='username'>
          Username
          <input
            type='text'
            name='username'
            id='username'
            value={formState.username}
            onChange={inputChange}
          />
        </label>

        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            value={formState.email}
            onChange={inputChange}
          />
          {errorState.email.length > 0 ? (
            <p className='error'>{errorState.email}</p>
          ) : null}
        </label>

        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            id='password'
            value={formState.password}
            onChange={inputChange}
          />
          {errorState.password.length > 0 ? (
            <p className='error'>{errorState.password}</p>
          ) : null}
        </label>
        {/* this is a comment  */}

        <button disabled={buttonDisabled}>Submit</button>
        </div>
      </form>
    </div>
  );
}
