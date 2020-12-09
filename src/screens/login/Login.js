import React, { useEffect,useState } from 'react';
import {Container, Row,Col, Button,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const hp = window.innerHeight;
const wp = window.innerWidth;

const Login = () =>{
    const [ht,setHt] = useState(hp);
    
    useEffect(()=>{
        document.title = "BlockChain Voting Dapp"
        window.addEventListener('resize',()=>setHt(window.innerHeight))
    },[ht])
    return(
        <Container style={{height:ht}}>
            <Row className="justify-content-center align-items-center h-100 text-center">
            <Card style={{ width: '30rem',boxShadow:"0 6px 16px 0 rgba(0,0,0,.2)"}}>
            <Card.Body>
                <Card.Title>BlockChain Voting Dapp</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Distrupting BlockChain industry</Card.Subtitle>
                <Row className="mt-5">
                    <Col>
                        <Link to="/eventCode">
                            <Button variant="primary">Login as Voter</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/addNewEvent">
                            <Button variant="primary">Login as Organiser</Button>
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
            </Row>
        </Container>
    )
}

export default Login;