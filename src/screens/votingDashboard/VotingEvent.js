import React, {useState,useEffect} from 'react';
import { Col, Container,Row,Card,Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {VOTING_ADDRESS,VOTING_CONTRACT_ABI,ELECTION_ABI} from "./../../config";
import Web3 from 'web3';


const VotingEvent = (props) => {
    document.title="Voting Event";
    const [selectedOption,setSelectedOption] = useState('');
    const [electionAddress,setElectionAddress] = useState('');
    const [options,setOptions] = useState([]);
    const [eventName,setEventName] = useState('');
    const [status,setStatus] = useState(false);
    const [organiser,setOrganiser] = useState('');
    const history = useHistory();
    const {eventId} = props.location.state;
    const ethEnabled = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          return true;
        }
        return false;
      }
    const castVote = async () =>{
        if(selectedOption){
            const web3 = new Web3(Web3.givenProvider);
            const account = await window.web3.eth.getAccounts();
            const ElectionContract = new web3.eth.Contract(ELECTION_ABI,electionAddress,{from:account[0]});
            let sel;
            options.map((item)=>{
                if(item.id===selectedOption){
                    return sel = item.id;
                }
            })
            ElectionContract.methods.vote(sel).send().then(()=>{
                history.push('/eventDashboard',{state:{eventId}});
            });
        }else{
            alert('Please select a option')
        }
    }
    useEffect(()=>{
        getContractAddress();
    },[])
    useEffect(()=>{
        if(electionAddress){
            getCandidates()
        }
    },[electionAddress])
    const getContractAddress = async () =>{
        if (!ethEnabled()) {
            alert("Please install MetaMask to use this dApp!");
          }else{
            const web3 = new Web3(Web3.givenProvider);
            const VotingContract = new web3.eth.Contract(VOTING_CONTRACT_ABI,VOTING_ADDRESS);
            const canName = await VotingContract.methods.events_array(eventId).call();
            setEventName(canName.eventName)
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
            const status = await ElectionContract.methods.isOnGoing().call();
            const org = await ElectionContract.methods.admin().call();
            ElectionContract.events.statusChanged({},(error,event)=>{
                if(event.event==='statusChanged'){
                    setStatus(event.returnValues.status)
                }
            });
            setStatus(status);
            setOrganiser(org);
            let candidates = [];
            for (let i=1;i<=count;i++){
                const res = await ElectionContract.methods.candidates(i).call();
                candidates = [...candidates,{id:res.id,name:res.name}]
            }
            setOptions(candidates);
          }
    }
    const renderData = (data) => {
        return (
            <Row 
                key={data.id}
                onClick={()=>setSelectedOption(data.id)}
            style={{
                borderColor:'skyblue',
                borderBottomWidth:1,
                borderTopWidth:1,
                borderStyle:'solid',
                padding:'10px',
                marginBottom:5,
                borderRadius:5,
                marginLeft:10,
                marginRight:10,
                backgroundColor:selectedOption===data.id?'skyblue':'white'
            }}>
                <Col xs={11}>
                <label className="form-check-label" for={"defaultCheck1"}>
                    <b>{data.name}</b>
                </label>
                </Col>
                <Col xs={1}>
                <div className="form-check">
                    <input 
                        style={{
                            height:20,
                            width:20,
                            borderRadius:5
                        }}
                        onClick={()=>setSelectedOption(data.id)}
                    className="form-check-input" type="radio"  name="radio1" value={data.id} id={"defaultCheck1"} checked={selectedOption===data.id} />
                </div>
                </Col>
            </Row>
        )
    }
    return (
        <Container>
            <Row>
                <Col className="text-center mt-5">
                        <h1>{eventName}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-2">
                    <h3>{'Election Status'}: {status?'On Going':'Finished'}</h3>
                </Col>
            </Row>
            <Row>
                <Col className="text-center text-muted mt-2">
                    <h4>{'Organiser'}: {organiser}</h4>
                </Col>
            </Row>
            <Row>
                {/* <Col className="text-center mt-2">
                    <b>{data.eventDate}, {data.eventTime}</b>
                </Col> */}
            </Row>
            <Row className="justify-content-center align-items-center mt-5">
               
                <Card style={{ width: '100%',boxShadow:"0 6px 16px 0 rgba(0,0,0,.2)",borderRadius:5}}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            {'Select one option'}
                        </Card.Title>
                        <form>
                        {options.map((item)=>{
                            return renderData(item)
                            
                        })}
                        <Col className="text-center mt-5">
                            <Button variant="primary" onClick={castVote}>Click to cast the vote</Button>
                        </Col>
                        </form>
                    </Card.Body>
                </Card>
              
            </Row>
        </Container>
    )
}

export default VotingEvent;