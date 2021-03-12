import React from 'react';
import { Modal } from '@abiz/rc-aeps';

export default (props) => {

  const { 
    schema,
    visible = false,
    toggleModal,
    children,
    ...otherProps
  } = props;

  const allProps = {
    visible,
    onOk: toggleModal,
    onCancel: toggleModal,
    ...otherProps.options
  }

  return (
    <Modal {...allProps}>{children}</Modal>
  );
}
