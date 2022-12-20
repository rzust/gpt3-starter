export const config = {
    runtime: 'experimental-edge',
}

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};

const basePromptPrefix = "Give me the key points, lessons and action points of the following book. Please separate each section and explain each point with examples in a separate sentence  in the style of naval ravikan. Don't limit yourself in the amount of points and lessons given: ";

async function generateCompletions(prompt, model) {
    const data = {
        model,
        prompt,
        max_tokens: 250,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${configuration.apiKey}`
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('https://api.openai.com/v1/completions', options);

    if (response.ok) {
        const data = await response.json();
        return data.choices.pop();
    } else {
        throw new Error(response.statusText);
    }
}

export default async function (req) {

    const { searchParams } = new URL(req.url)
    const prompt = searchParams.get('prompt')
    const completions = await generateCompletions(`${basePromptPrefix}${prompt}`, "text-davinci-003");

    return new Response(
        JSON.stringify({ output: completions }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
};
