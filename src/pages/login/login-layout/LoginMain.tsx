/***
 * @auth: dmx
 * @time: 2020/6/19
 * @func: 登录表单的实现
 ***/
import React, {
  memo,
} from 'react';
import { Form, Button, Input, notification } from 'antd';
import MD5 from 'crypto-js/md5';

interface IProps {
  fetch: (values: ILogin) => Promise<any>;
  loading: boolean;
}

const { Item } = Form;
const LoginMain: React.FC<IProps> = (props) => {

  const { loading, fetch } = props;

  // values 是咱们这个表单的数据集合
  // 加入要给 某个表单项赋予初始值，就需要给它传递一个参数initialValues
  // 接受一个对象 键名就是 Item里边定义的name
  const handleLogin = async ( values: any ) => {
    if( !values.username || !values.password ) {
      notification.warn({
        message: '验证失败',
        description: '用户名或密码错误',
      })
    } else {

      const { REACT_APP_MD5_SUFFIX } = process.env;
      // 加密密码
      const newPassword = MD5(`${values.password}${REACT_APP_MD5_SUFFIX}`).toString();

      // 执行登录的逻辑
      // 希望成功登录 使用这个加密过后的密码
      // 51059a4712331fa67d5ea10854b477a6

      // 2020-06-20 补充说明
      // 加入我们有这样的需求，我们希望在组件中去处理请求过后返回的数据，
      // async await 用一个变量去接受await的值的话，
      // 如果await后面是一个promise 那么 变量接收到的值就是成功的值，
      // 如果该promise失败， 则程序会终止运行。
      // 因为 async await 本身就是一个promise 它不能捕获自身的错误
      // 所以我们一般是配合 try catch 使用，保证程序的正常运行。

      // 如果套上了try catch
      try {
        await fetch({
          username: values.username,
          password: newPassword,
        });
      } catch ( error ) {

      }


    }

  };

  return (
    <div className="login-layout-main">
      <div className='main-form'>
        <h2>欢迎登录react_blog</h2>
        <Form
          className="main-form-box"
          onFinish={handleLogin}
        >
          <Item name="username">
            <Input placeholder="请输入用户名" />
          </Item>
          <Item name="password">
            <Input type="password" placeholder="请输入密码" />
          </Item>
          <Item>
            <Button
              type="primary"
              className="main-form-box_button"
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
          </Item>
          <Item>
            <div className="main-form-box_other">
              <p>其他登录方式</p>
              <div className='any'>
                <span>QQ</span>
                <span>微信</span>
                <span>GitHub</span>
              </div>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(LoginMain);