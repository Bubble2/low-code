import React from 'react';
import FRWrapper from '../FRWrapper';
import { useStore, useGlobal } from '../hooks';
import { components } from '../components';

import {
  defaultSettings,
  defaultCommonSettings,
  elements
} from '../Settings';
import { getWidgetName } from '../mapping';
import { isObject } from '../utils';

export default function ItemSettings() {
  const { selected, flatten, onItemChange, userProps = {}, materialData } = useStore();
  const { settings, commonSettings } = userProps;
  let settingSchema = {};
  let settingData = {};
  const setGlobal = useGlobal();

  const getWidgetList = (settings, commonSettings) => {
    let widgetList = [];
    settings.forEach(setting => {
      // TODO: 这里要判断一下否则会crash
      const _widgets = setting.widgets;
      const basicWidgets = _widgets
        .filter(item => item.widget)
        .map(b => ({ ...b, setting: { ...commonSettings, ...b.setting } }));
      widgetList = [...widgetList, ...basicWidgets];
    });
    return widgetList;
  };

  const onDataChange = newSchema => {
    if (selected) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, schema: newSchema });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  // 算widgetList
  const _settings = Array.isArray(settings)
    ? [...settings, { widgets: [...elements] }] // TODO: 不是最优解
    : defaultSettings;
  const _commonSettings = isObject(commonSettings)
    ? commonSettings
    : defaultCommonSettings;
  const widgetList = getWidgetList(_settings, _commonSettings);

  // setting该显示什么的计算，要把选中组件的schema和它对应的widgets的整体schema进行拼接
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    }
    if (widgetName) {
      // const name = getKeyFromUniqueId(selected);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const schemaNow = element.setting;
      settingSchema = {
        schema: {
          type: 'object',
          properties: {
            ...schemaNow,
          },
        },
      };
      settingData = itemSelected.schema;
    }
  } catch (error) {
    console.log(error);
  }

  // TODO2: 这边开放
  return (
    <div style={{ paddingRight: 24 }}>
      <div className="fr-field w-100 fr-field-complex fr-field-object">
        <div className="fr-content">
          <div className="w-100">
            <div className="flex flex-wrap pl0">
                <FRWrapper
                  schema={settingSchema}
                  formData={settingData}
                  onChange={onDataChange}
                  widgets={components}
                  materialData4Setting={materialData}
                  preview={true}
                />
                {/* <Renderer
                  schema={settingSchema.schema}
                  formData={settingData}
                  onChange={onDataChange}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
