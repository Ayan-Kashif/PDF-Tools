const {
  mergePDFs,
  splitPDF,
  compressPDF,
  convertToWord,
  convertToExcel,
  convertToPowerPoint,
  generateQRCode,
  compressImage,
  convertFromWord,
  convertFromExcel,
  convertFromPowerPoint,
  pdfToJpg,
  jpgToPdf,
  organizePDF,
  editPDF,
  rotatePDF,
  unlockPDF,
  protectPDF,
  addPageNumbers,
  addWatermark
} = require('../services/pdfService');

const fs = require('fs');
const fsp = require('fs/promises')
const path = require('path');

const { PassThrough } = require('stream');

// Helper function to clean up files after download
const downloadAndCleanup = async (req,res, filePath, filename) => {
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Download error:', err);
    }
    // Clean up the temporary file
    try {
      console.log(`Received request for ${req.route.path}`);
      console.log('Files received:', req.files?.map(f => f.originalname));
      console.log('Body params:', req.body);
      fsp.unlinkSync(filePath);

    } catch (cleanupErr) {
      console.error('File cleanup error:', cleanupErr);
    }
  });
};

exports.merge = async (req, res) => {
  console.log('Merge request received. Files:', req.files?.map(f => f.originalname));
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    if (!req.files || req.files.length < 2) {
      console.log('Merge failed - insufficient files');
      return res.status(400).json({ error: 'At least 2 files required for merging' });
    }

    const outputPath = await mergePDFs(req.files);
    console.log('Merge successful. Output:', outputPath);
    downloadAndCleanup(req,res, outputPath, 'merged.pdf');
  } catch (err) {
    console.error('Merge error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.split = async (req, res) => {
  let zipPath;
  try {
    console.log(`📥 Received request for ${req.route.path}`);
    console.log('📄 File:', req.file?.originalname);
    console.log('📦 Params:', req.body);

    if (!req.file) {
      throw new Error('No file uploaded');
    }

    zipPath = await splitPDF(req.file);
    return downloadAndCleanup(req,res, zipPath, 'split_pages.zip');
  } catch (err) {
    console.error('❌ Split error:', err);
    res.status(500).json({ error: err.message || 'Failed to split PDF' });
  } finally {
    // Attempt cleanup of uploaded PDF even if error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (e) => {
        if (e) console.error('🧹 Cleanup error (uploaded file):', e.message);
      });
    }
  }

};

//QR CODE GENERATOR

exports.qrCode = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required to generate QR code' });
    }

    const outputPath = await generateQRCode(text);
    await downloadAndCleanup(req,res, outputPath, 'qr-code.png');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.compress = async (req, res) => {
  try {
    console.log(`📥 Received request for ${req.route.path}`);
    console.log('📄 File:', req.file?.originalname);
    console.log('⚙️ Quality:', req.body?.quality);

    const { quality } = req.body;
    const outputPath = await compressPDF(req.file, quality);
    downloadAndCleanup(req,res, outputPath, 'compressed.pdf');
  } catch (err) {
    console.error('❌ Compression Error:', err);
    res.status(500).json({ error: err.message || 'Failed to compress PDF' });
  }
};


//compress image
exports.compressImg = async (req, res) => {
  let outputPath;
  try {
    if (!req.file) {
      throw new Error('No image uploaded');
    }

    const { quality } = req.body;
    outputPath = await compressImage(req.file, quality);

    const filename = `compressed${path.extname(outputPath)}`;
    await downloadAndCleanup(req,res, outputPath, filename);
  } catch (err) {
    console.error('Image compression controller error:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.toWord = async (req, res) => {
  let outputPath;
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    outputPath = await convertToWord(req.file);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${req.file.originalname.replace('.pdf', '')}.docx"`
    });

    // Promise-based streaming
    const fileHandle = await fsp.open(outputPath);
    const readStream = fileHandle.createReadStream();

    const passThrough = new PassThrough();
    readStream.pipe(passThrough).pipe(res);

    await new Promise((resolve, reject) => {
      passThrough.on('finish', resolve);
      passThrough.on('error', reject);
      res.on('error', reject);
    });

  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({
      error: 'Conversion failed',
      details: err.message
    });
  } finally {
    // Cleanup with proper error handling
    const cleanup = async (filePath) => {
      try {
        if (filePath) await fsp.unlink(filePath);
      } catch (err) {
        console.error(`Cleanup failed for ${filePath}:`, err);
      }
    };



    await Promise.all([
      cleanup(outputPath),
      cleanup(req.file?.path)
    ]);
  }
};
const CONVERTED_DIR = path.join(__dirname, '../converted');
exports.toPowerPoint = async (req, res) => {
  if (!req.file?.path) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const outputPath = await convertToPowerPoint(req.file);

    console.log('📁 Streaming file:', outputPath);
    console.log('📁 File exists before stream:', fs.existsSync(outputPath));
    const fileName = 'converted.pptx';
    // Set headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`
    );


    const stream = fs.createReadStream(outputPath);
    stream.pipe(res);

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).end();
    });

    stream.on('close', () => {
      // Delete files *after* streaming
      try {
        if (req.file?.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
        console.log('🧹 Cleanup complete');
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    });
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).send(err.message);
  }
};

