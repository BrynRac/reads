import React from 'react';

export default function TermWindow(props) {
  return (
    <div className="termWrapper">
      <ul className="termList">
        {props.terms.map((term, index) => (
          <li onClick={(e) => props.getTerm(e)} className="termBtn" key={index}>
            <input type="submit" value={term} />
          </li>
        ))}
      </ul>
    </div>
  );
}
