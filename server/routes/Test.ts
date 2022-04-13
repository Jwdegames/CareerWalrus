const express = require('Express');
const router = express.Router();

router.get('/', function(req : any, res : any){
   res.send('Test GET Successful.');
});
router.post('/', function(req : any, res : any){
   res.send('Test POST Successful.');
});

//export this router to use in our index.js
module.exports = router;

export {}