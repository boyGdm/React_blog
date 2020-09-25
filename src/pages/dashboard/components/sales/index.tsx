import React, { memo } from 'react'

import './index.less'
import { Color } from '../../utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface IProps {
    data: {}[]
}

const Sales: React.FC<IProps> = ({ data }) => {
    return (
        <div className='sales'>
            <div className='title'>每年销售额</div>
            <ResponsiveContainer minHeight={360}>
                <LineChart data={data}>
                    <Legend verticalAlign="top"
                            content={props => {
                                const { payload } = props
                                return <ul className='legend'>
                                    {payload!.map((item, key) => (
                                        <li key={key}>
                                            <span className='radiusdot' style={{ background: item.color }}/>
                                            {item.value}
                                        </li>))
                                    }
                                </ul>
                            }}/>
                    <XAxis dataKey="name" axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }} tickLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <CartesianGrid vertical={false} stroke={Color.borderBase} strokeDasharray="3 3"/>
                    <Tooltip wrapperStyle={{ border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)' }}
                             content={(content: any) => {
                                 const list = content.payload.map((item: any, key: string) => (
                                     <li key={key} className='tipitem'>
                                         <span className='radiusdot'
                                               style={{ background: item.color }}/>{item.name + ':' + item.value}
                                     </li>))
                                 return (<div className='tooltip'><p className='tiptitle'>{content.label}</p>
                                     <ul>{list}</ul>
                                 </div>);
                             }}/>
                    <Line type="monotone" dataKey="食品" stroke={Color.purple} strokeWidth={3}
                          dot={{ fill: Color.purple }} activeDot={{ r: 5, strokeWidth: 0 }}/>
                    <Line type="monotone" dataKey="服装" stroke={Color.red} strokeWidth={3} dot={{ fill: Color.red }}
                          activeDot={{ r: 5, strokeWidth: 0 }}/>
                    <Line type="monotone" dataKey="家电" stroke={Color.green} strokeWidth={3}
                          dot={{ fill: Color.green }} activeDot={{ r: 5, strokeWidth: 0 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(Sales);
