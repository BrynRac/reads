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
    allBooks: [],
    loading: true,
    popUpText: '',
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    const response = await BooksAPI.getAll();

    this.setState(() => ({
      allBooks: [...response],
    }));
    this.setState({ loading: false });
  };

  updateBookshelf = (value, book) => {
    this.setState({ loading: true });

    // Check if book has already been added.
    if (this.checkDuplicate(book.id && value !== 'none')) {
      this.setState({ popUpText: `Already on a bookshelf!` });
    } else if (value === 'none') {
      // Remove book
      BooksAPI.update(book, value);
      this.setState({ popUpText: `Book removed!` }, () => {
        this.getBooks();
      });
    } else {
      // Update books
      BooksAPI.update(book, value);
      this.setState({ popUpText: `Book added!` }, () => {
        this.getBooks();
      });
    }
    setTimeout(() => {
      this.removePopUp();
    }, 1200);
  };

  removePopUp = () => {
    this.setState({ popUpText: `` });
  };

  checkDuplicate = (bookId) => {
    const id = this.state.allBooks.filter((book) => book.id === bookId);
    if (id.length) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { loading, popUpText, allBooks } = this.state;
    const routes = (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              bookList={allBooks}
              updateBookshelf={this.updateBookshelf}
              popUpText={popUpText}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              updateBookshelf={this.updateBookshelf}
              popUpText={this.state.popUpText}
            />
          )}
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
