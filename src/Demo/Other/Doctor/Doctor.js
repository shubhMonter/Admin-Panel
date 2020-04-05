import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Row,
	Col,
	Table,
	Button,
	Form,
	Card,
	InputGroup,
	Nav,
} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Formik } from "formik";
import classes from "./Doctor.module.scss";
import * as yup from "yup";
import { render } from "react-dom";
// import { Table, Divider, Tag } from "antd";
// import Aux from "../../hoc/_Aux";
// import Card from "../../App/components/MainCard";
import * as actionCreators from "../../../store/actions/doctor";
import Axios from "axios";

class SamplePage extends Component {
	state = {
		loading: true,
		toggle: true,
		file: null,
		toggleForm: false,
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

	toggleHandler = () => {
		this.setState({
			toggle: true,
		});
	};
	validateHandler = (values) => {
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
		Axios.post("/doctors/registerByAdmin", values)
			.then(() => console.log("Succesfully added doctor"))
			.catch((err) => console.log(err));
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
		Axios.post("/doctors/addDoctorsByAdmin", formData, config).then((resp) => {
			console.log(resp);
		});
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
				</tr>
			);
		});
		return (
			<div>
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
									<Formik
										validate={this.validateHandler}
										onSubmit={this.submitHandler}
										initialValues={{}}
									>
										{({
											handleSubmit,
											handleChange,
											handleBlur,
											values,
											touched,
											isValid,
											errors,
										}) => (
											<Form noValidate onSubmit={handleSubmit}>
												<Form.Row>
													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik01"
													>
														<Form.Label>First name</Form.Label>
														<Form.Control
															required
															type="text"
															name="first_name"
															value={values.first_name}
															onChange={handleChange}
															isValid={touched.first_name && !errors.first_name}
															isInvalid={
																touched.first_name && errors.first_name
															}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.first_name}
														</Form.Control.Feedback>
													</Form.Group>
													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik02"
													>
														<Form.Label>Last name</Form.Label>
														<Form.Control
															type="text"
															name="last_name"
															value={values.last_name}
															onChange={handleChange}
															isValid={touched.last_name && !errors.last_name}
															isInvalid={errors.last_name}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.last_name}
														</Form.Control.Feedback>
													</Form.Group>
												</Form.Row>
												<Form.Row>
													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik02"
													>
														<Form.Label>Specialty</Form.Label>
														<Form.Control
															type="text"
															name="specialty"
															value={values.specialty}
															onChange={handleChange}
															isValid={touched.specialty && !errors.specialty}
															isInvalid={errors.specialty}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.specialty}
														</Form.Control.Feedback>
													</Form.Group>

													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik02"
													>
														<Form.Label>Registration number</Form.Label>
														<Form.Control
															type="text"
															name="registration_number"
															value={values.registration_number}
															onChange={handleChange}
															isValid={
																touched.registration_number &&
																!errors.registration_number
															}
															isInvalid={errors.registration_number}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.registration_number}
														</Form.Control.Feedback>
													</Form.Group>
												</Form.Row>
												<Form.Row>
													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik01"
													>
														<Form.Label>Email</Form.Label>
														<Form.Control
															type="text"
															name="email"
															value={values.email}
															onChange={handleChange}
															isValid={touched.email && !errors.email}
															isInvalid={errors.email}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.email}
														</Form.Control.Feedback>
													</Form.Group>
													<Form.Group
														as={Col}
														md="6"
														controlId="validationFormik01"
													>
														<Form.Label>Contact number</Form.Label>
														<Form.Control
															type="text"
															name="phone"
															value={values.phone}
															onChange={handleChange}
															isValid={touched.phone && !errors.phone}
															isInvalid={errors.phone}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.phone}
														</Form.Control.Feedback>
													</Form.Group>
												</Form.Row>
												<Form.Row>
													<Form.Group
														as={Col}
														md="8"
														controlId="validationFormik03"
													>
														<Form.Label>Address</Form.Label>
														<Form.Control
															type="text"
															placeholder="address"
															name="address"
															value={values.address}
															onChange={handleChange}
															isValid={touched.address && !errors.address}
															isInvalid={errors.address}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.address}
														</Form.Control.Feedback>
													</Form.Group>
													<Form.Group
														as={Col}
														md="4"
														controlId="validationFormik04"
													>
														<Form.Label>City</Form.Label>
														<Form.Control
															type="text"
															placeholder="city"
															name="city"
															value={values.city}
															onChange={handleChange}
															isValid={touched.city && !errors.city}
															isInvalid={errors.city}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.city}
														</Form.Control.Feedback>
													</Form.Group>
												</Form.Row>
												<Form.Row>
													<Form.Group
														as={Col}
														md="4"
														controlId="validationFormik05"
													>
														<Form.Label>State</Form.Label>
														<Form.Control
															type="text"
															placeholder="state"
															name="state"
															value={values.state}
															onChange={handleChange}
															isValid={touched.state && !errors.state}
															isInvalid={errors.state}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.state}
														</Form.Control.Feedback>
													</Form.Group>
													<Form.Group
														as={Col}
														md="4"
														controlId="validationFormik05"
													>
														<Form.Label>Country</Form.Label>
														<Form.Control
															type="text"
															placeholder="country"
															name="country"
															value={values.country}
															onChange={handleChange}
															isValid={touched.country && !errors.country}
															isInvalid={errors.country}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.country}
														</Form.Control.Feedback>
													</Form.Group>
													<Form.Group
														as={Col}
														md="4"
														controlId="validationFormik05"
													>
														<Form.Label>Zip</Form.Label>
														<Form.Control
															type="text"
															placeholder="Zip"
															name="zip"
															value={values.zip}
															onChange={handleChange}
															isInvalid={errors.zip}
															isValid={touched.zip && !errors.zip}
														/>

														<Form.Control.Feedback type="invalid">
															{errors.zip}
														</Form.Control.Feedback>
													</Form.Group>
												</Form.Row>

												<Button type="submit">Submit form</Button>
											</Form>
										)}
									</Formik>
								)}
							</Card.Body>
						</Card>
					</div>
				) : (
					<div>
						<Button variant="info" size="lg" block onClick={this.toggleHandler}>
							Add Doctor
						</Button>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);
