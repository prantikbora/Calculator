import React from "react";
import { Delete, Divide } from "lucide-react";
import { useState } from "react";

function Home() {
  const [input, setInput] = useState("");

  //Function to handle button clicks
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  //Clear the input
  const clearInput = () => {
    setInput("");
  };

  // Delete the last character
  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  //Calculate the result
  const calculate = () => {
    try {if (input.trim() === "") return;
      const result = Function(`"use strict"; return (${input})`)();
      setInput(result.toString());
    } catch (error) {
      setInput("Error") ;
      console.log(error.message)
    }
  };
  return (
    <>
      <div className="flex flex-col items-center p-5">
        <div className="flex flex-col p-4 items-center border w-fit rounded-4xl mt-1.5 bg-black">
          <h1 className="border w-full p-4 text-3xl font-bold rounded-4xl bg-white text-l  text-black h-30">
            {input || "0"}
          </h1>

          <div className="grid grid-cols-4 gap-4 mt-5 text-white font-bold text-3xl">

          {/*Buttons*/}
            <button
              onClick={clearInput}
              className="bg-yellow-400 rounded-full p-4 row-span-2 hover:bg-gray-50  hover:text-black"
            >
              AC
            </button>
            <button
              onClick={() => handleClick("(")}
              className="bg-gray-700 rounded-full p-4 hover:bg-gray-50  hover:text-black"
            >
              (
            </button>
            <button
              onClick={() => handleClick(")")}
              className="bg-gray-700 rounded-full p-4 hover:bg-gray-50  hover:text-black"
            >
              )
            </button>
            <button
              onClick={() => handleClick("/")}
              className="bg-gray-700 rounded-full p-4 hover:bg-gray-50  hover:text-black"
            >
             <Divide /> 
            </button>
            {/* Number and Operator Buttons */}
            {[7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "%"].map(
              (item, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(item.toString())}
                  className="bg-gray-700 rounded-full p-4 hover:bg-gray-50 hover:text-black"
                >
                  {item}
                </button>
              )
            )}
            {/* Delete Button */}
            <button
              onClick={deleteLast}
              className="bg-gray-700 rounded-full p-4 col-span-2 hover:bg-red-400 "
            >
              <Delete className="text-white" />
            </button>
            {/* Equals Button */}
            <button
              onClick={calculate}
              className="bg-blue-700 rounded-full p-4 col-span-2 hover:bg-gray-50  hover:text-black"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
