import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // تأكد من وضع مفتاحك في Vercel
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // أو أي موديل تختاره
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
