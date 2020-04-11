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
	Pagination,
} from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import * as actionCreators from "../../../store/actions/payment";
import cogoToast from "cogo-toast";
class Payment extends Component {
	state = {
		loading: true,
	};

	componentDidMount = () => {
		this.props
			.getPayment(this.props.pageNo, this.props.size)
			.then((result) => {
				cogoToast.success("Fetched Payments");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};
	pageHandler = (page) => {
		console.log("page", page);
		this.props
			.getPayment(page, this.props.size)
			.then((result) => {
				cogoToast.success("Fetched Payments");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};
	render() {
		let data = (this.props.payment || []).map((item, index) => {
			return (
				<tr key={index}>
					<td>{this.props.size * this.props.pageNo + index + 1}</td>
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
									<Pagination>
										<Pagination.Item
											onClick={() => this.pageHandler(this.props.pageNo - 1)}
										>
											Prev
										</Pagination.Item>
										<Pagination.Item
											onClick={() => this.pageHandler(this.props.pageNo + 1)}
										>
											Next
										</Pagination.Item>
									</Pagination>
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
		pageNo: state.paymentReducer.pageNo,
		size: state.paymentReducer.size,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getPayment: (pageNo, size) =>
			dispatch(actionCreators.getPayment(pageNo, size)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
