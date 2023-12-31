const express = require('express');
const router = express.Router();
const axios = require('axios').default;
import { UriBuilder } from 'uribuilder';

/*
Queries the list job function in Career OneStop's API
*/
router.post("/getJobs", async (req : any, res : any) => {
    if (req) {
        const userId = "aTSpInK9SOGclcJ";
        const apiKey = "js9Ba1M/SNhb3mYbWwObvai+5SB+F6lEN+OHNu6va2Y5RHtev/RIwww0kvQC6QhaioDB/N5BBKclBfDNO1qRgw==";

        const uri = new UriBuilder;
        uri.schema = "https";
        uri.host = "api.careeronestop.org";
        uri.setPath(`/v1/jobsearch/${userId}/${req.body.keyword}/${req.body.location}/${req.body.radius}/${req.body.sortColumns}/${req.body.sortOrder}/${req.body.startRecord}/${req.body.pageSize}/${req.body.days}`);
        
        // console.log(uri.toString());
        axios.get(uri.toString(), { headers: { "Authorization": `Bearer ${apiKey}` } })
        .then((response: any) => {
            console.log(`api.careeronestop.org Status Code: ${response.status}`);
            res.send(response.data);
        })
        .catch((error: any) => {
            console.log(error.response.data);
        })
    } else {
        console.log("Empty request body for getJobs");
    }
});

/*
Queries the get salary function in Career OneStop's API. Returns a JSON object
*/
router.post("/getSalary", async (req : any, res : any) => {
    if (req) {
        const userId = "aTSpInK9SOGclcJ";
        const apiKey = "js9Ba1M/SNhb3mYbWwObvai+5SB+F6lEN+OHNu6va2Y5RHtev/RIwww0kvQC6QhaioDB/N5BBKclBfDNO1qRgw==";

        const uri = new UriBuilder;
        uri.schema = "https";
        uri.host = "api.careeronestop.org";
        uri.setPath(`/v1/comparesalaries/${userId}/wage?keyword=${req.body.keyword}&location=${req.body.location}&enableMetaData=${req.body.enableMetaData}`);
        
        axios.get(uri.toString(), { headers: { "Authorization": `Bearer ${apiKey}` } })
        .then((response: any) => {
            console.log(`api.careeronestop.org Status Code: ${response.status}`);
            // console.log(response.data)
            res.send(response.data);
        })
        .catch((error: any) => {
            console.log(error.response.data);
        })
    } else {
        console.log("Empty request body for getSalary");
    }
});

/*
Queries the get job description function in Career OneStop's API
*/
router.post("/getJobDesc", async (req : any, res : any) => {
    if (req) {
        const userId = "aTSpInK9SOGclcJ";
        const apiKey = "js9Ba1M/SNhb3mYbWwObvai+5SB+F6lEN+OHNu6va2Y5RHtev/RIwww0kvQC6QhaioDB/N5BBKclBfDNO1qRgw==";

        const uri = new UriBuilder;
        uri.schema = "https";
        uri.host = "api.careeronestop.org";
        uri.setPath(`/v1/jobsearch/${userId}/${req.body.searchID}`);
        
        axios.get(uri.toString(), { headers: { "Authorization": `Bearer ${apiKey}` } })
        .then((response: any) => {
            console.log(`api.careeronestop.org Status Code: ${response.status}`);
            // console.log(response.data)
            res.send(response.data);
        })
        .catch((error: any) => {
            console.log(error.response.data);
        })
    } else {
        console.log("Empty request body for getJobDesc");
    }
});

// Export router to use in index.js
module.exports = router;

export {}
