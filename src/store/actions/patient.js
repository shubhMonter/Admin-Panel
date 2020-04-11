import * as actionTypes from "./actions";
import Axios from "axios";

export const getPatient = (pageNo, size) => {
	console.log("get specialty actioncreator");
	return (dispatch) =>
		Axios.post("/admin/patient/get", { pageNo, size })
			.then((result) => {
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.GET_PATIENT,
					payload: result.data.data,
					pageNo: pageNo,
					size: size,
				});
			})
			.catch((err) => Promise.reject(err.response.data.message));
};

export const addPatient = (payload) => {
	console.log("add patient actioncreator", payload);
	return (dispatch) =>
		Axios.post("/admin/patient/add", payload)
			.then((resp) => {
				console.log("received response", resp);
				dispatch({
					type: actionTypes.ADD_PATIENT,
					payload: payload,
				});
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};

export const updatePatient = (payload, index) => {
	console.log("update patient actionCreator");
	return (dispatch) =>
		Axios.post("/admin/patient/update", payload)
			.then((resp) => {
				console.log("received response", resp);
				dispatch({
					type: actionTypes.UPDATE_PATIENT,
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
