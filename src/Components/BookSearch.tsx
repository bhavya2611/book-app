import React, { useState, ChangeEvent, MouseEvent } from "react";
import { getBooksData } from "../helper/helper";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
}

type BooksSearchProps = { callBackFn?: () => void };

const BooksSearch: React.FC<BooksSearchProps> = ({ callBackFn }) => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const items = await getBooksData(query);
      const formattedBooks: Book[] = items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        publisher: item.volumeInfo.publisher || "Unknown Publisher"
      }));

      setBooks(formattedBooks);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
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
      callBackFn && callBackFn();
    };

  return (
    <div>
      <div>
        <input type='text' value={query} onChange={handleQueryChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>{loading ? "Loading Search Results ...." : "Search Results"}</h2>
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
    </div>
  );
};

export default BooksSearch;
