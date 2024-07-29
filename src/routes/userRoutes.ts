import { Router } from 'express';
import { getUsers, registerUser,loginUser } from '../controllers/userController';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import { authenticateJWT } from '../middlewares/authMiddleware';


const router = Router();

router.get('/',authenticateJWT, authorizeRoles("admin_1"), getUsers);
router.post('/signup', registerUser);
router.post('/signin', loginUser);


export default router;