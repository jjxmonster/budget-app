import React from 'react';

import { ParentCategory as Root} from './BudgetCategory.css'

const ParentCategory = ({name, onClick}) => {
    return ( 
        <Root onClick={onClick}>
            {name}
        </Root>
     );
}
 
export default ParentCategory;