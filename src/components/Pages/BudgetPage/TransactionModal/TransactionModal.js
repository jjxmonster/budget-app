import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from '../../../../themes/index.js';
import { useQuery } from 'react-query';

import {
   TransactionWrapper,
   CategoryNameWrapper,
   TransactionSubsection,
   TransactionAmount,
   TransactionInformationWrapper,
} from './TransactionModal.css';

import API from 'data/fetch';

const TransactionModal = () => {
   const { t } = useTranslation();

   const selectedTransactionId = useSelector(
      store => store.budget.selectedTransactionId
   );

   const { data: budget } = useQuery(
      'budget',
      API.budget.fetchBudget({ id: 1 })
   );
   const { data: allCategories } = useQuery(
      'allCategories',
      API.common.fetchAllCategories()
   );

   const currentTransaction = budget.transactions.find(
      transaction => transaction.id === selectedTransactionId
   );
   const categoryName = allCategories.find(
      category => category.id === currentTransaction.categoryId
   ).name;

   return (
      <TransactionWrapper>
         <CategoryNameWrapper>
            <h2>{categoryName}</h2>
         </CategoryNameWrapper>
         <TransactionInformationWrapper>
            <TransactionSubsection>
               <p>{t('Title')}:</p>
               <h3>{currentTransaction.description}</h3>
            </TransactionSubsection>

            <TransactionSubsection>
               <p>{t('Date')}:</p>
               <h3>{currentTransaction.date}</h3>
            </TransactionSubsection>

            <TransactionAmount>
               {formatCurrency(-currentTransaction.amount, i18n.language)}
            </TransactionAmount>
         </TransactionInformationWrapper>
      </TransactionWrapper>
   );
};

export default TransactionModal;
