import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) setTheme(localTheme);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          formRef.current.reset();
        },
        (err) => {
          console.error(err);
          setError(true);
          setSuccess(false);
        }
      );
  };

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const border = isDark ? 'border-gray-700' : 'border-gray-300';
  const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Contact Us</h1>
        <p className={`text-xl ${textMuted} max-w-3xl mx-auto`}>
          Have a question, suggestion, or need support? We’d love to hear from you!
          <br />
          Our team is here to help with any issues or feedback related to Fixi PDF.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Email Contact Method */}
        <div className="space-y-6">
          <motion.a
            whileHover={{ x: 5 }}
            href="mailto:support@fixipdf.com"
            className={`flex items-start gap-4 p-4 rounded-lg border ${border} ${cardBg} hover:border-cyan-400 transition-all`}
          >
            <div className="mt-1">
              <FaEnvelope className="text-2xl text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Support</h3>
              <p className={textMuted}>support@fixipdf.com</p>
              <p className={`text-sm mt-1 ${textMuted}`}>We aim to respond within 24 hours on business days.</p>
            </div>
          </motion.a>
        </div>

        {/* Right: Contact Form */}
        <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Send a Message</h2>
          <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={`block mb-1 ${textMuted}`}>Name</label>
                <input
                  type="text"
                  name="user_username"
                  required
                  className={`w-full px-4 py-2 rounded-md border ${border} focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block mb-1 ${textMuted}`}>Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className={`w-full px-4 py-2 rounded-md border ${border} focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={`block mb-1 ${textMuted}`}>Subject</label>
              <input
                type="text"
                name="user_subject"
                required
                className={`w-full px-4 py-2 rounded-md border ${border} focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className={`block mb-1 ${textMuted}`}>Message</label>
              <textarea
                name="user_message"
                rows="4"
                required
                className={`w-full px-4 py-2 rounded-md border ${border} focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                placeholder="Your message here..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-md transition-colors"
            >
              <FaPaperPlane />
              Send Message
            </motion.button>

            {success && <p className="mt-2 text-green-400">✅ Your message has been sent!</p>}
            {error && <p className="mt-2 text-red-400">❌ Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
