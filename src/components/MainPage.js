import React from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

export default function MainPage(props) {
  const { currentlyReading, wantToRead, read } = props;

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <Bookshelf
            shelfTitle={'Currently Reading'}
            bookList={currentlyReading}
          />
          <Bookshelf shelfTitle={'Want to Read'} bookList={wantToRead} />
          <Bookshelf shelfTitle={'Read'} bookList={read} />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
