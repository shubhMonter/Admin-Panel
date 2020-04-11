import * as actionTypes from "./actions";
import Axios from "axios";

export const getPayment = (pageNo, size) => {
	console.log("get payment actioncreator");
	return (dispatch) =>
		Axios.post("/admin/payment/get", { pageNo, size })
			.then((result) => {
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.GET_PAYMENT,
					payload: result.data.data,
					pageNo,
					size,
				});
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};
