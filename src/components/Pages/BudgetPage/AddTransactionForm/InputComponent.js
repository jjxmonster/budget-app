import React from 'react';

import { InputWrapper, InputLabel, SingleInput, SelectInput, ErrorSpan } from './AddTransactionForm.css'

const InputComponent = ({ input, meta, type, title, children }) => {
    
    if (type === "text" || type === "date" || type === "number") {
        return (
            <InputWrapper>
                <InputLabel>{ title }</InputLabel>
                <SingleInput  { ...input } type={ type } placeholder={ title } />
                { meta.error && meta.touched && <ErrorSpan>{ meta.error }</ErrorSpan> }
            </InputWrapper>
        )
    }
    else if (type === "select") {
        return (
            <InputWrapper>
                <InputLabel>{title}</InputLabel>
                <SelectInput { ...input }>
                    {children}
                </SelectInput>
                {meta.error && meta.touched && <ErrorSpan>{ meta.error }</ErrorSpan> }
            </InputWrapper>
        )
    }
   
}
 
export default InputComponent;