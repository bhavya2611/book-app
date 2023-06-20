import React, { useState, ChangeEvent, MouseEvent } from "react";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
}

type BooksSearchProps = { callBackFn: () => void };

const BooksSearch: React.FC<BooksSearchProps> = ({ callBackFn }) => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      const { items } = response.data;

      const formattedBooks: Book[] = items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        publisher: item.volumeInfo.publisher || "Unknown Publisher"
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAddToReadingList =
    (book: Book) => (e: MouseEvent<HTMLButtonElement>) => {
      const readingList = JSON.parse(
        localStorage.getItem("readingList") || "[]"
      );
      const updatedReadingList = [...readingList, book];
      localStorage.setItem("readingList", JSON.stringify(updatedReadingList));
      callBackFn();
    };

  return (
    <div>
      <div>
        <input type='text' value={query} onChange={handleQueryChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Search Results</h2>
      <div className='book-list'>
        <div>
          <b>Book Title</b>
        </div>
        <div>
          <b>Author</b>
        </div>
        <div>
          <b>Publisher</b>
        </div>
        <div>
          <b>Action</b>
        </div>
      </div>
      <div>
        {books.map((book) => (
          <div className='book-list' key={book.id}>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.publisher}</div>
            <div>
              <button onClick={handleAddToReadingList(book)}>
                Add to Reading List
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Publisher: {book.publisher}</p>
          <button onClick={handleAddToReadingList(book)}>
            Add to Reading List
          </button>
        </div>
      ))} */}
    </div>
  );
};

export default BooksSearch;
