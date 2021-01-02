import React from 'react';

import {CategoryItem as Root} from './BudgetCategory.css'

const CategoryItem = ({name}) => {
    return (  
        <Root>
            {name}
        </Root>
    );
}
 
export default CategoryItem;