import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
const QuestionForm = (props) => {
	console.log("Questionnairre form", props.formValues);

	return (
		<Form noValidate onSubmit={props.submitHandler}>
			<Form.Row>
				<Form.Group as={Col} md="12" controlId="validationFormik01">
					<Form.Label>Title</Form.Label>
					<Form.Control
						required
						type="text"
						name="title"
						value={props.formValues.title}
						onChange={props.changeHandler}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col} md="6" controlId="validationFormik01">
					<Form.Label>Category</Form.Label>
					<Form.Control
						required
						type="text"
						name="category"
						value={props.formValues.category}
						onChange={props.changeHandler}
					/>
				</Form.Group>
				<Form.Group as={Col} md="6" controlId="validationFormik01">
					<Form.Label>Specialty</Form.Label>
					<Form.Control
						required
						type="text"
						name="specialty"
						value={props.formValues.specialty}
						onChange={props.changeHandler}
					/>
				</Form.Group>
			</Form.Row>
			{(props.formValues.option || []).map((elem, index) => {
				return (
					<Form.Row key={index}>
						<Form.Group as={Col} md="3" controlId="validationFormik01">
							<Form.Control
								as="select"
								name={`optionType-${index}`}
								onChange={props.changeHandler}
								defaultValue={elem.optionType}
							>
								<option value="checkbox">checkbox</option>
								<option value="radio">radio</option>
								<option value="text">text</option>
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} md="8" controlId="validationFormik01">
							<Form.Control
								required
								type="text"
								name={`optionText-${index}`}
								value={elem.text}
								placeholder={elem.text}
								onChange={props.changeHandler}
							/>
						</Form.Group>
						<Form.Group as={Col} md="1" controlId="validationFormik01">
							<Button
								onClick={() => props.removeOption(index)}
								variant="danger"
							>
								X
							</Button>
						</Form.Group>
					</Form.Row>
				);
			})}

			<Button onClick={props.submitHandler}>{props.text}</Button>
			<Button onClick={props.addOption} variant="info">
				Add Option
			</Button>

			<Form.Group as={Row} controlId="validationFormik01">
				<Form.Label column="lg" lg={4}>
					Select option to add linked Question
				</Form.Label>
				<Col>
					<Form.Control
						as="select"
						name={`linkedQuestion`}
						onChange={props.linkedChangeHandler}
						lg={6}
						defaultValue="Select any option"
					>
						{(props.formValues.option || []).map((elem, index) => {
							return (
								<option key={index} value={elem.text}>
									{index + 1 + ". " + elem.text}
								</option>
							);
						})}
					</Form.Control>
				</Col>
				<Col>
					<Button
						onClick={props.linkedQuestionHandler}
						variant="outline-info"
						block
					>
						Add
					</Button>
				</Col>
			</Form.Group>
		</Form>
	);
};

export default QuestionForm;
