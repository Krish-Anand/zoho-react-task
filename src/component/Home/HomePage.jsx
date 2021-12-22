import React from 'react';
import '../Home/Home.scss';
import StateResults from './StateResult';
import { ListGroup, Card, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Home extends React.Component {
    constructor() {
        super() 
        this.state = {
            datePicker: new Date(),
            districtSearch: ''
        }
    }

    // Changing the date value using onchange function
    changeDate = (date) => { 
        this.setState({datePicker: date});
    }

    handleInputChange = (event) => { 
        if(event.target.value !== '') {
            this.setState({districtSearch: event.target.value})
        }
    }

render() {
    return (
        <div className='overflow-x'>
            <Card>
                <Card.Body>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            <InputGroup className="">
                                <InputGroup.Text id="inputGroup-sizing-default">State</InputGroup.Text>
                                <FormControl
                                aria-label="Default" onChange={this.handleInputChange}
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="date-picker">
                                <div className="d-flex">
                                    <InputGroup.Text id="inputGroup-sizing-default">Date</InputGroup.Text>
                                    <DatePicker className="form-control" selected={this.state.datePicker} onChange={this.changeDate} />
                                </div>
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                             <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Confirmed count</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Affected Percentage</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Vaccinated percentage</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            <StateResults values={this.state.districtSearch}/>
        </div>
    )
}
}

export default Home;