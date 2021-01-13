import {createGlobalStyle} from 'styled-components'
import {normalize} from 'styled-normalize'

export default createGlobalStyle`
  ${normalize}
  
  body{
    background-color:#2d2d2d;
    font-family: 'Open Sans', sans-serif;
  }
  ul{
    list-style:none;
    margin:0;
    padding:0;
    li+li{
      margin-left:${({theme})=>theme.spacing.xs}px;
    }
  }
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
`