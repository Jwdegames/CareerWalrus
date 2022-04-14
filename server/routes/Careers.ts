const CareerModel = require("../models/CareerModel.ts");
const express = require('Express');
const router = express.Router();

// See all careers storted on the MongoDB Database
router.get('/getStoredCareers', (req : any, res : any) => {
    CareerModel.find({}, (err : any, result : any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
 });

 // Store a career option on the MongoDB Database
 router.post('/createStoredCareer', async (req : any, res : any) => {
    const career = req.body;
    const newCareer = new CareerModel(career);
    await newCareer.save();

    res.json(career);
 });
 
 //export this router to use in our index.js
module.exports = router;

export {}