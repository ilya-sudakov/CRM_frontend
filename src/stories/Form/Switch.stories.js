import Switch from 'Components/Form/Switch/Switch.jsx';

export default {
  title: 'Form/Switch',
  component: Switch,
};

const Template = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Переключатель',
};

export const Checked = Template.bind({});
Checked.args = {
  text: 'Переключатель',
  checked: true,
};
