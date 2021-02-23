import { lazy } from "react";

const Clients = lazy(() => import("./Clients/Clients.jsx"));

const Contracts = lazy(() => import("./Contracts/Contracts.jsx"));

const Requests = lazy(() => import("./Requests/Requests.jsx"));

const NewRequest = lazy(() =>
  import("./WorkshopsComponents/Forms/NewRequest/NewRequest.jsx")
);

const EditRequest = lazy(() =>
  import("./WorkshopsComponents/Forms/EditRequest/EditRequest.jsx")
);

const ShipRequest = lazy(() =>
  import("./WorkshopsComponents/Forms/ShipRequest/ShipRequest.jsx")
);

const GeneralPage = lazy(() => import("./GeneralPage/GeneralPage.jsx"));

const LtdListPage = lazy(() =>
  import("./PriceList/LtdListPage/LtdListPage.jsx")
);

const NewLtd = lazy(() =>
  import("./PriceList/LtdListPage/Forms/NewLtd/NewLtd.jsx")
);

const EditLtd = lazy(() =>
  import("./PriceList/LtdListPage/Forms/EditLtd/EditLtd.jsx")
);

const RiggingList = lazy(() =>
  import("./Dispatcher/Rigging/RiggingList/RiggingList.jsx")
);

const MainPageWorkspace = lazy(() =>
  import("./GeneralPage/MainPageWorkspace/MainPageWorkspace.jsx")
);

const Notifications = lazy(() =>
  import("./GeneralPage/Notifications/NotificationsWidget.jsx")
);

const WorkManagement = lazy(() =>
  import("./GeneralPage/WorkManagement/WorkListWidget/WorkListWidget.jsx")
);

const WorkManagementPage = lazy(() =>
  import(
    "./GeneralPage/WorkManagement/WorkManagementPage/WorkManagementPage.jsx"
  )
);

const NewRecordWork = lazy(() =>
  import("./GeneralPage/WorkManagement/NewRecordWork/NewRecordWork.jsx")
);

const EditRecordWork = lazy(() =>
  import("./GeneralPage/WorkManagement/EditRecordWork/EditRecordWork.jsx")
);

const ProductionJournal = lazy(() =>
  import("./GeneralPage/WorkManagement/ProductionJournal/ProductionJournal.jsx")
);

const ProductionJournalNew = lazy(() =>
  import(
    "./GeneralPage/WorkManagement/ProductionJournal/ProductionJournalNew/ProductionJournalNew.jsx"
  )
);

const newClient = lazy(() => import("./Clients/NewClient/NewClient.jsx"));

const EditClient = lazy(() => import("./Clients/EditClient/EditClient.jsx"));

const ClientCategories = lazy(() =>
  import("./Clients/ClientCategories/ClientCategories.jsx")
);

const Products = lazy(() => import("./Products/Products.jsx"));

const NewProduct = lazy(() => import("./Products/NewProduct/NewProduct.jsx"));

const Users = lazy(() => import("./Profile/Users/Users.jsx"));

const EditUser = lazy(() => import("./Profile/Users/EditUser/EditUser.jsx"));

const NewUser = lazy(() => import("./Profile/Users/NewUser/NewUser.jsx"));

const LogListPage = lazy(() => import("./LogListPage/LogListPage.jsx"));

const ViewProduct = lazy(() =>
  import("./Products/ViewProduct/ViewProduct.jsx")
);

const EditProduct = lazy(() =>
  import("./Products/EditProduct/EditProduct.jsx")
);

const WorkshopLEMZ = lazy(() => import("./WorkshopLEMZ/WorkshopLEMZ.jsx"));

const WorkshopOrders = lazy(() =>
  import("./WorkshopsComponents/WorkshopOrders/WorkshopOrders.jsx")
);

const NewWorkshopOrder = lazy(() =>
  import(
    "./WorkshopsComponents/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx"
  )
);

const EditWorkshopOrder = lazy(() =>
  import(
    "./WorkshopsComponents/WorkshopOrders/EditWorkshopOrder/EditWorkshopOrder.jsx"
  )
);

const NewWorkshopOrderLEMZ = lazy(() =>
  import("./LEMZ/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx")
);

const ViewWorkshopOrderLEMZ = lazy(() =>
  import("./LEMZ/WorkshopOrders/ViewWorkshopOrder/ViewWorkshopOrder.jsx")
);

const EditWorkshopOrderLEMZ = lazy(() =>
  import("./LEMZ/WorkshopOrders/EditWorkshopOrder/EditWorkshopOrder.jsx")
);

const NewWorkshopOrderLepsari = lazy(() =>
  import("./Lepsari/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx")
);

const ViewWorkshopOrderLepsari = lazy(() =>
  import("./Lepsari/WorkshopOrders/ViewWorkshopOrder/ViewWorkshopOrder.jsx")
);

const EditWorkshopOrderLepsari = lazy(() =>
  import("./Lepsari/WorkshopOrders/EditWorkshopOrder/EditWorkshopOrder.jsx")
);

const Rigging = lazy(() => import("./Dispatcher/Rigging/Rigging.jsx"));

const Transportation = lazy(() =>
  import("./Dispatcher/Transportation/Transportation.jsx")
);

const GeneralTasks = lazy(() =>
  import("./Dispatcher/GeneralTasks/GeneralTasks.jsx")
);

const NewTransportation = lazy(() =>
  import("./Dispatcher/Transportation/NewTransportation/NewTransportation.jsx")
);

const EditTransportation = lazy(() =>
  import(
    "./Dispatcher/Transportation/EditTransportation/EditTransportation.jsx"
  )
);

const NewTask = lazy(() =>
  import("./Dispatcher/GeneralTasks/NewTask/NewTask.jsx")
);

