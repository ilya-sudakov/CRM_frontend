import FormWindow from 'Utils/Form/FormWindow/FormWindow.jsx';

export default {
  title: 'FormWindow',
  component: FormWindow,
};

const Template = (args) => <FormWindow {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Окно',
  content: 'Контент 123',
  showWindow: true,
};
