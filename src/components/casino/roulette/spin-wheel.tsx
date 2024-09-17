"use client";

import { Wheel } from "react-custom-roulette";

type Props = {
  mustSpin: boolean;
  show: boolean;
  setMustSpin: React.Dispatch<React.SetStateAction<boolean>>;
  prizeNumber: number;
};

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "white" } },
  { option: "32", style: { backgroundColor: "red", textColor: "white" } },
  { option: "15", style: { backgroundColor: "black", textColor: "white" } },
  { option: "19", style: { backgroundColor: "red", textColor: "white" } },
  { option: "4", style: { backgroundColor: "black", textColor: "white" } },
  { option: "21", style: { backgroundColor: "red", textColor: "white" } },
  { option: "2", style: { backgroundColor: "black", textColor: "white" } },
  { option: "25", style: { backgroundColor: "red", textColor: "white" } },
  { option: "17", style: { backgroundColor: "black", textColor: "white" } },
  { option: "34", style: { backgroundColor: "red", textColor: "white" } },
  { option: "6", style: { backgroundColor: "black", textColor: "white" } },
  { option: "27", style: { backgroundColor: "red", textColor: "white" } },
  { option: "13", style: { backgroundColor: "black", textColor: "white" } },
  { option: "36", style: { backgroundColor: "red", textColor: "white" } },
  { option: "11", style: { backgroundColor: "black", textColor: "white" } },
  { option: "30", style: { backgroundColor: "red", textColor: "white" } },
  { option: "8", style: { backgroundColor: "black", textColor: "white" } },
  { option: "23", style: { backgroundColor: "red", textColor: "white" } },
  { option: "10", style: { backgroundColor: "black", textColor: "white" } },
  { option: "5", style: { backgroundColor: "red", textColor: "white" } },
  { option: "24", style: { backgroundColor: "black", textColor: "white" } },
  { option: "16", style: { backgroundColor: "red", textColor: "white" } },
  { option: "33", style: { backgroundColor: "black", textColor: "white" } },
  { option: "1", style: { backgroundColor: "red", textColor: "white" } },
  { option: "20", style: { backgroundColor: "black", textColor: "white" } },
  { option: "14", style: { backgroundColor: "red", textColor: "white" } },
  { option: "31", style: { backgroundColor: "black", textColor: "white" } },
  { option: "9", style: { backgroundColor: "red", textColor: "white" } },
  { option: "22", style: { backgroundColor: "black", textColor: "white" } },
  { option: "18", style: { backgroundColor: "red", textColor: "white" } },
  { option: "29", style: { backgroundColor: "black", textColor: "white" } },
  { option: "7", style: { backgroundColor: "red", textColor: "white" } },
  { option: "28", style: { backgroundColor: "black", textColor: "white" } },
  { option: "12", style: { backgroundColor: "red", textColor: "white" } },
  { option: "35", style: { backgroundColor: "black", textColor: "white" } },
  { option: "3", style: { backgroundColor: "red", textColor: "white" } },
  { option: "26", style: { backgroundColor: "black", textColor: "white" } },
];

function SpinWheel({ mustSpin, setMustSpin, prizeNumber, show }: Props) {
  return (
    <div className="flex items-center justify-center relative">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        spinDuration={0.5}
        innerRadius={40}
        radiusLineWidth={5}
        outerBorderWidth={10}
        outerBorderColor="#808080"
        innerBorderColor="#808080"
        innerBorderWidth={10}
        fontSize={14}
        radiusLineColor="gold"
        fontWeight={"bold"}
        textDistance={80}
        perpendicularText={true}
        pointerProps={{
          src: "/handpointer.png",
          style: { rotate: "-50deg", transform: "scale(1.4)" },
        }}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <div className="absolute">
        {show && (
          <span
            className={`${(data[prizeNumber].style.backgroundColor === "green" && "text-green-500") || (data[prizeNumber].style.backgroundColor === "red" && "text-red-500")} text-3xl font-bold my-10 p-2 rounded-full  w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center z-10`}
          >
            {data[prizeNumber].option}
          </span>
        )}
      </div>
    </div>
  );
}

export default SpinWheel;
