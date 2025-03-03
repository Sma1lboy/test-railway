import React from 'react';

interface SocialLink {
  name: string;
  href: string;
  icon: JSX.Element;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.173-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.927 0 .386.045.762.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.191 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.631 1.953 2.445 3.377 4.6 3.418-1.68 1.318-3.808 2.104-6.102 2.104-.395 0-.779-.023-1.158-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.055 0 14.01-7.5 14.01-14.005 0-.213 0-.425-.016-.635.961-.695 1.8-1.562 2.46-2.549l-.047-.02z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.64 1.34 2.98 2.98 2.98 1.64 0 2.98-1.34 2.98-2.98C7.96 4.84 6.62 3.5 4.98 3.5zM2.4 8.9h5.12v14.6H2.4V8.9zm7.68 0h4.92v2.06h.07c.68-1.28 2.34-2.62 4.82-2.62 5.16 0 6.12 3.4 6.12 7.82v8.64H20.8v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.02v7.77h-5.12V8.9z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37 0 0 5.373 0 12.003c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.536-1.527.117-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.295-1.552 3.297-1.23 3.297-1.23.654 1.65.24 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.622-5.475 5.92.432.372.817 1.102.817 2.222 0 1.606-.015 2.903-.015 3.293 0 .321.216.694.825.576C20.565 21.8 24 17.303 24 12.003 24 5.373 18.627 0 12 0z" />
      </svg>
    )
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-[#FFFFFF] py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="transition transform duration-300 hover:scale-110 hover:text-[#66FF66]"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="text-lg font-sans text-center">
          © {currentYear} Cybersecurity Aesthetic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;