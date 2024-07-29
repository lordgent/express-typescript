import { Router } from 'express';
import {addNewRole} from '../controllers/roleController';

const router = Router();

router.post('/', addNewRole);

export default router;