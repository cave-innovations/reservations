/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Info from '../client/src/Components/Info/Info';
import TopHeader, { Price, Stars, Reviews } from '../client/src/Components/Info/TopHeader';
import CheckInOut, { Input, DivOut, DivIn } from '../client/src/Components/Info/CheckInOut';

import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe('should render Info', () => {
  const wrapper = shallow(<Info
    dates={1}
    ready
    changeMonth={() => (1)}
    monthID={0}
    listing={[{
      reviews: 1, pricing: 1, stars: 1, views: 1, maxGuests: 1,
    }]}
  />);
});

describe('should render CheckInOut', () => {
  const wrapper = shallow(<CheckInOut dates={200} monthID={5} ready changeMonth={() => (1)} />);

  it('should not render the calendar before click', () => {
    expect(wrapper.state('showCalendar')).toEqual(false);
  });
  it('should render the calendar after click', () => {
    wrapper.find(Input).at(0).simulate('click');
    expect(wrapper.state('showCalendar')).toEqual(true);
  });

  it('should render the check in calendar after click', () => {
    expect(wrapper.state('inOut')).toEqual(true);
    expect(wrapper.find(DivIn).props('inOut').inOut).toEqual(true);
  });

  it('should render the check out calendar after click', () => {
    wrapper.find(Input).at(1).simulate('click');
    expect(wrapper.state('inOut')).toEqual(false);
    expect(wrapper.find(DivOut).props('inOut').inOut).toEqual(false);
  });
});

describe('should render top header', () => {
  const wrapper = shallow(<TopHeader reviews={5} pricing={200} stars={5} />);
  it('should render the reviews div', () => {
    expect(wrapper.find(Reviews).length).toBe(1);
  });
  it('should render the stars div', () => {
    expect(wrapper.find(Stars).length).toBe(1);
  });
  it('should render the price div', () => {
    expect(wrapper.find(Price).length).toBe(1);
  });
});
