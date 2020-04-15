import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Table, Button, Pagination } from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import * as actionCreators from "../../../store/actions/patient";
import DataTable from "../../../App/components/DataTable";
import PatientForm from "../../../App/components/PatientForm";
import cogoToast from "cogo-toast";
class Patient extends Component {
	state = {
		addValue: "",
		loading: true,
		toggle: false,
		editToggle: false,
		text: "Add Patient",
		value: {},
		index: -1,
	};

	toggleHandler = () => {
		let text = this.state.text;
		if (this.state.editToggle === true) {
			this.setState({
				text: "Add Patient",
				toggle: false,
				editToggle: false,
			});
		} else {
			if (text === "Add Patient") {
				this.setState({
					text: "See Patient",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			} else if (text === "See Patient") {
				this.setState({
					text: "Add Patient",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			}
		}
	};

	addValueHandler = () => {
		console.log("i came here");
		let inputValue = this.state.addValue;
		if (inputValue !== "") {
			let data = {
				name: this.state.addValue,
			};

			this.props.addSpecialty(data);
		}
	};
	editHandler = (values) => {
		this.props
			.updatePatient(values, this.state.index)
			.then(() => {
				cogoToast.success("Successfully updated patient!");
				this.setState({
					toggle: false,
					editToggle: false,
				});
			})
			.catch((err) => cogoToast.error(err));
	};
	validateHandler = (values) => {
		let errors = {};
		console.log("validate", values);
		if (!values.first_name) {
			errors.first_name = "Please enter first name";
		}
		if (!values.last_name) {
			errors.last_name = "Please enter last_name";
		}

		if (!values.phone) {
			errors.phone = "Please enter contact number";
		}
		if (!values.email) {
			errors.email = "Please enter email";
		}
		if (!values.Address) {
			errors.Address = "Please enter Address";
		}
		if (!values.city) {
			errors.city = "Please enter city";
		}
		if (!values.state) {
			errors.state = "Please enter state";
		}
		if (!values.country) {
			errors.country = "Please enter country";
		}
		if (!values.zip) {
			errors.zip = "Please enter zip";
		}
		return errors;
	};
	submitHandler = (values) => {
		console.log("submit handler", values);
		this.props
			.addPatient(values)
			.then((result) => {
				console.log(result);
				console.log("done");
				cogoToast.success("Successfully added patient!");
				this.toggleHandler();
			})
			.catch((err) => {
				console.log("error", err);
				cogoToast.error(err);
			});
		// Axios.post("/admin/addSpecialty", values)
		// 	.then(() => console.log("Succesfully added specialty"))
		// 	.catch((err) => console.log(err));
	};

	actionHandler = (id, index, type) => {
		if (type === "Delete") {
			console.log("delete");
		} else {
			this.setState(
				{
					values: this.props.patient[index],
					editToggle: true,
					text: "See Patient",
					index: index,
				},
				console.log(this.state)
			);
			console.log("edit");
		}
	};
	componentDidMount = () => {
		console.log(this.props.pageNo, this.props.size);
		this.props
			.getPatient(this.props.pageNo, this.props.size)
			.then(() => {
				cogoToast.success("Fetched Patients");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};
	pageHandler = (page) => {
		console.log("page", page);
		this.props
			.getPatient(page, this.props.size)
			.then(() => {
				cogoToast.success("Fetched Patients");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};
	render() {
		let data = this.props.patient.map((item, index) => {
			return (
				<tr key={index}>
					<td>{this.props.pageNo * this.props.size + index + 1}</td>
					<td>{item.first_name + " " + item.last_name}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
					<td>
						<Button
							size="sm"
							variant="warning"
							onClick={() => this.actionHandler(item._id, index, "Edit")}
						>
							Edit
						</Button>
						<Button
							size="sm"
							onClick={() => this.actionHandler(item._id, index, "Delete")}
							variant="danger"
						>
							Delete
						</Button>
					</td>
				</tr>
			);
		});

		return (
			<Aux>
				<Row>
					<Col>
						<Card>
							<Card.Header>
								<Card.Title as="h5">Patient</Card.Title>
							</Card.Header>
							<Card.Body>
								<div>
									<Button
										variant="info"
										size="lg"
										block
										onClick={this.toggleHandler}
									>
										{this.state.text}
									</Button>
									{this.state.toggle ? (
										//For new patient
										<PatientForm
											validateHandler={this.validateHandler}
											submitHandler={this.submitHandler}
											patientValues={{}}
											text={"Submit"}
										/>
									) : this.state.editToggle ? (
										//For edit
										<PatientForm
											validateHandler={this.validateHandler}
											submitHandler={this.editHandler}
											patientValues={this.state.values}
											text={"Update"}
										/>
									) : (
										<div>
											{this.state.loading ? (
												"Loading"
											) : (
												<DataTable
													header={["#", "Name", "Email", "Phone", "Action"]}
													data={data}
													pageHandler={this.pageHandler}
													pageNo={this.props.pageNo}
												/>
											)}
										</div>
									)}
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
		patient: state.patientReducer.patient,
		pageNo: state.patientReducer.pageNo,
		size: state.patientReducer.size,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getPatient: (pageNo, size) =>
			dispatch(actionCreators.getPatient(pageNo, size)),
		addPatient: (data) => dispatch(actionCreators.addPatient(data)),
		updatePatient: (data, index) =>
			dispatch(actionCreators.updatePatient(data, index)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Patient);
