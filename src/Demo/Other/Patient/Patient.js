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
import { Formik } from "formik";
import * as actionCreators from "../../../store/actions/patient";
import PatientForm from "../../../App/components/PatientForm";
import cogoToast from "cogo-toast";
class Patient extends Component {
	state = {
		specialityList: [],
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
	deleteHandler = (index) => {
		let specialityList = [...this.state.specialityList];
		specialityList.splice(index, 1);
		this.setState({ specialityList });
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
				this.setState({
					toggle: false,
					editToggle: false,
				});
			})
			.catch((err) => console.log(err));
	};
	validateHandler = (values) => {
		let errors = {};
		console.log("validate", values);
		if (!values.firstname) {
			errors.firstname = "Please enter first name";
		}
		if (!values.lastname) {
			errors.lastname = "Please enter last_name";
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
				cogoToast.info(err);
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
		this.props.getPatient().then(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		let data = this.props.patient.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.firstname + " " + item.lastname}</td>
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
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getPatient: () => dispatch(actionCreators.getPatient()),
		addPatient: (data) => dispatch(actionCreators.addPatient(data)),
		updatePatient: (data, index) =>
			dispatch(actionCreators.updatePatient(data, index)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Patient);
