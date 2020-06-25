import React from 'react';

export default function MoveToBtn(props) {
  return (
    <div className="book-shelf-changer">
      <select onChange={(e) => props.updateBookshelf(e, props.book)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}
