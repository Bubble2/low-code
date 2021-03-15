import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import './index.scss';

const Root = (props, ref) => {
  

  return (
    <DndProvider backend={HTML5Backend}>
      <Main ref={ref} {...props}/>
    </DndProvider>
  );
};

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './Settings';

export default forwardRef(Root);
