import React from 'react';
import { Table, ListGroup } from 'react-bootstrap';
import  { get } from 'jquery';
import '../DeltaList/Delta.scss'
import { format } from 'date-fns'

class DeltaStates extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            tableResults: [],
            dater: props.selectDate
        }

    }

    componentDidUpdate(propsvalue) {
        if(propsvalue.selectDate !== this.props.selectDate && this.props.selectDate !== new Date()) {
           const formatDate = format(this.props.selectDate, 'yyyy-MM-dd');
           const deltadateFilter = this.state.tableResults.filter(values => values.dates === formatDate);
           this.setState({tableResults: deltadateFilter});
        }
    }

    componentDidMount() {
        this.DeltaList();
    }

    // Listing the delta list
    DeltaList = async () => {
        let dateResult = [];
        const deltaValues = await get('https://data.covid19india.org/v4/min/timeseries.min.json');
        for(var date in deltaValues[sessionStorage.getItem('currentState')]['dates']) {
            if(deltaValues[sessionStorage.getItem('currentState')]['dates'].hasOwnProperty(date)) {
                dateResult.push({
                    dates: date,
                    total: deltaValues[sessionStorage.getItem('currentState')]['dates'][date]['total'],
                    delta: deltaValues[sessionStorage.getItem('currentState')]['dates'][date]['delta'],
                    delta7: deltaValues[sessionStorage.getItem('currentState')]['dates'][date]['delta7']
                })
            }
        }
        this.setState({tableResults: dateResult})
    }

    render() {
        return (
            <div className='table-background m-3'>
                <Table size="sm">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Recovered</th>
                        <th>Tested</th>
                        <th>Delta</th>
                        <th>Delta7</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableResults.length !== 0 ? this.state.tableResults.map((tableValues, index) => ( 
                        <tr key={index.toString()}>
                        <td>{tableValues.dates}</td>
                        <td>{tableValues.total.confirmed ? tableValues.total.confirmed : 0}</td>
                        <td>{tableValues.total.recovered ? tableValues.total.recovered : 0}</td>
                        <td>{tableValues.total.tested ? tableValues.total.tested : 0}</td>
                        <td>
                            <ListGroup>
                                <ListGroup.Item>Confirmed: {tableValues.delta?.confirmed}</ListGroup.Item>
                                <ListGroup.Item>Recovered: {tableValues.delta?.recovered ? tableValues.delta.recovered : 0}</ListGroup.Item>
                                <ListGroup.Item>Deceased: {tableValues.delta?.tested ? tableValues.delta.tested : 0}</ListGroup.Item>         
                            </ListGroup>
                        </td>
                        <td>
                        <ListGroup>
                                <ListGroup.Item>Confirmed: {tableValues.delta7?.confirmed}</ListGroup.Item>
                                <ListGroup.Item>Recovered: {tableValues.delta7?.recovered ? tableValues.delta7.recovered : 0}</ListGroup.Item>
                                <ListGroup.Item>Deceased: {tableValues.delta7?.tested ? tableValues.delta7.tested : 0}</ListGroup.Item>         
                            </ListGroup>
                        </td>
                        </tr>
                        )) : <tr><td colSpan={6}>No Data Found</td></tr>}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default DeltaStates;