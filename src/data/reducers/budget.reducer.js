
import {
    LOADING_STATES,
    BUDGET_GET,
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCES,
    BUDGET_GET_FAILURE,
} from 'data/constants'

const initialState = {
    loadingState:{},
    budget:{},
    budgetCategories: []
}

const Budget = (state = initialState,action) => {
    const newLoadingState = {...state.loadingState}

    switch(action.type){
        case BUDGET_GET_REQUEST:
            return{
                ...state,
                loadingState:{
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }
        case BUDGET_GET_SUCCES:
            delete newLoadingState.BUDGET_GET_REQUEST
            return{
                ...state,
                budget: action.payload,
                loadingState:newLoadingState
            }
            case BUDGET_GET_FAILURE:
                delete newLoadingState.BUDGET_GET_REQUEST
                return{
                    ...state,
                    budget: {},
                    loadingState:newLoadingState
                }
        
        default :
            return state
    }
}

export default Budget
 
