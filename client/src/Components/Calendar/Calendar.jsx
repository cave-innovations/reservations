import React from 'react';
import Date from './Date';

const numDaysArr = [31, 30, 31];
const startDayArr = [5, 0, 3];

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
    const { ready } = this.props;
    if (!(ready)) {
      return;
    }

    const { monthID, dates } = this.props;
    const { calendarArray } = this.state;
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
        row.push(<td key={calendarIndex + col} id={calendarIndex} className="blankBlocks" />);
      } else {
        // check if date is availble - add css accordingly
        row.push(
          <Date key={date + col} date={date} available={dates[date - 1].available} calendarIndex={calendarIndex} />,
        );
        date += 1;
      }
      // push row into calendar matrix when filled
      if (col === 6) {
        calendarArray.push(<tr key={rowInd} id={rowInd}>{row}</tr>);
      }
      calendarIndex += 1;
    }
    return calendarArray;
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
    const { calendarArray } = this.state;
    const { ready } = this.props;
    return (
      <div>
        <table>
          <tbody>
            {this.createCalendar.bind(this)()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
