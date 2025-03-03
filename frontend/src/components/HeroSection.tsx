import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection(): JSX.Element {
  const navigate = useNavigate();
  const [command, setCommand] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmedCommand = command.trim().toLowerCase();
    if (trimmedCommand === 'show blog') {
      navigate('/blog');
    } else {
      setErrorMessage(`Command "${command}" not recognized.`);
    }
    setCommand('');
  };

  const handleCTAButtonClick = (): void => {
    navigate('/blog');
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center p-10 animate-slide-in">
      {/* Hero Section Title */}
      <h1 className="text-[32px] font-mono text-[#FFFFFF]">
        Welcome, Hacker.
      </h1>
      <p className="mt-4 text-[18px] font-sans text-[#FFFFFF]">
        Dive into the world of cybersecurity insights.
      </p>
      {/* Call-to-action Button */}
      <button
        onClick={handleCTAButtonClick}
        className="bg-[#66FF66] text-white rounded-full py-2 px-6 mt-6 transform hover:scale-105 transition duration-300"
      >
        Read My Latest Article
      </button>
      {/* Interactive Terminal Functionality */}
      <div className="mt-8 w-full max-w-md">
        <form onSubmit={handleFormSubmit} className="flex flex-col">
          <label htmlFor="terminal" className="text-[#66FF66] font-mono">
            terminal@cybersec:~$
          </label>
          <input
            id="terminal"
            type="text"
            value={command}
            onChange={(e) => {
              setCommand(e.target.value);
              setErrorMessage(null);
            }}
            placeholder="Enter command..."
            className="mt-2 p-2 rounded-md focus:outline-none text-black"
          />
        </form>
        {errorMessage && (
          <p className="text-red-500 font-mono mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default HeroSection;