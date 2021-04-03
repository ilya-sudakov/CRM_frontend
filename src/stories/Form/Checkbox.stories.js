import CheckBox from 'Utils/Form/CheckBox/CheckBox.jsx';

export default {
  title: 'Form/Checkbox',
  component: CheckBox,
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Чекбокс',
};

export const Checked = Template.bind({});
Checked.args = {
  text: 'Чекбокс',
  checked: true,
};
