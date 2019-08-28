/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonsAndHeaders, { StyledButton, Month } from '../client/src/Components/Calendar/ButtonsAndHeaders';
import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe('should render ButtonsAndHeaders component', () => {
  const monthID = 0;
  const wrapper = shallow(<ButtonsAndHeaders monthID={monthID} changeMonth={() => (1)} />);
  it('should render the Month and Button components', () => {
    expect(wrapper.find(StyledButton).length).toBe(2);
  });

  it('should render the Month and Button components', () => {
    expect(wrapper.find(Month).text()).toBe('August 2019');
  });
});
