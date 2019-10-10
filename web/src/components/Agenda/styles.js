import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  height: calc(100vh - 20px);
  padding: 10px;

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

  /* .fc-axis {
    display: none !important;
  } */

  /* .fc-time-grid .fc-slats .fc-minor td,
  .fc-time-grid .fc-slats td {
    border-top: 1px solid #f1f1f1;
  } */

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

  @media (max-width: 990px) {
    .fc-toolbar {
      flex-wrap: wrap;
      justify-content: center;

      .fc-left {
        order: 2;
        margin-right: 20px;
        margin-top: 20px;
      }

      .fc-center {
        order: 1;
        width: 100%;
        text-align: center;

        h2 {
          font-weight: 400;
          font-size: 26px;
        }
      }

      .fc-right {
        order: 3;
        margin-top: 20px;
      }
    }
  }
`
