// Init Express App
const express = require("express");
const app = express();
const mongoose = express("mongoose");
import path from "path";

// Allow communication with React Application
const cors = require("cors");
app.use(cors());

// Database Connect
// Needs to be reconfigured to whitelist ips
//mongoose.connect("mongodb+srv://Amariwest19:123@cluster0.enwzq.mongodb.net/WalrusDatabase?retryWrites=true&w=majority");

// Allows requests that have a body.
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/public')));

// Routes
const test = require("./routes/Test.ts");
app.use("/test", test);

const getStoredCareers = require("./routes/Careers.ts");
app.use("/careers", getStoredCareers);

const gptRequests = require("./routes/GPT.ts");
app.use("/gpt", gptRequests);


// All other GET requests not handled before will return our React app
app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

// Server Output
app.listen(3501, () => {
    console.log("Server Running");
});

export {}

