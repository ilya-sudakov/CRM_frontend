import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import editSVG from "../../../../../../../../assets/tableview/edit.svg";
import printSVG from "../../../../../../../../assets/tableview/print.svg";
import copySVG from "../../../../../../../../assets/tableview/copy.svg";
import transferSVG from "../../../../../../../../assets/tableview/transfer.svg";
import TruckSVG from "../../../../../../../../assets/sidemenu/truck.inline.svg";
import "./TableView.scss";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import UserContext from "../../../../App.js";

import {
  editRequestStatus,
  editProductStatusToRequest,
  editRequest,
} from "../../../../utils/RequestsAPI/Requests.jsx";

import {
  formatDateString,
  createLabelForProduct,
  scrollToElement,
  saveCanvasAsImage,
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
  const [errorRequestId, setErrorRequestId] = useState(null);
  const [newSum, setNewSum] = useState(0);
  const [scrolledToPrev, setScrolledToPrev] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    link: "",
  });
  const [labelIsHidden, setLabelIsHidden] = useState(true);
  const [requests, setRequests] = useState([]);
  const userContext = useContext(UserContext);

  const downloadImage = async (product, workshop) => {
    setSelectedProduct({
      ...product,
      workshop: workshop,
    });
    setLabelIsHidden(false);
    const element = document.getElementById("label");
    setTimeout(async () => {
      await html2canvas(element, {
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollY: 0,
        scrollX: 0,
        scale: window.devicePixelRatio * 5,
      }).then((canvas) => {
        setLabelIsHidden(true);
        saveCanvasAsImage(
          canvas,
          `${formatDateString(new Date())}_${product.name}.jpeg`
        );
      });
    }, 1500);
  };

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
        setErrorRequestId(Number.parseInt(id));
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
                    downloadImage,
                    createLabelForProduct,
                    handleProductStatusChange
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
            <TableActions
              actions={
                <>
                  {workshopName !== "requests" && (
                    <div
                      className="main-window__action"
                      title="Печать заявки"
                      onClick={() => printRequest(request)}
                    >
                      <img className="main-window__img" src={printSVG} />
                    </div>
                  )}
                  {userContext.userHasAccess([
                    "ROLE_ADMIN",
                    "ROLE_MANAGER",
                    "ROLE_WORKSHOP",
                  ]) && (
                    <Link
                      to={
                        workshopName === "requests"
                          ? `/requests/edit/${request.id}`
                          : `/${workshopName}/workshop-${workshopName}/edit/${request.id}`
                      }
                      className="main-window__action"
                      title="Редактирование заявки"
                    >
                      <img className="main-window__img" src={editSVG} />
                    </Link>
                  )}
                  {userContext.userHasAccess(["ROLE_ADMIN"]) && (
                    <DeleteItemAction
                      title="Удаление заявки"
                      onClick={() => deleteItem(request.id)}
                    />
                  )}
                  {transferRequest &&
                    userContext.userHasAccess(["ROLE_ADMIN"]) && (
                      <div
                        data-id={request.id}
                        className="main-window__action"
                        title="Перенос заявки"
                        onClick={(event) => {
                          event.preventDefault();
                          if (request.sum === null || request.sum === 0) {
                            setErrorRequestId(Number.parseInt(request.id));
                            return setShowError(true);
                          }
                          return transferRequest(request.id);
                        }}
                      >
                        <img className="main-window__img" src={transferSVG} />
                      </div>
                    )}
                  {copyRequest && userContext.userHasAccess(["ROLE_ADMIN"]) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Копирование заявки"
                      onClick={() => copyRequest(request.id)}
                    >
                      <img className="main-window__img" src={copySVG} />
                    </div>
                  )}
                </>
              }
            />
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
        <LabelPrint
          product={selectedProduct}
          name={selectedProduct.name}
          link={selectedProduct.link}
          isHidden={labelIsHidden}
          workshop={selectedProduct.workshop}
        />
        <MessageForUser
          showMessage={showError}
          setShowMessage={setShowError}
          title="Не введена сумма заказа"
          buttonText="Сохранить"
          message={
            <div className="main-window__input-field">
              <div style={{ marginBottom: "5px" }}>
                Введите сумму заказа для изменения статуса!
              </div>
              <input
                type="number"
                onChange={({ target }) => setNewSum(target.value)}
              />
            </div>
          }
          onClick={() => {
            const selectedItem = requests.find(
              (item) => item.id === Number.parseInt(errorRequestId)
            );
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
              .then(() => changeStatus(selectedItem.status, selectedItem.id))
              .catch((error) => {
                console.log(error);
              });
          }}
        />
        <div className="main-window__list">
          {renderListHeader(sortOrder, isMinimized, printConfig)}
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
