import FloatingButton from 'Utils/MainWindow/FloatingButton/FloatingButton.jsx';

export default {
  title: 'FloatingButton',
  component: FloatingButton,
};

const Template = (args) => <FloatingButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
