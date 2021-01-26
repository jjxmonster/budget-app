import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query';

import { addTransaction } from 'data/actions/budget.actions'
import API from 'data/fetch'

import AddTransactionForm from './AddTransactionForm'

const AddTransactionView = () => {

    const history = useHistory()
    const budgetDispatch = useDispatch() 
    

    const { data: budget } = useQuery('budget', () => API.budget.fetchBudget({ id: 1 }));
    const { data: allCategories } = useQuery('allCategories', () => API.common.fetchAllCategories());

    const handleSubmitAddTransaction = (values) =>
     {
        budgetDispatch(addTransaction({
            budgetId:
    budget.id,
            data:
                
                
                
                values})).then(() =>
        {

            history.goBack()
        }
        )
    }

    return ( 
            <AddTransactionForm
            categories={ allCategories
                
            }
        groupCategoriesBy="parentCategory.name"
                onSubmit={ handleSubmitAddTransaction }
            />
     );
}
 
export default AddTransactionView;