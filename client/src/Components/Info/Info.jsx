import React from 'react';
import styled from 'styled-components';
import TopHeader from './TopHeader';
import CheckInOut from './CheckInOut';
import Guest from './Guest';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeMonth: props.changeMonth.bind(this),
    };
  }

  render() {
    const {
      dates, ready, monthID, changeMonth,
    } = this.props;
    const { listing } = this.props;
    if (!listing.length) {
      return null;
    }
    const {
      reviews, pricing, stars, views, maxGuests,
    } = listing[0];
    return (
      <StyledInfo>
        <TopHeader reviews={reviews} pricing={pricing} stars={stars} />
        <Text>Dates</Text>
        <CheckInOut dates={dates} ready={ready} monthID={monthID} changeMonth={changeMonth} />

        <GuestWrap>

          <Text>Guests</Text>
          <Guest maxGuests={maxGuests} />
        </GuestWrap>
      </StyledInfo>
    );
  }
}
export const StyledInfo = styled.div`
  height: 422px;
  width: 326px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 24px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff
`;

const Text = styled.span`
  margin-left:2px;
  display: inline-block;
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.33333em;
  color: rgb(72, 72, 72);
`;

const GuestWrap = styled.div`
  padding-top: 15px;
`;
export default Info;
