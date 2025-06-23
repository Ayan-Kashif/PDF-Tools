const { PDFDocument: PDFLibDocument, rgb, degrees } = require('pdf-lib'); // renamed PDFDocument to PDFLibDocument
const PDFDocument = require('pdfkit'); // renamed to avoid conflict

// const PDFDocument = require('pd-lib'); // ✅ Correct for writing PDFs from scratch
const fss = require('fs');
const fs = require('fs');
const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const JSZip = require('jszip');
const { XMLParser } = require('fast-xml-parser');

const { fromPath } = require("pdf2pic");
const pdfjsLib = require('pdfjs-dist');
const ExcelJS = require('exceljs');


const { v4: uuidv4 } = require('uuid');
const mammoth = require("mammoth");
const PptxGenJS = require('pptxgenjs');
const { StandardFonts } = require("pdf-lib");
const pdf = require('pdf-parse');
// const poppler = require('pdf-poppler');
const fsp = require('fs/promises');

const AdmZip = require('adm-zip');

const { exec } = require('child_process');
const { Document, Paragraph, Packer, TextRun } = require('docx');

const { PassThrough } = require('stream');
const UPLOAD_DIR = path.join(__dirname, '../uploads');
// Base directories
const BASE_DIR = path.join(__dirname, '..');

const OUTPUT_DIR = path.join(BASE_DIR, 'converted');
// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Ensure upload directory exists

// const pdf_table_extractor = require("pdf-table-extractor");



const ensureUploadDir = async () => {
  try {
    await fsp.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create upload dir:', err);
    throw err;
  }
};

// Helper function to load PDF
const loadPdf = async (filePath) => {
  const pdfBytes = await fs.readFileSync(filePath);
  return await PDFLibDocument.load(pdfBytes);
};

// Helper function to save PDF
const savePdf = async (pdfDoc, fileName) => {
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(UPLOAD_DIR, fileName);
  fs.writeFileSync(outputPath, pdfBytes);
  return outputPath;
};

// 1. Merge PDFs
const mergePDFs = async (files) => {
  const mergedPdf = await PDFLibDocument.create();

  for (const file of files) {
    const pdfDoc = await loadPdf(file.path);
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }

  return await savePdf(mergedPdf, `merged-${uuidv4()}.pdf`);
};

