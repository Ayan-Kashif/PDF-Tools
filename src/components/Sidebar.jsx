// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import clsx from 'clsx';
// // import {
// //   LuFileText, LuSplit, LuFileDown, LuFileUp, LuFilePlus, LuFileMinus,
// //   LuFileImage, LuImage, LuImagePlus, LuImageDown,
// //   LuMic, LuMicOff, LuMusic, LuVideo, LuQrCode, LuShield, LuLock,
// //    LuListOrdered,  LuPaintbrush,LuX,
// //   LuWeight, LuRuler, LuClock, LuPalette, LuCode, LuSettings, LuChevronRight
// // } from 'react-icons/lu';



// // const Sidebar = ({ open, setOpen, setActiveTool }) => {
// //   const navigate = useNavigate();
// //   const [expandedSections, setExpandedSections] = useState({ pdf: true, utility: true });

// //   const toggleSection = (section) => {
// //     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
// //   };

// //   const handleToolClick = (toolId) => {
// //     setActiveTool(toolId);
// //     navigate('/tools');
// //     setOpen(false); // Close after selecting a tool
// //   };

// //  const pdfTools = [
// //   { id: 'merge-pdf', name: 'Merge PDF', icon: <LuFilePlus /> },
// //   { id: 'split-pdf', name: 'Split PDF', icon: <LuSplit /> },
// //   { id: 'compress-pdf', name: 'Compress PDF', icon: <LuFileDown /> },
// //   { id: 'pdf-to-word', name: 'PDF to Word', icon: <LuFileText /> },
// //   { id: 'word-to-pdf', name: 'Word to PDF', icon: <LuFileText /> },
// //   { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', icon:'' },
// //   { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', icon: '' },
// //   { id: 'pdf-to-excel', name: 'PDF to Excel', icon: <LuListOrdered /> },
// //   { id: 'excel-to-pdf', name: 'Excel to PDF', icon: <LuListOrdered /> },
// //   { id: 'pdf-to-jpg', name: 'PDF to JPG', icon: <LuFileImage /> },
// //   { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: <LuImage /> },
// //   { id: 'organize-pdf', name: 'Organize PDF', icon: <LuSettings /> },
// //   { id: 'edit-pdf', name: 'Edit PDF', icon: <LuPaintbrush /> },
// //   { id: 'rotate-pdf', name: 'Rotate PDF', icon: <LuFileUp /> },
// //   { id: 'unlock-pdf', name: 'Unlock PDF', icon:'' },
// //   { id: 'protect-pdf', name: 'Protect PDF', icon: <LuLock /> },
// //   { id: 'add-numbers', name: 'Add Page Numbers', icon: <LuListOrdered /> },
// //   { id: 'add-watermark', name: 'Add Watermark', icon: '' },
// // ];


// //  const utilityTools = [
// //   { id: 'image-compressor', name: 'Image Compressor', icon: <LuImageDown /> },
// //   { id: 'image-converter', name: 'Image Converter', icon: <LuImagePlus /> },
// //   { id: 'audio-converter', name: 'Audio Converter', icon: <LuMusic /> },
// //   { id: 'video-compressor', name: 'Video Compressor', icon: <LuVideo /> },
// //   { id: 'qr-generator', name: 'QR Code Generator', icon: <LuQrCode /> },
// //   { id: 'password-generator', name: 'Password Generator', icon: <LuShield /> },
// //   { id: 'word-counter', name: 'Word Counter', icon: <LuFileText /> },
// //   { id: 'age-calculator', name: 'Age Calculator', icon: <LuClock /> },
// //   { id: 'bmi-calculator', name: 'BMI Calculator', icon: <LuWeight /> },
// //   { id: 'color-picker', name: 'Color Picker', icon: <LuPalette /> },
// //   { id: 'unit-converter', name: 'Unit Converter', icon: <LuRuler /> },
// //   { id: 'json-formatter', name: 'JSON Formatter', icon: <LuCode /> },
// //   { id: 'text-to-speech', name: 'Text to Speech', icon: <LuMic /> },
// //   { id: 'speech-to-text', name: 'Speech to Text', icon: <LuMicOff /> },
// //   { id: 'timer', name: 'Timer / Stopwatch', icon: <LuClock /> },
// // ];


// //   const Section = ({ title, tools, icon, sectionKey }) => (
// //     <div className="mb-4">
// //       <button
// //         onClick={() => toggleSection(sectionKey)}
// //         className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
// //       >
// //         <span className="flex items-center gap-2">{icon}{title}</span>
// //         {expandedSections[sectionKey] ? <LuImage size={16} /> : <LuImage size={16} />}
// //       </button>

