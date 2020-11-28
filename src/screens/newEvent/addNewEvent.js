import React, { useState } from 'react';
import { Container,Row,Col, Button, } from 'react-bootstrap';

const AddNewEvent = () => {
    const [account,setAccount] = useState('0x');
    const [startTime,setStartTime] = useState(new Date().getTime());
    const [endTime,setEndTime] = useState('');
    const [options,setOption] = useState([1,2]);

    const AddOption = () => {
        const id = options.length+1;
        setOption([...options,id])
    }
    const deleteOption = (id) => {
        console.log(id);
        if(options.length>2){
            const newIds = [...options]
            newIds.splice(id-1,1)
            setOption(newIds)
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
                    <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="Enter Event Title"/>
                </div>
                <div className="form-group">
                    <label for="organiser">Organiser</label>
                    <input type="text" className="form-control" id="organiser" placeholder="Organiser name"/>
                </div>
                <div className="form-group form-inline">
                    <label for="organiser">Start Date: </label>
                    <input type="datetime-local" className="form-control ml-2" id="organiser" placeholder="Organiser name"/>
                    <label for="organiser" className="ml-2">End Date: </label>
                    <input type="datetime-local"  className="form-control ml-2" id="organiser" placeholder="Organiser name"/>
                </div>
                <label for="1" className="mr-2">OPTIONS</label>
                {options.map((id)=>{
                    return(
                        <div className="form-group form-inline">
                            <label for={id} className="mr-2">{id}</label>
                            <input type="text" className="form-control" id={id}/>
                            <div onClick={()=>deleteOption(id)}>delete</div>
                        </div>
                    )
                })}
                <button className="btn btn-primary" onClick={AddOption}>Add option</button>
                <Row className="justify-content-center">
                <button type="submit" className="btn btn-primary mt-2">Create Event</button>
                </Row>
                </form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddNewEvent;