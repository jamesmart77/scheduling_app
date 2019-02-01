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

export const loginCurrentUser = async(credentials) => {
    POST_Config.body = JSON.stringify(credentials);
    const response = await fetch('/api/users/login', POST_Config);
    return responseHandler(response, 'loginCurrentUser');
};

export const createUser = async(newUser) => {
    POST_Config.body = JSON.stringify(newUser);
    const response = await fetch('/api/users', POST_Config);
    return responseHandler(response, 'createUser');
};

export const logoutCurrentUser = async() => {
    const response = await fetch('/api/users/logout', GET_Config);
    return responseHandler(response, 'logoutCurrentUser');
};

export const emailAddressValidation = async(address) => {
    POST_Config.body = JSON.stringify(address);
    const response = await fetch('/api/users/available', POST_Config);
    return responseHandler(response, 'emailAddressValidation');
};

export const userValidation = async() => {
    const response = await fetch('/api/users/validation', GET_Config);
    return responseHandler(response, 'userValidation');
};

const responseHandler = async(response, funcName) => {
    if(!response.ok) {
        throw new Error(`API Service ${funcName} failed, HTTP status ${response.status}`);
    }

    const payLoad = await response.json();
    console.log("response payLoad: ", payLoad);
    return payLoad;
};