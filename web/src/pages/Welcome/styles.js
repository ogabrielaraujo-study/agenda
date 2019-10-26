import styled from 'styled-components'

export const Container = styled.div`
  background: #f8f9fa;
  height: 100%;

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    padding: 30px;
    margin: 0 auto;
  }

  .content {
    h1 {
      font-size: 56px;
      margin-bottom: 40px;
    }

    p {
      font-size: 16px;
      margin-bottom: 60px;
      line-height: 35px;
    }

    .buttons {
      display: flex;

      a,
      button {
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

        &:last-child {
          margin-right: 0;
        }

        svg {
          font-size: 30px;
          margin-right: 20px;
          color: #fff;
          transition: all 0.5s;
        }
      }
    }
  }

  .preview {
    margin-left: 70px;
  }

  @media (max-width: 1240px) {
    height: auto;
    min-height: 100%;

    .container {
      min-height: 100%;
      flex-direction: column;
      padding: 40px 20px;
      justify-content: initial;

      .content {
        text-align: center;
        order: 2;

        h1 {
          margin-bottom: 30px;
          font-size: 42px;
        }

        p {
          margin-bottom: 30px;
        }
      }

      .preview {
        order: 1;
        margin: 0;
        max-width: 450px;

        img {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .container {
      .content {
        br {
          display: none;
        }

        h1 {
          font-size: 37px;
        }

        .buttons {
          flex-direction: column;
          justify-content: center;
          align-items: center;

          a,
          button {
            text-align: center;
            justify-content: center;
            max-width: 300px;
            width: 100%;
            margin: 0 0 20px;
          }
        }
      }
    }
  }
`
