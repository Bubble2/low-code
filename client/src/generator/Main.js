import React, { useEffect, forwardRef } from 'react';
import { useSet } from './hooks';
import FRWrapper from './FRWrapper';
import { widgets as defaultWidgets } from '@material/base';
import { layoutWidgets as defaultLayoutWidgets } from '@material/layout';
import { bizWidgets as defaultBizWidgets } from '@material/biz';
import { mapping } from './mapping';
import './atom.scss';
import './Main.scss';

const DEFAULT_SCHEMA = {
  schema: {
    type: 'object',
    properties: {},
  },
  uiSchema: {},
  formData: {},
};

// TODO: formData 不存在的时候会报错：can't find # of undefined
function App(
  {
    defaultValue,
    submit,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
    widgets = {},
  },
  ref,
) {

  const [state, setState] = useSet({
    formData: {},
    frProps: {
      
    }, // form-render 的全局props等
    preview: false, // preview = false 是编辑模式
    schema: {}, 
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
    materialData: null
  });

  // 收口点 propsSchema 到 schema 的转换 (一共3处，其他两个是 importSchema 和 setValue，在 FRWrapper 文件)
  useEffect(() => {
    const schema = defaultValue || DEFAULT_SCHEMA;
    setState({
      schema: schema, // 旧的转新的，新的不变
      formData: (schema && schema.formData) || {},
    });
  }, [defaultValue]);

  const {
    formData,
    frProps,
    preview,
    schema,
    selected,
    materialData
  } = state;

  const onChange = data => {
    setState({ formData: data });
  };

  const onSchemaChange = newSchema => {
    const result = { ...schema };
    result.schema = newSchema;
    setState({ schema: result });
  };


  const rootState = {
    preview,
    simple: false,
    mapping,
    widgets: { ...defaultWidgets, ...defaultLayoutWidgets, ...defaultBizWidgets, ...widgets },
    selected,
    materialData
  };

  const userProps = {
    submit,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
  };

  const allProps = {
    schema,
    formData,
    onChange,
    setGlobal: setState,
    onSchemaChange,
    ...rootState, // 顶层的state
    userProps, // 用户传入的props
    frProps // fr顶层的props
  };

  return <FRWrapper ref={ref} {...allProps} />;
}

export default forwardRef(App);
