import React, { useContext } from 'react';
import {getKeyFromUniqueId} from '../common/utils'
import FormContext from '../common/formContext'
import UserModal from './userModal';

const useUserModel = (props)=>{
  const { schema } = props;

  const form = useContext(FormContext)

  const uniqueId = getKeyFromUniqueId(schema.$id)


  //快捷选择数据后回调
  const onSelect = (data) => {
    form.setFieldsValue({
      [uniqueId]: data[0].name
    })
  }

  const extraProps = {
    options: {
      addonAfter: <UserModal {...props} onSelect={onSelect} />
    }
  }
  return extraProps;
}

export default useUserModel;

