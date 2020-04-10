import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
export default class PatientForm extends Component {
	render() {
		console.log(this.props.patientValues);
		return (
			<Formik
				validate={this.props.validateHandler}
				onSubmit={this.props.submitHandler}
				initialValues={{
					...this.props.patientValues,
				}}
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
							<Form.Group as={Col} md="6" controlId="validationFormik01">
								<Form.Label>First name</Form.Label>
								<Form.Control
									required
									type="text"
									name="first_name"
									value={values.first_name}
									onChange={handleChange}
									isValid={touched.first_name && !errors.first_name}
									isInvalid={touched.first_name && errors.first_name}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.first_name}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationFormik02">
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
							<Form.Group as={Col} md="6" controlId="validationFormik01">
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
							<Form.Group as={Col} md="6" controlId="validationFormik01">
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
							<Form.Group as={Col} md="8" controlId="validationFormik03">
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="text"
									placeholder="Address"
									name="Address"
									value={values.Address}
									onChange={handleChange}
									isValid={touched.Address && !errors.Address}
									isInvalid={errors.Address}
								/>

								<Form.Control.Feedback type="invalid">
									{errors.Address}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationFormik04">
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
							<Form.Group as={Col} md="4" controlId="validationFormik05">
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
							<Form.Group as={Col} md="4" controlId="validationFormik05">
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
							<Form.Group as={Col} md="4" controlId="validationFormik05">
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

						<Button type="submit">{this.props.text}</Button>
					</Form>
				)}
			</Formik>
		);
	}
}
