import React from 'react';
import Form from '../common/form';

export default ({ children, ...otherProps }) => {
  return (
    <Form>
      {children}
    </Form>
  );
}
