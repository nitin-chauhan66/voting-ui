import React,{Component} from "react";
import Web3 from "web3";
import {ELECTION_ABI,ELECTION_ADDRESS} from "./config";
import Login from "./views/Login";
import Registeration from "./views/RegisterationComponent";
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      account:'',
      candidatesCount:0,
      loggedIn:false
    }
  }
  componentDidMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData (){
    const web3 = new Web3("http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    const electionContract = new web3.eth.Contract(ELECTION_ABI,ELECTION_ADDRESS)
    const candidatesCount = await electionContract.methods.candidatesCount().call();
   
    this.setState({candidatesCount})
  }

  render(){
    return (
      <div>
        {this.state.loggedIn?(
        <div>
          <h1>jsdgfhjkl</h1>

        </div>
        ):(
        <Registeration/>
        )}
      </div>
    )
  }
}

export default App;
