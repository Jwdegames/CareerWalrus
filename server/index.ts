// Init Express App
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Allow communication with React Application
const cors = require("cors");
app.use(cors());

// Database Connect
mongoose.connect("mongodb+srv://Amariwest19:123@cluster0.enwzq.mongodb.net/WalrusDatabase?retryWrites=true&w=majority");

// Allows requests that have a body.
app.use(express.json());

// Server Output
app.listen(3501, () => {
    console.log("Server Running");
});

// Routes
const test = require("./routes/Test.ts");
app.use("/test", test);

const getStoredCareers = require("./routes/Careers.ts");
app.use("/careers", getStoredCareers);

const gptRequests = require("./routes/GPT.ts");
app.use("/gpt", gptRequests);

export {}

