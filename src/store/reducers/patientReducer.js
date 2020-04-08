import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	patient: [],
};

const update = (state, action) => {
	let curData = [...state.patient];
	curData[action.index] = action.payload;
	return {
		patient: curData,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PATIENT:
			return {
				patient: action.payload,
			};
		case actionTypes.ADD_PATIENT:
			return {
				patient: state.patient.concat(action.payload),
			};
		case actionTypes.UPDATE_PATIENT:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
