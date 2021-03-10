import React from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover } from '@abiz/rc-aeps';
import previewContent from './hoc/previewContent';
import ConfigForm from './hoc/configForm';

const previewNode = (format, value) => {
  if (format !== 'image') {
    return null;
  }
  return (
    <Popover
      content={previewContent(format, value)}
      className="fr-preview"
      placement="bottom"
    >
      <PictureOutlined />
    </Popover>
  );
};

export default function input(p) {
  const { options = {}, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const { format = 'text' } = p.schema;
  const type = format === 'image' ? 'text' : format;
  const handleChange = (e) => p.onChange(e.target.value);
  return (
    <ConfigForm {...p.schema} hidden={p.hidden}>
      <Input
        style={style}
        {...options}
        value={p.value}
        type={type}
        disabled={p.disabled || p.readOnly}
        addonAfter={
          options.addonAfter ? options.addonAfter : previewNode(format, p.value)
        }
        onChange={handleChange}
      />
    </ConfigForm>
  );
}
