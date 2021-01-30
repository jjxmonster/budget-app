import {
   SET_SELECTED_PARENT_CATEGORY_ID,
   SET_SELECTED_TRANSACTION_ID,
} from 'data/constants';

const initialState = {
   loadingState: null,
   budget: {},
   budgetCategories: [],
   selectedParentCategoryId: undefined,
   selectedTransactionId: undefined,
};

const Budget = (state = initialState, action) => {
   switch (action.type) {
      case SET_SELECTED_PARENT_CATEGORY_ID:
         return {
            ...state,
            selectedParentCategoryId: action.payload,
         };

      case SET_SELECTED_TRANSACTION_ID:
         return {
            ...state,
            selectedTransactionId: action.payload,
         };

      default:
         return state;
   }
};

export default Budget;
