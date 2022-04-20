const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const router = express.Router();

const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

// Send a general GPT-3 prompt
router.post('/sendGPTPrompt', async (req : any, res : any) => {
    if (req) {
        const response = await openai.createCompletion("text-davinci-002", req.body);

        console.log(req.body);

        console.log(response.data.choices[0].text);
        res.send(response.data.choices[0].text);
    } else {
        console.log("Empty List");
    }
});

// Export router to use in index.js
module.exports = router;

export {}
