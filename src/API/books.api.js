import axios from "axios";
const baseURL = `${import.meta.env.VITE_BOOKS_API}/api`;

// Authorization headers


// All books
export const getAllBooks = () => {
    return axios.get(`${baseURL}/books`);
};

// Specified book
export const getBook = (id) => {
    return axios.get(`${baseURL}/books/${id}`);
};

// Want to read
export const getWantToRead = () => {
    return axios.get(`${baseURL}/books/wantToRead`);
};

// Already read
export const getAlreadyRead = () => {
    return axios.get(`${baseURL}/books/alreadyRead`);
};

// Add a book
export const addBook = (book) => {
    return axios.post(`${baseURL}/books`, book);
};

// Update the book
export const updateBook = (updatedBook) => {
    return axios.put(`${baseURL}/books/${updatedBook._id}`, updatedBook);
};

// Delete the book 
export const deleteBook = (id) => {
    return axios.delete(`${baseURL}/books/${id}`);
}


