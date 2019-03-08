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

//USER
export const loadUser = async() => {
    const response = await fetch('/api/users/loadData', GET_Config);
    return responseHandler(response, 'loadUser'); 
};

export const loadAllUsers = async() => {
    const response = await fetch('/api/users/loadAllUsers', GET_Config);
    return responseHandler(response, 'loadAllUsers'); 
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

export const userAuthentication = async() => {
    const response = await fetch('/api/users/authenticate', GET_Config);
    return responseHandler(response, 'userAuthentication');
};

export const userAuthorization = async(groupId) => {
    const response = await fetch(`/api/users/authorization/groups/${groupId}`, GET_Config);
    return responseHandler(response, 'userAuthorization');
};

//GROUP
export const createGroup = async(newGroup) => {
    POST_Config.body = JSON.stringify(newGroup);
    const response = await fetch('/api/groups', POST_Config);
    return responseHandler(response, 'createGroup');
};

export const addUserToGroup = async(userEmail, groupId) => {
    POST_Config.body = JSON.stringify(userEmail);
    const response = await fetch(`/api/groups/${groupId}/newUser`, POST_Config);
    return responseHandler(response, 'addUserToGroup');
};

const responseHandler = async(response, funcName) => {
    if(!response.ok) {
        throw new Error(`API Service ${funcName} failed, HTTP status ${response.status}`);
    }

    const payLoad = await response.json();
    console.log("response payLoad: ", payLoad);
    return payLoad;
};