import * as actionTypes from "./actions";
import Axios from "axios";

export const getDoctors = (pageNo, size) => {
	console.log("get doctors actioncreator");
	return (dispatch) =>
		Axios.post("/doctors/searchlite", {
			match: JSON.stringify({}),
			pageNo: pageNo,
			size: size,
		}).then((result) => {
			console.log("Data got", result.data.data);
			dispatch({
				type: actionTypes.GET_DOCTORS,
				payload: result.data.data,
			});
		});
};
export const pagination = (pageNo, size) => {
	console.log("g");
	return (dispatch) =>
		Axios.post("/doctors/searchlite", {
			match: JSON.stringify({}),
			pageNo: pageNo,
			size: size,
		}).then((result) => {
			console.log("Data got", result.data.data);
			dispatch({
				type: actionTypes.PAGE_HANDLER,
				payload: result.data.data,
				pageNo: pageNo,
				size: size,
			});
		});
};
