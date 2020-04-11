import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Row,
	Col,
	Card,
	Table,
	Button,
	Pagination,
	Form,
	InputGroup,
} from "react-bootstrap";
import Aux from "../../../hoc/_Aux";
import { Formik } from "formik";
import * as actionCreators from "../../../store/actions/editData";
import SpecialtyForm from "../../../App/components/specialtyForm";
import cogoToast from "cogo-toast";
class EditData extends Component {
	state = {
		specialityList: [],
		addValue: "",
		loading: true,
		toggle: false,
		editToggle: false,
		index: 0,
		text: "Add Specialty",
		value: {},
	};

	toggleHandler = () => {
		let text = this.state.text;
		if (this.state.editToggle === true) {
			this.setState({
				text: "Add Specialty",
				toggle: false,
				editToggle: false,
			});
		} else {
			if (text === "Add Specialty") {
				this.setState({
					text: "See Table",
					toggle: !this.state.toggle,
					editToggle: false,
				});
			} else if (text === "See Table") {
				this.setState({
					text: "Add Specialty",
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
		console.log(this.state);
		this.props.updateSpeciality(values, this.state.index).then(() => {
			this.setState({
				toggle: false,
				editToggle: false,
				index: -1,
			});
		});
	};
	validateHandler = (values) => {
		console.log(isNaN(values.default_procedure_id));
		let errors = {};
		console.log("validate", values);
		if (!values.name) {
			errors.name = "Please enter specialty";
		}
		if (!values.procedure_name) {
			errors.procedure_name = "Please enter procedure_name ";
		}
		if (!values.default_procedure_id) {
			errors.default_procedure_id = "Please enter default procedure id";
		}
		if (values.default_procedure_id && isNaN(values.default_procedure_id)) {
			errors.default_procedure_id = "Procedure id accepts only number";
		}
		if (!values.speciality_id) {
			errors.speciality_id = "Please enter speciality_id";
		}
		if (!values.popular) {
			errors.popular = "Please enter contact popular";
		}

		return errors;
	};
	submitHandler = (values) => {
		console.log("submit handler", values);
		this.props
			.addSpecialty(values)
			.then((result) => {
				console.log(result);
				console.log("done");
				cogoToast.success("Successfully added specialty!");
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
			let curState = { ...this.state };
			curState.text = "See Table";
			curState.editToggle = true;
			curState.index = index;
			curState.values = this.props.specialty[index];
			this.setState(
				{
					values: this.props.specialty[index],
					index: index,
					editToggle: true,
					text: "See Table",
				},
				console.log(this.state)
			);
			console.log("edit");
		}
	};
	componentDidMount = () => {
		this.props.getSpecialty(this.props.pageNo, this.props.size).then(() => {
			this.setState({ loading: false });
		});
	};
	pageHandler = (page) => {
		this.props.getSpecialty(page, this.props.size).then(() => {
			this.setState({ loading: false });
		});
	};
	render() {
		let data = this.props.specialty.map((item, index) => {
			return (
				<tr key={index}>
					<td>{this.props.pageNo * this.props.size + index + 1}</td>
					<td>{item.name}</td>
					<td>{item.speciality_id}</td>
					<td>{item.procedure_name}</td>
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
								<Card.Title as="h5">Speciality</Card.Title>
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
										<SpecialtyForm
											validateHandler={this.validateHandler}
											submitHandler={this.submitHandler}
											specialtyValues={{}}
											text={"Submit"}
										/>
									) : this.state.editToggle ? (
										//For edit
										<SpecialtyForm
											validateHandler={this.validateHandler}
											submitHandler={this.editHandler}
											specialtyValues={this.state.values}
											text={"Update"}
										/>
									) : (
										<div>
											<Table striped bordered hover size="sm">
												<thead>
													<tr>
														<th>#</th>
														<th>Name</th>
														<th>Specialty ID</th>
														<th>Procedure</th>
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
											<Pagination>
												<Pagination.Item
													onClick={() =>
														this.pageHandler(this.props.pageNo - 1)
													}
												>
													Prev
												</Pagination.Item>
												<Pagination.Item
													onClick={() =>
														this.pageHandler(this.props.pageNo + 1)
													}
												>
													Next
												</Pagination.Item>
											</Pagination>
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
		specialty: state.specialtyReducer.specialty,
		pageNo: state.specialtyReducer.pageNo,
		size: state.specialtyReducer.size,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getSpecialty: (pageNo, size) =>
			dispatch(actionCreators.getSpecialty(pageNo, size)),
		addSpecialty: (data) => dispatch(actionCreators.addSpecialty(data)),
		updateSpeciality: (data, index) =>
			dispatch(actionCreators.updateSpecialty(data, index)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EditData);
