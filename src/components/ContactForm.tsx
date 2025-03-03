import React, { useState, useEffect, FormEvent } from 'react';

const ContactForm: React.FC = () => {
  // State variables for form fields and feedback messages
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);

  // Trigger slide-in animation after component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle contact form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Message: message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.success.message) {
        setSuccessMsg(data.success.message);
        // Clear the form fields after successful submission
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form: ', error);
      setErrorMsg('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto bg-[#1E1E1E] text-[#FFFFFF] p-6 rounded-lg shadow-md mt-10 transform transition-all duration-500 ${
        animate ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
      }`}
    >
      <h2 className="text-3xl font-mono mb-4" style={{ fontSize: '32px' }}>Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-700 rounded focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-[#66FF66]"
          />
        </div>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-700 rounded focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-[#66FF66]"
          />
        </div>
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
            className="w-full p-3 h-32 border border-gray-700 rounded focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-[#66FF66]"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-[#66FF66] text-white rounded hover:bg-green-500 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {/* Success Message: Terminal-like Confirmation */}
      {successMsg && (
        <div className="mt-4 font-mono text-[#66FF66] bg-[#1E1E1E] p-3 rounded shadow">
          {`echo: ${successMsg}`}
        </div>
      )}
      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 font-mono text-red-500 bg-[#1E1E1E] p-3 rounded shadow">
          {`echo: ${errorMsg}`}
        </div>
      )}
    </div>
  );
};

export default ContactForm;