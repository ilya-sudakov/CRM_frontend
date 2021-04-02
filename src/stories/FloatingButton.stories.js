import FloatingPlus from '../utils/MainWindow/FloatingPlus/FloatingPlus.jsx';

export default {
  title: 'FloatingPlus',
  component: FloatingPlus,
};

const Template = (args) => <FloatingPlus {...args} />;

export const Default = Template.bind({});
Default.args = {};
