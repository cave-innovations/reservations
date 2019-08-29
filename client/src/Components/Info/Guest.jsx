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
      adultsDimL: true,
      childrenDimL: true,
      infantsDimL: true,
      adultsDimR: false,
      childrenDimR: false,
      setState: props.setState,
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
    let {
      adults, children, infants, numGuests, adultsDimL, childrenDimL, infantsDimL, adultsDimR, childrenDimR, setState,
    } = this.state;
    if (type === 'a') {
      if (adults > 1) {
        adults -= 1;
        numGuests -= 1;
        adultsDimR = false;
        childrenDimR = false;
        if (adults === 1) {
          adultsDimL = true;
        }
        setState({ numGuests });
        this.setState({
          adults, numGuests, adultsDimL, adultsDimR, childrenDimR,
        });
      }
    } else if (type === 'c') {
      if (children > 0) {
        children -= 1;
        numGuests -= 1;
        adultsDimR = false;
        childrenDimR = false;
        if (children === 0) {
          childrenDimL = true;
        }
        setState({ numGuests });
        this.setState({
          children, numGuests, childrenDimL, childrenDimR, adultsDimR,
        });
      }
    } else if (infants > 0) {
      infants -= 1;
      infantsDimL = false;
      if (infants === 0) {
        infantsDimL = true;
      }
      this.setState({
        infants, infantsDimL,
      });
    }
  }

  increment(type) {
    let {
      adults, children, infants, numGuests, adultsDimL, childrenDimL, adultsDimR, childrenDimR, infantsDimL, setState,
    } = this.state;
    const { maxGuests } = this.state;
    if (type === 'a') {
      if (numGuests < maxGuests) {
        adults += 1;
        numGuests += 1;
        adultsDimL = false;
        if (numGuests === maxGuests) {
          adultsDimR = true;
          childrenDimR = true;
        }
        setState({ numGuests });
        this.setState({
          adults, numGuests, adultsDimL, adultsDimR, childrenDimR,
        });
      }
    } else if (type === 'c') {
      if (numGuests < maxGuests) {
        children += 1;
        numGuests += 1;
        childrenDimL = false;
        if (numGuests === maxGuests) {
          adultsDimR = true;
          childrenDimR = true;
        }
        setState({ numGuests });
        this.setState({
          children, numGuests, childrenDimL, childrenDimR, adultsDimR,
        });
      }
    } else {
      infants += 1;
      infantsDimL = false;
      this.setState({
        infants, infantsDimL,
      });
    }
  }

  render() {
    const {
      numGuests, showDropDown, adults, children, infants, adultsDimL, childrenDimL, infantsDimL, adultsDimR, childrenDimR,
    } = this.state;
    return (
      <Container>
        <Guests onClick={this.showHandler} ref={this.refButton}>
          <TextDiv showDropDown={showDropDown}>
            {numGuests}
            {' '}
            {(numGuests - 1) ? 'guests' : 'guest'}
            {infants ? `, ${infants} infant${(infants - 1) ? 's' : ''}` : ''}
          </TextDiv>
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
                  <ButtonLeft dim={adultsDimL} onClick={() => this.decrement('a')}>-</ButtonLeft>
                  <Text>{adults}</Text>
                  <ButtonRight dim={adultsDimR} onClick={() => this.increment('a')}>+</ButtonRight>
                </ButtonContainer>
              </DropDown>
              <DropDown>
                <Text>Children</Text>
                <TextDescribe>Ages 2-12</TextDescribe>
                <ButtonContainer>
                  <ButtonLeft dim={childrenDimL} onClick={() => this.decrement('c')}>-</ButtonLeft>
                  <Text>{children}</Text>
                  <ButtonRight dim={childrenDimR} onClick={() => this.increment('c')}>+</ButtonRight>
                </ButtonContainer>
              </DropDown>
              <DropDown>
                <Text>Infants</Text>
                <TextDescribe>Under 2</TextDescribe>
                <ButtonContainer>
                  <ButtonLeft dim={infantsDimL} onClick={() => this.decrement('i')}>-</ButtonLeft>
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
  left: 195px;
  display: flex;
  justify-content: flex-end;
`;
export const ButtonLeft = styled.span`
  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  border-color: ${(props) => (props.dim ? 'rgba(0, 132, 137, 0.3)' : 'rgb(0, 132, 137)')};
  color: ${(props) => (props.dim ? 'rgba(0, 132, 137, 0.3)' : 'rgb(0, 132, 137)')};
  margin-right: 20px;
`;
export const ButtonRight = styled.span`
  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-style: solid;
  border-width: 1px;
  border-radius: 50%;
  border-color: ${(props) => (props.dim ? 'rgba(0, 132, 137, 0.3)' : 'rgb(0, 132, 137)')};
  color: ${(props) => (props.dim ? 'rgba(0, 132, 137, 0.3)' : 'rgb(0, 132, 137)')};
  margin-left: 20px;

`;
const Close = styled.div`
  position: relative;
  pointer: cursor;
  display: flex;
  justify-content: flex-end;
  &:hover{
    text-decoration: underline;
  }
  color: rgb(0, 132, 137);
  font-weight: 500;
`;
export const DropDownContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 326px;
  padding: 15px;
  padding-top: 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-radius: 2px;
  background: white;
  border-top-color: rgb(0, 132, 137);
  border-top-width: 2px;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px
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
const TextDiv = styled.span`
  padding: 5px 6px;
  background: ${(props) => (props.showDropDown ? 'rgb(153, 237, 230)' : 'initial')};
  color: ${(props) => (props.showDropDown ? 'rgb(0,122,135)' : 'initial')};
  border-radius: 3px;
`;
export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  width: 100%;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;
export default Guest;
