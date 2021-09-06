import React, { PureComponent } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default class TreeChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-treemap-r5o4e';

  render() {
    return (
        <>
            <Title>Top Bought Coins</Title>
            <ResponsiveContainer width="100%" height="100%">
                <Treemap width={400} height={200} data={this.props.data} dataKey="size" ratio={4 / 3} stroke="#fff" fill="#8884d8" />
            </ResponsiveContainer>
        </>
    );
  }
}
