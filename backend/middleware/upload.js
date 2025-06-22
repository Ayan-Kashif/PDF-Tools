const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Supported file types with their MIME types
const SUPPORTED_FILES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
   mp4: 'video/mp4' 
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadDir = path.join(__dirname, '../uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(new Error('Failed to create upload directory'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  try {
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    
    if (!SUPPORTED_FILES[ext]) {
      return cb(new Error(`Unsupported file type: ${ext}`), false);
    }

    if (file.mimetype !== SUPPORTED_FILES[ext]) {
      return cb(new Error(`MIME type doesn't match file extension`), false);
    }

    cb(null, true);
  } catch (err) {
    cb(err, false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { 
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 5 // Maximum 5 files
  }
});

// Error handling wrapper
const handleUpload = (uploadMethod) => {
  return (req, res, next) => {
    uploadMethod(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            error: 'File too large',
            maxSize: '50MB'
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ 
            error: 'Too many files',
            maxFiles: 5
          });
        }
        return res.status(400).json({ 
          error: err.message || 'File upload failed' 
        });
      }
      next();
    });
  };
};

// Export configured upload methods
module.exports = {
  single: (fieldName) => handleUpload(upload.single(fieldName)),
  array: (fieldName, maxCount) => handleUpload(upload.array(fieldName, maxCount)),
  fields: (fields) => handleUpload(upload.fields(fields))
};