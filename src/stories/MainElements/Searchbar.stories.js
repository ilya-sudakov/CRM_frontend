import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';

export default {
  title: 'Основной UI/SearchBar',
  component: SearchBar,
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithOptions = Template.bind({});
WithOptions.args = {
  searchOptions: [
    {
      text: 'Везде',
      value: '',
    },
    {
      text: 'Город',
      value: 'city',
    },
  ],
};

const advanced = [
  {
    type: 'groupCheckbox',
    parentCheckbox: { text: 'Поиск по налогообложению', value: false },
    childCheckbox: { text: 'УСН', value: false },
  },
];

export const WithAdvancedOptions = Template.bind({});
WithAdvancedOptions.args = {
  searchOptions: [
    {
      text: 'Везде',
      value: '',
    },
    {
      text: 'Город',
      value: 'city',
    },
  ],
  advancedOptions: advanced,
};
