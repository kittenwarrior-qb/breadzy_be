import express from 'express';

import {getAllCategories, getCategoryById} from '../controllers/category/get.js';
import {createCategory} from '../controllers/category/post.js';


const router = express.Router();

router.get('/', getAllCategories);           
router.get('/:id', getCategoryById);       

router.post('/', createCategory);           


export default router;