const EditTask = lazy(() =>
  import("./Dispatcher/GeneralTasks/EditTask/EditTask.jsx")
);

const Stamp = lazy(() => import("./Dispatcher/Rigging/Stamp/Stamp.jsx"));

const Machine = lazy(() => import("./Dispatcher/Rigging/Machine/Machine.jsx"));

const PressForm = lazy(() =>
  import("./Dispatcher/Rigging/PressForm/PressForm.jsx")
);

const Parts = lazy(() => import("./Dispatcher/Rigging/Parts/Parts.jsx"));

const Employees = lazy(() => import("./Dispatcher/Employees/Employees.jsx"));

const NewEmployee = lazy(() =>
  import("./Dispatcher/Employees/NewEmployee/NewEmployee.jsx")
);

const EditEmployee = lazy(() =>
  import("./Dispatcher/Employees/EditEmployee/EditEmployee.jsx")
);

const Work = lazy(() => import("./Work/Work.jsx"));

const NewWork = lazy(() => import("./Work/NewWork/NewWork.jsx"));

const EditWork = lazy(() => import("./Work/EditWork/EditWork.jsx"));

const WorkshopLepsari = lazy(() =>
  import("./WorkshopLepsari/WorkshopLepsari.jsx")
);

const Storage = lazy(() => import("./Storage/Storage.jsx"));

const NewStorage = lazy(() => import("./Storage/NewStorage/NewStorage.jsx"));

const EditStorage = lazy(() => import("./Storage/EditStorage/EditStorage.jsx"));

const StorageLepsari = lazy(() =>
  import("./Lepsari/Storage/StorageLepsari.jsx")
);

const NewStorageLepsari = lazy(() =>
  import("./Lepsari/Storage/NewStorage/NewStorage.jsx")
);

const EditStorageLepsari = lazy(() =>
  import("./Lepsari/Storage/EditStorage/EditStorage.jsx")
);

const NewCategory = lazy(() =>
  import("./Products/CategoryManagement/NewCategory/NewCategory.jsx")
);

const EditCategory = lazy(() =>
  import("./Products/CategoryManagement/EditCategory/EditCategory.jsx")
);

const LEMZ = lazy(() => import("./LEMZ/LEMZ.jsx"));

const Lepsari = lazy(() => import("./Lepsari/Lepsari.jsx"));

const PriceList = lazy(() => import("./PriceList/PriceList/PriceList.jsx"));

const FeedbackPage = lazy(() => import("./FeedbackPage/FeedbackPage.jsx"));

const NewFeedback = lazy(() =>
  import("./FeedbackPage/NewFeedback/NewFeedback.jsx")
);

const ViewFeedback = lazy(() =>
  import("./FeedbackPage/ViewFeedback/ViewFeedback.jsx")
);

const EtceteraPage = lazy(() => import("./EtceteraPage/EtceteraPage.jsx"));

const ReportsPage = lazy(() => import("./ReportsPage/ReportsPage.jsx"));

const EmployeeReportPage = lazy(() =>
  import("./ReportsPage/EmployeeReportPage/EmployeeReportPage.jsx")
);

const GraphsPage = lazy(() => import("./GraphsPage/GraphsPage.jsx"));

const PackagingPage = lazy(() => import("./PackagingPage/PackagingPage.jsx"));

const NewPackaging = lazy(() =>
  import("./PackagingPage/NewPackaging/NewPackaging.jsx")
);

const EditPackaging = lazy(() =>
  import("./PackagingPage/EditPackaging/EditPackaging.jsx")
);

const ReportTablePage = lazy(() =>
  import("./GeneralPage/ReportTablePage/ReportTablePage.jsx")
);

const StatisticsPage = lazy(() =>
  import("./StatisticsPage/StatisticsPage.jsx")
);

export {
  Clients,
  newClient,
  EditClient,
  ClientCategories,
  Contracts,
  Requests,
  NewRequest,
  EditRequest,
  ShipRequest,
  GeneralPage,
  MainPageWorkspace,
  Notifications,
  WorkManagement,
  NewRecordWork,
  EditRecordWork,
  ProductionJournal,
  ProductionJournalNew,
  WorkManagementPage,
  Products,
  NewProduct,
  ViewProduct,
  EditProduct,
  NewCategory,
  EditCategory,
  Users,
  EditUser,
  NewUser,
  LogListPage,
  WorkshopLEMZ,
  Storage,
  NewStorage,
  EditStorage,
  NewWorkshopOrderLEMZ,
  ViewWorkshopOrderLEMZ,
  EditWorkshopOrderLEMZ,
  NewWorkshopOrderLepsari,
  ViewWorkshopOrderLepsari,
  EditWorkshopOrderLepsari,
  WorkshopOrders,
  NewWorkshopOrder,
  EditWorkshopOrder,
  Rigging,
  Transportation,
  EditTransportation,
  NewTransportation,
  GeneralTasks,
  LtdListPage,
  NewLtd,
  EditLtd,
  NewTask,
  EditTask,
  Parts,
  Employees,
  NewEmployee,
  EditEmployee,
  Stamp,
  Machine,
  PressForm,
  Work,
  NewWork,
  EditWork,
  WorkshopLepsari,
  StorageLepsari,
  NewStorageLepsari,
  EditStorageLepsari,
  LEMZ,
  Lepsari,
  PriceList,
  FeedbackPage,
  NewFeedback,
  ViewFeedback,
  EtceteraPage,
  GraphsPage,
  PackagingPage,
  NewPackaging,
  EditPackaging,
  ReportTablePage,
  ReportsPage,
  RiggingList,
  EmployeeReportPage,
  StatisticsPage,
};
