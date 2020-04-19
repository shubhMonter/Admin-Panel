import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
const QuestionForm = (props) => {
	// console.log("I got", props.formValues);

	return (
		<Form noValidate onSubmit={props.submitHandler}>
			<Form.Row>
				<Form.Group as={Col} md="12" controlId="validationFormik01">
					<Form.Label>{props.formValues.title}</Form.Label>
					<Form.Control
						required
						type="text"
						name="title"
						value={props.formValues.title}
						onChange={props.changeHandler}
					/>
				</Form.Group>
			</Form.Row>
			{props.formValues.option.map((elem, index) => {
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
		</Form>
	);
};

export default QuestionForm;
