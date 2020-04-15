import * as actionTypes from '../actions/actions'
const initialState={
    questionnaire=[]
}
const get=(state,action)=>{
    return{
        ...state,
        questionnaire:action.payload
    }
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
		case actionTypes.GET_QUESTIONNAIRE:
			return get(state, action);
		
		default:
			return state;
	}
}

export default reducer;