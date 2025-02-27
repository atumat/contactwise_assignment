import multer from 'multer';
import { processCSV } from '..\..\lib\queue';

const upload = multer({ 
  dest: 'uploads\\',
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.csv$/)) {
      return cb(new Error('Please upload a CSV file'));
    }
    cb(null, true);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await new Promise((resolve) => {
      upload.single('file')(req, res, resolve);
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    await processCSV(req.file.path);
    
    res.status(200).json({ 
      message: 'File uploaded successfully and processing started' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}