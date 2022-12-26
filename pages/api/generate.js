import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-ada-001",
    prompt: req.body.input,
    max_tokens: 100,
    n: 1,
    temperature: 1,
  });
  const text = completion.data.choices[0].text;
  console.log(text);
  res.status(200).json({ result: text });
}
