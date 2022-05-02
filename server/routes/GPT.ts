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

// Send a prompt to the trained model
router.post('/sendRedditPrompt', async (req : any, res : any) => {
    if (req) {
        const response = await openai.createCompletionFromModel({
            model  : "davinci:ft-personal-2022-04-25-16-47-45",
            prompt : req.body.prompt
        });

        console.log("Reddit Response");
        console.log(req.body.prompt);

        console.log(response.data.choices[0].text);
        res.send(response.data.choices[0].text);
    } else {
        console.log("Empty List");
    }
});

// Send a prompt so that gpt can output a career best matching a description
router.post('/sendCareerMatchPrompt', async (req : any, res : any) => {
    if (req) {
        req.body.prompt = `
        Actuaries 
        Bioinformatics Technicians
        Biostatisticians
        Blockchain Engineers
        Business Intelligence Analysts
        Clinical Data Managers
        Computer and Information Research Scientists 
        Computer Network Architects
        Computer Occupations, All Other
        Computer Programmers
        Computer Systems Analysts
        Computer Systems Engineers/Architects
        Data Scientists 
        Data Warehousing Specialists
        Database Administrators
        Database Architects
        Digital Forensics Analysts
        Document Management Specialists
        Geographic Information Systems Technologists and Technicians
        Health Informatics Specialists
        Information Security Analysts
        Information Security Engineers
        Information Technology Project Managers
        Mathematical Science Occupation
        Mathematicians
        Network and Computer Systems Administrators
        Operations Research Analysts
        Penetration Testers
        Software Developers 
        Software Quality Assurance Analysts and Testers
        Statisticians 
        Telecommunications Engineering Specialists
        Video Game Designers 
        Web Administrators
        Web and Digital Interface Designers 
        Web Developers
        
        Given a statement, match the statement to three careers above and output them in the following format:
        
        Statement:` + req.body.prompt + `
        
        Output Example: Web Administrators, Data Scientists, Blockchain Engineers
        
        Output:`

        const response = await openai.createCompletion("text-davinci-002", req.body);

        console.log(req.body);

        console.log(response.data.choices[0].text);
        console.log(typeof(response.data.choices[0].text));
        res.send(response.data.choices[0].text);
    } else {
        console.log("Empty List");
    }
});

// Export router to use in index.js
module.exports = router;

export {}
