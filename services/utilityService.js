const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const qrcode = require('qrcode');
const colorThief = require('colorthief');
const { exec } = require('child_process');
const convert = require('convert-units');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const speech = require('@google-cloud/speech');


const UPLOAD_DIR = path.join(__dirname, '../uploads');

// Initialize Google Cloud clients
const ttsClient = new TextToSpeechClient();
const speechClient = new speech.SpeechClient();

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Image Tools
const compressImage = async (file, quality = 80) => {
  const outputPath = path.join(UPLOAD_DIR, `compressed-${uuidv4()}${path.extname(file.originalname)}`);
  await sharp(file.path)
    .jpeg({ quality })
    .png({ quality })
    .toFile(outputPath);
  return outputPath;
};





const compressVideo = (inputFile) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(UPLOAD_DIR, `compressed-${uuidv4()}.mp4`);

    ffmpeg(inputFile.path)
      .outputOptions([
        '-vcodec libx264',       // Use H.264 codec
        '-crf 28',               // Quality factor (lower = better quality)
        '-preset veryfast',      // Compression speed
        '-acodec aac',           // Audio codec
        '-movflags +faststart'   // Web optimization
      ])
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .save(outputPath);
  });
};




const convertImage = async (file, format) => {
  const outputPath = path.join(UPLOAD_DIR, `converted-${uuidv4()}.${format}`);
  await sharp(file.path)
    .toFormat(format)
    .toFile(outputPath);
  return outputPath;
};

// Media Tools
const convertAudio = async (file, format) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(UPLOAD_DIR, `converted-${uuidv4()}.${format}`);
    ffmpeg(file.path)
      .toFormat(format)
      .on('error', reject)
      .on('end', () => resolve(outputPath))
      .save(outputPath);
  });
};



// Generation Tools
const generateQR = async (text, size = 300) => {
  const qrPath = path.join(UPLOAD_DIR, `qr-${uuidv4()}.png`);
  await qrcode.toFile(qrPath, text, {
    width: size,
    color: {
      dark: '#42f8f5',
      light: '#1e293b'
    }
  });
  return qrPath;
};

const generatePassword = (length = 12, includeSpecial = true) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = includeSpecial ? chars + specialChars : chars;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  return password;
};

// Text Tools
const countWords = async (file) => {
  const content = fs.readFileSync(file.path, 'utf-8');
  const words = content.split(/\s+/).filter(word => word.length > 0);
  const chars = content.replace(/\s/g, '').length;
  return { words: words.length, characters: chars };
};

// Calculation Tools
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const calculateBMI = (weight, height, unit = 'metric') => {
  if (unit === 'imperial') {
    // Convert lbs to kg and inches to meters
    weight = weight * 0.453592;
    height = height * 0.0254;
  }
  return (weight / (height * height)).toFixed(1);
};

// Color Tools
const pickColor = async (imagePath) => {
  return await colorThief.getPalette(imagePath, 5);
};

// Unit Conversion
const convertUnits = (value, from, to) => {
  return convert(value).from(from).to(to);
};

// JSON Formatter
const formatJSON = (json) => {
  return JSON.stringify(JSON.parse(json), null, 2);
};

// Speech Tools
const textToSpeech = async (text, voice = 'en-US-Wavenet-D') => {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', name: voice },
    audioConfig: { audioEncoding: 'MP3' }
  };

  const [response] = await ttsClient.synthesizeSpeech(request);
  const outputPath = path.join(UPLOAD_DIR, `tts-${uuidv4()}.mp3`);
  fs.writeFileSync(outputPath, response.audioContent, 'binary');
  return outputPath;
};

const speechToText = async (audioFile) => {
  const audio = {
    content: fs.readFileSync(audioFile.path).toString('base64')
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  };

  const [response] = await speechClient.recognize({ audio, config });
  return response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
};

// Timer
const startTimer = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'completed', seconds });
    }, seconds * 1000);
  });
};

module.exports = {
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
};