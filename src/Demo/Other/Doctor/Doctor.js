import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Table, Button, Form, Card, Nav } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Formik } from "formik";
import classes from "./Doctor.module.scss";
import cogoToast from "cogo-toast";
// import { Table, Divider, Tag } from "antd";
// import Aux from "../../hoc/_Aux";
// import Card from "../../App/components/MainCard";
import * as actionCreators from "../../../store/actions/doctor";
import DoctorForm from "../../../App/components/DoctorForm";
import Axios from "axios";

class Doctor extends Component {
	state = {
		loading: true,
		toggle: false,
		file: null,
		toggleForm: false,
		index: -1,
		editToggle: false,
		text: "Add Doctor",
		values: {},
	};

	actionHandler = (id, index, type) => {
		console.log(this.props.doctors[index]);
		if (type === "Delete") {
			console.log("delete");
		} else {
			this.setState(
				{
					values: this.props.doctors[index],
					editToggle: true,
					text: "See Doctors",
					index: index,
				},
				console.log(this.state)
			);
			console.log("edit");
		}
	};

	toggleHandler = () => {
		let text = this.state.text;
		if (this.state.editToggle === true) {
			this.setState({
				text: "Add Doctor",
				toggle: false,
				editToggle: false,
			});
		} else {
			if (text === "Add Doctor") {
				this.setState({
					text: "See Doctor",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			} else if (text === "See Doctor") {
				this.setState({
					text: "Add Doctor",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			}
		}
	};

	componentDidMount = () => {
		console.log("sending");
		this.props
			.getDoctors(this.props.pageNo, this.props.size)
			.then(() => {
				cogoToast.success("Sucessfully fetched doctors");
				this.setState({
					loading: false,
				});
				// console.log(this.props.doctors);
			})
			.catch((err) => {
				cogoToast.error(err);
			});
		// axios.get("/doctors/get").then((result) => console.log(result));
	};

	pageHandler = (pageNo) => {
		console.log(pageNo);
		this.setState({ loading: true });

		this.props
			.nextList(pageNo, this.props.size)
			.then(() => {
				cogoToast.success("Successfully fetched Doctors!");
				this.setState({
					loading: false,
				});
				console.log(this.props.doctors);
			})
			.catch((err) => cogoToast.error(err));
	};

	validateHandler = (values) => {
		console.log(values);
		let errors = {};
		console.log("validate", values);
		if (!values.first_name) {
			errors.first_name = "Please enter first_name";
		}
		if (!values.last_name) {
			errors.last_name = "Please enter last_name";
		}
		if (!values.specialty) {
			errors.specialty = "Please enter specialty";
		}
		if (!values.registration_number) {
			errors.registration_number = "Please enter registration number";
		}
		if (!values.phone) {
			errors.phone = "Please enter contact number";
		}
		if (!values.email) {
			errors.email = "Please enter email";
		}
		if (!values.address) {
			errors.address = "Please enter address";
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
	csvValidateHandler = (values) => {
		console.log("in validate handler");
	};
	csvSubmitHandler = (values) => {
		console.log("insubmit  handler");
	};
	submitHandler = (values) => {
		console.log(values);
		this.props
			.registerDoctor(values)
			.then(() => cogoToast.success("Added Doctor successfully"))
			.catch((err) => cogoToast.error(err));
	};
	editHandler = (values) => {
		console.log(values);
		this.props
			.updateDoctor(values, this.state.index)
			.then(() => cogoToast.success("Updated successfully"))
			.catch((err) => cogoToast.error(err));
	};
	fileChange = (event) => {
		this.setState({
			file: event.target.files[0],
		});
		console.log(event.target.files[0]);
	};
	fileUpload = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", this.state.file);
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		console.log(formData, this.state.file);
		this.props
			.addDoctorCSV(formData, config)
			.then((res) => {
				console.log(res);
				cogoToast.success("Added Doctors successully");
			})
			.catch((err) => cogoToast.error(err));
	};
	toggleForm = () => {
		let form = !this.state.toggleForm;
		this.setState({
			toggleForm: form,
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
					<td>
						<Button
							size="sm"
							variant="warning"
							onClick={() => this.actionHandler(elem._id, index, "Edit")}
						>
							Edit
						</Button>
						<Button
							size="sm"
							onClick={() => this.actionHandler(elem._id, index, "Delete")}
							variant="danger"
						>
							Delete
						</Button>
					</td>
				</tr>
			);
		});
		return (
			<div>
				<Button variant="info" size="lg" block onClick={this.toggleHandler}>
					{this.state.text}
				</Button>
				{this.state.toggle ? (
					<div>
						<Card>
							<Card.Header>
								<Nav variant="tabs" defaultActiveKey="#form">
									<Nav.Item>
										<Nav.Link href="#form" onClick={this.toggleForm}>
											Fill Form
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="#file" onClick={this.toggleForm}>
											Import File
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body>
								{this.state.toggleForm ? (
									<Form>
										<Form.Row>
											<Form.Group as={Col} md="6" controlId="validationFile">
												<Form.Control
													type="file"
													name="first_name"
													onChange={this.fileChange}
												/>
											</Form.Group>
											<Button type="submit" onClick={this.fileUpload}>
												Upload
											</Button>
										</Form.Row>
									</Form>
								) : (
									<DoctorForm
										validateHandler={this.validateHandler}
										submitHandler={this.submitHandler}
										patientValues={{}}
										text={"Submit"}
									/>
								)}
							</Card.Body>
						</Card>
					</div>
				) : this.state.editToggle ? (
					//For edit
					<DoctorForm
						validateHandler={this.validateHandler}
						submitHandler={this.editHandler}
						doctorValues={this.state.values}
						text={"Update"}
					/>
				) : (
					<div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>npi</th>
									<th>Specialty</th>
									<th>Actions</th>
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
				)}
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
		addDoctorCSV: (formData, config) =>
			dispatch(actionCreators.addDoctorCSV(formData, config)),
		registerDoctor: (values) => actionCreators.registerDoctor(values),
		updateDoctor: (values, index) => actionCreators.updateDoctor(values, index),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