// //       <ul className={clsx(
// //         'pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out',
// //         expandedSections[sectionKey] ? 'max-h-[1000px]' : 'max-h-0'
// //       )}>
// //         {tools.map(tool => (
// //           <li key={tool.id}>
// //             <button
// //               onClick={() => handleToolClick(tool.id)}
// //               className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
// //             >
// //               {tool.icon}
// //               {tool.name}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );

// //   return (
// //     <aside className={clsx(
// //       'fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out',
// //       open ? 'translate-x-0' : '-translate-x-full'
// //     )}>
// //       {/* Header */}
// //       <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
// //         <span className="text-lg font-bold text-gray-800 dark:text-white">📚 Tool Menu</span>
// //         <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 dark:hover:text-red-400">
// //           <LuX size={20} />
// //         </button>
// //       </div>

// //       {/* Content */}
// //       <div className="px-3 py-4 text-sm overflow-y-auto h-[calc(100%-60px)] custom-scrollbar">
// //         <Section title="PDF Tools" tools={pdfTools} icon={<LuFileText />} sectionKey="pdf" />
// //         <Section title="Utility Tools" tools={utilityTools} icon={<LuSettings />} sectionKey="utility" />
// //       </div>
// //     </aside>
// //   );
// // };

// // export default Sidebar;


// // components/Sidebar.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import clsx from 'clsx';
// import {
//   LuFileText, LuSplit, LuFileDown, LuFileUp, LuFilePlus,
//   LuFileImage, LuImage, LuImagePlus, LuImageDown, LuMic,
//   LuMicOff, LuMusic, LuVideo, LuQrCode, LuShield, LuLock,
//   LuListOrdered, LuPaintbrush, LuWeight, LuRuler, LuClock,
//   LuPalette, LuCode, LuSettings, LuChevronRight, LuChevronLeft,
//   LuChevronUp, LuChevronDown, LuDroplet, LuPresentation
// } from 'react-icons/lu';
// import { CgArrangeBack } from "react-icons/cg";
// import { BsUnlock } from "react-icons/bs";

