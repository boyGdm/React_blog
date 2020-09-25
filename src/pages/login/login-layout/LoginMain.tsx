/***
 * @auth: dmx
 * @time: 2020/6/19
 * @func: 登录表单的实现
 ***/
import React, {
  memo, useEffect, useState,
} from 'react';
import { Form, Button, Input, notification, Row, Col } from 'antd';
import { getCaptcha } from "../../../http/user";

interface IProps {
  fetch: (values: ILogin) => Promise<any>;
  loading: boolean;
}

const { Item } = Form;
const LoginMain: React.FC<IProps> = (props) => {
  const [captcha, setCaptcha] = useState<string>('');
  const [captchaKey, setCaptchaKey] = useState<string>('');
  const { loading, fetch } = props;
  const get_captcha =  () => {
    getCaptcha().then(res => {
      setCaptcha(res.data.captcha)
      setCaptchaKey(res.data.captchaKey)
    })
  }
  useEffect(() => {
    get_captcha()
  },[])
  const handleLogin = async ( values: any ) => {
    if( !values.username || !values.password ) {
      notification.warn({
        message: '验证失败',
        description: '用户名或密码错误',
      })
    } else {
      try {
        await fetch({ ...values, captchaKey });
      } catch ( error ) {
        throw  new Error(error);
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
          <Item name="captcha">
            <Row gutter={24}>
              <Col span={14}>
                <Input  placeholder="请输入验证码" />
              </Col>
              <Col span={10}>
                <img src={captcha} onClick={() => { get_captcha() }} alt={captcha} className='main-form-box-captcha'/>
              </Col>
            </Row>
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
