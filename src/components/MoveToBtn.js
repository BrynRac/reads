// import React from 'react';

// export default function MoveToBtn(props) {
//   return (
//     <div className="book-shelf-changer">
//       <select onChange={(e) => props.updateBookshelf(e, props.book)}>
//         <option value="move" disabled>
//           Move to...
//         </option>
//         <option value="currentlyReading">Currently Reading</option>
//         <option value="wantToRead">Want to Read</option>
//         <option value="read">Read</option>
//         <option value="none">None</option>
//       </select>
//     </div>
//   );
// }

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
  

    return <div tabIndex="0" className="book-shelf-changer" onBlur={() => this.toggleDropdown()} onFocus={() => this.toggleDropdown() }>
        {isOpen && (
          <ul className="book-dropdown">
          <div className="dropdown-top"><span>Add to...</span></div>
          <li><span>Currently Reading</span></li>
          <li><span>Want to Read</span></li>
          <li><span>Read</span></li>
          <li><span>None</span></li>
          <li><span>Close</span></li>
        </ul>
        )}
      </div>;
  }
}

export default MoveToBtn;
