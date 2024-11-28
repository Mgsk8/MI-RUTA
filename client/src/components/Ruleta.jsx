import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "hola", style: { backgroundColor: "#b6d7f8", textColor: "black" } },
  { option: "hello", style: { backgroundColor: "green", textColor: "black" } },
  { option: "2", style: { backgroundColor: "blue", textColor: "black" } },
];

const Ruleta = ({ onFinish }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor="#b6d7f8"
        innerBorderColor="#b6d7f8"
        radiusLineColor="#b6d7f8"
        onStopSpinning={() => {
          setMustSpin(false);
          const selectedOption = data[prizeNumber].option;
          if (onFinish) onFinish(selectedOption); 
          
        }}
      />
      <button onClick={handleSpinClick} className="mx-auto block  bg-blue-600 text-white py-2 px-4 rounded">
        SPIN
      </button>
    </>
  );
};

export default Ruleta;
