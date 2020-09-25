/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func: 布局文件入口
 ***/
import React, {
  memo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {RouteConfigComponentProps} from 'react-router-config';
import { renderRoutes } from 'react-router-config';
import { useSelector } from 'react-redux';
import useActions from '../hooks/useActions';
import { Layout, Spin, Drawer, Form, Radio, Button, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import TopMenu from './components/top-menu';
import RightMenu from './components/right-menu';
import LeftTopSidebar from './left-top';
import BreadcrumbComponent from './components/breadcrumb';
import { menuAction } from '../redux/saga/actions/menu';


import './index.less';


const { Header, Content } = Layout;
const { Group } = Radio;
const { Item } = Form;

interface IProps extends RouteConfigComponentProps{}

const BlogLayout: React.FC<IProps> = (props) => {

  const { route, history, location } = props;
  const { topMenu, currentSidebar, theme, drawer, primaryColor }  = useSelector((state: IState) => state.menu);
  const [collapsed, setCollapsed] = useState(false);
  const actions = useActions({
    setMenu: menuAction.setMenu,
    setDrawer: menuAction.setDrawer,
    setTheme: menuAction.setTheme,
  });

  useEffect(() => {

    if( route ) {
      actions.setMenu({
        routes: route.routes,
      });
    }
  }, []);

  const handleSettingClick = useCallback((values) => {

    actions.setTheme(values);
  }, [actions]);

  if( topMenu.length === 0 ) return <Spin className="spin-center" />

  const handleDrawerClose = () => {
    actions.setDrawer(false);
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout">
      <LeftTopSidebar
        collapsed={collapsed}
        history={history}
        location={location}
      />
      <Layout className="layout-header">
        <Header
          className="layout-header-background"
        >
          <div className="layout-header-top">
            {
              currentSidebar.length !== 0
              &&
              <div
                className='trigger'
                style={{
                  color: primaryColor,
                }}
              >
                {
                  React.createElement(
                    collapsed
                      ? MenuUnfoldOutlined
                      : MenuFoldOutlined,
                    {onClick: toggle}
                  )
                }
              </div>
            }
            <div className="box1">
              <TopMenu
                history={history}
                location={location}
              />
            </div>
            <div className="box2">
              <RightMenu />
            </div>
          </div>
          <Drawer
            width={320}
            visible={drawer}
            onClose={handleDrawerClose}
          >
            <Form
              onFinish={handleSettingClick}
              initialValues={{
                theme
              }}
            >
              <Item
                label="导航主题"
                name="theme"
              >
                <Group value={theme} size='middle'>
                  <Radio.Button value="dark">dark-暗色系</Radio.Button>
                  <Radio.Button value="light">light-亮色系</Radio.Button>
                </Group>
              </Item>
              <Item>
                <Button
                  htmlType="submit"
                  style={{
                    marginRight: "20px"
                  }}
                >
                  恢复系统设置
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  保存
                </Button>
              </Item>
            </Form>
          </Drawer>
        </Header>
        <Content
          className="layout-content"
        >
          <BreadcrumbComponent history={history} location={location} />
          {
            renderRoutes(route?.routes)
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(BlogLayout);
