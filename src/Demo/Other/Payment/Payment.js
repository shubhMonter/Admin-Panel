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
import * as actionCreators from "../../../store/actions/patient";
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
		let data = this.props.Payment.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.firstname + " " + item.lastname}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
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
												<th>Name</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Action</th>
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
		payment: state.PaymentReducer.payment,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getPayment: () => dispatch(actionCreators.getPayment()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
