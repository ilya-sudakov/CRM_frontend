const request = (options, isLogin) => {
    const headers = new Headers({
        "Content-Type": "application/json"
    })

    if (localStorage.getItem("accessToken") && options.url.includes("refreshToken") !== true) {
        headers.append('Authorization', 'Bearer_' + localStorage.getItem("accessToken"))
    }

    const defaults = { headers: headers };

    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        // .then(response =>
        //     response.json().then(json => {
        //         if (!response.ok) {
        //             return Promise.reject(json);
        //         }
        //         return json;
        //     })
        // );
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.error);
            }
            return response;
        }
        );
}

export function getClients() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/",
        method: "GET"
    });
}

export function addClient(newClient) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client",
        method: "POST",
        body: JSON.stringify(newClient)
    })
}

export function deleteClient(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/client/" + id,
        method: "DELETE"
    })
}

export function getDocuments() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/document/",
        method: "GET"
    })
}

export function deleteDocument(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/document/" + id,
        method: "DELETE"
    })
}

export function getRequests() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/",
        method: "GET"
    })
}

export function deleteRequest(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "DELETE"
    })
}

export function addRequest(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function addProductsToRequest(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function getRequestById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "GET"
    })
}

export function editRequestStatus(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}

export function editRequest(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/request/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function login(loginRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/auth/login",
        method: "POST",
        body: JSON.stringify(loginRequest)
    })
}

export function refreshToken(refreshToken) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/auth/refreshToken",
        method: "POST",
        body: JSON.stringify(refreshToken),
    })
}

export function getUsers() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/admin/user/",
        method: "GET"
    })
}

export function getUserById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/admin/user/" + id,
        method: "GET"
    })
}

export function editUser(newUser, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/admin/user/" + id,
        method: "PUT",
        body: JSON.stringify(newUser)
    })
}

export function addUser(newUser) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/admin/user/",
        method: "POST",
        body: JSON.stringify(newUser)
    })
}

export function getProducts() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/",
        method: "GET"
    })
}

export function getProductById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "GET"
    })
}

export function addProduct(newProduct) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/",
        method: "POST",
        body: JSON.stringify(newProduct)
    })
}

export function editProduct(newProduct, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/product/" + id,
        method: "PUT",
        body: JSON.stringify(newProduct)
    })
}

export function getRequestsLEMZ() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/",
        method: "GET"
    })
}

export function deleteRequestLEMZ(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "DELETE"
    })
}

export function addRequestLEMZ(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/",
        method: "POST",
        body: JSON.stringify(newRequest)
    })
}

export function getRequestLEMZById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "GET"
    })
}

export function editRequestLEMZStatus(newStatus, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/status/" + id,
        method: "PUT",
        body: JSON.stringify(newStatus)
    })
}

export function editRequestLEMZ(newRequest, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/lemz/" + id,
        method: "PUT",
        body: JSON.stringify(newRequest)
    })
}

export function getMainTasks() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/mainTask/",
        method: "GET"
    })
}

export function getMainTaskById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/mainTask/" + id,
        method: "GET"
    })
}

export function addMainTask(newTask) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/mainTask/",
        method: "POST",
        body: JSON.stringify(newTask)
    })
}

export function editMainTask(newTask, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/mainTask/" + id,
        method: "PUT",
        body: JSON.stringify(newTask)
    })
}

export function getTransportations() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/",
        method: "GET"
    })
}

export function getTransportationById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/" + id,
        method: "GET"
    })
}

export function addTransportation(newTransportation) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/",
        method: "POST",
        body: JSON.stringify(newTransportation)
    })
}

export function editTransportation(newTransportation, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/shipping/" + id,
        method: "PUT",
        body: JSON.stringify(newTransportation)
    })
}

export function getParts() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/",
        method: "GET"
    })
}

export function getPartById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/" + id,
        method: "GET"
    })
}

export function addPart(newPart) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/",
        method: "POST",
        body: JSON.stringify(newPart)
    })
}

export function editPart(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/detail/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}

export function getEmployees() {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/employee/",
        method: "GET"
    })
}

export function getEmployeeById(id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/employee/" + id,
        method: "GET"
    })
}

export function addEmployee(newPart) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/employee/",
        method: "POST",
        body: JSON.stringify(newPart)
    })
}

export function editEmployee(newPart, id) {
    return request({
        url: process.env.API_BASE_URL + "/api/v1/employee/" + id,
        method: "PUT",
        body: JSON.stringify(newPart)
    })
}