import styled  from 'styled-components'

export const InputWrapper = styled.div`
    widht:100%;
    height:20%;
    display:flex;
    flex-direction:column;
    `

export const InputLabel = styled.label`
    width:100%;
`

export const SelectInput = styled.select`
    background-color:${({ theme }) => theme.colors.gray.dark};
    color: ${({ theme }) => theme.colors.gray.light};
    height:50%;
    padding:2%;
`

export const SingleInput = styled.input`
   background-color:${({ theme }) => theme.colors.gray.dark};
   color: ${({ theme }) => theme.colors.gray.light};
   height:50%;
   padding:2%;
`

export const ErrorSpan = styled.span`
    flex:1;
    color:red;
`

export const FormTitle = styled.h2`
    font-size:3vh;
    color: ${({ theme }) => theme.colors.pink.normal}
`