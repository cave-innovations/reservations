import React from 'react';
import styled from 'styled-components';

const Reserve = () => (
  <div>
    <Button>Reserve</Button>
    <SmallText>You won&#39;t be charged yet</SmallText>
  </div>
);

const Button = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items:center;
  justify-content: center;
  width: 326px;
  height: 46px;
  background: rgb(255, 90, 95);
  border-radius: 4px;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font: 11px;
  color: white;
  font-weight: 550;
  margin-top: 15px;
`;

const SmallText = styled.span`
  display: flex;
  align-items:center;
  justify-content: center;
  overflow-wrap: break-word;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: 550;
  line-height: 1.33333em;
  color: rgb(72, 72, 72);
  margin-top: 10px;
  margin-bottom: 25px;
`;

export default Reserve;
