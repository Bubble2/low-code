import React from 'react';
import { useStore } from '../hooks';
import { getWidgetName } from '../mapping';

const RenderField = ({
  $id,
  item,
  children,
}) => {
  const { schema, data } = item;
  const { onItemChange, widgets, mapping } = useStore();

  let widgetName = getWidgetName(schema, mapping);
  const customWidget = schema['ui:widget'];
  if (customWidget && widgets[customWidget]) {
    widgetName = customWidget;
  }
  let Widget = widgets[widgetName];
  // 如果不存在，比如有外部的自定义组件名称，使用默认展示组件
  if (!Widget) {
    const defaultSchema = { ...schema };
    delete defaultSchema['ui:widget'];
    widgetName = getWidgetName(defaultSchema, mapping);
    Widget = widgets[widgetName] || 'input';
  }

  const onChange = value => {
    const newItem = { ...item };
    newItem.data = value;
    onItemChange($id, newItem);
  };

  // TODO: useMemo
  const usefulWidgetProps = {
    disabled: schema['ui:disabled'],
    readOnly: schema['ui:readOnly'],
    hidden: schema['ui:hidden'],
    options: schema['ui:options'],
    labelWidth: schema['ui:labelWidth'],
    width: schema['ui:width'],
  };
  
  return (
    <>
      <Widget
        value={data}
        onChange={onChange}
        schema={schema}
        {...usefulWidgetProps}
        children={children}
      />
    </>
  );
};

export default RenderField;
