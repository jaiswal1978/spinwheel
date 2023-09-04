import React, { useState, useEffect } from 'react';
import { getMessaging, getToken } from "firebase/messaging";


const NotificationProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const messaging = getMessaging();
    
    getToken(messaging, { vapidKey: 'BPSExREeV8ifKTY5Sa_UZlst9BU6WCeauKo-AVkhIRQbRFnvB2UIRmkdtkI0fSp-jS6VcTSfhO0NybeKYaEjtss' }).then((currentToken) => {
      if (currentToken) {
        console.log('Registration Token generated', currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

    
  }, []);

  return (
    <div>
    {children}
  </div>
  );
};

export default NotificationProvider;
