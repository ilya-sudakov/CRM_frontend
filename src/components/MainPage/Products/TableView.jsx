import { useState, useEffect, useMemo, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import plusIcon from 'Assets/tableview/add_item.png';
import plusContIcon from 'Assets/tableview/add_cont.png';
import 'Utils/MainWindow/MainWindow.scss';
import { useTable } from 'Utils/hooks';
import ImageView from 'Utils/Form/ImageView/ImageView.jsx';
import UserContext from 'Components/../App';
import styled from 'styled-components';

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    let temp = [];
    props.categories.map((element) =>
      temp.push({
        id: element.id,
        hidden: true,
      }),
    );
    props.closeWindow && props.setShowWindow(false);
    props.categories.length > 0 && setIsLoading(false);
  }, [props.categories, props.closeWindow]);

  const data = useMemo(
    () =>
      props.categories.map((category) => ({
        ...category,
        products: props.products.filter(
          (product) => product.category === category.category,
        ),
      })),
    [props.products, isLoading],
  );

  const columns = [
    {
      text: 'Категория',
      value: 'category',
      itemsCount: (category) =>
        props.products.filter(
          (product) => product.category === category.category,
        ).length,
    },
  ];
  const nestedColumns = [
    {
      text: 'Фото',
      value: 'photo',
      // eslint-disable-next-line react/display-name
      formatFn: ({ photo }) => (
        <ImageView file={photo} style={{ maxPreviewWidth: '70px' }} />
      ),
      width: '100px',
      maxWidth: '100px',
    },
    { text: 'Название', value: 'name' },
    { text: 'Вес', value: 'weight' },
    { text: 'Место производства', value: 'workshop' },
    { text: 'Комментарий', value: 'comment' },
  ];
  const actions = (item) => [
    {
      elementType: 'edit',
      title: 'Редактирование категории',
      link: `/products/category/edit/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'delete',
      title: 'Удаление категории',
      onClick: null,
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];
  const actionsNested = (item) => [
    {
      elementType: 'view',
      title: 'Просмотр продукции',
      link: `/products/view/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'edit',
      title: 'Редактирование продукции',
      link: `/products/edit/${item.id}`,
      isRendered: userContext.userHasAccess([
        'ROLE_ADMIN',
        'ROLE_DISPATCHER',
        'ROLE_ENGINEER',
        'ROLE_WORKSHOP',
      ]),
    },
    {
      elementType: 'delete',
      title: 'Удаление продукции',
      onClick: () => props.deleteItem(item),
      isRendered: userContext.userHasAccess(['ROLE_ADMIN']),
    },
  ];
  const SelectAction = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ close }) => (close ? 'green' : '#bbb')};
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      filter: brightness(1.1);
    }
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .main-window__img {
      max-height: 15px;
    }
  `;
  const onSelectActions = ({ id, name }) => [
    {
      customElement: (
        <SelectAction
          title="Выбрать и продолжить"
          onClick={() => props.selectProduct(id, name, id)}
        >
          <img className="main-window__img" src={plusContIcon} alt="" />
        </SelectAction>
      ),
      isOutside: true,
    },
    {
      customElement: (
        <SelectAction
          title="Выбрать и закрыть"
          close
          onClick={() => {
            props.selectProduct(id, name, id);
            props.setCloseWindow(!props.closeWindow);
          }}
        >
          <img className="main-window__img" src={plusIcon} alt="" />
        </SelectAction>
      ),
      isOutside: true,
    },
  ];
  const [table] = useTable({
    data,
    isLoading,
    columns,
    actions,
    nestedTable: {
      isLoading,
      columns: nestedColumns,
      actions: props.selectProduct ? onSelectActions : actionsNested,
      fieldName: 'products',
    },
    options: props.selectProduct ? { fullSize: true } : undefined,
  });
  return table;
};

export default withRouter(TableView);
