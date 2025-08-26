import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // تأكد أن المفتاح موجود في Vercel
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { level, subject, type, language } = req.body;

  try {
    const prompt = `اصنع لي ${type} في مادة ${subject} للطور ${level} باللغة ${language}`;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content;

    res.status(200).json({ result: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "حدث خطأ في الاتصال بالذكاء الاصطناعي." });
  }
}
