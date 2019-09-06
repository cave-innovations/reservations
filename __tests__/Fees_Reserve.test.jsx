/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Fees, { FeeContainer } from '../client/src/Components/Info/Fees';
import Reserve from '../client/src/Components/Info/Reserve';

configure({ adapter: new Adapter() });

describe('should render Fees component', () => {
  const wrapper = shallow(<Fees maxGuests={5} setState={() => (1)} />);
  it('should should render components', () => {
    expect(wrapper.find(FeeContainer).length).toBe(1);
  });
});

describe('should render Reserve component', () => {
  const wrapper = shallow(<Reserve />);
  it('should should render components', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
