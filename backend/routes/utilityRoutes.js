const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const upload = require('../middleware/upload');
const { validateImage, validateFile } = require('../middleware/validation');

// Image Tools
router.post('/compress-image', upload.single('file'), validateImage, utilityController.compressImage);
router.post('/compress-video', upload.single('file'), validateImage, utilityController.compressVideo);
router.post('/convert-image', upload.single('file'), validateImage, utilityController.convertImage);

// Document Tools
// router.post('/word-to-pdf', upload.single('file'), validateFile, utilityController.wordToPdf);
// router.post('/excel-to-pdf', upload.single('file'), validateFile, utilityController.excelToPdf);

// Conversion Tools

router.post('/speech-to-text', upload.single('file'), utilityController.speechToText);

// Generation Tools
router.post('/generate-qr', utilityController.generateQR);
router.post('/generate-password', utilityController.generatePassword);

// Other Utilities
router.post('/count-words', upload.single('file'), utilityController.countWords);
router.post('/calculate-bmi', utilityController.calculateBMI);

module.exports = router;