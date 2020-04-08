import * as actionTypes from "./actions";
import Axios from "axios";

export const getSpecialty = (pageNo, size) => {
	console.log("get specialty actioncreator");
	return (dispatch) =>
		Axios.get("/admin/specialty/get").then((result) => {
			console.log("Data got", result.data.data);
			dispatch({
				type: actionTypes.GET_SPECIALTY,
				payload: result.data.data,
			});
		});
};

export const addSpecialty = (payload) => {
	console.log("add specialty actioncreator", payload);
	return (dispatch) =>
		Axios.post("/admin/specialty/add", payload)
			.then((resp) => {
				console.log("received response", resp);
				dispatch({
					type: actionTypes.ADD_SPECIALTY,
					payload: payload,
				});
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};

export const updateSpecialty = (payload, index) => {
	console.log("update specialty actionCreator");
	return (dispatch) =>
		Axios.post("/admin/specialty/update", payload)
			.then((resp) => {
				console.log("received response", resp);
				dispatch({
					type: actionTypes.UPDATE_SPECIALTY,
					payload: payload,
					index: index,
				});
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};
