/***
 * @auth: dmx
 * @time: 2020/7/4
 * @func: 是left-top布局时的 sider组件
 ***/
import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import {
  Layout,
  Menu,
} from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { IRouteProps } from '../layout';

interface IProps extends IRouteProps{
  collapsed: boolean;
}

const { Sider } = Layout;
const { Item, SubMenu } = Menu;
const LeftTopSidebar: React.FC<IProps> = (props) => {

  const { collapsed, history, location: {pathname} } = props;
  const { currentSidebar, currentTopMenu, theme, primaryColor } = useSelector((state: IState) => state.menu );
  const { name, logo } = useSelector((state:any) => state.user.list);
  //
  const [keys, setKeys] = useState<{ currentOpenSubs: string[], currentSideMenu: string }>({
    currentSideMenu: '',
    currentOpenSubs: [],
  });
  // 每一项的 点击事件
  const handleMenuItemClick = useCallback(({key}) => {
    // 设置当前选中的selectKeys
    setKeys({
      ...keys,
      currentSideMenu: key,
    })

    history.push(key);
  }, [history, keys]);
  // subMenu 的展开关闭 监听事件
  const handleSubChange = useCallback((openKeys) => {
    setKeys({
      ...keys,
      currentOpenSubs: openKeys,
    })
  }, [keys]);

  useEffect(() => {

    if(
      !keys.currentSideMenu
      || ( currentTopMenu && !matchPath(pathname, {path: keys.currentSideMenu}))
    ) {
      let currentSideMenu = '';
      let currentOpenSubs: any[] = [];

      // 当前打开的菜单，默认是第一个
      if( currentSidebar.length !== 0 ) {
        // 如果当前的第0项 有下级路由，就要设置，当前展开的subMenu为第0项
        if( currentSidebar[0].routes ) {
          currentOpenSubs = [currentSidebar[0].path];
          currentSideMenu = currentSidebar[0].routes[0].path;
        } else {
          currentOpenSubs = [];
          currentSideMenu = currentSidebar[0].path;
        }
      }

      // 优先匹配二级菜单
      const subMenu = currentSidebar.find((sub: ISidebarItem) => {
        const matchedRoute = matchPath(pathname, {
          path: sub.path,
        });

        return !!matchedRoute;
      });
      if( subMenu ) {
        if( subMenu.routes ) {
          const { routes } = subMenu;
          currentSideMenu = routes?.[0].path;
          currentOpenSubs = [subMenu.path];

          // 匹配三级路由
          const selectSide: any = routes.find((sub: IMenuItem) => {
            const matchedRoute = matchPath(pathname, {
              path: sub.path,
            });

            return !!matchedRoute;
          });

          if( selectSide ) {

            // 判断还有没有四级路由
            if( selectSide.routes ) {
              const { routes } = selectSide;
              currentSideMenu = selectSide.routes?.[0].path;
              currentOpenSubs = [selectSide.path];
              // 匹配最后一级路由
              const lastRoute: any = routes.find((sub: IMenuItem) => {
                const matchedRoute = matchPath(pathname, {
                  path: sub.path,
                });

                return !!matchedRoute;
              });

              if( lastRoute ) {
                currentSideMenu = lastRoute.path;
              }
            } else {
              currentSideMenu = selectSide.path;
            }

          }

        } else {
          currentOpenSubs = [subMenu.path];
          currentSideMenu = subMenu.path;
        }
      }


      // 咱们匹配出来的路由 要和当前路径 match 保证万无一失，
      // 如果匹配失败， 咱们就重定向
      if( !matchPath(pathname, { path: currentSideMenu }) ) history.push(currentSideMenu);

      setKeys({
        currentSideMenu,
        currentOpenSubs,
      })
    }
  }, [currentSidebar, currentTopMenu, history, keys.currentSideMenu, pathname]);

  const style = useMemo(() => ({
    sidebar: {
      // boxShadow: `1px 0 6px ${primaryColor}`,
      boxShadow: `2px 0 8px 0 rgba(29,35,41,.05)`,
      background: theme === 'light' ? '#fff' : primaryColor,
    },
    logoColor: {
      backgroundColor: theme === 'light' ? '#fff' : primaryColor,
      color: theme === 'light' ? primaryColor : '#fff',
    }
  }), [primaryColor, theme])

  if( currentSidebar.length === 0 ) return null;


  return (
    <Sider
      className="sidebar"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={style.sidebar}
    >
      <div
        className="logo"
      >
        <CodepenOutlined
          style={style.logoColor}
          className="logo-icon" />
        <span
          className="logo-title"
          style={style.logoColor}
        >
          {name}
        </span>
      </div>
      <Menu
        theme={theme}
        mode="inline"
        onClick={handleMenuItemClick}
        selectedKeys={[keys.currentSideMenu]}
        openKeys={keys.currentOpenSubs}
        onOpenChange={handleSubChange}
      >
        {
          currentSidebar.map((menu: ISidebarItem) => {
            if( menu.routes ) {
              return (
                <SubMenu
                  key={menu.path}
                  title={(<span>{ menu.name }</span>)}
                  icon={menu.icon}
                >
                  {/* 如果将来 咱们有需求，要添加多级路由*/}
                  {
                    menu.routes.map((menuItem: IMenuItem) => (
                      <Item
                        key={menuItem.path}
                        icon={menuItem.icon}
                      >
                        { menuItem.name }
                      </Item>
                    ))
                  }
                </SubMenu>
              )
            } else {
              return (
                <Item
                  key={menu.path}
                  icon={menu.icon}
                >
                  { menu.name }
                </Item>
              )
            }
          })
        }
      </Menu>
    </Sider>
  );
};

export default memo(LeftTopSidebar);
