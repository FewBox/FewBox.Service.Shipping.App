import * as React from 'react';
import { Chart, Tooltip, Axis, Legend, StackBar } from 'viser-react';
import * as DataSet from '@antv/data-set';

const sourceData = [
    { type: 'Used', resource: 'CPU', value: 50 },
    { type: 'Allocatable', resource: 'CPU', value: 50 },
    { type: 'Used', resource: 'HD', value: 40 },
    { type: 'Allocatable', resource: 'HD', value: 60 },
    { type: 'Used', resource: 'Memory', value: 10 },
    { type: 'Allocatable', resource: 'Memory', value: 90 }
];

export interface INodeChartProps {
    sourceData: any[];
}

export default class NodeChart extends React.PureComponent<INodeChartProps> {
    render() {
        const dv = new DataSet.View().source(this.props.sourceData);
        dv.transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            groupBy: ['resource'],
            as: 'percent',
        });
        const data = dv.rows;

        const scale = [{
            dataKey: 'percent',
            min: 0,
            formatter: '.2%',
        }];
        return (
            <Chart forceFit height={400} data={data} scale={scale}>
                <Tooltip />
                <Axis />
                <Legend />
                <StackBar position="resource*percent" color="type" style={{ stroke: '#fff', lineWidth: 1 }} />
            </Chart>
        );
    }
}