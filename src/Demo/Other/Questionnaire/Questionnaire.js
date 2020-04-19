import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Table, Pagination, Button } from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import * as actionCreators from "../../../store/actions/questionnaire";
import DataTable from "../../../App/components/DataTable";
import TreeSection from "../../../App/components/TreeSection";
import QuestionnaireForm from "../../../App/components/QuestionnaireForm";
import cogoToast from "cogo-toast";
import "antd/dist/antd.css";
class Questionnaire extends Component {
	state = {
		addValue: "",
		loading: true,
		toggle: false,
		editToggle: false,
		text: "Add Question",
		value: {},
		currentQuestion: {},
		index: -1,
		// title: "",
		// id: "",
		// option: {},
	};

	onSelectHandler = (selectedKeys, info) => {
		console.log("It came in here", selectedKeys, info.selectedNodes);
		// this.changeState(selectedKeys);
		if (info)
			this.setState(
				{
					currentQuestion: info.selectedNodes[0],
				},
				() => console.log(this.state)
			);
		else {
			console.log("sonething wrong", info);
		}
		console.log("selected", selectedKeys, info.selectedNodes);
	};
	toggleHandler = () => {
		let text = this.state.text;
		if (this.state.editToggle === true) {
			this.setState({
				text: "Add Question",
				toggle: false,
				editToggle: false,
			});
		} else {
			if (text === "Add Question") {
				this.setState({
					text: "See Question",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			} else if (text === "See Question") {
				this.setState({
					text: "Add Question",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			}
		}
	};

	componentDidMount = () => {
		this.props
			.getQuestionnaire(this.props.pageNo, this.props.size)
			.then((result) => {
				cogoToast.success("Fetched Questions");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};

	editHandler = (values) => {
		// event.preventDefault();
		console.log(values);
		let data = this.state.currentQuestion;
		this.props
			.updateQuestion(data)
			.then((result) => {
				cogoToast.success("Successfully Updated Question");
				// this.props
				// 	.getQuestion()
				// 	.then(() => {
				// 		cogoToast.success("Fetched Question successfully");
				// 	})
				// 	.catch((err) => cogoToast.error(err));
			})
			.catch((err) => cogoToast.error(err));
	};
	submitHandler = (values) => {
		console.log("submit handler", values);
		// this.props
		// 	.addPatient(values)
		// 	.then((result) => {
		// 		console.log(result);
		// 		console.log("done");
		// 		cogoToast.success("Successfully added patient!");
		// 		this.toggleHandler();
		// 	})
		// 	.catch((err) => {
		// 		console.log("error", err);
		// 		cogoToast.error(err);
		// 	});
		// Axios.post("/admin/addSpecialty", values)
		// 	.then(() => console.log("Succesfully added specialty"))
		// 	.catch((err) => console.log(err));
	};
	changeHandler = (event) => {
		console.log(event.target.name, event.target.value);
		console.log("I am in change", this.state, event);
		let ques = this.state.currentQuestion;
		let data = event.target.name.split("-");
		if (data[0] === "optionType") {
			ques.option[data[1]].optionType = event.target.value;
			this.setState({
				currentQuestion: ques,
			});
		} else if (data[0] === "optionText") {
			ques.option[data[1]].text = event.target.value;
			this.setState({
				currentQuestion: ques,
			});
		} else {
			ques.title = event.target.value;
			this.setState({
				currentQuestion: ques,
			});
		}
		// console.log("ChangeHandler", event.target);
	};
	actionHandler = (id, index, type) => {
		if (type === "Delete") {
			console.log("delete");
		} else {
			this.props.getQuestion(this.props.questionnaire[index]._id).then(() => {
				this.setState({
					currentQuestion: this.props.question,
					values: this.props.question,
					editToggle: true,
					text: "See Table",
					index: index,
				});
			});

			console.log("edit");
		}
	};

	pageHandler = (page) => {
		this.props
			.getQuestionnaire(page, this.props.size)
			.then((result) => {
				cogoToast.success("Fetched Questions");
				this.setState({ loading: false });
			})
			.catch((err) => cogoToast.error(err));
	};

	addOption = () => {
		console.log("ADd option");
		let curOption = this.state.currentQuestion.option;
		curOption.push({ optionType: "radio", text: "", linkedQuestion: [] });
		console.log("CurOption", curOption);
		this.setState(
			{
				"currentQuestion.option": curOption,
			},
			console.log("Add Otion", this.state)
		);
	};
	removeOption = (index) => {
		console.log("remove option", index);
		let curOption = this.state.currentQuestion.option;
		let data = curOption.filter((elem, i) => index !== i);
		let curQues = this.state.currentQuestion;
		curQues.option = data;
		console.log(data);
		this.setState(
			{
				"currentQuestion.option": data,
			},
			console.log(this.state.currentQuestion)
		);
	};
	render() {
		let data = (this.props.questionnaire || []).map((item, index) => {
			return (
				<tr key={index}>
					<td>{this.props.size * this.props.pageNo + index + 1}</td>
					<td>{item.title}</td>
					<td>{item.speciality}</td>
					<td>{item.category}</td>
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
								<Card.Title as="h5">Questionnaire</Card.Title>
							</Card.Header>
							<Card.Body>
								<Button
									variant="info"
									size="lg"
									block
									onClick={this.toggleHandler}
								>
									{this.state.text}
								</Button>
								<div>
									{this.state.toggle ? (
										<Row>
											<Col md={3}>
												"Tree"
												{/* <TreeSection question={this.state.questionnaire} /> */}
											</Col>
											<Col md={9}>"Form"</Col>
										</Row>
									) : //For new patient
									// <PatientForm
									// 	validateHandler={this.validateHandler}
									// 	submitHandler={this.submitHandler}
									// 	patientValues={{}}
									// 	text={"Submit"}
									// />
									this.state.editToggle ? (
										<Row>
											<Col md={4}>
												<TreeSection
													question={this.props.question}
													onSelectHandler={this.onSelectHandler}
												/>
											</Col>
											<Col md={8}>
												<QuestionnaireForm
													formValues={this.state.currentQuestion}
													changeHandler={this.changeHandler}
													submitHandler={this.editHandler}
													addOption={this.addOption}
													removeOption={this.removeOption}
													text="Update"
												/>
											</Col>
										</Row>
									) : (
										//For edit
										// <PatientForm
										// 	validateHandler={this.validateHandler}
										// 	submitHandler={this.editHandler}
										// 	patientValues={this.state.values}
										// 	text={"Update"}
										// />
										<div>
											{this.state.loading ? (
												"Loading"
											) : (
												<DataTable
													header={[
														"#",
														"Question",
														"Specialty",
														"Category",
														"Action",
													]}
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
		questionnaire: state.questionnaireReducer.questionnaire,
		question: state.questionnaireReducer.question,
		pageNo: state.questionnaireReducer.pageNo,
		size: state.questionnaireReducer.size,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getQuestionnaire: (pageNo, size) =>
			dispatch(actionCreators.getQuestionnaire(pageNo, size)),
		getQuestion: (id) => dispatch(actionCreators.getQuestion(id)),
		updateQuestion: (data) => dispatch(actionCreators.updateQuestion(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
