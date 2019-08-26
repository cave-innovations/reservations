import React from 'react';
import styled from 'styled-components';
import TopHeader from './TopHeader';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
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
      </StyledInfo>
    );
  }
}

const StyledInfo = styled.div`
  height: 422px;
  width: 326px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 24px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff
`;

export default Info;
