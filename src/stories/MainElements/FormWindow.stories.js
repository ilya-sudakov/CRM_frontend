import FormWindow from 'Components/Form/FormWindow/FormWindow.jsx';

export default {
  title: 'Основной UI/FormWindow',
  component: FormWindow,
};

const Template = (args) => <FormWindow {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Окно',
  content: 'Контент 123',
  showWindow: true,
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  title: 'Окно',
  content: 'Контент 123',
  showWindow: true,
  size: 'medium',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  title: 'Окно',
  content: 'Контент 123',
  showWindow: true,
  size: 'small',
};
