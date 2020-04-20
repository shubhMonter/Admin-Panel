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

const switchSuperQuestion = (state, action) => {
	console.log(action);
	let ques = { ...state.questionnaire[action.index] };
	console.log("ques", ques);
	ques.superQuestion = action.change;
	console.log("after change", ques);
	let questionnaire = [...state.questionnaire];
	questionnaire[action.index] = ques;
	return {
		...state,
		questionnaire: questionnaire,
	};
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_QUESTIONNAIRE:
			return get(state, action);
		case actionTypes.GET_QUESTION:
			return getQuestion(state, action);
		case actionTypes.UPDATE_QUESTION:
			return updateQuestion(state, action);
		case actionTypes.ADD_QUESTION:
			return state;
		case actionTypes.SWITCH_SUPERQUESTION:
			return switchSuperQuestion(state, action);
		default:
			return state;
	}
};

export default reducer;
