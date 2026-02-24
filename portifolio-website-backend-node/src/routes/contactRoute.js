import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/', submitContact, contactLimiter);

export default router;