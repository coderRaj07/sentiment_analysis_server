const multer = require('multer');
const File = require('../models/File');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (['audio/', 'video/', 'application/pdf', 'image/png'].some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
}).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const { file } = req;
    try {
      const newFile = new File({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
        user: req.user._id,
      });
      await newFile.save();
      res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error });
    }
  });
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate('user', 'username');
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    if (file.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving files', error });
  }
}
