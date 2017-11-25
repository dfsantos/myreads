import React from 'react';

import SearchSuggestion from '../SearchSuggestion';

const words = ['Android'];

it('it should render without errors', () => {
  shallow(<SearchSuggestion words={words} />);
});

it('snapshot', () => {
  const wrapper = shallow(<SearchSuggestion words={words} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('setInterval should be called with interval ID when componentWillReceiveProps method execute', () => {
  const wrapper = shallow(<SearchSuggestion words={words} />);
  wrapper.instance().stop = 1;
  wrapper.setProps({ pause: true });
  expect(setInterval).toHaveBeenCalled();
  expect(wrapper.instance().stop).toBeNull();
});

it('setInterval should be activate when componentWillReceiveProps method execute and this.stop is null', () => {
  const wrapper = shallow(<SearchSuggestion words={words} />);
  wrapper.instance().stop = null;
  wrapper.setProps({ pause: false });
  expect(setInterval).toHaveBeenCalledWith(wrapper.instance().suggestWord, 2500);
});

it('clearInterval should be called when componentWillUnmount method execute', () => {
  const wrapper = shallow(<SearchSuggestion words={words} />);
  wrapper.unmount();
  expect(clearInterval).toHaveBeenCalled();
});
