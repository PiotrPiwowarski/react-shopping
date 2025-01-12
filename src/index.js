import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (navigator.serviceWorker) {
  navigator.serviceWorker.register(`/service-worker.js`)
    .then((registration) => {
      console.log('Service Worker zarejestrowany:', registration);
    })
    .catch((error) => {
      console.log('Błąd rejestracji Service Workera:', error);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
