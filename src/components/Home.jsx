import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headbar from './Headbar';
import TitleBar from './TitleBar'

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
      <TitleBar title='Dzień dobry' />
      <div className='vertical-container'>
        <button onClick={logInButtonHandler} >zaloguj się</button>
        <button onClick={registrationButtonHandler} >zarejestruj się</button>
      </div>
    </div>
  );
};

export default Home;
