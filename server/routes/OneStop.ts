const express = require('express');
const router = express.Router();
const axios = require('axios').default;
import { UriBuilder } from 'uribuilder';

/*
Queries the list job function in Career OneStop's API
*/
router.post("/getJobs", async (req : any, res : any) => {
    if (req) {
        console.log(req);

        const userId = "aTSpInK9SOGclcJ";
        const apiKey = "js9Ba1M/SNhb3mYbWwObvai+5SB+F6lEN+OHNu6va2Y5RHtev/RIwww0kvQC6QhaioDB/N5BBKclBfDNO1qRgw==";
        const reqObj = JSON.parse(req);

        const uri = new UriBuilder;
        uri.schema = "https";
        uri.host = "api.careeronestop.org";
        uri.pathSegments = ["v1", "jobsearch", userId, reqObj.keyword, reqObj.location, reqObj.radius, reqObj.sortColumns, reqObj.sortOrder, reqObj.startRecord, reqObj.pageSize, reqObj.days];
        
        axios.post(uri.toString, { headers: { "Authorization": `Bearer ${apiKey}` } })
        .then((response: any) => {
            console.log(`Status Code: ${response.status}`);
            console.log(response);
            res.send(response)
        })
        .catch((error: any) => {
            console.log(error);
        })
    } else {
        console.log("Empty request body for getJobs");
    }
});

// Export router to use in index.js
module.exports = router;

export {}
