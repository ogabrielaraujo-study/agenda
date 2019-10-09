import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: #444;
  }

  /* scroll */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 0;
    border-left: 1px solid #f1f1f1;
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: none;
    background: #d8d8d8;
    border-radius: 0;
  }
`