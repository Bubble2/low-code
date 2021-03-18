import React from 'react';
import { Drawer } from '@abiz/rc-aeps';

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
    onClose: toggleModal,
    ...otherProps.options
  }

  return (
    <Drawer {...allProps}>{children}</Drawer>
  );
}
