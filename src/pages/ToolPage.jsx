
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToolModal from '../components/ToolModal';
import {
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaUserShield,
  FaThumbsUp,
  FaBullseye,
  FaWrench

} from 'react-icons/fa';

export const toolDetails = {
  "image-compressor": {
    "overview": "With Fixi PDF’s Image Compressor, you can shrink image sizes for faster sharing,uploading, or web use—without losing visual quality.",
    "features": [
      "Compress JPG, JPEG, and PNG files",
      "Maintain high-resolution display",
      "Ideal for websites, emails, and mobile",
      "Drag-and-drop interface",
      "100% free and browser-based"
    ],
    "usage": [
      'Upload your image(s).',
      "Let our tool optimize the file size.",
      "Download the compressed image"
    ],
    "perfectFor": [
      'Website performance optimization',
      "Faster email attachment delivery",
      "Social media uploads"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },
  "password-generator": {
    "overview": "Need a tough password for your account or document? Use Fixi PDF’s Password Generator to instantly create a strong, random password to protect your digital life",
    "features": [
      "Customize length (8–32 characters)",
      "Include/exclude symbols, numbers, uppercase",
      "Copy with one click",
      "No data stored",

    ],
    "usage": [

    ],
    "perfectFor": [
      ' Email, banking, and PDF file protection',
      "Account registrations",
      "Online privacy"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },

  "word-counter": {
    "overview": "Writing an assignment or a social post? Use Fixi PDF’s Word Counter to get instant counts of words, characters, and sentences.",
    "features": [
      "Live count as you type or paste",
      "Paragraph and sentence breakdown",
      "Ideal for writers, bloggers, and students",
      "Zero ads, zero distractions",

    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },


  "age-calculator": {
    "overview": "Use Fixi PDF’s Age Calculator to find out exactly how old you are based on your date of birth. Great for forms, insurance, or curiosity!",
    "features": [
      "Instant calculation in years, months & days",
      "Easy input format",
      "No login or app required",


    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },


  "bmi-alculator": {
    "overview": "Use our BMI Calculator to check your body weight category. Fast, free, and suitable for men and women of all ages.",
    "features": [
      "Metric and imperial support",
      "Instant result with category label",
      "Great for personal health tracking",


    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },
  "color-picker": {
    "overview": "With Fixi PDF’s Color Picker, get accurate color codes from any part of your screen for your designs, branding, or web projects.",
    "features": [
      "Copy HEX, RGB, or HSL formats",
      "Clean UI for designers and devs",
      " No installations required",


    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },



  "unit-onvertor": {
    "overview": "Convert kilometers to miles, Celsius to Fahrenheit, kilograms to pounds, and more—all in one tool.",
    "features": [
      "Length, weight, volume, area",
      "Temperature, speed, data ",
      " Accurate real-time results",


    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },


  "json-formatter": {
    "overview": "With Fixi PDF’s JSON Formatter, beautify your messy JSON data for readability and debugging. Also validates for errors automatically.",
    "features": [
      "Beautify and color-code JSON",
      "Beautify and color-code JSON",
      'Copy-friendly layout for developers',
      " No installations required",


    ],
    "usage": [
    ],
    "perfectFor": [

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to format json files without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },



















  "pdf-to-word": {
    "overview": "",
    "features": [
      "Preserves formatting \u2013 fonts, spacing, bullet points, and styles",
      "OCR technology for scanned PDFs (image-based)",
      "No sign-up or installation needed",
      "100% browser-based and mobile-friendly",
      "Secure conversion with auto file deletion in 1 hour"
    ],
    "usage": [
      "Upload your PDF file.",
      "Upload your PDF file.",
      "Download the fully editable Word document instantly"
    ],
    "perfectFor": [
      "Edit documents without retyping",
      "Update contracts and proposals",
      "Extract and reuse text from read-only files"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a reliable, free, and fast way to convert PDFs to Word without compromising onquality or privacy. Trusted by students, professionals, and businesses globally"
  },


  "compress-pdf": {
    "overview": "Too large to email or upload? Use Fixi PDF’s Compress PDF tool to reduce file size whilemaintaining high visual quality. Perfect for resumes, contracts, or reports that need to be sharedor stored.",
    "features": [
      "Intelligent compression without blurry text or images",
      "Maintain print-quality results",
      "Drag-and-drop simplicity",
      "Mobile-friendly interface",
      "No watermark or registration required"
    ],
    "usage": [
      "Upload your PDF.",
      " Our tool compresses it using smart optimization",
      "Download your smaller, optimized PDF instantly"
    ],
    "perfectFor": [
      "Email attachments",
      "● Faster uploads",
      "Long-term digital storage"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers fast, free PDF compression without compromising quality or data security"
  },
  "jpg-to-pdf": {
    "overview": "Looking to convert images into shareable documents? With Fixi PDF’s JPG to PDF tool, youcan quickly convert single or multiple JPG images into one clean PDF file. Perfect for photocollections, scanned documents, or submitting assignments.",
    "features": [
      "Supports JPG, JPEG, and PNG images",
      "Combine multiple images into one PDF",
      "Maintains image resolution and orientation",
      "Works on mobile and desktop",
      "No registration or watermark"
    ],
    "usage": [
      " Upload one or more JPG images.",
      "Arrange them in your preferred order (optional).",
      "Click to convert and download your PDF"
    ],
    "perfectFor": [
      "Create photo albums or portfolios",
      "Submit scanned assignments as a PDF",
      "Bundle ID documents or receipts into one file"
    ],
    "privacy": "Fixi PDF’s JPG to PDF converter is fast, secure, and completely free. Ideal for students, jobseekers, photographers, and anyone who needs to convert images to PDF instantly"
  },


  "unlock-pdf": {
    "overview": "Tired of typing a password every time you open a PDF? Use Fixi PDF’s Unlock PDF tool to permanently remove password protection and make your document freely accessible.",
    "features": [
      "Unlock PDFs secured with open/view passwords",
      "No downloads or installations",
      "Works instantly in the browser",
      "No watermark, ever",
      "Files deleted within 1 hour"
    ],
    "usage": [
      "Upload your locked PDF.",
      "Enter the correct password (if required).",
      "Download the unlocked version."
    ],
    "perfectFor": [
      " Remove passwords from frequently used files",
      "Make reading and printing easier",
      "Eliminate restrictions on editing or copying"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Eliminate restrictions on editing or copying"
  },



  "rotate-pdf": {
    "overview": "Accidentally scanned your document sideways? No problem. With Fixi PDF’s Rotate PDF tool,you can quickly rotate one or more pages to the correct orientation",
    "features": [
      "Rotate selected or all pages",
      "Supports single and multi-page PDFs",
      "No watermark or usage limit",
      "Works on all browsers and devices",
      "Deletes files after 1 hour"
    ],
    "usage": [
      " Upload your PDF.",
      "Select pages and rotate.",
      " Download the corrected file."
    ],
    "perfectFor": [],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Simple, effective, and 100% free—perfect for scanned documents and presentation corrections"
  },


  "merge-pdf": {
    "overview": "Want to merge several PDFs into a single file? Use Fixi PDF\u2019s Merge PDF tool to combine  documents instantly without compromising layout, content, or formatting.",
    "features": [
      "Merge unlimited PDF files",
      "Maintain original formatting and order",
      "Drag-and-drop to rearrange files",
      "Works on all devices and browsers",
      "Auto-deletion after 1 hour for privacy"
    ],
    "usage": [
      "Upload your PDF files.",
      " Arrange them as you like",
      "Click “Merge” and download your combined file."
    ],
    "perfectFor": [
      "Submitting portfolios",
      "Combining reports, invoices, or eBooks",
      "Organizing scanned documents"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF makes PDF merging fast, free, and frustration-free with no watermarks or usage limits."
  },


  "ppt-to-pdf": {
    "overview": "Want to share your PowerPoint presentation in a universal format? Use Fixi PDF’s PowerPointto PDF tool to convert your .ppt or .pptx files into high-quality PDFs with all formatting, visuals,and animations preserved as static slides.",
    "features": [
      "Converts both .ppt and .pptx formats",
      "Retains images, graphics, fonts, and layout",
      "Great for resumes, reports, and presentation handouts",
      "No sign-up or software download needed",
      "Safe: files are auto-deleted within 60 minutes"
    ],
    "usage": [
      "Upload your PowerPoint file.",
      "The tool instantly processes it into PDF format",
      "Download your PDF version of the slides."
    ],
    "perfectFor": [
      "Sharing presentation handouts",
      "Emailing professional slide decks",
      "Archiving presentations in fixed format"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF makes it easy to convert your PowerPoint to PDF without losing formatting. It's fast,user-friendly, and completely free—perfect for students, teachers, and professionals."
  },


  "split-pdf": {
    "overview": "Need to divide a large PDF? Use Fixi PDF’s Split PDF tool to extract pages or split youdocument into multiple smaller PDFs—perfect for focused reading, sharing, or editing.",
    "features": [
      "Extract specific page ranges",
      "Divide a PDF into multiple files",
      "Intuitive drag-to-select interface",
      "Fast & device-friendly",
      "Automatic deletion after 1 hour"
    ],
    "usage": [
      " Upload your PDF.",
      "Choose page ranges or select pages.",
      "Download your new file(s)."
    ],
    "perfectFor": [
      "Download your new file(s).",
      "Reducing file size",
      "Separating chapters or sections"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "No downloads, no limits, no watermark—just clean and quick PDF splitting."
  },


  "pdf-to-jpg": {
    "overview": "Need to convert your PDF pages into JPG images? Fixi PDF’s PDF to JPG Converter allowsyou to transform your PDFs into high-quality image files (.jpg) that can be easily shared, printed,or used in presentations.",
    "features": [
      "Extracts each page of the PDF as a separate JPG image",
      "High-quality image output with fast conversion",
      "No sign-up required, free to use",
      "Supports mobile and desktop platforms",
      "Secure file processing with auto-deletion after one hour"
    ],
    "usage": [
      "Upload your PDF document.",
      "Upload your PDF document.",
      "Download your images and use them wherever you need."
    ],
    "perfectFor": [
      " Image sharing",
      " Printing PDF content ",
      " Digital presentations"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fast, easy, and free, Fixi PDF's PDF to JPG Converter is the best way to turn your PDFs intoimages for professional and personal use."
  },


  "organize-pdf": {
    "overview": "Fixi PDF’s Organize PDF tool helps you take control of your document layout. Move, rotate, ordelete pages to get the structure you want—without needing expensive software.",
    "features": [
      "Drag-and-drop page rearrangement",
      "Rotate single or multiple pages",
      "Delete unnecessary pages",
      "Fast and web-based",
      "File deleted after 1 hour"
    ],
    "usage": [
      "Upload your PDF.",
      " Reorder, rotate, or delete pages as needed.",
      " Download your updated file."
    ],
    "perfectFor": [],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "This tool is ideal for teachers, students, professionals, or anyone who needs better control over their document's flow."
  },


  "excel-to-pdf": {
    "overview": "Want to share your spreadsheets in a professional, read-only format? With Fixi PDF’s Excel toPDF Converter, you can turn your .xls or .xlsx files into polished PDF documents that retainyour layout, tables, charts, and cell formatting.",
    "features": [
      "Maintains original structure, formulas, and charts",
      "Converts .xls and .xlsx files",
      "No watermark or usage limits",
      "Completely browser-based",
      "Secure and automatically deletes files within 1 hour"
    ],
    "usage": [
      "Upload your Excel file.",
      "Let Fixi PDF convert it into PDF.",
      "Download your professionally formatted documen"
    ],
    "perfectFor": [
      "Financial and business reporting",
      "Budget sheets",
      "Invoice or timesheet sharing"

    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Our Excel to PDF tool ensures fast, accurate, and secure conversion — ideal for professionals, accountants, and students who need shareable, tamper-proof files."
  },



  "edit-pdf": {
    "overview": "Need to make changes to a PDF without downloading complicated software? With Fixi PDF’sEdit PDF tool, you can make quick updates, add annotations, insert images, draw shapes, or sign documents—right in your browser.",
    "features": [
      " Add Text: Write or insert new content anywhere in the document",
      " Add Images: Upload and place logos, signatures, stamps, or pictures",
      " Draw & Highlight: Use rectangles, circles, lines, arrows, and freehand tools",
      "Fill Forms: Type into blank spaces or overlay fields for form completion",
      " Sign Documents: Add your digital signature by typing, drawing, or uploading"
    ],
    "usage": [
      "Upload your PDF file.",
      "Use the built-in editor to make your changes.",
      "Download the modified PDF instantly"
    ],
    "perfectFor": [
      "Filling out application forms and contracts",
      " Adding notes, highlights, or revision marks",
      "Correcting or updating outdated documents"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Whether you're on a desktop, tablet, or mobile, Fixi PDF’s editor is fully responsive and optimized for smooth performance."
  },


  "protect-pdf": {
    "overview": "Need to share confidential or personal documents securely? Use Fixi PDF’s Protect PDFtool to apply password protection and prevent unauthorized access or edits.",
    "features": [
      "Add open/view passwords",
      "AES-256 bit encryption",
      "Prevent printing, copying, or editing",
      "No software download required",
      "Fully browser-based and mobile compatible"
    ],
    "usage": [
      "Upload your PDF.",
      "Set a strong password",
      "Click Protect and download your encrypted file."
    ],
    "perfectFor": [
      "Securing contracts, invoices, and legal documents",
      "Sharing sensitive data via email",
      "Sharing sensitive data via email"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF gives you total control over your document security — for free, with no hidden costs."
  },


  "word-to-pdf": {
    "overview": "Need to share your Word documents as PDFs? Fixi PDF’s Word to PDF Converter helps you quickly convert Word (.docx) files into secure and shareable PDF files without losing formatting.",
    "features": [
      "Converts Word documents (.doc, .docx) to PDF",
      "No software installation required",
      "Keep the original formatting intact",
      "Fast and easy to use",
      "Fully mobile and desktop compatible"
    ],
    "usage": [
      "Upload your Word document.",
      " Our tool instantly converts it to a PDF.",
      "Download the PDF and start sharing."
    ],
    "perfectFor": [
      "Sharing documents securely",
      "Sharing documents securely",
      " Document archiving"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF gives you total control over your document— for free, with no hidden costs"
  },


  "add-watermark": {
    "overview": "Looking to protect your PDF files or add a professional brand identity? Use Fixi PDF’s Add Watermark tool to insert custom text watermarks or logo images to your documents in just a few clicks—completely free and browser-based.",
    "features": [
      " Text Watermarks Add custom phrases like Confidential , Do Not Copy, or your",
      "company name.",
      " Image Watermarks  Upload logos or icons in JPG or PNG format.",
      "0 Fully Customizable  Adjust position, size, opacity, font, color, and rotation.",
      " Live Preview  See your watermark before downloading the final file.",
      " No Watermark from Us  We don't add our branding to your file."
    ],
    "usage": [
      "Upload your PDF file",
      "Choose Text or Image watermark.",
      "Click Apply Watermark and download your secured file."
    ],
    "perfectFor": [
      "Add copyright or ownership info",
      "Protect contracts, proposals, and reports",
      "Create digital proof copies before printing"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Add a personal or professional stamp to your files with Fixi PDF – watermark your PDF in seconds, with full control."
  },


  "pdf-to-ppt": {
    "overview": "Need to turn your PDF into a dynamic PowerPoint presentation? Use Fixi PDF’s PDF to PowerPoint Converter to easily transform static PDFs into editable PowerPoint (.pptx) slides while maintaining structure, fonts, and visuals.",
    "features": [
      "Converts text, images, and graphics into PowerPoint format",
      "Supports scanned PDFs with OCR technology",
      "No sign-up or software installation required",
      "Mobile and desktop compatible",
      "Files auto-deleted after 1 hour for maximum privacy"
    ],
    "usage": [
      "Upload your PDF document.",
      "Our tool converts it to a PowerPoint file (.pptx).",
      "Download and customize your new presentation"
    ],
    "perfectFor": [
      "Business presentations",
      " Class lectures",
      "Visual proposals from PDF data"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Our free PDF to PowerPoint tool offers unmatched speed, accuracy, and convenience—making it ideal for students, professionals, and presenters alike."
  },


  "pdf-to-excel": {
    "overview": "Need to work with data locked inside a PDF? Fixi PDF’s PDF to Excel converter lets youextract tables, numbers, and charts into a fully editable Excel (.xlsx) format. No need to retype — just upload and convert.",
    "features": [
      "Extracts structured data from PDFs",
      "Preserves cell formatting and alignment",
      "Works on scanned PDFs with OCR",
      "No sign-up or installation needed",
      "Files auto-deleted in 1 hour"
    ],
    "usage": [
      "Upload your PDF file with tabular data",
      "Let the tool extract and convert to Excel",
      "Let the tool extract and convert to Exc"
    ],
    "perfectFor": [
      "Financial reports and invoices",
      "Product catalogs",
      " Data analysis and audits"
    ],
    "privacy": "We automatically delete your files within 1 hour for maximum security and privacy.",
    "whyUseFixiPdf": "Fixi PDF offers a fast, accurate, and free solution for anyone needing PDF to Excel conversion — ideal for accountants, analysts, students, and business professionals."
  }
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
const ToolPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const foundTool = allTools.find(t => t.id === toolId);
    if (!foundTool) {
      navigate('/tools');
    } else {
      setTool(foundTool);
      window.scrollTo(0, 0);
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') setTheme('dark');
    else setTheme('light');
  }, [toolId, navigate]);

  if (!tool) return null;

  // Helper section component
  const Section = ({ title, icon, children }) => (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
  const details = toolDetails[toolId] || {};

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-20 py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#161E2C] text-white' : 'bg-white text-gray-800'
        }`}
    >
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Tool Title */}
        <h1 className="text-4xl sm:text-5xl font-bold flex items-center gap-4">
          <FaWrench className="text-purple-600 text-5xl" />
          {tool.name}
        </h1>

        {/* CTA */}
        <div className="pt-6">
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg transition"
          >
            <FaRocket />
            { tool.category==='utility' ?'Get Started':'Upload Files'}
          </button>
        </div>
        {/* Overview */}
        {details.overview && (
          <p className="text-lg leading-8 ">
            {details.overview}
          </p>
        )}

        {/* Main Content Box */}
        <div
          className={`rounded-3xl lg:p-10 p-6 shadow-2xl space-y-14 transition ${theme === 'dark'
              ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white'
              : 'bg-gradient-to-br from-gray-50 to-white text-gray-800'
            }`}
        >
          {/* Features */}
          {details.features?.length > 0 && (
            <Section title="Key Features" icon={<FaCheckCircle className="text-green-500" />}>
              <ul className="list-disc list-inside space-y-3 text-base leading-relaxed">
                {details.features.map((feature, idx) => (
                  <li key={idx} className="pl-1">{feature}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Usage */}
          {details.usage?.length>0 && (
            <Section title="How to Use" icon={<FaLightbulb className="text-yellow-400" />}>
              {Array.isArray(details.usage) ? (
                <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed">
                  {details.usage.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {details.usage}
                </p>
              )}
            </Section>
          )}

          {/* Perfect For */}
          {details.perfectFor?.length > 0 && (
            <Section title="Perfect For" icon={<FaBullseye className="text-blue-500" />}>
              <ul className="list-disc list-inside space-y-3 text-base leading-relaxed">
                {details.perfectFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Privacy */}
          {details.privacy && (
            <Section title="Privacy & Security" icon={<FaUserShield className="text-red-500" />}>
              <p className="text-base leading-relaxed ">
                {details.privacy}
              </p>
            </Section>
          )}

          {/* Why Use Fixi PDF */}
          {details.whyUseFixiPdf && (
            <Section title="Why Use Fixi PDF?" icon={<FaThumbsUp className="text-pink-500" />}>
              <p className="text-base leading-relaxed ">
                {details.whyUseFixiPdf}
              </p>
            </Section>
          )}


        </div>
      </div>

      {openModal && <ToolModal tool={tool} onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default ToolPage;

