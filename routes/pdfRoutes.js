const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const upload = require('../middleware/upload');

// Merge PDFs
router.post('/merge', upload.array('files'), pdfController.merge);

// Split PDF
router.post('/split', upload.single('file'), pdfController.split);


router.post('/compress', upload.single('file'), pdfController.compress);
router.post('/toWord', upload.single('file'), pdfController.toWord);
router.post('/fromWord', upload.single('file'), pdfController.fromWord);
router.post('/fromExcel', upload.single('file'), pdfController.fromExcel);
router.post('/fromPowerPoint', upload.single('file'), pdfController.fromPowerPoint);
router.post('/toPowerPoint', upload.single('file'), pdfController.toPowerPoint);
router.post('/toJpg', upload.single('file'), pdfController.toJpg);
router.post('/fromJpg', upload.array('files'), pdfController.fromJpg);
router.post('/organize', upload.single('file'), pdfController.organize);
router.post('/edit', upload.single('file'), pdfController.edit);
router.post('/rotate', upload.single('file'), pdfController.rotate);
router.post('/watermark', upload.single('file'), pdfController.watermark);
router.post('/addNumbers', upload.single('file'), pdfController.addNumbers);
router.post('/protect', upload.single('file'), pdfController.protect);
router.post('/toExcel', upload.single('file'), pdfController.toExcel);
router.post('/unlock', upload.single('file'), pdfController.unlock);
router.post('/compress', upload.single('file'), pdfController.compress);
router.post('/compressImg', upload.single('file'), pdfController.compressImg);
router.post('/qrCode', upload.single('file'), pdfController.qrCode);

module.exports = router; // This exports a Router object