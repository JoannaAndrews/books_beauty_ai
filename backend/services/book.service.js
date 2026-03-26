import dotenv from "dotenv";
dotenv.config();

export const fetchBookLooks = async (title) => {
  //Get book info
  const bookRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${process.env.GOOGLE_API_KEY}`);

  return bookRes;

};
