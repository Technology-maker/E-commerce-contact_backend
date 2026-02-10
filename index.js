import express from 'express'
import router from './routes/Message.routes.js'
import dotenv from "dotenv";
import cors from "cors";
const app = express()

dotenv.config()

const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Allow frontend origin
app.use(cors({
    origin: ["https://e-commerce-app-mu-flax.vercel.app/contact", "http://localhost:5173"],   // your React app URL
    methods: ["GET", "POST"],
    credentials: true
}));


app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Your backend is running !');
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/api`)
})
