import express from 'express'
import { ListEmployee, AddEmployee, RemoveEmployee, SingleEmployee, EditEmployee } from '../controllers/EmployeeController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const productRouter = express. Router();
productRouter.post('/add',authUser,upload.fields([{name: 'image1',maxCount:1}]), AddEmployee); 
productRouter.post('/edit', upload.fields([{ name: 'image1', maxCount: 1 }]), EditEmployee);
productRouter.post('/remove',authUser, RemoveEmployee);
productRouter.post('/single', SingleEmployee); 
productRouter.get('/list', ListEmployee)
export default productRouter