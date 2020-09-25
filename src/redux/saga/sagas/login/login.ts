import {
  call,
  put,
  take,
  takeEvery,
  delay,
  cancel,
} from 'redux-saga/effects';
import { loginAction } from '../../actions/login';
import { userAction } from "../../actions/user";
import { login,getCaptcha } from '../../../../http/user';
import loginUtils from '../../../../utils/loginUtils';
import { message } from "antd";
import logo  from  '../../../../assets/img/logo.jpg'

function* authorize (action: ActionParams<ILogin>) {
  // 一进来过后， 就去调用后端的登录接口
  try {
    const loginRes = yield call(login, action.payload);
    message.info(loginRes?loginRes.msg: '');
    yield delay(1000);
    if(loginRes.code === 0 ){
      const { token, userinfo } = loginRes.data;
      yield call(loginUtils.saveLoginState, token, userinfo);
      yield put(userAction.trigger({nickname:userinfo.nickname,avata:logo}));
      // type: userAction.TRIGGER,
      //     payload: { user: {nickname:userinfo.nickname,avata:logo,}}
      // 如果需要延迟
      yield put(loginAction.success(token));
    }
    // call 效果上表示同步的事情
    // 一般登录成功过后会获取一个token身份标识 需要再本地存储进行存储，
    // 同时本次登录过后，需要把token放进下一次请求的请求头里去，
    // 如果别的地方需要用到token 就可以再redux中进行操作，一般不需要


  } catch( error ) {
    // 错误的处理
    yield put(loginAction.failure(error));
  }

  yield put(loginAction.fulfill());
}

// 异步请求进来过后， 首先会进入的是 effect副作用处理，
// 在effect里边 异步处理完成过后，然后再进行同步处理， 和redux-thunk一样，再发起一个同步的dispatch
export default () => (function* () {

  // 在这里面进行effect 处理 （副作用的处理 一般是指异步请求）
  const task = yield takeEvery(loginAction.TRIGGER, authorize);
  // 监听两个type 一个是主动退出，一个是登录出错
  const action = yield take([loginAction.LOG_OUT, loginAction.FAILURE]);

  // 就可以手动去取消本次请求
  if( action.type === loginAction.LOG_OUT) yield cancel(task);

});
