import { TableBadge } from 'Components/Table/Table.jsx';

export default {
  title: 'Table/Badge',
  component: TableBadge,
};

const TemplateTableBadge = (args) => <TableBadge {...args} />;

export const SuccessBadge = TemplateTableBadge.bind({});
SuccessBadge.args = {
  text: 'Выполнено',
  type: 'success',
};

export const FailedBadge = TemplateTableBadge.bind({});
FailedBadge.args = {
  text: 'Ошибка',
  type: 'error',
};
