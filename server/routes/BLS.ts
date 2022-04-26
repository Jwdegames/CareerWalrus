const express = require('express');
const router = express.Router();

// Setup BLS API
var Bls2 = require('bls2');

const API_KEY = 'd2284943d7d643e5b4196be0f8086f59';

let bls = new Bls2(API_KEY);

let options = {
    'seriesid': ['CUURS49BSA0'],
    'startyear': '2008',  
    'endyear': '2018'
    // ...

};

// Send a general BLS Request
router.post('/sendBLSRequest', async (req : any, res : any) => {
    if (req) {
        //const response = await openai.createCompletion("text-davinci-002", req.body);
        console.log(req.body);
        bls.fetch(options).then(function (response: any) {
            console.log(JSON.stringify(response));
            res.send(response);
        });


        //console.log(response.data.choices[0].text);
        //res.send(response.data.choices[0].text);
    } else {
        console.log("Empty List");
    }
});

// Export router to use in index.js
module.exports = router;

export {}
