import React from 'react';
import { Form } from '@abiz/rc-aeps';

export default (props) => {


  const {schema, children} = props;


  return (
    <Form.Item
    label="Username"
    name="username"
    rules={[{ required: true, message: 'Please input your username!' }]}
  >
      {children}
  </Form.Item>
  );
}
