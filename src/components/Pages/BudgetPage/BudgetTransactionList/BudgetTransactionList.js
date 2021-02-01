import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { groupBy } from 'lodash';
import { useQuery, useMutation, useQueryClient, useQueries } from 'react-query';

import { formatCurrency, formatDate } from 'themes';

import { List, ListItem } from './BudgetTransactionList.css';
import i18next from 'i18next';

import { selectTransaction } from 'data/actions/budget.actions.js';

import API from 'data/fetch';

const BudgetTransactionList = () => {
   const queryClient = useQueryClient();

   const { data: budget } = useQuery('budget', () =>
      API.budget.fetchBudget({ id: 1 })
   );
   const { data: allCategories } = useQuery(
      'allCategories',
      API.common.fetchAllCategories
   );
   const { data: budgetedCategories } = useQuery('budgetedCategories', () =>
      API.budget.fetchBudgetedCategories({ id: 1 })
   );

   const { mutate } = useMutation(API.budget.deleteTransaction);

   const dispatch = useDispatch();

   const selectedParentCategoryId = useSelector(
      store => store.budget.selectedParentCategoryId
   );

   const filteredTransactionsBySelectedParentCategory = useMemo(() => {
      if (typeof selectedParentCategoryId === 'undefined') {
         return budget.transactions;
      }

      if (selectedParentCategoryId === null) {
         return budget.transactions.filter(transaction => {
            const hasBudgetedCategory = budgetedCategories.some(
               budgetedCategory =>
                  budgetedCategory.categoryId === transaction.categoryId
            );

            return !hasBudgetedCategory;
         });
      }

      return budget.transactions.filter(transaction => {
         try {
            const category = allCategories.find(
               category => category.id === transaction.categoryId
            );
            const parentCategoryName = category.parentCategory.name;

            return parentCategoryName === selectedParentCategoryId;
         } catch (error) {
            return false;
         }
      });
   }, [
      selectedParentCategoryId,
      budget.transactions,
      allCategories,
      budgetedCategories,
   ]);

   const groupedTransactions = useMemo(
      () =>
         groupBy(filteredTransactionsBySelectedParentCategory, transaction =>
            new Date(transaction.date).getUTCDate()
         ),
      [filteredTransactionsBySelectedParentCategory]
   );

   const deleteTransaction = (e, id) => {
      e.stopPropagation();
      mutate(
         { id: id },
         {
            onSuccess: async () => {
               await queryClient.refetchQueries(['budget'], { active: true });
            },
         }
      );
   };

   return (
      <List>
         {Object.entries(groupedTransactions).map(([key, transactions]) => (
            <li key={key}>
               <ul>
                  {transactions.map(transaction => (
                     <ListItem
                        key={transaction.id}
                        onClick={() =>
                           dispatch(selectTransaction(transaction.id))
                        }
                     >
                        <Link
                           key={transaction.id}
                           to={`/budget/transactions/${transaction.id}`}
                        >
                           <div>{transaction.description}</div>
                           <div>
                              {formatCurrency(
                                 transaction.amount,
                                 i18next.language
                              )}
                           </div>
                           <div>{formatDate(transaction.date)}</div>
                           <div>
                              {
                                 (
                                    allCategories.find(
                                       category =>
                                          category.id === transaction.categoryId
                                    ) || {}
                                 ).name
                              }
                           </div>
                        </Link>
                        <div
                           onClick={e => deleteTransaction(e, transaction.id)}
                        >
                           &times;
                        </div>
                     </ListItem>
                  ))}
               </ul>
            </li>
         ))}
      </List>
   );
};

export default BudgetTransactionList;
