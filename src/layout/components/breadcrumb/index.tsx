/***
 * @auth: dmx
 * @time: 2020/7/8
 * @func: 面包屑组件
 ***/
import React, {memo} from 'react';
import { useSelector } from 'react-redux';
import { IRouteProps } from '../../layout';
import { CSSTransition } from 'react-transition-group';
import { LeftOutlined } from '@ant-design/icons';
import { Divider, Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';

// https://processon.com/ 思维导图 在线作图  免费的能做9个 超过的话是收费的
interface IProps extends IRouteProps {}

const { Item } = Breadcrumb;
const BreadcrumbComponent: React.FC<IProps> = (props) => {

  const { breadcrumb, currentSidebar } = useSelector((state:IState) => state.menu );
  if( currentSidebar.length === 0 ) return null;
  const { history, location: { pathname } } = props;

  // 思路： 就是 把咱们这pathname  给它拆开 然后一个一个去匹配
  // filter  的作用是 过滤掉 不存在或者为空字符串 '' 这样的项
  const pathSnippets = pathname.split('/').filter( i => i);
  const isShowBack = pathSnippets.length > 3 && history['length'] > 1;

  return (
    <div className="breadcrumb">
      <CSSTransition
        in={isShowBack}
        timeout={400}
        classNames={{
          enter: 'animated fadeInLeft faster',
          exit: 'animated fadeOutLeft faster'
        }}
        unmountOnExit
      >
        <>
          <LeftOutlined onClick={history['goBack']} />
          <Divider type="vertical" />
        </>
      </CSSTransition>
      <Breadcrumb>
        {
          pathSnippets.map((_, i) => {
            const url = `/${pathSnippets.slice(0, i + 1).join('/')}`;
            const breadcrumbUrl = breadcrumb[url];
            return (
              <Item key={url}>
                {
                  i > 1 && i !== pathSnippets.length - 1
                  ? (
                      <Link to={url}>
                        <span className="breadcrumb-icon">
                          {breadcrumbUrl.icon}
                        </span>
                        {breadcrumbUrl.name}
                      </Link>
                    )
                  : (
                      <>
                        <span className="breadcrumb-icon">
                          {breadcrumbUrl.icon}
                        </span>
                        {breadcrumbUrl.name}
                      </>
                  )
                }
              </Item>
            )
          })
        }
      </Breadcrumb>
    </div>
  );
};

export default memo(BreadcrumbComponent);
