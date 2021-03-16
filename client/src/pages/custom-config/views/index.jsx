import React, { useState, useRef } from 'react';
import Generator from '@generator';
import { Button, Modal, Input } from '@abiz/rc-aeps';
const { TextArea } = Input;

const defaultValue = {
    schema: {
        type: 'object',
        'ui:widget': 'addForm',
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

const Demo = () => {
    const genRef = useRef(); // class组件用 React.createRef()

    return (
        <Generator ref={genRef} defaultValue={defaultValue} />
    );
};

export default Demo;
