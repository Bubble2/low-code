import React, {
  useRef,
  useEffect,
  useMemo,
  useImperativeHandle,
  useState,
} from 'react';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import { usePrevious } from './hooks';
import PropTypes from 'prop-types';
import { isDeepEqual, combineSchema } from './base/utils';
import { asField } from './base/asField';
import parse from './base/parser';
import resolve from './base/resolve';
import fetcher from './HOC/fetcher';
import './atom.scss';
import './index.scss';


function RenderField({ fields, onChange, ...settings }) {
  const { Field, props } = parse(settings, fields);
  if (!Field) {
    return null;
  }
  return (
    <Field
      {...props}
      value={settings.data}
      onChange={onChange}
      formData={settings.formData}
    />
  );
}

// 在顶层将 propsSchema 和 uiSchema 合并，便于后续处理。 也可直接传入合并的 schema
const Wrapper = ({
  schema,
  uiSchema = {},
  ...rest
}) => {
  let _schema = {};
  const jsonSchema = schema; // 兼容schema字段和propsSchema字段
  // 将uiSchema和schema合并（推荐不写uiSchema）
  _schema = combineSchema(jsonSchema, uiSchema);

  return (
    <FormRender  
      {...rest}
      schema={_schema}
    />
  );
};

function FormRender({
  name = '$form',
  schema = {},
  formData = {},
  widgets = {},
  fields = {},
  mapping = {},
  onChange = () => {},
  onMount = () => {},
  useLogger = false,
  forwardedRef,
}) {
  const isUserInput = useRef(false); // 状态改变是否来自于用户操作
  const originWidgets = useRef();
  const generatedFields = useRef({});
  const firstRender = useRef(true);
  const previousSchema = usePrevious(schema);
  const previousData = usePrevious(formData);

  const [isEditing, setEditing] = useState(false);
  const debouncedSetEditing = useDebouncedCallback(setEditing, 300);

  const data = useMemo(() => resolve(schema, formData), [schema, formData]);

  useEffect(() => {
    onChange(data);
  }, []);

  useEffect(() => {
    if (isUserInput.current) {
      isUserInput.current = false;
      return;
    }
    if (!isDeepEqual(previousSchema, schema)) {
      onChange(data);
    } else if (!isDeepEqual(previousData, formData)) {
      if (firstRender.current) {
        onMount();
        firstRender.current = false;
      }
    }
  }, [schema, formData]);

  // data修改比较常用，所以放第一位
  const resetData = (newData, newSchema) => {
    const _schema = newSchema || schema;
    const _formData = newData || formData;
    const res = resolve(_schema, _formData);
    return new Promise(resolve => {
      onChange(res);
      resolve(res);
    });
  };

  useImperativeHandle(forwardedRef, () => ({
    resetData,
  }));

  // 用户输入都是调用这个函数
  const handleChange = (key, val) => {
    isUserInput.current = true;
    // 开始编辑，节流
    setEditing(true);
    debouncedSetEditing.callback(false);
    onChange(val);
  };

  const generated = {};
  if (!originWidgets.current) {
    originWidgets.current = widgets;
  }
  Object.keys(widgets).forEach(key => {
    const oWidget = originWidgets.current[key];
    const nWidget = widgets[key];
    let gField = generatedFields.current[key];
    if (!gField || oWidget !== nWidget) {
      if (oWidget !== nWidget) {
        originWidgets.current[key] = nWidget;
      }
      gField = asField({ Widget: nWidget });
      generatedFields.current[key] = gField;
    }
    generated[key] = gField;
  });

  const settings = {
    schema,
    data,
    name,
    useLogger,
    formData: data,
    isEditing,
  };

  const _fields = {
    // 根据 Widget 生成的 Field
    generated,
    // 自定义的 Field
    customized: fields,
    // 字段 type 与 widgetName 的映射关系
    mapping,
  };

  return (
      <RenderField {...settings} fields={_fields} onChange={handleChange} />
  );
}

FormRender.propTypes = {
  name: PropTypes.string,
  schema: PropTypes.object,
  formData: PropTypes.object,
  widgets: PropTypes.objectOf(PropTypes.func),
  fields: PropTypes.objectOf(PropTypes.element),
  mapping: PropTypes.object,
  onChange: PropTypes.func,
  onMount: PropTypes.func,
  useLogger: PropTypes.bool
};

export default fetcher(Wrapper);
