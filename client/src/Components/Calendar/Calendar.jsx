import React from 'react';
import styled from 'styled-components';
import Date from './Date';
import ButtonsAndHeaders from './ButtonsAndHeaders';

const numDaysArr = [31, 30, 31, 30, 31];
const startDayArr = [5, 0, 3, 5, 0];
// number of days you can reserve

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarArray: [],
      monthID: props.monthID,
      changeMonth: props.changeMonth.bind(this),
      slideRight: false,
      hoveredDate: null,
      nextMonthNumDatesReserve: 0,
      clearDates: false,
    };
    this.calendar = React.createRef();
    this.setState = this.setState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.slideHandler = this.slideHandler.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.hoverDate = this.hoverDate.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick, false);
  }

  slideHandler(direction) {
    const { changeMonth, slideRight } = this.state;
    changeMonth(direction);
    if (direction === 1) {
      this.setState({ slideRight: true });
    }
  }

  handleDateClick(date) {
    const { monthID, setState } = this.props;
    setState({ startDate: date, startMonth: monthID });
    this.setState({ clearDates: true });
  }

  clearDates() {
    const { setState } = this.props;
    setState({
      startDate: null, startMonth: null, endDate: null, endMonth: null,
    });
    this.setState({
      nextMonthNumDatesReserve: 0, clearDates: false,
    });
  }

  hoverDate(date) {
    let datee = date;
    if (datee === undefined) {
      datee = 0;
    }
    this.setState({ hoveredDate: datee });
  }

  handleClick(e) {
    if (this.calendar.current.contains(e.target) || this.props.domRef.current.contains(e.target) || e.target.innerHTML === 'Clear dates') {
      // click is within target, do nothing
      return;
    }
    const { toggleCalendar } = this.props;
    toggleCalendar(false, null);
  }

  // create calendar
  createCalendar() {
    const {
      startDate, endDate, startMonth, endMonth, ready, monthID, dates,
    } = this.props;
    const {
      hoveredDate, nextMonthNumDatesReserve,
    } = this.state;
    let numDatesReserve = 4;
    if (startMonth + 1 === monthID) {
      numDatesReserve = nextMonthNumDatesReserve;
    }
    if (!(ready)) {
      return;
    }

    const calendarArray = [];
    const startDayMax = startDayArr[monthID];
    let startDay = 1;
    const numDays = numDaysArr[monthID];
    let date = 1;
    let calendarIndex = 0;
    let row;


    // run loop until all of days of month are created and row is filled
    while (date < numDays || col !== 6) {
      let available = false;
      let start = false;
      let reservable = false;
      let hovered = false;
      let hoverDate = () => (1);
      let handleDateClick = () => (1);
      var { rowInd, col } = calendarIndex2ColRowIndex(calendarIndex);
      // start new row every 7 blocks
      if (col === 0) {
        row = [];
      }
      // make blank blocks until startDay
      if (startDay < startDayMax || date > numDays) {
        startDay += 1;
        row.push(<td key={calendarIndex + col} id={calendarIndex} className="blankBlocks" />);
      } else {
        // if reservation start date hasn't been picked, populate calendar normally
        if (!startDate) {
          available = dates[date - 1].available;
          handleDateClick = (available ? this.handleDateClick : handleDateClick);
        } else if (startMonth === monthID) {
          if (date === Number(startDate)) {
            start = true;
          }
          if (date > startDate) {
            if (numDatesReserve > 0) {
              if (dates[date - 2].available) {
                hoverDate = this.hoverDate;
                handleDateClick = this.handleDateClick;
                available = true;
                reservable = true;
                numDatesReserve -= 1;
                if (date <= hoveredDate) {
                  hovered = true;
                }
              } else {
                numDatesReserve = 0;
              }
            }
          }
          this.state.nextMonthNumDatesReserve = numDatesReserve;
        } else if (startMonth + 1 === monthID) {
          if (numDatesReserve > 0) {
            if (date === 1) {
              hoverDate = this.hoverDate;
              handleDateClick = this.handleDateClick;
              available = true;
              reservable = true;
              if (date <= hoveredDate) {
                hovered = true;
              }
            }
            if (dates[date - 1].available) {
              hoverDate = this.hoverDate;
              handleDateClick = this.handleDateClick;
              available = true;
              numDatesReserve -= 1;
              if (date <= hoveredDate) {
                hovered = true;
              }
            } else {
              numDatesReserve = 0;
            }
          }
        }

        row.push(<Date key={date + col} date={date} available={available} handleDateClick={handleDateClick} start={start} reservable={reservable} hovered={hovered} hoverDate={hoverDate} />);
        date += 1;
      }
      // push row into calendar matrix when filled
      if (col === 6) {
        calendarArray.push(<tr key={rowInd} id={rowInd}>{row}</tr>);
      }
      calendarIndex += 1;
    }
    this.state.calendarArray = calendarArray;
    this.state.monthID = monthID;
  }

  render() {
    this.createCalendar();
    const { startDate } = this.props;
    if (startDate) {
      this.state.clearDates = true;
    }
    const {
      monthID, calendarArray, slideRight, clearDates,
    } = this.state;

    return (
      <CalendarWrapper clearDates={clearDates} ref={this.calendar} slideRight={slideRight}>
        <ButtonsAndHeaders monthID={monthID} changeMonth={this.slideHandler} />
        <Table>
          <tbody>
            {calendarArray}
          </tbody>
        </Table>

        {clearDates ? <Close onClick={this.clearDates}>Clear dates</Close> : ''}
      </CalendarWrapper>
    );
  }
}
const CalendarWrapper = styled.div`
  position: absolute;
  border-radius: 3px;
  top: 179px;
  width: 332px;
  height: ${(props) => (props.clearDates ? '354px' : '308px')};
  text-align:center;
  border: 1px solid #e4e4e4;
  z-index: 1;
  background: white;
  overflow:hidden;
  // box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  // transform: ${(props) => (props.slideRight ? 'translateX(-314px)' : 'translateX(0)')};
  // transition: ${(props) => (props.slideRight ? 'transform 200ms ease-in-out 0s' : '')};
`;

const Table = styled.table`
  display: inline-block;

  transition: transform 0.25s;

  ${CalendarWrapper}:onclick & {
    transform: translate(-100%); /* Standard syntax */
  }
`;

const Close = styled.div`
  position: relative;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  pointer: cursor;
  display: flex;
  justify-content: flex-end;
  &:hover{
    text-decoration: underline;
  }
  color: rgb(0, 132, 137);
  font-weight: 500;
  font-size: 14px;
  padding: 20px 25px;
  z-index:0;
`;

const calendarIndex2ColRowIndex = (dateIndex) => {
  const rowInd = Math.floor(dateIndex / 7);
  const col = dateIndex % 7;
  return { rowInd, col };
};

export default Calendar;
