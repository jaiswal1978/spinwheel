import React, { useState, useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';

const Notification = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload); // Log the payload
      setMessage(payload.notification.body);
    });
  }, []);

  return (
    <p>Message: {message}</p>
  );
};

export default Notification;
