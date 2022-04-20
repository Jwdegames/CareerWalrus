import { UriBuilder } from "uribuilder";
const axios = require('axios').default;

function test() {
    const userId = "aTSpInK9SOGclcJ";
    const apiKey = "js9Ba1M/SNhb3mYbWwObvai+5SB+F6lEN+OHNu6va2Y5RHtev/RIwww0kvQC6QhaioDB/N5BBKclBfDNO1qRgw==";
    const reqObj = JSON.parse('{"keyword": "Software Developers", "location": "United States", "radius": "25", "sortColumns": "0", "sortOrder": "0", "startRecord": "0", "pageSize": "10","days": "30"}');

    const uri = new UriBuilder;
    uri.schema = "https";
    uri.host = "api.careeronestop.org";
    uri.setPath(`/v1/jobsearch/${userId}/${reqObj.keyword}/${reqObj.location}/${reqObj.radius}/${reqObj.sortColumns}/${reqObj.sortOrder}/${reqObj.startRecord}/${reqObj.pageSize}/${reqObj.days}`);

    var uriStr = uri.toString();
    console.log(uriStr);
    axios.get(uri.toString(), { headers: { "Authorization": `Bearer ${apiKey}` } })
    .then((response: any) => {
        console.log(`Status Code: ${response.status}`);
        console.log(response.status);
        console.log(response.data);
    })
    .catch((error: any) => {
        console.log(error);
    })
}
test();
export {}