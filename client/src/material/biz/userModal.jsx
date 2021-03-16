import React, { useState } from 'react';
import {BorderOuterOutlined} from '@abiz/icons-aeps';
import { widgets } from '../base';

const Drawer = widgets.drawer;

export default (props) => {
  const [visible, setVisible] = useState(false)

  const toggleModal = () => {
    setVisible(() => !visible);
  }

  return (
    <>
      <BorderOuterOutlined onClick={toggleModal}/>
      <Drawer {...props} toggleModal={toggleModal} visible={visible} title="用户弹层">
        用户弹层
      </Drawer>
    </>
  );
}
