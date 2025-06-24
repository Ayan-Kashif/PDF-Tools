import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTools, FaRocket, FaMobileAlt, FaCheckCircle, FaUserGraduate, FaBriefcase, FaUserTie, FaShieldAlt
} from 'react-icons/fa';

export default function About() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== theme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDark = theme === 'dark';

  const bgCard = isDark ? 'bg-gray-800 border-gray-700 hover:border-cyan-400' : 'bg-white border-gray-300 hover:border-cyan-500';
  const textPrimary = isDark ? 'text-gray-300' : 'text-gray-700';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const bgContainer = isDark ? 'bg-gray-900' : 'bg-gray-100';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`max-w-6xl mx-auto px-4 py-12 transition-all ${bgContainer}`}
    >
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">About Fixi PDF</h1>
        <p className={`text-xl max-w-3xl mx-auto ${textPrimary}`}>
          Your Reliable Partner for Fast, Free & Secure PDF Tools
        </p>
      </div>

      {/* Mission / Privacy / Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <motion.div whileHover={{ y: -6 }} className={`rounded-xl p-6 border transition-all shadow-sm ${bgCard}`}>
          <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>Our Mission</h3>
          <p className={textSecondary}>
            To empower individuals and professionals around the world with easy-to-use, fast, and secure PDF solutions — available anytime, anywhere.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className={`rounded-xl p-6 border transition-all shadow-sm ${bgCard}`}>
          <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>Privacy & Simplicity First</h3>
          <p className={textSecondary}>
            All files processed through Fixi PDF are automatically deleted within one hour. No sign-ups, no storage, no ads — just speed and security.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -6 }} className={`rounded-xl p-6 border transition-all shadow-sm ${bgCard}`}>
          <h3 className={`text-xl font-semibold mb-4 ${textPrimary}`}>What Makes Us Different</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaTools className="text-cyan-400 mt-1" />
              <span className={textSecondary}>All Tools in One Place</span>
            </li>
            <li className="flex items-start gap-3">
              <FaRocket className="text-cyan-400 mt-1" />
              <span className={textSecondary}>Instant Results</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMobileAlt className="text-cyan-400 mt-1" />
              <span className={textSecondary}>Mobile-Friendly</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-cyan-400 mt-1" />
              <span className={textSecondary}>Truly Free</span>
            </li>
          </ul>
        </motion.div>

      </div>

      {/* Who We Serve */}
      <div className={`rounded-xl p-8 border transition-all mb-16 ${bgCard}`}>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Who We Serve</h2>
        <ul className={`space-y-4 ${textSecondary}`}>
          <li><FaUserGraduate className="inline mr-2 text-cyan-400" /> Students needing quick conversions for assignments</li>
          <li><FaBriefcase className="inline mr-2 text-cyan-400" /> Professionals handling large reports and client documents</li>
          <li><FaUserTie className="inline mr-2 text-cyan-400" /> Freelancers and small businesses managing contracts and forms</li>
          <li><FaShieldAlt className="inline mr-2 text-cyan-400" /> Anyone who values speed, simplicity, and privacy in document work</li>
        </ul>
      </div>

      {/* Vision Section */}
      <div className={`rounded-xl p-8 border transition-all ${bgCard}`}>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">The Fixi PDF Vision</h2>
        <p className={textPrimary}>
          We’re on a mission to become the go-to platform for smart document tools,
          constantly improving our features and adding new tools based on real user needs.
        </p>
        <p className={`${textSecondary} mt-4 italic`}>
          Fix your files with Fixi PDF – simple, smart, and secure.
        </p>
      </div>
    </motion.div>
  );
}

