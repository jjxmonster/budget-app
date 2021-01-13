import styled from 'styled-components'

export const HomePageWrapper = styled.div`
    width:100%;
    height:85vh;
    display:flex;
    flex-direction:column;
`

export const Title = styled.div`
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:3em;
    color:${({ theme }) => theme.colors.pink.normal};
`
export const ImageWrapper = styled.div`
    flex:5;
    display:flex;
    justify-content:center;
`