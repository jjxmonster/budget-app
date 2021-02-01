import styled from 'styled-components';

export const List = styled.ul`
   > li + li {
      margin-top: ${({ theme }) => theme.spacing.sm}px;
   }

   li {
      margin: 0;
   }
`;

export const ListItem = styled.li`
   border: 1px solid ${({ theme }) => theme.colors.gray.normal};
   padding: ${({ theme }) => theme.spacing.sm}px;
   display: flex;
   color: #de63ab;
   > a {
      text-decoration: none;
   }
   > *:nth-child(1) {
      flex: 8;
      display: flex;
      justify-content: space-between;
      color: #de63ab;
      > *:nth-child(1) {
         flex: 2;
      }
      > *:nth-child(2) {
         flex: 1;
      }
      > *:nth-child(3) {
         flex: 1;
      }
      > *nth-child(4) {
         flex: 1;
      }
   }

   > *:nth-child(2) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
   }
`;
