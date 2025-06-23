// // import React, { useState } from 'react';
// // import ToolCard from '../components/ToolCard';
// // import ToolModal from '../components/ToolModal';

// // const Tools = () => {
// //   const [selectedTool, setSelectedTool] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   const allTools = [
// //     // PDF Tools
// //     { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one document', icon: '🔄', category: 'pdf' },
// //     { id: 'split-pdf', name: 'Split PDF', description: 'Divide a PDF into multiple documents', icon: '✂️', category: 'pdf' },
// //     { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality', icon: '🗜️', category: 'pdf' },
// //     { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents', icon: '📝', category: 'pdf' },
// //     { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF format', icon: '📄', category: 'pdf' },
// //     { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF files to editable presentations', icon: '📊', category: 'pdf' },
// //     { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert presentations to PDF format', icon: '🖥️', category: 'pdf' },
// //     { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel spreadsheets', icon: '📈', category: 'pdf' },
// //     { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF format', icon: '🧮', category: 'pdf' },
// //     { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to image files', icon: '🖼️', category: 'pdf' },
// //     { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Combine images into a PDF document', icon: '📑', category: 'pdf' },
// //     { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder, rotate, or delete PDF pages', icon: '🗂️', category: 'pdf' },
// //     { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, images, or shapes to PDFs', icon: '✏️', category: 'pdf' },
// //     { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages to correct orientation', icon: '🔄', category: 'pdf' },
// //     { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs', icon: '🔓', category: 'pdf' },
// //     { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection to PDFs', icon: '🔒', category: 'pdf' },
// //     { id: 'organize-pdf', name: 'Add Page Numbers', description: 'Insert page numbers to PDF documents', icon: '🔢', category: 'pdf' },
// //     { id: 'add-watermark', name: 'Add Watermark', description: 'Add text or image watermarks to PDFs', icon: '💧', category: 'pdf' },

// //     // Utility Tools
// //     { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', icon: '🖼️', category: 'utility' },
// //     { id: 'image-converter', name: 'Image Converter', description: 'Convert between image formats', icon: '🔄', category: 'utility' },
// //     { id: 'audio-converter', name: 'Audio Converter', description: 'Convert between audio formats', icon: '🎵', category: 'utility' },
// //     { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', icon: '🎥', category: 'utility' },
// //     { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes from text or URLs', icon: '📱', category: 'utility' },
// //     { id: 'password-generator', name: 'Password Generator', description: 'Create strong, random passwords', icon: '🔑', category: 'utility' },
// //     { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences', icon: '📝', category: 'utility' },
// //     { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from birth date', icon: '🎂', category: 'utility' },
// //     { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', icon: '⚖️', category: 'utility' },
// //     { id: 'color-picker', name: 'Color Picker', description: 'Select and copy color values', icon: '🎨', category: 'utility' },
// //     { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between measurement units', icon: '📏', category: 'utility' },
// //     { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON data', icon: '{}', category: 'utility' },
// //     { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to spoken audio', icon: '🔊', category: 'utility' },
// //     { id: 'speech-to-text', name: 'Speech to Text', description: 'Transcribe audio to text', icon: '🎤', category: 'utility' },
// //     { id: 'timer', name: 'Timer/Stopwatch', description: 'Countdown timer and stopwatch', icon: '⏱️', category: 'utility' }
// //   ];

// //   const handleToolClick = (tool) => {
// //     setSelectedTool(tool);
// //     console.log(tool.id)
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     setSelectedTool(null);
// //   };

// //   return (
// //     <div style={{ 
// //       padding: '2rem',
// //       maxWidth: '1200px',
// //       margin: '0 auto'
// //     }}>
// //       <h1 style={{ 
// //         color: 'white',
// //         marginBottom: '2rem'
// //       }}>
// //         All Tools
// //       </h1>

// //       <div style={{ 
// //         display: 'grid',
// //         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
// //         gap: '1.5rem'
// //       }}>
// //         {allTools.map(tool => (
// //           <ToolCard 
// //             key={tool.id}
// //             tool={tool}
// //             onClick={() => handleToolClick(tool)}
// //           />
// //         ))}
// //       </div>

// //       {showModal && selectedTool && (
// //         <ToolModal 
// //           tool={selectedTool}
// //           onClose={handleCloseModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Tools;
// import React, { useEffect, useState } from 'react';
// import ToolCard from '../components/ToolCard';
// import ToolModal from '../components/ToolModal';
// import { useNavigate } from 'react-router-dom'; // NEW
// const Tools = () => {
//   const [selectedTool, setSelectedTool] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [theme, setTheme] = useState('light');
//      const navigate = useNavigate(); // NE
//   useEffect(() => {

//     const storedTheme = localStorage.getItem('theme');
//     setTheme(storedTheme === 'dark' ? 'dark' : 'light');
//   }, []);

