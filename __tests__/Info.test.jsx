/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Info from '../client/src/Components/Info/Info';
import TopHeader, { Price, Stars, Reviews } from '../client/src/Components/Info/TopHeader';

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
  it('should calculate number of days reserved', () => {
    const instance = wrapper.instance();
    instance.setState({ endDate: 3, startDate: 1 });
    expect(wrapper.state('numReservedDays')).toBe(2);
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
