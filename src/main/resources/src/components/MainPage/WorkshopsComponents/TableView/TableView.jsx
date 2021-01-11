import React, { useState, useEffect, useCallback, useContext } from "react";
import { withRouter } from "react-router-dom";
import editSVG from "../../../../../../../../assets/tableview/edit.svg";
import printSVG from "../../../../../../../../assets/tableview/print.svg";
import copySVG from "../../../../../../../../assets/tableview/copy.svg";
import transferSVG from "../../../../../../../../assets/tableview/transfer.svg";
import TruckSVG from "../../../../../../../../assets/sidemenu/truck.inline.svg";
import "./TableView.scss";
import PropTypes from "prop-types";
import UserContext from "../../../../App.js";

import {
  editRequestStatus,
  editProductStatusToRequest,
  editRequest,
} from "../../../../utils/RequestsAPI/Requests.jsx";

import {
  createLabelForProduct,
  scrollToElement,
} from "../../../../utils/functions.jsx";
import LabelPrint from "../LabelPrint/LabelPrint.jsx";
import PlaceholderLoading from "../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import { getPageByRequest, printRequest } from "../functions.js";
import { defaultPrintObject } from "../objects.js";
import {
  renderIdColumn,
  renderDateCreatedColumn,
  renderClientColumn,
  renderResponsibleColumn,
  renderCommentColumn,
  renderDateShippedColumn,
  renderRequestStatusColumn,
  renderPriceColumn,
  renderProductsColumn,
  renderProductsMinimizedColumn,
  renderProductsSubItem,
  renderListHeader,
} from "./renderItems.jsx";
import TableActions from "../../../../utils/TableView/TableActions/TableActions.jsx";
import DeleteItemAction from "../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx";
import MessageForUser from "../../../../utils/Form/MessageForUser/MessageForUser.jsx";
import {
  getRequestItemClassName,
  handleMinimizeRequestItem,
  printRequestsByDates,
  sortRequests,
} from "./functions.js";

