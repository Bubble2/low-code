import React from 'react';

export default function TableTop({ children }) {
  return (
    <div className="data-hd clearfix">
      <ul className="flr data-console">{children}</ul>
    </div>
  );
}
