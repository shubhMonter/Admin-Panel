import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
export default class SpecialtyForm extends Component {
	render() {
		console.log(this.props.patientValues);
		return (
			<div>
				<Formik
					validate={this.props.validateHandler}
					onSubmit={this.props.submitHandler}
					initialValues={{
						...this.props.specialtyValues,
						popular: this.props.specialtyValues.popular || "true",
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
									<Form.Label>Specialty name</Form.Label>
									<Form.Control
										required
										type="text"
										name="name"
										value={values.name}
										onChange={handleChange}
										isInvalid={touched.name && errors.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="6" controlId="validationFormik02">
									<Form.Label>Procedure name</Form.Label>
									<Form.Control
										required
										type="text"
										name="procedure_name"
										value={values.procedure_name}
										onChange={handleChange}
										isInvalid={touched.procedure_name && errors.procedure_name}
									/>

									<Form.Control.Feedback type="invalid">
										{errors.procedure_name}
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group
									as={Col}
									md="4"
									controlId="validationFormikUsername"
								>
									<Form.Label>Speciality ID</Form.Label>

									<Form.Control
										required
										type="text"
										placeholder="speciality_id"
										aria-describedby="inputGroupPrepend"
										name="speciality_id"
										value={values.speciality_id}
										onChange={handleChange}
										isInvalid={touched.speciality_id && errors.speciality_id}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.speciality_id}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="4" controlId="validationFormik03">
									<Form.Label>Popular</Form.Label>

									<Form.Control
										as="select"
										name="popular"
										value={values.popular}
										onChange={handleChange}
										isInvalid={touched.popular && errors.popular}
									>
										<option>True</option>
										<option>false</option>
									</Form.Control>

									<Form.Control.Feedback type="invalid">
										{errors.popular}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="4" controlId="validationFormik04">
									<Form.Label>Default Procedure ID</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder=""
										name="default_procedure_id"
										value={values.default_procedure_id}
										onChange={handleChange}
										isInvalid={
											touched.default_procedure_id &&
											errors.default_procedure_id
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.default_procedure_id}
									</Form.Control.Feedback>
								</Form.Group>
							</Form.Row>
							<Button type="submit">{this.props.text}</Button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}
