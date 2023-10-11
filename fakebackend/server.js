import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// import tf from '@tensorflow/tfjs-node';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mukaddimrahi:AAbb77ccdd@cluster0.dgnowa4.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api', authRoutes);
/*
// TensorFlow model setup
const modelPath = './model'; // Adjust the path to your H5 model file

const loadModel = async () => {
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  return model;
};

const runInference = async (imageBuffer, model) => {
  const imageTensor = tf.node.decodeImage(imageBuffer);
  const predictions = model.predict(imageTensor);
  return predictions.array();
};

// Uploads folder setup for multer
const upload = multer({ dest: 'uploads/' });

// Route for handling image uploads and predictions
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;
    const model = await loadModel();
    const imageBuffer = await fs.promises.readFile(file.path);

    const predictions = await runInference(imageBuffer, model);

    res.json({ predictions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});*/

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
