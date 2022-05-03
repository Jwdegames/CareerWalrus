const express = require('express');
const router = express.Router();
import Axios from 'axios'
// Send a general BLS Request
router.post('/sendWikipediaRequest', async (req : any, res : any) => {
    if (req) {
        //const response = await openai.createCompletion("text-davinci-002", req.body);
        //console.log(req.body);
        let template = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=true&redirects=1&exintro&titles=";
        let search = req.body.search;
        console.log(req.search);
        //console.log("Request is " + template+search);
        /*fetch(template + search)
            .then(data => {
                console.log(data);
                res.send(data);
            });
        */
        Axios.post(template + search, {

            })
        .then((response) => {
            console.log("Getting Wikipedia Info")
            console.log(response.data);
            res.send(response.data);
        })
        .catch((err: any) => {
            console.log(err);
        })    


        //console.log(response.data.choices[0].text);
        //res.send(response.data.choices[0].text);
    } else {
        console.log("Empty List");
    }
});

// Export router to use in index.js
module.exports = router;

export {}