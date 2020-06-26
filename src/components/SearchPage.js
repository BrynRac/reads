import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

//components
import SearchResults from './SearchResults';
import TermWindow from './TermWindow';
import Loader from './Loader';
import PopUp from './PopUp';

export class SearchPage extends Component {
  state = {
    terms: [
      'Android',
      'Art',
      'Artificial Intelligence',
      'Astronomy',
      'Austen',
      'Baseball',
      'Basketball',
      'Bhagat',
      'Biography',
      'Brief',
      'Business',
      'Camus',
      'Cervantes',
      'Christie',
      'Classics',
      'Comics',
      'Cook',
      'Cricket',
      'Cycling',
      'Desai',
      'Design',
      'Development',
      'Digital Marketing',
      'Drama',
      'Drawing',
      'Dumas',
      'Education',
      'Everything',
      'Fantasy',
      'Film',
      'Finance',
      'First',
      'Fitness',
      'Football',
      'Future',
      'Games',
      'Gandhi',
      'Homer',
      'Horror',
      'Hugo',
      'Ibsen',
      'Journey',
      'Kafka',
      'King',
      'Lahiri',
      'Larsson',
      'Learn',
      'Literary Fiction',
      'Make',
      'Manage',
      'Marquez',
      'Money',
      'Mystery',
      'Negotiate',
      'Painting',
      'Philosophy',
      'Photography',
      'Poetry',
      'Production',
      'Programming',
      'React',
      'Redux',
      'River',
      'Robotics',
      'Rowling',
      'Satire',
      'Science Fiction',
      'Shakespeare',
      'Singh',
      'Swimming',
      'Tale',
      'Thrun',
      'Time',
      'Tolstoy',
      'Travel',
      'Ultimate',
      'Virtual Reality',
      'Web Development',
      'iOS',
    ],
    query: '',
    showSearchTerms: false,
    searchResults: [],
    searchStatus: '',
    loading: false,
  };

  componentDidMount() {
    if (this.state.query.length) {
      const searchTerm = this.capitalize(this.state.query);
      this.getData(searchTerm);
    }
  }

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query, loading: true }, () => {
      this.getData(this.capitalize(query));
    });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const searchTerm = this.capitalize(this.state.query);

  //   this.getData(searchTerm);
  // };

  capitalize(string) {
    const lowerCase = string.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
  }

  getData = async (query) => {
    if (query === '') {
      return this.setState(() => ({ searchStatus: 'error' }));
    } else if (!this.state.terms.includes(query)) {
      return this.setState(() => ({ searchStatus: 'error' }));
    }
    this.setState({ loading: true });
    const response = await BooksAPI.search(query);
    this.setState(() => ({
      searchResults: [...response],
      searchStatus: '',
    }));

    if (this.state.showSearchTerms) {
      this.toggleSearchTerms();
    }

    this.setState({ loading: false });
  };
  
  toggleSearchTerms = () => {
    this.setState({ showSearchTerms: !this.state.showSearchTerms });
  };

  selectTerm = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  render() {
    const { showSearchTerms, query, searchStatus, loading } = this.state;

    const searchWrapper = (
      <div>
        {showSearchTerms ? (
          <TermWindow terms={this.state.terms} getTerm={this.selectTerm} />
        ) : (
          ''
        )}
        <div className="search-books-results">
          <SearchResults
            searchArr={this.state.searchResults}
            updateBookshelf={this.props.updateBookshelf}
          />
        </div>
      </div>
    );
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <form className="search-books-input-wrapper">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Search by title or author"
              value={query}
            />
            <button onClick={this.handleSubmit}>Search</button>
          </form>
        </div>
        <button
          className={
            searchStatus === 'error' ? 'termsBtn focusBtn' : 'termsBtn'
          }
          onClick={this.toggleSearchTerms}
        >
          {showSearchTerms ? 'Hide Search Terms' : 'Show Search Terms'}
        </button>
        {searchStatus === 'error' ? (
          <p className="error">Please enter a proper search term.</p>
        ) : (
          ''
        )}
        {loading ? <Loader /> : searchWrapper}
        {this.props.popUpText !== '' && (
          <PopUp popUpText={this.props.popUpText} />
        )}
      </div>
    );
  }
}

export default SearchPage;
