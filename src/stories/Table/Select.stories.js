import TableSelectStatus from 'Components/Table/TableSelectStatus.jsx';

export default {
  title: 'Table/Select',
  component: TableSelectStatus,
};

const TemplateTableSelectStatus = (args) => <TableSelectStatus {...args} />;

const options = [
  { text: 'Материалы', type: 'materials' },
  { text: 'Выполнено', type: 'completed' },
  { text: 'В процессе', type: 'in-process' },
  { text: 'Отложено', type: 'delayed' },
  { text: 'Проблема', type: 'problem' },
];
export const SuccessSelect = TemplateTableSelectStatus.bind({});
SuccessSelect.args = {
  value: 'Выполнено',
  options,
};

export const InProgressSelect = TemplateTableSelectStatus.bind({});
InProgressSelect.args = {
  value: 'В процессе',
  options,
};
