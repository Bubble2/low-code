import React from 'react';
import { useStore, useGlobal } from '../hooks';
import { getWidgetName } from '../mapping';

const RenderField = ({
  $id,
  item,
  materialData4Setting,
  children,
}) => {
  const { schema, data } = item;
  const setGlobal = useGlobal();
  const { onItemChange, widgets, mapping, selected } = useStore();

  let isSelectedComponent = selected === $id;
  if (selected && selected[0] === '0') {
    isSelectedComponent = selected.substring(1) === $id;
  }

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

  const onSelectComponent = (data)=>{
    setGlobal({materialData: data})
  }

  // TODO: useMemo
  const usefulWidgetProps = {
    disabled: schema['ui:disabled'],
    readOnly: schema['ui:readOnly'],
    hidden: schema['ui:hidden'],
    options: schema['ui:options']
  };
  
  return (
    <>
      <Widget
        value={data}
        onChange={onChange}
        onSelectComponent={onSelectComponent}
        isSelectedComponent={isSelectedComponent}
        materialData4Setting={materialData4Setting}
        schema={schema}
        {...usefulWidgetProps}
        children={children}
      />
    </>
  );
};

export default RenderField;
