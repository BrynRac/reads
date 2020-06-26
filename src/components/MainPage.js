import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Bookshelf from './Bookshelf';
import PopUp from './PopUp';

export default function MainPage(props) {
  const {
    bookList,
    updateBookshelf,
    popUpText,
  } = props;

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <Bookshelf
            shelfTitle={'Currently Reading'}
            bookList={bookList}
            shelfValue={'currentlyReading'}
            updateBookshelf={updateBookshelf}
          />
          <Bookshelf
            shelfTitle={'Want to Read'}
            bookList={bookList}
            shelfValue={'wantToRead'}
            updateBookshelf={updateBookshelf}
          />
          <Bookshelf
            shelfTitle={'Read'}
            shelfValue={'read'}
            bookList={bookList}
            updateBookshelf={updateBookshelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
      {popUpText !== '' && <PopUp popUpText={popUpText} />}
    </div>
  );
}
