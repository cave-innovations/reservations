import React from 'react';

const numDaysArr = [31, 30, 31];
const startDayArr = [4, 7, 2];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarArray: [],
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
  }

  // create calendar
  createCalendar() {
    const { monthID } = this.props;
    const startDayMax = startDayArr[monthID];
    let startDay = 1;
    const numDays = numDaysArr[monthID];
    let date = 1;
    let calendarIndex = 0;
    let row;

    // run loop until all of days of month are created and row is filled
    while (date < numDays || col !== 6) {
      var { rowInd, col } = this.calendarIndex2ColRowIndex(calendarIndex);
      // start new row every 7 blocks
      if (col === 0) {
        row = [];
      }
      // make blank blocks until startDay
      if (startDay < startDayMax || date > numDays) {
        startDay += 1;
        row.push(<td key={calendarIndex} id={calendarIndex} className="blankBlocks" />);
      } else {
        // check if date is availble - add css accordingly
        let blockClass;
        let onClick;
        if (this.props.dates[date - 1].available) {
          blockClass = 'dateBlocks';
          onClick = (event) => this.dateClickHandler.bind(this)(event);
        } else {
          blockClass = 'blockBlocks';
          onClick = () => {};
        }
        row.push(
          <td key={calendarIndex} id={calendarIndex} className={blockClass}>
            <div className="dateText" onClick={onClick}>
              {date}
            </div>
          </td>,
        );
        date += 1;
      }
      // push row into calendar matrix when filled
      if (col === 6) {
        this.state.calendarArray.push(<tr key={rowInd} id={rowInd}>{row}</tr>);
      }
      calendarIndex += 1;
    }
  }

  calendarIndex2ColRowIndex(dateIndex) {
    const rowInd = Math.floor(dateIndex / 7);
    const col = dateIndex % 7;
    return { rowInd, col };
  }


  dateClickHandler(event) {
    console.log(event.target);
  }

  render() {
    if (this.props.ready) {
      this.createCalendar.bind(this)();
    }
    return (
      <div>
        <table>
          <tbody>
            {this.state.calendarArray}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
