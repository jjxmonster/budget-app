import styled from 'styled-components'

export const TransactionWrapper = styled.div`
    flex:1;
    background:${({ theme }) => theme.colors.pink.normal};
    display:flex;
    flex-direction:column;
    border:solid 2px ${({ theme }) => theme.colors.pink.normal};
`

export const CategoryNameWrapper = styled.div`
    flex:1;
    display:flex;
    color:${({ theme }) => theme.colors.pink.light};
    letter-spacing:5px;
    text-transform:upperCase;
    font-size:2vh;
    justify-content:center;
    align-items:center;
`
export const TransactionInformationWrapper = styled.div`
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    display:flex;
    flex-direction:row;
    flex:6;
    background-color:${({ theme }) => theme.colors.gray.normal};
    font-size:2.5vh;
    flex-direction:column;
`
export const TransactionSubsection = styled.div` 
   display:flex;
   justify-content:space-between;
   align-items:center;
   padding:0 5% 0 5%;
   & p {
    color:${({ theme }) => theme.colors.pink.normal};
    font-weight:bold;
    font-size:1.4em;
}
`

export const TransactionAmount = styled.div`
    font-size:5vh;
`


