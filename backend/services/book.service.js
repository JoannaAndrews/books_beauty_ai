// backend/services/book.service.js
// const axios = require("axios");
// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const fetchBookLooks = async (title) => {
  // Step 1: Get book info
  const bookRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`);
  //await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);
  return bookRes;

  // const book = bookRes.data.docs?.[0];

  // const description = book?.title + (book?.first_sentence ? ` - ${book.first_sentence}` : "");

  // if (!description) throw new Error("Book description not found");

  // // Step 2: Send to OpenAI
  // const prompt = `Create 3 imaginative makeup look ideas inspired by the book: "${description}". Include a title, color palette, and vibe for each.`;

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [{ role: "user", content: prompt }],
  // });

  // const raw = completion.choices[0].message.content;

  // // Optional: split OpenAI text into individual looks
  // return raw.split(/\n\n+/); // crude split — can refine later
};
