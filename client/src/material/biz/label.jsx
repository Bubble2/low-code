import React from 'react';
import {widgets} from '../base';

const Input = widgets.input;
const DatePicker = widgets.date;


export default (props) => {

  const widgetMap = {
    'input': Input,
    'datePicker': DatePicker
  }

  const {schema} = props;

  let InputWidget = (schema.inputType && widgetMap[schema.inputType]) || Input;

  return (
    <li className="input-item">
        <label className="input-item-tit">{schema.required && <span className="required">*</span>}{schema.title}</label>
        <div className="input-item-bd">
            <InputWidget {...props}/>
        </div>
    </li>
  );
}
