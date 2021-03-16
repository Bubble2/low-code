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
        title: '按钮名称',
        type: 'string'
      },
      href: {
        title: '链接url',
        type: 'string'
      }
    }
  }
];

export const bizElements = [
  {
    text: 'inputItem',
    name: 'inputItem',
    widget: 'inputItem', //这个一定要有，默认值ui:widget字段和这个widget名称相同时能找到这个下面的setting
    schema: {
      title: '请购日期',
      type: 'string',
      'ui:widget': 'inputItem',
      default: '23123',
      inputType: 'input',
      requiredMessage: '此项为必填项！'
    },
    setting: {
      title: {
        title: '标题',
        type: 'string'
      },
      default: {
        title: '默认值',
        type: 'string',
      },
      inputType: {
        title: '输入框类型',
        type: 'string',
        enum: ['input', 'datePicker'],
        enumNames: ['输入框', '日期选择'],
      },
      selector: {
        title: '快捷录入方式',
        type: 'string',
        enum: ['userModal'],
        enumNames: ['人员选择弹层'],
        'ui:options': {
          placeholder: '请选择'
        }
      },
      required: {
        title: '是否必填',
        type: 'boolean'
      },
      requiredMessage: {
        title: '必填项报错文案',
        type: 'string',
        'ui:options': {
          placeholder: '不填则使用默认文案！'
        }
      },
    },
  },
  {
    text: '物品弹层',
    name: 'goodsModal',
    widget: 'goodsModal',
    schema: {
      title: '物品弹层',
      type: 'string',
      'ui:widget': 'goodsModal'
    },
    setting: {
      title: {
        title: '标题',
        type: 'string'
      }
    },
  }
];

export const layoutElements = [
  {
    text: 'mainFields',
    name: 'mainFields',
    widget: 'mainFields', //这个一定要有，默认值ui:widget字段和这个widget名称相同时能找到这个下面的setting
    schema: {
      title: '单据主要字段',
      type: 'object',
      'ui:widget': 'mainFields'
    },
    setting: {
      layout: {
        title: '整体布局',
        type: 'string',
        enum: ['3', '6'],
        enumNames: ['一行三列', '一行六列' ],
        options: {
          placeholder: '默认一行三列'
        },
        default: '3'
      }
    },
  },
]

export const defaultSettings = [
  {
    title: '基础组件',
    widgets: elements
  },
  {
    title: '业务组件',
    widgets: bizElements
  },
  {
    title: '布局组件',
    widgets: layoutElements
  }
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    
  },
};
