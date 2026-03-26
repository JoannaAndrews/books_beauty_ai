import dotenv from "dotenv";
dotenv.config();

import { fetchBookLooks } from "../services/book.service.js";

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export function generateRuleBasedLooks(description) {
  const text = description.toLowerCase();

  const vibe = text.includes("dark") || text.includes("mysterious")
    ? "moody"
    : text.includes("romance") || text.includes("love")
      ? "romantic"
      : text.includes("adventure") || text.includes("journey")
        ? "bold"
        : "soft";


  const colors = [];
  if (text.includes("forest") || text.includes("nature")) colors.push("earthy greens and browns");
  if (text.includes("ocean") || text.includes("sea")) colors.push("deep blues and teals");
  if (text.includes("magic") || text.includes("fantasy")) colors.push("iridescent purples and silvers");
  if (text.includes("city") || text.includes("urban")) colors.push("sleek blacks and metallics");
  if (colors.length === 0) colors.push("neutral golds and warm tones");

  const theme = text.includes("war") || text.includes("battle")
    ? "strength and resilience"
    : text.includes("friendship")
      ? "connection and warmth"
      : text.includes("mystery")
        ? "intrigue and shadows"
        : "emotion and atmosphere";

  return [
    {
      title: `${vibe.charAt(0).toUpperCase() + vibe.slice(1)} Glow`,
      description: `A ${vibe} look using ${colors[0]}, inspired by themes of ${theme}. Soft gradients and layered textures echo the emotional tone of the story.`
    },
    {
      title: `Chapter Two: ${theme.split(" ")[0].toUpperCase()}`,
      description: `A structured look with bold liner and ${colors[0]}, capturing the book’s sense of ${theme}. Balanced with subtle shimmer to reflect key turning points.`
    },
    {
      title: `Plot Twist Radiance`,
      description: `A dynamic look blending ${colors[0]} with unexpected accents. Designed to mirror the narrative’s shifts in mood and pacing.`
    }
  ];
}


export const generateLooksForBook = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  let description;

  try {
    const looks = await fetchBookLooks(title);
    const looksData = await looks.json();

    console.log("Google Books API response:", looksData);


    description = looksData.items?.[0]?.volumeInfo?.description;

    if (!description) {
      return res.status(404).json({ error: "Book description not found" });
    }


    const prompt = `
Generate 3 creative makeup looks inspired by this book description:

"${description}"

Respond with ONLY a raw JSON array (no code block, no explanation). Each object must have a "title" and "description".
`;

    const openaiRes = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [{ role: "user", content: prompt }],
    });

    let text = openaiRes.choices[0].message.content;

    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

    if (codeBlockMatch) {
      text = codeBlockMatch[1].trim(); // Extract only the JSON inside the code block
    } else {
      text = text.trim(); // If no code block, just trim any extra whitespace
    }


    let looks_separated;
    try {
      looks_separated = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      console.error("Raw OpenAI response was:", openaiRes.choices[0].message.content);
      looks_separated = []; // fallback
    }

    return res.json({ data: looks_separated });

  } catch (error) {

    //fallback case to account for rate limiting
    console.error("Error generating looks:", error.message);
    //return res.status(500).json({ error: "Failed to generate looks" });
    const ruleBased = generateRuleBasedLooks(description);
    return res.json({ data: ruleBased });
  }
};
