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
        .then(response => 
            {
                if(!response.ok) {
                    return Promise.reject(response.error);
                }
                return response;
            }
        );
}

export function getClients() {
    return request({
        url: process.env.API_BASE_URL + "/client/",
        method: "GET"
    });
}

export function addClient(newClient) {
    return request({
        url: process.env.API_BASE_URL + "/client",
        method: "POST",
        body: JSON.stringify(newClient)
    })
}

export function deleteClient(id) {
    return request({
        url: process.env.API_BASE_URL + "/client/" + id,
        method: "DELETE"
    })
}

export function getDocuments() {
    return request({
        url: process.env.API_BASE_URL + "/document/",
        method: "GET"
    })
}

export function deleteDocument(id) {
    return request({
        url: process.env.API_BASE_URL + "/document/" + id,
        method: "DELETE"
    })
}

export function getRequests() {
    return request({
        url: process.env.API_BASE_URL + "/request/",
        method: "GET"
    })
}

export function deleteRequest(id) {
    return request({
        url: process.env.API_BASE_URL + "/request/" + id,
        method: "DELETE"
    })
}

export function addRequest(newRequest) {
    return request({
        url: process.env.API_BASE_URL + "/request",
        method: "POST",
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