import styled from 'styled-components'

export const Container = styled.div`
  height: calc(100% - 230px);
  padding-top: 20px;
  padding-bottom: 20px;

  .colorName:focus {
    box-shadow: none;
    border-left: 1px solid #ced4da;
    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-right: 1px solid #6c757d;
  }

  .colorPicker {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 99;
  }
`

export const TagList = styled.ul`
  list-style: none;
  text-align: left;
  width: 100%;
  padding-left: 0;
  overflow: auto;
  margin-bottom: 0;
  max-height: calc(100% - 50px);

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 0;
    border-left: 0;
    background: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: none;
    background: #ccc;
    border-radius: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 5px;
    margin-bottom: 5px;

    .name {
      width: calc(100% - 50px);
      padding-left: 20px;
      cursor: default;
    }

    button {
      border: 0;
      margin-left: 20px;
      background: transparent;
      color: #444;
      opacity: 0;
      padding: 5px;

      &:hover {
        color: red;
      }
    }

    &:hover {
      button {
        opacity: 1;
      }
    }
  }
`

export const InputColorPicker = styled.input`
  width: 40px;
  cursor: pointer;
  background-color: ${props => props.background};
  border: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`

export const Color = styled.div`
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
`
