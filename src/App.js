import React,{Component} from "react";
import { Button } from "react-bootstrap";
import Web3 from "web3";
import {ELECTION_ABI,ELECTION_ADDRESS} from "./config";
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      account:'',
      candidatesCount:0,
      loggedIn:false,
      candidates:[],
      selectedId:0,
    }
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }
  async componentDidMount() {
    await this.loadBlockchainData();
    this.electionContract.events.votedEvent({}, async (error,event)=>{
      if(event.event==='votedEvent'){
        const canName = await this.electionContract.methods.candidates(event.returnValues._candidateId).call();
        let candidates = [...this.state.candidates];
        candidates.map((can)=>{
          if(can.id===event.returnValues._candidateId){
            can.voteCount = canName.voteCount
          }
        })
        this.setState({
          candidates
        })
      }
    })
  }
  async loadBlockchainData (){
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    this.setState({account:accounts[0]})
    this.electionContract = new web3.eth.Contract(ELECTION_ABI,ELECTION_ADDRESS,{from:accounts[0]})
    const candidatesCount = await this.electionContract.methods.candidatesCount().call();
    let candidates = [];
    for(let i=1;i<=candidatesCount;i++){
      const canName = await this.electionContract.methods.candidates(i).call();
      candidates = [...candidates,canName];
    }
    console.log(candidates);
    this.setState({
      candidates
    })
    this.setState({candidatesCount})
  }
  handelSelect=(e)=>{
    this.setState({selectedId:e.target.value});
  }
  castVote=()=>{
    this.electionContract.methods.vote(this.state.selectedId).send();
    console.log(this.state.selectedId);
  }
  render(){
    return (
      <div className="container d-flex flex-column align-items-center">
        <h1>Block Chain Voting</h1>
        <table className="table table-hover text-center table-bordered">
          <thead>
            <tr>
              <th scope="col">Candidate Id</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Votes</th>
            </tr>
          </thead>
          <tbody>
       {this.state.candidates.map((candidate)=>{
         return (
          
            <tr key={candidate.id}>
              <th scope="row">{candidate.id}</th>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          
         )
       })}
       </tbody>
       </table>
       <p>
         Select the Candidate to Vote:
       </p>
          <div className="input-group mb-3">
          
          <select className="custom-select" onChange={this.handelSelect} defaultValue="choose">
          {this.state.candidates.map((candidate)=>{
            return(
            <option value={candidate.id} key={candidate.id}>{candidate.name}</option>
            )
          })}
          </select>
          
          </div>
          <Button onClick={this.castVote}>Vote</Button>
      </div>
    )
  }
}

export default App;
