import * as actionTypes from "./actions";
import Axios from "../../utilities/Axios/Axios";

export const getQuestionnaire = () => {
	return (dispatch) =>
		Axios.get("/admin/questionnaire")
			.then((result) => {
				dispatch({
					type: actionTypes.GET_QUESTIONNAIRE,
					data: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
};
