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

interface IProps {

}

const { Item } = Menu;
const UserInfo: React.FC<IProps> = (props) => {

  const actions = useActions({
    setDrawer: menuAction.setDrawer,
  })

  const handleSystemSettingsClick = useCallback(() => {
    actions.setDrawer(true);
  }, []);

  const userMenu = (
    <Menu>
      <Item onClick={() => message.info('你点击了修改密码')}>修改密码</Item>
      <Item onClick={handleSystemSettingsClick}>系统设置</Item>
      <Item onClick={() => message.info('你点击了清除缓存')}>清除缓存</Item>
      <Item onClick={() => message.info('你点击了退出登录')}>退出登录</Item>
    </Menu>
  );

  return (
    <div className="user">
      <Badge
        overflowCount={99}
        count={199}
        title="您有199条信息"
      >
        <Avatar
          size="small"
        >
          T
        </Avatar>
      </Badge>
      <Dropdown
        overlay={userMenu}
        trigger={['hover']}
      >
        <span className="name">
          超级管理员
          <CaretDownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default memo(UserInfo);