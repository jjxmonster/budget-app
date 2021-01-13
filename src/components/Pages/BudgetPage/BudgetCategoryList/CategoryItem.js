import React from 'react';
import i18n from "i18next";

import {CategoryItem as Root, CategoryAmount} from './BudgetCategory.css'
import { formatCurrency } from 'themes'


const CategoryItem = ({name, item, transactions}) => {
    const categoryTransactions = transactions
        .filter(transaction => transaction.categoryId === item.id)

    const spentOnCategory = categoryTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalLeft = item.budget - spentOnCategory 

    return (  
        <Root>
           <span>{name}</span> 
           <CategoryAmount negative={totalLeft < 0}>
              {formatCurrency(totalLeft.toFixed(2), i18n.language)}
          </CategoryAmount>
        </Root>
    );
}
 
export default CategoryItem;