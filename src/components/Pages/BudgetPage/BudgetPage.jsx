import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions'
import { fetchAllCategories } from 'data/actions/common.actions.js';

import { Grid } from './Budget.css.js';

import LoadingIndicator from 'components/LoadingIndicator/index.js';
import BudgetCategoryList from './BudgetCategoryList/index.js';



const BudgetPage = () => {

    const budgetDispatch = useDispatch()
    const budget = useSelector(store => store.budget.budget)
    const commonState = useSelector(store => store.common.loadingState)
    const budgetState = useSelector(store => store.budget.loadingState)

    useEffect(() => {
        budgetDispatch(fetchBudget(1))
        budgetDispatch(fetchBudgetedCategories(1))
        budgetDispatch(fetchAllCategories())
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories])

    const isLoaded = useMemo(() => (!!commonState && Object.keys(commonState).length === 0)
        && (!!budgetState && Object.keys(budgetState).length === 0),
        [commonState, budgetState]
    )

    return (
        <Grid>
            <section>
                { isLoaded ? <BudgetCategoryList /> : <LoadingIndicator /> }
            </section>
            <section>
                { isLoaded ? "Transaction List" : <LoadingIndicator /> }
            </section>
        </Grid>
    );
}

export default BudgetPage;