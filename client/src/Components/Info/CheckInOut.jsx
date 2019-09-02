import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Calendar from '../Calendar/Calendar';

class CheckInOutt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      inOut: false,
      changeMonth: props.changeMonth.bind(this),
      startDate: null,
      startMonth: null,
      endDate: null,
      endMonth: null,
    };

    this.childRef = React.createRef();
    this.setState = this.setState.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.passProps = this.passProps.bind(this);
  }

  // pass start and end date up to info
  passProps(stateChanges) {
    const { startDate, endDate } = stateChanges;
    const { setState } = this.props;
    if (startDate) { setState({ startDate }); }
    if (endDate) { setState({ endDate }); }
    if (!startDate && !endDate) {
      setState({ startDate, endDate });
    }
    this.setState(stateChanges);
  }

  toggleCalendar(change, boo) {
    this.setState({ showCalendar: change, inOut: boo });
  }

  render() {
    const {
      dates, ready, monthID,
    } = this.props;
    const {
      inOut, showCalendar, changeMonth, startDate, startMonth, endDate, endMonth,
    } = this.state;

    let starterDate;
    let enderDate;
    if (startDate && startMonth) {
      if (startMonth < 10) {
        if (starterDate < 10) {
          starterDate = `0${startMonth}/0${startDate}/2019`;
        } else {
          starterDate = `0${startMonth}/${startDate}/2019`;
        }
      } else if (starterDate < 10) {
        starterDate = `${startMonth}/0${startDate}/2019`;
      } else {
        starterDate = `${startMonth}/${startDate}/2019`;
      }
    }
    if (endDate && endMonth) {
      if (endMonth < 10) {
        if (endDate < 10) {
          enderDate = `0${endMonth}/0${endDate}/2019`;
        } else {
          enderDate = `0${endMonth}/${endDate}/2019`;
        }
      } else if (endDate < 10) {
        enderDate = `${endMonth}/0${endDate}/2019`;
      } else {
        enderDate = `${endMonth}/${endDate}/2019`;
      }
    }

    return (
      <div>
        <CheckInOutContainer ref={this.childRef}>
          <TableRow>
            <TableCell>
              <CheckInOut>
                <Input type="text" placeholder="Check-in" onClick={() => this.toggleCalendar.bind(this)(true, true)} />
                <DivIn showCalendar={showCalendar} inOut={inOut}>{starterDate ? <text style={{ color: 'black' }}>{starterDate}</text> : 'Check-in'}</DivIn>
              </CheckInOut>
            </TableCell>
            <Arrow>
              <Svg viewBox="0 0 24 24" role="presentation" style={{ display: 'block' }}>
                <path
                  d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z"
                  fillRule="evenodd"
                  style={{
                    height: '24px', width: '24px', display: 'block', fill: 'currentcolor',
                  }}
                />
              </Svg>
            </Arrow>

            <TableCell>
              <CheckInOut>
                <Input type="text" placeholder="Check-in" onClick={() => this.toggleCalendar.bind(this)(true, false)} />
                <DivOut showCalendar={showCalendar} inOut={inOut}>{enderDate ? <text style={{ color: 'black' }}>{enderDate}</text> : 'Check-out'}</DivOut>
              </CheckInOut>
            </TableCell>
          </TableRow>
        </CheckInOutContainer>
        {showCalendar
          ? (
            <div>
              {!inOut
                ? (
                  <CalendarSvgOut>
                    <path d="M0,10 20,10 10,0z" style={{ fill: 'rgb(255, 255, 255)' }} />
                    <path d="M0,10 10,0 20,10" style={{ stroke: 'rgb(235, 235, 235)', fill: 'transparent' }} />
                  </CalendarSvgOut>
                )
                : (
                  <CalendarSvgIn>
                    <path d="M0,10 20,10 10,0z" style={{ fill: 'rgb(255, 255, 255)' }} />
                    <path d="M0,10 10,0 20,10" style={{ stroke: 'rgb(235, 235, 235)', fill: 'transparent' }} />
                  </CalendarSvgIn>
                )}

              <Calendar
                dates={dates}
                ready={ready}
                monthID={monthID}
                changeMonth={changeMonth}
                toggleCalendar={this.toggleCalendar}
                domRef={this.childRef}
                startDate={startDate}
                startMonth={startMonth}
                endDate={endDate}
                endMonth={endMonth}
                setState={this.passProps}
                inOut={inOut}
              />
            </div>
          )

          : null}
      </div>
    );
  }
}

CheckInOutt.propTypes = {
  dates: PropTypes.number,
  ready: PropTypes.bool,
  monthID: PropTypes.number,
};

CheckInOutt.defaultProps = {
  dates: null,
  ready: false,
  monthID: null,
};

const CalendarSvgIn = styled.svg`
  position: absolute;
  width: 20px;
  height: 10px;
  left: 55px;
  z-index: 2;
  top: 170px;
`;
const CalendarSvgOut = styled(CalendarSvgIn)`
  left: 230px;
`;

const Arrow = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: table-cell;
  width: 24px;
  vertical-align: middle;
`;

const Svg = styled.svg`
  fill: currentcolor;
  display: block;
  width: 24px;
`;

const CheckInOutContainer = styled.div`
  background-color: rgb(255, 255, 255);
  display: table;
  table-layout: fixed;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-image: initial;
  border-radius: 2px;
  animation: slide .7s ease-in;
`;

const TableCell = styled.div`
  display: table-cell;
  box-sizing: border-box;
`;
const TableRow = styled.div`
  display: table-row;
  box-sizing: border-box;
  z-index: 0;
`;

const CheckInOut = styled.div`
  box-sizing: border-box;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: rgb(117, 117, 117);
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  padding: 8px;
  background: rgb(255, 255, 255);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;
export const Input = styled.input`
  box-sizing: border-box;
  font-size: 16px;
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
`;
export const DivIn = styled.div`
  padding: 0px 6px;
  color: ${(props) => (!(props.showCalendar && props.inOut) ? 'rgb(117, 117, 117)' : 'rgb(0, 122, 135)')};
  overflow: hidden;
  background: ${(props) => (!(props.showCalendar && props.inOut) ? 'initial' : 'rgb(153, 237, 230)')};
  border-color: ${(props) => (!(props.showCalendar && props.inOut) ? 'initial' : 'rgb(153, 237, 230)')};
  border-radius: ${(props) => (!(props.showCalendar && props.inOut) ? 'initial' : '3px')};

`;

export const DivOut = styled.div`
  padding: 0px 6px;
  color: ${(props) => (!(props.showCalendar && !props.inOut) ? 'rgb(117, 117, 117)gs' : 'rgb(0, 122, 135)')};
  overflow: hidden;
  background: ${(props) => (!(props.showCalendar && !props.inOut) ? 'initial' : 'rgb(153, 237, 230)')};
  border-color: ${(props) => (!(props.showCalendar && !props.inOut) ? 'initial' : 'rgb(153, 237, 230)')};
  border-radius: ${(props) => (!(props.showCalendar && !props.inOut) ? 'initial' : '3px')};
`;
export default CheckInOutt;
