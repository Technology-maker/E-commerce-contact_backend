import express from 'express'
import router from './routes/Message.routes.js'
import dotenv from "dotenv";
import cors from "cors";
const app = express()

dotenv.config()

const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Allow frontend origin
// Allowlist (use origin without path)
const allowedOrigins = [
    "https://e-commerce-app-mu-flax.vercel.app/contact",
    "http://localhost:5173",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser or same-origin requests
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
}));


app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Your backend is running !');
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/api`)
})
