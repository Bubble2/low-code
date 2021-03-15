import React from 'react';

export default function MainFields(props) {

  const {children, schema} = props;

  const {layout} = schema;

  return (
      <div className="input-lst-wrap">
        <ul className="input-lst clearfix" style={{display: 'flex'}}>{children}</ul>
      </div>
  );
}
