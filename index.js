import express from "express";
import router from "./routes/Message.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "https://e-commerce-app-mu-flax.vercel.app",
        "e-commerce-app-git-main-technology-makers-projects.vercel.app",
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.options("*", cors());

app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Backend running");
});

export default app;
