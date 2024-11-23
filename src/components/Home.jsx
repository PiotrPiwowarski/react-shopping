import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headbar from './Headbar';

const Home = () => {
  const navigate = useNavigate();

  const logInButtonHandler = () => {
    navigate('/login');
  };

  const registrationButtonHandler = () => {
    navigate('/registration');
  };

  return (
    <div>
      <Headbar />

      <div className='home'>
        <button onClick={logInButtonHandler} >zaloguj się</button>
        <button onClick={registrationButtonHandler}c >zarejestruj się</button>
      </div>
    </div>
  );
};

export default Home;
