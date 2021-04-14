import React, { useState ,useEffect} from 'react';
import {Select} from '@abiz/rc-aeps';
import ConfigForm from './hoc/configForm';

const { Option } = Select;

export default (props) => {
  const { schema } = props;
  const [ fieldPair, useFieldPair ] = useState([{ source: [] , target: '' }])

  // console.log('materialData4Setting', props.materialData4Setting)

  useEffect(() => {
    useFieldPair((prevState) => {
      return prevState.map(item=>{
        item.source = props.materialData4Setting || [];
        return item;
      })
    })
  }, [props.materialData4Setting])

  return (
    <ConfigForm {...schema} hidden={props.hidden}>
      <ul className="w-100">
        {fieldPair.map((child, index)=>{
            return (<li key={index}>
              <Select style={{ width: 120 }}>
                {
                  child.source.map((item, i)=>{
                    return <Option key={i} value={item.dataIndex}>{item.title}</Option>
                  })
                }
              </Select>
              {/* <Select>
                {
                  child.target.map((item, i)=>{
                    <Option key={i}>{item}</Option>
                  })
                }
              </Select> */}
            </li>)
          })}
      </ul>
    </ConfigForm>
  )

}
