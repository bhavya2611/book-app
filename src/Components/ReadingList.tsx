import React, { useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
}

type ReadingListProps = { update?: boolean };

const ReadingList: React.FC<ReadingListProps> = ({ update }) => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  React.useEffect(() => {
    // Load reading list from local storage on component mount
    const storedReadingList = JSON.parse(
      localStorage.getItem("readingList") || "[]"
    );
    setReadingList(storedReadingList);
  }, [update]);

  const removeBook = (book: Book) => {
    const updatedReadingList = readingList.filter(
      (item) => item.id !== book.id
    );
    setReadingList(updatedReadingList);
    localStorage.setItem("readingList", JSON.stringify(updatedReadingList));
  };

  return (
    <div>
      <h2>Reading List</h2>
      {readingList.length === 0 ? (
        <p>No books in the reading list.</p>
      ) : (
        <>
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
          {readingList.map((book) => (
            <div className='book-list' key={book.id}>
              <div>{book.title}</div>
              <div>{book.author}</div>
              <div>{book.publisher}</div>
              <div>
                <button onClick={() => removeBook(book)}>Remove</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ReadingList;
