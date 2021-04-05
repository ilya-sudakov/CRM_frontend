import { lazy } from 'react';

// <--- STATISTICS ---> //
const StatisticsPage = lazy(() =>
  import('./StatisticsPage/StatisticsPage.jsx'),
);
// <!--- STATISTICS ---> //

// <--- LOGS ---> //
const LogListPage = lazy(() => import('./LogListPage/LogListPage.jsx'));
// <!--- LOGS ---> //

// <--- REQUESTS ---> //
const NewRequest = lazy(() =>
  import('./WorkshopsComponents/Forms/NewRequest/NewRequest.jsx'),
);
const EditRequest = lazy(() =>
  import('./WorkshopsComponents/Forms/EditRequest/EditRequest.jsx'),
);
const WorkshopRequests = lazy(() =>
  import('./WorkshopsComponents/WorkshopRequests/WorkshopRequests.jsx'),
);
// <!--- REQUESTS ---> //

// <--- RIGGING ---> //
const RiggingList = lazy(() =>
  import('./Dispatcher/Rigging/RiggingList/RiggingList.jsx'),
);
const Rigging = lazy(() => import('./Dispatcher/Rigging/Rigging.jsx'));
const RiggingWorkshop = lazy(() =>
  import(
    './Dispatcher/Rigging/RiggingComponents/RiggingWorkshop/RiggingWorkshop.jsx'
  ),
);
// <!--- RIGGING ---> //

// <--- WORK_MANAGEMENT ---> //
const MainPageWorkspace = lazy(() =>
  import('./GeneralPage/MainPageWorkspace/MainPageWorkspace.jsx'),
);
const WorkManagementPage = lazy(() =>
  import(
    './GeneralPage/WorkManagement/WorkManagementPage/WorkManagementPage.jsx'
  ),
);
const RecordWork = lazy(() =>
  import('./GeneralPage/WorkManagement/RecordWork/RecordWork.jsx'),
);
const ProductionJournal = lazy(() =>
  import(
    './GeneralPage/WorkManagement/ProductionJournal/ProductionJournal.jsx'
  ),
);
const ReportTablePage = lazy(() =>
  import('./GeneralPage/ReportTablePage/ReportTablePage.jsx'),
);
const ReportsPage = lazy(() => import('./ReportsPage/ReportsPage.jsx'));
const EmployeeReportPage = lazy(() =>
  import('./ReportsPage/EmployeeReportPage/EmployeeReportPage.jsx'),
);
// <!--- WORK_MANAGEMENT ---> //

// <--- CLIENTS ---> //
const Clients = lazy(() => import('./Clients/Clients.jsx'));
const NewClient = lazy(() => import('./Clients/NewClient/NewClient.jsx'));
const EditClient = lazy(() => import('./Clients/EditClient/EditClient.jsx'));
const ClientCategories = lazy(() =>
  import('./Clients/ClientCategories/ClientCategories.jsx'),
);
// <!--- CLIENTS ---> //

// <--- PRODUCTS ---> //
const Products = lazy(() => import('./Products/Products.jsx'));
const NewProduct = lazy(() => import('./Products/NewProduct/NewProduct.jsx'));
const ViewProduct = lazy(() =>
  import('./Products/ViewProduct/ViewProduct.jsx'),
);
const EditProduct = lazy(() =>
  import('./Products/EditProduct/EditProduct.jsx'),
);
const NewCategory = lazy(() =>
  import('./Products/CategoryManagement/NewCategory/NewCategory.jsx'),
);
const EditCategory = lazy(() =>
  import('./Products/CategoryManagement/EditCategory/EditCategory.jsx'),
);
// <!--- PRODUCTS ---> //

// <--- USERS ---> //
const Users = lazy(() => import('./Profile/Users/Users.jsx'));
const EditUser = lazy(() => import('./Profile/Users/EditUser/EditUser.jsx'));
const NewUser = lazy(() => import('./Profile/Users/NewUser/NewUser.jsx'));
// <!--- USERS ---> //

// <--- WORKSHOP_PAGES ---> //
const LEMZ = lazy(() => import('./LEMZ/LEMZ.jsx'));
const Lepsari = lazy(() => import('./Lepsari/Lepsari.jsx'));
// <!--- WORKSHOP_PAGES ---> //

// <--- WORKSHOP_ORDERS ---> //
const WorkshopOrders = lazy(() =>
  import('./WorkshopsComponents/WorkshopOrders/WorkshopOrders.jsx'),
);
const NewWorkshopOrder = lazy(() =>
  import(
    './WorkshopsComponents/WorkshopOrders/NewWorkshopOrder/NewWorkshopOrder.jsx'
  ),
);
const EditWorkshopOrder = lazy(() =>
  import(
    './WorkshopsComponents/WorkshopOrders/EditWorkshopOrder/EditWorkshopOrder.jsx'
  ),
);
// <!--- WORKSHOP_ORDERS ---> //

// <--- WORKSHOP_STORAGE ---> //
const Storage = lazy(() => import('./WorkshopsComponents/Storage/Storage.jsx'));
const NewStorage = lazy(() =>
  import('./WorkshopsComponents/Storage/NewStorage/NewStorage.jsx'),
);
const EditStorage = lazy(() =>
  import('./WorkshopsComponents/Storage/EditStorage/EditStorage.jsx'),
);
// <!--- WORKSHOP_STORAGE ---> //

