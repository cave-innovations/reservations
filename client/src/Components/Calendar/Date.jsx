import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      available, date, handleDateClick, hoverDate, start, hovered, reserved,
    } = this.props;
    console.log(start, 'false');
    // console.log(date, available, hovered);
    return (
      <StyledDate
        start={start}
        hovered={hovered}
        available={available}
        reserved={reserved}
        onClick={(e) => handleDateClick(e.target.innerHTML)}
        onMouseOver={(e) => hoverDate(e.target.innerHTML)}
        onMouseOut={hoverDate}
      >
        {date}
      </StyledDate>
    );
  }
}

Date.propTypes = {
  available: PropTypes.number,
  date: PropTypes.number,
  handleDateClick: PropTypes.number,
  hoverDate: PropTypes.func,
  start: PropTypes.bool,
  hovered: PropTypes.bool,
  reserved: PropTypes.bool,
};

Date.defaultProps = {
  available: null,
  date: null,
  handleDateClick: null,
  hoverDate: null,
  start: null,
  hovered: null,
  reserved: null,
};

const StyledDate = styled.td`
  &:hover {
    background-color: ${(props) => (props.available && !props.hovered && !props.reserved && !props.start ? 'rgb(228, 231, 231)' : '')};
  }

  cursor: ${(props) => (props.available ? 'pointer' : '')};
  border: 1px solid rgb(228, 231, 231);
  border-collapse: collapse;
  width: 38px;
  height: 38px;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;

  font-family: "Helvetica Neue", sans-serif;
  font-weight: 700;
  line-height: 12px;
  font-size: 14px;
  color: ${(props) => (props.available ? 'rgb(72, 72, 72)' : 'rgb(228, 231, 231)')};
  color: ${(props) => (props.start || props.hovered || props.reserved ? 'white' : '')};
  background-color: ${(props) => (props.start ? 'rgb(0, 166, 153)' : '')};}
  border-color: ${(props) => (props.start ? 'rgb(0, 166, 153)' : '')};}
  border-color: ${(props) => (props.hovered ? 'rgb(128, 232, 224)' : '')};
  background-color: ${(props) => (props.hovered ? 'rgb(178, 241, 236)' : '')};
  text-decoration: ${(props) => (props.available || props.start ? 'default' : 'line-through')};
  border-color: ${(props) => (props.reserved ? 'rgb(0, 166, 153)' : '')};}
  background-color: ${(props) => (props.reserved ? 'rgb(0, 166, 153)' : '')};}
`;

export default Date;
