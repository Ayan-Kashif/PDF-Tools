
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';
import {

  FaArrowRight, FaTools, FaFilePdf, FaChartLine, FaHeadset,
  FaMobileAlt, FaShieldAlt, FaRocket
} from 'react-icons/fa';
import { motion } from 'framer-motion';


const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored && stored !== theme) setTheme(stored);
  }, []);

  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const bgGradient = isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-[#f9fafb]';
  const cardBg = isDark
    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 hover:border-cyan-400/30'
    : 'bg-white hover:bg-gray-100 border border-gray-200 hover:border-blue-400';
  const statsText = isDark ? 'text-cyan-400' : 'text-blue-500';
  const subtitle = isDark ? 'text-gray-300' : 'text-gray-700';
  const descText = isDark ? 'text-gray-400' : 'text-gray-600';

  const featuredTools = [
    { name: 'PDF Merger', icon: <FaFilePdf />, desc: 'Combine multiple PDFs into one document' ,id:'merge-pdf'},
    { name: 'PDF Splitter', icon: <FaFilePdf />, desc: 'Divide PDFs into separate files' ,id:'split-pdf'},
    { name: 'PDF to Word', icon: <FaFilePdf />, desc: 'Convert PDFs to editable Word docs',id:'pdf-to-word' },
    { name: 'Image Compressor', icon: <FaTools />, desc: 'Reduce image sizes without losing quality',id:'image-compressor' }
  ];

  const stats = [
    { value: '10M+', label: 'Documents Processed' },
    { value: '99.9%', label: 'Uptime Reliability' },
    { value: '50+', label: 'Tools Available' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className={`home-page ${bgMain}`}>
      {/* Hero Section */}
      <section className={`hero-section min-h-screen flex items-center ${bgGradient} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="hero-content space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Supercharge Your Documents
              </span>
            </h1>
            <h2 className={`text-2xl md:text-3xl ${subtitle}`}>
              Free & Powerful PDF Tools – Built for Everyone
            </h2>
            <p className={`text-lg ${descText} max-w-2xl`}>
              Fixi PDF offers a lightning-fast suite of online PDF tools to convert, compress,
              merge, split, and edit documents—all in your browser, no sign-up required.

            </p>
            <div className="hero-buttons flex flex-wrap gap-4">
              <Link
                to="/tools"
                className="btn-primary px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-2 transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Explore All Tools <FaArrowRight />
              </Link>
              <Link
                to="/how-it-works"
                className="btn-secondary px-8 py-4 rounded-lg font-medium text-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img className="w-full max-w-md" src="/hero.png" alt="Fixi PDF" />
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className={`${isDark ? 'bg-gray-800/50' : 'bg-blue-50'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Popular Tools
            </h2>
            <p className={`text-xl ${descText} max-w-3xl mx-auto`}>
              Our most frequently used tools to boost your productivity
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTools.map((tool, index) => (
              <div key={index} className={`${cardBg} rounded-xl p-6 transition-all shadow-sm hover:shadow-md`}>
                <div className="text-3xl text-cyan-400 mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className={descText}>{tool.desc}</p>

                <Link
                  onClick={navigate(`/tools/${tool.id}`)}
                  to={`/tools/${tool.id}`}
                  className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Try now <FaArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fixi PDF Section */}
      <section className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} relative overflow-hidden py-24`}>
        {/* Optional SVG Glow Background */}
{/*         <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[300px] h-[300px] bg-cyan-500 opacity-10 rounded-full blur-3xl top-0 -left-24 animate-pulse"></div>
          <div className="absolute w-[200px] h-[200px] bg-blue-500 opacity-10 rounded-full blur-2xl bottom-0 right-0 animate-pulse delay-200"></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              Why Fixi PDF?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-xl ${descText} max-w-3xl mx-auto`}
            >
              Your reliable, fast, and privacy-first partner for document tools
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <FaTools />, title: 'All Tools in One Place', desc: 'Merge, compress, convert, and protect PDFs—without switching tabs or tools.' },
              { icon: <FaShieldAlt />, title: 'Privacy & Simplicity First', desc: 'Files auto-delete within 1 hour. No accounts, no tracking, no nonsense.' },
              { icon: <FaChartLine />, title: 'Truly Free', desc: 'No hidden paywalls or locked features. Everything is accessible to everyone.' },
              { icon: <FaMobileAlt />, title: 'Mobile-Friendly', desc: 'Use on phones, tablets, or desktops — it works anywhere, anytime.' },
              { icon: <FaRocket />, title: 'Instant Results', desc: 'Lightning-fast performance with no software downloads or installs.' },
              { icon: <FaHeadset />, title: 'Trusted by All', desc: 'Used by students, freelancers, businesses, and more across the world.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300 
          ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-cyan-400' : 'bg-white border-gray-200 hover:border-blue-400'}`}
              >
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3 text-cyan-400">
                  {item.icon} <span className="text-white dark:text-white text-gray-900">{item.title}</span>
                </h3>
                <p className={descText}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${bgGradient} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className={`text-5xl font-bold ${statsText} mb-2`}>{stat.value}</div>
                <div className={`text-xl ${descText}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isDark ? 'bg-gray-800/50' : 'bg-blue-100'} py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to supercharge your workflow?
          </h2>
          <p className={`text-xl ${descText} mb-8 max-w-3xl mx-auto`}>
            Join thousands of professionals who trust our tools for their document needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/tools"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-lg text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-gray-600 text-gray-600 rounded-lg font-medium text-lg hover:bg-gray-700/50 transition-all hover:text-white flex items-center gap-2"
            >
              <FaHeadset /> Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