// const Sidebar = ({ open, setOpen, setActiveTool }) => {
//   const navigate = useNavigate();
//   const [expandedSections, setExpandedSections] = useState({ pdf: true, utility: true });
//   const storedTheme = localStorage.getItem('theme');

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const handleToolClick = (toolId) => {
//     setActiveTool(toolId);
//     navigate('/tools');
//     setOpen(false);
//   };

//   const pdfTools = [
//     { id: 'merge-pdf', name: 'Merge PDF', icon: <LuFilePlus /> },
//     { id: 'split-pdf', name: 'Split PDF', icon: <LuSplit /> },
//     { id: 'compress-pdf', name: 'Compress PDF', icon: <LuFileDown /> },
//     { id: 'pdf-to-word', name: 'PDF to Word', icon: <LuFileText /> },
//     { id: 'word-to-pdf', name: 'Word to PDF', icon: <LuFileText /> },
//     { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', icon: <LuPresentation /> },
//     { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', icon: <LuPresentation /> },
//     { id: 'organize-pdf', name: 'Organize PDF', icon: <LuFileImage /> },
//     { id: 'pdf-to-excel', name: 'PDF to Excel', icon: <LuListOrdered /> },
//     { id: 'excel-to-pdf', name: 'Excel to PDF', icon: <LuListOrdered /> },
//     { id: 'pdf-to-jpg', name: 'PDF to JPG', icon: <LuFileImage /> },
//     { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: <LuImage /> },

//     { id: 'edit-pdf', name: 'Edit PDF', icon: <LuPaintbrush /> },
//     { id: 'rotate-pdf', name: 'Rotate PDF', icon: <LuFileUp /> },
//     { id: 'unlock-pdf', name: 'Unlock PDF', icon: <BsUnlock /> },
//     { id: 'protect-pdf', name: 'Protect PDF', icon: <LuLock /> },
//     { id: 'add-numbers', name: 'Add Page Numbers', icon: <LuListOrdered /> },
//     { id: 'add-watermark', name: 'Add Watermark', icon: <LuDroplet /> },
//   ];

//   const utilityTools = [
//     { id: 'image-compressor', name: 'Image Compressor', icon: <LuImageDown /> },
//     { id: 'image-converter', name: 'Image Converter', icon: <LuImagePlus /> },
//     { id: 'audio-converter', name: 'Audio Converter', icon: <LuMusic /> },
//     { id: 'video-compressor', name: 'Video Compressor', icon: <LuVideo /> },
//     { id: 'qr-generator', name: 'QR Code Generator', icon: <LuQrCode /> },
//     { id: 'password-generator', name: 'Password Generator', icon: <LuShield /> },
//     { id: 'word-counter', name: 'Word Counter', icon: <LuFileText /> },
//     { id: 'age-calculator', name: 'Age Calculator', icon: <LuClock /> },
//     { id: 'bmi-calculator', name: 'BMI Calculator', icon: <LuWeight /> },
//     { id: 'color-picker', name: 'Color Picker', icon: <LuPalette /> },
//     { id: 'unit-converter', name: 'Unit Converter', icon: <LuRuler /> },
//     { id: 'json-formatter', name: 'JSON Formatter', icon: <LuCode /> },
//     { id: 'text-to-speech', name: 'Text to Speech', icon: <LuMic /> },
//     { id: 'speech-to-text', name: 'Speech to Text', icon: <LuMicOff /> },
//     { id: 'timer', name: 'Timer / Stopwatch', icon: <LuClock /> },
//   ];

//   const Section = ({ title, tools, icon, sectionKey }) => (
//     <div className="mb-4">
//       <button
//         onClick={() => toggleSection(sectionKey)}
//         className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
//       >
//         <span className="flex items-center gap-2">{icon}{title}</span>
//         {expandedSections[sectionKey] ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
//       </button>

//       <ul className={clsx(
//         'pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out',
//         expandedSections[sectionKey] ? 'max-h-[1000px]' : 'max-h-0'
//       )}>
//         {tools.map(tool => (
//           <li key={tool.id}>
//             <button
//               onClick={() => handleToolClick(tool.id)}
//               className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
//             >
//               {tool.icon}
//               {tool.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <>
//       {/* Sidebar Panel */}
//       <aside className={clsx(
//         'fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out',
//         open ? 'translate-x-0' : '-translate-x-full'
//       )}>
//         {/* Sidebar Header */}
//         <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
//           <span className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
//             <LuSettings className="text-blue-500" /> Tool Menu
//           </span>
//           <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 dark:hover:text-red-400">
//             <LuChevronLeft size={22} />
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="px-3 py-4 text-sm overflow-y-auto h-[calc(100%-60px)] custom-scrollbar">
//           <Section title="PDF Tools" tools={pdfTools} icon={<LuFileText />} sectionKey="pdf" />
//           <Section title="Utility Tools" tools={utilityTools} icon={<LuSettings />} sectionKey="utility" />
//         </div>
//       </aside>

//       {/* Toggle handle (when collapsed) */}
//       {!open && (
//         <button
//           className="fixed top-1/2 left-0 z-40 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 text-white p-2 rounded-r-md shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//           onClick={() => setOpen(true)}
//         >
//           <LuChevronRight size={20} />
//         </button>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import {
  LuFileText, LuSplit, LuFileDown, LuFileUp, LuFilePlus,
  LuFileImage, LuImage, LuImagePlus, LuImageDown, LuMic,
  LuMicOff, LuMusic, LuVideo, LuQrCode, LuShield, LuLock,
  LuListOrdered, LuPaintbrush, LuWeight, LuRuler, LuClock,
  LuPalette, LuCode, LuSettings, LuChevronRight, LuChevronLeft,
  LuChevronUp, LuChevronDown, LuDroplet, LuPresentation
} from 'react-icons/lu';
import { CgArrangeBack } from 'react-icons/cg';
import { BsUnlock } from 'react-icons/bs';

