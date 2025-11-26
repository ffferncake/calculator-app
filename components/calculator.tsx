"use client";
import { useCalculator } from "../app/hooks/use-calculator";
import Display from "./display";
import Button from "./button";

const buttons = [
  "AC", "C", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", "."
];

export default function Calculator() {
  const { input, result, handleInput, handleClear, handleAllClear, handleCalculate } = useCalculator();

  const onClick = (val: string) => {
    if (val === "AC") handleAllClear();
    else if (val === "C") handleClear();
    else if (val === "=") handleCalculate();
    else handleInput(val);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl w-80 shadow-lg">
      <Display input={input} result={result} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        {buttons.map((btn) => (
          <Button key={btn} label={btn} onClick={() => onClick(btn)} />
        ))}
      </div>
    </div>
  );
}
