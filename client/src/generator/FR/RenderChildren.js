import React from 'react';
import FR from './index';

const RenderChildren = ({ children = [], preview , ...otherProps}) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          preview,
          ...otherProps
        };
        return <FR key={i.toString()}  {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
