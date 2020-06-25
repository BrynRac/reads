import React, { Component } from 'react';
export class MoveToBtn extends Component {
  state = {
    isOpen: false,
  };

  toggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const {updateBookshelf, book} = this.props
    // onBlur={() => this.toggleDropdown()} onFocus={() => this.toggleDropdown()
    return <div tabIndex="0" className="book-shelf-changer" onClick={this.toggleDropdown} >
        {isOpen && (
          <div className="dropdown"> 
              <div className="dropdown-top"><span>Add to...</span></div>
            <ul className="book-dropdown">
              <li onClick={e => updateBookshelf('currentlyReading', book)}><span>Currently Reading</span></li>
              <li onClick={e => updateBookshelf('wantToRead', book)}><span>Want to Read</span></li>
              <li onClick={e => updateBookshelf('read', book)}><span>Read</span></li>
              <li onClick={e => updateBookshelf('none', book)}><span>None</span></li>
            </ul>
          </div>
          
        )}
      </div>;
  }
}

export default MoveToBtn;
