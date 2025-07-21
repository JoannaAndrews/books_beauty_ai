// backend/controllers/book.controller.js

//the controller will handle incoming requests 
//connect to the required services

// const { fetchBookLooks } = require("../services/book.service");

import dotenv from "dotenv";
dotenv.config();

import { fetchBookLooks } from "../services/book.service.js";

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateLooksForBook = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    const looks = await fetchBookLooks(title);
    const looksData = await looks.json();

    console.log("Google Books API response:", looksData);


    const description = looksData.items?.[0]?.volumeInfo?.description;

    // console.log("Decription: ", description);

    if (!description) {
      return res.status(404).json({ error: "Book description not found" });
    }

    // Step 2: Send to OpenAI
    //     const prompt = `
    // Generate 3 creative makeup looks inspired by this book description:

    // "${description}"

    // Respond with ONLY a raw JSON array of objects, where each object has "title" and "description" fields. Do not include any explanation or markdown formatting.
    // `;

    const prompt = `
Generate 3 creative makeup looks inspired by this book description:

"${description}"

Respond with ONLY a raw JSON array (no code block, no explanation). Each object must have a "title" and "description".
`;

    const openaiRes = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [{ role: "user", content: prompt }],
    });

    let text = openaiRes.choices[0].message.content;

    // Try parsing JSON output from the model


    // text = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1").trim();

    // Attempt to extract clean JSON from within a code block
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

    // return res.json({ data: looks });
  } catch (error) {
    console.error("Error generating looks:", error.message);
    return res.status(500).json({ error: "Failed to generate looks" });
  }
};
