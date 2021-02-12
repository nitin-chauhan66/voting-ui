import React, { PureComponent, useState,useEffect } from 'react';
import { Container, Row,Col } from 'react-bootstrap';
import {
  PieChart, Pie, Sector, Cell,Tooltip
} from 'recharts';
import {VOTING_ADDRESS,VOTING_CONTRACT_ABI,ELECTION_ABI} from "./../../config";
import Web3 from 'web3';



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

 const Example=(props)=> {
  let jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  const [data,setData] = useState([]);
  const [electionAddress,setElectionAddress] = useState('');
  const {eventId} = props.location.state.state;
  console.log(data);
  useEffect(()=>{
    getContractAddress();
},[])
useEffect(()=>{
  if(electionAddress){
      getCandidates()
  }
},[electionAddress])
  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }
  const getContractAddress = async () =>{
    if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }else{
        const web3 = new Web3(Web3.givenProvider);
        const VotingContract = new web3.eth.Contract(VOTING_CONTRACT_ABI,VOTING_ADDRESS);
        const canName = await VotingContract.methods.events_array(eventId).call();
        // setEventName(canName.eventName)
        setElectionAddress(canName.smartContractId)
      }
}
  const getCandidates = async () =>{
    if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }else{
        const web3 = new Web3(Web3.givenProvider);
        const account = await window.web3.eth.getAccounts();
        const ElectionContract = new web3.eth.Contract(ELECTION_ABI,electionAddress,{from:account[0]});
        const count = await ElectionContract.methods.candidatesCount().call();
        // const status = await ElectionContract.methods.isOnGoing().call();
        // const org = await ElectionContract.methods.admin().call();
        // ElectionContract.events.statusChanged({},(error,event)=>{
        //     if(event.event==='statusChanged'){
        //         setStatus(event.returnValues.status)
        //     }
        // });
        
        // setStatus(status);
        // setOrganiser(org);
        let candidates = [];
        for (let i=1;i<=count;i++){
            const res = await ElectionContract.methods.candidates(i).call();
            candidates = [...candidates,{id:res.id,name:res.name,value:parseInt(res.voteCount)}]
        }
        setData(candidates);
        ElectionContract.events.votedEvent({},async (error,event)=>{
          if(event.event==='votedEvent'){
              let candidates = [];
              for (let i=1;i<=count;i++){
              const res = await ElectionContract.methods.candidates(i).call();
              candidates = [...candidates,{id:res.id,name:res.name,value:parseInt(res.voteCount)}]
              }
              setData(candidates);
          }
      });
      }
}
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
                <Tooltip />
            </PieChart>
        </Row>
      </Container>
    );
  }

  export default Example;