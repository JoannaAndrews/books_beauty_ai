import express from "express";

import app from './config/app.js';


// const app = express();

// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// const app = require('./config/app');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


