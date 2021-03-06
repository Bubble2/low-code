import React, {useState, useEffect} from 'react';
import SearchInput from './child'
// 使用 Ant Design 风格
import FormRender from '@renderer/antd';
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
        "type": "string",
        "ui:widget": "SearchInput"
      },
      "test": {
        "title": "测试",
        "type": "object",
        "properties": {
          "modal": {
            "title": "弹层隐藏部分配置",
            "description": "目前支持modal/drawer",
            "type": "object",
            "properties": {
              "obj1": {
                "title": "object + modal",
                "type": "object",
                "ui:options": {
                  "modal": true
                },
                "properties": {
                  "input1": {
                    "title": "输入框1",
                    "type": "string"
                  },
                  "input2": {
                    "title": "输入框2",
                    "type": "string"
                  }
                }
              },
              "list1": {
                "title": "list + modal",
                "type": "array",
                "ui:options": {
                  "modal": {
                    "text": "配置完全参考antd/fusion文档",
                    "mask": true,
                    "width": 400
                  }
                },
                "items": {
                  "type": "object",
                  "properties": {
                    "input1": {
                      "title": "输入框1",
                      "name": "input-1",
                      "type": "string"
                    },
                    "input2": {
                      "title": "输入框2",
                      "type": "string"
                    }
                  }
                }
              },
              "list3": {
                "title": "list套list",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "input1": {
                      "title": "简单输入框",
                      "type": "string"
                    },
                    "list4": {
                      "title": "数组",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "input1": {
                            "title": "输入框1",
                            "type": "string"
                          },
                          "input2": {
                            "title": "输入框2",
                            "type": "string"
                          }
                        }
                      },
                      "ui:options": {
                        "drawer": true
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
          widgets={{SearchInput}}
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