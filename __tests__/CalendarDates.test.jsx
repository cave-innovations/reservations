/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../client/src/Components/Calendar/Calendar';
import Date from '../client/src/Components/Calendar/Date';
import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe('should render calendar and date components', () => {
  const dates = [{ available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }];

  const wrapper = shallow(<Calendar listing={1} dates={dates} ready changeMonth={() => (1)} monthID={0} />);
  it('should render the calendar', () => {
    expect(wrapper.find('tbody').length).toBe(1);
  });
  it('should render the dates components', () => {
    expect(wrapper.find(Date).length).toBe(31);
  });
});

describe('should render date components', () => {
  const date = 30;
  const wrapper = shallow(<Date available={1} date={date} />);
  it('should render the dates components', () => {
    expect(wrapper.text()).toBe('30');
  });
});
