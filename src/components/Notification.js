// Show notification to the user
import React, { useState, useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload); // Log the payload
      setTitle(payload.notification.title);
      setMessage(payload.notification.body);
      setImage(payload.notification.image);
      // setName(payload.notification.name);
      setShowPopup(true);
    });
  }, []);

  return (
    <>
      {showPopup && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5, width: '50vh' }}>
          <Alert variant="info" onClose={() => setShowPopup(false)} dismissible>
            <Alert.Heading className='text-center'>{title}</Alert.Heading>
            <div className="d-flex justify-content-between">
            <p className='d-inline'>{message}</p>
            {image && <img src={image} alt="notification" className="img-fluid d-inline order-last" style={{borderRadius: '25%', height: '50px'}} />}
            </div>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Notification;
