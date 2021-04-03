import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';

export default {
  title: 'Checkbox',
  component: CheckBox,
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  text: 'Checkbox',
  checked: true,
};
