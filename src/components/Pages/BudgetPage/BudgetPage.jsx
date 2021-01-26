import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Grid } from './Budget.css.js';

import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetCategoryList from './BudgetCategoryList/index.js';
import BudgetTransactionList from './BudgetTransactionList/index.js';
import AddTransactionView from './AddTransactionForm';
import TransactionModal from './TransactionModal';

const BudgetPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to='/budget/transactions/new'>
              {t('Add new transaction')}
            </Button>
            <BudgetTransactionList />
          </SuspenseErrorBoundary>
        </section>
      </Grid>
      <Switch>
        <Route path='/budget/transactions/new'>
          <Modal>
            <AddTransactionView />
          </Modal>
        </Route>
        <Route path='/budget/transactions/:id'>
          <Modal>
            <TransactionModal />
          </Modal>
        </Route>
      </Switch>
    </>
  );
};

export default BudgetPage;
