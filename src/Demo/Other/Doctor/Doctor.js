import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import classes from "./Doctor.module.scss";
// import { Table, Divider, Tag } from "antd";
// import Aux from "../../hoc/_Aux";
// import Card from "../../App/components/MainCard";
import * as actionCreators from "../../../store/actions/doctor";
import axios from "axios";

class SamplePage extends Component {
	state = {
		loading: true,
	};
	componentDidMount = () => {
		console.log("sending");
		this.props.getDoctors(this.props.pageNo, this.props.size).then(() => {
			this.setState({
				loading: false,
			});
			console.log(this.props.doctors);
		});
		// axios.get("/doctors/get").then((result) => console.log(result));
	};

	pageHandler = (pageNo) => {
		console.log(pageNo);
		this.setState({ loading: true });

		this.props.nextList(pageNo, this.props.size).then(() => {
			this.setState({
				loading: false,
			});
			console.log(this.props.doctors);
		});
	};
	render() {
		let data = this.props.doctors.map((elem, index) => {
			return (
				<tr key={index}>
					<td>{(this.props.pageNo - 1) * this.props.size + index + 1}</td>
					<td>{elem.basic.name}</td>
					<td>{elem.npi}</td>
					<td>{elem.specialty}</td>
				</tr>
			);
		});
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>npi</th>
							<th>Specialty</th>
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
				<Pagination className={classes.pagination}>
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
		);
	}
}
const mapStateToProps = (state) => {
	return {
		doctors: state.doctorReducer.doctors,
		pageNo: state.doctorReducer.pageNo,
		size: state.doctorReducer.size,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDoctors: () => dispatch(actionCreators.getDoctors()),
		nextList: (pageNo, size) =>
			dispatch(actionCreators.pagination(pageNo, size)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);
