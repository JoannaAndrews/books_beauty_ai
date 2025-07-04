// import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const searchBooks = async (query) => {
//   const res = await axios.get(`${BASE_URL}/books/search?q=${query}`);
//   return res.data;
// };

// export const generateMakeupLooks = async (description) => {
//   const res = await axios.post(`${BASE_URL}/makeup/generate`, { description });
//   return res.data;
// };


export const getLooksForBook = async (title) => {
  const res = await fetch(`/api/books?title=${encodeURIComponent(title)}`);
  if (!res.ok) {
    console.error("Failed to fetch looks:", res.statusText);
    return [];
  }
  const data = await res.json();
  return data;
}