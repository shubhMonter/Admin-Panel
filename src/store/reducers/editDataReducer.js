import * as actionTypes from "../actions/actions";
import { updateSpecialty } from "../actions/editData";

const initialState = {
	// static can't changeS
	specialty: [],
};

const update = (state, action) => {
	console.log("Index", action.index);
	let curdata = [...state.specialty];
	curdata[action.index] = action.payload;
	return {
		specialty: curdata,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_SPECIALTY:
			return {
				specialty: action.payload,
			};
		case actionTypes.ADD_SPECIALTY:
			return {
				specialty: state.specialty.concat(action.payload),
			};
		case actionTypes.UPDATE_SPECIALTY:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
