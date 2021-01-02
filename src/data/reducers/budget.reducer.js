
import {
    LOADING_STATES,

    BUDGET_GET,
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
} from 'data/constants'

const initialState = {
    loadingState:null,
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
        case BUDGET_GET_SUCCESS:
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
    
 
        case BUDGETED_CATEGORIES_GET_REQUEST:
            return{
                ...state,
                loadingState:{
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }
        case BUDGETED_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST
            return{
                ...state,
                budgetCategories: action.payload,
                loadingState:newLoadingState
            }
            case BUDGETED_CATEGORIES_GET_FAILURE:
                delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST
                return{
                    ...state,
                    budgetCategories: [],
                    loadingState:newLoadingState
                }
        
        default :
            return state
    }
}

export default Budget
 
