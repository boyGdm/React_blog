/***
 * @auth: dmx
 * @time: 2020/6/17
 * @func:
 ***/
import { menuAction } from '../../../saga/actions/menu';
import { recursiveMenu } from './utils';
import LocalStore from '../../../../utils/LocalStore';

const initialStateSetter: IMenu = {
  breadcrumb: {},
  topMenu: [],
  sideMenu: {},
  currentSidebar: [],
  currentTopMenu: null,

  theme: LocalStore.get('theme') || 'dark',
  drawer: false,
  primaryColor: LocalStore.get('primary-color') || '#d214a2',
}
export default function (state = initialStateSetter, action: ActionParams) {
  switch (action.type) {
    case menuAction.SET_MENU: {

      const { routes } = action.payload;
      const { topMenu, breadcrumb, sideMenu } = recursiveMenu(routes);

      return {
        ...state,
        breadcrumb,
        topMenu,
        sideMenu,
      }
    }
    case menuAction.SET_CURRENT_MENU: {
      return {
        ...state,
        ...action.payload,
        currentSidebar: state.sideMenu[action.payload.currentTopMenu] || [],
      };
    }

    case menuAction.SET_DRAWER: {
      return {
        ...state,
        drawer: action.payload,
      };
    }

    case menuAction.SET_THEME: {
      // 存入 本地存储
      LocalStore.set('theme', action.payload.theme);
      return {
        ...state,
        ...action.payload,
      };
    }

    case menuAction.SET_PRIMARY_COLOR: {

      // 存入 本地存储
      LocalStore.set('primary-color', action.payload);

      return {
        ...state,
        primaryColor: action.payload,
      };
    }

    default:
      return state;

  }
}