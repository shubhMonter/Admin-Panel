import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	patient: [],
	pageNo: 0,
	size: 10,
};

const update = (state, action) => {
	let curData = [...state.patient];
	curData[action.index] = action.payload;
	return {
		...state,
		patient: curData,
	};
};

const get = (state, action) => {
	let data = action.payload;
	let size = action.size;
	let pageNo = action.pageNo;
	return {
		patient: data,
		size,
		pageNo,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PATIENT:
			return get(state, action);
		case actionTypes.ADD_PATIENT:
			return {
				...state,
				patient: state.patient.concat(action.payload),
			};
		case actionTypes.UPDATE_PATIENT:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
