import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class TopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      reviews, stars, numGuests,
    } = this.props;
    let { pricing } = this.props;
    pricing *= numGuests;
    return (
      <StyledHeader>
        <Div>
          <Price>{`$${pricing}`}</Price>
          <PerNight>per night</PerNight>
        </Div>

        <div>
          <Stars>
            <FilledStars style={{ width: `${stars * 3}%` }}><Span>★★★★★</Span></FilledStars>
            <EmptyStars><Span>★★★★★</Span></EmptyStars>
          </Stars>
          <Reviews>
            {reviews}

          </Reviews>
        </div>

        {/* <DividerBar /> */}
      </StyledHeader>
    );
  }
}

TopHeader.propTypes = {
  pricing: PropTypes.number,
  reviews: PropTypes.number,
  numGuests: PropTypes.number,
  stars: PropTypes.number,
};

TopHeader.defaultProps = {
  pricing: null,
  reviews: null,
  numGuests: null,
  stars: null,
};

const StyledHeader = styled.div`

`;
const Div = styled.div`
  height: 28px;
  padding-bottom: 5px;
`;
const Span = styled.span`
display: inline-block;
`;
export const Price = styled.span`
  display: inline-block;
  font-size: 22px
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-weight: 800;
  line-height: 1.44444em;
  color: rgb(72, 72, 72)
`;

const PerNight = styled.span`
  margin-left:2px;
  display: inline-block;
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.33333em;
  color: rgb(72, 72, 72);
`;

export const Reviews = styled(PerNight)`
  position: relative;
  margin-left: 55px;
`;

export const Stars = styled.div`
  unicode-bidi: bidi-override;
  font-size: 10px;
  color: #c5c5c5;
  margin: 0 auto;
  position: relative;
  padding: 0;
`;

const FilledStars = styled.div`
  padding: 0;
  position: absolute;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  overflow: hidden;
  color:green;
`;

const EmptyStars = styled.div`
  padding: 0;
  position: absolute;
  z-index: 0;
  display: block;
`;

export default TopHeader;