//   const allTools = [
//     // PDF Tools
//     { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one document', icon: '🔗', category: 'pdf' },
//     { id: 'split-pdf', name: 'Split PDF', description: 'Divide a PDF into multiple documents', icon: '✂️', category: 'pdf' },
//     { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality', icon: '🗜️', category: 'pdf' },
//     { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents', icon: '📝', category: 'pdf' },
//     { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF format', icon: '📄', category: 'pdf' },
//     { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF to presentation slides', icon: '📊', category: 'pdf' },
//     { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert slides to PDF format', icon: '🖥️', category: 'pdf' },
//     { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel spreadsheets', icon: '📈', category: 'pdf' },
//     { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF format', icon: '🧮', category: 'pdf' },
//     { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to image files', icon: '🖼️', category: 'pdf' },
//     { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF document', icon: '📑', category: 'pdf' },
//     { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder, rotate, or delete PDF pages', icon: '🗂️', category: 'pdf' },
//     { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, images, or shapes to PDFs', icon: '✏️', category: 'pdf' },
//     { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages to correct orientation', icon: '🔃', category: 'pdf' },
//     { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs', icon: '🔓', category: 'pdf' },
//     { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection to PDFs', icon: '🔒', category: 'pdf' },
//     { id: 'add-watermark', name: 'Add Watermark', description: 'Add watermark to PDFs', icon: '💧', category: 'pdf' },
//     // { id: 'add-numbers', name: 'Add Page Numbers', description: 'Add page numbers to PDFs', icon: '🔢', category: 'pdf' },

//     // Utility Tools
//     { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', icon: '🖼️', category: 'utility' },
//     // { id: 'image-converter', name: 'Image Converter', description: 'Convert between image formats', icon: '🔄', category: 'utility' },
//     // { id: 'audio-converter', name: 'Audio Converter', description: 'Convert between audio formats', icon: '🎵', category: 'utility' },
//     // { id: 'video-compressor', name: 'Video Compressor', description: 'Reduce video file size', icon: '🎥', category: 'utility' },
//     // { id: 'qr-generator', name: 'QR Code Generator', description: 'Create QR codes from text or URLs', icon: '📱', category: 'utility' },
//     { id: 'password-generator', name: 'Password Generator', description: 'Create secure passwords', icon: '🔑', category: 'utility' },
//     { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences', icon: '📝', category: 'utility' },
//     { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from birth date', icon: '🎂', category: 'utility' },
//     { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', icon: '⚖️', category: 'utility' },
//     { id: 'color-picker', name: 'Color Picker', description: 'Select and copy color values', icon: '🎨', category: 'utility' },
//     { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units', icon: '📏', category: 'utility' },
//     { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', icon: '{}', category: 'utility' },
//     // { id: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to spoken audio', icon: '🔊', category: 'utility' },
//     // { id: 'speech-to-text', name: 'Speech to Text', description: 'Convert audio to text', icon: '🎤', category: 'utility' },
//     // { id: 'timer', name: 'Timer / Stopwatch', description: 'Countdown timer and stopwatch', icon: '⏱️', category: 'utility' },
//   ];

//   const handleToolClick = (tool) => {
//     setSelectedTool(tool);
//     navigate(`/tools/${tool.id}`)
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedTool(null);
//   };

//   const renderSection = (category, title) => (
//     <section className="mb-12">
//       <h2 className={`text-3xl font-bold mb-6 border-b pb-2 ${theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-800 border-gray-300'
//         }`}>
//         {title}
//       </h2>
//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {allTools
//           .filter(tool => tool.category === category)
//           .map(tool => (
//             <div
//               key={tool.id}
//               onClick={() => handleToolClick(tool)}
//               className={`cursor-pointer rounded-xl p-5 transition duration-300 transform hover:scale-105 shadow-md ${theme === 'dark'
//                   ? 'bg-gray-800 text-white hover:bg-gray-700'
//                   : 'bg-white text-gray-900 hover:bg-gray-100'
//                 }`}
//             >
//               <div className="text-4xl mb-3">{tool.icon}</div>
//               <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>
//               <p className="text-sm opacity-80">{tool.description}</p>
//             </div>
//           ))}
//       </div>
//     </section>
//   );

//   return (
//     <div className={`px-6 py-10 max-w-7xl mx-auto transition duration-500 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'
//       }`}>
//       <h1 className={`text-center text-4xl font-extrabold mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
//         }`}>
//         Explore All Tools
//       </h1>

//       {renderSection('pdf', '📚 PDF Tools')}
//       {renderSection('utility', '🧰 Utility Tools')}

//       {showModal && selectedTool && (
//         <ToolModal tool={selectedTool} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Tools;




