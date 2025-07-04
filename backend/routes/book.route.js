import express from 'express';

// import { generate } from '../services/openaiAPI';

// creating a route in routes/book.route.js means you're defining a URL path and saying what should happen when that path is requested.

import { generateLooksForBook } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', generateLooksForBook);

export default router;