/***
 * @auth: dmx
 * @time: 2020/7/6
 * @func:
 * @params:
 * @return:
 * @updateTime:
 ***/
import { createRoutine, promisifyRoutine } from 'redux-saga-routines';
import extendRoutine from '../extendRoutine';
import NAME_SPACE from '../../../constants/name-spce';

// 处理路由导航数据
export const menuAction = extendRoutine(
  createRoutine(`${NAME_SPACE.MENU}`),
  [
    {
      type: 'SET_MENU',
      action: 'setMenu',
    },
    {
      type: 'SET_CURRENT_MENU',
      action: 'setCurrentMenu',
    },
    {
      type: 'SET_THEME',
      action: 'setTheme',
    },
    {
      type: 'SET_PRIMARY_COLOR',
      action: 'setPrimaryColor',
    },
    {
      type: 'SET_DRAWER',
      action: 'setDrawer',
    },
  ]
)