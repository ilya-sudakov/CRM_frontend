export const request = (options, isLogin) => {
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
        });
}