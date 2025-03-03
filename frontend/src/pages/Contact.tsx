import React from 'react';
import ContactForm from '../components/ContactForm';
import { useSystemStatus } from '../contexts/SystemStatusContext';

const Contact: React.FC = () => {
  const { status } = useSystemStatus();

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] p-4">
      <header className="flex justify-center items-center py-6">
        <h1 className="text-4xl font-mono" style={{ fontSize: '32px' }}>Contact</h1>
      </header>

      {/* Contact Form Section */}
      <main className="flex flex-col items-center">
        <ContactForm />

        {/* Social Media Links */}
        <section className="mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-mono mb-4">Connect with me</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#66FF66] text-white rounded hover:bg-green-500 transition-colors duration-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#66FF66] text-white rounded hover:bg-green-500 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#66FF66] text-white rounded hover:bg-green-500 transition-colors duration-300"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* System Status Display */}
        <section className="mt-8 w-full max-w-xl">
          <div className="p-4 bg-[#1E1E1E] border border-gray-700 rounded shadow-md">
            <p className="font-mono text-sm">
              {`System Status: ${status.operational ? 'Operational' : 'Down'}`}
            </p>
            <p className="font-mono text-sm">
              {`Message: ${status.message}`}
            </p>
            <p className="font-mono text-xs text-gray-400">
              {`Last Updated: ${status.lastUpdated.toLocaleString()}`}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;