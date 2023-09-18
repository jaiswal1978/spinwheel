import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "../resources/RouletteWheel.css";  // Importing the stylesheet
import Lottie from "lottie-react";
import Celebration from '../resources/celebration.json'

export default function RouletteWheel({ probabilities }) {

  const data = [
    { option: "Section 1", probability: probabilities[0] },
    { option: "Section 2", probability: probabilities[1] },
    { option: "Section 3", probability: probabilities[2] },
    { option: "Section 4", probability: probabilities[3] },
    { option: "Section 5", probability: probabilities[4] },
    { option: "Section 6", probability: probabilities[5] },
    { option: "Section 7", probability: probabilities[6] },
    { option: "Section 8", probability: probabilities[7] },
    { option: "Section 9", probability: probabilities[8] }
  ];
  // Initialization
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [showSubheading, setShowSubheading] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [spinCounter, setSpinCounter] = useState(0); // Counter for controlling spins

  // Handling the spin button click
  const handleSpinClick = () => {
    // Show the social media share popup on first spin
    if (spinCounter === 0) {
      setShowSharePopup(true);
      return;
    }

    // Regular spin logic
    setMustSpin(true);
    setShowSubheading(false);
    const randomValue = Math.random();
    let accumulatedProbability = 0;
    let newPrizeNumber = -1;

    for (let i = 0; i < data.length; i++) {
      accumulatedProbability += data[i].probability;
      if (randomValue <= accumulatedProbability) {
        newPrizeNumber = i;
        break;
      }
    }

    if (newPrizeNumber !== -1) {
      setPrizeNumber(newPrizeNumber);
    } else {
      console.error("Failed to determine prize segment.");
    }
  };

  // React to the end of a spin
  useEffect(() => {
    if (!mustSpin && prizeNumber !== -1) {
      setTimeout(() => {
        setShowSubheading(true);
      }, 1000);
    }
  }, [mustSpin]);

  // Function to handle share and close buttons in popup
  const handleShareOrClose = () => {
    // Increment spin counter
    setSpinCounter(spinCounter + 1);

    // Dismiss the popup
    setShowSharePopup(false);
  };

  const handleShareOnWhatsApp = () => {
    const shareText = "Check out this amazing Roulette Wheel game: ";
    const shareURL = `${shareText}${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareURL)}`);
    handleShareOrClose();
  };
  
  const handleShareOnOtherPlatforms = () => {
    const shareText = "Check out this amazing Roulette Wheel game: ";
    const shareURL = `${shareText}${window.location.href}`;
    const encodedShareURL = encodeURIComponent(shareURL);
    
    // For Facebook (replace `YOUR_APP_ID`)
    // window.open(`https://www.facebook.com/dialog/share?app_id=YOUR_APP_ID&display=popup&href=${encodedShareURL}`);
  
    // For Twitter
    // window.open(`https://twitter.com/intent/tweet?text=${encodedShareURL}`);
  
    // For LinkedIn
    // window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareURL}`);
  
    handleShareOrClose();
  };

  return (
    <>
      <div className="wheel-container">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          outerBorderWidth={[10]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#dedede"]}
          radiusLineWidth={[1]}
          fontSize={15}
          textColors={["#ffffff"]}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#24CA69",
            "#514E50",
            "#46AEFF",
            "#9145B7"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="spin-button" onClick={handleSpinClick} disabled={mustSpin}>SPIN</button>
      </div>

      {showSubheading && (
        <div className="winner-announcement">
          <h2 className="winner-subheading">You won: {data[prizeNumber].option}</h2>
          <div>
            <p>Grab a Screenshot and show at the time of billing</p>
          </div>
          <Lottie className="lottie-animation" animationData={Celebration} />
        </div>
      )}

{showSharePopup && (
  <div className="share-popup">
    <button className="close-button" onClick={handleShareOrClose}>Close</button>
    <h2>Share This Page</h2>
    <button onClick={handleShareOnWhatsApp}>Share on WhatsApp</button>
    <button onClick={handleShareOnOtherPlatforms}>Share on Other Platforms</button>
  </div>
)}
    </>
  );
}
