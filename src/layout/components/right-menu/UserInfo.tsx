/***
 * @auth: dmx
 * @time: 2020/7/4
 * @func:
 * @params:
 * @return:
 * @updateTime:
 ***/
import React, {memo, useCallback} from 'react';
import useActions from '../../../hooks/useActions';
import {
  Badge,
  Avatar,
  Dropdown,
  Menu, message,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { menuAction } from '../../../redux/saga/actions/menu';

import loginUtils from '../../../utils/loginUtils'
import { useSelector } from "react-redux";
import LocalStore from "../../../utils/LocalStore";
interface IProps {

}

const { Item } = Menu;
const UserInfo: React.FC<IProps> = (props) => {
  const userStore = useSelector((state:any) => state.user)
   const nickname = LocalStore.get('userinfo')?JSON.parse(LocalStore.get('userinfo') as string).nickname : 'admin';
  const { avata } = userStore.list;

  const actions = useActions({
    setDrawer: menuAction.setDrawer,
  })

  const handleSystemSettingsClick = useCallback(() => {
    actions.setDrawer(true);
  }, []);

  const userMenu = (
    <Menu  style={{minWidth: '100px'}}>
      <Item onClick={() => message.info('你点击了修改密码')}>修改密码</Item>
      <Item onClick={handleSystemSettingsClick}>系统设置</Item>
      <Item onClick={() => message.info('你点击了清除缓存')}>清除缓存</Item>
      <Item onClick={() => { loginUtils.deleteLoginState() }}>退出登录</Item>
    </Menu>
  );

  return (
    <div className="user">
        <Avatar
          size="small"
        >
            <img src= {avata} alt= {avata}/>
        </Avatar>
      <Dropdown
        overlay={userMenu}
        trigger={['hover']}
      >
        <span className="name">
            {nickname} 管理员
          <CaretDownOutlined style={{marginLeft:'8px'}}/>
        </span>
      </Dropdown>
    </div>
  );
};

export default memo(UserInfo);
