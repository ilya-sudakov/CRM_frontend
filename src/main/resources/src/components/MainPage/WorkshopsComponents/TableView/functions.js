import React from "react";
import {
  formatDateString,
  saveCanvasAsImage,
} from "../../../../utils/functions.jsx";
import { requestStatuses } from "../workshopVariables.js";
import html2canvas from "html2canvas";
import { sortByField } from "../../../../utils/sorting/sorting.js";

export const getRequestItemClassName = (request, isMinimized) => {
  return `main-window__list-item main-window__list-item--${
    requestStatuses.find(
      (item) => item.name === request.status || item.oldName === request.status
    )?.className
  } ${
    request?.requestProducts?.length > 1 && !isMinimized
      ? "main-window__list-item--multiple-items"
      : ""
  } ${
    request.factory === undefined ||
    request.factory === "requests" ||
    request.factory === null
      ? " main-window__list-item--message main-window__list-item--warning"
      : ""
  } ${isMinimized ? "main-window__list-item--is-minimized" : ""}`;
};

export const downloadImage = async (
  product,
  workshop,
  setSelectedProduct,
  setLabelIsHidden
) => {
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

export const handleMinimizeRequestItem = (
  requests,
  setRequests,
  curRequest,
  isMinimized
) => {
  if (!isMinimized) return;
  let newReqs = requests;
  let index = 0;
  requests.find((item, idx) => {
    if (item.id === curRequest.id) {
      index = idx;
      return true;
    }
    return false;
  });

  newReqs.splice(index, 1, {
    ...curRequest,
    isMinimized: !curRequest.isMinimized,
  });
  return setRequests([...newReqs]);
};

export const sortRequests = (data, sortOrder) => {
  return sortByField(data, {
    fieldName: sortOrder.curSort,
    direction: sortOrder[sortOrder.curSort],
  });
};

export const printRequestsByDates = (
  dates,
  requests,
  printConfig,
  sortOrder,
  printRequests
) => {
  return dates.map((date) => {
    let filteredReqs = sortRequests(
      requests.filter(
        (request) =>
          formatDateString(new Date(request.date)) ===
          formatDateString(new Date(date))
      ),
      sortOrder
    );
    if (filteredReqs.length > 0) {
      return (
        <>
          <div className="main-window__list-item main-window__list-item--date">
            <span>{formatDateString(new Date(date))}</span>
          </div>
          {printRequests(filteredReqs, printConfig)}
        </>
      );
    }
  });
};
