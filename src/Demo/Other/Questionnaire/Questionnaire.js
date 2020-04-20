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
		currentQuestion: {
			// title:""
		},
		index: -1,
		optionText: "",

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
					currentQuestion: {
						title: "",
						option: [],
						category: "",
						superQuestion: true,
						root: true,
					},
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
		console.log("editHandler");
		// event.preventDefault();
		let data = this.state.currentQuestion;
		if (this.state.currentQuestion._id) {
			console.log("Without parent");
			this.props
				.updateQuestion(data)
				.then((result) => {
					cogoToast.success("Successfully Updated Question");
					// console.log(result);
					this.props
						.getQuestion(this.props.question._id)
						.then((res) => console.log("ok"))
						.catch((err) => cogoToast.error(err));
					// this.-
				})
				.catch((err) => console.log(err));
		} else {
			console.log("With parent");
			let data = {
				...this.state.currentQuestion,

				root: false,
			};
			this.props
				.addQuestion(data)
				.then((result) => {
					// console.log("with parent", result);
					cogoToast.success("Successfully added Question");
					this.setState({
						"currentQuestion._id": result._id,
					});
					this.props
						.getQuestion(this.props.question._id)
						.then((res) => console.log("ok"))
						.catch((err) => console.log(err));
				})
				.catch((err) => cogoToast.error(err));
			console.log("Submit this linked Question");
		}
	};
	submitHandler = () => {
		console.log("submitHandler");
		let data = this.state.currentQuestion;
		console.log("submit handler", data);
		this.props
			.addQuestion(data)
			.then((result) => {
				cogoToast.success("Successfully added Question");
				// this.setState({
				// 	"currentQuestion._id": result._id,
				// });

				this.actionHandler(result._id, -1, "Change");
			})
			.catch((err) => cogoToast.error("err"));
	};
	changeHandler = (event) => {
		// console.log(event.target.name, event.target.value);
		// console.log("I am in change", this.state);
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
			ques[event.target.name] = event.target.value;
			this.setState({
				currentQuestion: ques,
			});
		}
		// console.log("ChangeHandler", event.target);
	};
	actionHandler = (id, index, type) => {
		if (type === "Change") {
			console.log("Change", id, index, type);
			this.props.getQuestion(id).then(() => {
				this.setState({
					currentQuestion: this.props.question,
					values: this.props.question,
					toggle: false,
					editToggle: true,
					text: "See Table",
					index: index,
				});
			});
		} else if (type === "Delete") {
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
		console.log("Add option");
		let curOption = this.state.currentQuestion.option;
		curOption.push({ optionType: "radio", text: "", linkedQuestion: [] });
		console.log("CurOption", curOption);
		this.setState(
			{
				"currentQuestion.option": curOption,
			}
			// console.log("Add Otion", this.state)
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
			}
			// console.log(this.state.currentQuestion)
		);
	};

	newQuestionHandler = () => {
		console.log("New Question Handler");
	};

	linkedChangeHandler = (event) => {
		console.log(event.target.value);
		this.setState(
			{
				optionText: event.target.value,
			}
			// console.log(this.state)
		);
	};

	linkedQuestionHandler = () => {
		if (this.state.currentQuestion._id) {
			let text = "";
			if (this.state.optionText === "") {
				text = this.state.currentQuestion.option[0].text;
			} else {
				text = this.state.optionText;
			}
			let data = {
				parent: this.state.currentQuestion._id,
				title: "",
				option: [],
				optionText: text,
			};
			// console.log("This data", data);
			this.setState(
				{
					currentQuestion: data,
				}
				// console.log(this.state)
			);
		} else {
			cogoToast.info(
				"Please submit  question, Before adding any other linked Question "
			);
		}

		console.log("Linked Question Handler");
	};

	switchHandler = (id, index, type) => {
		this.props
			.switchSuperQuestion(id, index, !type)
			.then((result) => {
				cogoToast.success("Successfully updated superQuestion");
			})
			.catch((err) => cogoToast.error(err));
	};
	render() {
		let TableData = (this.props.questionnaire || []).map((item, index) => {
			console.log("table", item);
			return (
				<tr key={index}>
					<td>{this.props.size * this.props.pageNo + index + 1}</td>
					<td>{item.title}</td>
					<td>{item.specialty}</td>
					<td>{item.category}</td>
					<td>
						{String(item.superQuestion)}
						<Button
							size="sm"
							variant="warning"
							onClick={() =>
								this.switchHandler(item._id, index, item.superQuestion)
							}
						>
							Switch
						</Button>
					</td>
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
											<Col md={4}>
												{/* <TreeSection
													question={this.props.newQuestion}
													onSelectHandler={this.onSelectHandler}
												/> */}
												{/* <TreeSection question={this.state.questionnaire} /> */}
											</Col>
											<Col md={8}>
												<QuestionnaireForm
													formValues={this.state.currentQuestion}
													changeHandler={this.changeHandler}
													submitHandler={this.submitHandler}
													addOption={this.addOption}
													removeOption={this.removeOption}
													text="Submit"
												/>
											</Col>
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
													linkedChangeHandler={this.linkedChangeHandler}
													submitHandler={this.editHandler}
													linkedQuestionHandler={this.linkedQuestionHandler}
													newQuestionHandler={this.newQuestionHandler}
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
														"Super Question",
														"Action",
													]}
													data={TableData}
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
		addQuestion: (data) => dispatch(actionCreators.addQuestion(data)),
		switchSuperQuestion: (id, index, type) =>
			dispatch(actionCreators.switchSuperQuestion(id, index, type)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
