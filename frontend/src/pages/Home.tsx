import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TerminalFunctionality from '../components/TerminalFunctionality';
import { useSystemStatus } from '../contexts/SystemStatusContext';

function Home(): JSX.Element {
  const { status } = useSystemStatus();

  useEffect(() => {
    document.title = 'Home - Cybersecurity Blog';
  }, []);

  return (
    <main className="bg-[#1E1E1E] min-h-screen text-[#FFFFFF]">
      {/* Hero section with greeting and command entry */}
      <HeroSection />

      {/* Section for the interactive terminal functionality */}
      <div className="container mx-auto px-4 py-8">
        <TerminalFunctionality />
      </div>

      {/* Optional system status display */}
      <div className="mt-8 p-4 text-center">
        <span className="font-mono text-[18px]">System Status: </span>
        <span
          className={
            status.operational
              ? 'font-mono text-[#66FF66] text-[18px]'
              : 'font-mono text-red-500 text-[18px]'
          }
        >
          {status.operational ? 'Operational' : 'Down'}
        </span>
        <p className="mt-2 font-sans text-[18px]">{status.message}</p>
      </div>
    </main>
  );
}

export default Home;