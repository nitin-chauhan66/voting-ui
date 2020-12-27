import React, { useEffect, useState } from 'react';
import { Container,Row,Col, Button, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import {VOTING_ADDRESS,VOTING_CONTRACT_ABI} from "./../../config";
import AddOptions from './AddOptions';

const AddNewEvent = () => {
    const [account,setAccount] = useState('0x');
    const [title,setTitle] = useState('defaultName');
    const [isEventCreated,setIsEventCreated] = useState(false);
    const [electionAdress,setElectionAddress] = useState('');
    const [eventId,setEventId] = useState('');
    const history = useHistory();
    const getAccount = async () =>{
        if (!ethEnabled()) {
            alert("Please install MetaMask to use this dApp!");
          }else{
            const account = await window.web3.eth.getAccounts();
            setAccount(account[0]);
          }
    }
    useEffect(()=>{
        getAccount();
    },[])
    useEffect(()=>{
        if(isEventCreated){
            history.push('/addCandidates',{address:electionAdress,eventId})
        }
    },[isEventCreated])
    const ethEnabled = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          return true;
        }
        return false;
      }
      console.log(title);
    const addEvent = async (e) =>{
        e.preventDefault();
        if (!ethEnabled()) {
            alert("Please install MetaMask to use this dApp!");
          }else{
            const account = await window.web3.eth.getAccounts();
            const web3 = new Web3(Web3.givenProvider);
            const VotingContract = new web3.eth.Contract(VOTING_CONTRACT_ABI,VOTING_ADDRESS,{from :account[0]});
            VotingContract.methods.addNewEvent(title).send();
            VotingContract.events.newEventCreated({}, async (error,event)=>{
                console.log(event);
                if(event.event==='newEventCreated'){
                    const canName = await VotingContract.methods.events_array(event.returnValues.id).call();
                    setTitle('');
                    setElectionAddress(canName.smartContractId)
                    setEventId(canName.eventId)
                    setIsEventCreated(true);
                }
            })
          }

    }
    return (
        <Container>
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h4 style={{color:'white'}}>Logged in as Organiser: </h4>
                <h4 className="text-muted ml-2">{account}</h4>
            </nav>
            <Row>
                <Col>
                <h3 className="text-center text-muted"> Create new Event</h3>
                <form className="w-30 p-3">
                <div className="form-group">
                    <label for="title">Event title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" id="title" aria-describedby="title" placeholder="Enter Event Title"/>
                </div>
                <Row className="justify-content-center">
                <button onClick={(e)=>addEvent(e)} className="btn btn-primary mt-2">Create Event</button>
                </Row>
                </form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddNewEvent;