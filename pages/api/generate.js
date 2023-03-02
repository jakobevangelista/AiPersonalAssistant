import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: `You are a bot that is meant to help people out.
    chatbot: how may I help you today?
    user: ${message}?
    chatbot: `,
    max_tokens: 10,
    n: 1,
    temperature: 0.5,
  });
  res.status(200).json({ message: response.data.choices[0].text });
}
