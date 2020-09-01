import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import './MainPage.scss'
import '../../utils/MainWindow/MainWindow.scss'
import Header from '../Header/Header.jsx'
import {
  Clients,
  Contracts,
  Requests,
  // NewRequest,
  GeneralPage,
  newClient,
  Products,
  NewProduct,
  // EditRequest,
  // ViewRequest,
  Users,
  EditUser,
  NewUser,
  ViewProduct,
  EditProduct,
  Rigging,
  Transportation,
  EditTransportation,
  NewTransportation,
  GeneralTasks,
  NewTask,
  EditTask,
  Employees,
  NewEmployee,
  EditEmployee,
  ViewEmployee,
  Work,
  NewWork,
  EditWork,
  NewCategory,
  EditCategory,
  LEMZ,
  Lepsari,
  NewRecordWork,
  LoginHistory,
  EditRecordWork,
  WorkManagementPage,
  // PriceList,
  NewPriceList,
  // ViewPriceList,
  ClientCategories,
  ViewClient,
  EditClient,
  FeedbackPage,
  NewFeedback,
  ViewFeedback,
  EtceteraPage,
  GraphsPage,
  PackagingPage,
  NewPackaging,
  EditPackaging,
  ReportTablePage,
  RiggingList,
  StatisticsPage,
} from './lazyImports.jsx'
import NewRequest from './WorkshopsComponents/Forms/NewRequest/NewRequest.jsx'
import EditRequest from './WorkshopsComponents/Forms/EditRequest/EditRequest.jsx'
import ViewRequest from './WorkshopsComponents/Forms/ViewRequest/ViewRequest.jsx'
import SideMenu from '../SideMenu/SideMenu.jsx'
import PageNotFound from './PageNotFound/PageNotFound.jsx'
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx'
import PageLoading from './PageLoading/PageLoading.jsx'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.jsx'

class MainPage extends React.Component {
  state = {
    sidemenu_hidden: true,
    transferState: false,
    transferData: null,
  }

  setSideMenu = (sidemenu_hidden) => {
    this.setState({
      sidemenu_hidden: sidemenu_hidden,
    })
  }

