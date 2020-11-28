import React, {useState} from 'react';
import { Col, Container,Row,Card,Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const data = {
    id:'123',
    title:'National Election',
    eventDate:'15 November',
    eventTime:'05:00 PM – 06:00 PM',
    organiser:'Blockchain Authority of India',
    options:[
        {id:'1',name:'Party A',},
        {id:'2',name:'Party B',},
        {id:'3',name:'Party C'},
        {id:'4',name:'Party D'},
    ]
}
const VotingEvent = (props) => {
    document.title="Voting Event";
    const [selectedOption,setSelectedOption] = useState('');
    const history = useHistory();
    const castVote = () =>{
        console.log(selectedOption);
        let sel =""
        data.options.map((item)=>{
            if(item.id===selectedOption){
                return sel = item['name']+' is selected'
            }
        })
        history.push('/eventDashboard')
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
                        <h1>{data.title}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-2">
                    <h3>{'Election Status'}: {'Finised'}</h3>
                </Col>
            </Row>
            <Row>
                <Col className="text-center text-muted mt-2">
                    <h4>{'Organiser'}: {data.organiser}</h4>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-2">
                    <b>{data.eventDate}, {data.eventTime}</b>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center mt-5">
               
                <Card style={{ width: '100%',boxShadow:"0 6px 16px 0 rgba(0,0,0,.2)",borderRadius:5}}>
                    <Card.Body>
                        <Card.Title className="text-center">
                            {'Select one option'}
                        </Card.Title>
                        <form>
                        {data.options.map((item)=>{
                            return renderData(item)
                            
                        })}
                        <Col className="text-center mt-5">
                            <Button variant="primary" onClick={castVote}>Click to cast vote</Button>
                        </Col>
                        </form>
                    </Card.Body>
                </Card>
              
            </Row>
        </Container>
    )
}

export default VotingEvent;