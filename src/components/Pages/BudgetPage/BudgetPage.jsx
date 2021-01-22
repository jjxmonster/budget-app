import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { addTransaction } from 'data/actions/budget.actions'


import { Grid } from './Budget.css.js';

import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetCategoryList from './BudgetCategoryList/index.js';
import BudgetTransactionList from './BudgetTransactionList/index.js'

import AddTransactionForm from './AddTransactionForm'
import TransactionModal from './TransactionModal'


const BudgetPage = () => {

    const history = useHistory()
    const { t } = useTranslation()

    const budgetDispatch = useDispatch()
    const budget = useSelector(store => store.budget.budget)
    const allCategories = useSelector(store => store.common.allCategories)






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
                    <SuspenseErrorBoundary >
                        <BudgetCategoryList />
                    </SuspenseErrorBoundary>

                </section>
                <section>

                    <SuspenseErrorBoundary >
                        <Button to="/budget/transactions/new">{ t('Add new transaction') }</Button>
                        <BudgetTransactionList />
                    </SuspenseErrorBoundary>

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