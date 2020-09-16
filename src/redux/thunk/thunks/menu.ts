import {Dispatch} from 'redux';
import { ASYNC_SET_MENU } from '../actions/menu';


export const getMenuData = () => {


  return async function (dispatch: Dispatch ) {

    // 在这里面 去处理异步
    await setTimeout(() => console.log('我是thunk 异步的数据'), 2000);

    dispatch({
      type: ASYNC_SET_MENU,
      payload: '我是异步请求的数据',
    })
  }
}