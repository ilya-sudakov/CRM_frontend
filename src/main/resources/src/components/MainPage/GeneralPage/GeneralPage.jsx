import React, { useState, useEffect } from "react";
import { MainPageWorkspace } from "../lazyImports.jsx";
import { Link } from "react-router-dom";
import "./GeneralPage.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import DownloadIcon from "../../../../../../../assets/download.svg";
import StatsIcon from "../../../../../../../assets/statistics/bar-chart-line.inline.svg";
import HistoryIcon from "../../../../../../../assets/statistics/history-outlined.inline.svg";
import ReportIcon from "../../../../../../../assets/statistics/report.svg";
import calenderIcon from "../../../../../../../assets/tableview/calendar.svg";
import { getReportTableExcel } from "./ReportTablePage/getReportTableExcel.js";
import Button from "../../../utils/Form/Button/Button.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";

const GeneralPage = (props) => {
  const workshops = [
    "ЦехЛЭМЗ",
    "ЦехЛепсари",
    "ЦехЛиговский",
    "Офис",
    "Уволенные",
  ];
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredWorkshops = () => {
    if (
      props.userHasAccess(["ROLE_ADMIN"]) ||
      props.userHasAccess(["ROLE_DISPATCHER"])
    ) {
      return workshops;
    }
    if (props.userHasAccess(["ROLE_LEMZ"])) {
      return ["ЦехЛЭМЗ"];
    }
    if (props.userHasAccess(["ROLE_LEPSARI"])) {
      return ["ЦехЛепсари"];
    }
    if (props.userHasAccess(["ROLE_LIGOVSKIY"])) {
      return ["ЦехЛиговский"];
    }
    if (props.userHasAccess(["ROLE_ENGINEER"])) {
      return ["Офис"];
    }
    if (props.userHasAccess(["ROLE_MANAGER"])) {
      return ["Офис"];
    }
  };

  async function downloadTableReport() {
    setIsLoading(true);
    const filteredWorkshops = getFilteredWorkshops();
    await getReportTableExcel(new Date(), filteredWorkshops);
    return setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Главная страница";
  }, []);

  return (
    <div className="general-page">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Главная страница</div>
        </div>
        <ControlPanel
          buttons={
            <>
              {props.userHasAccess([
                "ROLE_ADMIN",
                "ROLE_DISPATCHER",
                "ROLE_MANAGER",
                "ROLE_WORKSHOP",
                "ROLE_ENGINEER",
              ]) && (
                <Link
                  className="main-window__button"
                  to="/work-management/record-time/new"
                >
                  Учесть рабочее время
                </Link>
              )}
              {props.userHasAccess([
                "ROLE_ADMIN",
                "ROLE_WORKSHOP",
                "ROLE_DISPATCHER",
                "ROLE_ENGINEER",
                "ROLE_MANAGER",
              ]) && (
                <Link
                  className="main-window__button"
                  to="/work-management/journal"
                >
                  Дневник производства
                </Link>
              )}
              <Link className="main-window__button" to="/report-table">
                <img className="main-window__img" src={calenderIcon} />
                Табель
              </Link>
              {props.userHasAccess(["ROLE_ADMIN"]) && (
                <Link className="main-window__button" to="/reports">
                  <img className="main-window__img" src={ReportIcon} />
                  Отчеты
                </Link>
              )}
              {props.userHasAccess(["ROLE_ADMIN"]) && (
                <Link className="main-window__button" to="/statistics">
                  <StatsIcon className="main-window__img" />
                  Статистика
                </Link>
              )}
              {props.userHasAccess(["ROLE_ADMIN"]) && (
                <Link className="main-window__button" to="/profile/log-list">
                  <HistoryIcon className="main-window__img" />
                  Логи
                </Link>
              )}
              <Button
                text="Скачать Табель"
                imgSrc={DownloadIcon}
                className="main-window__button main-window__button--inverted"
                inverted
                isLoading={isLoading}
                onClick={downloadTableReport}
              />
            </>
          }
        />
        <div className="main-window__content">
          {props.userHasAccess([
            "ROLE_ADMIN",
            "ROLE_DISPATCHER",
            "ROLE_MANAGER",
            "ROLE_LIGOVSKIY",
            "ROLE_LEMZ",
            "ROLE_LEPSARI",
            "ROLE_ENGINEER",
          ]) && <MainPageWorkspace userHasAccess={props.userHasAccess} />}
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
