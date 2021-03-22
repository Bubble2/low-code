import React from 'react';
import { useStore} from '../hooks';
import RenderChildren from './RenderChildren';
import RenderField from './RenderField';
import Wrapper from './Wrapper';

const FR = ({ id = '#', preview = false, materialData4Setting = null }) => {
  const { flatten, selected } = useStore();
  
  
  const item = flatten[id];
  if (!item) return null;

  const { schema } = item;
  const isObj = schema.type === 'object';
  const isList = schema.type === 'array' && schema.enum === undefined;
  const isComplex = isObj || isList;

  const fieldProps = {
    $id: id,
    item,
    isComplex,
    materialData4Setting
  };
  const childrenProps = {
    children: item.children,
    preview,
    materialData4Setting
  };

  const childrenElement =
    item.children && item.children.length > 0 ? (
      <RenderChildren {...childrenProps} />
    ) : null;

  // TODO: list 也要算进去
  if (preview) {
    return (
        <RenderField {...fieldProps}>
          {(isObj || isList) && childrenElement}
        </RenderField>
    );
  }

  const isEmpty = Object.keys(flatten).length < 2; // 只有一个根元素 # 的情况
  if (isEmpty) {
    return (
      <Wrapper $id={id} item={item}>
        <div
          className={`h-100 f4 black-40 flex items-center justify-center`}
        >
          点击/拖拽左侧栏的组件进行添加
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper $id={id} item={item}>
      <RenderField {...fieldProps}>
        {(isObj || isList) && item.children.length===0?
          <Wrapper $id={id} item={item} inside>
            <div className="h2">点击新增组件放此位置</div>
          </Wrapper>:childrenElement
        }
      </RenderField>
    </Wrapper>
  );
};

export default FR;
