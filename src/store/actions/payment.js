import * as actionTypes from "./actions";
import Axios from "axios";

export const getPayment = () => {
	console.log("get payment actioncreator");
	return (dispatch) =>
		Axios.get("/admin/payment/get")
			.then((result) => {
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.GET_PAYMENT,
					payload: result.data.data,
				});
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};
