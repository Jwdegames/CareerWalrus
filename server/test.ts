const axios = require('axios').default;

axios.post("/oneStop/getJobs", {
    keyword: "Software Developers",
    location: "United States",
    radius: "25",
    sortColumns: "0",
    sortOrder: "0",
    startRecord: "0",
    pageSize: "100",
    days: "30"
})
.then(() => {
    console.log("Finished post to index");
})
.catch(() => {
    // console.log(err);
})