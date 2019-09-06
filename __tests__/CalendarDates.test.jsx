/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../client/src/Components/Calendar/Calendar';
import Date, { StyledDate } from '../client/src/Components/Calendar/Date';
import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe('should render calendar and date components', () => {
  const dates = [{ available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }];

  const wrapper = shallow(<Calendar listing={1} dates={dates} ready changeMonth={() => (1)} monthID={0} inOut setState={() => (1)} toggleCalendar={() => (1)} />);
  it('should render the calendar', () => {
    expect(wrapper.find('tbody').length).toBe(1);
  });
  it('should render the dates components', () => {
    expect(wrapper.find(Date).length).toBe(31);
  });

  it('should change the month', () => {
    const instance = wrapper.instance();
    instance.slideHandler(1);
    expect(wrapper.state('slideRight')).toBe(true);
  });

  it('should set the start date', () => {
    const instance = wrapper.instance();
    instance.handleDateClick(1);
    expect(wrapper.state('monthID')).toEqual(0);

    wrapper.setProps({ startDate: 1 });
    instance.handleDateClick(2);

    wrapper.setProps({ inOut: false });
    instance.handleDateClick(2);

    wrapper.setProps({ startDate: null });
    instance.handleDateClick(2);
  });

  it('should toggle the calendar', () => {
    const instance = wrapper.instance();
    instance.handleClick({ target: 1 });
  });

  it('should set hover date for state when a date is hovered', () => {
    const instance = wrapper.instance();
    instance.hoverDate();
    expect(wrapper.state('hoveredDate')).toBe(0);
    instance.hoverDate(1);
    expect(wrapper.state('hoveredDate')).toBe(1);
  });

  it('should clear the start and end dates when clear dates is pressed', () => {
    const instance = wrapper.instance();
    instance.clearDates();
    expect(wrapper.state('startDate')).toBe(undefined);
    expect(wrapper.state('startMonth')).toBe(undefined);
    expect(wrapper.state('endDate')).toBe(undefined);
    expect(wrapper.state('endMonth')).toBe(undefined);
    expect(wrapper.state('clearDates')).toBe(false);
  });
});

describe('should render date components', () => {
  const date = 30;
  const wrapper = shallow(<Date available={1} date={date} hovered hoverDate={() => (1)} handleDateClick={() => (1)} />);
  it('should render the dates components', () => {
    expect(wrapper.text()).toBe('30');
  });

  it('should render on hover', () => {
    // wrapper.find(StyledDate).simulate('mouseover');
    // wrapper.find(StyledDate).simulate('mouseleave');
    // wrapper.find(StyledDate).simulate('click');
    expect(wrapper.text()).toBe('30');
  });
});
