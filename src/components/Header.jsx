import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


import { FaBrain, FaBars, FaTimes, FaMoon, FaSun, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaImage, FaLock, FaUnlock, FaCompressAlt, FaFileAlt, FaPalette, FaRulerCombined, FaWeight, FaBirthdayCake, FaCode, FaEdit, FaWater, FaSyncAlt, FaFileArchive, FaKey } from 'react-icons/fa';

const allTools = [
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Divide a PDF ', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size', icon: <FaCompressAlt />, category: 'pdf' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to Word', icon: <FaFileWord />, category: 'pdf' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word to PDF', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', description: 'Convert PDF to PowerPoint', icon: <FaFilePowerpoint />, category: 'pdf' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', description: 'Convert PowerPoint to PDF', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables to Excel', icon: <FaFileExcel />, category: 'pdf' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel to PDF', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF to images', icon: <FaImage />, category: 'pdf' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF', icon: <FaFilePdf />, category: 'pdf' },
  { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder or delete pages', icon: <FaFileAlt />, category: 'pdf' },
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Edit content of PDF', icon: <FaEdit />, category: 'pdf' },
  { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages', icon: <FaSyncAlt />, category: 'pdf' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove PDF password', icon: <FaUnlock />, category: 'pdf' },
  { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password to PDF', icon: <FaLock />, category: 'pdf' },
  { id: 'add-watermark', name: 'Add Watermark', description: 'Add watermark to PDF', icon: <FaWater />, category: 'pdf' },

  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image size', icon: <FaImage />, category: 'utility' },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', icon: <FaKey />, category: 'utility' },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words and characters', icon: <FaFileAlt />, category: 'utility' },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from birthdate', icon: <FaBirthdayCake />, category: 'utility' },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate body mass index', icon: <FaWeight />, category: 'utility' },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick and copy color codes', icon: <FaPalette />, category: 'utility' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units', icon: <FaRulerCombined />, category: 'utility' },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format JSON data', icon: <FaCode />, category: 'utility' },
];
const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const panelRef = useRef(null);


  const renderToolSection = (title, toolIds) => (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{title}</h3>
      <div className="space-y-4">
        {toolIds.map(id => {
          const tool = allTools.find(t => t.id === id);
          return tool && (
            <Link
              to={`/tools/${tool.id}`}
              key={tool.id}
              className="flex items-start gap-3 hover:text-cyan-400 transition"
            >
              {/* Icon slightly lowered for visual alignment */}
              <div className="text-2xl mt-1">{tool.icon}</div>

              {/* Content aligned to start at the top next to icon */}
              <div className="text-start">
                <h4 className="font-medium text-sm leading-tight">{tool.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{tool.description}</p>
              </div>
            </Link>

          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setToolsDropdownOpen(false); // Close panel
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    window.location.reload();
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${theme === 'dark'
      ? 'bg-[#0f172a]/70 backdrop-blur-md border-b border-gray-800 shadow-lg'
      : 'bg-white/70 backdrop-blur-md border-b border-gray-200 text-gray-700 shadow-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sm:hidden text-xl text-primary">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" className='w-[160px]' alt="" />
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-6 relative">
            <Link to="/" className="nav-link hover:text-purple-500 transition font-medium">Home</Link>

            {/* Tools Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="nav-link hover:text-purple-500 transition font-medium flex items-center space-x-1"
              >
                <span>Tools</span>
                <FaBars className="text-sm mt-1" />
              </button>

              {/* Tools Dropdown Panel */}
              <div
                ref={panelRef}
                className={`
        absolute top-full left-[-300px]  transform -translate-x-1/2
        w-[1000px] mt-4 px-6 py-5 z-50 rounded-xl border
        transition-all duration-300 ease-in-out shadow-lg
        ${theme === 'dark' ? 'bg-[#0f172a] text-white border-gray-700' : 'bg-white text-black border-gray-200'}
        ${toolsDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
                style={{ maxHeight: 'calc(100vh - 100px)', overflow: 'hidden' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {/* Section 1: Convert PDF */}
                  {renderToolSection('Convert PDF', [
                    'pdf-to-word', 'word-to-pdf', 'pdf-to-ppt', 'ppt-to-pdf',
                    'pdf-to-excel', 'excel-to-pdf', 'pdf-to-jpg', 'jpg-to-pdf'
                  ])}

                  {/* Section 2: Edit & Organize */}
                  {renderToolSection('Edit & Organize', [
                    'merge-pdf', 'split-pdf', 'organize-pdf', 'edit-pdf', 'rotate-pdf', 'add-watermark'
                  ])}

                  {/* Section 3: Secure PDF */}
                  {renderToolSection('Secure PDF', [
                    'compress-pdf', 'unlock-pdf', 'protect-pdf'
                  ])}

                  {/* Section 4: Utility Tools */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Utility Tools</h3>
                    <div className="space-y-4">
                      {allTools.filter(t => t.category === 'utility').map(tool => (
                        <Link
                          to={`/tools/${tool.id}`}
                          key={tool.id}
                          className="flex items-start gap-3 hover:text-cyan-400 transition"
                        >
                          <div className="text-2xl mt-1">{tool.icon}</div>
                          <div className="space-y-0.5">
                            <h4 className="font-medium text-sm leading-tight">{tool.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{tool.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <Link to="/about" className="nav-link hover:text-purple-500 transition font-medium">About</Link>
            <Link to="/contact" className="nav-link hover:text-purple-500 transition font-medium">Contact</Link>

            <button onClick={toggleTheme} className="ml-2 text-xl p-2 hover:rotate-180 rounded-full hover:scale-110 transition-all duration-300" title="Toggle Theme">
              {theme === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-800" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
