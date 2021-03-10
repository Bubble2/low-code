import React from 'react';
import { Layout, Breadcrumb, Tabs, Button, Row, Col } from '@abiz/rc-aeps'

const { Content } = Layout;
const { TabPane } = Tabs;

const Demo = () => {
  const addField = () =>{
    
  }

  return (
    <Layout>
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">模块配置列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>采购订单新增页配置</Breadcrumb.Item>
        </Breadcrumb>

        <Layout>
          <Content>
            <Row>
              <Col span={8}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="顶部操作区域" key="1">
                    顶部操作区域
                      </TabPane>
                  <TabPane tab="单据主要字段" key="2">
                    <Button onClick={addField}>新增字段</Button>
                  </TabPane>
                  <TabPane tab="物品表格" key="3">
                    物品表格
                      </TabPane>
                  <TabPane tab="单据其它字段" key="4">
                    单据其它字段
                      </TabPane>
                  <TabPane tab="底部操作区域" key="5">
                    底部操作区域
                      </TabPane>
                </Tabs>
              </Col>
              <Col span={16}>
                预览
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Demo;
