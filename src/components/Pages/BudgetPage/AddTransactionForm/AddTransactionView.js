import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import API from 'data/fetch';

import AddTransactionForm from './AddTransactionForm';

const AddTransactionView = () => {
   const history = useHistory();
   const queryClient = useQueryClient();

   const { mutate } = useMutation(API.budget.addTransaction);

   const { data: budget } = useQuery('budget', () =>
      API.budget.fetchBudget({ id: 1 })
   );
   const { data: allCategories } = useQuery('allCategories', () =>
      API.common.fetchAllCategories()
   );

   const handleSubmitAddTransaction = values => {
      mutate(
         {
            budgetId: budget.id,
            data: values,
         },
         {
            onSuccess: async () => {
               await queryClient.refetchQueries(['budget'], { active: true });
               history.goBack();
            },
         }
      );
   };

   return (
      <AddTransactionForm
         categories={allCategories}
         groupCategoriesBy='parentCategory.name'
         onSubmit={handleSubmitAddTransaction}
      />
   );
};

export default AddTransactionView;
