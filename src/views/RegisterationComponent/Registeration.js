import React from "react";
import {Button,Card,Form} from "react-bootstrap"

class Registeration extends React.Component{

    render(){
        const {value} = this.props;
        return(
            <div className="container">
            <Form>
                <Form.Group controlId="userName">
                <Form.Label>Enter Full Name</Form.Label>
                <Form.Control type="text" placeholder="value" />
                </Form.Group>

                <Form.Group controlId="aadharNumber">
                <Form.Label>Enter Aadhar Number</Form.Label>
                <Form.Control type="text" placeholder="Aadhar Number" />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            </div>
        )
    }
}

export default Registeration;