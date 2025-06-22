import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  FaGavel, FaExclamationTriangle, FaUserShield,
  FaBook, FaBalanceScale, FaQuestionCircle
} from 'react-icons/fa';

const TermsOfService = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme || 'light');
  }, []);

  const isDark = theme === 'dark';

  const bgBase = isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800';
  const bgCard = isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800';
  const textAccent = isDark ? 'text-indigo-400' : 'text-indigo-600';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const redBg = isDark ? 'bg-gray-700' : 'bg-red-50';
  const textSubtle = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgBase}`}>
      <Helmet>
        <title>Terms of Service | YourSiteName</title>
        <meta name="description" content="Review our Terms of Service governing your use of our platform and services." />
      </Helmet>

      {/* Header */}
      <header className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <FaGavel className="text-3xl" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
              <p className="opacity-90 font-light">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Introduction */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <p className="text-lg">
            Welcome to PDF Tools ! These Terms of Service ("Terms") govern your access to and use of our website, services, and tools.
          </p>
          <p className="mt-4">
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaUserShield className={`text-xl ${textAccent}`} />
            <h2 className="text-2xl font-semibold">User Responsibilities</h2>
          </div>
          <ul className="space-y-3 pl-2">
            {[
              'You must be at least 13 years old to use our services',
              'You are responsible for maintaining the confidentiality of your account',
              'You agree not to use the service for any illegal or unauthorized purpose',
              'You must not transmit any worms, viruses or any code of a destructive nature'
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className={`${textAccent} font-bold`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaBook className={`text-xl ${textAccent}`} />
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          </div>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of YourSiteName and its licensors.
            Our trademarks and trade dress may not be used without prior written consent.
          </p>
        </section>

        {/* Prohibited Uses */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaExclamationTriangle className={`text-xl ${textAccent}`} />
            <h2 className="text-2xl font-semibold">Prohibited Uses</h2>
          </div>
          <p className="mb-3">You may not use the service to:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Violate laws or regulations',
              'Harm or exploit minors',
              'Transmit spam or malware',
              'Impersonate others',
              'Interfere with security features',
              'Reverse engineer our services'
            ].map((text, i) => (
              <li key={i} className={`flex gap-2 p-3 rounded ${redBg}`}>
                <span className="text-red-500 font-bold">✗</span>
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* Termination */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaBalanceScale className={`text-xl ${textAccent}`} />
            <h2 className="text-2xl font-semibold">Termination</h2>
          </div>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            In no event shall YourSiteName, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
            for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will provide notice of significant changes through our
            website or email. Your continued use constitutes acceptance of the new terms.
          </p>
        </section>

        {/* Contact Us */}
        <section className={`rounded-lg shadow-sm p-6 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className={`text-xl ${textAccent}`} />
            <h2 className="text-2xl font-semibold">Contact Us</h2>
          </div>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            <a href="mailto:legal@yoursite.com" className={`${textAccent} hover:underline`}>
              legal@pdftools.com
            </a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 mt-8 ${borderColor}`}>
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className={`inline-flex items-center ${textAccent} hover:underline mb-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <p className={`${textSubtle} text-sm`}>
            © {new Date().getFullYear()} YourSiteName. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
