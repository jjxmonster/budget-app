import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Grid } from './Budget.css.js';

import { Modal, Button, SuspenseErrorBoundary } from 'components';

import TransactionModal from './TransactionModal';

const BudgetCategoryList = React.lazy(() =>
   import('./BudgetCategoryList/index.js')
);
const BudgetTransactionList = React.lazy(() =>
   import('./BudgetTransactionList/index.js')
);
const AddTransactionView = React.lazy(() => import('./AddTransactionForm'));

const BudgetPage = () => {
   const { t } = useTranslation();
   const [showTransactions, setShowTransactions] = useState();

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
                  <Button
                     onClick={() => setShowTransactions(!showTransactions)}
                  >
                     {showTransactions
                        ? t('Hide Transactions')
                        : t('Show Transactions')}
                  </Button>
                  {showTransactions && <BudgetTransactionList />}
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
