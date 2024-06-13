import axios from "axios";

export const loginService = async ({ username, password }) => {
    try {
        const loginRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            username: username,
            password: password
        });
        return loginRes;
    } catch (e) {
        return e;
    }
}

export const registerService = async ({ username, password }) => {
    try {
        const registerRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
            username: username,
            password: password
        });
        return registerRes;
    } catch (e) {
        return e;
    }
}

export const changePassService = async ({ username, password, newPassword }) => {
    try {
        
        const changeRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/passChange`, {
            username: username,
            password: password,
            newPassword: newPassword
        });
        return changeRes;
    } catch (e) {
        return e;
    }
}

export const addLocation = async ({ id, location }) => {
    try {
        const addLocationRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addLocation`, {
            id: id,
            location: location
        });
        return addLocationRes
    } catch (e) {
        return e;
    }
}

export const getLocations = async ({ id }) => {
    try {
        const getLocationRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getLocations`, {
            id: id,
        });
        return getLocationRes
    } catch (e) {
        return e;
    }
}


export const deleteLocations = async ({ id, location }) => {
    try {
        const deleteLocationRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/deleteLocation`, {
            id: id,
            location: location
        });
        return deleteLocationRes
    } catch (e) {
        return e;
    }
}