/***
 * @auth: dmx
 * @time: 2020/7/2
 * @func: 顶部导航菜单
 ***/
import React, {
  memo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import {
  Menu,
} from 'antd';
import { menuAction } from '../../../redux/saga/actions/menu';
import { MenuProps } from 'antd/lib/menu';
import { IRouteProps } from '../../layout';

interface IProps extends IRouteProps {}

const { Item } = Menu;
const TopMenu: React.FC<IProps> = (props) => {
  const { topMenu, currentTopMenu } = useSelector((state: IState) => state.menu );
  const { history, location: {pathname} } = props;
  const actions = useActions({
    setCurrentMenu: menuAction.setCurrentMenu,
  })

  const handleGoPathClick = useCallback(({key}) => {
    actions.setCurrentMenu({
      currentTopMenu: key,
    });

    history.push(key);

  }, [actions, history]);

  // 处理初始选中逻辑 和 侧边栏的 默认选中逻辑
  useEffect(() => {

    if(
      !currentTopMenu
      || pathname.split('/')[1] !== currentTopMenu.split('/')[1]
    ) {
      // 就要去寻找选中的是哪一项
      let selectedMenu = topMenu.find((menu) => {
        const matchedRoute = matchPath(
          pathname,
          {
            path: menu.path,
          }
        );
        return !!matchedRoute;
      });

      // 现在处理一上来要选中哪一个的问题
      if( pathname === '/' ) {
        if( topMenu[0] ) {
          actions.setCurrentMenu({
            currentTopMenu: topMenu[0].path,
          });
        }
      } else if( selectedMenu ) {
        const path = selectedMenu.path;
        // 就设置当前选中的项
        actions.setCurrentMenu({
          currentTopMenu: path,
        });
      } else {
        // 如果什么都没有匹配到，就直接404
        return history.push('/404');
      }
    }


  }, [actions, currentTopMenu, history, pathname, topMenu]);

  // 默认选中的menu
  const propsValue: MenuProps = {
    mode: 'horizontal',
  };
  if( currentTopMenu ) {
    propsValue.selectedKeys = [currentTopMenu];
  }


  // 侧边栏数据的 数据结构
  /*const sidebarMenu = {
    '/dashboard': [],
    '/blog-manage': [],
    '/person': [],
  }*/


  return (
    <div className="top-menu">
      <Menu
        {...propsValue}
        onClick={handleGoPathClick}
      >
        {
          topMenu.map((item) => (
            <Item
              key={item.path}
              icon={item.icon}
            >
              {
                item.name
              }
            </Item>
          ))
        }
      </Menu>
    </div>
  );
};

export default memo(TopMenu);
