import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel';
import Button from 'Utils/Form/Button/Button';

export default {
  title: 'MainComponents/ControlPanel',
  component: ControlPanel,
};

const Template = (args) => <ControlPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithItemCount = Template.bind({});
WithItemCount.args = { itemsCount: `Всего: 100 записей` };

export const WithButtons = Template.bind({});
WithButtons.args = {
  buttons: (
    <Button
      text="Печать списка"
      isLoading={false}
      inverted
      className="main-window__button main-window__button--inverted"
    />
  ),
};