  componentDidMount() {
    // console.log(this.state.transferState, this.state.transferData);
    if (
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) > 1220
    ) {
      this.setSideMenu(false)
    }
  }

  render() {
    return (
      <div className="main_page">
        <Header
          sideMenu={this.state.sidemenu_hidden}
          setSideMenu={this.setSideMenu}
        />
        <div className="main_page__content">
          <ErrorBoundary componentName={`компоненте "Главная страница"`}>
            <SideMenu
              userHasAccess={this.props.userHasAccess}
              hidden={this.state.sidemenu_hidden}
              setSideMenu={this.setSideMenu}
            />
            {(window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth) < 1220 && (
              <div
                className={
                  this.state.sidemenu_hidden
                    ? 'main_page__overlay main_page__overlay--hidden'
                    : 'main_page__overlay'
                }
                onClick={() => {
                  if (
                    (window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth) < 1220
                  ) {
                    this.setSideMenu(!this.state.sidemenu_hidden)
                  }
                }}
              ></div>
            )}
            <div className="main_page__activity_panel">
              <Suspense fallback={<PageLoading />}>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={GeneralPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_WORKSHOP',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/profile/users"
                    component={Users}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    exact
                    path="/profile/users/new"
                    component={NewUser}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    path="/profile/users/edit/"
                    component={EditUser}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    exact
                    path="/profile/login-history"
                    component={LoginHistory}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    path="/clients/category/"
                    component={Clients}
                    type="clients"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    exact
                    path="/clients/categories/"
                    component={ClientCategories}
                    type="clients"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    exact
                    path="/clients/new"
                    component={newClient}
                    type="clients"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    path="/clients/view/"
                    component={ViewClient}
                    type="clients"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    path="/clients/edit/"
                    component={EditClient}
                    type="clients"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    path="/suppliers/category/"
                    component={Clients}
                    type="suppliers"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                      'ROLE_WORKSHOP',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/suppliers/categories/"
                    component={ClientCategories}
                    type="suppliers"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                      'ROLE_WORKSHOP',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/suppliers/new"
                    component={newClient}
                    type="suppliers"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    path="/suppliers/view/"
                    component={ViewClient}
                    type="suppliers"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    path="/suppliers/edit/"
                    component={EditClient}
                    type="suppliers"
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_DISPATCHER',
                    ]}
                  />
                  <Route exact path="/contracts" component={Contracts} />
                  <PrivateRoute
                    exact
                    path="/requests"
                    component={Requests}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                    setTransferState={(value) =>
                      this.setState({
                        transferState: value,
                      })
                    }
                    setTransferData={(value) =>
                      this.setState({
                        transferData: value,
                      })
                    }
                  />
                  <Route
                    path="/requests/view/"
                    render={(props) => (
                      <ViewRequest {...props} type="requests" />
                    )}
                  />
                  <PrivateRoute
                    exact
                    path="/requests/new"
                    component={NewRequest}
                    type="requests"
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    path="/requests/edit/"
                    component={EditRequest}
                    type="requests"
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    exact
                    path="/price-list"
                    // component={PriceList}
                    component={NewPriceList}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  {/* <PrivateRoute
                                    exact path="/price-list/new"
                                    component={NewPriceList}
                                    userHasAccess={this.props.userHasAccess}
                                    userData={this.props.userData}
                                    allowedRoles={["ROLE_ADMIN"]}
                                /> */}
                  {/* <PrivateRoute
                  path="/price-list/view/"
                  component={ViewPriceList}
                  userHasAccess={this.props.userHasAccess}
                  userData={this.props.userData}
                  allowedRoles={['ROLE_ADMIN']}
                /> */}
                  <PrivateRoute
                    exact
                    path="/products"
                    component={Products}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <Route path="/products/view/" component={ViewProduct} />
                  <PrivateRoute
                    path="/products/edit/"
                    component={EditProduct}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    exact
                    path="/products/new"
                    component={NewProduct}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    path="/lemz"
                    component={LEMZ}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    transferState={this.state.transferState}
                    transferData={this.state.transferData}
                    setTransferState={(value) =>
                      this.setState({
                        transferState: value,
                      })
                    }
                    setTransferData={(value) =>
                      this.setState({
                        transferData: value,
                      })
                    }
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_LEMZ',
                      'ROLE_DISPATCHER',
                    ]}
                  />
                  <PrivateRoute
                    path="/lepsari"
                    component={Lepsari}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    transferState={this.state.transferState}
                    transferData={this.state.transferData}
                    setTransferState={(value) =>
                      this.setState({
                        transferState: value,
                      })
                    }
                    setTransferData={(value) =>
                      this.setState({
                        transferData: value,
                      })
                    }
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_LEPSARI',
                      'ROLE_DISPATCHER',
                    ]}
                  />
                  <PrivateRoute
                    path="/dispatcher/rigging"
                    component={Rigging}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/transportation"
                    component={Transportation}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/transportation/new"
                    component={NewTransportation}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    path="/dispatcher/transportation/edit/"
                    component={EditTransportation}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/general-tasks"
                    component={GeneralTasks}
                    userData={this.props.userData}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                      'ROLE_MANAGER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/general-tasks/new"
                    component={NewTask}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    path="/dispatcher/general-tasks/edit/"
                    component={EditTask}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/employees"
                    component={Employees}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    exact
                    path="/dispatcher/employees/new"
                    component={NewEmployee}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    path="/dispatcher/employees/edit/"
                    component={EditEmployee}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    path="/dispatcher/employees/view/"
                    component={ViewEmployee}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    exact
                    path="/work-list"
                    component={Work}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/work-list/new"
                    component={NewWork}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    path="/work-list/edit/"
                    component={EditWork}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/products/category/new"
                    component={NewCategory}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    path="/products/category/edit/"
                    component={EditCategory}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}
                  />
                  <PrivateRoute
                    exact
                    path="/work-management"
                    component={WorkManagementPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/work-management/record-time/new"
                    component={NewRecordWork}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    path="/work-management/record-time/edit/"
                    component={EditRecordWork}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/feedback"
                    component={FeedbackPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/feedback/new"
                    component={NewFeedback}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    path="/feedback/view/"
                    component={ViewFeedback}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_MANAGER',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/etcetera"
                    component={EtceteraPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_DISPATCHER',
                      'ROLE_MANAGER',
                      'ROLE_ENGINEER',
                      'ROLE_WORKSHOP',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/graphs"
                    component={GraphsPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    exact
                    path="/packaging"
                    component={PackagingPage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    exact
                    path="/packaging/new"
                    component={NewPackaging}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    path="/packaging/edit/"
                    component={EditPackaging}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <PrivateRoute
                    exact
                    path="/report-table"
                    component={ReportTablePage}
                    userHasAccess={this.props.userHasAccess}
                    userData={this.props.userData}
                    allowedRoles={['ROLE_ADMIN', 'ROLE_DISPATCHER']}
                  />
                  <PrivateRoute
                    exact
                    path="/rigging-list"
                    component={RiggingList}
                    userHasAccess={this.props.userHasAccess}
                    allowedRoles={[
                      'ROLE_ADMIN',
                      'ROLE_WORKSHOP',
                      'ROLE_DISPATCHER',
                      'ROLE_ENGINEER',
                      'ROLE_MANAGER',
                    ]}
                  />
                  <PrivateRoute
                    exact
                    path="/statistics"
                    component={StatisticsPage}
                    allowedRoles={['ROLE_ADMIN']}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </Suspense>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    )
  }
}

export default MainPage
