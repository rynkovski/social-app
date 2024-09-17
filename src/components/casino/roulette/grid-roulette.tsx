"use client";

import { Button } from "@/components/ui/button";
import { TBetRoulette } from "@/types/casino.types";

type Props = {
  disabled: boolean;
  setBetAmount: (amount: number) => void;
  setBetType: (type: TBetRoulette) => void;
  setBetNumber: (number: number | undefined) => void;
};
const rouletteNumbers = [
  ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"],
  ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"],
  ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"],
];

const redNumbers = [
  32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 31,
];

const numbers = Array.from({ length: 36 }, (_, i) => i + 1);
function GridRoulette({
  disabled,
  setBetAmount,
  setBetType,
  setBetNumber,
}: Props) {
  const handleAmountClick = (amount: number) => {
    setBetAmount(amount);
  };

  const handleNumberClick = (number: number) => {
    setBetNumber(number);
    setBetType("NUMBER");
  };
  const handleClick = (value: TBetRoulette) => {
    setBetType(value);
    setBetNumber(undefined);
  };
  return (
    <div className="bg-emerald-700 rounded-lg p-3">
      <div className="grid grid-cols-6 gap-2">
        {numbers.map((number, index) => (
          <div key={index} className="grid col-span-2 gap-2">
            <Button
              key={number}
              onClick={() => handleNumberClick(number)}
              disabled={disabled}
              variant={"secondary"}
              size={"sm"}
              className={`${redNumbers.includes(number) ? "bg-red-500" : "bg-black"} grid col-span-2 w-full gap-2 focus:bg-fuchsia-500 hover:bg-fuchsia-500 text-white`}
            >
              {number}
            </Button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2 mt-2">
        <Button
          onClick={() => handleClick("FIRST12")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className="grid col-span-2 bg-sky-300 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          1st 12
        </Button>
        <Button
          onClick={() => handleClick("SECOND12")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className="grid col-span-2 bg-sky-300 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          2nd 12
        </Button>
        <Button
          onClick={() => handleClick("THIRD12")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className="grid col-span-2 bg-sky-300 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          3rd 12
        </Button>

        <Button
          onClick={() => handleClick("EVEN")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className=" grid col-span-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          EVEN
        </Button>
        <Button
          onClick={() => handleClick("ODD")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className=" grid col-span-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          ODD
        </Button>
        <Button
          onClick={() => handleClick("RED")}
          disabled={disabled}
          size={"sm"}
          className="bg-red-500  text-white grid col-span-2 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          RED
        </Button>
        <Button
          onClick={() => handleClick("GREEN")}
          disabled={disabled}
          size={"sm"}
          className="bg-green-500  text-white   grid col-span-2 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          GREEN
        </Button>
        <Button
          onClick={() => handleClick("BLACK")}
          disabled={disabled}
          size={"sm"}
          className="bg-black  grid col-span-2 text-white  focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          BLACK
        </Button>

        <Button
          onClick={() => handleClick("HALF_LOW")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className=" grid col-span-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          1-18
        </Button>
        <Button
          onClick={() => handleClick("HALF_HIGH")}
          disabled={disabled}
          variant={"secondary"}
          size={"sm"}
          className=" grid col-span-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
        >
          19-36
        </Button>
      </div>
      <div className="mt-4">
        <span className="text-white font-bold">Amount:</span>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Button
            disabled={disabled}
            className="flex w-6 h-6 flex-col items-center rounded-full bg-blue-500 border-2 border-dotted text-white  border-white justify-center p-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
            onClick={() => handleAmountClick(50)}
          >
            50
          </Button>
          <Button
            disabled={disabled}
            className="flex w-8 h-8 flex-col items-center rounded-full border-2 border-dotted border-white bg-orange-400  text-white justify-center p-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500 "
            onClick={() => handleAmountClick(100)}
          >
            100
          </Button>{" "}
          <Button
            disabled={disabled}
            className="flex w-10 h-10 flex-col items-center rounded-full bg-yellow-400 border-2 border-dotted text-white  border-white justify-center p-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
            onClick={() => handleAmountClick(250)}
          >
            250
          </Button>{" "}
          <Button
            disabled={disabled}
            className="flex w-12 h-12 flex-col items-center rounded-full border-2 bg-black border-dotted text-white  border-white justify-center p-3 focus:bg-fuchsia-500 hover:bg-fuchsia-500"
            onClick={() => handleAmountClick(500)}
          >
            500
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default GridRoulette;
