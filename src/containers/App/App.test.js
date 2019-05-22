import AppRouter from './AppRouter';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

describe('<AppRouter />', () => {
  it('renders with default props', () => {
    const store = mockStore();
    const wrapper = shallow(<AppRouter store={store} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
