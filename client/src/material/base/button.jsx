import React from 'react';
import { Button } from '@abiz/rc-aeps';

export default (props) => {

  const {schema} = props;
  const buttonType = schema.buttonType;
  const otherProps = {
    onClick:()=>{

    }
  }
  return (
    <Button>{props.schema.title}</Button>
  );
}
