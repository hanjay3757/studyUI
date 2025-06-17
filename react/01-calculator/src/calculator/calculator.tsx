import React, { useState } from "react";
import "./calculator.css";
import exp from "constants";

function Calculator() {
  //상태 변수
  const [input, setinput] = useState<string>("");
  const buttons: string[] = [
    "C",
    "←",
    "/",
    "*",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "=",
    "0",
    ".",
  ];

  const handleClick = (value: string) => {
    if (value === "C") {
      setinput("");
    } else if (value === "←") {
      setinput(input.slice(0, -1));
    } else if (value === "=") {
      const result = eval(input);
      setinput(String(result));
      // setinput(eval(input));
    } else if (
      value === "/" ||
      value === "*" ||
      value === "-" ||
      value === "+"
    ) {
      if (input === "") {
        return;
      }
      const lastChar = input[input.length - 1];
      if (
        lastChar === "/" ||
        lastChar === "*" ||
        lastChar === "-" ||
        lastChar === "+"
      ) {
        setinput(input.slice(0, -1) + value);
      } else {
        setinput(input + value);
      }
    } else {
      setinput(input + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {buttons.map((btn, id) => (
          <button onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
