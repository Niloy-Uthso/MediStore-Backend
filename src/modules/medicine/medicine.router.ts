import express, { Router } from 'express';

const router = express.Router();

router.post('/', (req, res) => {
res.send('Create a new medicine');
})
 
export const medicineRouter:Router = router;