// <--- TRANSPORTATION ---> //
const Transportation = lazy(() =>
  import('./Dispatcher/Transportation/Transportation.jsx'),
);
const NewTransportation = lazy(() =>
  import('./Dispatcher/Transportation/NewTransportation/NewTransportation.jsx'),
);
const EditTransportation = lazy(() =>
  import(
    './Dispatcher/Transportation/EditTransportation/EditTransportation.jsx'
  ),
);
// <!--- TRANSPORTATION ---> //

// <--- TASKS ---> //
const GeneralTasks = lazy(() =>
  import('./Dispatcher/GeneralTasks/GeneralTasks.jsx'),
);
const NewTask = lazy(() =>
  import('./Dispatcher/GeneralTasks/NewTask/NewTask.jsx'),
);
const EditTask = lazy(() =>
  import('./Dispatcher/GeneralTasks/EditTask/EditTask.jsx'),
);
// <!--- TASKS ---> //

// <--- EMPLOYEES ---> //
const Employees = lazy(() => import('./Dispatcher/Employees/Employees.jsx'));
const NewEmployee = lazy(() =>
  import('./Dispatcher/Employees/NewEmployee/NewEmployee.jsx'),
);
const EditEmployee = lazy(() =>
  import('./Dispatcher/Employees/EditEmployee/EditEmployee.jsx'),
);
// <!--- EMPLOYEES ---> //

// <--- WORK_LIST ---> //
const Work = lazy(() => import('./Work/Work.jsx'));
const NewWork = lazy(() => import('./Work/NewWork/NewWork.jsx'));
const EditWork = lazy(() => import('./Work/EditWork/EditWork.jsx'));
// <!--- WORK_LIST ---> //

// <--- PRICELIST ---> //
const PriceList = lazy(() => import('./PriceList/PriceList/PriceList.jsx'));
const LtdListPage = lazy(() =>
  import('./PriceList/LtdListPage/LtdListPage.jsx'),
);
const NewLtd = lazy(() =>
  import('./PriceList/LtdListPage/Forms/NewLtd/NewLtd.jsx'),
);
const EditLtd = lazy(() =>
  import('./PriceList/LtdListPage/Forms/EditLtd/EditLtd.jsx'),
);
const PricesListPage = lazy(() =>
  import('./PriceList/PricesListPage/PricesListPage.jsx'),
);
// <!--- PRICELIST ---!> //

// <--- FEEDBACK ---> //
const FeedbackPage = lazy(() => import('./FeedbackPage/FeedbackPage.jsx'));
const NewFeedback = lazy(() =>
  import('./FeedbackPage/NewFeedback/NewFeedback.jsx'),
);
const ViewFeedback = lazy(() =>
  import('./FeedbackPage/ViewFeedback/ViewFeedback.jsx'),
);
// <!--- FEEDBACK ---> //

// <--- PACKAGING ---> //
const PackagingPage = lazy(() => import('./PackagingPage/PackagingPage.jsx'));
const NewPackaging = lazy(() =>
  import('./PackagingPage/NewPackaging/NewPackaging.jsx'),
);
const EditPackaging = lazy(() =>
  import('./PackagingPage/EditPackaging/EditPackaging.jsx'),
);
// <!--- PACKAGING ---> //

// <--- WIDGETS ---> //
const StatisticsWidget = lazy(() =>
  import('./GeneralPage/StatisticsWidget/StatisticsWidget.jsx'),
);
const UpdateLogWidget = lazy(() =>
  import('./GeneralPage/UpdateLogWidget/UpdateLogWidget.jsx'),
);
const FeedbackWidget = lazy(() =>
  import('./GeneralPage/FeedbackWidget/FeedbackWidget.jsx'),
);
const TasksWidget = lazy(() =>
  import('./GeneralPage/TasksWidget/TasksWidget.jsx'),
);
const GraphWidget = lazy(() =>
  import('./GeneralPage/GraphWidget/GraphWidget.jsx'),
);
const NotificationsWidget = lazy(() =>
  import('./GeneralPage/Notifications/NotificationsWidget.jsx'),
);
const WorkListWidget = lazy(() =>
  import('./GeneralPage/WorkManagement/WorkListWidget/WorkListWidget.jsx'),
);
// <!--- WIDGETS ---> //

// <--- ETC_PAGES ---> //
const GeneralPage = lazy(() => import('./GeneralPage/GeneralPage.jsx'));
const EtceteraPage = lazy(() => import('./EtceteraPage/EtceteraPage.jsx'));
// <--- ETC_PAGES ---> //

export {
  StatisticsWidget,
  UpdateLogWidget,
  WorkListWidget,
  FeedbackWidget,
  TasksWidget,
  GraphWidget,
  NotificationsWidget,
  Clients,
  NewClient,
  EditClient,
  ClientCategories,
  NewRequest,
  EditRequest,
  GeneralPage,
  RiggingWorkshop,
  MainPageWorkspace,
  RecordWork,
  ProductionJournal,
  WorkManagementPage,
  PricesListPage,
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
  WorkshopRequests,
  Storage,
  NewStorage,
  EditStorage,
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
  Employees,
  NewEmployee,
  EditEmployee,
  Work,
  NewWork,
  EditWork,
  LEMZ,
  Lepsari,
  PriceList,
  FeedbackPage,
  NewFeedback,
  ViewFeedback,
  EtceteraPage,
  PackagingPage,
  NewPackaging,
  EditPackaging,
  ReportTablePage,
  ReportsPage,
  RiggingList,
  EmployeeReportPage,
  StatisticsPage,
};
