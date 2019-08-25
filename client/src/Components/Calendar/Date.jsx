import React from 'react';
import styled from 'styled-components';


class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onClick(e) {
    const { available } = this.props;
    const value = e.target.innerHTML;
    if (available) {
      console.log(value);
    }
  }

  render() {
    const {
      available, date, calendarIndex, blockClass,
    } = this.props;

    return (
      <StyledDate available={available} onClick={(e) => this.onClick.bind(this)(e)}>
        {date}
      </StyledDate>
    );
  }
}

const StyledDate = styled.td`
  &:hover {
    background-color: ${(props) => (props.available ? 'rgb(228, 231, 231)' : '')};
  }

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
  text-decoration: ${(props) => (props.available ? 'default' : 'line-through')};
`;

export default Date;
