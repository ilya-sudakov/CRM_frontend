export const request = (options, contentType = "application/json") => {
  const headers = new Headers({
    "Content-Type": contentType,
  });

  if (
    localStorage.getItem("accessToken") &&
    !options.url.includes("refreshToken")
  ) {
    headers.append(
      "Authorization",
      "Bearer_" + localStorage.getItem("accessToken")
    );
  }

  const defaults = { headers: headers };

  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.error);
    }
    return response;
  });
};

export const requestINN = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  headers.append("Authorization", "Token " + process.env.INN_TOKEN);

  const defaults = { headers: headers };

  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.error);
    }
    return response;
  });
};

export const getAuthHeaders = (contentType = "application/json") => {
  let headers = Object.assign({
    "Content-Type": contentType,
  });

  if (localStorage.getItem("accessToken")) {
    headers = {
      ...headers,
      authorization: `Bearer_${localStorage.getItem("accessToken")}`,
    };
  }
  return { headers: headers };
};
