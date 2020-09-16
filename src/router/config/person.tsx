/***
 * @auth: dmx
 * @time: 2020/7/7
 * @func:
 * @params:
 * @return:
 * @updateTime:
 ***/
import RouteWithSubRouters from '../RouteWithSubRouters';
import Tag from '../../pages/blog-manage/tag';
import Loadable from "react-loadable";
import loadings from '../loadings';

const person = [
  {
    // 2级级路由
    component: RouteWithSubRouters,
    icon: '',
    name: '记账系统',
    path: '/account',
    routes: [
      {
        // 3级级路由
        component: RouteWithSubRouters,
        icon: '',
        name: '账务列表',
        path: '/list',
        routes: [
          {
            // 4级级路由
            component: Loadable({
              loader: () => import('../../pages/blog-manage/tag'),
              ...loadings,
            }),
          }
        ]
      }
    ]
  },
  {
    // 2级级路由
    component: RouteWithSubRouters,
    icon: '',
    name: '规划管理',
    path: '/plan',
    routes: [
      {
        // 3级级路由
        component: RouteWithSubRouters,
        icon: '',
        name: '近期TODO',
        path: '/object',
        routes: [
          {
            // 4级级路由
            component: Loadable({
              loader: () => import('../../pages/blog-manage/tag/CreateTag'),
              ...loadings,
            }),
          },
          {
            path: '/create',
            icon: '',
            name: '新建计划',
            component: Loadable({
              loader: () => import('../../pages/blog-manage/tag/CreateTag'),
              ...loadings,
            }),
          },
        ]
      },
    ]
  }
];

export default person;