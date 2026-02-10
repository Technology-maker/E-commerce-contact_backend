import express from 'express'
import MessageController from "../controller/Message.controller.js"
const router = express.Router();


router.post('/support', MessageController);

router.get('/', (req, res) => {
    res.send('Your backend is running !');
})

export default router;

