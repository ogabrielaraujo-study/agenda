import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

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

  /* buttons */
  #root .btn, .modal .btn {
    background-color: transparent;
    font-size: 14px;

    &:hover,
    &:focus,
    &.active,
    &:active,
    &.disabled,
    &:disabled {
      box-shadow: none !important;
      color: #fff !important;
    }

    &.withIcon {
      padding-top: 5px;
      padding-bottom: 7px;
    }
  }

  .btn.btn-primary {
    color: #3d3dc9;
    border-color: #3d3dc9;

    &:hover,
    &:focus,
    &.active,
    &:active,
    &.disabled,
    &:disabled {
      background-color: #3d3dc9 !important;
      border-color: #3d3dc9 !important;
    }
  }

  .btn.btn-danger {
    color: #c82333;
  }

  button {
    outline: none !important;
  }
`
