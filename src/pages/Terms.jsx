import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  FaGavel, FaCogs, FaCloudUploadAlt, FaBan, FaUserSecret,
  FaBalanceScale, FaRedo, FaQuestionCircle
} from 'react-icons/fa';

const TermsOfService = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme || 'light');
    window.scrollTo(0, 0);
  }, []);

  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const cardBg = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200';
  const accentText = 'text-cyan-400';
  const subText = isDark ? 'text-gray-400' : 'text-gray-600';

  const sectionWrapper = `rounded-xl p-6 shadow-sm ${cardBg}`;

  return (
    <div className={`min-h-screen ${bgMain}`}>
      <Helmet>
        <title>Terms of Service | Fixi PDF</title>
        <meta name="description" content="Read our Terms of Service detailing acceptable use and limitations for Fixi PDF tools." />
      </Helmet>

      {/* Header */}
      <header className="py-12 px-4 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
        <h1 className="text-4xl sm:text-5xl font-bold flex justify-center items-center gap-3 mb-2">
          <FaGavel /> Terms of Service
        </h1>
        <p className="text-sm opacity-90">Effective Date: 06/23/2025 | Last Updated: 06/23/2025</p>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-12">
        {/* 1. Acceptance */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaGavel /> Acceptance of Terms</h2>
          <p>
            By accessing or using Fixi PDF, you confirm that you have read, understood, and agreed to these Terms of Service.
            These apply to all visitors, users, and others who use the service.
          </p>
        </section>

        {/* 2. Use of Tools */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaCogs /> Use of Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may use Fixi PDF tools for personal, academic, or commercial purposes.</li>
            <li>Do not misuse tools, including uploading malicious content, reverse-engineering, or using bots/scripts.</li>
          </ul>
        </section>

        {/* 3. File Handling */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaCloudUploadAlt /> File Handling</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uploaded files are auto-deleted within 1 hour of processing.</li>
            <li>We do not store, view, or share uploaded content.</li>
            <li>You are responsible for the content you upload.</li>
          </ul>
        </section>

        {/* 4. Prohibited Content */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaBan /> Prohibited Content</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Illegal or copyrighted content without permission</li>
            <li>Harassment, defamation, or promotion of violence</li>
            <li>Viruses, malware, or harmful scripts</li>
          </ul>
        </section>

        {/* 5. Privacy */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaUserSecret /> Privacy</h2>
          <p>
            We value your privacy. Please refer to our <Link to="/privacy-policy" className="underline text-cyan-400">Privacy Policy</Link> to learn how your data is handled.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaBalanceScale /> Limitation of Liability</h2>
          <p>
            Fixi PDF is provided “as is” with no warranties. We do not guarantee error-free operation or uninterrupted access.
            We are not liable for any loss, damage, or issues resulting from your use of our services.
          </p>
        </section>

        {/* 7. Modifications */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaRedo /> Modifications</h2>
          <p>
            We may update or discontinue any part of the service at any time. Your continued use of the platform means
            acceptance of the latest Terms of Service.
          </p>
        </section>

        {/* 8. Contact */}
        <section className={sectionWrapper}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${accentText}`}><FaQuestionCircle /> Contact</h2>
          <p>
            For any questions about these Terms, contact us at:{' '}
            <a href="mailto:support@fixipdf.com" className="text-cyan-400 hover:underline">support@fixipdf.com</a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t pt-6 pb-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="text-cyan-400 hover:underline block mb-2">
          ← Back to Home
        </Link>
        <p>© {new Date().getFullYear()} Fixi PDF. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsOfService;
