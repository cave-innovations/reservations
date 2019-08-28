import React from 'react';
import styled from 'styled-components';

class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numGuests: 1,
      maxGuests: props.maxGuests,
      showDropDown: false,
      adults: 1,
      children: 0,
      infants: 0,
      adultsDim: false,
      childrenDim: false,
      infantsDim: false,
    };
    this.ref = React.createRef();
    this.refButton = React.createRef();
    this.setState = this.setState.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.showHandler = this.showHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.dropHandler, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.dropHandler, false);
  }

  dropHandler(e) {
    if (e.target.innerHTML !== 'Close' && (this.refButton.current.contains(e.target) || (this.ref.current && this.ref.current.contains(e.target)))) {
      // click is within target, do nothing
      return;
    }
    this.setState({ showDropDown: false });
  }

  showHandler() {
    const { showDropDown } = this.state;
    this.setState({ showDropDown: !showDropDown });
  }

  decrement(type) {
    const {
      adults, children, infants, numGuests, adultsDim, childrenDim, infantsDim,
    } = this.state;
    if (type === 'a') {
      if (adults > 1) {
        this.setState({ adults: adults - 1, numGuests: numGuests - 1 });
      } else {
        this.setState({ adultsDim: true });
      }
    } else if (type === 'c') {
      if (children >= 1) {
        this.setState({ children: children - 1, numGuests: numGuests - 1 });
      } else {
        this.setState({ childrenDim: true });
      }
    } else if (infants >= 1) {
      this.setState({ infants: infants - 1 });
    } else {
      this.setState({ infantsDim: true });
    }
  }

  increment(type) {
    const {
      adults, children, infants, numGuests, maxGuests, adultsDim, childrenDim, infantsDim,
    } = this.state;
    if (type === 'a') {
      if (numGuests < maxGuests) {
        this.setState({ adults: adults + 1, numGuests: numGuests + 1 });
      } else {
        this.setState({ adultsDim: true });
      }
    } else if (type === 'c') {
      if (numGuests < maxGuests) {
        this.setState({ children: children + 1, numGuests: numGuests + 1 });
      } else {
        this.setState({ childrenDim: true });
      }
    } else if (numGuests <= maxGuests) {
      this.setState({ infants: infants + 1 });
    } else {
      this.setState({ infantsDim: true });
    }
  }

  render() {
    const {
      numGuests, showDropDown, adults, children, infants,
    } = this.state;
    return (
      <Container>
        <Guests onClick={this.showHandler} ref={this.refButton}>
          {numGuests}
          {' '}
          {(numGuests - 1) ? 'guests' : 'guest'}
          <DownArrow>
            {showDropDown ? <path d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z" fillRule="evenodd" />
              : <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" /> }
          </DownArrow>
        </Guests>
        {showDropDown
          ? (
            <DropDownContainer ref={this.ref}>
              <DropDown>
                <Text>Adult</Text>
                <ButtonContainer>
                  <ButtonLeft onClick={() => this.decrement('a')}>-</ButtonLeft>
                  <Text>{adults}</Text>
                  <ButtonRight onClick={() => this.increment('a')}>+</ButtonRight>
                </ButtonContainer>
              </DropDown>
              <DropDown>
                <Text>Children</Text>
                <TextDescribe>Ages 2-12</TextDescribe>
                <ButtonContainer>
                  <ButtonLeft onClick={() => this.decrement('c')}>-</ButtonLeft>
                  <Text>{children}</Text>
                  <ButtonRight onClick={() => this.increment('c')}>+</ButtonRight>
                </ButtonContainer>
              </DropDown>
              <DropDown>
                <Text>Infants</Text>
                <TextDescribe>Under 2</TextDescribe>
                <ButtonContainer>
                  <ButtonLeft onClick={() => this.decrement('i')}>-</ButtonLeft>
                  <Text>{infants}</Text>
                  <ButtonRight onClick={() => this.increment('i')}><Test>+</Test></ButtonRight>
                </ButtonContainer>
              </DropDown>

              <DropDown>
                <TextDescribe>2 guests maximum. Infants don’t count toward the number of guests.</TextDescribe>
              </DropDown>
              <Close>Close</Close>
            </DropDownContainer>
          ) : null}
      </Container>
    );
  }
}
const Test = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100%;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 230px;
  display: flex;
  justify-content: flex-end;
`;
export const ButtonLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  border-color: rgb(0, 132, 137);
  color: rgb(0, 132, 137);
  margin-right: 20px;
`;
export const ButtonRight = styled.div`
display: flex;
justify-content: center;
align-items:center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  border-color: rgb(0, 132, 137);
  color: rgb(0, 132, 137);
  margin-left: 20px;

`;
const Close = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  &:hover{
    text-decoration: underline;
  }
`;
export const DropDownContainer = styled.div`
  padding: 15px;
  padding-top: 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-radius: 2px;
`;

const Text = styled.div`
  justify-content: center;
  flex-direction: column;
  display: flex;
  word-wrap: break-word;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.375em;
  color: #484848;
  margin: 0;
`;
const TextDescribe = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2857142857142858em;
  color: #484848
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 65px;
`;

const DownArrow = styled.svg`
  display: inline-block;
  viewBox: 0 0 18 18;
  height: 18px;
  width: 18px;
  float: right;
  padding-top: 3px;
  padding-right: 5px;
`;

export const Guests = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  position: relative;
  width: 100%;
  padding: 8px;
  padding-left: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-radius: 2px;
`;

export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  width: 100%;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;
export default Guest;
