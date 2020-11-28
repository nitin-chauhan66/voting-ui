import React, { PureComponent } from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const data = [
  { name: 'Party A', value: 400 },
  { name: 'Party B', value: 300 },
  { name: 'Party C', value: 300 },
  { name: 'Party D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (value) => {
    console.log(value);
    const {
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,payload
      } = value;
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${payload.name}`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    return (
    <Container>
        <Row>
            <Col className="text-center">
                <h1>Real Time Updates</h1>
            </Col>
        </Row>
        <Row className="justify-content-center mt-5">
            <PieChart width={410} height={410}>
                <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
                >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
                </Pie>
            </PieChart>
        </Row>
      </Container>
    );
  }
}
