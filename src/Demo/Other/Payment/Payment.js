import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Row,
	Col,
	Card,
	Table,
	Button,
	Form,
	InputGroup,
} from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import * as actionCreators from "../../../store/actions/payment";
import cogoToast from "cogo-toast";
class Payment extends Component {
	state = {
		loading: true,
	};

	componentDidMount = () => {
		this.props.getPayment().then(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		let data = (this.props.payment || []).map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.patient.first_name + " " + item.last_name}</td>
					<td>{item.doctor.first_name + " " + item.last_name}</td>
					<td>{item.transactionId}</td>
					<td>{item.amount}</td>
				</tr>
			);
		});

		return (
			<Aux>
				<Row>
					<Col>
						<Card>
							<Card.Header>
								<Card.Title as="h5">Payment</Card.Title>
							</Card.Header>
							<Card.Body>
								<div>
									<Table striped bordered hover>
										<thead>
											<tr>
												<th>#</th>
												<th>Patient</th>
												<th>Doctor</th>
												<th>Transaction ID</th>
												<th>Amount</th>
											</tr>
										</thead>
										<tbody>
											{this.state.loading ? (
												<tr>
													<td>"Loading"</td>
												</tr>
											) : (
												data
											)}
										</tbody>
									</Table>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		payment: state.paymentReducer.payment,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getPayment: () => dispatch(actionCreators.getPayment()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
