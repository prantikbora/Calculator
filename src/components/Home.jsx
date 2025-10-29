import { Delete, Divide } from "lucide-react";
import { useState, useEffect} from "react";
import { evaluate } from "mathjs";


function Home() {
  const [input, setInput] = useState("");
   const [isOpenParen, setIsOpenParen] = useState(true); 

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
    try {
      if (input.trim() === "") return;
      const fixedInput = input.replace(/(\d+)%/g, "($1/100)");
      const result = evaluate(fixedInput);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
      console.log(error.message);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[0-9+\-*/().%]$/.test(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter" || key === "=") {
        calculate();
      } else if (key === "Backspace") {
        deleteLast();
      } else if (key.toLowerCase() === "c") {
        clearInput();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },[input])

  // Button styling shortcut
  const buttonStyle =
    "flex items-center justify-center bg-gray-700 text-white font-bold text-3xl rounded-full aspect-square hover:bg-white hover:text-black active:scale-95 transition-all";

  return (
<>
      <div className="flex flex-col items-center p-5 min-h-screen">
        <div className="flex flex-col items-center border rounded-3xl p-4 bg-black w-full max-w-md shadow-2xl">
          {/*Display*/}
          <h1 className="border w-full p-4 text-4xl font-bold rounded-2xl bg-white text-black h-30 overflow-x-auto text-right scrollbar-hide">
            {input || "0"}
          </h1>

          <div className="grid grid-cols-4 gap-3 mt-5 w-full">
            {/*Buttons*/}
            <button
              onClick={clearInput}
              className={`${buttonStyle} bg-yellow-400`}
            >
              C
            </button>
            <button onClick={() =>{ handleClick(isOpenParen ? "(" : ")");
            setIsOpenParen(!isOpenParen);}} className={buttonStyle}>
              ()
            </button>
            <button onClick={() => handleClick("%")} className={buttonStyle}>
              %
            </button>
            <button onClick={() => handleClick("/")} className={buttonStyle}>
              <Divide />
            </button>
            {/* Number and Operator Buttons */}
            {[7, 8, 9,"*", 4, 5, 6, "-", 1, 2, 3, "+"].map((item, i) => (
              <button
                key={i}
                onClick={() => handleClick(item.toString())}
                className={buttonStyle}
              >
                {item}
              </button>
            ))}
            <button onClick={() => handleClick("0")} className={buttonStyle}>
              0
            </button>
            <button onClick={() => handleClick(".")} className={buttonStyle}>
              .
            </button>
            
            {/* Delete Button */}
            <button
              onClick={deleteLast}
              className={`${buttonStyle} bg-red-500`}
            >
              <Delete/>
            </button>
            {/* Equals Button */}
            <button
              onClick={calculate}
              className={buttonStyle}
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
