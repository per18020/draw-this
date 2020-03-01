import { HomeScreen } from '../Home';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const props: any = {
    count: 1,
    dispatch: () => {},
  };
  const tree = renderer.create(<HomeScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
