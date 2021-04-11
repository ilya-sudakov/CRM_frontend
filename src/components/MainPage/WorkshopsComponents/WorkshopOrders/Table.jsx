import { formatDateString, addSpaceDelimiter } from 'Utils/functions.jsx';
import Table from 'Components/Table/Table.jsx';
import styled from 'styled-components';
import { editOrder } from 'API/Workshop/Orders.jsx';

const Tableview = ({
  data,
  isLoading,
  deleteItem,
  userHasAccess,
  link,
  loadData,
}) => {
  const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const ProductRow = styled.div`
    display: flex;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    span {
      &:first-child {
        margin-right: 5px;
      }
      &:last-child {
        color: #777;
      }
    }
  `;
  const handleStatusChange = (item, value) => {
    return editOrder(
      {
        ...item,
        date: new Date(item.date).getTime() / 1000,
        deliverBy: new Date(item.deliverBy).getTime() / 1000,
        status: value,
      },
      item.id,
    ).then(() => loadData());
  };
  const columns = [
    {
      text: 'Дата создания',
      value: 'date',
      formatFn: ({ date }) => formatDateString(date),
    },
    { text: 'Название', value: 'name' },
    {
      text: 'Продукция',
      value: 'products',
      // eslint-disable-next-line react/display-name
      formatFn: ({ products }) => (
        <ProductsWrapper>
          {products.map((product) => (
            <ProductRow key={product.id}>
              <span>{product.name}</span>
              <span> ({addSpaceDelimiter(product.quantity)} шт.)</span>
            </ProductRow>
          ))}
        </ProductsWrapper>
      ),
    },
    { text: 'Комплектация', value: 'assembly' },
    {
      text: 'Статус',
      value: 'status',
      status: {
        onChange: (value, item) => handleStatusChange(item, value),
        options: [
          { text: 'Заказано', value: 'ordered' },
          { text: 'Отправлено', value: 'sent' },
          { text: 'Проблема', value: 'problem' },
          { text: 'Завершено', value: 'completed' },
        ],
      },
    },
    {
      text: 'Дата поставки',
      value: 'name',
      formatFn: ({ deliverBy }) => formatDateString(deliverBy),
      badge: {
        isVisibleFn: ({ deliverBy, status }) =>
          new Date(deliverBy) < new Date() && status !== 'completed',
        type: 'error',
      },
    },
  ];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактировать запись',
      link: `${link}/edit/${item.id}`,
    },
    {
      elementType: 'delete',
      title: 'Удаление записи',
      onClick: () => deleteItem(item),
      isRendered: userHasAccess(['ROLE_ADMIN']),
    },
  ];
  return (
    <Table
      data={data}
      columns={columns}
      actions={actions}
      loading={{ isLoading }}
    />
  );
};

export default Tableview;
