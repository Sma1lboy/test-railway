import React from "react";
import { Link, useLocation } from "react-router-dom";

// Global Navigation Header Component
const Header: React.FC = () => {
  const location = useLocation();

  // Helper function to determine active navigation link styling
  const getNavLinkClass = (path: string): string => {
    const baseClass =
      "text-[#FFFFFF] text-[18px] font-sans hover:text-[#66FF66] transition-colors duration-300 px-3 py-2";
    
    // For the Blog section, mark active if the pathname starts with '/blog' (for lists and detail pages)
    if (path === "/blog" && location.pathname.startsWith("/blog")) {
      return `${baseClass} border-b-2 border-[#66FF66]`;
    }
    
    // Mark active if exact match for other routes
    return location.pathname === path ? `${baseClass} border-b-2 border-[#66FF66]` : baseClass;
  };

  return (
    <header className="bg-[#1E1E1E] shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Brand identity */}
        <div>
          <Link to="/" className="text-[32px] font-mono text-[#66FF66]">
            CyberSec Blog
          </Link>
        </div>
        {/* Navigation links */}
        <nav className="flex space-x-4">
          <Link to="/" className={getNavLinkClass("/")}>
            Home
          </Link>
          <Link to="/blog" className={getNavLinkClass("/blog")}>
            Blog
          </Link>
          <Link to="/about" className={getNavLinkClass("/about")}>
            About
          </Link>
          <Link to="/contact" className={getNavLinkClass("/contact")}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;