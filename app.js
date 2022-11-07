require('dotenv').config();
const express = require('express');
const port = 3000;
const app = express();
const dishesRouter = require("./routes/dishes");
const chefsRouter = require("./routes/chefs");
const notFound = require('./Middleware/not-found');
const errorHandlerMiddleware = require('./Middleware/error-handler');
// connect db
const connectDB = require('./db/connect');

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/", dishesRouter, chefsRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to database");
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
};
 
start();

// MONGO_URI = mongodb+srv://Ankit:123@cluster0.hmx5mxw.mongodb.net/test?authMechanism=SCRAM-SHA-1
// JWT_SECRET = jwtsecret
// JWT_LIFETIME = 30d