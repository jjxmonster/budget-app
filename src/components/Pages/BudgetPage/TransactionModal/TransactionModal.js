import React from 'react';
import { useSelector } from 'react-redux'
import i18n from "i18next";
import { useTranslation } from 'react-i18next';


import {
    TransactionWrapper,
    CategoryNameWrapper,
    TransactionSubsection,
    TransactionAmount,
    TransactionInformationWrapper,
} from './TransactionModal.css'

import {formatCurrency} from '../../../../themes/index.js'



const TransactionModal = () => {

    const {t} = useTranslation()

    const selectedTransactionId = useSelector(store => store.budget.selectedTransactionId)
    const transactionsList = useSelector(store => store.budget.budget.transactions)
    const allCategories = useSelector(store => store.common.allCategories)

    const currentTransaction = transactionsList.find(transaction => transaction.id === selectedTransactionId)
    const categoryName = allCategories.find(category => category.id === currentTransaction.categoryId).name
        
   console.log(currentTransaction)
    return ( 
        <TransactionWrapper>
            <CategoryNameWrapper>
                <h2>{ categoryName }</h2>
            </CategoryNameWrapper> 
            <TransactionInformationWrapper>

                <TransactionSubsection>
                    <p>{ t('Title')}:</p>
                    <h3>{currentTransaction.description}</h3>
                </TransactionSubsection>

                <TransactionSubsection>
                    <p>{ t('Date')}:</p>
                   <h3>{currentTransaction.date}</h3> 
                </TransactionSubsection>

                <TransactionAmount>
                   {formatCurrency(-currentTransaction.amount, i18n.language)}
                </TransactionAmount>

            </TransactionInformationWrapper>
        </TransactionWrapper>
     );
}
 
export default TransactionModal;