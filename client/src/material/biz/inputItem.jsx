import React from 'react';
import { widgets } from '../base';
import Form from '../common/form';
import UserModal from './userModal';
import {SettingOutlined} from '@abiz/icons-aeps'


const Input = widgets.input;
const DatePicker = widgets.datePicker;


const getKeyFromUniqueId = (uniqueId = '#') => {
  const arr = uniqueId.split('/');
  return arr[arr.length - 1];
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default (props) => {

  const widgetMap = {
    'input': Input,
    'datePicker': DatePicker
  }

  const { schema } = props;

  let InputWidget = (schema.inputType && widgetMap[schema.inputType]) || Input;
  let extraProps = {};

  if(schema.selector){
    const SelectorMap = {
      'userModal': UserModal
    }
    const Selector = SelectorMap[schema.selector];
    extraProps = {
      options: {
        addonAfter: <Selector />
      }
    }
  }

  return (
    <Form.Item
      {...layout}
      label={schema.title}
      name={getKeyFromUniqueId(schema.$id)}
      rules={[{ required: schema.required, message: schema.requiredMessage }]}
    >
      <InputWidget {...props} {...extraProps}/>
    </Form.Item>
  );
}
