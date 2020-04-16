function getHeaders() {
    return {
        'content-type': 'application/json',
        'Authorization': localStorage.token,
    };
}

function getFullUrl(url) {
    return `${window.API_BASE_URL}${url}`;
}

let setAuthToken = null;
export const ajax = {
    setUpdateTokenFunction: (updateFunction) => {
        setAuthToken = updateFunction;
    },
    get: ({ url }) => {
        return fetch(getFullUrl(url), {
            cache: 'no-cache',
            headers: getHeaders(),
            method: 'GET',
            mode: 'cors',
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    post: ({ url, postData }) => {
        return fetch(getFullUrl(url), {
            body: JSON.stringify(postData), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *omit
            headers: getHeaders(),
            method: 'POST', // *GET, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *same-origin
            redirect: 'follow', // *manual, error
            referrer: 'no-referrer', // *client
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    put: ({ url, postData }) => {
        return fetch(getFullUrl(url), {
            body: JSON.stringify(postData),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: getHeaders(),
            method: 'PUT',
            mode: 'cors',
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
    delete: ({ url }) => {
        return fetch(getFullUrl(url), {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: getHeaders(),
            method: 'DELETE',
            mode: 'cors',
        })
            .then(checkIfSuccess).then(handleSuccess).catch(handleFailure);
    },
};


function checkIfSuccess(response) {
    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return Promise.reject({
                statusText: response.statusText,
                messagePromise: response.json()
            });
        }

        return Promise.reject({
            statusText: response.statusText,
            messagePromise: 'Something went wrong'
        });
    }

    return response.json();
}

function handleSuccess(responseJson) {
    if (responseJson.token) {
        localStorage.token = responseJson.token;
        setAuthToken(localStorage.token);
    }

    if (responseJson.result) {
        return responseJson.result;
    }

    return responseJson;
}

function handleFailure(err) {
    if (err.statusText === 'Unauthorized') {
        localStorage.removeItem('token');
        window.location.reload();
    } else {
        if (err.token) {
            localStorage.token = err.token;
            setAuthToken(localStorage.token);
        }
    }

    console.log(err.error, err.e);

    return Promise.reject({
        statusText: err.statusText,
        messagePromise: err.error || err.e || 'Something went wrong'
    });
}
