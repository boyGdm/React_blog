/***
 * @auth: dmx
 * @time: 2020/6/20
 * @func:项目，面板页
 ***/
import React, { memo } from 'react';
import { Button, Card, Row, Col } from "antd";
import './index.less'
import Completed from "./components/completed";
import Sales from "./components/sales";

import { CompletedData, salesData } from './utils'

interface IProps {

}

const Dashboard: React.FC<IProps> = (props) => {
    console.log(props);
    return (
        <div className='dashboard'>
            <Row gutter={24} style={{ padding: '0 15px' }}>
                <Col span={6}>
                    <Card>
                        <h3>系统用户</h3>
                        <h2>2345</h2>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <h3>订单数量</h3>
                        <h2>2345</h2>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <h3>信息通知</h3>
                        <h2>2345</h2>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <h3>待办事项</h3>
                        <h2>2345</h2>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ margin: '15px',  background: '#fff' }}>
                <Col span={24}>
                    <Completed data={CompletedData}/>
                </Col>
            </Row>
            <Row gutter={24} style={{ margin: '15px',  background: '#fff' }}>
                <Col span={24}>
                    <Sales data={salesData}/>
                </Col>
            </Row>
        </div>
    );
};

export default memo(Dashboard);
