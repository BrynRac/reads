import React from 'react';
import Book from './Book';

export default function Bookshelf(props) {
  const { shelfTitle, bookList, shelfValue, updateBookshelf } = props;

  const noBooks = (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <p style={{ color: 'grey' }}>No books currently added.</p>
    </div>
  );
  const booksFound = (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookList
            .filter((book) => book.shelf === shelfValue)
            .map((book) => (
              <li key={book.id}>
                <Book book={book} updateBookshelf={updateBookshelf} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
  if (bookList.length) {
    return booksFound;
  } else {
    return noBooks;
  }
}
