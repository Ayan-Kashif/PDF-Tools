import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaCode, FaUsers } from 'react-icons/fa';

export default function About() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== theme) setTheme(storedTheme);
  }, []);

  const isDark = theme === 'dark';

  const bgCard = isDark ? 'bg-gray-800 border-gray-700 hover:border-cyan-400' : 'bg-white border-gray-300 hover:border-cyan-500';
  const textPrimary = isDark ? 'text-gray-300' : 'text-gray-700';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const bgContainer = isDark ? 'bg-gray-900' : 'bg-gray-100';

  const features = [
    {
      icon: <FaLightbulb className="text-3xl text-cyan-400" />,
      title: "Innovative Solutions",
      description: "Cutting-edge PDF tools powered by modern web technologies."
    },
    {
      icon: <FaCode className="text-3xl text-cyan-400" />,
      title: "Modern Tech Stack",
      description: "Built with React, Vite, and PDF-lib for maximum performance."
    },
    {
      icon: <FaUsers className="text-3xl text-cyan-400" />,
      title: "User-Focused",
      description: "Designed with simplicity and efficiency in mind for all users."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`max-w-6xl mx-auto px-4 py-12 transition-all ${bgContainer}`}
    >
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">About PDF Tools Hub</h1>
        <p className={`text-xl max-w-3xl mx-auto ${textPrimary}`}>
          Revolutionizing document management with powerful, browser-based tools that work anywhere, anytime.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className={`rounded-xl p-6 border transition-all shadow-sm ${bgCard}`}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{feature.title}</h3>
            <p className={`${textSecondary}`}>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Our Story Section */}
      <div className={`rounded-xl p-8 border transition-all ${bgCard}`}>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Story</h2>
        <div className={`space-y-4 ${textPrimary}`}>
          <p>
            PDF Tools Hub was born from the frustration of dealing with bloated desktop applications and
            unreliable online tools. We set out to create a better solution — fast, secure, and accessible
            directly in your browser.
          </p>
          <p>
            Our team of developers and designers work tirelessly to deliver tools that professionals and
            casual users alike can depend on for their document needs.
          </p>
          <p>
            All processing happens in your browser, meaning your files never leave your device. We believe
            in privacy-first solutions that don't compromise on power or features.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
