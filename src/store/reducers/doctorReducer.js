import * as actionTypes from "../actions/actions";

const initialState = {
	// static can't changeS
	doctors: [],
	pageNo: 1,
	size: 10,
};

const pageHandler = (state, action) => {
	let doctors = action.payload;
	let pageNo = action.pageNo;
	let size = action.size;
	console.log("I am getting", pageNo);
	return {
		...state,
		pageNo: pageNo,
		// size: size,
		doctors: doctors,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_DOCTORS:
			return {
				doctors: action.payload,
				size: state.size,
				pageNo: state.pageNo,
			};
		case actionTypes.PAGE_HANDLER:
			return pageHandler(state, action);
		default:
			return state;
	}
};

export default reducer;
