import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUpload, FaMagic, FaDownload, FaCheckCircle
} from 'react-icons/fa';

const HowItWorks = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored && stored !== theme) setTheme(stored);
  }, []);

  const isDark = theme === 'dark';
  const bgMain = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const descText = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark
    ? 'bg-gray-800/50 border border-gray-700 hover:border-cyan-400/50'
    : 'bg-white border border-gray-200 hover:border-blue-400';

  const steps = [
    {
      icon: <FaUpload />,
      title: '1. Upload Your File',
      desc: 'Drag and drop your document or select from your device. We support PDFs, images, and more.'
    },
    {
      icon: <FaMagic />,
      title: '2. Apply Tool Instantly',
      desc: 'Choose from over 50+ tools like Merge, Split, Convert, or Compress — no signup needed.'
    },
    {
      icon: <FaDownload />,
      title: '3. Download Your Result',
      desc: 'Within seconds, your file is ready to download. All files auto-delete within 1 hour.'
    },
    {
      icon: <FaCheckCircle />,
      title: '4. Done. That Easy!',
      desc: 'Enjoy blazing-fast results. Use again anytime, from any device.'
    }
  ];

  return (
    <main className={`how-it-works ${bgMain} min-h-screen py-24 px-4 sm:px-6 lg:px-16`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          How It Works
        </h1>
        <p className={`mt-4 text-xl max-w-2xl mx-auto ${descText}`}>
          Fixi PDF makes document processing effortless. Just follow these simple steps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`${cardBg} rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center`}
          >
            <div className="text-4xl mb-4 text-cyan-400">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className={descText}>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative SVG glow */}
      <div className="relative mt-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute inset-0 mx-auto w-[300px] h-[300px] bg-cyan-500 blur-3xl rounded-full pointer-events-none z-0"
        />
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            No Installs. No Signup. 100% Free.
          </h2>
          <p className={`text-lg ${descText}`}>
            Fixi PDF is built for speed, simplicity, and your privacy. Just pick a tool and go.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
