import { Configuration, OpenAIApi } from 'openai';

export const config = {
    runtime: 'experimental-edge',
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "Give me the key points, lessons and action points of the following book. Please separate each section and explain each point with examples in a separate sentence  in the style of naval ravikan. Don't limit yourself in the amount of points and lessons given: ";

const generateAction = async (req) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    return new Response(
        JSON.stringify({ output: basePromptOutput }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
};

export default generateAction;
