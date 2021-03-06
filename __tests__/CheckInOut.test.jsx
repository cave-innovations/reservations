/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckInOut, { Input, DivOut, DivIn } from '../client/src/Components/Info/CheckInOut';

configure({ adapter: new Adapter() });

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
