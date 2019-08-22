import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesAvailable: new Array(31).fill(0),
      numDays: 31,
      startDay: 3,
      calendarArray: [],
    };
    const { datesAvailable } = this.state;
    for (let i = 0; i < 31; i += 3) {
      datesAvailable[i] = 1;
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.createCalendar.bind(this)();
  }

  // create calendar
  createCalendar() {
    const { calendarArray } = this.state;
    let startDay = 1;
    let date = 1;
    let calendarIndex = 0;

    // run loop until all of days of month are created and row is filled
    while (date < this.state.numDays || col !== 6) {
      var { rowInd, col } = this.calendarIndex2ColRowIndex(calendarIndex);
      // start new row every 7 blocks
      if (col === 0) {
        var row = [];
      }
      // make blank blocks until startDay
      if (startDay < this.state.startDay || date > this.state.numDays) {
        startDay++;
        row.push(<td key={calendarIndex} id={calendarIndex} className="blankBlocks" />);
      } else {
        // check if date is availble - add css accordingly
        var blockClass;
        var onClick;
        if (this.state.datesAvailable[date]) {
          blockClass = 'dateBlocks';
          onClick = (event) => this.dateClickHandler.bind(this)(event);
        } else {
          blockClass = 'blockBlocks';
          onClick = () => {};
        }
        row.push(<td key={calendarIndex} id={calendarIndex} className={blockClass}>
          <div className="dateText" onClick={onClick}>
  {date}
  {' '}
</div>

        </td>);
        date++;
      }
      // push row into calendar matrix when filled
      if (col === 6) {
        this.state.calendarArray.push(<tr key={rowInd} id={rowInd}>{row}</tr>);
      }
      calendarIndex++;
    }
    this.setState({ calendarArray });
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
