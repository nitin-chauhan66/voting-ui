import React,{useEffect,useState} from 'react';
import { Container, Row ,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const hp = window.innerHeight;
const EventCode  = () =>{
    const [ht,setHt] = useState(hp);
    const [account,setAccount] = useState('0x')
    useEffect(()=>{
        document.title = "BlockChain Voting Dapp"
        window.addEventListener('resize',()=>setHt(window.innerHeight))
    },[ht])
    return (
        <Container style={{height:ht}}>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <h4 style={{color:'white'}}>Logged in as voter: </h4>
                <h4 className="text-muted ml-2">{account}</h4>
            </nav>
            <Row className="w-100">
                <Col>
                    <h4 className="mb-5 text-center" style={{color:'grey'}}> Please enter the event code given by the organiser</h4>
                </Col>
            </Row>
            <Row className="align-items-center w-100">
                <Col>
                    <center>
                        <form class="form w-50">
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="eventCode" class="sr-only">Event code</label>
                                <input type="text" class="form-control" id="eventCode" placeholder="unique event code "/>
                            </div>
                            <Link to="/votingEvent">
                            <button type="submit" class="btn btn-primary mt-2">Submit</button>
                            </Link>
                        </form>
                    </center>
                </Col>
            </Row>
        </Container>
    )
}

export default EventCode;