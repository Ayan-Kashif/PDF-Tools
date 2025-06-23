import React,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaUserCog, FaDatabase, FaCookie } from 'react-icons/fa';

const PrivacyPolicy = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page">
      <Helmet>
        <title>Privacy Policy | FIXI PDF</title>
        <meta name="description" content="Read our comprehensive privacy policy detailing how we collect, use, and protect your data." />
      </Helmet>

      <header className="privacy-header">
        <div className="container">
          <h1 className="privacy-title text-cyan-400">
            <FaShieldAlt className="shield-icon" /> Privacy Policy
          </h1>
          <p className="privacy-subtitle">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <main className="privacy-content container">
        <section className="privacy-section">
          <div className="section-header">
            <FaLock className="section-icon" />
            <h2>Data Protection Commitment</h2>
          </div>
          <p>At FIXI PDF, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data when you use our services.</p>
        </section>

        <section className="privacy-section">
          <div className="section-header">
            <FaUserCog className="section-icon" />
            <h2>Information We Collect</h2>
          </div>
          <p>We may collect the following types of information:</p>
          <ul className="privacy-list">
            <li><strong>Personal Information:</strong> Name, email address, contact details when you register or contact us</li>
            <li><strong>Usage Data:</strong> How you interact with our website and services</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
          </ul>
        </section>

        <section className="privacy-section">
          <div className="section-header">
            <FaDatabase className="section-icon" />
            <h2>How We Use Your Information</h2>
          </div>
          <p>Your information helps us to:</p>
          <ul className="privacy-list">
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure the security of our platform</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="privacy-section">
          <div className="section-header">
            <FaCookie className="section-icon" />
            <h2>Cookies and Tracking</h2>
          </div>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="privacy-list">
            <li>Remember your preferences</li>
            <li>Analyze site traffic</li>
            <li>Personalize content</li>
          </ul>
          <p>You can control cookies through your browser settings.</p>
        </section>

        <section className="privacy-section">
          <h2>Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="privacy-list">
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in anonymized, aggregated form</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="privacy-list">
            <li>Access, update, or delete your personal information</li>
            <li>Object to or restrict certain data processing</li>
            <li>Receive your data in a portable format</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>We may update this policy periodically. We will notify you of significant changes through our website or email.</p>
        </section>

        <section className="privacy-section contact-section">
          <h2>Contact Us</h2>
          <p>If you have questions about this policy or your data:</p>
          <p>Email: <a href="/">privacy@fixipdf.com</a></p>
        </section>
      </main>

      <footer className="privacy-footer">
        <div className="container">
          <Link to="/" className="back-home">← Back to Home</Link>
          <p className="copyright">© {new Date().getFullYear()} FIXI PDF. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
