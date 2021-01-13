import styled from 'styled-components';
import Wrapper from '../Wrapper'

export const Container = styled.div`
    background-color:${({ theme }) => theme.colors.gray.dark};
    border-bottom:solid 2px ${({ theme }) => theme.colors.pink.normal};
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
    display:flex;
    padding: ${({ theme }) => theme.spacing.sm}px 0;
    jusfify-content:space-between;
`;

export const NavigationWrapper = styled(Wrapper)`
    display:flex;
    justify-content:space-between
`
export const List = styled.ul`
    display:flex;
    
`