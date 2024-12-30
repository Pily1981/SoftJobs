import { Router } from 'express';
import { usersController } from '../controllers/user.controller.js';
import { verifyCredentials, verifyToken } from '../middlewares/user.middleware.js';

const router = Router();

router.get('/usuarios', verifyToken, usersController.getUser);
router.post('/usuarios', usersController.registerUser);
router.post('/login', verifyCredentials, usersController.loginUser);
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Pagina no encontrada' });
});

export default router;

