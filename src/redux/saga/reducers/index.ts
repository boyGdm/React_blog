/***
 * @auth: dmx
 * @time: 2020/6/15
 * @func: sagaReducer 的集合和导出
 ***/
import common from './common';
import login from './login';
import user from './user';

const sagaReducer = {
  common,
  login,
  user
};
export default sagaReducer;
