import styled from 'styled-components'

export const Container = styled.div`
  background: #f8f9fa;
  height: 100%;

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    padding: 30px;
    margin: 0 auto;
  }

  h1 {
    font-size: 56px;
    margin-bottom: 30px;
  }

  a {
    display: inline-flex;
    border: 2px solid #3d3dc9;
    background: #3d3dc9;
    color: #fff;
    border-radius: 5px;
    margin-right: 30px;
    padding: 10px 22px;
    text-decoration: none;
    font-size: 16px;
    line-height: 30px;
    transition: all 0.5s;

    &:hover {
      color: #fff;
      text-decoration: none;
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    }
  }
`
