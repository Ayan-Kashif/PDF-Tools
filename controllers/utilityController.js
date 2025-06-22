const {
  compressImage,
  convertImage,
  convertAudio,
  compressVideo,
  generateQR,
  generatePassword,
  countWords,
  calculateAge,
  calculateBMI,
  pickColor,
  convertUnits,
  formatJSON,
  textToSpeech,
  speechToText,
  startTimer
} = require('../services/utilityService');

const fs = require('fs');
const path = require('path');

// Helper for file download cleanup
const downloadAndCleanup = (res, filePath, filename) => {
  res.download(filePath, filename, (err) => {
    if (err) console.error('Download error:', err);
    try { fs.unlinkSync(filePath); } 
    catch (cleanupErr) { console.error('Cleanup error:', cleanupErr); }
  });
};

// Image Tools
exports.compressImage = async (req, res) => {
  try {
    const { quality } = req.body;
    const outputPath = await compressImage(req.file, quality);
    downloadAndCleanup(res, outputPath, `compressed_${req.file.originalname}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.convertImage = async (req, res) => {
  try {
    const { format } = req.body;
    const outputPath = await convertImage(req.file, format);
    downloadAndCleanup(res, outputPath, `converted.${format}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Media Tools
exports.convertAudio = async (req, res) => {
  try {
    const { format } = req.body;
    const outputPath = await convertAudio(req.file, format);
    downloadAndCleanup(res, outputPath, `converted.${format}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.compressVideo = async (req, res) => {
  try {
    console.log('Video received:', req.file?.originalname);

    const outputPath = await compressVideo(req.file);

    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="compressed.mp4"',
    });

    const stream = fs.createReadStream(outputPath);
    stream.pipe(res);

    stream.on('end', () => {
      try {
        fs.unlinkSync(outputPath);
        fs.unlinkSync(req.file.path);
      } catch (cleanupErr) {
        console.error('Cleanup error:', cleanupErr);
      }
    });

  } catch (err) {
    console.error('Video compression error:', err);
    res.status(500).json({
      error: 'Video compression failed',
      details: err.message || 'Unknown error'
    });
  }
};

// Generation Tools
exports.generateQR = async (req, res) => {
  try {
    const { text, size } = req.body;
    const qrPath = await generateQR(text, size);
    downloadAndCleanup(res, qrPath, 'qrcode.png');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generatePassword = async (req, res) => {
  try {
    const { length, includeSpecial } = req.body;
    const password = await generatePassword(length, includeSpecial);
    res.json({ password });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Text Tools
exports.countWords = async (req, res) => {
  try {
    const result = await countWords(req.file);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Calculation Tools
exports.calculateAge = async (req, res) => {
  try {
    const { birthdate } = req.body;
    const age = await calculateAge(birthdate);
    res.json({ age });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.calculateBMI = async (req, res) => {
  try {
    const { weight, height, unit } = req.body;
    const bmi = await calculateBMI(weight, height, unit);
    res.json({ bmi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Other Utilities
exports.pickColor = async (req, res) => {
  try {
    const { image } = req.body;
    const colors = await pickColor(image);
    res.json({ colors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.convertUnits = async (req, res) => {
  try {
    const { value, from, to } = req.body;
    const result = await convertUnits(value, from, to);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.formatJSON = async (req, res) => {
  try {
    const { json } = req.body;
    const formatted = await formatJSON(json);
    res.json({ formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Speech Tools
exports.textToSpeech = async (req, res) => {
  try {
    const { text, voice } = req.body;
    const audioPath = await textToSpeech(text, voice);
    downloadAndCleanup(res, audioPath, 'speech.mp3');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.speechToText = async (req, res) => {
  try {
    const text = await speechToText(req.file);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Timer
exports.startTimer = async (req, res) => {
  try {
    const { seconds } = req.body;
    const timer = await startTimer(seconds);
    res.json({ timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};