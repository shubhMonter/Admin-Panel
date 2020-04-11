import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	payment: [],
	pageNo: 0,
	size: 10,
};

const get = (state, action) => {
	let data = action.payload;
	let pageNo = action.pageNo;
	let size = action.size;
	return {
		payment: data,
		pageNo,
		size,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PAYMENT:
			return get(state, action);
		default:
			return state;
	}
};

export default reducer;
