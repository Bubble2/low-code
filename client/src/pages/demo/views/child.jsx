import React, { useState } from 'react';
// 使用 Ant Design 风格
import FormRender from '@renderer/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

const schema = {
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
              "modal": false
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

const Child = () => {
  const [formData, setFormData] = useState(() => schema.formData);
  const [valid, setValid] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const onValidate = _valid => {
    console.log('没有通过的校验:', _valid);
    setValid(_valid);
  };
  return (
    <div style={{ maxWidth: 800 }}>
      <FormRender
        displayType="row"
        showDescIcon
        labelWidth={120}
        schema = {schema}
        formData={formData}
        onChange={setFormData}
        onValidate={onValidate}
        readOnly={readOnly}
      />
    </div>
  );
};
export default Child;