// 只需写配置，方便可扩展
export const defaultCommonSettings = {
  $id: {
    title: 'ID',
    description: '数据存储的名称/英文/必填',
    type: 'string',
    'ui:widget': 'idInput',
  }
  
};

// widget 用于schema中每个元素对应的右侧配置知道用哪个setting

export const elements = [
  {
    text: '输入框',
    name: 'input',
    widget: 'input',
    schema: {
      title: '输入框',
      type: 'string',
    },
    setting: {
      title: {
        title: '标题',
        type: 'string'
      }
    },
  },
  {
    text: '按钮',
    name: 'button',
    widget: 'button',
    schema: {
      title: '按钮',
      type: 'html',
      "ui:widget": "button"
    },
    setting: {
      title: {
        title: '标题',
        type: 'string'
      },
      buttonType: {
        title: '按钮类型',
        type: 'string',
        enum: ['link', 'event'],
        enumNames: ['链接', '事件'],
        default: 'link'
      },
      linkUrl: {
        title: '链接url',
        type: 'string',
        'ui:hidden':(formData, rootValue)=>{
          return rootValue.buttonType.value !== "link"
        }
      }
    }
  }
];

export const defaultSettings = [
  {
    title: '基础组件',
    widgets: elements
  }
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    
  },
};
