const express = require("express");
const fs = require('fs');
const router = express.Router();
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const cors = require('cors');
const FetchList = require('./FetchListContent');
const bodyParser = require('body-parser');
const {encode, decode} = require('gpt-3-encoder')
const modelNameMap = {
        "gpt-3.5": "gpt-3.5-turbo-1106",
        "gpt-4": "gpt-4-32k"
    }

router.use(bodyParser.json());


router.use(cors());

router.post('/get-prompt-result', async (req, res) => {
    // Get the prompt from the request bodygpt-4-1106-preview
    const { prompt, model = 'gpt', magazineList } = req.body;
    // Check if prompt is present in the request
    if (!prompt) {
        // Send a 400 status code and a message indicating that the prompt is missing
        return res.status(400).send({error: 'Prompt is missing in the request'});
    }
    
    const listContent = await FetchList.fetchContent(magazineList);

    try {
        let messages=[{role: "system", content: "You are a specialist at Chinese Magazines. Respond with markdown format."},
                        {role: "user", content: "I will present you the text from a number of magazines. Read the content, and answer my questions in both english and Chinese. Answer first in english, and then repeat once in Chinese."}];
        messages = [...messages, ...listContent.map((magazine, id) => (
            {role: "user", content: `Magazine ${id+1}: ${magazine.content}`}
        ))];
        messages = [...messages, {role: "user", content: `${prompt}`}];
        const encoded = encode(prompt);
        console.log(`amount of tokens:${encoded.length}`)

        // Use the OpenAI SDK to create a completion
        // with the given prompt, model and maximum tokens
        const completion = await openai.createChatCompletion({
            model:modelNameMap[model], // model name
            messages: messages,
        });

        console.log(completion.data.choices[0].message);
        // Send the generated text as the response
        res.json({chatgpt_response: completion.data.choices[0].message.content});
    } catch (error) {
        const errorMsg = error.response ? error.response.data.error : `${error}`;
        console.error(errorMsg);
        // Send a 500 status code and the error message as the response
        return res.status(500).send(errorMsg);
    }
});

module.exports = router