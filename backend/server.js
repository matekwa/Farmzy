const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routeURL = require('./routes/routes');
const multer = require('multer'); // Import multer

dotenv.config();

const storage = multer.memoryStorage(); // Store uploaded files in memory (you can customize this)
const upload = multer({ storage });

app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDb connected successfully'))
  .catch((error) => console.log(error));

app.use(express.json());

app.use('/api', routeURL);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
