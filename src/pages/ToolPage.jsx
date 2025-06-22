// src/pages/ToolPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToolModal from '../components/ToolModal';

const allTools = [
  // PDF Tools
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one document', icon: '🔗', category: 'pdf' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Divide a PDF into multiple documents', icon: '✂️', category: 'pdf' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality', icon: '🗜️', category: 'pdf' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files to editable Word documents', icon: '📝', category: 'pdf' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF format', icon: '📄', category: 'pdf' },
  { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF to presentation slides', icon: '📊', category: 'pdf' },
  { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert slides to PDF format', icon: '🖥️', category: 'pdf' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel spreadsheets', icon: '📈', category: 'pdf' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF format', icon: '🧮', category: 'pdf' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to image files', icon: '🖼️', category: 'pdf' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF document', icon: '📑', category: 'pdf' },
  { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder, rotate, or delete PDF pages', icon: '🗂️', category: 'pdf' },
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, images, or shapes to PDFs', icon: '✏️', category: 'pdf' },
  { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages to correct orientation', icon: '🔃', category: 'pdf' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs', icon: '🔓', category: 'pdf' },
  { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection to PDFs', icon: '🔒', category: 'pdf' },
  { id: 'add-watermark', name: 'Add Watermark', description: 'Add watermark to PDFs', icon: '💧', category: 'pdf' },

  // Utility Tools
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', icon: '🖼️', category: 'utility' },
  { id: 'password-generator', name: 'Password Generator', description: 'Create secure passwords', icon: '🔑', category: 'utility' },
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences', icon: '📝', category: 'utility' },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from birth date', icon: '🎂', category: 'utility' },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', icon: '⚖️', category: 'utility' },
  { id: 'color-picker', name: 'Color Picker', description: 'Select and copy color values', icon: '🎨', category: 'utility' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units', icon: '📏', category: 'utility' },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', icon: '{}', category: 'utility' },
];

const ToolPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const foundTool = allTools.find(t => t.id === toolId);
    if (!foundTool) {
      navigate('/tools');
    } else {
      setTool(foundTool);
    }
  }, [toolId, navigate]);

  if (!tool) return null;

  return (
    <ToolModal tool={tool} onClose={() => navigate('/tools')} />
  );
};

export default ToolPage;
