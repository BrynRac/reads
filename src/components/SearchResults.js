import React from 'react';

//components
import Book from './Book';

export default function SearchResults(props) {
  const { searchArr } = props;
  if (searchArr.length) {
    console.log(searchArr);
  }
  return (
    <ol className="books-grid">
      {searchArr.length
        ? searchArr.map((book) => (
            <li key={book.id}>
              <Book book={book} updateBookshelf={props.updateBookshelf}/>
            </li>
          ))
        : ''}
    </ol>
    
  );
}
