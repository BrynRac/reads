import React from 'react';
import MoveToBtn from './MoveToBtn';

export default function Book(props) {
  const { book } = props;

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks !== undefined ? (
          <img
            alt={book.title}
            className="book-cover"
            src={book.imageLinks.thumbnail}
          />
        ) : (
          <div style={{ margin: 'auto' }}>No image available</div>
        )}

        <MoveToBtn updateBookshelf={props.updateBookshelf} book={book} />
      </div>
      <div className="book-title">
        {book.subtitle ? `${book.title}: ${book.subtitle}` : book.title}
      </div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}
