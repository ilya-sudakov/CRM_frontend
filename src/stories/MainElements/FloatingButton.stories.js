import FloatingButton from 'Components/MainWindow/FloatingButton/FloatingButton.jsx';

export default {
  title: 'Основной UI/FloatingButton',
  component: FloatingButton,
};

const Template = (args) => <FloatingButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
