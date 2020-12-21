import styled from 'styled-components';

export const Container = styled.div`
    background-color:${({ theme }) => theme.colors.gray.light};
    display:flex;
    padding: ${({ theme }) => theme.spacing.sm}px 0;
    jusfify-content:space-between;
`;

export const List = styled.ul`
    display:flex;
    
`