import React, { useEffect, useState } from 'react';
import { Container,Row,Col, Button, } from 'react-bootstrap';
import Web3 from 'web3';
import {ELECTION_ABI} from "./../../config";

const AddOptions = (props) => {
  const [account,setAccount] = useState('');
  const [optionText,setOptionText] = useState('');
  const [electionContract,setElectionContract] = useState();
  const [candidates,setCandidates] = useState([]);
  const [eventStatus,setEventStatus] = useState(false);

  const {address,eventId} = props.location.state;
  const getAccount = async () =>{
    if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }else{
        const account = await window.web3.eth.getAccounts();
        setAccount(account[0]);
      }
}
const getOptions = async () =>{
  const web3 = new Web3(Web3.givenProvider);
  const ElectionContract = new web3.eth.Contract(ELECTION_ABI,address,{from :account});
  const count = await ElectionContract.methods.candidatesCount().call();
  console.log(count);
  let candidatesArray=[];
  for (let i=1; i<=count;i++){
    const res = await ElectionContract.methods.candidates(i).call();
    candidatesArray = [...candidatesArray,{id:res.id,name:res.name,voteCount:res.voteCount}]
  }
  ElectionContract.events.votedEvent({},async (error,event)=>{
    if(event.event==='votedEvent'){
        let candidates = [];
        for (let i=1;i<=count;i++){
        const res = await ElectionContract.methods.candidates(i).call();
        candidates = [...candidates,{id:res.id,name:res.name,voteCount:res.voteCount}]
        }
        setCandidates(candidates);
    }
});
  ElectionContract.methods.isOnGoing().call().then((res=>{
    setEventStatus(res);
  }));
  setCandidates(candidatesArray);
}
    useEffect(()=>{
        getAccount();
        getOptions();
    },[])

    const ethEnabled = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
          return true;
        }
        return false;
    }
    const onClickAdd = () =>{
      if (!ethEnabled()) {
        alert("Please install MetaMask to use this dApp!");
      }else{
        const web3 = new Web3(Web3.givenProvider);
        const ElectionContract = new web3.eth.Contract(ELECTION_ABI,address,{from :account});
        ElectionContract.methods.addCandidate(optionText).send().then((res)=>{
          setOptionText('');
          getOptions(ElectionContract)
        })
      }
    }
    const onStart = () =>{
      const web3 = new Web3(Web3.givenProvider);
      const ElectionContract = new web3.eth.Contract(ELECTION_ABI,address,{from :account});
      ElectionContract.methods.changeElectionStatus(!eventStatus).send();
      ElectionContract.events.statusChanged({},(error,event)=>{
        if(event.event==='statusChanged'){
          setEventStatus(event.returnValues.status)
        }
      })
    }
    return (
        <Container>
          <Row className="justify-content-center">
            <h3 className="text-muted d-flex align-items-center">Event Id :</h3>
            <h4 className="ml-2 d-flex align-items-center">{eventId}</h4>
          </Row>
              <Row className="justify-content-center align-items-center">
               <div className="form-group form-inline">
                            <label  className="mr-2">Add Candidate</label>
                            <input type="text" value={optionText} onChange={(e)=>setOptionText(e.target.value)} className="form-control"/>
                            <button onClick={(e)=>onClickAdd(e)} className="btn btn-primary mt-2 ml-2">Add</button>
                </div>
                </Row>
                <Row key={'table'} className="bg-info mb-2 text-center">
                        <Col>
                        {'Candidate Name'}
                        </Col>
                        <Col>
                        {'Vote Count'}
                        </Col>
                        <Col>
                        {'Candidate Id'}
                        </Col>
                </Row>
                {candidates.map((candidate)=>{
                  return (
                    <Row key={candidate.id} className="bg-info mb-2 text-center">
                        <Col>
                        {candidate.name}
                        </Col>
                        <Col>
                        {candidate.voteCount}
                        </Col>
                        <Col>
                        {candidate.id}
                        </Col>
                      </Row>
                  )
                })}
                {candidates.length>1&&
                 <Row className="justify-content-center">
                 <Button onClick={onStart}>{eventStatus?'Stop':'Start'} The Event</Button>
               </Row>
                }
               
            </Container>
    )
}

export default AddOptions;