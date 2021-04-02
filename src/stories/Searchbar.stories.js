import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';

export default {
  title: 'SearchBar',
  component: SearchBar,
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {};
