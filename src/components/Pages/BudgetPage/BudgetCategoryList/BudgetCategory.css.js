import styled from 'styled-components';

export const Category = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray.normal};
    padding: ${({ theme }) => theme.spacing.sm}px;
    display: flex;
    justify-content: space-between;
`

export const ParentCategory = styled(Category)`
    color:${({ theme }) => theme.colors.pink.normal};
    background-color: ${({ theme }) => theme.colors.gray.dark};
`

export const CategoryItem = styled(Category)`
    color:${({ theme }) => theme.colors.red.normal};
    background-color: ${({ theme }) => theme.colors.gray.dark}
`

export const CategoryAmount = styled.span`
    font-weight: 700;
    color: ${({theme, negative}) => negative ? theme.colors.red.normal : theme.colors.green.normal};
`