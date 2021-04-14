import React from 'react';
import Form from '../base/form';
import FormContext from '../common/formContext'


export default ({ children, ...otherProps }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <FormContext.Provider value={form}>
        {children}
      </FormContext.Provider>
    </Form>
  );
}
