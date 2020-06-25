import React from 'react';
import * as BooksAPI from './BooksAPI';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Components
import Nav from './components/Nav';
import SearchPage from './components/SearchPage';
import MainPage from './components/MainPage';
import Loader from './components/Loader';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: [],
    loading: true,
  };

  componentDidMount() {
    this.getBooks();
    this.setState({ loading: false });
  }

  getBooks = async () => {
    const response = await BooksAPI.getAll();
    const currentlyReadingArr = response.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wantToReadArr = response.filter(
      (book) => book.shelf === 'wantToRead'
    );
    const readArr = response.filter((book) => book.shelf === 'read');

    console.log(currentlyReadingArr);

    this.setState((prevState) => ({
      currentlyReading: [
        ...prevState.currentlyReading.concat(currentlyReadingArr),
      ],
      wantToRead: [...prevState.wantToRead.concat(wantToReadArr)],
      read: [...prevState.read.concat(readArr)],
    }));
  };

  updateBookshelf = (value, book) => {
    BooksAPI.update(book, value);
    console.log(`Book added to ${value}`);
  };

  checkDuplicate = (bookId) => {
    if (this.state.allBooks.includes(bookId)) {
      alert('duplicate');
      return true;
    }
    return false;
  };

  removeBook = (bookId) => {
    const book = this.state.allBooks.indexOf(bookId);
    const shelf = this.state.allBooks[book][1];

    this.setState((prevState) => ({
      [`${shelf}`]: prevState.filter((id) => id !== bookId),
    }));
  };

  render() {
    const { currentlyReading, wantToRead, read, loading } = this.state;
    const routes = (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              updateBookshelf={this.updateBookshelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => <SearchPage updateBookshelf={this.updateBookshelf} />}
        />
      </Switch>
    );
    return (
      <Router>
        <div className="app">
          <Nav />
          {!loading ? routes : <Loader />}
        </div>
      </Router>
    );
  }
}

export default BooksApp;
