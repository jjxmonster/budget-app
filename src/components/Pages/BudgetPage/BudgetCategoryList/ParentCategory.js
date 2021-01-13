import React, { useMemo } from 'react';
import i18n from "i18next";

import { ParentCategory as Root, CategoryAmount} from './BudgetCategory.css'
import { formatCurrency } from 'themes'



const ParentCategory = ({name, onClick, categories, transactions, amount}) => {
   
    const categoryLeftValue = useMemo(() => {

        if(!!amount) return null;

        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) =>  acc + category.budget, 0)
            } catch (error) {
                return null
            }
        })()
        
        const parentCategoryTransactions = transactions
            .filter(transaction => {
                return categories.find(category => category.categoryId === transaction.categoryId)
            })
            
        const spentOnParentCategory = parentCategoryTransactions
        .reduce((acc, transactions) => acc + transactions.amount, 0)

        const totalLeft = budgeted
        ? budgeted - spentOnParentCategory
        : null;
        
        return totalLeft
    },[categories, transactions, amount])

    const amountValue = useMemo(
        ()=> amount || categoryLeftValue,
        [amount, categoryLeftValue]
        )

    return ( 
        <Root onClick={onClick}>
          <span>{name}</span>
          <CategoryAmount negative={categoryLeftValue < 0}>
            {formatCurrency(amountValue.toFixed(2), i18n.language)}
          </CategoryAmount>
        </Root>
     );
}
 
export default ParentCategory;