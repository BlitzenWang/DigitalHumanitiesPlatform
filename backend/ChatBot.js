const express = require("express");
const router = express.Router();
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const cors = require('cors');

const bodyParser = require('body-parser');

router.use(bodyParser.json());


router.use(cors());

router.post('/get-prompt-result', async (req, res) => {
    // Get the prompt from the request body
    const { prompt, model = 'gpt' } = req.body;
    // Check if prompt is present in the request
    if (!prompt) {
        // Send a 400 status code and a message indicating that the prompt is missing
        return res.status(400).send({error: 'Prompt is missing in the request'});
    }

    try {
        // Use the OpenAI SDK to create a completion
        // with the given prompt, model and maximum tokens
        const completion = await openai.createChatCompletion({
            model:'gpt-3.5-turbo', // model name
            messages: [
            {role: "system", content: "Please respond with markdown format."},
            {role: "user", content: "Hi"}],
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