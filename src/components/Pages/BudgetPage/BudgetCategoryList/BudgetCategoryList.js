import React, {useRef, useMemo, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ToggleableList } from 'components'
import ParentCategory from './ParentCategory'
import CategoryItem from './CategoryItem'
import { selectParentCategory } from 'data/actions/budget.actions.js';

const BudgetCategoryList = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleClickParentCategoryRef = useRef(null)

    const budgetedCategories = useSelector(store => store.budget.budgetCategories);
    const allCategories = useSelector(store => store.common.allCategories);
    const budget = useSelector(store => store.budget.budget)    
  
    const budgetCategoriesByParent = useMemo(() => groupBy(
        budgetedCategories,
        item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    ),
    [budgetedCategories, allCategories])   

    const handleClearParentCategorySelect = useCallback(
        () => {
            dispatch(selectParentCategory())
            handleClickParentCategoryRef.current()
    }, [handleClickParentCategoryRef, dispatch])

    const handleSelectRestParentCategories = useCallback(
        () => {
            dispatch(selectParentCategory(null))
            handleClickParentCategoryRef.current()
    },[handleClickParentCategoryRef, dispatch])
    
    const listItems = useMemo(
        () => Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={ parentName }
                onClick={ () =>{
                     onClick(parentName)
                     dispatch(selectParentCategory(parentName))
                     }}
                categories={ categories }
                transactions={ budget.transactions }
            />
        ),
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)
            return (<CategoryItem
                key={ budgetedCategory.id }
                name={ name }
                item={ budgetedCategory }
                transactions={ budget.transactions }
            />
            )
        })
    })),
        [allCategories, budgetCategoriesByParent, budget.transactions, dispatch])


    const totalSpent = useMemo(
        () => budget.transactions
          .reduce((acc, transaction) => acc + transaction.amount, 0),
        [budget.transactions]
      );
      const restToSpent = useMemo(
        () => budget.totalAmount - totalSpent,
        [budget.totalAmount, totalSpent]
      );

    const amountTaken = useMemo(
        () => budgetedCategories.reduce((acc, budgetedCategory) => {
            const categoryTransactions = budget.transactions
                .filter(transaction => transaction.categoryId === budgetedCategory.id)
            const categoryExprenses = categoryTransactions
                .reduce((acc, transaction) => acc + transaction.amount, 0)
            
            return acc + Math.max(categoryExprenses, budgetedCategory.budget);
    }, 0), [ budget.transactions, budgetedCategories ])

    const notBudgetedTransaction = useMemo(
            () => budget.transactions
                .filter(transaction => !budgetedCategories
                    .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)),
            [budget.transactions, budgetedCategories])

    const notBudgetedExpenses = useMemo(
        () => notBudgetedTransaction
            .reduce((acc, transaction) => acc + transaction.amount, 0),
        [notBudgetedTransaction])

    const availableForRestCategories = useMemo(
        () => budget.totalAmount - amountTaken - notBudgetedExpenses,
        [budget.totalAmount,amountTaken, notBudgetedExpenses])
    
    return (

        <div>

            <div
                css={ `
                border-bottom:5px solid ${({ theme }) => theme.colors.gray.light}
                `}
            >
                <ParentCategory
                    name={ budget.name }
                    amount={ restToSpent }
                    onClick={handleClearParentCategorySelect}
                />
            </div>

            <ToggleableList
                items={ listItems }
                clickRef={handleClickParentCategoryRef}
            />

            <div
                css={ `
                border-top:5px solid ${({ theme }) => theme.colors.gray.light}
                `}
            >
                <ParentCategory
                    name={ t('Other Categories') }
                    amount={ availableForRestCategories }
                    onClick={handleSelectRestParentCategories}
                />
            </div>

        </div>
    );
}

export default BudgetCategoryList;