exports.fromWord = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('File received:', req.file); // Now using req.file (single file)
    console.log('Body params:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const outputPath = await convertFromWord(req.file);
    downloadAndCleanup(req,res, outputPath, 'converted.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toExcel = async (req, res) => {
  let outputPath;
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('File received:', req.file?.originalname);
    console.log('Body params:', req.body);

    if (!req.file) {
      throw new Error('No file uploaded');
    }
    if (!req.file || !req.file.path) {
      console.error("No file received or file.path is missing");
      return res.status(400).json({ error: 'No file uploaded or file path missing' });
    }

    outputPath = await convertToExcel(req.file); // you must define this service function

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${req.file.originalname.replace('.pdf', '')}.xlsx"`
    });


    const readStream = (await fsp.open(outputPath)).createReadStream();
    const passThrough = new PassThrough();
    readStream.pipe(passThrough).pipe(res);

    await new Promise((resolve, reject) => {
      passThrough.on('finish', resolve);
      passThrough.on('error', reject);
      res.on('error', reject);
    });

  } catch (err) {
    console.error('PDF to Excel Conversion Error:', err);
    res.status(500).json({ error: err.message || 'Conversion failed' });
  } finally {
    // Cleanup
    const cleanup = async (filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) {
          await fsp.unlink(filePath);
        }
      } catch (e) {
        console.error(`Cleanup failed for ${filePath}:`, e);
      }
    };

    await Promise.all([
      cleanup(outputPath),
      cleanup(req.file?.path)
    ]);
  }
};

exports.fromExcel = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    const outputPath = await convertFromExcel(req.file);
    downloadAndCleanup(req,res, outputPath, 'converted.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.fromPowerPoint = async (req, res) => {
  let outputPath;
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));

    outputPath = await convertFromPowerPoint(req.file);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="converted.pdf"`
    });

    const stream = (await fsp.open(outputPath)).createReadStream();
    stream.pipe(res);

    stream.on('close', async () => {
      try {
        await fsp.unlink(outputPath);
        await fsp.unlink(req.file.path);
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    });

  } catch (err) {
    console.error('PowerPoint to PDF conversion failed:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.toJpg = async (req, res) => {
  let zipPath;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert PDF to JPG (returns path to ZIP)
    zipPath = await pdfToJpg(req.file.path, req.file.originalname);

    // Verify ZIP exists and is valid
    if (!fs.existsSync(zipPath)) {
      throw new Error('ZIP file was not created');
    }

    // Verify it's actually a ZIP file
    const fileBuffer = fs.readFileSync(zipPath);
    if (fileBuffer.slice(0, 2).toString() !== 'PK') {
      throw new Error('Output file is not a valid ZIP');
    }

    // Set proper headers - crucial for browser
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${path.parse(req.file.originalname).name}_converted.zip"`,
      'Content-Length': fs.statSync(zipPath).size
    });

    // Stream the actual ZIP file
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);

    fileStream.on('error', (err) => {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to send file' });
      }
    });

    fileStream.on('end', () => {
      // Cleanup only after successful stream
      try {
        fs.unlinkSync(zipPath);
        fs.unlinkSync(req.file.path);
      } catch (cleanupErr) {
        console.error('Cleanup error:', cleanupErr);
      }
    });

  } catch (err) {
    console.error('Conversion error:', err);

    // Cleanup any partial files
    if (zipPath && fs.existsSync(zipPath)) fsp.unlinkSync(zipPath);
    if (req.file?.path) fsp.unlinkSync(req.file.path);

    res.status(500).json({
      error: 'Failed to convert PDF to JPG',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Separate cleanup function
function cleanupFile(filePath) {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fsp.unlinkSync(filePath);
      console.log(`Cleaned up: ${filePath}`);
    } catch (err) {
      console.error('Cleanup failed:', filePath, err);
    }
  }
}
exports.fromJpg = async (req, res) => {
  let outputPath;
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No JPG files uploaded' });
    }

    outputPath = await jpgToPdf(req.files);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=converted.pdf',
    });

    const stream = (await fsp.open(outputPath)).createReadStream();
    stream.pipe(res);

    stream.on('close', async () => {
      try {
        await fs.unlink(outputPath);
        for (const file of req.files) {
          await fs.unlink(file.path);
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    });

  } catch (err) {
    console.error('Conversion error:', err);
    res.status(500).json({ error: 'Failed to convert JPGs to PDF' });
  }
};

