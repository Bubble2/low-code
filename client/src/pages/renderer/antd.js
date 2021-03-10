/**
 * Created by Tw93 on 2018-08-28.
 * antd 主题入口文件
 */

import React, { useState, forwardRef } from 'react';
import FormRender from './index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  mapping as defaultMapping,
  widgets as defaultWidgets,
} from './widgets/antd';
import 'antd/dist/antd.css';

const AntdForm = (
  { mapping = {}, widgets = {}, configProvider = {}, ...rest },
  ref
) => {
  // const [formData, setData] = useState({});
 
  // let _schema = {
  //   type: 'object',
  //   properties: {
  //     string: {
  //       title: '字符串',
  //       type: 'string',
  //       maxLength: 12,
  //       'ui:disabled': true,
  //     },
  //     number: {
  //       title: '数字',
  //       type: 'string',
  //     },
  //     select: {
  //       title: '单选',
  //       type: 'string',
  //       enum: ['a', 'b', 'c'],
  //       enumNames: ['早', '中', '晚'],
  //       'ui:width': '50%', // uiSchema 合并到 schema 中（推荐写法，书写便捷）
  //     },
  //   },
  // };

  // _schema={..._schema, ...schema}


  return (
    <ConfigProvider {...configProvider} locale={zhCN}>
      <FormRender
        mapping={{
          ...defaultMapping,
          ...mapping,
        }}
        // schema={_schema}
        widgets={{
          ...defaultWidgets,
          ...widgets,
        }}
        // formData={formData}
        // onChange={setData}
        {...rest}
        forwardedRef={ref}
      />
    </ConfigProvider>
  );
};

export default (forwardRef(AntdForm));
