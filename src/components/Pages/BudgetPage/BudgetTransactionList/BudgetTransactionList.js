import React, { useMemo } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {  groupBy } from 'lodash'

import { formatCurrency, formatDate } from 'themes'

import { List, ListItem } from './BudgetTransactionList.css'
import i18next from 'i18next';

import { selectTransaction } from 'data/actions/budget.actions.js'


const BudgetTransactionList = () => {

    const dispatch = useDispatch()

    const transactions = useSelector(store => store.budget.budget.transactions)
    const selectedParentCategoryId = useSelector(store => store.budget.selectedParentCategoryId)
    const allCategories = useSelector(store => store.common.allCategories)
    const budgetedCategories = useSelector(store => store.budget.budgetCategories)
    
    const filteredTransactionsBySelectedParentCategory = useMemo(
        () => {
        if( typeof selectedParentCategoryId === 'undefined'){
            return transactions
        }

        if(selectedParentCategoryId === null) {
            return transactions.filter(transaction =>{
                const hasBudgetedCategory = budgetedCategories
                    .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId)

                return !hasBudgetedCategory
            })
        }

            return transactions
            .filter(transaction =>{
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId)
                    const parentCategoryName = category.parentCategory.name

                    return parentCategoryName  === selectedParentCategoryId
                } catch (error) {
                    return false
                }
            })
        },[selectedParentCategoryId, transactions, allCategories, budgetedCategories])

    const groupedTransactions = useMemo(
        () => groupBy(
            filteredTransactionsBySelectedParentCategory,
            transaction => new Date(transaction.date).getUTCDate()
        ),[filteredTransactionsBySelectedParentCategory])
      
    
    return (  
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions])=>(
                <li key={key}>
                    <ul>
                        { transactions.map(transaction => (
                            <Link key={ transaction.id } to={`/budget/transactions/${transaction.id}`}>
                                <ListItem onClick={()=> dispatch(selectTransaction(transaction.id))} >
                                    <div>{transaction.description}</div>
                                    <div>{formatCurrency(transaction.amount, i18next.language)}</div>
                                    <div>{formatDate(transaction.date)}</div>
                                    <div>
                                        {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
                                    </div>
                                </ListItem>
                            </Link>
                        ))}
                    </ul>
                </li>
              
            ))}
        </List>
    );
}
 
export default BudgetTransactionList;