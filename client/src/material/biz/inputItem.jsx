import React, {useContext} from 'react';
import { widgets } from '../base';
import Form from '../base/form';
import FormContext from '../common/formContext'
import {getKeyFromUniqueId} from '../common/utils'
import useUserModel from './useUserModal';


const Input = widgets.input;
const DatePicker = widgets.datePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default (props) => {

  const { schema } = props;

  const form = useContext(FormContext)

  const uniqueId = getKeyFromUniqueId(schema.$id)

  const widgetMap = {
    'input': Input,
    'datePicker': DatePicker
  }

  let InputWidget = (schema['ui:inputType'] && widgetMap[schema['ui:inputType']]) || Input;

  let extraProps = {};
  if(schema['ui:userModal']){
    extraProps = useUserModel(props);
  }

  return (
    <Form.Item
      {...layout}
      label={schema.title}
      name={uniqueId}
      rules={[{ required: schema.required, message: schema['ui:requiredMessage'] }]}
    >
      <InputWidget {...props} {...extraProps}/>
    </Form.Item>
  );
}
