import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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",
});
export async function sendMsgToOpenAI(message) {
  const response = await openai.complete({
    engine: "text-davinci-003",
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
  });

  return response.choices[0].text;
}
