import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

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
    font-family: 'Nunito', sans-serif;
    color: #444;
  }

  button {
    outline: none !important;
    cursor: pointer;
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
    font-size: 14px;
    box-shadow: none !important;

    &.withIcon {
      padding-top: 5px;
      padding-bottom: 7px;
    }
  }

  /* toastify */
  #root .Toastify__toast {
    border-radius: 10px;
    font: 14px 'Nunito', sans-serif;
    padding: 10px 15px;
    box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.4);

    &.Toastify__toast--success {
      background: #0b9c37;
    }

    &.Toastify__toast--error {
      background: #ee3f3f;
    }
  }

  /* color picker */
  .colorPicker .twitter-picker > div:nth-child(1n+3) > div:nth-last-child(3),
  .colorPicker .twitter-picker > div:nth-child(1n+3) > div > input {
    display: none !important;
  }
`
