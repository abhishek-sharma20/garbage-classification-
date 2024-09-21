// const express = require('express');
// const bodyParser = require('body-parser');
// const tf = require('@tensorflow/tfjs-node');  // TensorFlow.js for Node.js

// const app = express();
// app.use(bodyParser.json());

// let model;

// // Load the pre-trained model
// const loadModel = async () => {
//   model = await tf.loadLayersModel('model\Garbage_classification.h5');
//   console.log('Model loaded');
// };

// // Call loadModel when the server starts
// loadModel();

// app.post('/predict', async (req, res) => {
//   try {
//     const { input } = req.body;

//     // Preprocess input as necessary
//     const inputData = tf.tensor([input]);  // Input data shaped as necessary for your model
    
//     // Make a prediction
//     const prediction = model.predict(inputData);

//     // Convert tensor to array and send back prediction
//     const result = await prediction.array();
//     res.json({ predictions: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// 
// const express = require('express');
// const multer = require('multer');
// const tf = require('@tensorflow/tfjs-node');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const upload = multer({ dest: 'uploads/' }); 

// let model;

// const loadModel = async () => {
//   try {
//     model = await tf.loadLayersModel('file://model/tfjs_model/model.json');  
//     console.log('Model loaded successfully');
//   } catch (error) {
//     console.error('Error loading model:', error);
//   }
// };

// loadModel();

// app.post('/predict', upload.single('image'), async (req, res) => {
//   try {
//     if (!model) {
//       return res.status(500).json({ error: 'Model not loaded yet' });
//     }

//     const imagePath = path.join(__dirname, req.file.path);
//     const imageBuffer = fs.readFileSync(imagePath);

//     const imageTensor = tf.node.decodeImage(imageBuffer)
//       .resizeBilinear([224, 224])
//       .toFloat()
//       .div(255.0)
//       .expandDims();

//     const prediction = model.predict(imageTensor);
//     const result = await prediction.array();
//     const predictedClass = result[0].indexOf(Math.max(...result[0]));

//     fs.unlinkSync(imagePath);

//     tf.dispose([imageTensor, prediction]);

//     res.json({ predictedClass });
//   } catch (error) {
//     console.error('Error during prediction:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

let model;

const loadModel = async () => {
  try {
    model = await tf.loadLayersModel('file://model/Garbage_classification.h5');
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

loadModel();
app.get('/abhi',(req,res)=>{
    res.send("Hello from the backend")
})

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!model) {
      return res.status(500).json({ error: 'Model not loaded yet' });
    }

    const imagePath = path.join(__dirname, req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);

    const imageTensor = tf.node.decodeImage(imageBuffer)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims();

    const prediction = model.predict(imageTensor);

    const result = await prediction.array();
    const predictedClass = result[0].indexOf(Math.max(...result[0]));

    fs.unlinkSync(imagePath);

    tf.dispose([imageTensor, prediction]);

    res.json({ predictedClass });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