// 2. Split PDF
const splitPDF = async (file) => {
  const pdfBytes = fs.readFileSync(file.path);
  const pdfDoc = await PDFLibDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();

  const zip = new AdmZip();
  const tempDir = path.join(UPLOAD_DIR, `split_temp_${uuidv4()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFLibDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const newPdfBytes = await newPdf.save();
    const pagePath = path.join(tempDir, `page_${i + 1}.pdf`);
    fs.writeFileSync(pagePath, newPdfBytes);

    zip.addLocalFile(pagePath);
  }

  const zipPath = path.join(UPLOAD_DIR, `split_${uuidv4()}.zip`);
  zip.writeZip(zipPath);

  // Cleanup temp dir
  fs.rmSync(tempDir, { recursive: true, force: true });

  return zipPath;
};


// 3. Compress PDF (simplified)
const compressPDF = async (file, quality = 75) => {
  if (!file || !file.path) {
    throw new Error('No file provided for compression');
  }

  const inputPath = file.path;
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFLibDocument.load(pdfBytes);

  const outputPdf = await PDFLibDocument.create();
  const pages = await outputPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
  pages.forEach(page => outputPdf.addPage(page));

  // 📝 Note: pdf-lib does not natively support compression (like images/fonts).
  // This is a structural rebuild, which slightly reduces size.
  const compressedBytes = await outputPdf.save({ useObjectStreams: true });

  const outputPath = path.join(__dirname, '../converted', `compressed-${uuidv4()}.pdf`);
  fs.writeFileSync(outputPath, compressedBytes);

  return outputPath;
};


//Compress image

const compressImage = async (file, quality = 70) => {
  try {
    if (!file?.path) throw new Error('No image file provided');

    const ext = path.extname(file.originalname).toLowerCase();
    const outputPath = path.join(UPLOAD_DIR, `compressed-${uuidv4()}${ext}`);

    await sharp(file.path)
      .jpeg({ quality: Number(quality) }) // works for .jpg/.jpeg
      .png({ quality: Number(quality) })  // works for .png
      .toFile(outputPath);

    return outputPath;
  } catch (err) {
    console.error('Image compression error:', err);
    throw new Error('Failed to compress image');
  }
};


// 4. PDF to Text (simulates Word conversion)


const convertToWord = async (file) => {
  try {
    await ensureUploadDir();

    if (!file?.path) {
      throw new Error('No file provided');
    }

    const pdfData = await fsp.readFile(file.path); // Use fsp
    const { text } = await pdf(pdfData);

    const doc = new Document({
      sections: [{
        children: [new Paragraph({ children: [new TextRun(text)] })]
      }]
    });

    const outputPath = path.join(UPLOAD_DIR, `converted-${uuidv4()}.docx`);
    const buffer = await Packer.toBuffer(doc);
    await fsp.writeFile(outputPath, buffer); // Use fsp

    return outputPath;
  } catch (err) {
    console.error('Conversion error:', err);
    throw new Error(`Failed to convert PDF: ${err.message}`);
  }
};

// Pdf to Excel

// function extractTableFromPdf(pdfPath) {
//   return new Promise((resolve, reject) => {
//     pdf_table_extractor(pdfPath,
//       result => resolve(result.pageTables),
//       error => reject(error)
//     );
//   });
// }


const convertToExcel = async (file) => {
  try {
    if (!file?.path) throw new Error('No file provided');

    const pdfData = await fsp.readFile(file.path);
    const { text } = await pdf(pdfData); // `text` is a plain string of all PDF content

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("PDF Extracted Text");

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    for (const line of lines) {
      worksheet.addRow([line]); // Each line in a new row
    }

    const outputPath = path.join(
      __dirname,
      '../uploads',
      `converted-${uuidv4()}.xlsx`
    );

    await workbook.xlsx.writeFile(outputPath);
    return outputPath;
  } catch (err) {
    console.error('Excel conversion error:', err);
    throw new Error(`Failed to convert PDF to Excel: ${err.message}`);
  }
};




//pdf to ppt

const CONVERTED_DIR = path.join(__dirname, '../converted');

const getPDFPageCount = async (pdfPath) => {
  const pdfjsLib = require("pdfjs-dist");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  return doc.numPages;
};



const convertToPowerPoint = async (pdfFile) => {
  try {
    const outputPath = path.join(CONVERTED_DIR, `converted-${uuidv4()}.pptx`);

    if (!fs.existsSync(CONVERTED_DIR)) {
      fs.mkdirSync(CONVERTED_DIR, { recursive: true });
    }
    const savePath = path.join(__dirname, '../temp_images');
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    const pdfData = await fsp.readFile(pdfFile.path); // Use fsp
    const { text } = await pdf(pdfData);
    console.log(text)


    const pptx = new PptxGenJS();

    // const slide1 = pptx.addSlide();
    // slide1.addText('Converted from PDF', { x: 1, y: 1, fontSize: 24 });

    // const slide2 = pptx.addSlide();
    // slide2.addText(`Original: ${pdfFile.originalname}\nConverted: ${new Date().toISOString()}`, {
    //   x: 1, y: 1, fontSize: 12
    // });

    //convert pdf into imges
    const options = {
      density: 150,
      saveFilename: "page",
      savePath: "./temp_images",
      format: "png",
      width: 1024,
      height: 768
    };

    // Split the text into pages (heuristically by form feed or spacing)
    const pages = text.split(/\f|\n\s*\n/g); // Split by form feed or empty lines


    pages.forEach((pageText, index) => {
      const slide = pptx.addSlide();
      slide.addText(pageText.trim(), {
        x: 0.5,
        y: 0.5,
        w: '90%',
        h: '90%',
        fontSize: 14,
        color: '000000',
        align: 'left',
        lineSpacingMultiple: 1.1,
      });
    });


    const storeAsImage = fromPath(pdfFile.path, options);
    const totalPages = await getPDFPageCount(pdfFile.path); // You’ll define this helper
    for (let i = 1; i <= totalPages; i++) {
      try {
        const pageImage = await storeAsImage(i);
        const slide = pptx.addSlide();
        slide.background = { path: pageImage.path };
      } catch (err) {
        console.error(`❌ Failed to render page ${i}:`, err.message);
      }
    }


    console.log("📝 Output Path:", outputPath);

    await pptx.writeFile({ fileName: outputPath });  // ✅ Reliable in Node.js

    console.log("✅ PPTX saved at:", outputPath);
    return outputPath;
  } catch (err) {
    console.error("Conversion error:", err);
    throw new Error(`PPTX conversion failed: ${err.message}`);
  }
};



// 5. Text to PDF (simulates Word to PDF)



const convertFromWord = async (file) => {
  try {

    // Extract text from Word document
    const { value: text } = await mammoth.extractRawText({
      path: file.path
    });
 

    // Add this before drawing text to clean special characters
    const cleanText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

    // Create PDF
    const pdfDoc = await PDFLibDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // Use a standard font that supports more characters
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText(cleanText, {
      x: 50,
      y: 750,
      size: 12,
      lineHeight: 15,
      font: font,
      maxWidth: 500
    });

    return await savePdf(pdfDoc, `converted-${uuidv4()}.pdf`);
  } catch (err) {
    console.error("Conversion error:", err);
    throw new Error("Failed to convert Word document to PDF");
  }
};


//excel to pdf

const convertFromExcel = async (file) => {
  try {
    if (!file?.path) throw new Error('No file uploaded');

    await ensureUploadDir();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file.path);
    const worksheet = workbook.worksheets[0]; // first sheet

    const outputPath = path.join(OUTPUT_DIR, `converted-${uuidv4()}.pdf`);
    const pdfDoc = new PDFDocument({ margin: 30 });

    const stream = fss.createWriteStream(outputPath);
    pdfDoc.pipe(stream);

    pdfDoc.fontSize(14).text('Excel to PDF Conversion', { align: 'center' });
    pdfDoc.moveDown(1);

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const values = row.values.slice(1); // skip index 0
      const line = values.map(cell => String(cell || '')).join(' | ');
      pdfDoc.fontSize(10).text(line);
    });

    pdfDoc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return outputPath;
  } catch (err) {
    console.error('Excel to PDF conversion error:', err);
    throw new Error(`Failed to convert Excel to PDF: ${err.message}`);
  }
};

//Ppt to pdf
async function convertFromPowerPoint(file) {
  if (!file?.path) throw new Error('No file provided');

  const pptxBuffer = await fsp.readFile(file.path);
  const zip = await JSZip.loadAsync(pptxBuffer);
  const parser = new XMLParser();

  const slides = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'));

  const outputPath = path.join(OUTPUT_DIR, `converted-${uuidv4()}.pdf`);
  const doc = new PDFDocument();
  const stream = fss.createWriteStream(outputPath);
  doc.pipe(stream);

  for (let i = 0; i < slides.length; i++) {
    const content = await zip.files[slides[i]].async('string');
    const parsed = parser.parse(content);

    const texts = [];
    const shapes = parsed['p:sld']['p:cSld']['p:spTree']['p:sp'];

    const items = Array.isArray(shapes) ? shapes : [shapes];
    for (const shape of items) {
      const runs = shape?.['p:txBody']?.['a:p'];
      if (runs) {
        const lines = Array.isArray(runs) ? runs : [runs];
        lines.forEach(p => {
          const text = p?.['a:r']?.['a:t'] || p?.['a:fld']?.['a:t'];
          if (text) texts.push(text);
        });
      }
    }

    if (i > 0) doc.addPage();
    doc.fontSize(16).text(`Slide ${i + 1}`, { underline: true }).moveDown();
    if (texts.length) {
      doc.fontSize(12).text(texts.join('\n\n'));
    } else {
      doc.fontSize(12).text('[No text found]');
    }
  }

  doc.end();
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return outputPath;
}


// 6. PDF to JPG

const pdfToJpg = async (pdfPath, originalname) => {
  // Create unique working directory
  const tempDir = path.join(OUTPUT_DIR, `temp_${uuidv4()}`);
  fs.mkdirSync(tempDir, { recursive: true });
  console.log(`Created temp directory: ${tempDir}`);

  try {
    // Convert PDF to JPG
    const opts = {
      format: 'jpeg',
      out_dir: tempDir,
      out_prefix: 'page',
      scale: 1500,
      quality: 90
    };

    console.log(`Starting conversion of: ${pdfPath}`);
    // await poppler.convert(pdfPath, opts);
    console.log('PDF conversion completed');

    // Verify JPG files were created
    const jpgFiles = fs.readdirSync(tempDir)
      .filter(file => file.endsWith('.jpg'))
      .map(file => path.join(tempDir, file));

    console.log(`Found ${jpgFiles.length} JPG files`);
    if (jpgFiles.length === 0) {
      throw new Error('No JPG files were created during conversion');
    }

    // Create ZIP archive
    const zip = new AdmZip();
    jpgFiles.forEach(file => {
      console.log(`Adding to ZIP: ${file}`);
      zip.addLocalFile(file);
    });

    const zipFilename = `${path.parse(originalname).name}_converted.zip`;
    const zipPath = path.join(OUTPUT_DIR, zipFilename);

    console.log(`Writing ZIP to: ${zipPath}`);
    zip.writeZip(zipPath);
    // Add to pdfService.js

    const zipEntries = zip.getEntries();
    console.log(`ZIP contains ${zipEntries.length} files:`);
    zipEntries.forEach(entry => {
      console.log(`- ${entry.name} (${entry.header.size} bytes)`);
      if (!entry.name.endsWith('.jpg')) {
        console.warn('Warning: Non-JPG file found in ZIP:', entry.name);
      }
    });
    // Verify ZIP was created
    if (!fs.existsSync(zipPath)) {
      throw new Error('ZIP file was not created successfully');
    }

    return zipPath;
  } catch (err) {
    console.error('Conversion error:', err);
    throw err;
  } finally {
    // Cleanup temporary directory
    try {
      fs.rmSync(tempDir, { recursive: true });
      console.log(`Cleaned up temp directory: ${tempDir}`);
    } catch (cleanupErr) {
      console.error('Temp directory cleanup error:', cleanupErr);
    }
  }
};



// 7. JPG to PDF
const jpgToPdf = async (files) => {
  await ensureUploadDir();

  const pdfDoc = await PDFLibDocument.create();

  for (const file of files) {
    const imageBytes = await fsp.readFile(file.path);
    const image = await pdfDoc.embedJpg(imageBytes);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await savePdf(pdfDoc, `converted-${uuidv4()}.pdf`);
};

// 8. Organize PDF (Reorder pages)
const organizePDF = async (file, pageOrder) => {
  const pdfDoc = await loadPdf(file.path);
  const newPdf = await PDFLibDocument.create();

  for (const pageNum of pageOrder) {
    const [page] = await newPdf.copyPages(pdfDoc, [pageNum - 1]); // adjust for 0-based index
    newPdf.addPage(page);
  }

  return await savePdf(newPdf, `organized-${uuidv4()}.pdf`);
};


// 9. Edit PDF (Add text)
const editPDF = async (file, text, position = 'center') => {
  const pdfDoc = await loadPdf(file.path);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    let x, y;

    switch (position) {
      case 'top': x = width / 2; y = height - 50; break;
      case 'bottom': x = width / 2; y = 50; break;
      default: x = width / 2; y = height / 2;
    }

    page.drawText(text, {
      x,
      y,
      size: 30,
      color: rgb(0.95, 0.1, 0.1),
    });
  }

  return await savePdf(pdfDoc, `edited-${uuidv4()}.pdf`);
};

// 10. Rotate PDF

const rotatePDF = async (file, angle = 90) => {
  // Convert angle to number if it's a string
  const rotationAngle = Number(angle);

  // Validate the angle
  if (isNaN(rotationAngle)) {
    throw new Error('Rotation angle must be a number');
  }

  const pdfDoc = await loadPdf(file.path);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    page.setRotation(degrees(rotationAngle));
  }

  return await savePdf(pdfDoc, `rotated-${uuidv4()}.pdf`);
};

// 11. Add Watermark
const addWatermark = async (file, text) => {
  const pdfDoc = await loadPdf(file.path);
  const pages = pdfDoc.getPages();

  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - 50,
      y: height / 2,
      size: 48,
      color: rgb(0.8, 0.8, 0.8),
      opacity: 0.5,
      rotate: degrees(-45),
    });
  });

  return await savePdf(pdfDoc, `watermarked-${uuidv4()}.pdf`);
};


const addPageNumbers = async (file) => {
  const pdfDoc = await loadPdf(file.path);
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    page.drawText(`Page ${index + 1}`, {
      x: width - 50,
      y: 30,
      size: 12,
      color: rgb(0, 0, 0),
    });
  });

  return await savePdf(pdfDoc, `numbered-${uuidv4()}.pdf`);
};

// const addPageNumbers = async (file) => {
//   let pdfDoc;
//   try {
//     // Load PDF with additional validation
//     pdfDoc = await loadPdf(file.path);
//     if (!pdfDoc || !pdfDoc.getPages) {
//       throw new Error('Invalid PDF document loaded');
//     }

//     const pages = pdfDoc.getPages();
//     if (!pages || pages.length === 0) {
//       throw new Error('PDF contains no pages');
//     }

//     // Get font once and reuse
//     const font = await pdfDoc.embedFont('Helvetica');

//     // Add page numbers
//     pages.forEach((page, index) => {
//       if (!page || !page.drawText || !page.getSize) {
//         throw new Error(`Invalid PDF page at index ${index}`);
//       }

//       const { width, height } = page.getSize();
//       if (!width || !height) {
//         throw new Error(`Invalid page size at index ${index}`);
//       }

//       page.drawText(`Page ${index + 1}`, {
//         x: width - 50,
//         y: 30,
//         size: 12,
//         color: rgb(0, 0, 0),
//         font: font
//       });
//     });

//     const outputFilename = `numbered-${uuidv4()}.pdf`;
//     return await savePdf(pdfDoc, outputFilename);

//   } catch (err) {
//     console.error('Error in addPageNumbers:', err);
//     throw err; // Re-throw for the main handler
//   }
// };


//protect pdf
// const protectPDF=async (fileObject, password)=> {
//   try {
//     // 1. Validate file object structure
//     if (!fileObject || typeof fileObject !== 'object') {
//       throw new Error('Invalid file object');
//     }

//     // 2. Validate path exists and is accessible
//     if (!fileObject.path || typeof fileObject.path !== 'string') {
//       throw new Error('File path must be a string');
//     }

//     if (!fs.existsSync(fileObject.path)) {
//       throw new Error('File does not exist at specified path');
//     }

//     // 3. Create output path
//     const outputDir = path.join(__dirname, '../../protected');
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     const outputPath = path.join(
//       outputDir,
//       `protected_${Date.now()}_${fileObject.originalname}`
//     );

//     // 4. Read and process the PDF
//     const pdfBytes = fs.readFileSync(fileObject.path);
//     const pdfDoc = await PDFDocument.load(pdfBytes);

//     await pdfDoc.encrypt({
//       userPassword: password,
//       ownerPassword: password,
//       permissions: {
//         printing: 'allow',
//         modifying: false,
//         copying: false,
//         annotating: false
//       }
//     });

//     const protectedPdfBytes = await pdfDoc.save();
//     fs.writeFileSync(outputPath, protectedPdfBytes);

//     return {
//       success: true,
//       path: outputPath,
//       filename: path.basename(outputPath)
//     };
//   } catch (error) {
//     console.error('PDF Protection Error:', error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// }


const protectPDF = async (fileObject, password) => {
  try {
    if (!fileObject || typeof fileObject !== 'object') {
      throw new Error('Invalid file object');
    }

    if (!fileObject.path || typeof fileObject.path !== 'string') {
      throw new Error('File path must be a string');
    }

    if (!fs.existsSync(fileObject.path)) {
      throw new Error('File does not exist at specified path');
    }

    const outputDir = path.join(__dirname, '../../protected');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(
      outputDir,
      `protected_${Date.now()}_${fileObject.originalname}`
    );
    const qpdfPath = `"C:\\Program Files\\qpdf 12.2.0\\bin\\qpdf.exe"`;
    const command = `${qpdfPath} --encrypt ${password} ${password} 256 -- "${fileObject.path}" "${outputPath}"`;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('qpdf error:', error.message);
          return resolve({ success: false, error: error.message });
        }

        resolve({
          success: true,
          path: outputPath,
          filename: path.basename(outputPath)
        });
      });
    });
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};


//QR code Generator

const generateQRCode = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required to generate QR code.' });
    }

    const qrImage = await QRCode.toDataURL(text);
    res.json({ image: qrImage }); // base64 string
  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({
      error: 'QR generation failed',
      details: err?.message || 'Unknown error'
    });
  }
};
// unlock pdf
const unlockPDF = async (fileObject, password) => {
  try {
    if (!fileObject || typeof fileObject !== 'object') {
      throw new Error('Invalid file object');
    }

    if (!fileObject.path || typeof fileObject.path !== 'string') {
      throw new Error('File path must be a string');
    }

    if (!fs.existsSync(fileObject.path)) {
      throw new Error('File does not exist at specified path');
    }

    const outputDir = path.join(__dirname, '../../unlocked');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(
      outputDir,
      `unlocked_${Date.now()}_${fileObject.originalname}`
    );

    const qpdfPath = `"C:\\Program Files\\qpdf 12.2.0\\bin\\qpdf.exe"`;
    const command = `${qpdfPath} --password=${password} --decrypt "${fileObject.path}" "${outputPath}"`;

    return new Promise((resolve) => {
      exec(command, (error) => {
        if (error) {
          console.error('qpdf unlock error:', error.message);
          return resolve({ success: false, error: error.message });
        }

        resolve({
          success: true,
          path: outputPath,
          filename: path.basename(outputPath)
        });
      });
    });
  } catch (error) {
    console.error('qpdf unlock error:', error.message);

    let userError = 'Failed to unlock PDF';
    if (error.message.includes('invalid password')) {
      userError = 'Invalid password';
    }

  }
};
module.exports = {
  mergePDFs,
  splitPDF,
  compressPDF,
  convertToWord,
  convertToExcel,
  convertFromWord,
  convertToPowerPoint,
  convertFromExcel,
  convertFromPowerPoint,
  pdfToJpg,
  jpgToPdf,
  organizePDF,
  compressImage,
  editPDF,
  generateQRCode,
  protectPDF,
  unlockPDF,
  compressPDF,
  rotatePDF,
  addWatermark,
  addPageNumbers
};
