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
      "$id": "ui-input",
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

export const bizElements = [
  {
    text: 'label',
    name: 'label',
    widget: 'label',
    schema: {
      title: '请购日期',
      type: 'string',
      'ui:widget': 'label'
    },
    setting: {
      title: {
        title: '标题',
        type: 'string'
      },
      isRequired: {
        title: '是否必填',
        type: 'boolean'
      },
      inputType: {
        title: '输入框类型',
        type: 'string',
        enum: ['input', 'datePicker'],
        enumNames: ['输入框', '日期选择'],
        default: 'input'
      }
    },
  },
];

export const defaultSettings = [
  {
    title: '基础组件',
    widgets: elements
  },
  {
    title: '业务组件',
    widgets: bizElements
  }
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    
  },
};
