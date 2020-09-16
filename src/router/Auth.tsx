/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func: 路由鉴权文件
 ***/
import React, {memo} from 'react';
import { Alert, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loginUtils from '../utils/loginUtils';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';

interface IProps extends RouteConfigComponentProps{
}

/*
* 路由鉴权要处理几件事情？
* 1： 要处理全局的提示信息，比如：断网，或者服务器崩了，或者页面崩了，
* 2； 有收集权限码，分发给redux，根据用户信息，来匹配他所拥有的权限，然后显示他能看到的东西。
* // 注意： 这个是属于路由层面的鉴权，也就是所谓的粗粒度鉴权，
* 3： 判断路由，因为有些情况，可能token过期了，但是可能意外因素导致用户还是能够访问这个页面，
* 那么在用户对页面进行操作的时候，或者页面进行切换的时候，就需要判断这个用户是否登录，而决定
* 是否登录的因素是token是否有效
* */

const Auth: React.FC<IProps> = (props) => {

  // TODO 为什么这个文件，初始的时候，会执行两次?

  const { retryTip } = useSelector((state: IState) => state.common )
  const isLogin = loginUtils.getUserState();
  const { route, location } = props;

  /*
  * 如果咱们有些项目，是需要登陆过后，在路由鉴权这里去请求用户的信息，那么
  * useEffect(() => {
  *   做异步处理，请求数据。
  *   发起action
  * }, [isLogin]);
  * */

  const GlobalTip = (
    retryTip
      ?
        <Alert
          className="global-tip"
          type="error"
          message={(
            <p>
              请求数据多次超时， 可能会影响到后续操作，请检查网络后
              <Button
                type="link"
                onClick={() => window.location.reload()}
              >
                刷新页面
              </Button>
              !!!
            </p>
          )}
          showIcon={false}
          banner
          closable
        />
      : null
  )

  // 需要处理 判断路由
  // 如果没有登录，且不在登陆页
  if( !isLogin && location.pathname !== '/login' ) return  <Redirect to='/login' />
  // 已经登录 是否还在登录页
  if( isLogin && location.pathname === '/login' ) return <Redirect to='/' />

  // 重要的来了，在这里，判断权限.
  // if( permissions.length === 0 && isLogin ) return (
  //  <>
  //       { GlobalTip }
  //
  //       <Spin className="spin-center />
  //     </>
  // )

  return (
    <>
      { GlobalTip }
      {
        route && route.routes && renderRoutes( route.routes )
      }
    </>
  );
};

export default memo(Auth);