import * as actionTypes from "../actions/actions";
const initialState = {
	questionnaire: [],
	pageNo: 0,
	size: 5,
	question: {},
};
const get = (state, action) => {
	// console.log("action ", action);
	return {
		...state,
		pageNo: action.pageNo,
		size: action.size,
		questionnaire: action.payload,
	};
};
const getQuestion = (state, action) => {
	console.log("came here");
	let curState = state;
	// curState.question = action.payload;
	return {
		...state,
		question: action.payload,
	};
};

const updateQuestion = (state, action) => {
	return state;
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_QUESTIONNAIRE:
			return get(state, action);
		case actionTypes.GET_QUESTION:
			return getQuestion(state, action);
		case actionTypes.UPDATE_QUESTION:
			return updateQuestion(state, action);
		default:
			return state;
	}
};

export default reducer;
