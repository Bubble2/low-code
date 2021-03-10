import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../hooks';
import { isHidden } from './isHidden';
import {
  convertValue,
  isDeepEqual
} from './utils';

// asField拆分成逻辑组件和展示组件，从而可替换展示组件的方式完全插拔fr的样式
export const asField = ({ Widget }) => {
  let FieldContainer = ({
    hidden,
    props,
    disabled,
    readOnly,
    options,
    schema,
    isEditing,
    ...rest
  }) => {
    const firstRender = useRef(true);
    const fieldTouched = useRef(false);
    const {
      rootValue = {},
      formData = {},
      value: _value,
    } = rest;
    const prevValue = usePrevious(_value);
    // most key of schema, disabled, readOnly, options, hidden, support for function expression
    useEffect(() => {
      // 首次渲染不做, TODO: 万一首次渲染是用户输入触发的呢？
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      // 已经动过了就不用验证是否动过
      if (fieldTouched.current === true) return;
      // 之后每次改动就算touch了，尽量避免多余的去使用isDeepEqual，大的复杂表单性能会不好
      if (isDeepEqual(prevValue, _value)) return;
      fieldTouched.current = true;
    }, [_value]);

    let _hidden = hidden,
      _disabled = disabled,
      _readOnly = readOnly,
      _options = options,
      _schema = schema;

    const convertValues = () => {
      _hidden = convertValue(hidden, formData, rootValue);
      if (_hidden !== undefined && typeof _hidden !== 'boolean') {
        _hidden = isHidden({ hidden: _hidden, rootValue, formData });
      }
      _disabled = convertValue(disabled, formData, rootValue);
      _readOnly = convertValue(readOnly, formData, rootValue);
      _options = { ...options };
      try {
        Object.entries(_options).forEach(([key, _val]) => {
          _options[key] = convertValue(_val, formData, rootValue);
        });
      } catch (e) {}
      // iterate over schema, and convert every key
      _schema = { ...schema };
      Object.keys(_schema).forEach(key => {
        const availableKey = [
          'title',
          'description',
          'format',
          'minimum',
          'maximum',
          'minLength',
          'maxLength',
          'pattern',
          'message',
          'min',
          'max',
          'step',
          'enum',
          'enumNames',
        ];
        // TODO: need to cover more
        if (availableKey.indexOf(key) > -1) {
          _schema[key] = convertValue(_schema[key], formData, rootValue);
        }
      });
    };

    // 在编辑时使用快照，否则正常计算
    let screenShot = useRef();
    const saveScreenShot = () => {
      screenShot.current = {};
      screenShot.current.hidden = _hidden;
      screenShot.current.disabled = _disabled;
      screenShot.current.readOnly = _readOnly;
      screenShot.current.options = _options;
      screenShot.current.schema = _schema;
    };

    const readScreenShot = () => {
      _hidden = screenShot.current.hidden;
      _disabled = screenShot.current.disabled;
      _readOnly = screenShot.current.readOnly;
      _options = screenShot.current.options;
      _schema = screenShot.current.schema;
    };

    if (!isEditing || !screenShot.current) {
      convertValues();
      saveScreenShot();
    } else {
      readScreenShot();
    }

    if (_hidden) {
      return null;
    }

    // 传入组件的值
    const _rest = {
      ...rest,
      schema: _schema,
      disabled: _disabled,
      readOnly: _readOnly,
      options: _options,
      formData: formData || {},
      rootValue: rootValue || {},
    };

    return (
      <Widget {..._rest} />
    );
  };
  FieldContainer.propTypes = {
    props: PropTypes.object,
  };

  FieldContainer.defaultProps = {
    props: {}
  };

  return FieldContainer;
};
