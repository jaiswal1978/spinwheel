import React, { useState, useEffect } from 'react';
function Pwa() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = () => {
    setDeferredPrompt(null);

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
  };

  const dismissAlert = () => {
    setShowAlert(false);
  };

  if (!deferredPrompt || !showAlert) return null;

  return (
    <>
    <div className="alert alert-warning alert-dismissible fade show" role="alert" onClick={promptInstall}>
      <div >
        <p className='text-center'>This is a PWA Example. By clicking on this Banner it will ask a permission to install the App
        <strong> By clicking on this Banner </strong> it will ask a permission to <strong>install the App on your phone or System.</strong> This can also be used to send notifications.
        </p>
      </div>
      <button type="button" className="btn-close" onClick={dismissAlert} aria-label="Close"></button>
    </div>

    </>
  );
  
}


export default Pwa;
