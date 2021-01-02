import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {groupBy} from 'lodash'

import {ToggleableList} from 'components'
import ParentCategory from './ParentCategory'
import CategoryItem from './CategoryItem'

const BudgetCategoryList = () => {

    const budgetedCategories = useSelector(store => store.budget.budgetCategories);
    const allCategories = useSelector(store => store.common.allCategories);


    const budgetCategoriesByParent = groupBy(
        budgetedCategories,
         item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
         )


    const listItems = Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({onClick})=>(
            <ParentCategory
                name={parentName}
                onClick={() => onClick(parentName)}
            />
        ),
        children: categories.map(budgetedCategory => {
            const {name} = allCategories.find(category => category.id === budgetedCategory.categoryId)
            return( <CategoryItem
                key={budgetedCategory.id}
                name={name}
            />
            )
        })
    }))
        
    
    return ( 
     
        <div>
            <ToggleableList
                items={listItems}
            />
        </div>
     );
}
 
export default BudgetCategoryList;