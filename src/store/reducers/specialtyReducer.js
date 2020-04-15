import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	specialty: [],
	pageNo: 0,
	size: 10,
};

const update = (state, action) => {
	console.log("Index", action.index);
	let curdata = [...state.specialty];
	curdata[action.index] = action.payload;
	return {
		...state,
		specialty: curdata,
	};
};

const get = (state, action) => {
	let data = action.payload;
	let size = action.size;
	let pageNo = action.pageNo;
	return {
		specialty: data,
		size,
		pageNo,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_SPECIALTY:
			return get(state, action);
		case actionTypes.ADD_SPECIALTY:
			return {
				...state,
				specialty: state.specialty.concat(action.payload),
			};
		case actionTypes.UPDATE_SPECIALTY:
			return update(state, action);
		default:
			return state;
	}
};

export default reducer;
