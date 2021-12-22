import React from 'react';
import { ListGroup, Card, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import DeltaStates from '../../Home/DeltaList/DeltaResults';
import '../DeltaList/Delta.scss'

class ParentDelta extends React.Component {
    constructor() {
        super()
        this.state = {
            currentDateValue: new Date()
        }
    }

    // Changing the date value using onchange function
    changeDate = (date) => { 
        this.setState({currentDateValue: date});
    } 
    render() {
        return (
            <div className='overflow-x'>
            <Card>
                <Card.Body>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                           <h5>{sessionStorage.getItem('currentState')}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="date-picker">
                                <div className="d-flex">
                                <InputGroup.Text id="inputGroup-sizing-default">Date</InputGroup.Text>
                                <DatePicker className="form-control" selected={this.state.currentDateValue} onChange={this.changeDate} />
                                </div>
                            </InputGroup>
                        </ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <DeltaStates selectDate={this.state.currentDateValue}/>
        </div>
        )
    }
}

export default ParentDelta;