import React, { useEffect, useState } from 'react';
import ToolCard from '../components/ToolCard';
import ToolModal from '../components/ToolModal';
import { useNavigate } from 'react-router-dom';
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileExcel,
  FaImage,
  FaLock,
  FaUnlock,
  FaCompress,
  FaEdit,
  FaObjectUngroup,

  FaWater,
  FaTools,
  FaKey,
  FaSortNumericDown,
  FaBirthdayCake,
  FaBalanceScale,
  FaPalette,
  FaRuler,
  FaCode
} from 'react-icons/fa';
import { FaRotateRight } from "react-icons/fa6";
const Tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme === 'dark' ? 'dark' : 'light');
  }, []);
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const iconMap = {
    'merge-pdf': <FaObjectUngroup className="text-purple-500" />,
    'split-pdf': <FaObjectUngroup className="text-yellow-500" />,
    'compress-pdf': <FaCompress className="text-blue-500" />,
    'pdf-to-word': <FaFileWord className="text-blue-600" />,
    'word-to-pdf': <FaFilePdf className="text-red-500" />,
    'pdf-to-ppt': <FaFilePowerpoint className="text-orange-500" />,
    'ppt-to-pdf': <FaFilePdf className="text-red-500" />,
    'pdf-to-excel': <FaFileExcel className="text-green-600" />,
    'excel-to-pdf': <FaFilePdf className="text-red-500" />,
    'pdf-to-jpg': <FaImage className="text-pink-500" />,
    'jpg-to-pdf': <FaFilePdf className="text-red-500" />,
    'organize-pdf': <FaObjectUngroup className="text-purple-600" />,
    'edit-pdf': <FaEdit className="text-indigo-500" />,
    'rotate-pdf': <FaRotateRight className="text-cyan-500" />,
    'unlock-pdf': <FaUnlock className="text-green-500" />,
    'protect-pdf': <FaLock className="text-red-500" />,
    'add-watermark': <FaWater className="text-blue-400" />,
    'image-compressor': <FaImage className="text-orange-500" />,
    'password-generator': <FaKey className="text-yellow-600" />,
    'word-counter': <FaSortNumericDown className="text-indigo-400" />,
    'age-calculator': <FaBirthdayCake className="text-pink-400" />,
    'bmi-calculator': <FaBalanceScale className="text-gray-400" />,
    'color-picker': <FaPalette className="text-purple-400" />,
    'unit-converter': <FaRuler className="text-green-500" />,
    'json-formatter': <FaCode className="text-teal-500" />,
  };

  const allTools = [
    { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one document', category: 'pdf' },
    { id: 'split-pdf', name: 'Split PDF', description: 'Divide a PDF into multiple documents', category: 'pdf' },
    { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality', category: 'pdf' },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents', category: 'pdf' },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF format', category: 'pdf' },
    { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF to presentation slides', category: 'pdf' },
    { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert slides to PDF format', category: 'pdf' },
    { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel spreadsheets', category: 'pdf' },
    { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF format', category: 'pdf' },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to image files', category: 'pdf' },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF document', category: 'pdf' },
    { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder, rotate, or delete PDF pages', category: 'pdf' },
    { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, images, or shapes to PDFs', category: 'pdf' },
    { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages to correct orientation', category: 'pdf' },
    { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs', category: 'pdf' },
    { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection to PDFs', category: 'pdf' },
    { id: 'add-watermark', name: 'Add Watermark', description: 'Add watermark to PDFs', category: 'pdf' },
    { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', category: 'utility' },
    { id: 'password-generator', name: 'Password Generator', description: 'Create secure passwords', category: 'utility' },
    { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences', category: 'utility' },
    { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from birth date', category: 'utility' },
    { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', category: 'utility' },
    { id: 'color-picker', name: 'Color Picker', description: 'Select and copy color values', category: 'utility' },
    { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units', category: 'utility' },
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', category: 'utility' },
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    navigate(`/tools/${tool.id}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTool(null);
  };

  const renderCustomSection = (title, toolIds) => (
    <section className="mb-16">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-8 border-b pb-3 ${theme === 'dark' ? 'text-white border-gray-700' : 'text-gray-800 border-gray-300'}`}>{title}</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {toolIds.map(id => {
          const tool = allTools.find(t => t.id === id);
          return tool && (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`cursor-pointer rounded-2xl p-6 transition duration-300 transform hover:scale-105 shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
            >
              <div className="text-4xl mb-4">{iconMap[tool.id]}</div>
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm opacity-80 leading-snug">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className={`px-6 py-14 max-w-7xl mx-auto transition duration-500 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
      <h1 className={`text-center text-4xl font-extrabold mb-14 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Explore All Tools
      </h1>

      {renderCustomSection('📤 From PDF', ['pdf-to-word', 'pdf-to-ppt', 'pdf-to-excel', 'pdf-to-jpg'])}
      {renderCustomSection('📥 To PDF', ['word-to-pdf', 'ppt-to-pdf', 'excel-to-pdf', 'jpg-to-pdf'])}
      {renderCustomSection('🛠️ Organize & Edit PDF', ['merge-pdf', 'split-pdf', 'organize-pdf', 'edit-pdf', 'rotate-pdf', 'add-watermark'])}
      {renderCustomSection('🔐 Secure PDF', ['compress-pdf', 'unlock-pdf', 'protect-pdf'])}
      {renderCustomSection('🧰 Utility Tools', allTools.filter(t => t.category === 'utility').map(t => t.id))}

      {showModal && selectedTool && (
        <ToolModal tool={selectedTool} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Tools;
