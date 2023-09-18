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

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [showSubheading, setShowSubheading] = useState(false);

  const handleSpinClick = () => {
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

  useEffect(() => {
    if (!mustSpin && prizeNumber !== -1) {
      setTimeout(() => {
        setShowSubheading(true);
      }, 1000);
    }
  }, [mustSpin]);

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
    </>
  );
};
