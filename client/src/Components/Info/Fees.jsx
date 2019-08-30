import React from 'react';
import styled from 'styled-components';

const Fees = (props) => {
  const { pricing, numReservedDays } = props;

  return (
    <FeeContainer>
      <Fee>
$
        {pricing}
        {' '}
x
        {' '}
        {numReservedDays}
        {' '}
nights
        <Price>
$
          {pricing * numReservedDays}
        </Price>
      </Fee>
      <DividerBar />

      <Fee>
Cleaning fee
        <Price>
$25
        </Price>
      </Fee>
      <DividerBar />

      <Fee>
Service fee
        <Price>
$33
        </Price>
      </Fee>
      <DividerBar />


      <Fee>
        Occupancy taxes and fees
        <Price>
$36
        </Price>
      </Fee>
      <DividerBar />


      <Fee style={{ fontWeight: '600' }}>
Total
        <Price>
$33
        </Price>
      </Fee>
      <DividerBar />
    </FeeContainer>
  );
};

const FeeContainer = styled.div`
  display: inline-block;
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2857142857142858em;
  color: rgb(72, 72, 72);
  padding: 10px 0px;
  width: 100%;
`;


const Fee = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 7px 0px;
`;

const Price = styled.span`
  display: inline-block;
  float: right;
`;

export const DividerBar = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color:  #EBEBEB;
`;

export default Fees;
