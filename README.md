# Phoenix Pages

![pp_image](./public/pp.jpeg)

## Description

Phoenix Pages is a web app that allows users to manage their reading lists by marking books they want to read and those they've already read. It utilizes the Open Library API to fetch book data and provides a user-friendly interface for managing book lists.

## Features

- View detailed information about a specific book, including title, author, and description.
- Add books to "Want to Read" and "Already Read" lists.
- Remove books from these lists.
- Responsive design with animations using Framer Motion.
- User feedback via toast notifications for actions performed.

## Technologies Used

- React
- React Router
- Axios
- Framer Motion
- Sonner (for toast notifications)
- Tailwind

## Installation

1. Clone the repository:

   `git clone https://github.com/nijat21/phoenix_pages.git`

1. Navigate to the project directory:

   `cd book-list-app`

1. Install dependencies:

   `npm install`

1. Start the development server:

   `npm start`

### API Integration

- **Fetching Book Data**:

  - Uses Axios to make API requests to `https://openlibrary.org/works/{bookKey}.json` for book details.
  - Fetches author details from `https://openlibrary.org/authors/{authorKey}.json`.

- **User Book Management**:

  - Functions to add/remove books from "Want to Read" and "Already Read" lists.
  - Utilizes custom API functions: `retrieveBooksRead`, `retrieveBooksToRead`, `addBooksToRead`, `addBooksRead`, `removeBooksToRead`, and `removeBooksRead`.

## Links

### Repositories and links related to the project

GitHub: [Frontend,](https://github.com/nijat21/phoenix_pages)
Render: [Backend](https://movies-nestjs-api.onrender.com)
GitHub: [Backend](https://github.com/nijat21/pp_server_FastAPI-MySQL.git)
<br/>

Netlify: [Phoenix Pages](https://phoenix-pages.netlify.app/)

### Contributors

Luís Gonçalves - [GitHub](https://github.com/luigoncalves) - [LinkedIn](https://www.linkedin.com/in/luis-dearaujo-goncalves/)

Nijat Ismayilov - [GitHub](https://github.com/nijat21) - [LinkedIn](https://www.linkedin.com/in/nijat-ismayilov/)
