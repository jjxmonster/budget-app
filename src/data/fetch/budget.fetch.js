export const fetchBudget = async ({ id }) => {
   const response = await fetch(
      `${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`
   );

   return response.json();
};

export const fetchBudgetedCategories = async ({ id }) => {
   const response = await fetch(
      `${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`
   );
   const data = await response.json();

   return data;
};

export const addTransaction = async ({ budgetId, data }) => {
   const response = await fetch(
      `${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }
   );

   return await response.json();
};

export const deleteTransaction = async ({ id }) => {
   await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
      method: 'DELETE',
   });
};
