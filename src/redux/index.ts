/***
 * @auth: dmx
 * @time: 2020/6/15
 * @func: store
 *
 * 1, reducer, [initialState], [enhancer]
 * thunk 明天配置
 ***/
import { createStore, applyMiddleware, compose } from 'redux';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducer';
import rootSaga from './saga/sagas';

/*
* thunk 的原理
* 实际上thunk中间件会做一个判断
* 如果传进来的action是一个函数，并且向下传递被包装过后的dispatch
* 如果不是一个函数，就直接传递最初的dispatch
* */


export const history = createBrowserHistory();

// saga 的中间件
const sagaMiddleware = createSagaMiddleware();

// 创建一个增强器函数
// 大家不必要非要完全理解这段代码，主要是在逻辑上
const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer( history ),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      thunk,
      // logger,
  ),
));

sagaMiddleware.run(rootSaga);


/*
// 我为了大家能够明了，
* 为了方便在组件内部或者某个方法内部处理回调
* 我们需要触发一个promise类型的action 所以需要routinePromiseWatcherSaga这个方法
* 去帮助我们监听我们触发的每一个promise的action，
实际上，routinePromiseWatcherSaga这个方法在内部，只是帮我们实现了一个返回promise的功能
* */
sagaMiddleware.run(routinePromiseWatcherSaga);


export default store;