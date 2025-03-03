import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

interface TerminalLine {
  type: "command" | "response";
  text: string;
}

const TerminalFunctionality: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const logEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto scroll to bottom whenever history updates
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Process the command typed by the user
  const processCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    let response = "";

    switch (trimmedCommand) {
      case "help":
        response = "Available commands: help, clear, show blog";
        break;
      case "clear":
        // Clearing the terminal output; no response needed.
        setHistory([]);
        return;
      case "show blog":
        response = "Navigating to Blog Overview...";
        // Delay the navigation to allow the user to read the response.
        setTimeout(() => {
          navigate("/blog");
        }, 1000);
        break;
      default:
        response = "Command not recognized. Type 'help' for available commands.";
        break;
    }

    // Append the response message to the terminal history.
    setHistory((prevHistory) => [
      ...prevHistory,
      { type: "response", text: response }
    ]);
  };

  // Handle Enter key press in the input field.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!currentInput.trim()) return;
      // Save the command entered by the user.
      setHistory((prevHistory) => [
        ...prevHistory,
        { type: "command", text: currentInput }
      ]);
      // Process the command.
      processCommand(currentInput);
      // Clear the input field.
      setCurrentInput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-4 bg-[#1E1E1E] text-[#FFFFFF] rounded shadow-md font-mono">
      <h2 className="text-2xl mb-4" style={{ fontSize: "32px" }}>
        Interactive Terminal
      </h2>
      <div 
        className="bg-[#1E1E1E] border border-[#66FF66] p-4 rounded h-64 overflow-auto mb-4"
        style={{ fontSize: "18px" }}
      >
        {history.map((line, index) => (
          <p key={index} className="mb-1 transition-all duration-300">
            {line.type === "command" ? (
              <>
                <span className="text-[#66FF66]">&gt; </span>
                {line.text}
              </>
            ) : (
              <span>{line.text}</span>
            )}
          </p>
        ))}
        <div ref={logEndRef} />
      </div>
      <div className="flex items-center">
        <span className="text-[#66FF66] mr-2">&gt;</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your command here..."
          className="flex-1 rounded-md px-3 py-2 border border-[#66FF66] bg-transparent text-[#FFFFFF] focus:bg-[#FFFFFF] focus:text-black outline-none transition-colors duration-300"
        />
      </div>
    </div>
  );
};

export default TerminalFunctionality;