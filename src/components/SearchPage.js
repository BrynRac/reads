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

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const searchTerm = this.state.query;

    if (searchTerm === '') {
      return this.setState(() => ({ searchStatus: 'error' }));
    } else if (!this.state.terms.includes(searchTerm)) {
      return this.setState(() => ({ searchStatus: 'error' }));
    } else {
      this.setState({ loading: true });
      const response = await BooksAPI.search(this.state.query);
      this.setState(() => ({
        searchResults: [...response],
        searchStatus: '',
      }));
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
        <PopUp popUpText={this.props.popUpText}/>
        )}
      </div>
    );
  }
}

export default SearchPage;
