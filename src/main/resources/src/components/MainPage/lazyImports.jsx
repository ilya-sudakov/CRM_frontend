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

export {
    Clients, Contracts, Requests, NewRequest, GeneralPage, newClient, Products,
    NewProduct, EditRequest, ViewRequest, Users, EditUser, NewUser, ViewProduct, EditProduct, WorkshopLEMZ,
    NewRequestLEMZ, ViewRequestLEMZ, EditRequestLEMZ, Rigging, Transportation, EditTransportation, NewTransportation,
    GeneralTasks, NewTask, EditTask
};