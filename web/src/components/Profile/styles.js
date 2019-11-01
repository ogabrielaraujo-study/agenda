import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 20px 15px;
  border-right: 1px solid #eee;

  img {
    border-radius: 50%;
    width: 100%;
    height: auto;
    max-width: 70px;
  }

  h3 {
    font-size: 24px;
    margin: 20px 0 10px;
  }

  strong {
    font-size: 14px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .logout {
    margin-top: auto;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 19px;
    padding-left: 20px;
    padding-right: 20px;

    svg {
      margin-right: 15px;
    }
  }
`
