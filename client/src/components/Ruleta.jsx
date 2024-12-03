import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "Descuento 5%", style: { backgroundColor: "#A3C9E2", textColor: "#003049" } },
  { option: "Descuento 7%", style: { backgroundColor: "#89CFF0", textColor: "#003049" } },
  { option: "Descuento 2%", style: { backgroundColor: "#66B3CC", textColor: "white" } },
  { option: "Sigue intentando", style: { backgroundColor: "#588BAE", textColor: "white" } },
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
    <div className="flex flex-col items-center space-y-6">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor="#A3C9E2"
        outerBorderWidth={10}
        innerBorderColor="#E0F7FA"
        innerBorderWidth={6}
        radiusLineColor="#66B3CC"
        radiusLineWidth={2}
        textDistance={80}
        fontSize={14}
        perpendicularText
        onStopSpinning={() => {
          setMustSpin(false);
          const selectedOption = data[prizeNumber].option;
          if (onFinish) onFinish(selectedOption);
        }}
      />
      <button
        onClick={handleSpinClick}
        className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        GIRAR
      </button>
    </div>
  );
};

export default Ruleta;
