// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../client/src/Components/Calendar/Calendar';

test('CheckboxWithLabel changes the text after click', () => {
  const dates = [{ available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 0 }, { available: 1 }, { available: 1 }, { available: 0 }, { available: 0 }, { available: 0 }, { available: 0 }];
  const checkbox = shallow(<Calendar listing={1} dates={dates} ready={false} monthID={0} />);
});
