import * as actionTypes from "./actions";
import Axios from "../../utilities/Axios/Axios";

export const getQuestionnaire = (pageNo, size) => {
	return (dispatch) =>
		Axios.post("/admin/questionnaire/get", { pageNo, size })
			.then((result) => {
				// console.log(result);
				dispatch({
					type: actionTypes.GET_QUESTIONNAIRE,
					payload: result.data.data,
					pageNo,
					size,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
};

export const getQuestion = (id) => {
	// console.log("GetQuestion actionCreator");
	return (dispatch) =>
		Axios.post("/admin/questionnaire/question/get", { id })
			.then((result) => {
				// console.log(result);
				dispatch({
					type: actionTypes.GET_QUESTION,
					payload: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err);
			});
};

export const updateQuestion = (data) => {
	console.log("UpdateQuestion actionCreator");
	return (dispatch) =>
		Axios.post("/admin/questionnaire/question/update", data)
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.UPDATE_QUESTION,
					payload: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err);
			});
};

export const addQuestion = (data) => {
	console.log("addQuestion actionCreator");
	console.log("data", data);
	return (dispatch) =>
		Axios.post("/admin/questionnaire/question/add", data)
			.then((result) => {
				console.log("Result in action", result);
				dispatch({
					type: actionTypes.ADD_QUESTION,
					payload: result.data.data,
				});
				return result.data.data;
			})
			.catch((err) => {
				Promise.reject(err);
			});
};

export const switchSuperQuestion = (id, index, change) => {
	console.log("UpdateQuestion actionCreator");
	return (dispatch) =>
		Axios.post("/admin/questionnaire/question/update", {
			_id: id,
			superQuestion: change,
		})
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.SWITCH_SUPERQUESTION,
					index,
					change,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err);
			});
};
