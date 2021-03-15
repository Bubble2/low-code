import React, {useState, useEffect} from 'react';
import Child from './child'
// 使用 Ant Design 风格
import FormRender from '@pages/renderer/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';
import {connect} from 'react-redux';

const schema = {
    "type": "object",
    "properties": {
      "string": {
        "title": "字符串",
        "type": "string",
        "maxLength": 12,
        "ui:disabled": true
      },
      "number": {
        "title": "数字",
        "type": "number"
      },
      "select": {
        "title": "单选",
        "type": "string",
        "enum": ["a", "b", "c"],
        "enumNames": ["早", "中", "晚"],
        "ui:width": "50%"
      },
      "other": {
        "title": "其他",
        "type": "object",
        "ui:widget": "childComponent"
      }
    }
};

function Index() {
    const [formData, setData] = useState({});
    const [valid, setValid] = useState([]);
    const [showValidate, setShowValidate] = useState(false);
  
    const onSubmit = () => {
      // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
      setShowValidate(true);
      if (valid.length > 0) {
        alert(`校验未通过字段：${valid.toString()}`);
      } else {
        alert(JSON.stringify(formData, null, 2));
      }
    };

    useEffect(()=>{
      // 需要在 componentDidMount 执行的内容
      
    }, [])

    return (
      <div style={{ maxWidth: 600 }}>
        <FormRender
          // path="https://focusapi.vemic.com/mock/144/schema"
          schema={schema}
          formData={formData}
          onChange={setData}
          onValidate={setValid}
          showValidate={showValidate}
          displayType="row" // 详细配置见下
          widgets={{
            childComponent: Child
          }}
        />
        <button onClick={onSubmit}>提交</button>
      </div>
    );
  }
  
export default Index;
// export default class Index extends React.Component{
//     render(){
//         return(
//             <Nav actived="demo3"/>
//         )
//     }
// }