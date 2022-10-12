import { Router } from 'express';

import * as authController from './controllers/auth';

const router = Router();


// Auth routes
router.get('/auth/welcome', authController.welcome);

export default router;
