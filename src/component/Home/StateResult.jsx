import React from 'react';
import { ListGroup, Card, Row, Col } from 'react-bootstrap';
import  { get } from 'jquery';
import { HashLink as Link } from 'react-router-hash-link';

class StateResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateValues: [],
            inputValues: props.values
    }
}

    componentDidMount() {
            this.StateList();
    }

    componentDidUpdate(propsValues) {
        if(propsValues.values !== this.props.values) {
            this.setState({
                inputValues: this.props.values
            });
        if(this.props.values.length !== 1) { 
            const filterResults =  this.state.stateValues.filter(values => values.stateName === this.props.values)
            this.setState({stateValues: filterResults});
        } else {
            this.StateList();
        }
        }
    }

    handleOnClick = (stateValues) => {
        sessionStorage.setItem('currentState', stateValues);
    }
 
   
    StateList = async () => {
      const personValues = await get('https://data.covid19india.org/v4/min/data.min.json');
      let finalResutls = [];
     for(var stateValues in personValues) {
        if(personValues.hasOwnProperty(stateValues)){
            for(var districtvalues in personValues[stateValues]['districts']) {
                if(personValues[stateValues]['districts'].hasOwnProperty(districtvalues)) {             
                    finalResutls.push({
                        stateName: stateValues,
                        districtName: districtvalues,
                        districtConfirmed: personValues[stateValues]['districts'][districtvalues]['total'],
                        metaDate: personValues[stateValues]['districts'][districtvalues]['meta'],
                    })
                }
                }
        }
    }   
    this.setState({stateValues: finalResutls})
    }

    render() {
        return (
            <div className='parent-state-results m-2'>
            <Row className='mt-2'>
            {this.state.stateValues.length !== 0 ? this.state.stateValues.map((productSpec, index) => (
                  <Col xs lg="4" className='mb-2' key={index.toString()}>
                    <Card>
                        <Card.Body>
                        <div className='d-flex justify-content-between'>
                                <h5 onClick={() => this.handleOnClick(productSpec.stateName)}><Link to='/delta'>{productSpec.stateName}</Link></h5>
                                <h5>{productSpec.districtName}</h5>
                           </div>
                           <h5 className='text-center'>Total</h5>
                           <div className='mt-2 d-flex justify-content-center'>
                                    <ListGroup>
                                        <ListGroup.Item>Confirmed: {productSpec.districtConfirmed?.confirmed ? productSpec.districtConfirmed.confirmed : 0}</ListGroup.Item>
                                        <ListGroup.Item>Recovered: {productSpec.districtConfirmed?.recovered ? productSpec.districtConfirmed.recovered : 0}</ListGroup.Item>
                                        <ListGroup.Item>Deceased: {productSpec.districtConfirmed?.deceased ? productSpec.districtConfirmed.deceased : 0}</ListGroup.Item>
                                    </ListGroup>
                           </div>
                        </Card.Body>
                    </Card>
                </Col>
            )) : <p className='text-center'>No Data Found</p>}
            </Row>
    </div>
        )
    }
}

export default StateResults;