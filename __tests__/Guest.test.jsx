/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Guest, {
  Container, Guests, DropDownContainer, ButtonLeft, ButtonRight,
} from '../client/src/Components/Info/Guest';

configure({ adapter: new Adapter() });

describe('should render Guest component', () => {
  const wrapper = shallow(<Guest maxGuests={5} setState={() => (1)} />);
  it('should render Guest component', () => {
    expect(wrapper.find(Container).length).toBe(1);
  });
  it('should render dropdown on clicking guests', () => {
    wrapper.find(Guests).at(0).simulate('click');
    expect(wrapper.state('showDropDown')).toBe(true);
    expect(wrapper.find(DropDownContainer).length).toBe(1);
  });
  it('should increment and decrement guest numbers when buttons are clicked', () => {
    wrapper.find(ButtonRight).at(0).simulate('click');
    expect(wrapper.state('numGuests')).toBe(2);
    wrapper.find(ButtonLeft).at(0).simulate('click');
    expect(wrapper.state('numGuests')).toBe(1);

    wrapper.find(ButtonRight).at(1).simulate('click');
    expect(wrapper.state('numGuests')).toBe(2);
    wrapper.find(ButtonLeft).at(1).simulate('click');
    expect(wrapper.state('numGuests')).toBe(1);

    wrapper.find(ButtonRight).at(2).simulate('click');
    expect(wrapper.state('numGuests')).toBe(1);
    wrapper.find(ButtonLeft).at(2).simulate('click');
    expect(wrapper.state('numGuests')).toBe(1);
  });

  it('should stop incrementing when hitting max guests', () => {
    wrapper.find(ButtonRight).at(1).simulate('click');
    wrapper.find(ButtonRight).at(1).simulate('click');
    wrapper.find(ButtonRight).at(1).simulate('click');
    wrapper.find(ButtonRight).at(1).simulate('click');
    wrapper.find(ButtonRight).at(0).simulate('click');
    wrapper.find(ButtonLeft).at(1).simulate('click');
    wrapper.find(ButtonRight).at(0).simulate('click');
    expect(wrapper.state('numGuests')).toBe(5);
  });

  it('should remove dropdown when clicking guests again', () => {
    wrapper.find(Guests).at(0).simulate('click');
    expect(wrapper.state('showDropDown')).toBe(false);
    expect(wrapper.find(DropDownContainer).length).toBe(0);
  });
});
