/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Fees, { FeeContainer } from '../client/src/Components/Info/Fees';

configure({ adapter: new Adapter() });

describe('should render Fees component', () => {
  const wrapper = shallow(<Fees maxGuests={5} setState={() => (1)} />);
  it('should should render components', () => {
    expect(wrapper.find(FeeContainer).length).toBe(1);
  });
});
