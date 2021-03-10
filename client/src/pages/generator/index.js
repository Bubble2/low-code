import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import './index.scss';

const Root = (props, ref) => {
  const defaultValue = {
    schema: {
        type: 'object',
        properties: {
          mainHd: {
              title: '头部区域',
              type: 'object',
              'ui:widget': 'mainHd',
              properties: {
                importButton: {
                  title: '批量导入请购单',
                  type: 'html',
                  'ui:widget': 'button'
                }
              }
          },
          mainBd: {
            title: '内容区域',
            type: 'object',
            'ui:widget': 'mainBd',
            properties: {
              mainFields: {
                title: '单据主要字段',
                type: 'object',
                'ui:widget': 'mainFields'
              },
              tableWrapper: {
                title: '表格区域',
                type: 'object',
                'ui:widget': 'tableWrapper',
                properties: {
                  tableTop: {
                    title: '表格顶部操作区域',
                    type: 'object',
                    'ui:widget': 'tableTop'
                  },
                  goodsTable: {
                    title: '表格区域',
                    type: 'object',
                    'ui:widget': 'goodsTable'
                  },
                }
              },
              mainOpe: {
                title: '底部操作区域',
                type: 'object',
                'ui:widget': 'mainOpe'
              }
            }
          },
        }
    }
};

  return (
    <DndProvider backend={HTML5Backend}>
      <Main ref={ref} {...props} defaultValue={defaultValue}/>
    </DndProvider>
  );
};

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './Settings';

export default forwardRef(Root);