const Sidebar = ({ open, setOpen, setActiveTool }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({ pdf: true, utility: true });

  // Get theme from localStorage



  const [theme, setTheme] = useState(() => {
    // Initial load from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });


  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const sidebarBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const headerBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const toggleBtnBg = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400';

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToolClick = (toolId) => {
    setActiveTool(toolId);
   navigate(`/tools/${toolId}`)
    setOpen(false);
  };

  const pdfTools = [
    { id: 'merge-pdf', name: 'Merge PDF', icon: <LuFilePlus /> },
    { id: 'split-pdf', name: 'Split PDF', icon: <LuSplit /> },
    { id: 'compress-pdf', name: 'Compress PDF', icon: <LuFileDown /> },
    { id: 'pdf-to-word', name: 'PDF to Word', icon: <LuFileText /> },
    { id: 'word-to-pdf', name: 'Word to PDF', icon: <LuFileText /> },
    { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', icon: <LuPresentation /> },
    { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', icon: <LuPresentation /> },
    { id: 'organize-pdf', name: 'Organize PDF', icon: <LuFileImage /> },
    { id: 'pdf-to-excel', name: 'PDF to Excel', icon: <LuListOrdered /> },
    { id: 'excel-to-pdf', name: 'Excel to PDF', icon: <LuListOrdered /> },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', icon: <LuFileImage /> },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: <LuImage /> },
    { id: 'edit-pdf', name: 'Edit PDF', icon: <LuPaintbrush /> },
    { id: 'rotate-pdf', name: 'Rotate PDF', icon: <LuFileUp /> },
    { id: 'unlock-pdf', name: 'Unlock PDF', icon: <BsUnlock /> },
    { id: 'protect-pdf', name: 'Protect PDF', icon: <LuLock /> },
    // { id: 'add-numbers', name: 'Add Page Numbers', icon: <LuListOrdered /> },
    { id: 'add-watermark', name: 'Add Watermark', icon: <LuDroplet /> },
  ];

  const utilityTools = [
    { id: 'image-compressor', name: 'Image Compressor', icon: <LuImageDown /> },
    // { id: 'image-converter', name: 'Image Converter', icon: <LuImagePlus /> },
    // { id: 'audio-converter', name: 'Audio Converter', icon: <LuMusic /> },
    // { id: 'video-compressor', name: 'Video Compressor', icon: <LuVideo /> },
    // { id: 'qr-generator', name: 'QR Code Generator', icon: <LuQrCode /> },
    { id: 'password-generator', name: 'Password Generator', icon: <LuShield /> },
    { id: 'word-counter', name: 'Word Counter', icon: <LuFileText /> },
    { id: 'age-calculator', name: 'Age Calculator', icon: <LuClock /> },
    { id: 'bmi-calculator', name: 'BMI Calculator', icon: <LuWeight /> },
    { id: 'color-picker', name: 'Color Picker', icon: <LuPalette /> },
    { id: 'unit-converter', name: 'Unit Converter', icon: <LuRuler /> },
    { id: 'json-formatter', name: 'JSON Formatter', icon: <LuCode /> },
    // { id: 'text-to-speech', name: 'Text to Speech', icon: <LuMic /> },
    // { id: 'speech-to-text', name: 'Speech to Text', icon: <LuMicOff /> },
    // { id: 'timer', name: 'Timer / Stopwatch', icon: <LuClock /> },
  ];

  const Section = ({ title, tools, icon, sectionKey }) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className={`w-full flex justify-between items-center px-4 py-2 text-sm font-semibold rounded-md transition ${hoverBg}`}
      >
        <span className="flex items-center gap-2">{icon}{title}</span>
        {expandedSections[sectionKey] ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
      </button>

      <ul className={clsx(
        'pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out',
        expandedSections[sectionKey] ? 'max-h-[1000px]' : 'max-h-0'
      )}>
        {tools.map(tool => (
          <li key={tool.id}>
            <button
              onClick={() => handleToolClick(tool.id)}
              className={`flex items-center gap-2 px-3 py-2 w-full text-sm rounded-md transition ${hoverBg} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
            >
              {tool.icon}
              {tool.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Sidebar Panel */}
      <aside className={clsx(
        `fixed top-0 left-0 z-50 w-64 h-full shadow-xl transition-transform duration-300 ease-in-out ${sidebarBgClass}`,
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Sidebar Header */}
        <div className={`flex justify-between items-center px-4 py-3 border-b ${headerBorder}`}>
          <span className="text-lg font-bold flex items-center gap-2">
            <LuSettings className="text-blue-500" /> Tool Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-red-500 dark:hover:text-red-400"
          >
            <LuChevronLeft size={22} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="px-3 py-4 text-sm overflow-y-auto h-[calc(100%-60px)] custom-scrollbar">
          <Section title="PDF Tools" tools={pdfTools} icon={<LuFileText />} sectionKey="pdf" />
          <Section title="Utility Tools" tools={utilityTools} icon={<LuSettings />} sectionKey="utility" />
        </div>
      </aside>

      {/* Toggle Button when collapsed */}
      {!open && (
        <button
          className={`fixed top-1/2 left-0 z-40 transform -translate-y-1/2 text-white p-2 rounded-r-md shadow-md transition ${toggleBtnBg}`}
          onClick={() => setOpen(true)}
        >
          <LuChevronRight size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;

