import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  height: calc(100vh - 20px);
  padding: 10px;

  .btn {
    background-color: transparent;
    color: #3d3dc9;
    border-color: #3d3dc9;
    font-size: 14px;

    &:hover,
    &:focus,
    &.active,
    &:active,
    &.disabled,
    &:disabled {
      box-shadow: none !important;
      background-color: #3d3dc9 !important;
      border-color: #3d3dc9 !important;
      color: #fff !important;
    }
  }

  /* altura da linha */
  .fc-time-grid .fc-slats td {
    height: 4em;
  }

  .fc-today {
    background: #fff !important;
    border: none !important;
    border-top: 1px solid #ddd !important;
    font-weight: bold;
  }

  .fc-bootstrap .fc-event {
    box-shadow: 0px 5px 15px rgba(69, 69, 69, 0.15);
    padding: 4px;
    border: 1px solid #fff;
    border-radius: 6px;
    font-size: 14px;
  }

  .fc-axis {
    display: none !important;
  }

  .fc-time-grid .fc-slats .fc-minor td,
  .fc-time-grid .fc-slats td {
    border-top: 1px solid #f1f1f1;
  }

  .table-bordered td,
  .table-bordered th {
    border: 1px solid #f1f1f1;
  }

  .fc-event {
    background-color: #3d3dc9 !important;

    &.fc-allow-mouse-resize {
      .fc-resizer {
        height: 14px;
        bottom: -9px;

        &:after {
          content: '';
          background: #fff;
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 auto;
          border: 1px solid #ccc;
        }
      }
    }
  }
`
