import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import booksRouter from './routes/booksRoute.js';


dotenv.config();

const port = process.env.PORT ;
const mongoUrl = process.env.MONGOURL;
const app = express();

app.use(express.json());
app.use(booksRouter);

// Middleware for handling errors
app.use((err, req, res, next) => {
    res.status(400).send("Error Message: " + err.message);
});

connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database🫙✅");
    app.listen(port, () => {
        console.log(`Listening on port ${port}....`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use.`);
            process.exit(1);
        } else {
            console.error("Server error:", err);
        }
    });
    
})
.catch((error) => {
    console.error("Database connection error:", error);
});
