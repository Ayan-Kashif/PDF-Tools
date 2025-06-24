import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt, FaLock, FaUserSecret, FaCookie, FaCloud, FaEnvelopeOpenText, FaLockOpen
} from 'react-icons/fa';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const sectionBg = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div className={`privacy-policy-page min-h-screen ${bgMain}`}>
      <Helmet>
        <title>Privacy Policy | Fixi PDF</title>
        <meta name="description" content="Read our comprehensive privacy policy detailing how we collect, use, and protect your data." />
      </Helmet>

      {/* Hero Header */}
      <header className="py-12 px-4 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
        <h1 className="text-4xl sm:text-5xl font-bold flex justify-center items-center gap-3 mb-2">
          <FaShieldAlt className="text-white" /> Privacy Policy
        </h1>
        <p className="text-sm opacity-90">
          Effective Date: 06/23/2025 | Last Updated: 06/23/2025
        </p>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-12">
        {[
          {
            icon: <FaLock />,
            title: 'File Handling & Data Privacy',
            content: [
              'No File Storage: All files are auto-deleted from our servers within 1 hour after processing.',
              'No File Access: We do not view, access, or share your uploaded content.',
              'No Backups: Files are never stored in backup systems.',
            ]
          },
          {
            icon: <FaUserSecret />,
            title: 'Personal Information',
            content: [
              'We do not require account creation or personal data to use our tools.',
              'We may collect limited technical data such as:',
              '- Browser type and version',
              '- Device and OS details',
              '- Referrer URL',
              '- Date and time of access',
              'This is only used for performance monitoring and security.'
            ]
          },
          {
            icon: <FaCookie />,
            title: 'Cookies & Tracking',
            content: [
              'Fixi PDF may use cookies to:',
              '- Enhance site functionality',
              '- Analyze anonymized usage patterns',
              '- Remember tool preferences (non-identifiable)',
              'You can disable cookies in your browser at any time.'
            ]
          },
          {
            icon: <FaCloud />,
            title: 'Third-Party Services',
            content: [
              'We use trusted third-party services (like analytics and cloud storage) that comply with modern data protection standards. These providers do not access your files.'
            ]
          },
          {
            icon: <FaEnvelopeOpenText />,
            title: 'Contact & Communication',
            content: [
              'If you email us, we may retain your message to assist you better. We will never sell, rent, or share your email address.'
            ]
          },
          {
            icon: <FaLockOpen />,
            title: 'Security Measures',
            content: [
              'All data is encrypted via HTTPS during transit.',
              'Uploaded files are stored in secure, temporary environments.',
              'Files are automatically deleted within 1 hour of processing.'
            ]
          },
        ].map((section, index) => (
          <section
            key={index}
            className={`rounded-xl border p-6 shadow-sm ${sectionBg}`}
          >
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4 text-cyan-400">
              {section.icon} {section.title}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-base">
              {section.content.map((item, idx) => (
                <li key={idx} className="">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Changes Notice */}
        <section className={`rounded-xl border p-6 shadow-sm ${sectionBg}`}>
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Changes to This Policy</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            We may update this policy from time to time. Any changes will be reflected here, with the effective date clearly indicated.
          </p>
        </section>

        {/* Contact Section */}
        <section className={`rounded-xl border p-6 shadow-sm ${sectionBg}`}>
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Contact Us</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            If you have any questions or concerns about this Privacy Policy, feel free to contact us at:{' '}
            <a href="mailto:support@fixipdf.com" className="text-cyan-400 hover:underline">support@fixipdf.com</a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t pt-6 pb-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="text-cyan-500 hover:underline block mb-2">
          ← Back to Home
        </Link>
        <p>© {new Date().getFullYear()} Fixi PDF. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

