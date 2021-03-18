import React from 'react';
import { DatePicker} from '@abiz/rc-aeps';

export default (props)=> {
  const {
    schema,
    value,
    disabled,
    readOnly,
    ...otherProps
  } = props;

  const handleChange = (date, dateString) => props.onChange(date, dateString);

  const allProps = {
    value,
    disabled,
    readOnly,
    onChange: handleChange,
    ...otherProps.options
  }

  return (
    <DatePicker {...allProps} />
  );
}
