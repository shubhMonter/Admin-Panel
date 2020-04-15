import * as actionTypes from "./actions";
import Axios from "../../utilities/Axios/Axios";

export const getDoctors = (pageNo, size) => {
	console.log("get doctors actioncreator");
	return (dispatch) =>
		Axios.post("/admin/doctors/searchlite", {
			match: JSON.stringify({}),
			pageNo: pageNo,
			size: size,
		})
			.then((result) => {
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.GET_DOCTORS,
					payload: result.data.data,
				});
			})
			.catch((err) => err.response.data.message);
};

export const pagination = (pageNo, size) => {
	console.log("g");
	return (dispatch) =>
		Axios.post("/admin/doctors/searchlite", {
			match: JSON.stringify({}),
			pageNo: pageNo,
			size: size,
		})
			.then((result) => {
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.PAGE_HANDLER,
					payload: result.data.data,
					pageNo: pageNo,
					size: size,
				});
			})
			.catch((err) => err.response.data.message);
};

export const addDoctorCSV = (formData, config) => {
	console.log("get doctors actioncreator");
	return (dispatch) =>
		Axios.post("/admin/doctors/addCSV", formData, config)
			.then((resp) => {
				console.log(resp);
				return "done";
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
};

export const registerDoctor = (values) => {
	console.log("register");
	return (dispatch) =>
		Axios.post("/admin/doctors/register", values)
			.then(() => console.log("Succesfully added doctor"))
			.catch((err) => {
				console.log(err);
				Promise.reject(err.response.data.message);
			});
};

export const updateDoctor = (values, index) => {
	console.log("update");
	return (dispatch) =>
		Axios.post("/admin/doctors/update", values)
			.then(() => {
				dispatch({
					type: updateDoctor,
					payload: values,
					index: index,
				});
				console.log("Succesfully added doctor");
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
};
