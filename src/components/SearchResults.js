import React from 'react';

//components
import Book from './Book';

export default function SearchResults(props) {
  const { searchArr, updateBookshelf, bookList } = props;

  return (
    <ol className="books-grid">
      {searchArr.length
        ? searchArr.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                updateBookshelf={updateBookshelf}
                onMainPage={false}
                bookMatch={bookList.filter(shelfBook => shelfBook.id === book.id)}
              />
            </li>
          ))
        : ''}
    </ol>
  );
}
