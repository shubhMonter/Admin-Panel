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