const TableView = ({
  workshopName,
  loadData,
  isLoading = false,
  data = [],
  dates,
  copyRequest,
  deleteItem,
  transferRequest,
  isMinimized = false,
  printConfig = {
    ...defaultPrintObject,
    price: { visible: workshopName === "requests" },
  },
  history,
  sortOrder = {
    curSort: "id",
    id: "desc",
  },
}) => {
  const [showError, setShowError] = useState(false);
  const [errorRequest, setErrorRequest] = useState({});
  const [newSum, setNewSum] = useState(0);
  const [scrolledToPrev, setScrolledToPrev] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    link: "",
  });
  const [labelIsHidden, setLabelIsHidden] = useState(true);
  const [requests, setRequests] = useState([]);
  const userContext = useContext(UserContext);

  const handleStatusChange = ({ target }) => {
    const status = target.value;
    const id = target.getAttribute("id");
    const sum = Number.parseFloat(target.getAttribute("sum"));

    //проверяем, указана ли положительная сумма
    if (status === "Завершено") {
      if (
        sum !== 0 &&
        sum !== null &&
        !Number.isNaN(sum) &&
        sum !== undefined
      ) {
        return changeStatus(status, id);
      } else {
        const selectedItem = requests.find(
          (item) => item.id === Number.parseInt(id)
        );
        setErrorRequest({ ...selectedItem, newStatus: status });
        setShowError(true);
        return;
      }
    }

    //Если статус-отгружено, тогда ставим дату отгрузки - сегодняшнее число
    if (status === "Отгружено") {
      const selectedItem = requests.find(
        (item) => item.id === Number.parseInt(id)
      );
      if (selectedItem) {
        return editRequest(
          {
            sum: selectedItem.sum,
            date: selectedItem.date,
            responsible: selectedItem.responsible,
            factory: selectedItem.factory,
            comment: selectedItem.comment,
            status: selectedItem.status,
            shippingDate: new Date(),
          },
          id
        )
          .then(() => changeStatus(status, id))
          .catch((error) => {
            console.log(error);
          });
      }
    }

    //default изменение, если пред. не совпало
    return changeStatus(status, id);
  };

  const changeStatus = (status, id) => {
    return editRequestStatus(
      {
        status: status,
      },
      id
    )
      .then(async () => {
        await loadData();
        const request = requests.find(
          (item) => item.id === Number.parseInt(id)
        );
        history.push(
          workshopName === "requests"
            ? `/requests/${getPageByRequest({ status: status })}#${request.id}`
            : `/${workshopName}/workshop-${workshopName}/${getPageByRequest({
                status: status,
              })}#${request.id}`
        );
        return window.location.reload(); //костыль чтобы загрузить правильную вкладку
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProductStatusChange = (productId, status) => {
    editProductStatusToRequest(
      {
        status: status,
      },
      productId
    )
      .then(() => loadData())
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRequestTransfer = (request) => {
    console.log(request);
    if (request.sum === null || request.sum === 0) {
      setErrorRequest(request);
      return setShowError(true);
    }
    return transferRequest(request.id);
  };

  const prevRef = useCallback(
    (node) => {
      const id = Number.parseInt(history.location.hash.split("#")[1]);
      if (
        !data ||
        scrolledToPrev ||
        data.find((item) => item.id === id) === undefined
      )
        return;
      if (node !== null && data) {
        console.log(node);
        scrollToElement(node, workshopName === "requests" ? -200 : -1000);
        setScrolledToPrev(true);
      }
    },
    [data]
  );

  const handleSumEdit = () => {
    const selectedItem = errorRequest;
    return editRequest(
      {
        sum: Number.parseFloat(newSum),
        date: selectedItem.date,
        responsible: selectedItem.responsible,
        factory: selectedItem.factory,
        comment: selectedItem.comment,
        status: selectedItem.status,
        shippingDate: selectedItem.shippingDate,
      },
      selectedItem.id
    )
      .then(() => changeStatus(selectedItem.newStatus, selectedItem.id))
      .catch((error) => {
        console.log(error);
      });
  };

  const getActionsList = (request) => {
    return [
      {
        title: "Печать заявки",
        onClick: () => printRequest(request),
        imgSrc: printSVG,
        isRendered:
          (printRequest ? printRequest : false) && workshopName !== "requests",
      },
      {
        title: "Редактирование заявки",
        link:
          workshopName === "requests"
            ? `/requests/edit/${request.id}`
            : `/${workshopName}/workshop-${workshopName}/edit/${request.id}`,
        imgSrc: editSVG,
        isRendered: userContext.userHasAccess([
          "ROLE_ADMIN",
          "ROLE_MANAGER",
          "ROLE_WORKSHOP",
        ]),
      },
      {
        customElement: (
          <DeleteItemAction
            title="Удаление заявки"
            onClick={() => deleteItem(request.id)}
          />
        ),
        isRendered:
          (deleteItem ? deleteItem : false) &&
          userContext.userHasAccess(["ROLE_ADMIN"]),
      },
      {
        title: "Перенос заявки",
        onClick: () => handleRequestTransfer(request),
        imgSrc: transferSVG,
        isRendered:
          (transferRequest ? transferRequest : false) &&
          userContext.userHasAccess(["ROLE_ADMIN"]),
      },
      {
        title: "Копирование заявки",
        onClick: () => copyRequest(request.id),
        imgSrc: copySVG,
        isRendered:
          (copyRequest ? copyRequest : false) &&
          userContext.userHasAccess(["ROLE_ADMIN"]),
      },
    ];
  };

  useEffect(() => {
    const requestsWithMinimizedParam = data.map((request) => {
      return { ...request, isMinimized: true };
    });
    data && setRequests(requestsWithMinimizedParam);
  }, [data, isLoading, selectedProduct]);

  useEffect(() => {}, [requests]);

  const printRequests = (data, displayColumns) => {
    return data.map((request) => {
      const requestClassName = getRequestItemClassName(request, isMinimized);
      const actionsList = getActionsList(request);
      return (
        <>
          <div
            className={requestClassName}
            data-msg="Напоминание! Заявка не перенесена в один из цехов"
            key={request.id}
            id={request.id}
            onClick={() =>
              handleMinimizeRequestItem(
                requests,
                setRequests,
                request,
                isMinimized
              )
            }
            ref={
              Number.parseInt(history.location.hash.split("#")[1]) ===
              request.id
                ? prevRef
                : null
            }
            style={{
              paddingTop: isMinimized
                ? workshopName === "requests"
                  ? "5px"
                  : "15px"
                : "35px",
              paddingBottom:
                userContext.userHasAccess(["ROLE_ADMIN", "ROLE_MANAGER"]) &&
                workshopName === "requests" &&
                !isMinimized
                  ? "35px"
                  : userContext.userHasAccess(["ROLE_ADMIN", "ROLE_MANAGER"]) &&
                    workshopName === "requests" &&
                    isMinimized
                  ? "10px"
                  : "5px",
            }}
          >
            {displayColumns["id"].visible &&
              renderIdColumn(request, workshopName)}
            {displayColumns["date"].visible && renderDateCreatedColumn(request)}
            {displayColumns["products"].visible &&
              (isMinimized
                ? renderProductsMinimizedColumn(request)
                : renderProductsColumn(
                    request,
                    createLabelForProduct,
                    handleProductStatusChange,
                    setSelectedProduct,
                    setLabelIsHidden
                  ))}
            {displayColumns["client"].visible && renderClientColumn(request)}
            {displayColumns["responsible"].visible &&
              renderResponsibleColumn(request)}
            {displayColumns["status"].visible &&
              renderRequestStatusColumn(
                request,
                userContext.userHasAccess,
                handleStatusChange
              )}
            {displayColumns["date-shipping"].visible &&
              renderDateShippedColumn(request)}
            {displayColumns["comment"].visible && renderCommentColumn(request)}
            {displayColumns["price"].visible &&
              userContext.userHasAccess(["ROLE_ADMIN", "ROLE_MANAGER"]) &&
              renderPriceColumn(request)}
            <TableActions actionsList={actionsList} />
          </div>
          {isMinimized
            ? renderProductsSubItem(request, handleProductStatusChange)
            : null}
        </>
      );
    });
  };

  return (
    <div className="tableview-workshops">
      <div className="main-window">
        <LabelPrint product={selectedProduct} isHidden={labelIsHidden} />
        <MessageForUser
          showMessage={showError}
          setShowMessage={setShowError}
          title="Не введена сумма заказа!"
          buttonText="Сохранить"
          message={
            <div className="main-window__input-field">
              <div style={{ marginBottom: "5px" }}>Введите сумму заказа</div>
              <input
                type="number"
                onChange={({ target }) => setNewSum(target.value)}
              />
            </div>
          }
          onClick={handleSumEdit}
        />
        <div className="main-window__list main-window__list--full">
          {renderListHeader(isMinimized, printConfig, workshopName)}
          {isLoading ? (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="3rem"
              items={15}
            />
          ) : sortOrder.curSort === "date" ||
            sortOrder.curSort === "shippingDate" ? (
            printRequestsByDates(
              dates,
              requests,
              printConfig,
              sortOrder,
              printRequests
            )
          ) : (
            printRequests(sortRequests(requests, sortOrder), printConfig)
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TableView);

TableView.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  workshopName: PropTypes.string.isRequired,
  dates: PropTypes.array,
  copyRequest: PropTypes.func,
  loadData: PropTypes.func.isRequired,
  deleteItem: PropTypes.func,
  transferRequest: PropTypes.func,
  printConfig: PropTypes.object,
  sortOrder: PropTypes.object,
  isMinimized: PropTypes.bool,
};
