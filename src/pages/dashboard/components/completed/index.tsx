import React, { memo } from 'react'

import './index.less'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

import { Color } from "../../utils";

interface IProps {
    data: {}[]
}

const Completed:React.FC<IProps> = ({ data }) =>  {
    return (
        <div className='sales'>
            <div className='title'>销售人完成统计</div>
            <ResponsiveContainer minHeight={360}>
                <AreaChart data={data}>
                    <Legend
                        verticalAlign="top"
                        content={prop => {
                            const { payload } = prop
                            return (
                                <ul className='legend'>
                                    {payload!.map((item, key) => (
                                        <li key={key}>
                                            <span className='radiusdot' style={{ background: item.color }}/>
                                            {item.value}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
                        tickLine={false}
                    />
                    <YAxis axisLine={false} tickLine={false}/>
                    <CartesianGrid
                        vertical={false}
                        stroke={Color.borderBase}
                        strokeDasharray="3 3"
                    />
                    <Tooltip
                        wrapperStyle={{
                            border: 'none',
                            boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
                        }}
                        content={(content: any) => {
                            const list = content.payload.map((item: any, key: any) => (
                                <li key={key} className='tipitem'>
                                    <span className='radiusdot' style={{ background: item.color }}/>
                                    {`${item.name}:${item.value}`}
                                </li>
                            ))
                            return (
                                <div className='tooltip'>
                                    <p className='tiptitle'>{content.label}</p>
                                    {content.payload && <ul>{list}</ul>}
                                </div>
                            )
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="完成任务"
                        stroke={Color.grass}
                        fill={Color.grass}
                        strokeWidth={2}
                        dot={{ fill: '#fff' }}
                        activeDot={{ r: 5, fill: '#fff', stroke: Color.green }}
                    />
                    <Area
                        type="monotone"
                        dataKey="卡片完成"
                        stroke={Color.sky}
                        fill={Color.sky}
                        strokeWidth={2}
                        dot={{ fill: '#fff' }}
                        activeDot={{ r: 5, fill: '#fff', stroke: Color.blue }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(Completed);
