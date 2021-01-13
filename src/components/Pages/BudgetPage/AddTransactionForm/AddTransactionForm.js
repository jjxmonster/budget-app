import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form'
import { groupBy, noop } from 'lodash'

import InputComponent from './InputComponent'
import { FormTitle } from './AddTransactionForm.css'


const required = value => (value ? undefined : 'Required')


const AddTransactionForm = ({ onSubmit = noop, categories, groupCategoriesBy }) => {

  const groupedCategoriesByParentName = groupCategoriesBy
    ? groupBy(categories, groupCategoriesBy)
    : null

  const CategoryItems = useMemo(
    () => groupedCategoriesByParentName 
      ? Object.entries(groupedCategoriesByParentName)
        .map(([parentName, categories]) => (
          <optgroup key={parentName} label={ parentName }>
            {categories.map(category => (
              <option value={category.id} key={category.name}>{ category.name }</option>
            ))}
            </optgroup>
        ))
      : categories.map(category => (
          <option key={category.id} value={category.id} >{ category.name }</option>
       ))
    , [groupedCategoriesByParentName, categories])
 
    return ( 
        <Form
          onSubmit={onSubmit}
          render={ ({ handleSubmit, form, submitting, pristine, values }) => (
            <form style={ { width: "100%" } } onSubmit={ handleSubmit }>
              <FormTitle>ADD NEW TRANSACTION</FormTitle>
                <Field name="description" validate={ required }>
                  { ({ input, meta }) => (
                      <InputComponent
                          input={input}
                          meta={meta}
                          type={'text'}
                          title={'Description'}
                      />
                  ) }
                </Field>
                <Field name="amount" validate={ required } parse={ value => parseFloat(value, 10) }>
                  { ({ input, meta }) => (
                      <InputComponent
                        input={input}
                        meta={meta}
                        type={'number'}
                        title={'Amount'}
                      />
                  ) }
                </Field>
                <Field name="categoryId" validate={ required }>
                  { ({ input, meta }) => (
                        <InputComponent
                          input={input}
                          meta={meta}
                          type={'select'}
                          title={ 'Category'}
                          children={CategoryItems}
                      />
                    ) }
                </Field>
                <Field name="date" validate={ required }>
                  { ({ input, meta }) => (
                      <InputComponent
                        input={input}
                        meta={meta}
                        type={'date'}
                        title={'Date'}
                    />
                  ) }
              </Field>
          
              <div className="buttons">
                <button type="submit" disabled={ submitting }>
                  Submit
              </button>
                <button
                  type="button"
                  onClick={ form.reset }
                  disabled={ submitting || pristine }
                >
                  Reset
              </button>
              </div>
            </form>
          )
        }
      />
     );
}
 
export default AddTransactionForm;