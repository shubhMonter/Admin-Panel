import React, { Component } from 'react';

import { Row, Col, Card, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

class EditData extends Component {
    state = {
        specialityList: [],
        addValue: ''
    }

    componentWillMount() {
        // ====Now hard coading the data later API calls will be made====
        let specialityList = [
            'Primary Care Doctor (PCP)',
            'Dentist',
            'Eye Doctor',
            'Midwife',
            'Oral Surgeon',
            'Psychologist'
        ];
        this.setState({ specialityList });
    }

    deleteHandler = (index) => {
        let specialityList = [...this.state.specialityList];
        specialityList.splice(index, 1);
        this.setState({ specialityList });
    }

    addValueHandler = () => {
        let inputValue = this.state.addValue;
        if (inputValue !== "") {
            let specialityList = [...this.state.specialityList];
            specialityList.splice(specialityList.length, 1, inputValue);
            this.setState({ specialityList });
        }
    }

    render() {
        let list = this.state.specialityList.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item}</td>
                    <td onClick={() => this.deleteHandler(index)}>Delete</td>
                </tr>
            );
        });

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Speciality</Card.Title>
                                <span className="d-block m-t-5">
                                    You can edit the speciality list here.<br />
                                    Click on "Delete" to delete.<br/>
                                    Input speciality and click on "Add" to add.
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Speciality</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list}
                                        <tr>
                                            <th scope="row">+</th>
                                            <td><input type="text" onChange={(e) => { this.setState({ addValue: e.target.value }) }} placeholder="Text..." /></td>
                                            <td onClick={this.addValueHandler}>Add</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default EditData;
