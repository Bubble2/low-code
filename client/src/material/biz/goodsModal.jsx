import React, { useState } from 'react';
import { widgets } from '../base';

const Modal = widgets.modal;
const Button = widgets.button;


export default (props) => {
  const [visible, setVisible] = useState(false)

  const toggleModal = () => {
    setVisible(() => !visible);
  }

  return (
    <>
      <Button onClick={toggleModal} {...props}></Button>
      <Modal {...props} toggleModal={toggleModal} visible={visible} title="物品弹层">
        物品表格
      </Modal>
    </>
  );
}
