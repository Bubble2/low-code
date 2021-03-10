import React from 'react';

export default function MainFields({ children }) {
  return (
      <div className="input-lst-wrap">
        <ul className="input-lst clearfix">{children}</ul>
      </div>
  );
}
