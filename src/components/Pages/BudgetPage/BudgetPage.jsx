import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchBudget, fetchBudgetedCategories, addTransaction } from 'data/actions/budget.actions'
import { fetchAllCategories } from 'data/actions/common.actions.js';

import { Grid } from './Budget.css.js';

import { LoadingIndicator, Modal, Button } from 'components';
import BudgetCategoryList from './BudgetCategoryList/index.js';
import BudgetTransactionList from './BudgetTransactionList/index.js'
import ListErrorView from './ErrorView'
import AddTransactionForm from './AddTransactionForm'
import TransactionModal from './TransactionModal'


const BudgetPage = () => {

    const history = useHistory()
    const { t } = useTranslation()

    const budgetDispatch = useDispatch()
    const budget = useSelector(store => store.budget.budget)
    const commonState = useSelector(store => store.common.loadingState)
    const budgetState = useSelector(store => store.budget.loadingState)
    const allCategories = useSelector(store => store.common.allCategories)


    useEffect(() => {
        budgetDispatch(fetchBudget(1))
        budgetDispatch(fetchBudgetedCategories(1))
        budgetDispatch(fetchAllCategories())
    }, [budgetDispatch])

    const isLoaded = useMemo(() => (!!commonState && Object.keys(commonState).length === 0)
        && (!!budgetState && Object.keys(budgetState).length === 0),
        [commonState, budgetState]

    )

    if (isLoaded === true && !budget.transactions) {
        return <ListErrorView />
    }

    const handleSubmitAddTransaction = (values) => {
        budgetDispatch(addTransaction({
            budgetId: budget.id,
            data: values
        })).then(() => {
            history.goBack()
        })

    }

    return (
        <>
            <Grid>
                <section>
                    { isLoaded ? <BudgetCategoryList /> : <LoadingIndicator /> }
                </section>
                <section>
                    { isLoaded ? (
                        <>
                            <Button to="/budget/transactions/new">{ t('Add new transaction') }</Button>
                            <BudgetTransactionList />
                        </>
                    ) : <LoadingIndicator /> }
                </section>
            </Grid>
            <Switch>
                <Route path="/budget/transactions/new">
                    <Modal>
                        <AddTransactionForm
                            categories={ allCategories }
                            groupCategoriesBy="parentCategory.name"
                            onSubmit={ handleSubmitAddTransaction }
                        />
                    </Modal>
                </Route>
                <Route path="/budget/transactions/:id">
                    <Modal>
                        <TransactionModal />
                    </Modal>
                </Route>
            </Switch>
        </>
    );
}

export default BudgetPage;