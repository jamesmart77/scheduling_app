const GET_Config = {
    method: 'GET',
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

const POST_Config = {
    method: 'POST',
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: ''
};

const DELETE_Config = {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: ''
};

export const loginCurrentUser = async() => {
    const response = await fetch('/api/user/login', {...GET_Config});
    return responseHandler(response, 'loginCurrentUser');
};

const responseHandler = async(response, funcName) => {
    if(!response.OK) {
        throw new Error(`API Service ${funcName} failed, HTTP status ${response.status}`);
    }

    const payLoad = await response.json();
    console.log("response payLoad: ", payLoad);
    return payLoad;
};