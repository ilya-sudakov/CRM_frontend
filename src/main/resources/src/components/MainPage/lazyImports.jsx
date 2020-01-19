import { lazy } from 'react';

const Clients = lazy(
    () => import('./Clients/Clients.jsx')
);

const Contracts = lazy(
    () => import('./Contracts/Contracts.jsx')
);

const Requests = lazy(
    () => import('./Requests/Requests.jsx')
);

const NewRequest = lazy(
    () => import('./Requests/NewRequest/NewRequest.jsx')
);

const GeneralPage = lazy(
    () => import('./GeneralPage/GeneralPage.jsx')
);

const AdminWorkspace = lazy(
    () => import('./GeneralPage/AdminWorkspace/AdminWorkspace.jsx')
)

const Notifications = lazy(
    () => import('./GeneralPage/Notifications/Notifications.jsx')
)

const newClient = lazy(
    () => import('./Clients/NewClient/NewClient.jsx')
);

const Products = lazy(
    () => import('./Products/Products.jsx')
);

const NewProduct = lazy(
    () => import('./Products/NewProduct/NewProduct.jsx')
);

const EditRequest = lazy(
    () => import('./Requests/EditRequest/EditRequest.jsx')
);

const ViewRequest = lazy(
    () => import('./Requests/ViewRequest/ViewRequest.jsx')
);

const Users = lazy(
    () => import('./Profile/Users/Users.jsx')
);

const EditUser = lazy(
    () => import('./Profile/Users/EditUser/EditUser.jsx')
);

const NewUser = lazy(
    () => import('./Profile/Users/NewUser/NewUser.jsx')
);

const ViewProduct = lazy(
    () => import('./Products/ViewProduct/ViewProduct.jsx')
);

const EditProduct = lazy(
    () => import('./Products/EditProduct/EditProduct.jsx')
);

const WorkshopLEMZ = lazy(
    () => import('./WorkshopLEMZ/WorkshopLEMZ.jsx')
);

const NewRequestLEMZ = lazy(
    () => import('./WorkshopLEMZ/NewRequestLEMZ/NewRequestLEMZ.jsx')
);

const ViewRequestLEMZ = lazy(
    () => import('./WorkshopLEMZ/ViewRequestLEMZ/ViewRequestLEMZ.jsx')
);

const EditRequestLEMZ = lazy(
    () => import('./WorkshopLEMZ/EditRequestLEMZ/EditRequestLEMZ.jsx')
);

const Rigging = lazy(
    () => import('./Dispatcher/Rigging/Rigging.jsx')
);

const Transportation = lazy(
    () => import('./Dispatcher/Transportation/Transportation.jsx')
);

const GeneralTasks = lazy(
    () => import('./Dispatcher/GeneralTasks/GeneralTasks.jsx')
);

const NewTransportation = lazy(
    () => import('./Dispatcher/Transportation/NewTransportation/NewTransportation.jsx')
);

const EditTransportation = lazy(
    () => import('./Dispatcher/Transportation/EditTransportation/EditTransportation.jsx')
);

const NewTask = lazy(
    () => import('./Dispatcher/GeneralTasks/NewTask/NewTask.jsx')
);

const EditTask = lazy(
    () => import('./Dispatcher/GeneralTasks/EditTask/EditTask.jsx')
);

const Stamp = lazy(
    () => import('./Dispatcher/Rigging/Stamp/Stamp.jsx')
)

const NewStamp = lazy(
    () => import('./Dispatcher/Rigging/Stamp/NewStamp/NewStamp.jsx')
)

const ViewStamp = lazy(
    () => import('./Dispatcher/Rigging/Stamp/ViewStamp/ViewStamp.jsx')
)

const EditStamp = lazy(
    () => import('./Dispatcher/Rigging/Stamp/EditStamp/EditStamp.jsx')
)

const Machine = lazy(
    () => import('./Dispatcher/Rigging/Machine/Machine.jsx')
)

const NewMachine = lazy(
    () => import('./Dispatcher/Rigging/Machine/NewMachine/NewMachine.jsx')
)

const ViewMachine = lazy(
    () => import('./Dispatcher/Rigging/Machine/ViewMachine/ViewMachine.jsx')
)

