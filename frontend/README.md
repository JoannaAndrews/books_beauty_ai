import axios from 'axios';
import { OpenAI } from 'openai'; // npm i openai
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateLooksForBook = async (req, res) => {
  const { title } = req.query;

  try {
    // 1. Use a public book API to get description
    const { data } = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);
    const book = data.docs?.[0];
    const description = book?.first_sentence || book?.title;

    // 2. Send to OpenAI
    const prompt = `Given the theme of this book: "${description}", generate 3 makeup look ideas with names, colors, and moods.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const ideas = completion.choices[0].message.content.split("\n\n");
    res.json({ data: ideas });

  } catch (error) {
    console.error("Book lookup or OpenAI failed:", error);
    res.status(500).json({ error: "Failed to generate looks." });
  }
};
