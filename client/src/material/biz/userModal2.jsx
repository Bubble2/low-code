import React, { useState, useEffect } from 'react';
import {BorderOuterOutlined} from '@abiz/icons-aeps';
import {Table} from '@abiz/rc-aeps'
import { widgets } from '../base';

const Drawer = widgets.drawer;


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

export default (props) => {
  const [visible, setVisible] = useState(false)

  const toggleModal = () => {
    setVisible(() => !visible);
  }
  
  useEffect(()=>{
    if(props.isSelectedComponent){
      props.onSelectComponent && props.onSelectComponent(columns)
    }
  },[props.isSelectedComponent])

  return (
    <>
      <BorderOuterOutlined onClick={toggleModal}/>
      <Drawer {...props} options={{
        width: 720
      }}  toggleModal={toggleModal} visible={visible} title="用户弹层">
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      </Drawer>   
    </>
  );
}
