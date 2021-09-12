import React, { PureComponent } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

export default class CoinChart extends PureComponent {
    render(){
        return (
            <>
                

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={this.props.data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis dataKey="period" stroke="#8884d8" />
                        <YAxis stroke="#8884d8">
                            <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill:"#8884d8" }}
                            >
                            $USD
                            </Label>
                        </YAxis>
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#82ca9d" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}
