import {
   SET_SELECTED_PARENT_CATEGORY_ID,
   SET_SELECTED_TRANSACTION_ID,
} from 'data/constants';

export const selectParentCategory = id => {
   return {
      type: SET_SELECTED_PARENT_CATEGORY_ID,
      payload: id,
   };
};

export const selectTransaction = id => {
   return {
      type: SET_SELECTED_TRANSACTION_ID,
      payload: id,
   };
};
