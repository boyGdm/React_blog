/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func: 有可能涉及到ant-design 的 ICON组件， ant4 的Icon是改版了，
 ***/
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import config from './config';


const routes = (
  <BrowserRouter>
    {
      renderRoutes( config )
    }
  </BrowserRouter>
)
export default routes;