const EditMachine = lazy(
    () => import('./Dispatcher/Rigging/Machine/EditMachine/EditMachine.jsx')
)

const PressForm = lazy(
    () => import('./Dispatcher/Rigging/PressForm/PressForm.jsx')
)

const NewPressForm = lazy(
    () => import('./Dispatcher/Rigging/PressForm/NewPressForm/NewPressForm.jsx')
)

const ViewPressForm = lazy(
    () => import('./Dispatcher/Rigging/PressForm/ViewPressForm/ViewPressForm.jsx')
)

const EditPressForm = lazy(
    () => import('./Dispatcher/Rigging/PressForm/EditPressForm/EditPressForm.jsx')
)

const Parts = lazy(
    () => import('./Dispatcher/Rigging/Parts/Parts.jsx')
)

const NewPart = lazy(
    () => import('./Dispatcher/Rigging/Parts/NewPart/NewPart.jsx')
)

const EditPart = lazy(
    () => import('./Dispatcher/Rigging/Parts/EditPart/EditPart.jsx')
)

const Employees = lazy(
    () => import('./Dispatcher/Employees/Employees.jsx')
)

const NewEmployee = lazy(
    () => import('./Dispatcher/Employees/NewEmployee/NewEmployee.jsx')
)

const EditEmployee = lazy(
    () => import('./Dispatcher/Employees/EditEmployee/EditEmployee.jsx')
)

const ViewEmployee = lazy(
    () => import('./Dispatcher/Employees/ViewEmployee/ViewEmployee.jsx')
)

const EditPartInRigging = lazy(
    () => import('./Dispatcher/Rigging/EditPartInRigging/EditPartInRigging.jsx')
)

const Work = lazy(
    () => import('./Work/Work.jsx')
)

const NewWork = lazy(
    () => import('./Work/NewWork/NewWork.jsx')
)

const EditWork = lazy(
    () => import('./Work/EditWork/EditWork.jsx')
)

const WorkshopLepsari = lazy(
    () => import('./WorkshopLepsari/WorkshopLepsari.jsx')
)

const NewRequestLepsari = lazy(
    () => import('./WorkshopLepsari/NewRequestLepsari/NewRequestLepsari.jsx')
)

const ViewRequestLepsari = lazy(
    () => import('./WorkshopLepsari/ViewRequestLepsari/ViewRequestLepsari.jsx')
)

const EditRequestLepsari = lazy(
    () => import('./WorkshopLepsari/EditRequestLepsari/EditRequestLepsari.jsx')
)

const Storage = lazy(
    () => import('./Storage/Storage.jsx')
)

const NewStorage = lazy(
    () => import('./Storage/NewStorage/NewStorage.jsx')
)

const EditStorage = lazy(
    () => import('./Storage/EditStorage/EditStorage.jsx')
)

const NewCategory = lazy(
    () => import('./Products/CategoryManagement/NewCategory/NewCategory.jsx')
)

const EditCategory = lazy(
    () => import('./Products/CategoryManagement/EditCategory/EditCategory.jsx')
)

export {
    Clients, newClient, 
    Contracts, 
    Requests, NewRequest, EditRequest, ViewRequest, 
    GeneralPage, AdminWorkspace, Notifications,
    Products, NewProduct, ViewProduct, EditProduct, NewCategory, EditCategory,
    Users, EditUser, NewUser, 
    WorkshopLEMZ, NewRequestLEMZ, ViewRequestLEMZ, EditRequestLEMZ, 
    Rigging, 
    Transportation, EditTransportation, NewTransportation,
    GeneralTasks, NewTask, EditTask, 
    Parts, NewPart, EditPart, 
    Employees, NewEmployee, EditEmployee, ViewEmployee,
    Stamp, NewStamp, ViewStamp, EditStamp, 
    Machine, NewMachine, ViewMachine, EditMachine, 
    PressForm, NewPressForm, ViewPressForm, EditPressForm,
    EditPartInRigging,
    Work, NewWork, EditWork,
    WorkshopLepsari, NewRequestLepsari, ViewRequestLepsari, EditRequestLepsari,
    Storage, NewStorage, EditStorage
};