exports.organize = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('File received:', req.file?.originalname);
    console.log('Body params:', req.body);

    const raw = req.body.pageOrder;

    // Normalize it: if it's an array, take the first item
    const pageOrderString = Array.isArray(raw) ? raw[0] : raw;

    // Now split it into an array of numbers
    const pageOrder = pageOrderString.split(',').map(Number);


    const outputPath = await organizePDF(req.file, pageOrder);
    downloadAndCleanup(req,res, outputPath, 'reorganized.pdf');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.edit = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    const { text, position } = req.body;
    const outputPath = await editPDF(req.file, text, position);
    downloadAndCleanup(req,res, outputPath, 'edited.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rotate = async (req, res) => {
  try {
    console.log(`Received request for ${req.path}`);
    console.log('File received:', req.file?.originalname);
    console.log('Body params:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Get and validate angle parameter
    let angle = 90; // Default value
    if (req.body.angle !== undefined) {
      angle = parseInt(req.body.angle, 10);
      if (isNaN(angle)) {
        return res.status(400).json({ error: 'Angle must be a number' });
      }
    }

    const outputPath = await rotatePDF(req.file, angle);

    // Set proper headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="rotated.pdf"');

    // Stream the file
    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res);

    // Cleanup after streaming
    fileStream.on('end', () => {
      fs.unlinkSync(outputPath);
      fs.unlinkSync(req.file.path);
    });

  } catch (err) {
    console.error('Rotation error:', err);
    res.status(500).json({
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};
exports.unlock = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    const { password } = req.body;
    const outputPath = await unlockPDF(req.file, password);
    downloadAndCleanup(req,res, outputPath, 'unlocked.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.protect = async (req, res) => {
  // Validate request
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }

  if (!req.body.password) {
    // Clean up uploaded file if password is missing
    if (req.file.path) {
      try {
        fsp.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }
    return res.status(400).json({
      success: false,
      error: 'Password is required'
    });
  }

  // Process PDF
  const result = await protectPDF(req.file, req.body.password);

  if (!result.success) {
    // Clean up uploaded file on failure
    try {
      if (req.file.path) fsp.unlinkSync(req.file.path);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    return res.status(500).json({
      success: false,
      error: result.error || 'Failed to protect PDF'
    });
  }

  // Send the protected file
  res.download(result.path, result.filename, (err) => {
    // Clean up both original and protected files
    try {
      if (req.file.path) fs.unlinkSync(req.file.path);
      if (result.path) fs.unlinkSync(result.path);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    if (err) {
      console.error('Download error:', err);
    }
  });
};


exports.unlock = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  if (!req.body.password) {
    if (req.file.path) fsp.unlinkSync(req.file.path);
    return res.status(400).json({ success: false, error: 'Password is required' });
  }

  const result = await unlockPDF(req.file, req.body.password);

  if (!result.success) {
    try { if (req.file.path) fsp.unlinkSync(req.file.path); } catch { }
    return res.status(500).json({ success: false, error: result.error || 'Failed to unlock PDF' });
  }

  res.download(result.path, result.filename, (err) => {
    try {
      if (req.file.path) fsp.unlinkSync(req.file.path);
      if (result.path) fsp.unlinkSync(result.path);
    } catch { }
    if (err) console.error('Download error:', err);
  });
};

exports.addNumbers = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    const outputPath = await addPageNumbers(req.file);
    downloadAndCleanup(req,res, outputPath, 'numbered.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.addNumbers = async (req, res) => {
//   try {
//     console.log(`Received request for ${req.route.path}`);
//     console.log('File received:', req.file?.originalname);
//     console.log('Body params:', req.body);

//     // Validate input more thoroughly
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     if (req.file.mimetype !== 'application/pdf') {
//       return res.status(400).json({ error: 'Only PDF files are accepted' });
//     }

//     if (!req.file.path) {
//       return res.status(400).json({ error: 'Uploaded file has no path' });
//     }

//     // Process the PDF with additional error handling
//     const outputPath = await addPageNumbers(req.file);

//     if (!outputPath) {
//       throw new Error('PDF processing failed - no output generated');
//     }

//     downloadAndCleanup(res, outputPath, 'numbered.pdf');

//   } catch (err) {
//     console.error('Error in addNumbers:', err);
//     res.status(500).json({ 
//       error: 'Failed to add page numbers',
//       details: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// };


exports.watermark = async (req, res) => {
  try {
    console.log(`Received request for ${req.route.path}`);
    console.log('Files received:', req.files?.map(f => f.originalname));
    console.log('Body params:', req.body);
    const { text } = req.body;
    const outputPath = await addWatermark(req.file, text);
    downloadAndCleanup(req,res, outputPath, 'watermarked.pdf');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};