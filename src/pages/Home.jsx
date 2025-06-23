import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight, FaTools, FaFilePdf, FaChartLine, FaHeadset
} from 'react-icons/fa';

const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored && stored !== theme) setTheme(stored);
  }, []);

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const bgGradient = isDark
    ? 'bg-gradient-to-br from-gray-900 to-gray-800'
    : 'bg-[#f9fafb]'

  const cardBg = isDark
    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 hover:border-cyan-400/30'
    : 'bg-white hover:bg-gray-100 border border-gray-200 hover:border-blue-400';

  const statsText = isDark ? 'text-cyan-400' : 'text-blue-500';
  const subtitle = isDark ? 'text-gray-300' : 'text-gray-700';
  const descText = isDark ? 'text-gray-400' : 'text-gray-600';

  const featuredTools = [
    { name: 'PDF Merger', icon: <FaFilePdf />, desc: 'Combine multiple PDFs into one document' },
    { name: 'PDF Splitter', icon: <FaFilePdf />, desc: 'Divide PDFs into separate files' },
    { name: 'PDF to Word', icon: <FaFilePdf />, desc: 'Convert PDFs to editable Word docs' },
    { name: 'Image Compressor', icon: <FaTools />, desc: 'Reduce image sizes without losing quality' }
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
      <section className={`hero-section min-h-screen flex items-center ${bgGradient} py-20 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="hero-content space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Transform Your Documents
              </span>
            </h1>
            <h2 className={`text-2xl md:text-3xl ${subtitle}`}>
              Powerful PDF & Utility Tools for Professionals
            </h2>
            <p className={`text-lg ${descText} max-w-2xl`}>
              Streamline your workflow with our comprehensive suite of free online tools to merge, split, compress,
              and convert documents. Plus dozens of utilities to supercharge your productivity.
            </p>
            <div className="hero-buttons flex flex-wrap gap-4">
              <Link
                to="/tools"
                className="btn-primary px-8 py-4 hover:text-white  rounded-lg font-medium text-lg flex items-center gap-2 transition-all hover:gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Explore All Tools <FaArrowRight />
              </Link>
              <Link
                to="/about"
                className="btn-secondary px-8 py-4 rounded-lg font-medium text-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
          {/* <div className="hero-image relative">
            <div className={`relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden border ${isDark ? 'border-cyan-400/20' : 'border-blue-300'}`}>
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl"></div>

              {[1, 2, 3, 4].map(i => (
                <div key={i}
                  className={`absolute ${i % 2 ? 'top-1/4' : 'top-3/4'} ${i % 3 ? 'left-1/4' : 'left-3/4'} w-16 h-16 rounded-full border ${isDark ? 'bg-cyan-400/5 border-cyan-400/20' : 'bg-blue-300/20 border-blue-300'} flex items-center justify-center text-cyan-400 text-xl`}
                  style={{
                    animation: `float${i} 8s ease-in-out infinite`
                  }}
                >
                  <FaTools />
                </div>
              ))}
            </div>
          </div> */}
          
            <div className="hero-image  ">
              <img className='' src="/hero.png" alt="" />
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
              <div
                key={index}
                className={`${cardBg} rounded-xl p-6 transition-all shadow-sm hover:shadow-md`}
              >
                <div className="text-3xl text-cyan-400 mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className={descText}>{tool.desc}</p>
                <Link
                  to="/tools"
                  className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Try now <FaArrowRight className="ml-2" />
                </Link>
              </div>
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
