import React from 'react';
import './Firebase';
import './App.css';
import Pwa from './components/Pwa';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationProvider from './components/NotificationProvider';
import Notification from './components/Notification';

function App() {
  return (
    <>
      <Pwa />
      <NotificationProvider/>
      <Notification />
      <h1 className='text-center'>This is a test app for PWA and push notification</h1>
    </>
  );
}

export default App;
