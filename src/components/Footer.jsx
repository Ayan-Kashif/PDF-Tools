  import React, { useEffect, useState } from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    }
  }, []);

  const isDark = theme === 'dark';

  const bgColor = isDark ? 'bg-gray-900' : 'bg-[#f9fafb]';
  const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const linkColor = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-300';
  const brandText = isDark ? 'text-white' : 'text-gray-900';

  return (
    <footer className={`${bgColor} ${textColor} py-20 px-4 mt-16 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 space-y-8 md:space-y-0">

          {/* Column 1 - Brand Info */}
          <div className="text-center md:text-left space-y-4">
            <h3 className={`text-2xl font-bold ${brandText}`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                FIXI PDF – Multi Tool Hub
              </span>
            </h3>
            <p className={`${textColor} max-w-xs mx-auto md:mx-0`}>
              Your all-in-one solution for PDF conversion, editing, and utility tools.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-semibold ${brandText}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className={`${linkColor} transition-colors duration-200`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`${linkColor} transition-colors duration-200`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${linkColor} transition-colors duration-200`}>
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://fixipdf.blog.com" className={`${linkColor} transition-colors duration-200`}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social Media */}
          <div className="text-center md:text-left">
            <h4 className={`text-lg font-semibold mb-2 ${brandText}`}>Connect With Us</h4>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <a href="https://x.com/FixiPdf" className={`${linkColor} text-xl`} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/fixipdf/" className={`${linkColor} text-xl`} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/fixipdf/" className={`${linkColor} text-xl`} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className={`border-t ${borderColor} pt-8 text-center`}>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FIXI PDF. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


