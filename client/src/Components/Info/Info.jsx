import React from 'react';
import styled from 'styled-components';
import TopHeader from './TopHeader';
import CheckInOut from './CheckInOut';
import Guest from './Guest';
import Reserve from './Reserve';
import Fees from './Fees';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeMonth: props.changeMonth.bind(this),
      numGuests: 1,
      startDate: null,
      endDate: null,
    };
    this.setState = this.setState.bind(this);
  }

  render() {
    const {
      dates, ready, monthID, changeMonth,
    } = this.props;
    const { listing } = this.props;
    const { numGuests, startDate, endDate } = this.state;
    let numReservedDays;
    if (endDate && startDate) {
      numReservedDays = endDate - startDate;
    }
    if (!listing.length) {
      return null;
    }
    const {
      reviews, pricing, stars, views, maxGuests,
    } = listing[0];
    return (
      <StyledInfo>
        <TopHeader reviews={reviews} pricing={pricing} stars={stars} numGuests={numGuests} />

        <DividerBar />

        <Text>Dates</Text>
        <CheckInOut dates={dates} ready={ready} monthID={monthID} changeMonth={changeMonth} setState={this.setState} />

        <GuestWrap>
          <Text>Guests</Text>
          <Guest maxGuests={maxGuests} setState={this.setState} />
        </GuestWrap>
        {numReservedDays
          ? <Fees pricing={pricing} numReservedDays={numReservedDays} /> : null}
        <Reserve />


        <DividerBar />

      </StyledInfo>
    );
  }
}

export const StyledInfo = styled.div`
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

export const DividerBar = styled.div`
  margin-top: 17px;
  margin-bottom: 17px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color:  #EBEBEB;
`;
export default Info;
