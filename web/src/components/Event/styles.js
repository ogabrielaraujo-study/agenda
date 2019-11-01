import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  background: #fff;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 20px 15px;
  border-right: 1px solid #eee;
  left: ${props => (!props.show ? '-300px' : '0px')};
  transition: left ease 0.4s;

  .header {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;

    .closebtn,
    .removeBtn {
      border: none;
      background: transparent;
      padding: 5px;
    }

    .closebtn {
      margin-right: 10px;
    }

    .removeBtn {
      &:hover {
        color: red;
      }
    }

    h4 {
      font-size: 22px;
      margin-top: 2px;
      margin-bottom: 0;
      line-height: 35px;
      width: 100%;
    }
  }

  form,
  .form-group {
    width: 100%;
  }

  .save {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 19px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;

    svg {
      margin-right: 15px;
    }
  }
`

export const AnimateCheck = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 101;
  ${props => (props.status ? 'display: none' : 'display: flex')}
  align-items: center;
  justify-content: center;
`
