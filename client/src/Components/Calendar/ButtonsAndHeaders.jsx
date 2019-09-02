import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { monthID, changeMonth } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <ButtonDiv>
          <StyledButton onClick={() => changeMonth.bind(this)(-1)}>
            &#8592;
          </StyledButton>
          <StyledButton direction={1} onClick={() => changeMonth.bind(this)(1)}>
            &#8594;
          </StyledButton>
        </ButtonDiv>
        <Month><strong>{`${monthNames[monthID]} 2019`}</strong></Month>

        <List>
          {dayNames.map((day) => (<Day key={day}><small>{day}</small></Day>))}
        </List>
      </div>
    );
  }
}

const List = styled.ul`
  padding-left: 0px;
  padding-right: 0px;
  margin: 1px 0px;
  font-size: 14px;
  list-style: none;
  color: rgb(117, 117, 117);
  // position: absolute;
`;

const Day = styled.li`
  font-family: "Helvetica Neue", sans-serif;
  display: inline-block;
  width: 41px;
  text-align: center;
`;

export const Month = styled.div`
  width:100%;
  color: rgb(72, 72, 72);
  font-size: 18px;
  text-align: center;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  padding-top: 22px;
  padding-bottom: 17px;
  display: inline-block;
`;

const ButtonDiv = styled.div`
  position: absolute
  width: 100%;
  padding: 0px 20px;
  padding-top: 20px;
  box-sizing: border-box;
`;

export const StyledButton = styled.button`
  cursor: pointer;
  user-select: none;
  background-color: rgb(255, 255, 255);
  color: rgb(117, 117, 117);
  line-height: 0.78;
  margin: 0px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(228, 231, 231);
  border-image: initial;
  border-radius: 3px;
  padding: 10px 10px;
  display: inline-block;
  float: ${(props) => (!props.direction ? 'left' : 'right')};
`;

Button.propTypes = {
  monthID: PropTypes.number,
  changeMonth: PropTypes.func,
};

Button.defaultProps = {
  monthID: null,
  changeMonth: null,
};

export default Button;
